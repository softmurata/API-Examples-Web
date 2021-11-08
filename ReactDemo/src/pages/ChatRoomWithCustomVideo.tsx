import React, { useState, useEffect, useRef } from "react";
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  MicrophoneAudioTrackInitConfig,
  CameraVideoTrackInitConfig,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  ILocalVideoTrack,
  ILocalAudioTrack,
  CustomVideoTrackInitConfig,
} from "agora-rtc-sdk-ng";
import { useHistory, useParams } from "react-router-dom";

import Webcam from "react-webcam";
import * as cam from "@mediapipe/camera_utils";
import { Holistic } from "@mediapipe/holistic";
import * as holis from "@mediapipe/holistic";

declare global {
  interface HTMLCanvasElement {
    captureStream(frameRate?: number): MediaStream;
  }
}

const client = AgoraRTC.createClient({ codec: "h264", mode: "rtc" });

function ChatRoomWithCustomVideo(props: any) {
  const container = useRef<HTMLDivElement>(null);

  const webcamRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);

  let camera = null;

  const connect = (window as any).drawConnectors;
  const land = (window as any).drawLandmarks;

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

  let history = useHistory();

  const { roomId, channel, username } =
    useParams<{ roomId: string; channel: string; username: string }>();

  const [localVideoTrack, setLocalVideoTrack] = useState<
    ILocalVideoTrack | undefined
  >(undefined);
  const [localAudioTrack, setLocalAudioTrack] = useState<
    ILocalAudioTrack | undefined
  >(undefined);

  const [joinState, setJoinState] = useState(false);

  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);

  async function createLocalTracks(
    audioConfig?: MicrophoneAudioTrackInitConfig,
    videoConfig?: CustomVideoTrackInitConfig
  ): Promise<[IMicrophoneAudioTrack, ILocalVideoTrack]> {
    // original code
    // const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks(audioConfig, videoConfig);

    // create custom video track and original audio track
    const videoMediaStreamTrack = (
      document.getElementById("mediapipe") as HTMLCanvasElement
    )
      .captureStream(60)
      .getVideoTracks()[0];
    const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack();
    const cameraTrack = await AgoraRTC.createCustomVideoTrack({
      mediaStreamTrack: videoMediaStreamTrack,
    });

    setLocalAudioTrack(microphoneTrack);
    setLocalVideoTrack(cameraTrack);
    return [microphoneTrack, cameraTrack];
  }

  async function join(
    roomid: string,
    channel: string,
    token?: string,
    uid?: string | number | null
  ) {
    if (!client) return;
    const [microphoneTrack, cameraTrack] = await createLocalTracks();

    await client.join(roomid, channel, token || null);
    await client.publish([microphoneTrack, cameraTrack]);

    (window as any).client = client;
    (window as any).videoTrack = cameraTrack;

    setJoinState(true);
  }

  async function leave() {
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
    }
    if (localVideoTrack) {
      localVideoTrack.stop();
      localVideoTrack.close();
    }

    setRemoteUsers([]);
    setJoinState(false);

    await client?.leave();
  }

  useEffect(() => {
    if (!client) return;
    setRemoteUsers(client.remoteUsers);

    const handleUserPublished = async (
      user: IAgoraRTCRemoteUser,
      mediaType: "audio" | "video"
    ) => {
      await client.subscribe(user, mediaType);
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };

    const handleUserUnpublished = (user: IAgoraRTCRemoteUser) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };

    const handleUserJoined = (user: IAgoraRTCRemoteUser) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };

    const handleUserLeft = (user: IAgoraRTCRemoteUser) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };

    client.on("user-published", handleUserPublished);
    client.on("user-unpublished", handleUserUnpublished);
    client.on("user-joined", handleUserJoined);
    client.on("user-left", handleUserLeft);

    return () => {
      client.off("user-published", handleUserPublished);
      client.off("user-unpublished", handleUserUnpublished);
      client.off("user-joined", handleUserJoined);
      client.off("user-left", handleUserLeft);
    };
  }, [client]);

  useEffect(() => {
    join(roomId, channel, undefined);
  }, []);

  useEffect(() => {
    if (!container.current) return;
    localVideoTrack?.play(container.current);

    return () => {
      localVideoTrack?.stop();
    };
  }, [container, localVideoTrack]);

  useEffect(() => {
    if (localAudioTrack) {
      localAudioTrack?.play();
    }

    return () => {
      localAudioTrack?.stop();
    };
  }, [localVideoTrack]);

  return (
    <div>
      ChatRoom
      <div>RoomID: {roomId}</div>
      <div>Channel: {channel}</div>
      <div>Username: {username}</div>
      <div
        ref={container}
        className="video-player"
        style={{ width: "640px", height: "480px" }}
      ></div>
      <Webcam
        id="webcam"
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

export default ChatRoomWithCustomVideo;
