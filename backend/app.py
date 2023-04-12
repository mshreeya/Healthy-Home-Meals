import os
import pathlib
import requests
from flask import Flask, session, abort, redirect, request
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
import json
from flask_cors import CORS

app = Flask("Google Login App")
CORS(app, supports_credentials=True, expose_headers="Authorization")
app.secret_key = "healthyHomeMeals"
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")
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


def login_is_required(function):
    def wrapper(*args, **kwargs):
        if "google_id" not in session:
            return {"signedIn": False}
        else:
            return {"signedIn": True, **function()}

    return wrapper


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
        id_token=credentials._id_token, request=token_request, audience=GOOGLE_CLIENT_ID
    )

    session["google_id"] = id_info.get("sub")
    session["name"] = id_info.get("name")
    return redirect(secrets_data["data"]["home"])


@app.route("/signout")
def logout():
    session.clear()
    return redirect(secrets_data["data"]["home"])


@app.route("/status")
@login_is_required
def protected_area():
    return {}


if __name__ == "__main__":
    app.run(debug=True, port=4950)
