import React, { useRef, useEffect } from "react";
import * as cam from "@mediapipe/camera_utils";

import { Holistic } from "@mediapipe/holistic";
import * as holis from "@mediapipe/holistic";

import Webcam from "react-webcam";

// get window element from html files
declare global {
  interface Window {
    drawConnectors: any;
    drawLandmarks: any;
  }
}

window.drawConnectors = window.drawConnectors || {};
window.drawLandmarks = window.drawLandmarks || {};

function MediaPipe() {
  const webcamRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);

  const connect = window.drawConnectors;
  const land = window.drawLandmarks;

  let camera = null;

  function onResults(results: any) {
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();

    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    connect(canvasCtx, results.poseLandmarks, holis.POSE_CONNECTIONS, {
      color: "#00FF00",
      lineWidth: 4,
    });
    land(canvasCtx, results.poseLandmarks, { color: "#FF0000", lineWidth: 2 });
    connect(canvasCtx, results.faceLandmarks, holis.FACEMESH_TESSELATION, {
      color: "#C0C0C070",
      lineWidth: 1,
    });
    connect(canvasCtx, results.leftHandLandmarks, holis.HAND_CONNECTIONS, {
      color: "#CC0000",
      lineWidth: 5,
    });
    land(canvasCtx, results.leftHandLandmarks, {
      color: "#00FF00",
      lineWidth: 2,
    });
    connect(canvasCtx, results.rightHandLandmarks, holis.HAND_CONNECTIONS, {
      color: "#00CC00",
      lineWidth: 5,
    });
    land(canvasCtx, results.rightHandLandmarks, {
      color: "#FF0000",
      lineWidth: 2,
    });
    canvasCtx.restore();
  }

  useEffect(() => {
    const holistic = new Holistic({
      locateFile: (file: any) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      },
    });

    holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    holistic.onResults(onResults);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await holistic.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  return (
    <div>
      <Webcam
        hidden
        ref={webcamRef}
        style={{
          position: "absolute",
          marginRight: "auto",
          marginLeft: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />

      <canvas
        id="mediapipe"
        ref={canvasRef}
        style={{
          position: "absolute",
          marginRight: "auto",
          marginLeft: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      ></canvas>
    </div>
  );
}

export default MediaPipe;
