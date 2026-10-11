const ocean = document.getElementById('ocean');
const writeBtn = document.getElementById('write-btn');
const readModal = document.getElementById('read-modal');
const writeModal = document.getElementById('write-modal');
const closeRead = document.getElementById('close-read');
const closeWrite = document.getElementById('close-write');
const readMessage = document.getElementById('read-message');
const writeMessageInput = document.getElementById('write-message');
const tossBtn = document.getElementById('toss-btn');

let messages = [
    "You're doing great, keep going!",
    "Don't forget to drink water and take a stretch.",
    "A bug is just an undocumented feature.",
    "Tomorrow is a new day full of possibilities.",
    "Take a deep breath. You got this.",
    "Someone out there is proud of you.",
    "Your code is beautiful, even if it doesn't compile yet.",
    "Be kind to yourself today."
];

function spawnBottle(specificMessage = null) {
    const bottle = document.createElement('div');
    bottle.classList.add('bottle');
    bottle.textContent = '🍾'; // Glass bottle emoji
    
    // Random vertical position (between 10% and 80% of height)
    const topPos = Math.random() * 70 + 10;
    bottle.style.top = `${topPos}%`;
    
    // Start off screen left
    bottle.style.left = '-80px';

    const msg = specificMessage || messages[Math.floor(Math.random() * messages.length)];
    
    bottle.addEventListener('click', () => {
        bottle.remove();
        openReadModal(msg);
    });

    ocean.appendChild(bottle);

    // Animate across screen
    let pos = -80;
    const speed = Math.random() * 0.8 + 0.4; // 0.4 to 1.2 px per frame

    function move() {
        if (!document.body.contains(bottle)) return;
        pos += speed;
        bottle.style.left = `${pos}px`;
        if (pos > window.innerWidth + 100) {
            bottle.remove();
        } else {
            requestAnimationFrame(move);
        }
    }
    
    requestAnimationFrame(move);
}

function openReadModal(msg) {
    readMessage.textContent = msg;
    readModal.classList.remove('hidden');
}

closeRead.addEventListener('click', () => {
    readModal.classList.add('hidden');
});

writeBtn.addEventListener('click', () => {
    writeMessageInput.value = '';
    writeModal.classList.remove('hidden');
    writeMessageInput.focus();
});

closeWrite.addEventListener('click', () => {
    writeModal.classList.add('hidden');
});

tossBtn.addEventListener('click', () => {
    const text = writeMessageInput.value.trim();
    if (text) {
        messages.push(text);
        spawnBottle(text); // Immediately spawn the new message
        writeModal.classList.add('hidden');
    }
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === readModal) readModal.classList.add('hidden');
    if (e.target === writeModal) writeModal.classList.add('hidden');
});

// Spawn bottles periodically
setInterval(() => {
    if (Math.random() > 0.4) {
        spawnBottle();
    }
}, 3000);

// Initial bottles
for (let i = 0; i < 4; i++) {
    setTimeout(spawnBottle, i * 1200);
}
