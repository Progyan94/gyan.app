// NeoPet: Cyber Genesis - Interactive Virtual Pet Engine

const canvas = document.getElementById('pet-canvas');
const ctx = canvas.getContext('2d');

// State tracking
let pet = {
    name: "Gobi",
    stage: 0, // 0: Baby Blob, 1: Cyber Ducky, 2: Mecha Dino, 3: Cosmic Dragon
    stages: ["BABY BLOB", "CYBER DUCKY", "MECHA DINO", "COSMIC DRAGON"],
    level: 1,
    xp: 0,
    maxXp: 100,
    coins: 60,
    hunger: 80,   // 0 to 100
    happiness: 90, // 0 to 100
    energy: 100,  // 0 to 100
    hygiene: 100, // 0 to 100
    isSleeping: false,
    poopCount: 0,
    hat: null, // "cowboy", "crown", "shades"
    x: canvas.width / 2,
    y: canvas.height / 2 + 15,
    targetX: canvas.width / 2,
    targetY: canvas.height / 2 + 15,
    bounce: 0,
    eyeBlink: 0,
    actionState: "idle", // idle, eating, playing, washing, sleeping
    actionTimer: 0
};

// Elements
const elName = document.getElementById('pet-name');
const elStage = document.getElementById('pet-stage');
const elLevel = document.getElementById('pet-level');
const elCoins = document.getElementById('pet-coins');
const elMood = document.getElementById('pet-mood');
const elSpeech = document.getElementById('pet-speech');
const poopContainer = document.getElementById('poop-container');

const barHunger = document.getElementById('bar-hunger');
const barHappy = document.getElementById('bar-happy');
const barEnergy = document.getElementById('bar-energy');
const barHygiene = document.getElementById('bar-hygiene');
const barXp = document.getElementById('bar-xp');

const txtHunger = document.getElementById('txt-hunger');
const txtHappy = document.getElementById('txt-happy');
const txtEnergy = document.getElementById('txt-energy');
const txtHygiene = document.getElementById('txt-hygiene');
const txtXp = document.getElementById('txt-xp');

const modal = document.getElementById('modal-container');
const modalContent = document.getElementById('modal-content');

// Dialogue bank
const speechLines = {
    idle: ["Bloop!", "I like this pixelated room.", "What are we doing today?", "*happy wiggle*", "Beep boop!"],
    hungry: ["My tummy is singing dubstep!", "Feed me pizza!", "I crave sustenance!"],
    dirty: ["Eww, stinky room!", "I need soap ASAP!", "Clean the floor, human!"],
    tired: ["Zzz... eyelids feel heavy...", "Goodnight cyber world...", "Need rest..."],
    sad: ["I'm lonely... pet me?", "Can we play arcade games?", "A bit bored..."],
    levelUp: ["WOW! I felt a surge of cyber energy!", "Evolution sequence unlocked!"],
    eating: ["Nom nom nom! Delicious bytes!", "Yummy silicon snacks!"],
    playing: ["WHEEEE! Fast reflexes!", "HighScore incoming!"]
};

function say(text) {
    elSpeech.textContent = `"${text}"`;
}

function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Tick Loop: decay stats slowly over time
setInterval(() => {
    if (pet.isSleeping) {
        pet.energy = Math.min(100, pet.energy + 8);
        pet.hunger = Math.max(0, pet.hunger - 1);
        if (pet.energy >= 100) {
            wakeUp();
        }
    } else {
        pet.hunger = Math.max(0, pet.hunger - 1.5);
        pet.happiness = Math.max(0, pet.happiness - 1.2);
        pet.energy = Math.max(0, pet.energy - 1);
        pet.hygiene = Math.max(0, pet.hygiene - 1);

        // Chance of pooping if dirty/fed
        if (Math.random() < 0.08 && pet.poopCount < 4 && pet.hunger > 30) {
            spawnPoop();
        }
    }

    // Dynamic dialogue & mood
    if (pet.hunger < 25) {
        elMood.textContent = "STARVING";
        if (Math.random() < 0.3) say(randomChoice(speechLines.hungry));
    } else if (pet.hygiene < 30) {
        elMood.textContent = "DIRTY";
        if (Math.random() < 0.3) say(randomChoice(speechLines.dirty));
    } else if (pet.energy < 20) {
        elMood.textContent = "EXHAUSTED";
        if (Math.random() < 0.3) say(randomChoice(speechLines.tired));
    } else if (pet.happiness < 30) {
        elMood.textContent = "BORED";
        if (Math.random() < 0.3) say(randomChoice(speechLines.sad));
    } else {
        elMood.textContent = "HAPPY";
        if (Math.random() < 0.15) say(randomChoice(speechLines.idle));
    }

    updateHud();
}, 2500);

