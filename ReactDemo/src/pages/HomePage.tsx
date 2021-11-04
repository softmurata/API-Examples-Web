import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button } from "@mui/material"
import { FormGroup, FormControl, Input, InputLabel, Box, Paper, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";


function HomePage() {
    let history = useHistory();
    const [roomId, setRoomId] = useState("");
    const [channel, setChannel] = useState("");
    const [username, setUsername] = useState("");
    const [isDrop, setDrop] = useState(false);
    const [ files, setFiles ] = useState<File[]>([]);

    const accept = ".vrm";

    // react dropzone method
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setDrop(true);
        setFiles(acceptedFiles)
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept,
        onDrop,
    });

  
    useEffect(() => {
        console.log(files);
    }, [files]);


    const onSubmit = (e: any) => {
        e.preventDefault();

        // original code for  transfer chatroom page
        // history.push(`/chatroom/${roomId}/${channel}/${username}`);


        // new code
        let url = URL.createObjectURL(files[0])
        
        history.replace({
            pathname: `/chatroom/${roomId}/${channel}/${username}`,
            state: {
                value: url,
            }
        })
        
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
            <Box width={180} height={180}>
                <Paper
                    variant="outlined"
                    square
                    {...getRootProps()}
                    style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    padding: 10,
                    }}
                >
                    <input  {...getInputProps()}/>
                    {!isDrop ? (isDragActive ? (
                    <Typography>Drop the files here ...</Typography>
                    ) : (
                    <Typography>
                        Drag 'n' drop some files here, or click to select files
                    </Typography>
                    )) : (<h2>successfully uploaded !!</h2>)}
                </Paper>
            </Box>
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
