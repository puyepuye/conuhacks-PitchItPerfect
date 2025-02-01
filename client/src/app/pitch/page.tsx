"use client";

import { useState, useEffect } from "react";

export default function PitchPage() {
  const [transcription, setTranscription] = useState<string>("");
  const [recording, setRecording] = useState<boolean>(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setTranscription(transcript);
      };

      recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error', event);
      };

      recognitionInstance.onend = () => {
        setRecording(false);
        console.log('Speech recognition ended');
      };

      setRecognition(recognitionInstance);
    } else {
      alert('Your browser does not support the Web Speech API');
    }
  }, []);

  const startRecording = () => {
    if (recognition && !recording) {
      recognition.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognition && recording) {
      recognition.stop();
      setRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Pitch It Perfect</h1>
      <button
        onClick={startRecording}
        disabled={recording}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        {recording ? "Recording..." : "Start Recording"}
      </button>
      <button
        onClick={stopRecording}
        disabled={!recording}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Stop Recording
      </button>
      <h2 className="mt-4 font-semibold">Transcription:</h2>
      <p className="text-lg">{transcription}</p>
    </div>
  );
}
