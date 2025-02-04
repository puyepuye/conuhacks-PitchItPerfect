from flask import jsonify, request
from app.functions import (
    analyze_filler_words,
    generate_filler_feedback,
    analyze_sentiment,
    analyze_modulation,
    analyze_modulation_with_articulation,
    is_persuasive,
    rubric,
)


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

    @app.route("/api/analyze_all", methods=["POST"])
    def analyze_all_route():
        data = request.get_json()

        if not data:
            return jsonify({"error": "Invalid JSON data"}), 400

        # Filler words analysis
        text = data.get("transcription")
        filler_feedback = None
        if text:
            filler_data = analyze_filler_words(text)
            filler_feedback = generate_filler_feedback(filler_data)

        # Sentiment analysis
        context = data.get("context", "enthusiastic")
        sentiment_feedback = analyze_sentiment(text, context)

        # Modulation analysis
        pitch_data = data.get("pitchData", [])
        volume_data = data.get("volumeData", [])
        modulation_analysis = analyze_modulation(pitch_data, volume_data)

        # Modulation with articulation analysis
        words = data.get("transcription", [])
        articulation_analysis = analyze_modulation_with_articulation(
            pitch_data, volume_data, words
        )

        # Persuasiveness analysis
        persuasiveness_feedback = is_persuasive(text, context)

        # Return all analysis results in a single response
        return jsonify(
            {
                "filler_feedback": filler_feedback,
                "filler_data": filler_data,
                "sentiment_feedback": sentiment_feedback,
                "modulation_analysis": modulation_analysis,
                "articulation_analysis": articulation_analysis,
                "persuasiveness_feedback": persuasiveness_feedback,
            }
        )

    # 🛠 Combined Route: Receives pitch data & analyzes all aspects
    @app.route("/api/analyze_pitch", methods=["POST"])
    def analyze_pitch():
        data = request.get_json()

        if not data:
            return jsonify({"error": "Invalid JSON data"}), 400

        # Filler words analysis
        text = data.get("transcription")
        filler_data = analyze_filler_words(text)
        filler_feedback = generate_filler_feedback(filler_data)

        # Sentiment analysis
        context = data.get("context", "enthusiastic")
        sentiment_feedback = analyze_sentiment(text, context)

        # Modulation analysis
        pitch_data = data.get("pitchData", [])
        volume_data = data.get("volumeData", [])
        modulation_analysis = analyze_modulation(pitch_data, volume_data)

        # Modulation with articulation analysis
        words = data.get("transcription")
        articulation_analysis = analyze_modulation_with_articulation(
            pitch_data, volume_data, words
        )
        # # Persuasiveness analysis
        # persuasiveness_feedback = is_persuasive(text, context)

        # # Rubric evaluation
        # rubric_feedback = rubric(text)
        # Return all results in one response
        return jsonify(
            {
                "filler_feedback": filler_feedback,
                "filler_data": filler_data,
                "sentiment_feedback": sentiment_feedback,
                "modulation_analysis": modulation_analysis,
                "articulation_analysis": articulation_analysis
                # "persuasiveness_feedback": persuasiveness_feedback,
                # "rubric_feedback": rubric_feedback,
            }
        ), 200
