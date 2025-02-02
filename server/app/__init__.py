from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    # Enable CORS properly for all origins and methods
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    from .routes import register_routes
    register_routes(app)

    return app
