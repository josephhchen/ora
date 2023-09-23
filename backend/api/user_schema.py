# user_schema.py
from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['oraDB']

user_collection = db['users']
