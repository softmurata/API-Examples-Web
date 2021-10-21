// create Agora client
var client = AgoraRTC.createClient({mode: "live", codec: "vp8"});
var localTracks = {
    videoTrack: null,
    audioTrack: null
};
var remoteUsers = {};
// Agora client options
var options = {
    appid: null,
    channel: null,
    uid: null,
    token: null,
    role: "audience", // host or audience
    audienceLatency: 2
};


// get html element
const video = document.getElementById("input-video");
video.style.display = "none";
const canvas = document.getElementById("output-canvas");
const ctx = canvas.getContext("2d");
canvas.style.display = "none";

const vrmcanvas = document.getElementById("canvas");  // get div 

// Three.js settings
const scene = new THREE.Scene()

// レンダラの作成、DOMに追加
const vrmcamera = new THREE.PerspectiveCamera(
    45,
    vrmcanvas.clientWidth / vrmcanvas.clientHeight,
    1,
    100
)
vrmcamera.position.set(0, 1, 3)

// レンダラーの生成
const renderer = new THREE.WebGLRenderer()
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(vrmcanvas.clientWidth, vrmcanvas.clientHeight)
renderer.setClearColor(0x7fbfff, 1.0)
vrmcanvas.appendChild(renderer.domElement)

// ライトの生成
const light = new THREE.DirectionalLight(0xffffff)
light.position.set(-1, 1, -1).normalize()
scene.add(light)
const controls = new THREE.OrbitControls(vrmcamera, renderer.domElement)
controls.target.set(0, 1, 0)
controls.update()

// helpers
const gridHelper = new THREE.GridHelper(10, 10)
scene.add(gridHelper)

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// animate
const clock = new THREE.Clock()

let canvasstream;


// get vrm thumbnail
const LE = true; // Binary GLTF is little endian.
const MAGIC_glTF = 0x676c5446
const GLB_FILE_HEADER_SIZE = 12;
const GLB_CHUNK_LENGTH_SIZE = 4;
const GLB_CHUNK_TYPE_SIZE = 4;
const GLB_CHUNK_HEADER_SIZE = GLB_CHUNK_LENGTH_SIZE + GLB_CHUNK_TYPE_SIZE;
const GLB_CHUNK_TYPE_JSON = 0x4e4f534a;
const GLB_CHUNK_TYPE_BIN = 0x004e4942;

function getMagic(dataView)
{
    const offset = 0;
    return dataView.getUint32(offset);
}

function getVersion(dataView)
{
    const offset = 4;
    let version = dataView.getUint32(offset, LE);
    return version;
}

function getTotalLength(dataView)
{
    const offset = 8;
    let length = dataView.getUint32(offset, LE);
    return length;
}

function getGLBMeta(dataView){
    let magic = getMagic(dataView);
    let version = getVersion(dataView);
    let total = getTotalLength(dataView);

    return {
        magic: magic,
        version: version,
        total: total,
    }
}

function getJsonData(dataView){
    const offset = GLB_FILE_HEADER_SIZE;

    let chunkLength = dataView.getUint32(offset, LE);
    console.log("ChunkLen " + chunkLength);

    let chunkType = dataView.getUint32(offset + GLB_CHUNK_LENGTH_SIZE, LE);
    console.log("ChunkType " + chunkType.toString(16));

    if (chunkType !== GLB_CHUNK_TYPE_JSON)
    {
        console.warn("This GLB file doesn't have a JSON part.");
        return;
    }

    const jsonChunk = new Uint8Array(dataView.buffer, offset + GLB_CHUNK_HEADER_SIZE, chunkLength);
    const decoder = new TextDecoder("utf8");
    const jsonText = decoder.decode(jsonChunk);
    const json = JSON.parse(jsonText);
    console.log(json);

    return {
        json: json,
        length: chunkLength,
    };
}

function getThumbnail(jsonData, buffer, offset){
    let index = -1;
    let mimeType = "";

    for (var i=0; i<jsonData.json.images.length; i++){
        if (jsonData.json.images[i].name === "Thumbnail"){
            index = jsonData.json.images[i].bufferView;
            mimeType = jsonData.json.images[i].mimeType;
            break;
        }
    }

    if (index === -1)
    {
        console.warn("Thumnail field was not found.");
        return;
    }

    const view = jsonData.json.bufferViews[index];
    let imgBuf = new Uint8Array(
        buffer,
        offset + GLB_CHUNK_HEADER_SIZE + view.byteOffset,
        view.byteLength
    );

    let img = document.getElementById("thumbnail");
    img.width = "250";
    img.src = URL.createObjectURL(new Blob([imgBuf]));

    return img;
}

