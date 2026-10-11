const gameArea = document.getElementById('game-area');
const router = document.getElementById('router');
const bufferBar = document.getElementById('buffer-bar');
const gameOverScreen = document.getElementById('game-over');

let buffer = 100;
let isGameOver = false;
let obstacles = [];
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let routerX = mouseX;
let routerY = mouseY;
let targetAngle = 0;
let currentAngle = 0;

let lastTime = performance.now();

gameArea.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY - gameArea.getBoundingClientRect().top;
});

gameOverScreen.addEventListener('click', resetGame);

function spawnObstacle() {
    const ob = document.createElement('div');
    ob.className = 'obstacle';
    const side = Math.floor(Math.random() * 4);
    let x, y, vx, vy;
    const speed = 2 + Math.random() * 3;
    
    if (side === 0) { x = Math.random() * gameArea.clientWidth; y = -30; vx = (Math.random()-0.5)*speed; vy = speed; }
    else if (side === 1) { x = gameArea.clientWidth + 30; y = Math.random() * gameArea.clientHeight; vx = -speed; vy = (Math.random()-0.5)*speed; }
    else if (side === 2) { x = Math.random() * gameArea.clientWidth; y = gameArea.clientHeight + 30; vx = (Math.random()-0.5)*speed; vy = -speed; }
    else { x = -30; y = Math.random() * gameArea.clientHeight; vx = speed; vy = (Math.random()-0.5)*speed; }
    
    gameArea.appendChild(ob);
    obstacles.push({ el: ob, x, y, vx, vy, radius: 15 });
}

function resetGame() {
    buffer = 100;
    isGameOver = false;
    gameOverScreen.style.display = 'none';
    obstacles.forEach(ob => ob.el.remove());
    obstacles = [];
    lastTime = performance.now();
    requestAnimationFrame(gameLoop);
}

function updateRouter() {
    // Smooth follow
    const dx = mouseX - routerX;
    const dy = mouseY - routerY;
    routerX += dx * 0.1;
    routerY += dy * 0.1;
    
    // Tilt based on movement
    targetAngle = dx * 0.5;
    currentAngle += (targetAngle - currentAngle) * 0.1;
    
    router.style.left = `${routerX}px`;
    router.style.top = `${routerY}px`;
    router.style.transform = `translate(-50%, -50%) rotate(${currentAngle}deg)`;
}

function gameLoop(time) {
    if (isGameOver) return;
    
    const dt = time - lastTime;
    lastTime = time;
    
    updateRouter();
    
    // Buffer drops slowly naturally
    buffer -= 0.02 * dt;
    
    // Spawn obstacles
    if (Math.random() < 0.05) spawnObstacle();
    
    // Update obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const ob = obstacles[i];
        ob.x += ob.vx;
        ob.y += ob.vy;
        ob.el.style.left = `${ob.x - ob.radius}px`;
        ob.el.style.top = `${ob.y - ob.radius}px`;
        
        // Collision detection
        const dist = Math.hypot(ob.x - routerX, ob.y - routerY);
        if (dist < ob.radius + 20) {
            buffer -= 10;
            ob.el.style.background = '#fff';
            setTimeout(() => ob.el.remove(), 100);
            obstacles.splice(i, 1);
            continue;
        }
        
        // Remove offscreen
        if (ob.x < -100 || ob.x > gameArea.clientWidth + 100 || ob.y < -100 || ob.y > gameArea.clientHeight + 100) {
            ob.el.remove();
            obstacles.splice(i, 1);
        }
    }
    
    // Update buffer UI
    buffer = Math.max(0, Math.min(100, buffer));
    bufferBar.style.width = `${buffer}%`;
    if (buffer > 60) bufferBar.style.backgroundColor = '#0f0';
    else if (buffer > 30) bufferBar.style.backgroundColor = '#ff0';
    else bufferBar.style.backgroundColor = '#f00';
    
    if (buffer <= 0) {
        isGameOver = true;
        gameOverScreen.style.display = 'block';
        gameArea.style.cursor = 'default';
    } else {
        gameArea.style.cursor = 'none';
        requestAnimationFrame(gameLoop);
    }
}

requestAnimationFrame(gameLoop);
