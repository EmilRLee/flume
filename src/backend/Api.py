import pymongo, jsonify
from pymongo import MongoClient
connection = MongoClient()
db = connection.flume
from flask import Flask, jsonify
from bson.json_util import dumps

app = Flask(__name__)

@app.route("/")
def hello():
    user = db.users.find_one()
    duser = dict(user)
    return str(user.fname)

if __name__ == "__main__":
    app.run(port=3001)