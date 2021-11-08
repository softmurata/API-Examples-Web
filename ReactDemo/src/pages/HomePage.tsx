import React, { useState, useCallback, SyntheticEvent } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button, SnackbarCloseReason } from "@mui/material";
import {
  FormControl,
  Input,
  InputLabel,
  Box,
  Paper,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import { useDropzone } from "react-dropzone";

function HomePage() {
  let history = useHistory();
  const [roomId, setRoomId] = useState("");
  const [channel, setChannel] = useState("");
  const [username, setUsername] = useState("");
  const [isDrop, setDrop] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [open, setOpen] = useState(false);


  const accept = ".vrm";

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setDrop(true);
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    onDrop,
  });


  const handleClose = (event:SyntheticEvent<Element, Event>) => {
    console.log(event);
    setOpen(false);
  };


  const onSubmit = (e: any) => {
    e.preventDefault();
    if(files.length === 0){
      setOpen(true)
      return
    }
    let url = URL.createObjectURL(files[0]);
    history.replace({
      pathname: `/chatroom/${roomId}/${channel}/${username}`,
      state: {
        value: url,
      },
    });
  };

  return (
    <div>
      <Navbar />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical:"top", horizontal:"center" }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Error! Please submit a VRM file
        </Alert>
      </Snackbar>
      <form onSubmit={onSubmit} style={{padding:20}}>
        <FormControl style={{ padding: 20 }} required>
          <InputLabel htmlFor="roomid">AppID</InputLabel>
          <Input
            id="roomid"
            aria-describedby="roomid-helper-text"
            type="text"
            name="roomid"
            onChange={(event) => setRoomId(event.target.value)}
          />
        </FormControl>
        <FormControl style={{ padding: 20 }} required>
          <InputLabel htmlFor="channel">Channel</InputLabel>
          <Input
            id="channel"
            type="text"
            name="channel"
            onChange={(event) => setChannel(event.target.value)}
          />
        </FormControl>
        <FormControl style={{ padding: 20 }} required>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            id="username"
            type="text"
            name="username"
            onChange={(event) => setUsername(event.target.value)}
          />
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
            <input {...getInputProps()} />
            {!isDrop ? (
              isDragActive ? (
                <Typography>Drop the files here ...</Typography>
              ) : (
                <Typography>
                  Drag 'n' drop some files here, or click to select files
                </Typography>
              )
            ) : (
              <h2>successfully uploaded !!</h2>
            )}
          </Paper>
        </Box>
        <Button
          type="submit"
          color="primary"
          size="medium"
          variant="contained"
          style={{marginTop:50}}
          fullWidth={false}
        >
          Join
        </Button>
      </form>
    </div>
  );
}

export default HomePage;
