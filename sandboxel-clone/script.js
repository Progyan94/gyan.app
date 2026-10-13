const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const COLS = 100;
const ROWS = 100;
const SIZE = canvas.width / COLS; // 5px per cell

// Elements
const EMPTY = 0, SAND = 1, WATER = 2, WOOD = 3, FIRE = 4, STONE = 5;

const colors = {
    [EMPTY]: '#000000',
    [SAND]: '#e3d273',
    [WATER]: '#3b82f6',
    [WOOD]: '#8B5A2B',
    [FIRE]: '#ff4500',
    [STONE]: '#808080'
};

let grid = createGrid();
let processed = createGrid();
let fireLife = createGrid();

let currentElement = SAND;
let isPainting = false;

function createGrid() {
    return Array.from({ length: COLS }, () => new Array(ROWS).fill(0));
}

// Controls
document.querySelectorAll('.element-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.element-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const elName = e.target.getAttribute('data-element');
        switch (elName) {
            case 'Sand': currentElement = SAND; break;
            case 'Water': currentElement = WATER; break;
            case 'Wood': currentElement = WOOD; break;
            case 'Fire': currentElement = FIRE; break;
            case 'Stone': currentElement = STONE; break;
            case 'Eraser': currentElement = EMPTY; break;
        }
    });
});

document.getElementById('clear-btn').addEventListener('click', () => {
    grid = createGrid();
    fireLife = createGrid();
});

// Mouse & Touch painting
canvas.addEventListener('mousedown', (e) => { isPainting = true; paint(e); });
window.addEventListener('mouseup', () => isPainting = false);
canvas.addEventListener('mousemove', paint);

canvas.addEventListener('touchstart', (e) => {
    isPainting = true;
    paint(e);
}, { passive: false });

window.addEventListener('touchend', () => isPainting = false);

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    paint(e);
}, { passive: false });

function paint(e) {
    if (!isPainting) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    // Account for CSS scaling of canvas
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const canvasX = (clientX - rect.left) * scaleX;
    const canvasY = (clientY - rect.top) * scaleY;

    const x = Math.floor(canvasX / SIZE);
    const y = Math.floor(canvasY / SIZE);
    
    const brushSize = 2; // Brush radius
    for (let i = -brushSize; i <= brushSize; i++) {
        for (let j = -brushSize; j <= brushSize; j++) {
            if (Math.random() > 0.3) { // Density of brush
                const col = x + i;
                const row = y + j;
                if (col >= 0 && col < COLS && row >= 0 && row < ROWS) {
                    if (currentElement === EMPTY || grid[col][row] === EMPTY || grid[col][row] === WATER) {
                        grid[col][row] = currentElement;
                        if (currentElement === FIRE) {
                            fireLife[col][row] = Math.floor(Math.random() * 20) + 10;
                        }
                    }
                }
            }
        }
    }
}

