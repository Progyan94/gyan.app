const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const CELL_SIZE = 40;
const COLS = canvas.width / CELL_SIZE;
const ROWS = canvas.height / CELL_SIZE;

// Map data: 0=grass, 1=path, 2=tree, 3=house
const map = [];
for (let r = 0; r < ROWS; r++) {
    map[r] = [];
    for (let c = 0; c < COLS; c++) {
        map[r][c] = 0;
    }
}

let currentTool = 0;
const tools = {
    'grass': 0,
    'path': 1,
    'tree': 2,
    'house': 3
};

let currentSeason = 'spring';

// Season colors
const colors = {
    spring: {
        grass: '#a8e6cf',
        path: '#d4a373',
        treeTop: '#ffb7c5',
        treeTrunk: '#8b5a2b',
        houseBase: '#f4f1de',
        houseRoof: '#e07a5f',
        bgColor: '#e8f4f8'
    },
    summer: {
        grass: '#7fb069',
        path: '#b08d57',
        treeTop: '#2d6a4f',
        treeTrunk: '#5c4033',
        houseBase: '#fdfcdc',
        houseRoof: '#e63946',
        bgColor: '#d4f1f9'
    },
    autumn: {
        grass: '#e9b872',
        path: '#a0522d',
        treeTop: '#d62828',
        treeTrunk: '#4a3f35',
        houseBase: '#faedcb',
        houseRoof: '#8b0000',
        bgColor: '#fdf0d5'
    },
    winter: {
        grass: '#e0fbfc',
        path: '#98c1d9',
        treeTop: '#ffffff',
        treeTrunk: '#4a4e69',
        houseBase: '#edede9',
        houseRoof: '#ffffff',
        bgColor: '#293241'
    }
};

// Particles
let particles = [];
const maxParticles = {
    spring: 50,
    summer: 30,
    autumn: 60,
    winter: 150
};

class Particle {
    constructor(season) {
        this.reset(season);
        this.y = Math.random() * canvas.height; // initial random spread
    }

    reset(season) {
        this.season = season;
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 3 + 2;
        
        if (season === 'spring') { // Petals
            this.vy = Math.random() * 1 + 0.5;
            this.vx = Math.random() * 2 - 1;
            this.color = '#ff99af';
            this.angle = Math.random() * Math.PI * 2;
            this.swing = Math.random() * 0.1;
        } else if (season === 'summer') { // Fireflies
            this.y = Math.random() * canvas.height;
            this.vx = Math.random() * 1 - 0.5;
            this.vy = Math.random() * 1 - 0.5;
            this.color = '#ffea00';
            this.life = Math.random() * 100;
        } else if (season === 'autumn') { // Leaves
            this.vy = Math.random() * 1.5 + 1;
            this.vx = Math.random() * 3 + 1; // wind to right
            this.color = Math.random() > 0.5 ? '#e76f51' : '#f4a261';
            this.angle = Math.random() * Math.PI * 2;
            this.swing = Math.random() * 0.2 - 0.1;
        } else if (season === 'winter') { // Snow
            this.vy = Math.random() * 2 + 1;
            this.vx = Math.random() * 0.5 - 0.25;
            this.color = '#ffffff';
            this.size = Math.random() * 2 + 1;
        }
    }

    update() {
        if (this.season === 'spring') {
            this.x += Math.sin(this.angle) * 0.5 + this.vx;
            this.y += this.vy;
            this.angle += this.swing;
        } else if (this.season === 'summer') {
            this.x += this.vx;
            this.y += this.vy;
            if (Math.random() < 0.05) this.vx += Math.random() * 0.4 - 0.2;
            if (Math.random() < 0.05) this.vy += Math.random() * 0.4 - 0.2;
            this.life--;
            if (this.life < 0) this.reset(this.season);
            // keep on screen
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        } else if (this.season === 'autumn') {
            this.x += this.vx;
            this.y += this.vy;
            this.angle += this.swing;
        } else if (this.season === 'winter') {
            this.x += this.vx;
            this.y += this.vy;
        }

        if (this.y > canvas.height + 10 || this.x > canvas.width + 10 || this.x < -10) {
            this.reset(this.season);
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        if (this.season === 'summer') {
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.globalAlpha = Math.max(0, Math.sin(this.life * 0.1)) * 0.8 + 0.2;
        }
        
        ctx.beginPath();
        if (this.season === 'spring' || this.season === 'autumn') {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size*1.5);
            ctx.restore();
        } else {
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    }
}

function initParticles() {
    particles = [];
    const count = maxParticles[currentSeason];
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(currentSeason));
    }
    document.body.style.backgroundColor = colors[currentSeason].bgColor;
}

