const canvas = document.getElementById('maze-canvas');
const ctx = canvas.getContext('2d');
const levelDisplay = document.getElementById('level-display');

const CELL_SIZE = 20;
let cols, rows;
let grid = [];
let current;
let stack = [];
let player = { x: 0, y: 0 };
let exit = { x: 0, y: 0 };
let level = 1;

let mazeColor = '#fff';
let bgColor = '#000';
let playerColor = '#f00';

function initGame() {
    // Increase size slightly with level up to a max
    const size = Math.min(15 + level * 2, 35);
    cols = size;
    rows = size;
    
    canvas.width = cols * CELL_SIZE;
    canvas.height = rows * CELL_SIZE;
    
    grid = [];
    stack = [];
    
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            grid.push(new Cell(i, j));
        }
    }
    
    current = grid[0];
    current.visited = true;
    
    // Generate maze synchronously
    generateMaze();
    
    player.x = 0;
    player.y = 0;
    
    exit.x = cols - 1;
    exit.y = rows - 1;
    
    generateColors();
    draw();
}

function generateColors() {
    const hue = Math.random() * 360;
    mazeColor = `hsl(${hue}, 80%, 60%)`;
    bgColor = `hsl(${(hue + 180) % 360}, 40%, 10%)`;
    playerColor = `hsl(${(hue + 90) % 360}, 100%, 50%)`;
    
    document.querySelector('.game-container').style.borderColor = mazeColor;
    canvas.style.backgroundColor = bgColor;
}

function generateMaze() {
    let unvisitedCount = cols * rows - 1;
    while (unvisitedCount > 0) {
        let next = current.checkNeighbors();
        if (next) {
            next.visited = true;
            stack.push(current);
            removeWalls(current, next);
            current = next;
            unvisitedCount--;
        } else if (stack.length > 0) {
            current = stack.pop();
        }
    }
}

function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }
    return i + j * cols;
}

class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.walls = [true, true, true, true]; // top, right, bottom, left
        this.visited = false;
    }

    checkNeighbors() {
        let neighbors = [];

        let top = grid[index(this.i, this.j - 1)];
        let right = grid[index(this.i + 1, this.j)];
        let bottom = grid[index(this.i, this.j + 1)];
        let left = grid[index(this.i - 1, this.j)];

        if (top && !top.visited) neighbors.push(top);
        if (right && !right.visited) neighbors.push(right);
        if (bottom && !bottom.visited) neighbors.push(bottom);
        if (left && !left.visited) neighbors.push(left);

        if (neighbors.length > 0) {
            let r = Math.floor(Math.random() * neighbors.length);
            return neighbors[r];
        } else {
            return undefined;
        }
    }

    show() {
        let x = this.i * CELL_SIZE;
        let y = this.j * CELL_SIZE;
        ctx.strokeStyle = mazeColor;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';

        ctx.beginPath();
        if (this.walls[0]) { ctx.moveTo(x, y); ctx.lineTo(x + CELL_SIZE, y); }
        if (this.walls[1]) { ctx.moveTo(x + CELL_SIZE, y); ctx.lineTo(x + CELL_SIZE, y + CELL_SIZE); }
        if (this.walls[2]) { ctx.moveTo(x + CELL_SIZE, y + CELL_SIZE); ctx.lineTo(x, y + CELL_SIZE); }
        if (this.walls[3]) { ctx.moveTo(x, y + CELL_SIZE); ctx.lineTo(x, y); }
        ctx.stroke();
    }
}

function removeWalls(a, b) {
    let x = a.i - b.i;
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
    let y = a.j - b.j;
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < grid.length; i++) {
        grid[i].show();
    }
    
    // Draw exit
    ctx.fillStyle = '#0f0';
    ctx.fillRect(exit.x * CELL_SIZE + 4, exit.y * CELL_SIZE + 4, CELL_SIZE - 8, CELL_SIZE - 8);
    
    // Draw player
    ctx.fillStyle = playerColor;
    ctx.beginPath();
    ctx.arc(player.x * CELL_SIZE + CELL_SIZE/2, player.y * CELL_SIZE + CELL_SIZE/2, CELL_SIZE/2 - 4, 0, Math.PI * 2);
    ctx.fill();
}

function movePlayer(dir) {
    let currentCell = grid[index(player.x, player.y)];
    let moved = false;
    
    if (dir === 'up' && !currentCell.walls[0]) {
        player.y--;
        moved = true;
    } else if (dir === 'right' && !currentCell.walls[1]) {
        player.x++;
        moved = true;
    } else if (dir === 'down' && !currentCell.walls[2]) {
        player.y++;
        moved = true;
    } else if (dir === 'left' && !currentCell.walls[3]) {
        player.x--;
        moved = true;
    }
    
    if (moved) {
        draw();
        checkWin();
    }
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'w') { e.preventDefault(); movePlayer('up'); }
    else if (e.key === 'ArrowRight' || e.key === 'd') { e.preventDefault(); movePlayer('right'); }
    else if (e.key === 'ArrowDown' || e.key === 's') { e.preventDefault(); movePlayer('down'); }
    else if (e.key === 'ArrowLeft' || e.key === 'a') { e.preventDefault(); movePlayer('left'); }
});

let touchStartX = 0, touchStartY = 0;
canvas.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    e.preventDefault();
}, { passive: false });

canvas.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
    
    if (Math.abs(dx) > 15 || Math.abs(dy) > 15) {
        if (Math.abs(dx) > Math.abs(dy)) {
            movePlayer(dx > 0 ? 'right' : 'left');
        } else {
            movePlayer(dy > 0 ? 'down' : 'up');
        }
    }
    e.preventDefault();
}, { passive: false });

function checkWin() {
    if (player.x === exit.x && player.y === exit.y) {
        level++;
        levelDisplay.textContent = `Level: ${level}`;
        setTimeout(() => {
            initGame();
        }, 300);
    }
}

initGame();
