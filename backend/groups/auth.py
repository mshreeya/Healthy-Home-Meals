import os
import pathlib
from google_auth_oauthlib.flow import Flow
import json
from flask import session, abort, redirect, request
from google.oauth2 import id_token
from pip._vendor import cachecontrol
import requests
import google.auth.transport.requests
from utils.loginCheck import login_is_required


def init(app, db):
    dbUsers = db.users
    app.secret_key = "healthyHomeMeals"
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
    client_secrets_file = os.path.join(
        pathlib.Path(__file__).parent.parent, "client_secret.json"
    )
    secrets_data = json.load(open(client_secrets_file))
    GOOGLE_CLIENT_ID = secrets_data["web"]["client_id"]

    flow = Flow.from_client_secrets_file(
        client_secrets_file=client_secrets_file,
        scopes=[
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "openid",
        ],
        redirect_uri=secrets_data["data"]["redirect_uri"],
    )

    @app.route("/signin")
    def login():
        (
            authorization_url,
            state,
        ) = flow.authorization_url()
        session["state"] = state
        return redirect(authorization_url)

    @app.route("/callback")
    def callback():
        flow.fetch_token(authorization_response=request.url)

        if not session["state"] == request.args["state"]:
            abort(500)

        credentials = flow.credentials
        request_session = requests.session()
        cached_session = cachecontrol.CacheControl(request_session)
        token_request = google.auth.transport.requests.Request(session=cached_session)

        id_info = id_token.verify_oauth2_token(
            id_token=credentials._id_token,
            request=token_request,
            audience=GOOGLE_CLIENT_ID,
        )

        session["google_id"] = id_info.get("sub")
        session["name"] = id_info.get("name")
        session["fname"] = id_info.get("given_name")
        session["email"] = id_info.get("email")

        dbUsers.update_one(
            {"email": session["email"]},
            {
                "$set": {"email": session["email"]},
                "$setOnInsert": {
                    "data": {"ingredients": [], "allergies": [], "dietaryStyle": []}
                },
            },
            upsert=True,
        )

        return redirect(secrets_data["data"]["home"])

    @app.route("/signout")
    def logout():
        session.clear()
        return redirect(secrets_data["data"]["home"])

    @app.route("/status")
    @login_is_required
    def status():
        return {}
