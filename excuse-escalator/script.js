const setupScreen = document.getElementById('setup-screen');
const escalationScreen = document.getElementById('escalation-screen');
const finalScreen = document.getElementById('final-screen');

const initialExcuseInput = document.getElementById('initial-excuse');
const startBtn = document.getElementById('start-btn');
const escalateBtn = document.getElementById('escalate-btn');
const currentExcuseEl = document.getElementById('current-excuse');
const finalExcuseEl = document.getElementById('final-excuse');
const rateBtns = document.querySelectorAll('.rate-btn');
const ratingFeedback = document.getElementById('rating-feedback');

let escalationLevel = 0;
let baseExcuse = "";

function generateEscalation(level, base) {
    if (level === 0) return base;
    
    const snippets = [
        "was intercepted by the CIA",
        "spontaneously combusted",
        "was eaten by a multi-dimensional dog",
        "fell into a localized black hole",
        "was stolen by squirrels running the shadow government"
    ];
    
    let text = base;
    for (let i = 0; i < level; i++) {
        text += " and then it " + snippets[i % snippets.length];
    }
    return text;
}

startBtn.addEventListener('click', () => {
    baseExcuse = initialExcuseInput.value.trim() || "I forgot it";
    escalationLevel = 0;
    currentExcuseEl.textContent = baseExcuse;
    
    setupScreen.classList.add('hidden');
    escalationScreen.classList.remove('hidden');
});

escalateBtn.addEventListener('click', () => {
    escalationLevel++;
    
    if (escalationLevel >= 5) {
        escalationScreen.classList.add('hidden');
        finalScreen.classList.remove('hidden');
        finalExcuseEl.textContent = generateEscalation(escalationLevel, baseExcuse);
    } else {
        currentExcuseEl.textContent = generateEscalation(escalationLevel, baseExcuse);
    }
});

rateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        ratingFeedback.textContent = "Thanks for rating! The universe appreciates your judgment.";
    });
});
