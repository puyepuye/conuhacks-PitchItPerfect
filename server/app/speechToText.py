import cv2
import wave
import threading
import queue
import sounddevice as sd
import numpy as np
from google.cloud import speech
from google.auth import credentials

# Replace this with your actual API key
API_KEY = "AIzaSyD7ujWKzDMKVM4JgewtXuFdPVE9Hj6f0bE"

# Google Speech-to-Text Client with API key
client = speech.SpeechClient(credentials=API_KEY)

# Audio settings
RATE = 16000  # Recommended sample rate
CHUNK = int(RATE / 10)  # Buffer size (100ms chunks)
CHANNELS = 1  # Mono channel

# Queue to store audio chunks
audio_queue = queue.Queue()

# OpenCV Video Capture
video = cv2.VideoCapture(0)  # Open webcam
video.set(3, 1280)  # Set width
video.set(4, 720)   # Set height

# Output files
video_filename = "output.avi"
audio_filename = "output.wav"
transcription_filename = "transcription.txt"

# Video Writer
fourcc = cv2.VideoWriter_fourcc(*"XVID")
video_out = cv2.VideoWriter(video_filename, fourcc, 20.0, (1280, 720))

# Function to record audio
def record_audio():
    with wave.open(audio_filename, "wb") as wf:
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(np.dtype(np.int16).itemsize)
        wf.setframerate(RATE)

        def callback(indata, frames, time, status):
            if status:
                print(status)
            wf.writeframes(indata)
            audio_queue.put(indata)

        with sd.InputStream(callback=callback, channels=CHANNELS, samplerate=RATE, dtype='int16'):
            while recording:
                sd.sleep(100)  # sleep while recording audio

# Function to transcribe audio in real-time
def transcribe_audio():
    def audio_generator():
        while recording:
            yield speech.StreamingRecognizeRequest(audio_content=audio_queue.get())

    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=RATE,
        language_code="en-US",
        enable_automatic_punctuation=True,
    )
    streaming_config = speech.StreamingRecognitionConfig(config=config, interim_results=True)

    responses = client.streaming_recognize(streaming_config, audio_generator())

    with open(transcription_filename, "w") as f:
        for response in responses:
            for result in response.results:
                text = result.alternatives[0].transcript
                print(f"Transcript: {text}")
                f.write(text + "\n")

# Start recording
recording = True
audio_thread = threading.Thread(target=record_audio)
transcription_thread = threading.Thread(target=transcribe_audio)

audio_thread.start()
transcription_thread.start()

while True:
    ret, frame = video.read()
    if not ret:
        break

    cv2.imshow("Recording Video", frame)
    video_out.write(frame)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        recording = False
        break

# Cleanup
recording = False
audio_thread.join()
transcription_thread.join()
video.release()
video_out.release()
cv2.destroyAllWindows()

print("Recording finished. Video saved to", video_filename)
print("Audio saved to", audio_filename)
print("Transcription saved to", transcription_filename)