function update() {
    for (let i = 0; i < COLS; i++) processed[i].fill(0);
    const dirX = Math.random() > 0.5 ? 1 : -1;

    for (let j = ROWS - 1; j >= 0; j--) {
        for (let i = dirX === 1 ? 0 : COLS - 1; 
             dirX === 1 ? i < COLS : i >= 0; 
             dirX === 1 ? i++ : i--) {
            
            if (processed[i][j]) continue;
            
            const state = grid[i][j];
            if (state === EMPTY || state === STONE || state === WOOD) continue;
            
            if (state === SAND) {
                if (j + 1 < ROWS) {
                    if (grid[i][j + 1] === EMPTY || grid[i][j+1] === WATER) {
                        const target = grid[i][j+1];
                        grid[i][j + 1] = SAND;
                        grid[i][j] = target;
                        processed[i][j+1] = 1;
                        if (target === WATER) processed[i][j] = 1;
                    } else {
                        const downLeft = i - 1 >= 0 && (grid[i - 1][j + 1] === EMPTY || grid[i - 1][j + 1] === WATER);
                        const downRight = i + 1 < COLS && (grid[i + 1][j + 1] === EMPTY || grid[i + 1][j + 1] === WATER);
                        
                        if (downLeft && downRight) {
                            const dir = Math.random() > 0.5 ? 1 : -1;
                            const target = grid[i + dir][j + 1];
                            grid[i + dir][j + 1] = SAND;
                            grid[i][j] = target;
                            processed[i+dir][j+1] = 1;
                            if (target === WATER) processed[i][j] = 1;
                        } else if (downLeft) {
                            const target = grid[i - 1][j + 1];
                            grid[i - 1][j + 1] = SAND;
                            grid[i][j] = target;
                            processed[i-1][j+1] = 1;
                            if (target === WATER) processed[i][j] = 1;
                        } else if (downRight) {
                            const target = grid[i + 1][j + 1];
                            grid[i + 1][j + 1] = SAND;
                            grid[i][j] = target;
                            processed[i+1][j+1] = 1;
                            if (target === WATER) processed[i][j] = 1;
                        }
                    }
                }
            } else if (state === WATER) {
                if (j + 1 < ROWS && grid[i][j + 1] === EMPTY) {
                    grid[i][j + 1] = WATER;
                    grid[i][j] = EMPTY;
                    processed[i][j+1] = 1;
                } else {
                    const left = i - 1 >= 0 && grid[i - 1][j] === EMPTY;
                    const right = i + 1 < COLS && grid[i + 1][j] === EMPTY;
                    
                    if (left && right) {
                        const dir = Math.random() > 0.5 ? 1 : -1;
                        grid[i + dir][j] = WATER;
                        grid[i][j] = EMPTY;
                        processed[i+dir][j] = 1;
                    } else if (left) {
                        grid[i - 1][j] = WATER;
                        grid[i][j] = EMPTY;
                        processed[i-1][j] = 1;
                    } else if (right) {
                        grid[i + 1][j] = WATER;
                        grid[i][j] = EMPTY;
                        processed[i+1][j] = 1;
                    }
                }
            }
        }
    }

    // Fire process (top to bottom is fine for rising, though standard is fine as long as we use processed flag)
    for (let j = 0; j < ROWS; j++) {
        for (let i = 0; i < COLS; i++) {
            if (grid[i][j] === FIRE && !processed[i][j]) {
                fireLife[i][j]--;
                if (fireLife[i][j] <= 0) {
                    grid[i][j] = EMPTY;
                    continue;
                }

                let moved = false;
                if (j - 1 >= 0 && grid[i][j - 1] === EMPTY) {
                    if (Math.random() > 0.4) {
                        grid[i][j - 1] = FIRE;
                        fireLife[i][j - 1] = fireLife[i][j];
                        grid[i][j] = EMPTY;
                        fireLife[i][j] = 0;
                        processed[i][j-1] = 1;
                        moved = true;
                    }
                }

                let curI = moved ? i : i;
                let curJ = moved ? j - 1 : j;

                const dirs = [[0,1], [1,0], [0,-1], [-1,0]];
                for(let d of dirs) {
                    const ni = curI + d[0];
                    const nj = curJ + d[1];
                    if (ni >= 0 && ni < COLS && nj >= 0 && nj < ROWS) {
                        if (grid[ni][nj] === WOOD) {
                            if (Math.random() > 0.8) {
                                grid[ni][nj] = FIRE;
                                fireLife[ni][nj] = Math.floor(Math.random() * 20) + 10;
                                processed[ni][nj] = 1;
                            }
                        } else if (grid[ni][nj] === WATER) {
                            grid[curI][curJ] = EMPTY;
                            fireLife[curI][curJ] = 0;
                        }
                    }
                }
            }
        }
    }
}

function draw() {
    ctx.fillStyle = colors[EMPTY];
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
            if (grid[i][j] !== EMPTY) {
                ctx.fillStyle = colors[grid[i][j]];
                ctx.fillRect(i * SIZE, j * SIZE, SIZE, SIZE);
            }
        }
    }
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
