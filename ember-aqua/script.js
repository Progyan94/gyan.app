const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const TILE_SIZE = 40;
const ROWS = 15;
const COLS = 20;

// Level layout map
// W: Wall
// E: Ember Start, A: Aqua Start
// R: Red Door, B: Blue Door
// P: Button (opens G)
// p: Button (opens g)
// G, g: Gates
const levelData = [
  "WWWWWWWWWWWWWWWWWWWW",
  "W RP g W  p   G B  W",
  "WWWWWWWW WWWWWWWWWWW",
  "W      W           W",
  "W      W  WW       W",
  "WWWWWWWW           W",
  "W         WWWWWWWWWW",
  "W      W           W",
  "W  WW  W  WW       W",
  "W      W           W",
  "W  P   W           W",
  "WWWWWW W WWWWWW    W",
  "W      W           W",
  "W  E   W     A     W",
  "WWWWWWWWWWWWWWWWWWWW"
];

let tiles = [];
let buttons = [];
let gates = [];
let doors = [];
let ember, aqua;
let keys = {};
let gameState = "playing"; // playing, won

function init() {
    tiles = [];
    buttons = [];
    gates = [];
    doors = [];
    gameState = "playing";

    for(let r = 0; r < ROWS; r++) {
        for(let c = 0; c < COLS; c++) {
            let char = levelData[r][c];
            let x = c * TILE_SIZE;
            let y = r * TILE_SIZE;

            if(char === 'W') {
                tiles.push({x, y, w: TILE_SIZE, h: TILE_SIZE, type: 'wall'});
            }
            else if(char === 'P') {
                buttons.push({x: x + 5, y: y + TILE_SIZE - 10, w: TILE_SIZE - 10, h: 10, id: 1, pressed: false});
            }
            else if(char === 'p') {
                buttons.push({x: x + 5, y: y + TILE_SIZE - 10, w: TILE_SIZE - 10, h: 10, id: 2, pressed: false});
            }
            else if(char === 'G') {
                gates.push({x, y, w: TILE_SIZE, h: TILE_SIZE, id: 1});
            }
            else if(char === 'g') {
                gates.push({x, y, w: TILE_SIZE, h: TILE_SIZE, id: 2});
            }
            else if(char === 'R') {
                doors.push({x, y, w: TILE_SIZE, h: TILE_SIZE, type: 'red'});
            }
            else if(char === 'B') {
                doors.push({x, y, w: TILE_SIZE, h: TILE_SIZE, type: 'blue'});
            }
            else if(char === 'E') {
                ember = {
                    x: x + 5, y: y + 10, w: 26, h: 30,
                    vx: 0, vy: 0, color: '#ff4400',
                    isGrounded: false, atDoor: false
                };
            }
            else if(char === 'A') {
                aqua = {
                    x: x + 5, y: y + 10, w: 26, h: 30,
                    vx: 0, vy: 0, color: '#0088ff',
                    isGrounded: false, atDoor: false
                };
            }
        }
    }
}

window.addEventListener("keydown", e => {
    keys[e.key] = true;
    if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === " ") e.preventDefault();
});
window.addEventListener("keyup", e => {
    keys[e.key] = false;
});

function checkCollision(r1, r2) {
    return r1.x < r2.x + r2.w &&
           r1.x + r1.w > r2.x &&
           r1.y < r2.y + r2.h &&
           r1.y + r1.h > r2.y;
}

function updatePlayer(p, controls) {
    // Horizontal movement
    if(keys[controls.left]) p.vx = -4;
    else if(keys[controls.right]) p.vx = 4;
    else p.vx = 0;

    // Jump
    if((keys[controls.up] || keys[controls.upAlt]) && p.isGrounded) {
        p.vy = -11.5;
        p.isGrounded = false;
    }

    // Gravity
    p.vy += 0.5;
    if(p.vy > 12) p.vy = 12; // Terminal velocity

    // X Collision
    p.x += p.vx;
    handleCollisions(p, 'x');

    // Y Collision
    p.y += p.vy;
    p.isGrounded = false;
    handleCollisions(p, 'y');
    
    // Bounds checking
    if(p.x < 0) p.x = 0;
    if(p.x + p.w > canvas.width) p.x = canvas.width - p.w;
    if(p.y > canvas.height) {
        // Reset level if they somehow fall off
        init();
    }
}

