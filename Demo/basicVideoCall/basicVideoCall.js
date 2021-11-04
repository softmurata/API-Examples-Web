/*
 *  These procedures use Agora Video Call SDK for Web to enable local and remote
 *  users to join and leave a Video Call channel managed by Agora Platform.
 */

/*
 *  Create an {@link https://docs.agora.io/en/Video/API%20Reference/web_ng/interfaces/iagorartcclient.html|AgoraRTCClient} instance.
 *
 * @param {string} mode - The {@link https://docs.agora.io/en/Voice/API%20Reference/web_ng/interfaces/clientconfig.html#mode| streaming algorithm} used by Agora SDK.
 * @param  {string} codec - The {@link https://docs.agora.io/en/Voice/API%20Reference/web_ng/interfaces/clientconfig.html#codec| client codec} used by the browser.
 */

import {
  faceRotation,
  eyeRotation,
  mouthRotation,
  updateJoint,
  updateHandJoint,
} from './vrmChange.js'
import { onLoadHandler } from './vrmThumbnail.js'

var client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })

/*
 * Clear the video and audio tracks used by `client` on initiation.
 */
var localTracks = {
  videoTrack: null,
  audioTrack: null,
}

/*
 * On initiation no users are connected.
 */
var remoteUsers = {}

/*
 * On initiation. `client` is not attached to any project or channel for any specific user.
 */
var options = {
  appid: null,
  channel: null,
  uid: null,
  token: null,
  name: null,
}

// get html element
const video = document.getElementById('input-video')
video.style.display = 'none'
// video.style.display = "none";
const canvas = document.getElementById('output-canvas')
canvas.style.display = 'none'
const ctx = canvas.getContext('2d')
// canvas.style.display = "none";

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

// ToDo: initialize variables for holistic results
let isRighteyeOpen = false
let isMouthOpen = false
let isLefteyeOpen = false

// head part
let headQuat

let isLeftHand = false
let isRightHand = false
let rightHandLandmarks
let leftHandLandmarks

const vrmcanvas = document.getElementById('canvas') // get div

// Three.js settings
const scene = new THREE.Scene()

