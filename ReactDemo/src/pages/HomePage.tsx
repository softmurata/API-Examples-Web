import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";

function HomePage() {
    let history = useHistory()
    const [ roomId, setRoomId ] = useState('');
    const [ channel, setChannel ] = useState('');
    const [ username, setUsername ] = useState('');


    const onSubmit = (e: any) => {
        e.preventDefault()
        history.push(`/chatroom/${roomId}/${channel}/${username}`)
    }

    return (
        <div>
            <Navbar />
            <form className='call-form' onSubmit={onSubmit}>
                <label>
                AppID:
                <input type='text' name='roomId' onChange={(event) => setRoomId(event.target.value)}/>
                </label>
                <label>
                Channel
                <input type="text" name="channel" onChange={(event) => setChannel(event.target.value)} /> 
                </label>
                <label>
                Username
                <input type="text" name="username" onChange={(event) => setUsername(event.target.value)} /> 
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default HomePage
