# MONGO_CONFIG = {
#     "uri": "mongodb://localhost:27017",
#     "db_name": "News_app",
#     "collection": "News-cards"
# }
# NEWSAPI_KEY = "38eff88468f94afba4f9d62742a1870e"
# #NEWS_API_KEY=38eff88468f94afba4f9d62742a1870e
# #MONGO_URI=mongodb://localhost:27017  # For local instance
# # For Atlas: mongodb+srv://<username>:<password>@cluster.x.mongodb.net
import os

# MongoDB Configuration
MONGO_CONFIG = {
    'uri': os.getenv('MONGO_URI', 'mongodb://localhost:27017/'),
    'db_name': os.getenv('MONGO_DB_NAME', 'News_app'),
    'collection': os.getenv('MONGO_COLLECTION', 'News-cards')
}

# News API Configuration
NEWSAPI_KEY = os.getenv('NEWSAPI_KEY', '38eff88468f94afba4f9d62742a1870e')
