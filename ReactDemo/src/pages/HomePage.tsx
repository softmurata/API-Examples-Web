import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button } from "@mui/material"
import { FormGroup, FormControl, Input, InputLabel, FormHelperText } from "@mui/material"

function HomePage() {
  let history = useHistory();
  const [roomId, setRoomId] = useState("");
  const [channel, setChannel] = useState("");
  const [username, setUsername] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    history.push(`/chatroom/${roomId}/${channel}/${username}`);
  };

  return (
    <div>
      <Navbar />
      <FormGroup style={{ padding: 20}}>
        <FormControl style={{ padding: 20}}>
            <InputLabel htmlFor="roomid">AppID</InputLabel>
            <Input id="roomid" aria-describedby="roomid-helper-text" type="text" name="roomid" onChange={(event) => setRoomId(event.target.value)}/>
        </FormControl>
        <FormControl style={{ padding: 20}}>
            <InputLabel htmlFor="channel">Channel</InputLabel>
            <Input id="channel" type="text" name="channel" onChange={(event) => setChannel(event.target.value)}/>
        </FormControl>
        <FormControl style={{ padding: 20}}>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input id="username" type="text" name="username" onChange={(event) => setUsername(event.target.value)}/>
        </FormControl>
        {/* cannot adjust best button */}
        <Button onClick={onSubmit} color="primary" size="small" variant="contained" fullWidth={false}>Submit</Button>
      </FormGroup>

      {/*<form className="call-form" onSubmit={onSubmit}>
        <label>
          AppID:
          <input
            type="text"
            name="roomId"
            onChange={(event) => setRoomId(event.target.value)}
          />
        </label>
        <label>
          Channel
          <input
            type="text"
            name="channel"
            onChange={(event) => setChannel(event.target.value)}
          />
        </label>
        <label>
          Username
          <input
            type="text"
            name="username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
  </form>*/}
    </div>
  );
}

export default HomePage;
