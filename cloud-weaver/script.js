const canvas = document.getElementById('sky');
const ctx = canvas.getContext('2d');
let width, height;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 30 + 10;
        this.alpha = Math.random() * 0.4 + 0.1;
        this.isRaining = false;
        this.baseY = y;
    }
    update(mouseX, mouseY, isDragging) {
        if (this.isRaining) {
            this.vy += 0.1; // gravity
            this.y += this.vy;
            this.alpha -= 0.005;
            this.radius *= 0.99;
            return;
        }

        if (isDragging) {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                const force = (150 - dist) / 150;
                this.vx += dx * force * 0.02;
                this.vy += dy * force * 0.02;
            }
        } else {
            // gently drift
            this.vx *= 0.95;
            this.vy *= 0.95;
        }
        
        // slow wind drift
        this.x += this.vx + 0.5;
        this.y += this.vy;
        
        // wrap around
        if (this.x > width + this.radius) this.x = -this.radius;
        if (this.x < -this.radius) this.x = width + this.radius;
        if (this.y < -this.radius) this.y = height + this.radius;
        if (this.y > height + this.radius) this.y = -this.radius;
    }
    draw(ctx) {
        ctx.beginPath();
        if (this.isRaining) {
            ctx.fillStyle = `rgba(150, 200, 255, ${this.alpha})`;
            // Draw as drop
            ctx.ellipse(this.x, this.y, this.radius * 0.1, this.radius * 0.5, 0, 0, Math.PI * 2);
        } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        }
        ctx.fill();
    }
}

let particles = [];
function initClouds() {
    particles = [];
    for (let i = 0; i < 400; i++) {
        particles.push(new Particle(Math.random() * width, Math.random() * height * 0.5));
    }
}
initClouds();

let isDragging = false;
let mouseX = 0, mouseY = 0;
let dragCount = 0;

canvas.addEventListener('mousedown', e => {
    isDragging = true;
    mouseX = e.clientX;
    mouseY = e.clientY;
});

canvas.addEventListener('mousemove', e => {
    if (isDragging) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dragCount++;
    }
});

canvas.addEventListener('mouseup', e => {
    isDragging = false;
    if (dragCount > 5) {
        // trigger rain for affected particles
        particles.forEach(p => {
            const dx = e.clientX - p.x;
            const dy = e.clientY - p.y;
            if (Math.sqrt(dx*dx + dy*dy) < 200 && !p.isRaining) {
                p.isRaining = true;
                p.vy = Math.random() * 2;
                p.vx = 0;
            }
        });
    }
    dragCount = 0;
});

function loop() {
    ctx.clearRect(0, 0, width, height);
    
    ctx.globalCompositeOperation = 'lighter';
    
    let activeParticles = 0;
    particles.forEach(p => {
        p.update(mouseX, mouseY, isDragging);
        p.draw(ctx);
        if (p.alpha > 0) activeParticles++;
    });
    
    // Replenish clouds if too many rained away
    if (activeParticles < 150) {
        for (let i = 0; i < 5; i++) {
            particles.push(new Particle(-50, Math.random() * height * 0.5));
        }
    }
    
    requestAnimationFrame(loop);
}
loop();
