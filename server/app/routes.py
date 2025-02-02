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
    
    @app.route('/analyze_filler_words', methods=['POST'])
    def analyze_filler_words_route():
        data = request.get_json()
        text = data.get("text", "")
        filler_data = analyze_filler_words(text)
        feedback = generate_filler_feedback(filler_data)
        return jsonify({"filler_feedback": feedback})

    @app.route('/analyze_sentiment', methods=['POST'])
    def analyze_sentiment_route():
        data = request.get_json()
        text = data.get("text", "")
        context = data.get("context", "enthusiastic")
        feedback = analyze_sentiment(text, context)
        return jsonify({"sentiment_feedback": feedback})

    @app.route('/analyze_modulation', methods=['POST'])
    def analyze_modulation_route():
        data = request.get_json()
        pitch_data = data.get("pitch_data", [])
        volume_data = data.get("volume_data", [])
        feedback = analyze_modulation(pitch_data, volume_data)
        return jsonify({"modulation_feedback": feedback})
    
    @app.route('/analyze_modulation', methods=['POST'])
    def analyze_modulation_with_articulation_route():
        # Get the JSON data sent by the React client
        data = request.get_json()

        pitch_data = data.get('pitch_data')
        volume_data = data.get('volume_data')
        words = data.get('words')
        context = data.get('context')

        # Check if all data is present
        if not all([pitch_data, volume_data, words, context]):
            return jsonify({"error": "Missing data."}), 400

        # Call the analyze_modulation_with_articulation function
        result = analyze_modulation_with_articulation(pitch_data, volume_data, words, context)
        
        # Return the result as a JSON response
        return jsonify({"modulation_feedback": result})

    @app.route('/is_persuasive', methods=['POST'])
    def is_persuasive_route():
        data = request.get_json()
        text = data.get("text", "")
        context = data.get("context", "")
        feedback = is_persuasive(text, context)
        return jsonify({"persuasiveness_feedback": feedback})
