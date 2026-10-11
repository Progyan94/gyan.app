// Comic Pencil-Styled Canvas Engine for The Absurd Trolley Problem

const canvas = document.getElementById('comic-canvas');
const ctx = canvas.getContext('2d');

const levels = [
    {
        titleA: "5 Clones of Yourself",
        descA: "They share your memory and think you're the fake one.",
        iconA: "👥",
        titleB: "A Guy Who Owes You $5",
        descB: "He promised to Venmo you three years ago.",
        iconB: "💵",
        quote: "“Is the value of your clone army worth five unrecovered dollars?”"
    },
    {
        titleA: "A Truly Adorable Golden Retriever Puppy",
        descA: "It is wagging its tail and wearing a tiny bowtie.",
        iconA: "🐶",
        titleB: "The USB Drive With The Cure For Cancer",
        descB: "Stored in an unlabelled FAT32 thumb drive.",
        iconB: "💾",
        quote: "“The scientific community will understand... right?”"
    },
    {
        titleA: "Your Absolute Favorite Childhood Toy",
        descA: "Vintage, mint condition nostalgia that defines your youth.",
        iconA: "🧸",
        titleB: "An Empty Track, BUT Pulling The Lever Gives You A Papercut",
        descB: "Right in the tender web between your thumb and index finger.",
        iconB: "🩹",
        quote: "“That papercut will sting every time you use hand sanitizer for a week.”"
    },
    {
        titleA: "A Sentient Toaster That Just Learned To Love",
        descA: "It wrote a heartwarming haiku about whole-wheat sourdough.",
        iconA: "🍞",
        titleB: "Someone Who Talks Loudly On Speakerphone On The Bus",
        descB: "Discussing intimate medical appointments on volume 100.",
        iconB: "📱",
        quote: "“The toaster has feelings. The bus guy has no shame.”"
    },
    {
        titleA: "10 People Who Insist Die Hard Is A Christmas Movie",
        descA: "They will debate you until 3 AM on Christmas Eve.",
        iconA: "🎄",
        titleB: "10 People Who Insist Die Hard Is NOT A Christmas Movie",
        descB: "They have a color-coded spreadsheet explaining three-act structures.",
        iconB: "💥",
        quote: "“Holiday movie discourse claims another philosophical victim.”"
    },
    {
        titleA: "The Wi-Fi Router For The Entire Neighborhood",
        descA: "Everyone will be forced to make eye contact with their families.",
        iconA: "📡",
        titleB: "A Pigeon Eating A Single Cold French Fry",
        descB: "It worked really hard to dodge four pigeons to earn that fry.",
        iconB: "🐦",
        quote: "“Look at the pigeon's determination. Can you bear to crush its carbs?”"
    },
    {
        titleA: "The Guy Who Invented Unskippable 15-Second Ads",
        descA: "He is currently listening to elevator jazz without remorse.",
        iconA: "📢",
        titleB: "A Parallel Universe Version Of This Exact Trolley",
        descB: "Causing a space-time paradox where both universes crash.",
        iconB: "🌀",
        quote: "“Final dilemma! Do you avenge internet patience or preserve reality?”"
    }
];

let currentLevel = 0;
let userDecisions = [];
let trolleyPos = 0; // 0 to 1 progress on incoming track
let leverPulled = false; // false = bottom, true = top
let animFrameId = null;
let animProgress = 0;
let isSwitchingAnim = false;

// Hand-drawn sketchy line helper with pencil jitter
function drawSketchLine(x1, y1, x2, y2, strokeStyle = '#1a1a1a', lineWidth = 3, jitter = 1.2) {
    ctx.save();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.hypot(dx, dy);
    const steps = Math.max(3, Math.floor(dist / 14));

    ctx.beginPath();
    ctx.moveTo(x1 + (Math.random() - 0.5) * jitter, y1 + (Math.random() - 0.5) * jitter);
    for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const curX = x1 + dx * t + (Math.random() - 0.5) * jitter;
        const curY = y1 + dy * t + (Math.random() - 0.5) * jitter;
        ctx.lineTo(curX, curY);
    }
    ctx.stroke();
    ctx.restore();
}

