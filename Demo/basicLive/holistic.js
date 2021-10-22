// initialization canvas, ctx in basicLive.js



// mediapipe holistic function

function onResults(results) {

    // check in order to check that we can get holistic results
    if (results.rightHandLandmarks !== undefined){
        rightHandLandmarks = results.rightHandLandmarks;
    } else {
        rightHandLandmarks = undefined;
    }


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
          canvasCtx,
          canvasElement,
          results.faceLandmarks,
          'righteyeUp',
          'righteyeDown'
        )

        // candidate => (386, 374), (257, 253), (443, 450)
        isLefteyeOpen = eyeRotation(
          386,
          374,
          canvasCtx,
          canvasElement,
          results.faceLandmarks,
          'lefteyeUp',
          'lefteyeDown'
        )

        // candidate => (13, 14), (12, 15), (11, 16)
        isMouthOpen = mouthRotation(
          13,
          14,
          canvasCtx,
          canvasElement,
          results.faceLandmarks
        )
    }



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