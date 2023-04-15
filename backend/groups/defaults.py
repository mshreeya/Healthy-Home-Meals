from flask import session, request
from utils.loginCheck import login_is_required


def init(app, db):
    dbUsers = db.users

    @app.route("/setDefaults", methods=["POST"], endpoint="setDefault")
    @login_is_required
    def setDefault():
        dbUsers.update_one(
            {"email": session["email"]},
            {"$set": {"data": request.get_json()}},
            upsert=True,
        )
        return {}

    @app.route("/getDefaults", methods=["GET"], endpoint="getDefault")
    @login_is_required
    def getDefault():
        data = dbUsers.find_one({"email": session["email"]}, {"_id": 0})
        return data["data"]
