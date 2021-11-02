import React from 'react'

function ChatRoom(props: any) {
    return (
        <div>
            {/* Navbar.tsx */}
            {/* MediaPlayer.tsx */}
            {/* Comments.tsx */}
            {/* Footer.tsx */}
            ChatRoom
            <hr />
            <p>appid: {props.location.state.value.appid}</p>
            <p>token: {props.location.state.value.token}</p>
            <p>channel: {props.location.state.value.channel}</p>
        </div>
    )
}

export default ChatRoom
