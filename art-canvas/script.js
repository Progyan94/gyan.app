const canvas = document.getElementById('art-canvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clear-btn');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function randomColor() {
    const hue = Math.random() * 360;
    const saturation = 80 + Math.random() * 20;
    const lightness = 50 + Math.random() * 20;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function drawShape(x, y) {
    const type = Math.floor(Math.random() * 3);
    const size = Math.random() * 40 + 10;
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.random() * Math.PI * 2);
    
    ctx.fillStyle = randomColor();
    ctx.shadowBlur = 15;
    ctx.shadowColor = ctx.fillStyle;
    ctx.globalCompositeOperation = 'screen';

    ctx.beginPath();
    if (type === 0) {
        // Circle/Particle
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        ctx.fill();
    } else if (type === 1) {
        // Square
        ctx.rect(-size / 2, -size / 2, size, size);
        ctx.fill();
    } else {
        // Triangle
        ctx.moveTo(0, -size / 2);
        ctx.lineTo(size / 2, size / 2);
        ctx.lineTo(-size / 2, size / 2);
        ctx.closePath();
        ctx.fill();
    }
    ctx.restore();
}

function drawSpiral(x, y) {
    let angle = 0;
    let radius = 0;
    const color = randomColor();
    
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = color;
    ctx.shadowBlur = 20;
    ctx.shadowColor = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let i = 0; i < 50; i++) {
        angle += 0.5;
        radius += 1;
        const px = radius * Math.cos(angle);
        const py = radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.restore();
}

function spray(e) {
    const isSpiral = Math.random() > 0.8;
    if (isSpiral) {
        drawSpiral(e.clientX, e.clientY);
    } else {
        for (let i = 0; i < 3; i++) {
            const offsetX = (Math.random() - 0.5) * 60;
            const offsetY = (Math.random() - 0.5) * 60;
            drawShape(e.clientX + offsetX, e.clientY + offsetY);
        }
    }
}

canvas.addEventListener('mousemove', (e) => {
    // Only draw roughly 30% of the time on move to avoid crowding too fast
    if (Math.random() > 0.7) spray(e);
});

canvas.addEventListener('mousedown', (e) => {
    spray(e);
});

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    spray({ clientX: touch.clientX, clientY: touch.clientY });
}, { passive: false });

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (Math.random() > 0.7) {
        const touch = e.touches[0];
        spray({ clientX: touch.clientX, clientY: touch.clientY });
    }
}, { passive: false });

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
