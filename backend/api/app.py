from flask import Flask
from pymongo import MongoClient

#establish a connection to MongoDB running on localhost and connect to the 'oraDB' database

client = MongoClient('mongodb://localhost:27017/')
db = client['oraDB']

app = Flask(__name__)

#import and register the API blueprint to the Flask app
from routes import api  
app.register_blueprint(api, url_prefix='/api')

#start the Flask application
if __name__ == '__main__':
    app.run(debug=True)
