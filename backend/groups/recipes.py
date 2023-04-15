import json
import requests
from flask import session, request
from utils.loginCheck import login_is_required
from utils.recipes import getRecipes
import os
import pathlib

secret_file = os.path.join(pathlib.Path(__file__).parent.parent, "client_secret.json")
ytApiKey = json.load(open(secret_file))["data"]["youtube"]


def init(app):
    @app.route("/ytVideo", methods=["POST"], endpoint="ytVideo")
    @login_is_required
    def ytVideo():
        res = requests.get(
            "https://www.googleapis.com/youtube/v3/search",
            params={
                "q": f"{request.get_json()['name']} recipe",
                "videoEmbeddable": "true",
                "type": "video",
                "key": ytApiKey,
                "maxResults": 1,
                "part": "snippet",
            },
        )
        resData = res.json()
        return {"id": resData["items"][0]["id"]["videoId"]}

    @app.route("/recipesList", methods=["POST"], endpoint="recipesList")
    @login_is_required
    def recipesList():
        recipes = getRecipes(["potato", "cabbage"])
        return {"recipes": recipes}