function isGateOpen(id) {
    return buttons.some(b => b.id === id && b.pressed);
}

function handleCollisions(p, axis) {
    let activeTiles = tiles.concat(gates.filter(g => !isGateOpen(g.id)));

    for(let t of activeTiles) {
        if(checkCollision(p, t)) {
            if(axis === 'x') {
                if(p.vx > 0) p.x = t.x - p.w;
                else p.x = t.x + t.w;
                p.vx = 0;
            } else {
                if(p.vy > 0) {
                    p.y = t.y - p.h;
                    p.isGrounded = true;
                } else {
                    p.y = t.y + t.h;
                }
                p.vy = 0;
            }
        }
    }
}

function update() {
    if(gameState !== "playing") return;

    // Check buttons
    for(let b of buttons) {
        b.pressed = checkCollision(ember, b) || checkCollision(aqua, b);
    }

    updatePlayer(ember, {left: 'a', right: 'd', up: 'w', upAlt: 'W', leftAlt: 'A', rightAlt: 'D'});
    updatePlayer(aqua, {left: 'ArrowLeft', right: 'ArrowRight', up: 'ArrowUp', upAlt: 'ArrowUp'});

    // Check doors
    ember.atDoor = false;
    aqua.atDoor = false;
    for(let d of doors) {
        if(d.type === 'red' && checkCollision(ember, d)) ember.atDoor = true;
        if(d.type === 'blue' && checkCollision(aqua, d)) aqua.atDoor = true;
    }

    if(ember.atDoor && aqua.atDoor) {
        gameState = "won";
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw walls
    ctx.fillStyle = '#555';
    for(let t of tiles) {
        ctx.fillRect(t.x, t.y, t.w, t.h);
        ctx.strokeStyle = '#333';
        ctx.strokeRect(t.x, t.y, t.w, t.h);
    }

    // Draw doors
    for(let d of doors) {
        ctx.fillStyle = d.type === 'red' ? '#aa0000' : '#0000aa';
        ctx.fillRect(d.x, d.y, d.w, d.h);
        // Door frame
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.strokeRect(d.x, d.y, d.w, d.h);
        ctx.lineWidth = 1;
    }

    // Draw buttons
    for(let b of buttons) {
        ctx.fillStyle = b.pressed ? '#00ff00' : '#00aa00';
        ctx.fillRect(b.x, b.y + (b.pressed ? 5 : 0), b.w, b.h - (b.pressed ? 5 : 0));
    }

    // Draw gates
    for(let g of gates) {
        if(!isGateOpen(g.id)) {
            ctx.fillStyle = '#006600';
            ctx.fillRect(g.x, g.y, g.w, g.h);
            // Gate pattern
            ctx.fillStyle = '#00aa00';
            ctx.fillRect(g.x + 5, g.y + 5, g.w - 10, g.h - 10);
        }
    }

    // Draw Ember
    ctx.fillStyle = ember.color;
    ctx.fillRect(ember.x, ember.y, ember.w, ember.h);

    // Draw Aqua
    ctx.fillStyle = aqua.color;
    ctx.fillRect(aqua.x, aqua.y, aqua.w, aqua.h);

    // Win screen
    if(gameState === "won") {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 48px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText("Level Complete!", canvas.width/2, canvas.height/2);
        ctx.font = '24px sans-serif';
        ctx.fillText("Refresh to play again", canvas.width/2, canvas.height/2 + 40);
    }
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

init();
loop();
