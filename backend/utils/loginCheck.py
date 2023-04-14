from flask import session


def login_is_required(function):
    def wrapper(*args, **kwargs):
        if "google_id" not in session:
            return {"signedIn": False}
        else:
            return {
                "signedIn": True,
                "userData": {
                    "name": session["name"],
                    "fname": session["fname"],
                    "email": session["email"],
                },
                **function(),
            }

    return wrapper
