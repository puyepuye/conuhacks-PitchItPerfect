from flask import jsonify, request


def register_routes(app):
    @app.route("/")
    def index():
        return "Welcome to PitchtPerfect!"

    @app.route("/api/pitch", methods=["POST"])
    def receive_pitch():
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON data"}), 400

        pitch = data.get("pitchData")
        volume = data.get("volumeData")
        emotions = data.get("emotionData")

        if pitch is None:  # Use `None` check to allow 0 values
            return jsonify({"error": "Missing 'pitch' field"}), 400

        return jsonify(
            {
                "message": "Data received successfully",
                "received_pitch": pitch,
                "received_volume": volume,
                "received_emotions": emotions,
            }
        ), 200
