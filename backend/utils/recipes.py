import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os
import pathlib

ingredients_file = os.path.join(
    pathlib.Path(__file__).parent.parent, "data\\ingredients.csv"
)
ingredients = pd.read_csv(ingredients_file)
vectorizer = CountVectorizer(stop_words="english")
ingredients_vectors = vectorizer.fit_transform(ingredients["ingredients"])

recipes_file = os.path.join(pathlib.Path(__file__).parent.parent, "data\\recipes.csv")
recipes = pd.read_csv(recipes_file)


def suggest_recipes_index(input_ingredients, num_suggestions):
    input_str = ", ".join(input_ingredients)
    input_vector = vectorizer.transform([input_str])
    similarity_scores = cosine_similarity(input_vector, ingredients_vectors)
    top_indices = similarity_scores.argsort()[0][-num_suggestions:]
    return list(top_indices)


def getRecipes(ingredients):
    indices = suggest_recipes_index(ingredients, 3)
    suggested_recipes_list = recipes.iloc[indices, :].values.tolist()
    suggested_recipes_dict = [
        {
            "name": i[0],
            "ingredients": i[6].split(","),
            "time": i[2],
            "cuisine": i[3],
            "instructions": i[4],
            "url": i[5],
            "image": i[7],
        }
        for i in suggested_recipes_list
    ]
    suggested_recipes_dict = sorted(
        suggested_recipes_dict, key=lambda d: len(d["ingredients"])
    )
    return suggested_recipes_dict
