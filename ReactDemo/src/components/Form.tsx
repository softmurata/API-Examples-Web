import React, { useState } from 'react';
import "../Call.css";
import { v4 as uuidv4 } from 'uuid';


function Form(props: any) {
    const [ appid, setAppid ] = useState('');
    const [ token, setToken ] = useState('');
    const [ channel, setChannel ] = useState('');

    /*
    const {
        localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers
    } = useAgora(client);

    */

    // send form data
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        let id = uuidv4();

        // send form data to chatroom page
        props.history.replace({
            pathname: `/chatroom/${id}`,
            state: {
                value: {appid: appid, token: token, channel: channel}
            }
        })

        // change chatroom page
        window.location.href = `/chatroom/${id}`

    }


    return (
        <div>
            <form className='call-form'>
                <label>
                AppID:
                <input type='text' name='appid' onChange={(event) => { setAppid(event.target.value) }}/>
                </label>
                <label>
                Token(Optional):
                <input type='text' name='token' onChange={(event) => { setToken(event.target.value) }} />
                </label>
                <label>
                Channel:
                <input type='text' name='channel' onChange={(event) => { setChannel(event.target.value) }} />
                </label>
                {/*<div className='button-group'>
                    <button id='join' type='button' className='btn btn-primary btn-sm' disabled={joinState} onClick={() => {join(appid, channel, token)}}>Join</button>
                    <button id='leave' type='button' className='btn btn-primary btn-sm' disabled={!joinState} onClick={() => {leave()}}>Leave</button>
    </div>*/}
            </form>

            <div className="form-button">
                    <button id="send" type="button" className="btn btn-primary btn-sm" onClick={handleSubmit}>Submit</button>
            </div>
            
        </div>
    )
}

export default Form
