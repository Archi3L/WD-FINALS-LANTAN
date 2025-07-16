const canvas = document.getElementById('neonGrid');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let width = canvas.width;
let height = canvas.height;

let cameraZ = 0;
const speed = 0.5;
const spacing = 40;
const horizon = height * 0.5;
const perspective = 200;

function drawNeonGrid() {
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = 'rgba(0, 255, 195, 0.2)';
  ctx.lineWidth = 1;

  // Draw vertical lines (perspective)
  const numLines = 40;
  for (let i = -numLines / 2; i <= numLines / 2; i++) {
    const x = i * spacing;
    const startX = width / 2 + x;
    const endX = width / 2 + x * 10;
    ctx.beginPath();
    ctx.moveTo(startX, height);
    ctx.lineTo(endX, horizon);
    ctx.stroke();
  }

  // Draw horizontal lines (scrolling floor)
  for (let z = 0; z < 1000; z += spacing) {
    const zz = z + cameraZ;
    const scale = perspective / (zz + 1);
    const y = horizon + scale * spacing;

    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  cameraZ += speed;
  if (cameraZ >= spacing) cameraZ = 0;

  requestAnimationFrame(drawNeonGrid);
}

drawNeonGrid();

window.addEventListener('resize', () => {
  canvas.width = width = window.innerWidth;
  canvas.height = height = window.innerHeight;
});
