// === Resizing Both Canvases ===
function resizeCanvases() {
  const ringsCanvas = document.getElementById('ringsCanvas');
  const sparkleCanvas = document.getElementById('sparkleCanvas');

  ringsCanvas.width = sparkleCanvas.width = window.innerWidth;
  ringsCanvas.height = sparkleCanvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvases);
resizeCanvases();

// === Rotating Rings ===
const ringsCanvas = document.getElementById('ringsCanvas');
const ringsCtx = ringsCanvas.getContext('2d');

function drawRings() {
  ringsCtx.clearRect(0, 0, ringsCanvas.width, ringsCanvas.height);
  const centerX = ringsCanvas.width / 2;
  const centerY = ringsCanvas.height / 2;
  const ringCount = 12;
  const time = Date.now() * 0.002;

  for (let i = 0; i < ringCount; i++) {
    const radius = 100 + i * 50 + Math.sin(time + i) * 20;

    ringsCtx.beginPath();
    ringsCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ringsCtx.strokeStyle = `rgba(0, 255, 229, ${0.15 + i * 0.025})`;
    ringsCtx.lineWidth = 2.5;
    ringsCtx.stroke();
  }

  requestAnimationFrame(drawRings);
}
drawRings();

// === Sparkle Trail ===
const sparkleCanvas = document.getElementById('sparkleCanvas');
const sparkleCtx = sparkleCanvas.getContext('2d');
let sparkles = [];

function createSparkle(x, y) {
  sparkles.push({ x, y, alpha: 1 });
}

function animateSparkles() {
  sparkleCtx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);

  sparkles.forEach((sparkle, index) => {
    sparkle.alpha -= 0.02;
    if (sparkle.alpha <= 0) {
      sparkles.splice(index, 1);
      return;
    }
    sparkleCtx.beginPath();
    sparkleCtx.arc(sparkle.x, sparkle.y, 2, 0, 2 * Math.PI);
    sparkleCtx.fillStyle = `rgba(255, 255, 255, ${sparkle.alpha})`;
    sparkleCtx.fill();
  });

  requestAnimationFrame(animateSparkles);
}
animateSparkles();

window.addEventListener('mousemove', e => {
  for (let i = 0; i < 3; i++) {
    createSparkle(e.clientX + Math.random() * 10 - 5, e.clientY + Math.random() * 10 - 5);
  }
});
// Tilt Effect for Project Cards
document.querySelectorAll('.project-block').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  });
});
const dotsCanvas = document.getElementById('dotsCanvas');
const ctxDots = dotsCanvas.getContext('2d');

let dots = [];
const numDots = 80;
let width = dotsCanvas.width = window.innerWidth;
let height = dotsCanvas.height = window.innerHeight;

function initDots() {
  dots = [];
  for (let i = 0; i < numDots; i++) {
    dots.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: 1.2 + Math.random() * 1.5
    });
  }
}

function drawDots() {
  ctxDots.clearRect(0, 0, width, height);

  for (let i = 0; i < numDots; i++) {
    const d = dots[i];
    ctxDots.beginPath();
    ctxDots.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
    ctxDots.fillStyle = '#00ffe5';
    ctxDots.shadowBlur = 6;
    ctxDots.shadowColor = '#00ffe5';
    ctxDots.fill();
  }

  // connect lines
  for (let i = 0; i < numDots; i++) {
    for (let j = i + 1; j < numDots; j++) {
      const a = dots[i];
      const b = dots[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 100) {
        ctxDots.beginPath();
        ctxDots.moveTo(a.x, a.y);
        ctxDots.lineTo(b.x, b.y);
        ctxDots.strokeStyle = 'rgba(0, 255, 229, 0.1)';
        ctxDots.lineWidth = 0.5;
        ctxDots.stroke();
      }
    }
  }

  updateDots();
  requestAnimationFrame(drawDots);
}

function updateDots() {
  for (let d of dots) {
    d.x += d.vx;
    d.y += d.vy;

    if (d.x < 0 || d.x > width) d.vx *= -1;
    if (d.y < 0 || d.y > height) d.vy *= -1;
  }
}

window.addEventListener('resize', () => {
  width = dotsCanvas.width = window.innerWidth;
  height = dotsCanvas.height = window.innerHeight;
  initDots();
});

initDots();
drawDots();
