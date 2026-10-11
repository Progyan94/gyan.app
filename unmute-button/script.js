const slider = document.getElementById('volume-slider');
const volValue = document.getElementById('vol-value');
const message = document.getElementById('message');
const riddleContainer = document.getElementById('riddle-container');
const riddleText = document.getElementById('riddle-text');
const riddleAnswer = document.getElementById('riddle-answer');
const submitRiddle = document.getElementById('submit-riddle');

let lastTime = Date.now();
let lastVal = 0;
let riddleActive = false;

const riddles = [
    { q: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?", a: "echo" },
    { q: "The more of this there is, the less you see. What is it?", a: "darkness" },
    { q: "What has keys but can't open locks?", a: "piano" }
];
let currentRiddle = null;

slider.addEventListener('input', (e) => {
    if (riddleActive) {
        e.preventDefault();
        slider.value = lastVal;
        return;
    }

    const now = Date.now();
    let val = parseInt(slider.value);
    const dt = now - lastTime;
    const dv = val - lastVal;

    // Check speed
    if (dt > 0 && Math.abs(dv / dt) > 0.5) { // too fast
        message.innerText = "Too fast! Muted.";
        slider.value = 0;
        val = 0;
    } else {
        message.innerText = "";
    }

    // Check milestones
    if (val > 30 && lastVal <= 30) {
        askRiddle();
    } else if (val > 70 && lastVal <= 70) {
        askRiddle();
    }

    if (!riddleActive) {
        volValue.innerText = slider.value;
        lastVal = parseInt(slider.value);
    }
    lastTime = now;
});

function askRiddle() {
    riddleActive = true;
    currentRiddle = riddles[Math.floor(Math.random() * riddles.length)];
    riddleText.innerText = currentRiddle.q;
    riddleAnswer.value = "";
    riddleContainer.classList.remove('hidden');
    message.innerText = "Solve the riddle to increase volume!";
}

submitRiddle.addEventListener('click', () => {
    const ans = riddleAnswer.value.toLowerCase().trim();
    if (ans === currentRiddle.a) {
        riddleActive = false;
        riddleContainer.classList.add('hidden');
        message.innerText = "Correct! You may proceed.";
        volValue.innerText = slider.value;
        lastVal = parseInt(slider.value);
    } else {
        riddleActive = false;
        riddleContainer.classList.add('hidden');
        message.innerText = "Wrong! Volume reset.";
        slider.value = 0;
        volValue.innerText = 0;
        lastVal = 0;
    }
});
