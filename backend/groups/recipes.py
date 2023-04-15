from flask import session, request
from utils.loginCheck import login_is_required
from utils.recipes import getRecipes, getRecipeByIndex


def init(app):
    @app.route("/recipesList", methods=["POST"], endpoint="recipesList")
    @login_is_required
    def recipesList():
        recipes = getRecipes(request.get_json()["data"])
        return {"recipes": recipes}

    @app.route("/recipeDetails", methods=["POST"], endpoint="recipeDetails")
    @login_is_required
    def recipeDetails():
        details = getRecipeByIndex(request.get_json()["id"])
        return details

    @app.route("/ingredientsList", methods=["POST"], endpoint="ingredientsList")
    @login_is_required
    def ingredientsList():
        return {"ingredients": ["potato", "cabbage"]}
