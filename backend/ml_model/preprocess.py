import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
import random
nltk.download('punkt')

def preprocess_data(intents):
    patterns = []
    responses = []
    labels = []

    #prepare data from intents

    for intent in intents['intents']:
        for pattern in intent['patterns']:
            patterns.append(pattern)
            responses.append(random.choice(intent['responses'])) 
            labels.append(intent['tag'])

    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform(patterns)

    le = LabelEncoder()
    y = le.fit_transform(labels)
    
    #return preprocessed data

    return X, y, vectorizer, le, responses