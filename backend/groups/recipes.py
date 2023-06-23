from flask import session, request
from utils.loginCheck import login_is_required
from utils.recipes import getRecipes, getRecipeByIndex
from utils.ingredients import predict


def init(app, db):
    dbUsers = db.users

    @app.route("/recipesList", methods=["POST"], endpoint="recipesList")
    @login_is_required
    def recipesList():
        data = dbUsers.find_one({"email": session["email"]}, {"_id": 0})
        diet = data["data"]["dietaryStyle"]
        recipes = getRecipes(request.get_json()["data"], diet)
        return {"recipes": recipes}

    @app.route("/recipeDetails", methods=["POST"], endpoint="recipeDetails")
    @login_is_required
    def recipeDetails():
        details = getRecipeByIndex(request.get_json()["id"])
        return details

    @app.route("/ingredientsList", methods=["POST"], endpoint="ingredientsList")
    @login_is_required
    def ingredientsList():
        data = request.get_json()
        imgData = data["img"]
        ingredients = predict(imgData)
        userData = dbUsers.find_one({"email": session["email"]}, {"_id": 0})
        userIngredients = userData["data"]["ingredients"]
        return {"ingredients": list(set(ingredients + userIngredients))}
