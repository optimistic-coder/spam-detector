from flask import Flask
from flask_restful import Resource, Api, reqparse
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from flask_cors import CORS, cross_origin
app = Flask(__name__)
#CORS(app, support_credentials=True)
parser = reqparse.RequestParser()


@app.route('/predict', methods=['POST', 'GET'])
@cross_origin()
def pridict():
    parser.add_argument('message', type=str)
    args = parser.parse_args()
    df = pd.read_csv("spam.csv", encoding="latin-1")
    df.drop(['Unnamed: 2', 'Unnamed: 3', 'Unnamed: 4'], axis=1, inplace=True)
    # Features and Labels
    df['label'] = df['class'].map({'ham': 0, 'spam': 1})
    X = df['message']
    y = df['label']
    # Extract Feature With CountVectorizer
    cv = CountVectorizer()
    X = cv.fit_transform(X)  # Fit the Data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.33, random_state=42)
    # Naive Bayes Classifier
    clf = MultinomialNB()
    clf.fit(X_train, y_train)
    clf.score(X_test, y_test)
    vect = cv.transform([args['message']]).toarray()
    my_prediction = clf.predict(vect)
    print(my_prediction)
    # print(args['message'])
    # predictions = model.predict(cv.transform(
    #     ['you won 100$ now give me bank details']).toarray())
    return '%d' % my_prediction
