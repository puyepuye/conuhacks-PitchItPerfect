from flask import jsonify, request


def register_routes(app):
    @app.route("/")
    def index():
        return "Welcome to PitchtPerfect!"

    @app.route("/api/pitch", methods=["GET"])
    def get_pitch():
        return jsonify({"message": "Sample"}), 200
