# app/__init__.py
from flask import Flask


def create_app():
    app = Flask(__name__)
    app.config["DEBUG"] = True

    # Import routes to register endpoints.
    from . import routes

    # If not using blueprints, ensure routes are registered (e.g., via function calls)
    routes.register_routes(app)

    return app
