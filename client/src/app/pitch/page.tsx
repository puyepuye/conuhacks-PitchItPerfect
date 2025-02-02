"use client";

import { useState, useRef } from "react";
import Webcam from "react-webcam";
import * as faceapi from "@vladmandic/face-api";
import Pitchfinder from "pitchfinder";

export default function PitchPage() {
  const [transcription, setTranscription] = useState("");
  const [recording, setRecording] = useState(false);
  const [pitchData, setPitchData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [emotionData, setEmotionData] = useState([]);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const recognitionRef = useRef(null);
  const intervalRef = useRef(null);

  const loadModels = async () => {
    const MODEL_URL = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights';
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]);
  };

  const initAudio = async () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      microphoneRef.current = microphone;
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const initSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      let incrementedTranscription = "";
      recognition.onresult = (event) => {
        const lastResult = event.results[event.results.length - 1][0].transcript;
        incrementedTranscription += ' ' + lastResult;
        setTranscription(incrementedTranscription);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event);
      };

      recognitionRef.current = recognition;
    } else {
      alert("Your browser does not support the Web Speech API");
    }
  };

  const startRecording = () => {
    setPitchData([]);
    setVolumeData([]);
    setEmotionData([]);
    setTranscription("");
    setRecording(true);
    
    initAudio();
    initSpeechRecognition();
    recognitionRef.current?.start();

    intervalRef.current = setInterval(() => {
      if (analyserRef.current) {
        const bufferLength = analyserRef.current.fftSize;
        const dataArray = new Float32Array(bufferLength);
        analyserRef.current.getFloatTimeDomainData(dataArray);

        const rms = Math.sqrt(dataArray.reduce((sum, val) => sum + val * val, 0) / bufferLength);
        setVolumeData((prev) => [...prev, rms]);

        const detectPitch = Pitchfinder.YIN({ sampleRate: audioContextRef.current.sampleRate });
        const pitch = detectPitch(dataArray);
        if (pitch && pitch < 1000) {
          setPitchData((prev) => [...prev, pitch]);
        }
      }
    }, 1000);
  };
  
  const sendData = async () => {
    // Collect the required data
    const data = {
      transcription,
      pitchData, // Send the full array
      volumeData, // Send the full array
      emotionData, // Send the full array
    };
  
    try {
      console.log("Sending data HERE>>:", JSON.stringify(data));
  
      const response = await fetch("http://127.0.0.1:5000/api/pitch", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        console.log("Data successfully sent!");
        const result = await response.json();
        console.log("Server response:", result);
      } else {
        console.error("Error sending data:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

 
  const stopRecording = () => {
    recognitionRef.current?.stop();
    setRecording(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    sendData();
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
      <h2 className="mt-4 font-semibold">Current Pitch: {pitchData[pitchData.length - 1]?.toFixed(2)} Hz</h2>
      <h2 className="mt-4 font-semibold">Current Volume: {volumeData[volumeData.length - 1]?.toFixed(2)}</h2>
      <div style={{ position: "relative" }}>
        <Webcam
          ref={webcamRef}
          audio={false}
          style={{ width: 640, height: 480 }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 640,
            height: 480,
          }}
        />
      </div>
    </div>
  );
}

