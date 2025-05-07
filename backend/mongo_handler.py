from pymongo import MongoClient, ASCENDING
from datetime import datetime, timedelta
from config.config import MONGO_CONFIG
from sentiment import SentimentAnalyzer
from fetch_news import NewsFetcher

class MongoHandler:
    def __init__(self):
        self.client = MongoClient(MONGO_CONFIG['uri'])
        self.db = self.client[MONGO_CONFIG['db_name']]
        self.col = self.db[MONGO_CONFIG['collection']]
        self.sent = SentimentAnalyzer()
        self.fake_detector = NewsFetcher()
        self._ensure_indexes()

    def _ensure_indexes(self):
        self.col.create_index([('query', ASCENDING), ('fetched_at', ASCENDING)])
        self.col.create_index([('url', ASCENDING)], unique=True)

    def get_cached(self, query: str, minutes: int = 10):
        print(f"[DEBUG] Looking for cached articles for query: '{query}'")
        cutoff = datetime.utcnow() - timedelta(minutes=minutes)
        print(f"[CACHE CHECK] Query: {query}, Cutoff: {cutoff}")
        res = list(self.col.find({
            'query': query,
            'fetched_at': {'$gte': cutoff}
        }, {"_id": False}))
        print(f"[CACHE RESULT] Found {len(res)} articles")
        return res

    def save_articles(self, query: str, articles: list[dict]):
        count = 0;
        print(f"[DEBUG] Saving articles for query: '{query}'")
        now = datetime.utcnow()
        for art in articles:
            try:        
                art['query'] = query
                art['topic'] = query  # tag the topic
                art['fetched_at'] = now
                content = f"{art['title']} {art.get('description', '')}"
                art['sentiment'] = self.sent.analyze(content)['compound']
                art['fake_news_score'] = self.fake_detector.detect_fake_news(content)
                result = self.col.update_one(
                    {'url': art['url']},
                    {'$set': art},
                    upsert=True
                )
                if result.upserted_id:
                    count += 1
            except Exception as e:
                print(f"[ERROR] Skipping article due to: {e}")
        print(f"[DEBUG] Upserted {count} new articles.")

    def get_avg_stats(self):
        pipeline = [
            {
                '$group': {
                    '_id': None,
                    'avg_sentiment': {'$avg': '$sentiment'},
                    'avg_fake_score': {'$avg': '$fake_news_score'}
                }
            }
        ]
        result = list(self.col.aggregate(pipeline))
        if result:
            return {
                'avg_sentiment': round(result[0]['avg_sentiment'], 3),
                'avg_fake_score': round(result[0]['avg_fake_score'], 3)
            }
        return {'avg_sentiment': 0, 'avg_fake_score': 0}

    def get_topic_stats(self):
        pipeline = [
            {
                '$group': {
                    '_id': '$topic',
                    'count': {'$sum': 1}
                }
            },
            {'$sort': {'count': -1}},
            {'$limit': 10}
        ]
        return [{'topic': x['_id'], 'count': x['count']} for x in self.col.aggregate(pipeline)]

    def get_sentiment_trend(self, days: int = 7):
        pipeline = [
            {
                '$match': {
                    'fetched_at': {'$gte': datetime.utcnow() - timedelta(days=days)}
                }
            },
            {
                '$group': {
                    '_id': {'$dateToString': {'format': '%Y-%m-%d', 'date': '$fetched_at'}},
                    'avg_sentiment': {'$avg': '$sentiment'}
                }
            },
            {'$sort': {'_id': 1}}
        ]
        return [
            {'date': x['_id'], 'avg_sentiment': round(x['avg_sentiment'], 3)}
            for x in self.col.aggregate(pipeline)
        ]

    # ✅ For /api/trending-news without category (default recent news)
    def get_latest_articles(self, limit=10):
        cursor = self.col.find({}, {'_id': 0}).sort('fetched_at', -1).limit(limit)
        return list(cursor)

    # ✅ For /api/trending-news with category (query as category/topic)
    def get_latest_articles_by_category(self, category: str, limit=10):
        cutoff = datetime.utcnow() - timedelta(days=2)
        cursor = self.col.find({
            'topic': category,
            'fetched_at': {'$gte': cutoff}
        }, {'_id': 0}).sort('fetched_at', -1).limit(limit)
        return list(cursor)