// UI Setup
document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentTool = tools[e.target.dataset.tool];
    });
});

document.querySelectorAll('.season-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.season-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentSeason = e.target.dataset.season;
        initParticles();
    });
});

// Canvas Interaction
let isDrawing = false;

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    placeItem(e);
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) placeItem(e);
});

window.addEventListener('mouseup', () => {
    isDrawing = false;
});

function placeItem(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const c = Math.floor(x / CELL_SIZE);
    const r = Math.floor(y / CELL_SIZE);
    
    if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
        map[r][c] = currentTool;
    }
}

// Drawing logic
function drawMap() {
    const pal = colors[currentSeason];
    
    // Draw base grass
    ctx.fillStyle = pal.grass;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(0,0,0,0.05)';
    ctx.lineWidth = 1;
    for (let r = 0; r <= ROWS; r++) {
        ctx.beginPath();
        ctx.moveTo(0, r * CELL_SIZE);
        ctx.lineTo(canvas.width, r * CELL_SIZE);
        ctx.stroke();
    }
    for (let c = 0; c <= COLS; c++) {
        ctx.beginPath();
        ctx.moveTo(c * CELL_SIZE, 0);
        ctx.lineTo(c * CELL_SIZE, canvas.height);
        ctx.stroke();
    }

    // Draw items
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const val = map[r][c];
            const px = c * CELL_SIZE;
            const py = r * CELL_SIZE;
            const cs = CELL_SIZE;
            
            if (val === 1) { // Path
                ctx.fillStyle = pal.path;
                ctx.fillRect(px, py, cs, cs);
                
                // Add some texture to path
                ctx.fillStyle = 'rgba(0,0,0,0.1)';
                ctx.fillRect(px + 5, py + 5, 5, 5);
                ctx.fillRect(px + cs - 10, py + cs - 15, 6, 6);
            } 
            else if (val === 2) { // Tree
                // Trunk
                ctx.fillStyle = pal.treeTrunk;
                ctx.fillRect(px + cs/2 - 4, py + cs/2, 8, cs/2);
                
                // Leaves
                ctx.fillStyle = pal.treeTop;
                ctx.beginPath();
                ctx.arc(px + cs/2, py + cs/2 - 5, cs/2.5, 0, Math.PI*2);
                ctx.fill();
                
                if (currentSeason === 'winter') {
                    // Snow on tree
                    ctx.fillStyle = '#ffffff';
                    ctx.beginPath();
                    ctx.arc(px + cs/2, py + cs/2 - 10, cs/3, 0, Math.PI, true);
                    ctx.fill();
                }
            } 
            else if (val === 3) { // House
                // Base
                ctx.fillStyle = pal.houseBase;
                ctx.fillRect(px + 4, py + cs/2 - 5, cs - 8, cs/2 + 5);
                
                // Roof
                ctx.fillStyle = pal.houseRoof;
                ctx.beginPath();
                ctx.moveTo(px, py + cs/2 - 5);
                ctx.lineTo(px + cs/2, py + 4);
                ctx.lineTo(px + cs, py + cs/2 - 5);
                ctx.closePath();
                ctx.fill();
                
                // Door
                ctx.fillStyle = '#654321';
                ctx.fillRect(px + cs/2 - 4, py + cs - 12, 8, 12);
                
                // Window
                ctx.fillStyle = '#87ceeb';
                ctx.fillRect(px + 8, py + cs/2 + 2, 6, 6);
                ctx.fillRect(px + cs - 14, py + cs/2 + 2, 6, 6);
            }
        }
    }
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawMap();
    
    particles.forEach(p => {
        p.update();
        p.draw(ctx);
    });
    
    requestAnimationFrame(loop);
}

// Start
initParticles();
loop();
