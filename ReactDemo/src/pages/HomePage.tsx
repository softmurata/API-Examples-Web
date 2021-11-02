import React, { useState } from 'react'
import { useHistory } from "react-router-dom"

function HomePage() {
    let history = useHistory()
    const [ roomId, setRoomId ] = useState('');

    const onSubmit = (e: any) => {
        e.preventDefault()
        history.push(`/chatroom/${roomId}`)
    }

    return (
        <div>
            <form className='call-form' onSubmit={onSubmit}>
                <label>
                AppID:
                <input type='text' name='roomId' onChange={(event) => setRoomId(event.target.value)}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default HomePage