// generate camera(ToDo: need setting up camera)
const vrmcamera = new THREE.PerspectiveCamera(
  30,
  vrmcanvas.clientWidth / vrmcanvas.clientHeight,
  1,
  10
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

const clock = new THREE.Clock()

const holistic = new Holistic({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`
  },
})

// holistic
function onResults(results) {
  ctx.save()
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // draw segmentation mask
  ctx.drawImage(results.segmentationMask, 0, 0, canvas.width, canvas.height)

  // Only overwrite existing pixels.
  ctx.globalCompositeOperation = 'source-in'
  ctx.fillStyle = '#00FF00'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Only overwrite missing pixels.
  ctx.globalCompositeOperation = 'destination-atop'
  ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height)

  ctx.globalCompositeOperation = 'source-over'

  // fill name
  ctx.beginPath()
  ctx.fillStyle = 'black'
  ctx.font = '30px serif'
  ctx.fillText(options.name, 10, 50)
  ctx.closePath()

  if (results.leftHandLandmarks !== undefined) {
    isLeftHand = true
    leftHandLandmarks = results.leftHandLandmarks
  } else {
    isLeftHand = false
    leftHandLandmarks = null
  }

  if (results.rightHandLandmarks !== undefined) {
    isRightHand = true
    rightHandLandmarks = results.rightHandLandmarks
  } else {
    isRightHand = false
    rightHandLandmarks = null
  }

  // face Rotation
  if (results.faceLandmarks !== undefined) {
    headQuat = faceRotation(results.faceLandmarks)

    // candidate => (159, 145), (27, 23), (223, 230)
    isRighteyeOpen = eyeRotation(
      159,
      145,
      ctx,
      canvas,
      results.faceLandmarks,
      'righteyeUp',
      'righteyeDown'
    )

    // candidate => (386, 374), (257, 253), (443, 450)
    isLefteyeOpen = eyeRotation(
      386,
      374,
      ctx,
      canvas,
      results.faceLandmarks,
      'lefteyeUp',
      'lefteyeDown'
    )

    // candidate => (13, 14), (12, 15), (11, 16)
    isMouthOpen = mouthRotation(13, 14, ctx, canvas, results.faceLandmarks)
  }

  drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS, {
    color: '#00FF00',
    lineWidth: 4,
  })
  drawLandmarks(ctx, results.poseLandmarks, { color: '#FF0000', lineWidth: 2 })
  drawConnectors(ctx, results.faceLandmarks, FACEMESH_TESSELATION, {
    color: '#C0C0C070',
    lineWidth: 1,
  })
  drawConnectors(ctx, results.leftHandLandmarks, HAND_CONNECTIONS, {
    color: '#CC0000',
    lineWidth: 5,
  })
  drawLandmarks(ctx, results.leftHandLandmarks, {
    color: '#00FF00',
    lineWidth: 2,
  })
  drawConnectors(ctx, results.rightHandLandmarks, HAND_CONNECTIONS, {
    color: '#00CC00',
    lineWidth: 5,
  })
  drawLandmarks(ctx, results.rightHandLandmarks, {
    color: '#FF0000',
    lineWidth: 2,
  })
  ctx.restore()
}

// holistic
holistic.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: true,
  smoothSegmentation: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
})
holistic.onResults(onResults)

const camera = new Camera(video, {
  onFrame: async () => {
    await holistic.send({ image: video })
  },
  width: 640,
  height: 480,
})

camera.start()

const vrmfileInput = document.getElementById('vrm')

let currentVrm = undefined

function onChangeHandler(e) {
  if (!window.File) {
    return
  }

  let input = vrmfileInput.files[0]

  let url = window.URL.createObjectURL(input)

  new THREE.GLTFLoader().load(url, (gltf) => {
    THREE.VRM.from(gltf).then((vrm) => {
      scene.add(vrm.scene)
      currentVrm = vrm
      vrm.humanoid.getBoneNode(
        THREE.VRMSchema.HumanoidBoneName.Hips
      ).rotation.y = Math.PI
    })
  })

  function animate() {
    requestAnimationFrame(animate)
    const deltaTime = clock.getDelta()

    if (currentVrm) {
      // right hand operation
      if (isRightHand) {
        rightHandQuat = updateHandJoint(0, 12, rightHandLandmarks)
        rightThumbIntermediateQuat = updateJoint(0, 1, 2, rightHandLandmarks)
        rightThumbProximalQuat = updateJoint(1, 2, 3, rightHandLandmarks)
        rightIndexIntermediateQuat = updateJoint(5, 6, 7, rightHandLandmarks)
        rightIndexProximalQuat = updateJoint(6, 7, 8, rightHandLandmarks)
        rightMiddleIntermediateQuat = updateJoint(9, 10, 11, rightHandLandmarks)
        rightMiddleProximalQuat = updateJoint(10, 11, 12, rightHandLandmarks)
        rightRingIntermediateQuat = updateJoint(13, 14, 15, rightHandLandmarks)
        rightRingProximalQuat = updateJoint(14, 15, 16, rightHandLandmarks)
        rightLittleIntermediateQuat = updateJoint(
          17,
          18,
          19,
          rightHandLandmarks
        )
        rightLittleProximalQuat = updateJoint(18, 19, 20, rightHandLandmarks)
      } else {
        rightHandQuat = new THREE.Quaternion()
        rightThumbIntermediateQuat = new THREE.Quaternion()
        rightThumbProximalQuat = new THREE.Quaternion()
        rightIndexIntermediateQuat = new THREE.Quaternion()
        rightIndexProximalQuat = new THREE.Quaternion()
        rightMiddleIntermediateQuat = new THREE.Quaternion()
        rightMiddleProximalQuat = new THREE.Quaternion()
        rightRingIntermediateQuat = new THREE.Quaternion()
        rightRingProximalQuat = new THREE.Quaternion()
        rightLittleIntermediateQuat = new THREE.Quaternion()
        rightLittleProximalQuat = new THREE.Quaternion()
      }

      // left hand operation
      if (isLeftHand) {
        leftHandQuat = updateHandJoint(0, 12, leftHandLandmarks)
        leftThumbIntermediateQuat = updateJoint(0, 1, 2, leftHandLandmarks)
        leftThumbProximalQuat = updateJoint(1, 2, 3, leftHandLandmarks)
        leftIndexIntermediateQuat = updateJoint(5, 6, 7, leftHandLandmarks)
        leftIndexProximalQuat = updateJoint(6, 7, 8, leftHandLandmarks)
        leftMiddleIntermediateQuat = updateJoint(9, 10, 11, leftHandLandmarks)
        leftMiddleProximalQuat = updateJoint(10, 11, 12, leftHandLandmarks)
        leftRingIntermediateQuat = updateJoint(13, 14, 15, leftHandLandmarks)
        leftRingProximalQuat = updateJoint(14, 15, 16, leftHandLandmarks)
        leftLittleIntermediateQuat = updateJoint(17, 18, 19, leftHandLandmarks)
        leftLittleProximalQuat = updateJoint(18, 19, 20, leftHandLandmarks)
      } else {
        leftHandQuat = new THREE.Quaternion()
        leftThumbIntermediateQuat = new THREE.Quaternion()
        leftThumbProximalQuat = new THREE.Quaternion()
        leftIndexIntermediateQuat = new THREE.Quaternion()
        leftIndexProximalQuat = new THREE.Quaternion()
        leftMiddleIntermediateQuat = new THREE.Quaternion()
        leftMiddleProximalQuat = new THREE.Quaternion()
        leftRingIntermediateQuat = new THREE.Quaternion()
        leftRingProximalQuat = new THREE.Quaternion()
        leftLittleIntermediateQuat = new THREE.Quaternion()
        leftLittleProximalQuat = new THREE.Quaternion()
      }

      // right arm operation
      if (!isRightHand) {
        currentVrm.humanoid.getBoneNode(
          THREE.VRMSchema.HumanoidBoneName.RightUpperArm
        ).rotation.z = -Math.PI / 3
        currentVrm.humanoid.getBoneNode(
          THREE.VRMSchema.HumanoidBoneName.RightLowerArm
        ).rotation.z = 0
        currentVrm.humanoid.getBoneNode(
          THREE.VRMSchema.HumanoidBoneName.RightHand
        ).rotation.x = 0
      } else {
        currentVrm.humanoid.getBoneNode(
          THREE.VRMSchema.HumanoidBoneName.RightUpperArm
        ).rotation.z = -Math.PI / 3
        currentVrm.humanoid.getBoneNode(
          THREE.VRMSchema.HumanoidBoneName.RightLowerArm
        ).rotation.z = (Math.PI * 2.5) / 3
        currentVrm.humanoid.getBoneNode(
          THREE.VRMSchema.HumanoidBoneName.RightHand
        ).rotation.x = Math.PI / 2

        // right hand detail operation
        if (rightThumbIntermediateQuat) {
          currentVrm.humanoid
            .getBoneNode(
              THREE.VRMSchema.HumanoidBoneName.RightThumbIntermediate
            )
            .rotation.setFromQuaternion(rightThumbIntermediateQuat)
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightThumbProximal)
            .rotation.setFromQuaternion(rightThumbProximalQuat)
          currentVrm.humanoid
            .getBoneNode(
              THREE.VRMSchema.HumanoidBoneName.RightIndexIntermediate
            )
            .rotation.setFromQuaternion(rightIndexIntermediateQuat)
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightIndexProximal)
            .rotation.setFromQuaternion(rightIndexProximalQuat)
          currentVrm.humanoid
            .getBoneNode(
              THREE.VRMSchema.HumanoidBoneName.RightMiddleIntermediate
            )
            .rotation.setFromQuaternion(rightMiddleIntermediateQuat)
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightMiddleProximal)
            .rotation.setFromQuaternion(rightMiddleProximalQuat)
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightRingIntermediate)
            .rotation.setFromQuaternion(rightRingIntermediateQuat)
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightRingProximal)
            .rotation.setFromQuaternion(rightRingProximalQuat)
          currentVrm.humanoid
            .getBoneNode(
              THREE.VRMSchema.HumanoidBoneName.RightLittleIntermediate
            )
            .rotation.setFromQuaternion(rightLittleIntermediateQuat)
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLittleProximal)
            .rotation.setFromQuaternion(rightLittleProximalQuat)
        } else {
          currentVrm.humanoid
            .getBoneNode(
              THREE.VRMSchema.HumanoidBoneName.RightThumbIntermediate
            )
            .rotation.setFromQuaternion(new THREE.Quaternion())
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightThumbProximal)
            .rotation.setFromQuaternion(new THREE.Quaternion())
          currentVrm.humanoid
            .getBoneNode(
              THREE.VRMSchema.HumanoidBoneName.RightIndexIntermediate
            )
            .rotation.setFromQuaternion(new THREE.Quaternion())
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightIndexProximal)
            .rotation.setFromQuaternion(new THREE.Quaternion())
          currentVrm.humanoid
            .getBoneNode(
              THREE.VRMSchema.HumanoidBoneName.RightMiddleIntermediate
            )
            .rotation.setFromQuaternion(new THREE.Quaternion())
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightMiddleProximal)
            .rotation.setFromQuaternion(new THREE.Quaternion())
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightRingIntermediate)
            .rotation.setFromQuaternion(new THREE.Quaternion())
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightRingProximal)
            .rotation.setFromQuaternion(new THREE.Quaternion())
          currentVrm.humanoid
            .getBoneNode(
              THREE.VRMSchema.HumanoidBoneName.RightLittleIntermediate
            )
            .rotation.setFromQuaternion(new THREE.Quaternion())
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightLittleProximal)
            .rotation.setFromQuaternion(new THREE.Quaternion())
        }
      }

      // left arm operation
      if (!isLeftHand) {
        currentVrm.humanoid.getBoneNode(
          THREE.VRMSchema.HumanoidBoneName.LeftUpperArm
        ).rotation.z = Math.PI / 3
        currentVrm.humanoid.getBoneNode(
          THREE.VRMSchema.HumanoidBoneName.LeftLowerArm
        ).rotation.z = 0
        currentVrm.humanoid.getBoneNode(
          THREE.VRMSchema.HumanoidBoneName.LeftHand
        ).rotation.x = 0
      } else {
        currentVrm.humanoid.getBoneNode(
          THREE.VRMSchema.HumanoidBoneName.LeftUpperArm
        ).rotation.z = Math.PI / 3
        currentVrm.humanoid.getBoneNode(
          THREE.VRMSchema.HumanoidBoneName.LeftLowerArm
        ).rotation.z = (-Math.PI * 2.5) / 3
        currentVrm.humanoid.getBoneNode(
          THREE.VRMSchema.HumanoidBoneName.LeftHand
        ).rotation.x = -Math.PI / 2

        if (leftThumbIntermediateQuat) {
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftThumbIntermediate)
            .rotation.setFromQuaternion(leftThumbIntermediateQuat)
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftThumbProximal)
            .rotation.setFromQuaternion(leftThumbProximalQuat)
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftIndexIntermediate)
            .rotation.setFromQuaternion(leftIndexIntermediateQuat)
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftIndexProximal)
            .rotation.setFromQuaternion(leftIndexProximalQuat)
          currentVrm.humanoid
            .getBoneNode(
              THREE.VRMSchema.HumanoidBoneName.LeftMiddleIntermediate
            )
            .rotation.setFromQuaternion(leftMiddleIntermediateQuat)
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftMiddleProximal)
            .rotation.setFromQuaternion(leftMiddleProximalQuat)
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftRingIntermediate)
            .rotation.setFromQuaternion(leftRingIntermediateQuat)
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftRingProximal)
            .rotation.setFromQuaternion(leftRingProximalQuat)
          currentVrm.humanoid
            .getBoneNode(
              THREE.VRMSchema.HumanoidBoneName.LeftLittleIntermediate
            )
            .rotation.setFromQuaternion(leftLittleIntermediateQuat)
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLittleProximal)
            .rotation.setFromQuaternion(leftLittleProximalQuat)
        } else {
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftThumbIntermediate)
            .rotation.setFromQuaternion(new THREE.Quaternion())
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftThumbProximal)
            .rotation.setFromQuaternion(new THREE.Quaternion())
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftIndexIntermediate)
            .rotation.setFromQuaternion(new THREE.Quaternion())
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftIndexProximal)
            .rotation.setFromQuaternion(new THREE.Quaternion())
          currentVrm.humanoid
            .getBoneNode(
              THREE.VRMSchema.HumanoidBoneName.LeftMiddleIntermediate
            )
            .rotation.setFromQuaternion(new THREE.Quaternion())
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftMiddleProximal)
            .rotation.setFromQuaternion(new THREE.Quaternion())
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftRingIntermediate)
            .rotation.setFromQuaternion(new THREE.Quaternion())
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftRingProximal)
            .rotation.setFromQuaternion(new THREE.Quaternion())
          currentVrm.humanoid
            .getBoneNode(
              THREE.VRMSchema.HumanoidBoneName.LeftLittleIntermediate
            )
            .rotation.setFromQuaternion(new THREE.Quaternion())
          currentVrm.humanoid
            .getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLittleProximal)
            .rotation.setFromQuaternion(new THREE.Quaternion())
        }
      }

      // right hand rotation
      if (rightHandQuat) {
        currentVrm.humanoid
          .getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightHand)
          .rotation.setFromQuaternion(rightHandQuat)
      } else {
        currentVrm.humanoid
          .getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightHand)
          .rotation.setFromQuaternion(new THREE.Quaternion())
      }

      // left hand rotation
      if (leftHandQuat) {
        currentVrm.humanoid
          .getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftHand)
          .rotation.setFromQuaternion(leftHandQuat)
      } else {
        currentVrm.humanoid
          .getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftHand)
          .rotation.setFromQuaternion(new THREE.Quaternion())
      }

      // head rotation
      if (headQuat) {
        currentVrm.humanoid
          .getBoneNode(THREE.VRMSchema.HumanoidBoneName.Head)
          .rotation.setFromQuaternion(headQuat)
      } else {
        currentVrm.humanoid
          .getBoneNode(THREE.VRMSchema.HumanoidBoneName.Head)
          .rotation.setFromQuaternion(new THREE.Quaternion())
      }

      // mouth operation
      if (isMouthOpen) {
        currentVrm.blendShapeProxy.setValue(
          THREE.VRMSchema.BlendShapePresetName.O,
          1
        )
      } else {
        currentVrm.blendShapeProxy.setValue(
          THREE.VRMSchema.BlendShapePresetName.O,
          0
        )
      }

      // right eye open
      if (isRighteyeOpen) {
        currentVrm.blendShapeProxy.setValue(
          THREE.VRMSchema.BlendShapePresetName.BlinkR,
          1
        )
      } else {
        currentVrm.blendShapeProxy.setValue(
          THREE.VRMSchema.BlendShapePresetName.BlinkR,
          0
        )
      }

      // left eye open
      if (isLefteyeOpen) {
        currentVrm.blendShapeProxy.setValue(
          THREE.VRMSchema.BlendShapePresetName.BlinkL,
          1
        )
      } else {
        currentVrm.blendShapeProxy.setValue(
          THREE.VRMSchema.BlendShapePresetName.BlinkL,
          0
        )
      }

      currentVrm.update(deltaTime)
    }

    renderer.render(scene, vrmcamera)
  }

  animate()

  let reader = new FileReader()
  reader.addEventListener('load', onLoadHandler, true)
  reader.readAsArrayBuffer(input)
}

window.addEventListener('DOMContentLoaded', () => {
  vrmfileInput.addEventListener('change', onChangeHandler, true)
})

// mediapipe holistic process
let canvasstream
const fps = 20

setInterval(() => {
  // canvasstream = canvas.captureStream(fps);  // for mediapipe
  canvasstream = renderer.domElement.captureStream(20)
}, 10000 / fps)

/*
 * When this page is called with parameters in the URL, this procedure
 * attempts to join a Video Call channel using those parameters.
 */
$(() => {
  var urlParams = new URL(location.href).searchParams
  options.appid = urlParams.get('appid')
  options.channel = urlParams.get('channel')
  options.token = urlParams.get('token')
  options.uid = urlParams.get('uid')
  options.name = urlParams.get('name')
  if (options.appid && options.channel) {
    $('#uid').val(options.uid)
    $('#appid').val(options.appid)
    $('#token').val(options.token)
    $('#channel').val(options.channel)
    $('#name').val(options.name)
    $('#join-form').submit()
  }
})

/*
 * When a user clicks Join or Leave in the HTML form, this procedure gathers the information
 * entered in the form and calls join asynchronously. The UI is updated to match the options entered
 * by the user.
 */
$('#join-form').submit(async function (e) {
  e.preventDefault()
  $('#join').attr('disabled', true)
  try {
    options.appid = $('#appid').val()
    options.token = $('#token').val()
    options.channel = $('#channel').val()
    options.uid = Number($('#uid').val())
    options.name = $('#name').val()
    await join()
    if (options.token) {
      $('#success-alert-with-token').css('display', 'block')
    } else {
      $('#success-alert a').attr(
        'href',
        `index.html?appid=${options.appid}&channel=${options.channel}&token=${options.token}`
      )
      $('#success-alert').css('display', 'block')
    }
  } catch (error) {
    console.error(error)
  } finally {
    $('#leave').attr('disabled', false)
  }
})

/*
 * Called when a user clicks Leave in order to exit a channel.
 */
$('#leave').click(function (e) {
  leave()
})

/*
 * Join a channel, then create local video and audio tracks and publish them to the channel.
 */
async function join() {
  // Add an event listener to play remote tracks when remote user publishes.
  client.on('user-published', handleUserPublished)
  client.on('user-unpublished', handleUserUnpublished)

  // create join a channel and video and audio track process
  options.uid = await client.join(
    options.appid,
    options.channel,
    options.token || null,
    options.uid || null,
    options.name || null
  )

  const videoMediaStreamTrack = canvasstream.getVideoTracks()[0]

  localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack()
  localTracks.videoTrack = await AgoraRTC.createCustomVideoTrack({
    mediaStreamTrack: videoMediaStreamTrack,
  })

  // Play the local video track to the local browser and update the UI with the user ID.
  localTracks.videoTrack.play('local-player')

  // Publish the local video and audio tracks to the channel.
  await client.publish(Object.values(localTracks))
  console.log('publish success')
}

/*
 * Stop all local and remote tracks then leave the channel.
 */
async function leave() {
  for (var trackName in localTracks) {
    console.log(trackName)
    var track = localTracks[trackName]
    if (track) {
      track.stop()
      track.close()
      localTracks[trackName] = undefined
    }
  }

  // Remove remote users and player views.
  remoteUsers = {}
  $('#remote-playerlist').html('')

  // leave the channel
  await client.leave()

  // $("#local-player-name").text("");
  $('#join').attr('disabled', false)
  $('#leave').attr('disabled', true)
  console.log('client leaves channel success')
}

/*
 * Add the local use to a remote channel.
 *
 * @param  {IAgoraRTCRemoteUser} user - The {@link  https://docs.agora.io/en/Voice/API%20Reference/web_ng/interfaces/iagorartcremoteuser.html| remote user} to add.
 * @param {trackMediaType - The {@link https://docs.agora.io/en/Voice/API%20Reference/web_ng/interfaces/itrack.html#trackmediatype | media type} to add.
 */
async function subscribe(user, mediaType) {
  const uid = user.uid
  // subscribe to a remote user
  await client.subscribe(user, mediaType)
  console.log('subscribe success')
  if (mediaType === 'video') {
    const player = $(`
      <div id="player-wrapper-${uid}">
        <div id="player-${uid}" class="player"></div>
      </div>
    `)
    $('#remote-playerlist').append(player)
    user.videoTrack.play(`player-${uid}`)
  }
  if (mediaType === 'audio') {
    user.audioTrack.play()
  }
}

/*
 * Add a user who has subscribed to the live channel to the local interface.
 *
 * @param  {IAgoraRTCRemoteUser} user - The {@link  https://docs.agora.io/en/Voice/API%20Reference/web_ng/interfaces/iagorartcremoteuser.html| remote user} to add.
 * @param {trackMediaType - The {@link https://docs.agora.io/en/Voice/API%20Reference/web_ng/interfaces/itrack.html#trackmediatype | media type} to add.
 */
function handleUserPublished(user, mediaType) {
  const id = user.uid
  remoteUsers[id] = user
  subscribe(user, mediaType)
}

/*
 * Remove the user specified from the channel in the local interface.
 *
 * @param  {string} user - The {@link  https://docs.agora.io/en/Voice/API%20Reference/web_ng/interfaces/iagorartcremoteuser.html| remote user} to remove.
 */
function handleUserUnpublished(user) {
  const id = user.uid
  delete remoteUsers[id]
  $(`#player-wrapper-${id}`).remove()
}