function onLoadHandler(e){
    let raw = e.target.result;
    let ds = new DataView(raw);

    let glbMeta = getGLBMeta(ds);
    console.log("magic " + glbMeta.magic.toString(16));
    if (glbMeta.magic !== MAGIC_glTF)
    {
        console.warn("This file is not a GLB file.");
        return;
    }
    console.log("Version " + glbMeta.version);
    console.log("Total Length " + glbMeta.total);

    const jsonData = getJsonData(ds);
    const offset = (GLB_FILE_HEADER_SIZE + GLB_CHUNK_HEADER_SIZE) + jsonData.length;
    let dataChunkType = ds.getUint32(offset + GLB_CHUNK_LENGTH_SIZE, LE);

    if (dataChunkType !== GLB_CHUNK_TYPE_BIN)
    {
        console.warn("This GLB file doesn't have a binary buffer.");
        return;
    }

    let img = getThumbnail(jsonData, ds.buffer, offset);

}

const vrmfileInput = document.getElementById("vrm");

let filename;

let currentVrm = undefined

function onChangeHandler(e) {
    if (!window.File) {
        return;
    }

    let input = vrmfileInput.files[0];  // file

    console.log("input:", input);

    filename = input.name;

    // create object url
    let url = window.URL.createObjectURL(input);

    // VRMのファイルをロード
    // './Victoria_Rubin.vrm'
    new THREE.GLTFLoader().load(url, (gltf) => {
        THREE.VRM.from(gltf).then((vrm) => {
        scene.add(vrm.scene)
        currentVrm = vrm
        vrm.humanoid.getBoneNode(
            THREE.VRMSchema.HumanoidBoneName.Hips
        ).rotation.y = Math.PI

        // console.log( vrm );
        })
    })

    function animate(){

        requestAnimationFrame(animate)
        const deltaTime = clock.getDelta()

        if (currentVrm){

            // some process
            
            currentVrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperArm).rotation.z = Math.PI / 3;
            currentVrm.update(deltaTime)
        }

        renderer.render(scene, vrmcamera);

    }

    animate();

    let reader = new FileReader();
    reader.addEventListener("load", onLoadHandler, true);
    reader.readAsArrayBuffer(input);
}


window.addEventListener("DOMContentLoaded", () => {
    vrmfileInput.addEventListener("change", onChangeHandler, true);
});

// if image is clicked, vrm file will be loaded.

function handleClick(e){
    e.preventDefault();
    const vrmModelString = localStorage.getItem('aaa');
    console.log(vrmModelString);

    // ToDo: cannot read file
    let data = new FormData();
    data.append(e.name, new Blob([vrmModelString], {type:'application/json'}))
    console.log(data)
}




// the demo can auto join channel with params in url
$(() => {
    var urlParams = new URL(location.href).searchParams;
    options.appid = urlParams.get("appid");
    options.channel = urlParams.get("channel");
    options.token = urlParams.get("token");
    options.uid = urlParams.get("uid");
    if (options.appid && options.channel) {
        $("#uid").val(options.uid);
        $("#appid").val(options.appid);
        $("#token").val(options.token);
        $("#channel").val(options.channel);
        $("#join-form").submit();
    }
})

$("#host-join").click(function (e) {
    options.role = "host"
})

$("#lowLatency").click(function (e) {
    options.role = "audience"
    options.audienceLatency = 1
    $("#join-form").submit()
})

$("#ultraLowLatency").click(function (e) {
    options.role = "audience"
    options.audienceLatency = 2
    $("#join-form").submit()
})

$("#join-form").submit(async function (e) {
    e.preventDefault();
    $("#host-join").attr("disabled", true);
    $("#audience-join").attr("disabled", true);
    try {
        options.appid = $("#appid").val();
        options.token = $("#token").val();
        options.channel = $("#channel").val();
        options.uid = Number($("#uid").val());
        await join();
        if (options.role === "host") {
            $("#success-alert a").attr("href", `index.html?appid=${options.appid}&channel=${options.channel}&token=${options.token}`);
            if (options.token) {
                $("#success-alert-with-token").css("display", "block");
            } else {
                $("#success-alert a").attr("href", `index.html?appid=${options.appid}&channel=${options.channel}&token=${options.token}`);
                $("#success-alert").css("display", "block");
            }
        }
    } catch (error) {
        console.error(error);
    } finally {
        $("#leave").attr("disabled", false);
    }
})

$("#leave").click(function (e) {
    leave();
})

