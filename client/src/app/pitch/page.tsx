"use client";

import { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import * as faceapi from "@vladmandic/face-api";
import Pitchfinder from "pitchfinder";
import PdfJs from "@/components/PdfJs";

export default function PitchPage() {
  const [transcription, setTranscription] = useState("");
  const [recording, setRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [pitch, setPitch] = useState(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const scriptProcessorRef = useRef(null);

  useEffect(() => {
    // Load face-api models
    const loadModels = async () => {
      const MODEL_URL = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
    };

    loadModels();

    // Check for browser support for Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setTranscription(transcript);
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error", event);
      };

      recognitionInstance.onend = () => {
        setRecording(false);
        console.log("Speech recognition ended");
      };

      setRecognition(recognitionInstance);
    } else {
      alert("Your browser does not support the Web Speech API");
    }

    // Initialize audio context and analyser
    const initAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);

        const detectPitch = Pitchfinder.YIN({ sampleRate: audioContext.sampleRate });

        scriptProcessor.onaudioprocess = () => {
          const buffer = new Float32Array(analyser.fftSize);
          analyser.getFloatTimeDomainData(buffer);
          const pitch = detectPitch(buffer);
          if (pitch) {
            setPitch(pitch);
            console.log(`Detected pitch: ${pitch.toFixed(2)} Hz`);
          }
        };

        // Store references for cleanup
        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
        microphoneRef.current = microphone;
        scriptProcessorRef.current = scriptProcessor;
      } catch (err) {
        console.error('Error accessing microphone:', err);
      }
    };

    initAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (scriptProcessorRef.current) {
        scriptProcessorRef.current.disconnect();
      }
      if (analyserRef.current) {
        analyserRef.current.disconnect();
      }
      if (microphoneRef.current) {
        microphoneRef.current.disconnect();
      }
    };
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

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (webcamRef.current && webcamRef.current.video && canvasRef.current) {
        const video = webcamRef.current.video;
        const canvas = canvasRef.current;
        const displaySize = {
          width: video.videoWidth,
          height: video.videoHeight,
        };

        faceapi.matchDimensions(canvas, displaySize);

        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        const context = canvas.getContext("2d");
        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        }
      }
    }, 100);
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
      <div style={{ position: "relative" }}>
        <Webcam ref={webcamRef} audio={false} onPlay={handleVideoOnPlay} />
        <canvas ref={canvasRef} />
      </div>
      <PdfJs src="/uploads/local-attempt.pdf" /> 
    </div>
  );
}
