const button = document.getElementById('annoyed-btn');
const crashScreen = document.getElementById('crash-screen');
let clicks = 0;

const phrases = [
    "Click me!",
    "Hey!",
    "Ouch!",
    "Stop it.",
    "Seriously?",
    "Why are you like this?",
    "That hurts!",
    "Don't you have anything better to do?",
    "I'm warning you...",
    "Alright, that's it!",
    "You asked for this."
];

function updateButton() {
    clicks++;
    
    if (clicks < 10) {
        button.innerText = phrases[Math.min(clicks, phrases.length - 1)];
    } else if (clicks === 10) {
        button.innerText = phrases[phrases.length - 1];
        button.style.position = 'absolute';
        teleportButton();
    } else if (clicks === 50) {
        button.classList.add('shrink');
        button.innerText = "tiny squeak";
    } else if (clicks === 100) {
        triggerCrash();
    }
}

function teleportButton() {
    const maxX = window.innerWidth - button.offsetWidth;
    const maxY = window.innerHeight - button.offsetHeight;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
}

function triggerCrash() {
    crashScreen.classList.remove('hidden');
    button.classList.add('hidden');
    document.querySelector('.back-link').style.display = 'none';
}

button.addEventListener('click', () => {
    updateButton();
    if (clicks >= 10 && clicks < 100) {
        teleportButton();
    }
});

button.addEventListener('mouseover', () => {
    if (clicks >= 10 && clicks < 100) {
        teleportButton();
    }
});
