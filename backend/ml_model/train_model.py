from sklearn.ensemble import RandomForestClassifier

def train_model(X, y):
    """
    Trains a random forest classifier with the given data.
    
    Parameters:
    - X: The feature matrix
    - y: The target labels
    
    Returns:
    - clf: The trained classifier
    """
    
    clf = RandomForestClassifier()
    clf.fit(X, y)
    
    return clf