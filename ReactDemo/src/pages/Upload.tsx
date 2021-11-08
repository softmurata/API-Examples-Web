import React, { useCallback, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  FormGroup,
  FormControl,
  Input,
  InputLabel,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useHistory } from "react-router-dom";
import axios from "axios"

// helper function

// get vrm thumbnail
const LE = true // Binary GLTF is little endian.
const MAGIC_glTF = 0x676c5446
const GLB_FILE_HEADER_SIZE = 12
const GLB_CHUNK_LENGTH_SIZE = 4
const GLB_CHUNK_TYPE_SIZE = 4
const GLB_CHUNK_HEADER_SIZE = GLB_CHUNK_LENGTH_SIZE + GLB_CHUNK_TYPE_SIZE
const GLB_CHUNK_TYPE_JSON = 0x4e4f534a
const GLB_CHUNK_TYPE_BIN = 0x004e4942

function getMagic(dataView: any) {
  const offset = 0
  return dataView.getUint32(offset)
}

function getVersion(dataView: any) {
  const offset = 4
  let version = dataView.getUint32(offset, LE)
  return version
}

function getTotalLength(dataView: any) {
  const offset = 8
  let length = dataView.getUint32(offset, LE)
  return length
}

function getGLBMeta(dataView: any) {
  let magic = getMagic(dataView)
  let version = getVersion(dataView)
  let total = getTotalLength(dataView)

  return {
    magic: magic,
    version: version,
    total: total,
  }
}

function getJsonData(dataView: any) {
  const offset = GLB_FILE_HEADER_SIZE

  let chunkLength = dataView.getUint32(offset, LE)
  console.log('ChunkLen ' + chunkLength)

  let chunkType = dataView.getUint32(offset + GLB_CHUNK_LENGTH_SIZE, LE)
  console.log('ChunkType ' + chunkType.toString(16))

  if (chunkType !== GLB_CHUNK_TYPE_JSON) {
    console.warn("This GLB file doesn't have a JSON part.")
    return
  }

  const jsonChunk = new Uint8Array(
    dataView.buffer,
    offset + GLB_CHUNK_HEADER_SIZE,
    chunkLength
  )
  const decoder = new TextDecoder('utf8')
  const jsonText = decoder.decode(jsonChunk)
  const json = JSON.parse(jsonText)
  console.log(json)

  return {
    json: json,
    length: chunkLength,
  }
}

function getThumbnail(jsonData: any, buffer: any, offset: any) {
  let index = -1
  let mimeType = ''

  for (var i = 0; i < jsonData.json.images.length; i++) {
    if (jsonData.json.images[i].name === 'Thumbnail') {
      index = jsonData.json.images[i].bufferView
      mimeType = jsonData.json.images[i].mimeType
      break
    }
  }

  if (index === -1) {
    console.warn('Thumnail field was not found.')
    return
  }

  const view = jsonData.json.bufferViews[index]
  let imgBuf = new Uint8Array(
    buffer,
    offset + GLB_CHUNK_HEADER_SIZE + view.byteOffset,
    view.byteLength
  )

  let url = URL.createObjectURL(new Blob([imgBuf]))

  return url
}


function Preview() {

  let history = useHistory();

  const [vrmFiles, setVrmfiles] = useState([]);
  const [vrmThumbnails, setVrmThumbnails ] = useState([]);
  const [imgurl, setImgurl] = useState<any>(null);
  const [vrmurl, setVrmurl] = useState<any>(null);
  const [downloadUrl, setDownloadUrl] = useState("");

  const [files, setFiles ] = useState<File[]>([])
  const [filename, setFileName] = useState("");
  const [isDrop, setDrop] = useState(false);

  const accept = ".vrm"

  // react dropzone method
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    setDrop(true)
    setFiles(acceptedFiles)
    setFileName(acceptedFiles[0].name)

    // get thumbnail
    let input = acceptedFiles[0];
    let ur = URL.createObjectURL(input);
    setVrmurl(ur);


    let reader = new FileReader()

    reader.addEventListener('load', onLoadHandler, true)
    reader.readAsArrayBuffer(input)


  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    onDrop
  })

  useEffect(() => {
    console.log(files)
  }, [files])

  function onLoadHandler(e: any){
    let raw = e.target.result;
    let ds = new DataView(raw)
  
    let glbMeta = getGLBMeta(ds);
    if (glbMeta.magic !== MAGIC_glTF) {
      console.warn('This file is not a GLB file.')
      return
    }
  
    const jsonData: any = getJsonData(ds)
    const offset = GLB_FILE_HEADER_SIZE + GLB_CHUNK_HEADER_SIZE + jsonData.length
    let dataChunkType = ds.getUint32(offset + GLB_CHUNK_LENGTH_SIZE, LE)
  
    if (dataChunkType !== GLB_CHUNK_TYPE_BIN) {
      console.warn("This GLB file doesn't have a binary buffer.")
      return
    }
  
    const url = getThumbnail(jsonData, ds.buffer, offset)

    setImgurl(url);
  
  }

  const onUpload = (e: any) => {
    e.preventDefault();

    // api
    let formData = new FormData()
    formData.append("file", files[0]);

    axios.post("http://localhost:5000/api/preview/uploadfiles", formData)
    .then((response) => {
      if (response.data.success){
        console.log(response.data.url);
        setDownloadUrl(response.data.url);
      } else {
        alert("failed to get url");
      }

    })

  }

  return (
    <div>
      {/* navbar.tsx */}
      <Navbar />
      <Box width={180} height={180}>
        <Paper
          variant="elevation"
          square
          {...getRootProps()}
          style={{
            height: "100%",
            display: "flex",
            alignItems: 'center',
            padding: 10,
          }}>
            <input {...getInputProps()}/>
            {!isDrop ? (
              isDragActive ? (
                <Typography>Drop this files here...</Typography>
              ) : (
                <Typography>Drop 1 drop file here, or click to select 1 file</Typography>
              )
            ) : (
              <div>
                <Typography>{filename}</Typography>
              </div>
            )}
        </Paper>
      </Box>
      {/*  for test */}
      <div style={{ paddingTop: 30}}>
        <img src={imgurl} width={320} height={240}/>
      </div>
      <button onClick={onUpload}>Upload</button>
      <a href={downloadUrl}>Download</a>
    </div>
  );
}

export default Preview;
