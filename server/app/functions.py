import spacy
import nltk
import numpy as np
import os
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.tokenize import sent_tokenize
import google.generativeai as genai

# Configure API key

# Load NLP models
nlp = spacy.load("en_core_web_sm")
nltk.download("vader_lexicon")
nltk.download("punkt")

# Functions for analysis (same as in your code above)


def analyze_filler_words(text):
    filler_words = ["um", "like", "you know", "so", "uh", "yeah", "maybe"]
    words = text.split(" ")
    fillers_used = [word for word in words if word.lower() in filler_words]
    return {"filler_words": fillers_used, "count": len(fillers_used)}


def generate_filler_feedback(filler_data):
    filler_words_count = filler_data["count"]
    filler_words = filler_data["filler_words"]
    filler_feedback = ""
    filler_words = [word for word in filler_words if word.lower() != ""]
    if filler_words_count > 3:
        filler_feedback = f"Try to avoid using too many filler words. You used {filler_words_count} of them: {', '.join(filler_words)}."
    elif filler_words_count > 0:
        filler_feedback = f"Consider reducing filler words. You used {filler_words_count} of them: {', '.join(filler_words)}."
    else:
        filler_feedback = "Great job! You didn't use any filler words."

    return filler_feedback


def analyze_sentiment(text, context="enthusiastic"):
    sia = SentimentIntensityAnalyzer()
    sentences = sent_tokenize(text)
    positive_count = 0
    neutral_count = 0
    total_sentences = len(sentences)

    if total_sentences == 0:
        return "No content to analyze."

    for sentence in sentences:
        sentiment = sia.polarity_scores(sentence)

        if sentiment["compound"] > 0.7:
            positive_count += 1
        elif sentiment["compound"] < 0.3:
            pass
        else:
            neutral_count += 1

    positive_ratio = positive_count / total_sentences
    neutral_ratio = neutral_count / total_sentences

    combined_score = positive_ratio + neutral_ratio

    if context == "enthusiastic":
        if combined_score < 0.4:
            return "Your tone could benefit from more enthusiasm. Try to add energy and engagement to better connect with your audience."
        elif combined_score > 0.9:
            return "Your speech contains great enthusiasm! Your tone is engaging and energetic, which helps to captivate your audience."
        else:
            return f"Your enthusiasm is good, but you can increase the energy slightly to better engage your audience. (Combined Score: {combined_score:.2f})"
    elif context == "formal":
        if combined_score < 0.3:
            return "Your tone could benefit from more enthusiasm. Try to add energy and engagement to better connect with your audience."
        elif combined_score > 1:
            return f"Great enthusiasm, but for formal settings, a more composed tone is preferred. Aim for a balanced energy level that conveys professionalism while still engaging your audience. (Formality and Enthusiasm Score: {combined_score:.2f})"
        else:
            return f"Your tone is appropriately balanced for a formal context. Keep up the good work maintaining professionalism with subtle enthusiasm. (Formality Score: {combined_score:.2f})"


def analyze_modulation(pitch_data, volume_data):
    pitch_variation = np.std(pitch_data)
    if pitch_variation < 1.0:
        pitch_analysis = "Your pitch variation is quite low. Varying your pitch more can help keep the listener engaged."
    else:
        pitch_analysis = "Great job on maintaining a varied pitch."

    volume_variation = np.std(volume_data)
    if volume_variation < 1.0:
        volume_analysis = "Your volume is fairly consistent. Adding more variation in volume can highlight important points."
    else:
        volume_analysis = "Well done on varying your volume."

    pacing = np.mean(np.diff(np.array(pitch_data))) + np.mean(
        np.diff(np.array(volume_data))
    )
    if pacing < 0.5:
        pacing_analysis = (
            "Your pacing may be too rushed or slow. Aim for a more consistent rhythm."
        )
    else:
        pacing_analysis = "Your pacing is well-balanced."

    return pitch_analysis + " " + volume_analysis + " " + pacing_analysis


