import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import queryString from 'query-string';
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from '../hooks/useAgora';
import MediaPlayer from "../components/MediaPlayer";
import { useHistory } from "react-router-dom"

const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });

function ChatRoom(props: any) {

    let history = useHistory()

    const { roomId } = useParams<{roomId?: string}>();
    const value = queryString.parse(props.location.search);

    const {
        localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers
    } = useAgora(client);

    useEffect(() => {
        join(roomId, value.channel, undefined)
    }, [])

    return (
        <div>
            ChatRoom

            <div>RoomID: { roomId }</div>
            <div>Channel: { value.channel }</div>
            <div>Username: { value.username }</div>


            {/* Navbar.tsx */}

            {/* MediaPlayer.tsx */}

            <div className='player-container'>
                <div className='local-player-wrapper'>
                <p className='local-player-text'>{localVideoTrack && `localTrack`}{joinState && localVideoTrack ? `(${client.uid})` : ''}</p>
                <MediaPlayer videoTrack={localVideoTrack} audioTrack={undefined}></MediaPlayer>
                </div>
                {remoteUsers.map(user => (<div className='remote-player-wrapper' key={user.uid}>
                    <p className='remote-player-text'>{`remoteVideo(${user.uid})`}</p>
                    <MediaPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack}></MediaPlayer>
                </div>))}
            </div>
            <button onClick={() => {
                leave();
                history.push("/");
            }}>Leave</button>
            {/* Comments.tsx */}
            {/* Footer.tsx */}
        </div>
    )
}

export default ChatRoom
