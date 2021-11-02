import React from 'react'
import { useParams } from 'react-router-dom'

function ChatRoom(props: any) {

    const { roomId } = useParams<{roomId?: string}>();
    return (
        <div>
            {/* Navbar.tsx */}
            {/* MediaPlayer.tsx */}
            {/* Comments.tsx */}
            {/* Footer.tsx */}
            ChatRoom
            <div>RoomID: { roomId }</div>
        </div>
    )
}

export default ChatRoom
