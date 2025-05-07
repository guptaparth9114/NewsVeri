import requests
from config.config import NEWSAPI_KEY
from datetime import datetime, timedelta
from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification
import torch

class NewsFetcher:
    def __init__(self):
        self.fake_tokenizer = AutoTokenizer.from_pretrained("mrm8488/bert-tiny-finetuned-fake-news-detection")
        self.fake_model = AutoModelForSequenceClassification.from_pretrained("mrm8488/bert-tiny-finetuned-fake-news-detection")
        self.sentiment_pipeline = pipeline("sentiment-analysis")

    def detect_fake_news(self, text):
        if not text:
            return 0.0
        inputs = self.fake_tokenizer(text, return_tensors="pt", truncation=True, padding=True)
        with torch.no_grad():
            outputs = self.fake_model(**inputs)
        probs = torch.softmax(outputs.logits, dim=1)
        return probs[0][1].item()  # Probability of class 1 (Fake)

    def detect_sentiment(self, text):
        if not text:
            return 0.0
        result = self.sentiment_pipeline(text[:512])[0]
        score = result['score']
        return score if result['label'] == 'POSITIVE' else -score

    BASE = 'https://newsapi.org/v2/everything'

    def fetch(self, query: str, days_back: int = 1) -> list[dict]:

        print("Using API Key:", NEWSAPI_KEY)  # ← DEBUG
        from_date = (datetime.utcnow() - timedelta(days=days_back)).strftime('%Y-%m-%d')
        params = {
            'q': query,
            'from': from_date,
            'sortBy': 'publishedAt',
            'pageSize': 10,
            'apiKey': NEWSAPI_KEY
        }
        resp = requests.get(self.BASE, params=params)
        #print("API status code:", resp.status_code)
        #print("API response:", resp.text)
        data = resp.json().get('articles', [])
        results = []

        for a in data:
            content = f"{a.get('title', '')} {a.get('description', '')}"
            results.append({
                'title': a.get('title'),
                'description': a.get('description'),
                'url': a.get('url'),
                'published_at': datetime.fromisoformat(a['publishedAt'].rstrip('Z')),
                'fake_news': self.detect_fake_news(content),
                'sentiment': self.detect_sentiment(content)
            })
        
        #print(f"Fetched {len(results)} articles for '{query}'")
        return results
