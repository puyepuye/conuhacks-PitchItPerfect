import spacy
from transformers import pipeline
# import parselmouth

nlp = spacy.load("en_core_web_sm")

def analyze_filler_words(text):
    filler_words = ["um", "like", "you know", "so", "uh"]
    words = text.split()
    fillers_used = [word for word in words if word.lower() in filler_words]
    return {"filler_words": fillers_used, "count": len(fillers_used)}


def analyze_sentiment(text):
    sentiment_model = pipeline("sentiment-analysis")
    return sentiment_model(text)

# def analyze_pitch(audio_file):
#     snd = parselmouth.Sound(audio_file)
#     pitch = snd.to_pitch()
#     mean_pitch = pitch.selected_array['frequency'].mean()
#     return {"average_pitch": mean_pitch}

audio_path = "presentation_audio.wav"

speech_text = "Um, so I think like this is a good idea."
filler_result = analyze_filler_words(speech_text)
sentiment_result = analyze_sentiment(speech_text)
# pitch_result = analyze_pitch(audio_path)
print(filler_result)
print(sentiment_result)
# print(pitch_result)