def analyze_modulation_with_articulation(pitch_data, volume_data, words):
    """
    Analyzes pitch, volume, and articulation based on context-specific criteria.
    Handles different input lengths by truncating or padding them.

    Parameters:
    - pitch_data (list or numpy array): A sequence of pitch values over time.
    - volume_data (list or numpy array): A sequence of volume values over time.
    - words (list): A list of words spoken, in the same order as the pitch and volume data.

    Returns:
    - list: Contains analysis feedback for modulation, articulation, and emphasis.
    """

    print("pitch:", pitch_data)
    print("volume:", volume_data)
    print("words:", words)

    words = words.split(" ")
    words = set([word for word in words if word != ""])

    # Check for empty inputs
    if not pitch_data or not volume_data or not words:
        return {
            "error": "Invalid input data. Ensure pitch, volume, and words data are not empty."
        }

    # Convert inputs to NumPy arrays for easy manipulation
    pitch_data = np.array(pitch_data, dtype=float)
    volume_data = np.array(volume_data, dtype=float)
    words = np.array(words, dtype=str)

    # Find the target length (length of the words list)
    target_length = len(words)

    # Adjust lengths to match words length
    if len(pitch_data) < target_length:
        pitch_data = np.pad(pitch_data, (0, target_length - len(pitch_data)), constant_values=np.mean(pitch_data))
    elif len(pitch_data) > target_length:
        pitch_data = pitch_data[:target_length]

    if len(volume_data) < target_length:
        volume_data = np.pad(volume_data, (0, target_length - len(volume_data)), constant_values=np.mean(volume_data))
    elif len(volume_data) > target_length:
        volume_data = volume_data[:target_length]

    # Load spaCy model for NLP tasks
    nlp = spacy.load("en_core_web_sm")
    sentence = " ".join(words)
    doc = nlp(sentence)

    # Extract key emphasis words (nouns, verbs, adjectives)
    emphasized_words = [token.text for token in doc if token.pos_ in ["NOUN", "VERB", "ADJ"]]

    # Categorizing words based on emphasis
    articulation_feedback = {
        "needs_emphasis": [],
        "well_emphasized": [],
        "no_emphasis": [],
    }

    mean_pitch = np.mean(pitch_data)
    mean_volume = np.mean(volume_data)

    for i, word in enumerate(words):
        if word.lower() in emphasized_words:
            if volume_data[i] < mean_volume or pitch_data[i] < mean_pitch:
                articulation_feedback["needs_emphasis"].append(word)
            else:
                articulation_feedback["well_emphasized"].append(word)
        else:
            articulation_feedback["no_emphasis"].append(word)

    # Generating feedback
    articulation_feedback_text = []

    if articulation_feedback["needs_emphasis"]:
        articulation_feedback_text.append(
            f"The word(s) [{', '.join(articulation_feedback['needs_emphasis'])}] need to be more emphasized. "
            "Increasing the pitch or volume will make them stand out more clearly."
        )

    if articulation_feedback["well_emphasized"]:
        articulation_feedback_text.append(
            f"The word(s) [{', '.join(articulation_feedback['well_emphasized'])}] are emphasized well. "
            "This adds to the impact of your message."
        )

    if articulation_feedback["no_emphasis"]:
        articulation_feedback_text.append(
            f"The word(s) [{', '.join(articulation_feedback['no_emphasis'])}] do not need emphasis. "
            "Keeping the focus on key words helps avoid over-emphasis and maintains clarity."
        )

    return articulation_feedback_text



def analyze_filler_feedback(filler_data):
    filler_words_count = filler_data["count"]
    filler_words = filler_data["filler_words"]
    filler_feedback = ""

    if filler_words_count > 3:
        filler_feedback = f"Try to avoid using too many filler words. You used {filler_words_count} of them: {', '.join(filler_words)}."
    elif filler_words_count > 0:
        filler_feedback = f"Consider reducing filler words. You used {filler_words_count} of them: {', '.join(filler_words)}."
    else:
        filler_feedback = "Great job! You didn't use any filler words."

    return filler_feedback


def is_persuasive(text, context):
    try:
        genai.configure(api_key="")
        model = genai.GenerativeModel(
            "gemini-1.5-flash"
        )  # Use "gemini-1.5-flash" for a faster/cheaper option
        response = model.generate_content(
            f"Evaluate the persuasiveness of the following text based on the given context:\n\n"
            f"Context: {context}\n\nText: {text}\n\n"
            f"Is the text persuasive? Why or why not? Provide a concise explanation."
        )
        return response.text.strip()  # Extract response text

    except Exception as e:
        return str(e)


def rubric(text):
    try:
        genai.configure(api_key="")
        model = genai.GenerativeModel(
            "gemini-1.5-flash"
        )  # Use "gemini-1.5-flash" for a faster/cheaper option
        response = model.generate_content(
            f"Evaluate the following presentation or pitch based on four key categories: Clarity & Organization (30%), Persuasiveness & Effectiveness (50%), Confidence & Delivery (10%), and Passion & Engagement (10%).\n\n"
            f"For each category, provide: A score from 1 to 5 (5 = excellent, 1 = poor), Return 4 numbers from 1-4 in order of the categories separated by comma. Nothing else.\n\n"
            f"Text: {text}\n\n"
        )
        print(response.text.strip())
        return response.text.strip()  # Extract response text

    except Exception as e:
        return str(e)

