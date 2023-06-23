from flask import Flask
from flask_cors import CORS
import groups.auth
import groups.defaults
import groups.recipes
from pymongo import MongoClient
import json

app = Flask("Google Login App")
CORS(app, supports_credentials=True, expose_headers="Authorization")

# Database
mongoUrl = json.load(open("client_secret.json"))["data"]["mongo"]
dbClient = MongoClient(mongoUrl)
db = dbClient.healthyHomeMeals

# Route groups
groups.auth.init(app, db)
groups.defaults.init(app, db)
groups.recipes.init(app, db)

if __name__ == "__main__":
    print("Runing...")
    app.run(debug=True, port=4950)
