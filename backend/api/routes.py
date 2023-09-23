from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from ora.backend.ml_model.preprocess import preprocess_data
from ora.backend.ml_model.train_model import train_model
import json
import requests
import random
from db_config import db  
from user_schema import user_collection


api = Blueprint('api', __name__)
CORS(api)  

with open('intents.json') as f:
    intents = json.load(f)

X, y, vectorizer, le, responses = preprocess_data(intents)
clf = train_model(X, y)

@api.route('/register', methods=['POST'])
def register():
    user_data = request.json
    user_collection.insert_one(user_data)
    return jsonify({'message': 'User registered successfully!'}), 200

@api.route('/login', methods=['POST'])
def login():
    user_data = request.json
    user = user_collection.find_one({'username': user_data['username']})
    if user and user['password'] == user_data['password']:
        return jsonify({'message': 'Logged in successfully!', 'userId': str(user['_id'])}), 200
    else:
        return jsonify({'message': 'Invalid credentials!'}), 401
    
def get_weather(location):
    url = "https://weatherapi-com.p.rapidapi.com/current.json"
    querystring = {"q": location}  
    headers = {
        "X-RapidAPI-Key": "774c5b7a55mshfa900e364111987p11f98djsn768432abd640",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
    }
    response = requests.get(url, headers=headers, params=querystring)
    response_data = response.json()
    print(response_data)
    return response_data

@api.route('/load_intents', methods=['GET'])
def load_intents():
    global intents, X, y, vectorizer, le, responses, clf
    intent_collection = db['intents']
    intents = list(intent_collection.find({}))
    X, y, vectorizer, le, responses = preprocess_data(intents)
    clf = train_model(X, y)
    return jsonify({'message': 'Intents reloaded successfully'}), 200

#route to handle chat interactions
@api.route('/ask', methods=['POST'])
def ask():
    user_id = request.json.get('user_id', None)  # Retrieve the user ID from the request

    message = request.json['message'].lower()
    chat_collection = db['chat_history']  # Initialize the chat_collection at the top
    # Step 1: Transform the input message
    X_pred = vectorizer.transform([message])

    # Step 2: Use the trained classifier to predict the intent
    y_pred = clf.predict(X_pred)

    # Step 3: Get the predicted tag name
    predicted_tag = le.inverse_transform(y_pred)[0]

    # Step 4: Find the correct intent based on the predicted tag
    for intent in intents['intents']:

        
        if intent['tag'] == predicted_tag:
            response_message = random.choice(intent['responses'])
            chat_collection.insert_one({
                    'user_query': message,
                    'bot_response': response_message,
                    'user_id': user_id  # Store the user ID
                })

            # Step 5: If necessary, call the weather API
            if intent.get('api_call') == "weather_api_endpoint":
                # Extract location from the message (this is a basic approach, you might want a more robust solution)
                location = message.replace('ora, ', '').replace('?', '').split('weather in ')[-1]
                weather_details = get_weather(location)  # Pass the location to the get_weather function
                response_message += f" The current weather in {weather_details['location']['name']}, {weather_details['location']['region']} is as follows:\n"
                response_message += f"- Condition: {weather_details['current']['condition']['text']}\n"
                response_message += f"- Temperature: {weather_details['current']['temp_c']}°C ({weather_details['current']['temp_f']}°F)\n"
                response_message += f"- Wind: {weather_details['current']['wind_mph']} mph coming from the {weather_details['current']['wind_dir']}\n"
                response_message += f"- Humidity: {weather_details['current']['humidity']}%\n"
                response_message += f"- Pressure: {weather_details['current']['pressure_mb']} mb\n"
                response_message += f"- Visibility: {weather_details['current']['vis_km']} km\n"
                response_message += f"- UV Index: {weather_details['current']['uv']}\n"
                            
            response = {
                'message': response_message,
            }
            return jsonify(response)
    chat_collection.insert_one({
                    'user_query': message,
                    'bot_response': 'Sorry, I did not understand that.',
                    'user_id': user_id  # Store the user ID
                })
    
    return jsonify({'message': 'Sorry, I did not understand that.'})
if __name__ == '__main__':
    app.run(debug=True)