function updateHud() {
    barHunger.style.width = pet.hunger + '%';
    barHappy.style.width = pet.happiness + '%';
    barEnergy.style.width = pet.energy + '%';
    barHygiene.style.width = pet.hygiene + '%';
    barXp.style.width = Math.min(100, (pet.xp / pet.maxXp) * 100) + '%';

    txtHunger.textContent = Math.round(pet.hunger) + '%';
    txtHappy.textContent = Math.round(pet.happiness) + '%';
    txtEnergy.textContent = Math.round(pet.energy) + '%';
    txtHygiene.textContent = Math.round(pet.hygiene) + '%';
    txtXp.textContent = `${pet.xp}/${pet.maxXp}`;

    elLevel.textContent = pet.level;
    elCoins.textContent = pet.coins;
    elStage.textContent = pet.stages[pet.stage];
}

function gainXp(amount) {
    pet.xp += amount;
    if (pet.xp >= pet.maxXp) {
        pet.xp -= pet.maxXp;
        pet.level += 1;
        pet.maxXp = Math.round(pet.maxXp * 1.4);
        pet.coins += 30;

        // Check evolution stage
        if (pet.level >= 3 && pet.stage === 0) pet.stage = 1;
        if (pet.level >= 6 && pet.stage === 1) pet.stage = 2;
        if (pet.level >= 10 && pet.stage === 2) pet.stage = 3;

        say(randomChoice(speechLines.levelUp));
        triggerParticles("⭐", 10);
    }
    updateHud();
}

function spawnPoop() {
    pet.poopCount++;
    pet.hygiene = Math.max(0, pet.hygiene - 15);
    renderPoops();
}

function renderPoops() {
    poopContainer.innerHTML = '';
    for (let i = 0; i < pet.poopCount; i++) {
        const p = document.createElement('div');
        p.className = 'poop-item';
        p.textContent = '💩';
        p.title = 'Click to scoop!';
        p.onclick = () => {
            pet.poopCount = Math.max(0, pet.poopCount - 1);
            pet.hygiene = Math.min(100, pet.hygiene + 20);
            pet.coins += 5;
            say("Scooped! +5 Coins!");
            renderPoops();
            updateHud();
        };
        poopContainer.appendChild(p);
    }
}

// Particle Floating System
function triggerParticles(char, count = 6) {
    const layer = document.getElementById('particle-layer');
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.textContent = char;
        p.style.position = 'absolute';
        p.style.left = (pet.x + (Math.random() - 0.5) * 60) + 'px';
        p.style.top = (pet.y - 20) + 'px';
        p.style.fontSize = '18px';
        p.style.pointerEvents = 'none';
        p.style.transition = 'all 0.8s ease-out';
        p.style.opacity = '1';
        layer.appendChild(p);

        setTimeout(() => {
            p.style.transform = `translate(${(Math.random() - 0.5) * 80}px, -60px) scale(1.4)`;
            p.style.opacity = '0';
        }, 20);

        setTimeout(() => p.remove(), 900);
    }
}

// Pet Canvas Draw & Animation
let tick = 0;
function animate() {
    tick++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Floor and Background grid
    ctx.fillStyle = pet.isSleeping ? '#34495e' : '#7f9f70';
    ctx.fillRect(0, canvas.height - 35, canvas.width, 35);
    ctx.strokeStyle = '#2d3e23';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 35);
    ctx.lineTo(canvas.width, canvas.height - 35);
    ctx.stroke();

    // Pet wandering AI (when idle)
    if (!pet.isSleeping && pet.actionState === "idle") {
        if (Math.random() < 0.02) {
            pet.targetX = 60 + Math.random() * (canvas.width - 120);
        }
    }
    pet.x += (pet.targetX - pet.x) * 0.05;

    // Bounce oscillation
    pet.bounce = Math.sin(tick * 0.15) * 5;
    if (tick % 70 === 0) pet.eyeBlink = 10;
    if (pet.eyeBlink > 0) pet.eyeBlink--;

    drawPet(pet.x, pet.y + pet.bounce);

    requestAnimationFrame(animate);
}

