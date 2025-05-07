from flask import Flask, request, jsonify 
from flask_cors import CORS
from mongo_handler import MongoHandler
from fetch_news import NewsFetcher
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)

mongo = MongoHandler()
fetcher = NewsFetcher()

def fetch_or_cached(query):
    cached = mongo.get_cached(query)
    if cached:
        return cached
    arts = fetcher.fetch(query)
    mongo.save_articles(query, arts)
    return arts

# ✅ 1. Trending News (used in getTrendingNews())
@app.route('/api/trending-news', methods=['GET'])
def trending_news():
    category = request.args.get('category', 'world')
    news = mongo.get_latest_articles_by_category(category, limit=10)
    if not news:
        fresh = fetch_or_cached(category)
        return jsonify(fresh)
    return jsonify(news)

# ✅ 2. Sentiment Trend (used in getSentimentTrend())
@app.route('/api/sentiment-trend', methods=['GET'])
def sentiment_trend():
    days = int(request.args.get('days', 7))
    return jsonify(mongo.get_sentiment_trend(days))

# ✅ 3. Average Stats (used in getAvgStats())
@app.route('/api/average-stats', methods=['GET'])
def average_stats():
    return jsonify(mongo.get_avg_stats())

# ✅ 4. Topic Stats (used in getTopicStats())
@app.route('/api/topic-stats', methods=['GET'])
def topic_stats():
    return jsonify(mongo.get_topic_stats())

# ✅ 5. Optional: Search endpoint
@app.route('/search', methods=['POST'])
def search():
    data = request.get_json() or {}
    print(data)
    q = data.get('query')
    print(q)
    if not q:
        return jsonify({'error': 'Query missing'}), 400
    res = fetch_or_cached(q)
    return jsonify(res)

if __name__ == '__main__':
    app.run(debug=True)