// Pencil Crosshatch Shading
function drawHatch(x, y, w, h, density = 8) {
    ctx.save();
    ctx.strokeStyle = 'rgba(40, 30, 20, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i < w + h; i += density) {
        ctx.beginPath();
        const startX = Math.max(x, x + i - h);
        const startY = Math.min(y + h, y + i);
        const endX = Math.min(x + w, x + i);
        const endY = Math.max(y, y + i - w);
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }
    ctx.restore();
}

function renderScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Warm parchment tint
    ctx.fillStyle = '#faf4e4';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Halftone dots / pencil background crosshatch
    drawHatch(10, 10, canvas.width - 20, canvas.height - 20, 18);

    // Border around canvas
    drawSketchLine(4, 4, canvas.width - 4, 4, '#1a1a1a', 4);
    drawSketchLine(canvas.width - 4, 4, canvas.width - 4, canvas.height - 4, '#1a1a1a', 4);
    drawSketchLine(canvas.width - 4, canvas.height - 4, 4, canvas.height - 4, '#1a1a1a', 4);
    drawSketchLine(4, canvas.height - 4, 4, 4, '#1a1a1a', 4);

    // Main Incoming Track (from left x: 30 to switch point x: 310, y: 170)
    const switchX = 310;
    const centerY = 170;

    // Sleepers (Railroad ties) incoming
    for (let x = 40; x < switchX; x += 22) {
        drawSketchLine(x, centerY - 16, x, centerY + 16, '#8b5a2b', 4, 1.5);
    }
    // Rails
    drawSketchLine(20, centerY - 10, switchX, centerY - 10, '#333', 3.5);
    drawSketchLine(20, centerY + 10, switchX, centerY + 10, '#333', 3.5);

    // Top Track Fork (to x: 720, y: 80)
    for (let i = 0; i < 15; i++) {
        const t = (i + 1) / 16;
        const tx = switchX + t * (700 - switchX);
        const ty = centerY + t * (80 - centerY);
        drawSketchLine(tx - 6, ty - 14, tx + 6, ty + 14, '#8b5a2b', 3.5, 1.5);
    }
    drawSketchLine(switchX, centerY - 10, 710, 70, '#333', 3.5);
    drawSketchLine(switchX, centerY + 10, 710, 90, '#333', 3.5);

    // Bottom Track Fork (to x: 720, y: 260)
    for (let i = 0; i < 15; i++) {
        const t = (i + 1) / 16;
        const tx = switchX + t * (700 - switchX);
        const ty = centerY + t * (260 - centerY);
        drawSketchLine(tx - 6, ty - 14, tx + 6, ty + 14, '#8b5a2b', 3.5, 1.5);
    }
    drawSketchLine(switchX, centerY - 10, 710, 250, '#333', 3.5);
    drawSketchLine(switchX, centerY + 10, 710, 270, '#333', 3.5);

    // Switch Mechanism & Lever
    drawSketchLine(switchX - 5, centerY + 30, switchX + 25, centerY + 30, '#111', 4);
    // Lever pivot
    ctx.fillStyle = '#ff4757';
    ctx.beginPath();
    ctx.arc(switchX + 10, centerY + 30, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Lever arm: tilted up if pulled, tilted down if default
    const leverAngle = leverPulled ? -Math.PI / 4 : Math.PI / 4;
    const armLen = 34;
    const leverTipX = switchX + 10 + Math.sin(leverAngle) * armLen;
    const leverTipY = centerY + 30 - Math.cos(leverAngle) * armLen;
    drawSketchLine(switchX + 10, centerY + 30, leverTipX, leverTipY, '#ff4757', 5);
    ctx.fillStyle = '#ffe600';
    ctx.beginPath();
    ctx.arc(leverTipX, leverTipY, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Targets on Tracks (Top & Bottom)
    const cur = levels[currentLevel] || levels[0];

    // TOP TARGET POD
    drawSketchLine(640, 40, 740, 40, '#111', 2);
    drawSketchLine(740, 40, 740, 120, '#111', 2);
    drawSketchLine(740, 120, 640, 120, '#111', 2);
    drawSketchLine(640, 120, 640, 40, '#111', 2);
    ctx.fillStyle = '#ffeded';
    ctx.fillRect(642, 42, 96, 76);
    ctx.font = '32px Patrick Hand';
    ctx.textAlign = 'center';
    ctx.fillText(cur.iconA, 690, 84);
    ctx.font = 'bold 13px Patrick Hand';
    ctx.fillStyle = '#111';
    ctx.fillText("PATH A", 690, 108);

    // BOTTOM TARGET POD
    drawSketchLine(640, 220, 740, 220, '#111', 2);
    drawSketchLine(740, 220, 740, 300, '#111', 2);
    drawSketchLine(740, 300, 640, 300, '#111', 2);
    drawSketchLine(640, 300, 640, 220, '#111', 2);
    ctx.fillStyle = '#e8f4ff';
    ctx.fillRect(642, 222, 96, 76);
    ctx.font = '32px Patrick Hand';
    ctx.textAlign = 'center';
    ctx.fillText(cur.iconB, 690, 264);
    ctx.font = 'bold 13px Patrick Hand';
    ctx.fillStyle = '#111';
    ctx.fillText("PATH B", 690, 288);

    // Draw Comic Trolley Carriage
    drawComicTrolley(trolleyPos, leverPulled);

    // Speed lines & comic text overlay
    drawComicSpeedFx();
}

function drawComicTrolley(progress, trackChoice) {
    let tx, ty, angle = 0;

    if (progress <= 0.45) {
        // Incoming straight track
        const tNorm = progress / 0.45;
        tx = 40 + tNorm * (310 - 40);
        ty = 170;
        angle = 0;
    } else {
        // Fork track
        const tNorm = (progress - 0.45) / 0.55;
        const startX = 310;
        const startY = 170;
        const targetX = 640;
        const targetY = trackChoice ? 80 : 260; // Top or bottom

        tx = startX + tNorm * (targetX - startX);
        ty = startY + tNorm * (targetY - startY);
        angle = Math.atan2(targetY - startY, targetX - startX);
    }

    ctx.save();
    ctx.translate(tx, ty);
    ctx.rotate(angle);

    // Trolley Box Body
    const w = 62;
    const h = 34;

    ctx.fillStyle = '#ffcc00';
    ctx.fillRect(-w / 2, -h / 2, w, h);

    // Pencil outlines
    drawSketchLine(-w / 2, -h / 2, w / 2, -h / 2, '#111', 3);
    drawSketchLine(w / 2, -h / 2, w / 2, h / 2, '#111', 3);
    drawSketchLine(w / 2, h / 2, -w / 2, h / 2, '#111', 3);
    drawSketchLine(-w / 2, h / 2, -w / 2, -h / 2, '#111', 3);

    // Roof stripe
    drawSketchLine(-w / 2 - 4, -h / 2 - 6, w / 2 + 4, -h / 2 - 6, '#e74c3c', 4);

    // Windows
    ctx.fillStyle = '#eaf2f8';
    [-18, 0, 18].forEach(xOff => {
        ctx.fillRect(xOff - 7, -8, 14, 12);
        drawSketchLine(xOff - 7, -8, xOff + 7, -8, '#222', 1.5);
        drawSketchLine(xOff + 7, -8, xOff + 7, 4, '#222', 1.5);
        drawSketchLine(xOff + 7, 4, xOff - 7, 4, '#222', 1.5);
        drawSketchLine(xOff - 7, 4, xOff - 7, -8, '#222', 1.5);
    });

    // Wheels
    ctx.fillStyle = '#2c3e50';
    [-16, 16].forEach(wX => {
        ctx.beginPath();
        ctx.arc(wX, h / 2 + 2, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    });

    // Chimney puff / Cowcatcher
    drawSketchLine(w / 2, h / 2 - 4, w / 2 + 10, h / 2 + 4, '#111', 3);
    drawSketchLine(w / 2, -h / 2 + 4, w / 2 + 10, -h / 2 - 4, '#111', 3);

    ctx.restore();
}

function drawComicSpeedFx() {
    // "CHUGGA CHUGGA" Comic Sound Effect text
    ctx.save();
    ctx.font = '22px Bangers';
    ctx.fillStyle = '#e74c3c';
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 1;
    ctx.transform(1, -0.1, 0, 1, 0, 0);
    ctx.fillText("CLAK-CLAK!", 90, 135);
    ctx.strokeText("CLAK-CLAK!", 90, 135);

    if (isSwitchingAnim) {
        ctx.font = '26px Bangers';
        ctx.fillStyle = '#ffe600';
        ctx.fillText("SCREEECH!!", 310, 140);
        ctx.strokeText("SCREEECH!!", 310, 140);
    }
    ctx.restore();
}

// Level Controller
function loadLevel() {
    if (currentLevel >= levels.length) {
        showEndScreen();
        return;
    }

    const cur = levels[currentLevel];
    document.getElementById('level-indicator').textContent = `PANEL ${currentLevel + 1} / ${levels.length}`;
    document.getElementById('morality-score').textContent = `Guilt Rating: ${Math.round((currentLevel / levels.length) * 100)}%`;

    document.getElementById('choice-a-title').textContent = cur.titleA;
    document.getElementById('choice-a-desc').textContent = cur.descA;
    document.getElementById('illustration-top').textContent = cur.iconA;

    document.getElementById('choice-b-title').textContent = cur.titleB;
    document.getElementById('choice-b-desc').textContent = cur.descB;
    document.getElementById('illustration-bottom').textContent = cur.iconB;

    document.getElementById('bubble-text').textContent = cur.quote;

    // Reset trolley animation to start of track
    trolleyPos = 0.05;
    leverPulled = false;
    document.getElementById('lever-state').textContent = 'LEVER: NORMAL (LOWER TRACK)';

    renderScene();
}

function makeChoice(choice) {
    if (isSwitchingAnim) return;

    leverPulled = (choice === 'A');
    document.getElementById('lever-state').textContent = leverPulled 
        ? 'LEVER: PULLED! (SWITCHED TO TOP TRACK)' 
        : 'LEVER: UNTOUCHED (STAYING ON DEFAULT TRACK)';

    isSwitchingAnim = true;
    const cur = levels[currentLevel];
    const picked = choice === 'A' ? cur.titleA : cur.titleB;
    const spared = choice === 'A' ? cur.titleB : cur.titleA;
    userDecisions.push({ level: currentLevel + 1, picked, spared, choice });

    // Animate trolley rushing down track
    let startProgress = trolleyPos;
    let startTime = performance.now();

    function step(timestamp) {
        let elapsed = (timestamp - startTime) / 1000;
        let p = startProgress + (elapsed / 0.85); // 0.85s run
        if (p < 0.95) {
            trolleyPos = p;
            renderScene();
            requestAnimationFrame(step);
        } else {
            trolleyPos = 0.95;
            renderScene();
            setTimeout(() => {
                isSwitchingAnim = false;
                currentLevel++;
                loadLevel();
            }, 300);
        }
    }

    requestAnimationFrame(step);
}

function showEndScreen() {
    document.getElementById('game-container').classList.add('hidden');
    const endScreen = document.getElementById('end-screen');
    endScreen.classList.remove('hidden');

    const recapList = document.getElementById('recap-list');
    recapList.innerHTML = '';

    let pulledCount = userDecisions.filter(d => d.choice === 'A').length;

    userDecisions.forEach(d => {
        const item = document.createElement('div');
        item.className = 'recap-item';
        item.innerHTML = `
            <span><strong>Panel #${d.level}:</strong> Sacrificed <em>${d.picked}</em></span>
            <span style="color:#27ae60">Spared <em>${d.spared}</em></span>
        `;
        recapList.appendChild(item);
    });

    const stamp = document.getElementById('verdict-stamp');
    const verdictTitle = document.getElementById('verdict-title');
    const summary = document.getElementById('verdict-summary');

    if (pulledCount >= 5) {
        stamp.textContent = "AGGRESSIVE LEVER ENTHUSIAST";
        stamp.style.borderColor = "#ff4757";
        verdictTitle.textContent = "LEVER ADDICTION DETECTED!";
        summary.textContent = `You pulled the lever ${pulledCount} times! You clearly believe in chaotic active intervention regardless of consequence.`;
    } else if (pulledCount <= 2) {
        stamp.textContent = "APATHETIC BYSTANDER";
        stamp.style.borderColor = "#1e90ff";
        verdictTitle.textContent = "HANDS IN POCKETS!";
        summary.textContent = `You only pulled the lever ${pulledCount} times. You let the universe run its course so your hands stay legally pristine.`;
    } else {
        stamp.textContent = "CONFUSED UTILITARIAN";
        stamp.style.borderColor = "#2ed573";
        verdictTitle.textContent = "MORAL ROLLERCOASTER!";
        summary.textContent = "You balanced calculated logic with sudden whim. Immanuel Kant is currently scratching his head in the afterlife.";
    }
}

function restartGame() {
    currentLevel = 0;
    userDecisions = [];
    document.getElementById('end-screen').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    loadLevel();
}

// Initial draw
loadLevel();