function drawPet(x, y) {
    ctx.save();
    ctx.translate(x, y);

    if (pet.isSleeping) {
        // Sleep state bubble
        ctx.font = "16px Press Start 2P";
        ctx.fillStyle = "#ffeaa7";
        ctx.fillText("Z z z", 20, -35 + Math.sin(tick * 0.1) * 4);
    }

    if (pet.stage === 0) {
        // STAGE 0: BABY BLOB
        ctx.fillStyle = '#2ecc71';
        ctx.beginPath();
        ctx.arc(0, 0, 26, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#1e8449';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Eyes
        ctx.fillStyle = '#111';
        if (pet.eyeBlink > 0 || pet.isSleeping) {
            ctx.fillRect(-12, -4, 8, 2);
            ctx.fillRect(4, -4, 8, 2);
        } else {
            ctx.beginPath();
            ctx.arc(-8, -4, 4, 0, Math.PI * 2);
            ctx.arc(8, -4, 4, 0, Math.PI * 2);
            ctx.fill();
            // Eye shine
            ctx.fillStyle = '#fff';
            ctx.fillRect(-9, -6, 2, 2);
            ctx.fillRect(7, -6, 2, 2);
        }

        // Rosy cheeks
        ctx.fillStyle = 'rgba(231, 76, 60, 0.4)';
        ctx.beginPath();
        ctx.arc(-14, 4, 4, 0, Math.PI * 2);
        ctx.arc(14, 4, 4, 0, Math.PI * 2);
        ctx.fill();

        // Mouth
        ctx.strokeStyle = '#111';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 4, 5, 0, Math.PI);
        ctx.stroke();

    } else if (pet.stage === 1) {
        // STAGE 1: CYBER DUCKY
        ctx.fillStyle = '#f1c40f';
        // Body
        ctx.beginPath();
        ctx.ellipse(0, 4, 32, 24, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#d68910';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Head
        ctx.beginPath();
        ctx.arc(14, -16, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Beak
        ctx.fillStyle = '#e67e22';
        ctx.beginPath();
        ctx.moveTo(26, -16);
        ctx.lineTo(40, -12);
        ctx.lineTo(26, -8);
        ctx.fill();
        ctx.stroke();

        // Eye
        ctx.fillStyle = '#111';
        if (pet.eyeBlink > 0 || pet.isSleeping) {
            ctx.fillRect(16, -20, 6, 2);
        } else {
            ctx.beginPath();
            ctx.arc(18, -18, 3.5, 0, Math.PI * 2);
            ctx.fill();
        }

    } else if (pet.stage === 2) {
        // STAGE 2: MECHA DINO
        ctx.fillStyle = '#3498db';
        ctx.fillRect(-28, -20, 56, 40);
        ctx.strokeStyle = '#1f618d';
        ctx.lineWidth = 3;
        ctx.strokeRect(-28, -20, 56, 40);

        // Armor plating
        ctx.fillStyle = '#e74c3c';
        [-16, 0, 16].forEach(xOff => {
            ctx.beginPath();
            ctx.moveTo(xOff - 5, -20);
            ctx.lineTo(xOff, -32);
            ctx.lineTo(xOff + 5, -20);
            ctx.fill();
            ctx.stroke();
        });

        // Visor Eyes
        ctx.fillStyle = pet.isSleeping ? '#555' : '#e74c3c';
        ctx.fillRect(-16, -10, 32, 8);

    } else {
        // STAGE 3: COSMIC DRAGON
        ctx.fillStyle = '#9b59b6';
        ctx.beginPath();
        ctx.arc(0, 0, 36, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#5b2c6f';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Horns
        ctx.fillStyle = '#f39c12';
        ctx.beginPath();
        ctx.moveTo(-20, -25);
        ctx.lineTo(-32, -45);
        ctx.lineTo(-12, -32);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(20, -25);
        ctx.lineTo(32, -45);
        ctx.lineTo(12, -32);
        ctx.fill();

        // Wings
        ctx.fillStyle = '#8e44ad';
        ctx.beginPath();
        ctx.moveTo(-34, 0);
        ctx.lineTo(-58, -26 + Math.sin(tick * 0.2) * 8);
        ctx.lineTo(-34, 14);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(34, 0);
        ctx.lineTo(58, -26 + Math.sin(tick * 0.2) * 8);
        ctx.lineTo(34, 14);
        ctx.fill();
        ctx.stroke();

        // Glowing Eyes
        ctx.fillStyle = pet.isSleeping ? '#222' : '#00ffff';
        ctx.fillRect(-14, -8, 8, 8);
        ctx.fillRect(6, -8, 8, 8);
    }

    // Hat Accessory
    if (pet.hat === "crown") {
        ctx.font = "24px Arial";
        ctx.fillText("👑", -14, -30);
    } else if (pet.hat === "cowboy") {
        ctx.font = "24px Arial";
        ctx.fillText("🤠", -14, -30);
    } else if (pet.hat === "shades") {
        ctx.font = "24px Arial";
        ctx.fillText("🕶️", -14, -6);
    }

    ctx.restore();
}

// Controls & Interaction
document.getElementById('btn-feed').onclick = () => {
    if (pet.isSleeping) {
        say("Shhh! I'm sleeping! Wake me first.");
        return;
    }
    pet.hunger = Math.min(100, pet.hunger + 25);
    pet.energy = Math.min(100, pet.energy + 5);
    gainXp(12);
    pet.coins += 2;
    triggerParticles("🍕", 5);
    say(randomChoice(speechLines.eating));
    updateHud();
};

document.getElementById('btn-pet').onclick = () => {
    if (pet.isSleeping) return;
    pet.happiness = Math.min(100, pet.happiness + 15);
    gainXp(8);
    triggerParticles("💖", 6);
    say("Tee-hee! That tickles!");
    updateHud();
};

document.getElementById('btn-clean').onclick = () => {
    pet.hygiene = 100;
    pet.poopCount = 0;
    renderPoops();
    triggerParticles("🫧", 8);
    say("Squeaky clean and smelling fresh!");
    gainXp(10);
    updateHud();
};

document.getElementById('btn-sleep').onclick = () => {
    pet.isSleeping = !pet.isSleeping;
    if (pet.isSleeping) {
        say("Goodnight! Turning the lights off...");
        document.getElementById('btn-sleep').querySelector('.key-label').textContent = "WAKE";
    } else {
        wakeUp();
    }
};

function wakeUp() {
    pet.isSleeping = false;
    document.getElementById('btn-sleep').querySelector('.key-label').textContent = "SLEEP";
    say("Good morning! Ready for an adventure!");
    updateHud();
}

// SHOP MODAL
document.getElementById('btn-shop').onclick = () => {
    modal.classList.remove('hidden');
    modalContent.innerHTML = `
        <div class="modal-header">
            <span>🏪 CYBER SHOP</span>
            <button class="modal-close-btn" onclick="closeModal()">X</button>
        </div>
        <p style="margin:4px 0;">Coins: 💰 <strong>${pet.coins}</strong></p>
        <div class="shop-grid">
            <div class="shop-card">
                <div>👑 Crown</div>
                <small>Style points</small>
                <button onclick="buyItem('crown', 40)">BUY (40💰)</button>
            </div>
            <div class="shop-card">
                <div>🤠 Cowboy Hat</div>
                <small>Yee-haw aesthetic</small>
                <button onclick="buyItem('cowboy', 30)">BUY (30💰)</button>
            </div>
            <div class="shop-card">
                <div>🕶️ Pixel Shades</div>
                <small>Instant cool</small>
                <button onclick="buyItem('shades', 25)">BUY (25💰)</button>
            </div>
            <div class="shop-card">
                <div>🧪 Super XP Elixir</div>
                <small>+60 Evolution XP</small>
                <button onclick="buyElixir(35)">BUY (35💰)</button>
            </div>
        </div>
    `;
};

window.buyItem = function(item, cost) {
    if (pet.coins >= cost) {
        pet.coins -= cost;
        pet.hat = item;
        say(`Equipped ${item}! Looking fabulous!`);
        updateHud();
        closeModal();
    } else {
        alert("Not enough coins! Play the arcade minigame to earn more!");
    }
};

window.buyElixir = function(cost) {
    if (pet.coins >= cost) {
        pet.coins -= cost;
        gainXp(60);
        say("Gulp! Power level rising!");
        updateHud();
        closeModal();
    } else {
        alert("Not enough coins!");
    }
};

// ARCADE MINIGAME: Berry Catcher
document.getElementById('btn-game').onclick = () => {
    if (pet.isSleeping) {
        say("I can't play games while sleeping!");
        return;
    }
    openArcadeModal();
};

function openArcadeModal() {
    modal.classList.remove('hidden');
    modalContent.innerHTML = `
        <div class="modal-header">
            <span>🎮 BERRY CATCHER</span>
            <button class="modal-close-btn" onclick="closeModal()">X</button>
        </div>
        <p style="font-size:0.5rem; margin-bottom:6px;">Move mouse / arrow keys to catch falling berries!</p>
        <div class="arcade-canvas-wrap">
            <canvas id="arcade-canvas" width="280" height="180"></canvas>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.55rem;">
            <span>Score: <strong id="arcade-score">0</strong></span>
            <span>Earn: <strong>1💰 / 2pts</strong></span>
        </div>
    `;

    initArcadeGame();
}

function initArcadeGame() {
    const aCanvas = document.getElementById('arcade-canvas');
    if (!aCanvas) return;
    const aCtx = aCanvas.getContext('2d');
    let basketX = 140;
    let berries = [];
    let score = 0;
    let gameActive = true;

    aCanvas.onmousemove = (e) => {
        const rect = aCanvas.getBoundingClientRect();
        basketX = e.clientX - rect.left;
    };

    function spawnBerry() {
        if (!gameActive) return;
        berries.push({
            x: 20 + Math.random() * (aCanvas.width - 40),
            y: 0,
            speed: 2 + Math.random() * 2,
            type: Math.random() > 0.8 ? 'gold' : 'normal'
        });
        setTimeout(spawnBerry, 700);
    }
    spawnBerry();

    function loopArcade() {
        if (!gameActive || !document.getElementById('arcade-canvas')) return;
        aCtx.clearRect(0, 0, aCanvas.width, aCanvas.height);

        // Draw Player Basket
        aCtx.fillStyle = '#2ecc71';
        aCtx.fillRect(basketX - 20, aCanvas.height - 18, 40, 12);

        // Update & Draw Berries
        for (let i = berries.length - 1; i >= 0; i--) {
            let b = berries[i];
            b.y += b.speed;

            aCtx.fillStyle = b.type === 'gold' ? '#f1c40f' : '#e74c3c';
            aCtx.beginPath();
            aCtx.arc(b.x, b.y, 6, 0, Math.PI * 2);
            aCtx.fill();

            // Catch check
            if (b.y >= aCanvas.height - 24 && Math.abs(b.x - basketX) < 24) {
                score += (b.type === 'gold' ? 3 : 1);
                document.getElementById('arcade-score').textContent = score;
                berries.splice(i, 1);
                continue;
            }

            // Missed bottom
            if (b.y > aCanvas.height) {
                berries.splice(i, 1);
            }
        }

        requestAnimationFrame(loopArcade);
    }
    loopArcade();

    // End after 20 seconds or modal closed
    setTimeout(() => {
        if (!gameActive) return;
        gameActive = false;
        let earnedCoins = Math.max(5, Math.floor(score / 2));
        pet.coins += earnedCoins;
        pet.happiness = Math.min(100, pet.happiness + 30);
        gainXp(score * 3);
        alert(`Time's up! You caught ${score} berries and earned ${earnedCoins} Coins!`);
        closeModal();
        say(randomChoice(speechLines.playing));
    }, 15000);
}

window.closeModal = function() {
    modal.classList.add('hidden');
    modalContent.innerHTML = '';
};

// Click pet canvas directly to pet/interact
canvas.onclick = (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    if (Math.hypot(clickX - pet.x, clickY - pet.y) < 50) {
        document.getElementById('btn-pet').click();
    } else {
        pet.targetX = clickX;
    }
};

// Initial start
updateHud();
renderPoops();
animate();
