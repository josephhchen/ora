from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from ora.backend.ml_model.preprocess import preprocess_data
from ora.backend.ml_model.train_model import train_model
import json
import requests
import random

api = Blueprint('api', __name__)
CORS(api)  # Apply CORS to the blueprint instead of the Flask app

with open('intents.json') as f:
    intents = json.load(f)

X, y, vectorizer, le, responses = preprocess_data(intents)
clf = train_model(X, y) # Here is where the classifier is trained with the preprocessed data
@api.route('/add_pattern', methods=['POST'])
def add_pattern():
    intent_tag = request.json['intent_tag']
    new_pattern = request.json['new_pattern']

    for intent in intents['intents']:
        if intent['tag'] == intent_tag:
            intent['patterns'].append(new_pattern)
            with open('intents.json', 'w') as f:
                json.dump(intents, f, indent=4)
            return jsonify({'message': 'Pattern added successfully'}), 200

    return jsonify({'message': 'Intent not found'}), 400

def add_intent():
    new_intent = request.json['new_intent']

    intents['intents'].append(new_intent)
    with open('intents.json', 'w') as f:
        json.dump(intents, f, indent=4)
    
    global X, y, vectorizer, le, responses, clf
    X, y, vectorizer, le, responses = preprocess_data(intents)
    clf = train_model(X, y)
    
    return jsonify({'message': 'Intent added successfully'}), 200


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


@api.route('/ask', methods=['POST'])
def ask():
    message = request.json['message'].lower()

    X_pred = vectorizer.transform([message])

    y_pred = clf.predict(X_pred)

    predicted_tag = le.inverse_transform(y_pred)[0]

    for intent in intents['intents']:
        if intent['tag'] == predicted_tag:
            response_message = random.choice(intent['responses'])

            if intent.get('api_call') == "weather_api_endpoint":
                location = message.replace('ora, ', '').replace('?', '').split('weather in ')[-1]
                weather_details = get_weather(location)  
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
    
    return jsonify({'message': 'Sorry, I did not understand that.'})
if __name__ == '__main__':
    app.run(debug=True)