# app/__init__.py
from flask import Flask
from flask_cors import CORS


def create_app():
    app = Flask(__name__)

    # Enable CORS globally
    CORS(app, resources={r"/*": {"origins": "*"}})

    from .routes import register_routes

    register_routes(app)

    return app
