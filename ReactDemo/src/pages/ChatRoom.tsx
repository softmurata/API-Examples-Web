import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import AgoraRTC from "agora-rtc-sdk-ng";
import useAgora from "../hooks/useAgora";
import MediaPlayer from "../components/MediaPlayer";
import { useHistory } from "react-router-dom";
import Three from "../Three";

const client = AgoraRTC.createClient({ codec: "h264", mode: "rtc" });

function ChatRoom(props: any) {
  let history = useHistory();

  const { roomId, channel, username } =
    useParams<{ roomId?: string; channel?: string; username?: string }>();

  const {
    localAudioTrack,
    localVideoTrack,
    leave,
    join,
    joinState,
    remoteUsers,
  } = useAgora(client);

  useEffect(() => {
    join(roomId, channel, undefined);
  }, []);

  return (
    <div>
      ChatRoom
      <div>RoomID: {roomId}</div>
      <div>Channel: {channel}</div>
      <div>Username: {username}</div>
      <div>
        {/*File: {props.location.state.value}*/}
        {/*<img src={props.location.state.value}/>*/}
        {/*<Three url={props.location.state.value} />*/}
      </div>
      {/* Navbar.tsx */}
      {/* MediaPlayer.tsx */}
      <div className="player-container">
        <div className="local-player-wrapper">
          <p className="local-player-text">
            {localVideoTrack && `localTrack`}
            {joinState && localVideoTrack ? `(${client.uid})` : ""}
          </p>
          <MediaPlayer
            videoTrack={localVideoTrack}
            audioTrack={undefined}
          ></MediaPlayer>
        </div>
        {remoteUsers.map((user) => (
          <div className="remote-player-wrapper" key={user.uid}>
            <p className="remote-player-text">{`remoteVideo(${user.uid})`}</p>
            <MediaPlayer
              videoTrack={user.videoTrack}
              audioTrack={user.audioTrack}
            ></MediaPlayer>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          leave();
          history.push("/");
        }}
      >
        Leave
      </button>
      {/* Comments.tsx */}
      {/* Footer.tsx */}
    </div>
  );
}

export default ChatRoom;
