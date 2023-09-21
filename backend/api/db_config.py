from pymongo import MongoClient

#establish a MongoDB connection to localhost and connect to the 'oraDB' database

client = MongoClient('mongodb://localhost:27017/')
db = client['oraDB']