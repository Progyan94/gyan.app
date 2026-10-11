const canvas = document.getElementById('lake');
const ctx = canvas.getContext('2d');
let width, height;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Audio context
let audioCtx = null;
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}
window.addEventListener('mousedown', initAudio, { once: true });

function playRippleSound(velocity) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'sine';
    // Frequency based on velocity (higher velocity = higher pitch usually, or randomize)
    osc.frequency.setValueAtTime(400 + Math.random() * 200 + Math.abs(velocity) * 10, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    const volume = Math.min(0.5, Math.abs(velocity) / 20);
    gainNode.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
}

class Pebble {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = width * 0.1;
        this.y = height * 0.5;
        this.vx = 0;
        this.vy = 0;
        this.isDragging = false;
        this.active = true;
        this.radius = 10;
    }
    update() {
        if (!this.active || this.isDragging) return;
        
        this.vy += 0.5; // gravity
        this.x += this.vx;
        this.y += this.vy;
        
        const waterLevel = height * 0.6;
        
        if (this.y + this.radius >= waterLevel) {
            // Hit water
            if (this.vy > 0 && this.vy < 15 && Math.abs(this.vx) > 2) {
                // Skip
                this.y = waterLevel - this.radius;
                this.vy = -this.vy * 0.6; // dampening
                this.vx *= 0.95;
                createRipple(this.x, waterLevel);
                playRippleSound(this.vx);
            } else {
                // Sink
                this.vy *= 0.5;
                this.vx *= 0.5;
                if (this.y > height) {
                    this.reset();
                }
            }
        }
        
        if (this.x > width + 100 || this.x < -100) {
            this.reset();
        }
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radius * 1.5, this.radius, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#555';
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.stroke();
    }
}

const ripples = [];
function createRipple(x, y) {
    ripples.push({ x, y, radius: 0, alpha: 1 });
}

const pebble = new Pebble();
let dragStart = {x: 0, y: 0};

canvas.addEventListener('mousedown', e => {
    pebble.isDragging = true;
    pebble.x = e.clientX;
    pebble.y = e.clientY;
    dragStart = {x: e.clientX, y: e.clientY};
});

canvas.addEventListener('mousemove', e => {
    if (pebble.isDragging) {
        pebble.x = e.clientX;
        pebble.y = e.clientY;
    }
});

canvas.addEventListener('mouseup', e => {
    if (pebble.isDragging) {
        pebble.isDragging = false;
        // Release velocity
        pebble.vx = (e.clientX - dragStart.x) * 0.15;
        pebble.vy = (e.clientY - dragStart.y) * 0.15;
        // If they just clicked, give it a default throw
        if (Math.abs(pebble.vx) < 1 && Math.abs(pebble.vy) < 1) {
            pebble.vx = 15;
            pebble.vy = -5;
        }
    }
});

function loop() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw water line
    ctx.beginPath();
    ctx.moveTo(0, height * 0.6);
    ctx.lineTo(width, height * 0.6);
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Update & draw ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 2;
        r.alpha -= 0.01;
        if (r.alpha <= 0) {
            ripples.splice(i, 1);
            continue;
        }
        
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, r.radius * 2, r.radius * 0.5, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${r.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    pebble.update();
    pebble.draw(ctx);
    
    requestAnimationFrame(loop);
}
loop();
