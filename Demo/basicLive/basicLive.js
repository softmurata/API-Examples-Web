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


// ToDo: initialize variables for holistic results
let isMouthOpen = false
let isRighteyeOpen = false
let isLefteyeOpen = false

// head part
let headQuat

// right hand part
let rightHandQuat
let rightThumbIntermediateQuat
let rightThumbProximalQuat
let rightIndexIntermediateQuat
let rightIndexProximalQuat
let rightMiddleIntermediateQuat
let rightMiddleProximalQuat
let rightRingIntermediateQuat
let rightRingProximalQuat
let rightLittleIntermediateQuat
let rightLittleProximalQuat

// left hand part
let leftHandQuat
let leftThumbIntermediateQuat
let leftThumbProximalQuat
let leftIndexIntermediateQuat
let leftIndexProximalQuat
let leftMiddleIntermediateQuat
let leftMiddleProximalQuat
let leftRingIntermediateQuat
let leftRingProximalQuat
let leftLittleIntermediateQuat
let leftLittleProximalQuat

let isLeftHand = false
let isRightHand = false
let rightHandLandmarks;
let leftHandLandmarks;


// get html element(Initialization)
const video = document.getElementById("input-video");
video.style.display = "none";
const canvas = document.getElementById("output-canvas");
const ctx = canvas.getContext("2d");
canvas.style.display = "none";

const vrmcanvas = document.getElementById("canvas");  // get div 



// Three.js settings
const scene = new THREE.Scene()

// generate camera
const vrmcamera = new THREE.PerspectiveCamera(
    45,
    vrmcanvas.clientWidth / vrmcanvas.clientHeight,
    1,
    100
)
vrmcamera.position.set(0, 1, 3)

// change
// generate renderer
const renderer = new THREE.WebGLRenderer()
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(vrmcanvas.clientWidth, vrmcanvas.clientHeight)
renderer.setClearColor(0x7fbfff, 1.0)
vrmcanvas.appendChild(renderer.domElement)

// generate light and orbit controls
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





// mediapipe holistic process
let canvasstream;
const fps = 20;

setInterval(() => {
    // canvasstream = canvas.captureStream(fps);  // for mediapipe
    canvasstream = renderer.domElement.captureStream(20);
    
}, 10000 / fps);



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

//
// set webcam.js
//



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
