const gameArea = document.getElementById('game-area');
const scoreElement = document.getElementById('score');
let score = 0;
let glitchInterval;

function spawnGlitch() {
    const glitch = document.createElement('div');
    glitch.classList.add('glitch-element');
    
    const maxX = window.innerWidth - 60;
    const maxY = window.innerHeight - 60;
    
    let currentX = Math.random() * maxX;
    let currentY = Math.random() * maxY;
    
    glitch.style.left = `${currentX}px`;
    glitch.style.top = `${currentY}px`;

    const colors = ['#f0f', '#0ff', '#ff0', '#f00', '#00f'];
    glitch.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    const moveInterval = setInterval(() => {
        if(!glitch.parentNode) {
            clearInterval(moveInterval);
            return;
        }
        currentX += (Math.random() - 0.5) * 100;
        currentY += (Math.random() - 0.5) * 100;
        
        currentX = Math.max(0, Math.min(currentX, maxX));
        currentY = Math.max(0, Math.min(currentY, maxY));
        
        glitch.style.left = `${currentX}px`;
        glitch.style.top = `${currentY}px`;
    }, 400);

    const catchGlitch = (e) => {
        if (e.type === 'touchstart') e.preventDefault();
        clearInterval(moveInterval);
        score += 10;
        scoreElement.textContent = score;
        
        glitch.classList.remove('glitch-element');
        glitch.classList.add('fixed-element');
        glitch.style.animation = 'none';
        
        setTimeout(() => {
            if(glitch.parentNode) {
                glitch.parentNode.removeChild(glitch);
            }
        }, 500);
    };

    glitch.addEventListener('click', catchGlitch);
    glitch.addEventListener('touchstart', catchGlitch, { passive: false });

    gameArea.appendChild(glitch);

    setTimeout(() => {
        if (glitch.parentNode && glitch.classList.contains('glitch-element')) {
            clearInterval(moveInterval);
            glitch.parentNode.removeChild(glitch);
            score = Math.max(0, score - 5);
            scoreElement.textContent = score;
        }
    }, 3000 + Math.random() * 2000);
}

function startGame() {
    spawnGlitch();
    glitchInterval = setInterval(spawnGlitch, 1500);
    
    setInterval(() => {
        clearInterval(glitchInterval);
        glitchInterval = setInterval(spawnGlitch, Math.max(500, 1500 - (score * 2)));
    }, 10000);
}

startGame();
