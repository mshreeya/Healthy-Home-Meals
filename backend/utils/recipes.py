import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os
import pathlib
import json
import requests
from pprint import pprint
import json
import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta

ingredients_file = os.path.join(
    pathlib.Path(__file__).parent.parent, "data/ingredients.csv"
)
ingredients = pd.read_csv(ingredients_file)
vectorizer = CountVectorizer(stop_words="english")
ingredients_vectors = vectorizer.fit_transform(ingredients["ingredients"])

recipes_file = os.path.join(pathlib.Path(__file__).parent.parent, "data/recipes.csv")
recipes = pd.read_csv(recipes_file)

secret_file = os.path.join(pathlib.Path(__file__).parent.parent, "client_secret.json")
ytApiKey = json.load(open(secret_file))["data"]["youtube"]


def suggest_recipes_index(input_ingredients, num_suggestions):
    input_str = ", ".join(input_ingredients)
    input_vector = vectorizer.transform([input_str])
    similarity_scores = cosine_similarity(input_vector, ingredients_vectors)
    top_indices = similarity_scores.argsort()[0][-num_suggestions:]
    return list(top_indices)


def getDietString(diet):
    try:
        str = (", ".join([item for item in diet if item != "Vegetarian"]),)
    except:
        str = "General"
    return str


def getRecipes(ingredients, diet):
    res = requests.post(
        "https://realfood.tesco.com/api/ingredientsearch/getrecipes",
        json={
            "ingredients": ingredients,
            "dietaryRequirements": diet,
            "mandatoryIngredients": [],
        },
    )
    resData = res.json()

    suggested_recipes_dict = [
        {
            "name": i["recipeName"],
            "ingredients": i["ingredientsList"],
            "time": i["duration"],
            "serves": i["serves"],
            "instructions": [],
            "url": i["recipeUrl"].split("/")[-1][:-5],
            "image": i["recipeImage"],
            "diet": getDietString(i["dietary"]),
        }
        for i in resData["results"]
    ]

    if len(suggested_recipes_dict) < 3:
        return suggested_recipes_dict

    return suggested_recipes_dict[:3]


def ptTimeToMins(time):
    try:
        t = datetime.strptime(time, "PT%MM")
        td = timedelta(minutes=t.minute)
        seconds = td.total_seconds()
    except:
        t = datetime.strptime(time, "PT%HH%MM")
        td = timedelta(hours=t.hour, minutes=t.minute)
        seconds = td.total_seconds()
    return seconds // 60


def getRecipeDetails(slug):
    parser = "html.parser"
    req = requests.get("https://realfood.tesco.com/recipes/" + slug + ".html")
    soup = BeautifulSoup(req.text, parser)
    data = json.loads(
        "".join(soup.find("script", {"type": "application/ld+json"}).contents)
    )

    recipes_dict = {
        "name": data["name"],
        "ingredients": data["recipeIngredient"],
        "time": ptTimeToMins(data["totalTime"]),
        "cuisine": data["recipeCuisine"],
        "instructions": "\n".join([i["text"] for i in data["recipeInstructions"]]),
        "url": data["url"],
        "image": data["image"][0]["url"],
        "id": slug,
        "nutrition": {
            "calories": data["nutrition"]["calories"],
            "fats": data["nutrition"]["fatContent"],
            "protein": data["nutrition"]["proteinContent"],
        },
        "feeds": data["recipeYield"],
    }

    return recipes_dict


def getRecipeByIndex(index):
    recipes_dict = getRecipeDetails(index)

    res = requests.get(
        "https://www.googleapis.com/youtube/v3/search",
        params={
            "q": f"{recipes_dict['name']} recipe",
            "videoEmbeddable": "true",
            "type": "video",
            "key": ytApiKey,
            "maxResults": 1,
            "part": "snippet",
        },
    )
    resData = res.json()
    recipes_dict["youtube"] = (
        "https://www.youtube.com/embed/" + resData["items"][0]["id"]["videoId"]
    )
    return recipes_dict
