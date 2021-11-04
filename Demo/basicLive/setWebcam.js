// for test
// web camera
navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then((mediaStream) => {
    video.srcObject = mediaStream;
    video.onloadedmetadata = (e) => {
      video.play();
    };
  });

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
  ctx.arc(75, 75, 35, 0, Math.PI, false); // 口 (時計回り)
  ctx.moveTo(65, 65);
  ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // 左目
  ctx.moveTo(95, 65);
  ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // 右目
  ctx.stroke();

  canvasstream = canvas.captureStream(60);
}, 10000 / 60);