function onResults(results) {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(results.segmentationMask, 0, 0,
                        canvas.width, canvas.height);
  
    // Only overwrite existing pixels.
    ctx.globalCompositeOperation = 'source-in';
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Only overwrite missing pixels.
    ctx.globalCompositeOperation = 'destination-atop';
    ctx.drawImage(
        results.image, 0, 0, canvas.width, canvas.height);
  
    ctx.globalCompositeOperation = 'source-over';
    drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS,
                   {color: '#00FF00', lineWidth: 4});
    drawLandmarks(ctx, results.poseLandmarks,
                  {color: '#FF0000', lineWidth: 2});
    drawConnectors(ctx, results.faceLandmarks, FACEMESH_TESSELATION,
                   {color: '#C0C0C070', lineWidth: 1});
    drawConnectors(ctx, results.leftHandLandmarks, HAND_CONNECTIONS,
                   {color: '#CC0000', lineWidth: 5});
    drawLandmarks(ctx, results.leftHandLandmarks,
                  {color: '#00FF00', lineWidth: 2});
    drawConnectors(ctx, results.rightHandLandmarks, HAND_CONNECTIONS,
                   {color: '#00CC00', lineWidth: 5});
    drawLandmarks(ctx, results.rightHandLandmarks,
                  {color: '#FF0000', lineWidth: 2});
    ctx.restore();
}

const holistic = new Holistic({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
}});
holistic.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: true,
    smoothSegmentation: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});
holistic.onResults(onResults);
  
const camera = new Camera(video, {
    onFrame: async () => {
      await holistic.send({image: video});
    },
    width: 640,
    height: 480
});
camera.start();

setInterval(() => {
    // canvasstream = canvas.captureStream(20);
    canvasstream = renderer.domElement.captureStream(20);
    // canvasstream = vrmcanvas.captureStream(20);
}, 10000 / 20);


/*

// for test
// web camera
navigator.mediaDevices.getUserMedia({video: true, audio: false})
.then((mediaStream) => {
    video.srcObject = mediaStream;
    video.onloadedmetadata = (e) => {
        video.play();
    }

})

setInterval(() => {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // 外の円
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false);  // 口 (時計回り)
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // 左目
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // 右目
    ctx.stroke();

    canvasstream = canvas.captureStream(60);
    
}, 10000 / 60);
*/

async function join() {
    // create Agora client

    if (options.role === "audience") {
        client.setClientRole(options.role, {level: options.audienceLatency});
        // add event listener to play remote tracks when remote user publishs.
        client.on("user-published", handleUserPublished);
        client.on("user-unpublished", handleUserUnpublished);
    }
    else{
        client.setClientRole(options.role);
    }

    // join the channel
    options.uid = await client.join(options.appid, options.channel, options.token || null, options.uid || null);

    if (options.role === "host") {
        // create local audio and video tracks
        localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();

        // create custom role
        const videoMediaStreamTrack = canvasstream.getVideoTracks()[0];

        localTracks.videoTrack = await AgoraRTC.createCustomVideoTrack({
            mediaStreamTrack: videoMediaStreamTrack,
        });
        // play local video track
        localTracks.videoTrack.play("local-player");
        $("#local-player-name").text(`localTrack(${options.uid})`);
        // publish local tracks to channel
        await client.publish(Object.values(localTracks));
        console.log("publish success");
    }
}

async function leave() {
    for (trackName in localTracks) {
        var track = localTracks[trackName];
        if (track) {
            track.stop();
            track.close();
            localTracks[trackName] = undefined;
        }
    }

    // remove remote users and player views
    remoteUsers = {};
    $("#remote-playerlist").html("");

    // leave the channel
    await client.leave();

    $("#local-player-name").text("");
    $("#host-join").attr("disabled", false);
    $("#audience-join").attr("disabled", false);
    $("#leave").attr("disabled", true);
    console.log("client leaves channel success");
}

async function subscribe(user, mediaType) {
    const uid = user.uid;
    // subscribe to a remote user
    await client.subscribe(user, mediaType);
    console.log("subscribe success");
    if (mediaType === 'video') {
        const player = $(`
      <div id="player-wrapper-${uid}">
        <p class="player-name">remoteUser(${uid})</p>
        <div id="player-${uid}" class="player"></div>
      </div>
    `);
        $("#remote-playerlist").append(player);
        user.videoTrack.play(`player-${uid}`, {fit:"contain"});
    }
    if (mediaType === 'audio') {
        user.audioTrack.play();
    }
}

function handleUserPublished(user, mediaType) {
    const id = user.uid;
    remoteUsers[id] = user;
    subscribe(user, mediaType);
}

function handleUserUnpublished(user) {
    const id = user.uid;
    delete remoteUsers[id];
    $(`#player-wrapper-${id}`).remove();
}
