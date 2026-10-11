const stats = [
    { name: "Ants on Earth", value: 20000000000000000 },
    { name: "Grains of sand on Earth", value: 7500000000000000000 },
    { name: "Stars in the observable universe", value: 200000000000000000000 },
    { name: "Cells in a human body", value: 30000000000000 },
    { name: "People on Earth", value: 8100000000 },
    { name: "Chickens on Earth", value: 33000000000 },
    { name: "Trees on Earth", value: 3000000000000 },
    { name: "McDonald's burgers sold per year", value: 2500000000 },
    { name: "Galaxies in the universe", value: 200000000000 },
    { name: "Seconds in a year", value: 31536000 },
    { name: "Water molecules in a drop", value: 1500000000000000000000 },
    { name: "Neurons in a human brain", value: 86000000000 },
    { name: "Cars in the world", value: 1470000000 },
    { name: "Bicycles in the world", value: 1000000000 },
    { name: "Dogs in the world", value: 900000000 }
];

let score = 0;
let highScore = localStorage.getItem('higherLowerHighScore') || 0;
let currentItem, nextItem;

const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('high-score');
const name1El = document.getElementById('name1');
const val1El = document.getElementById('val1');
const name2El = document.getElementById('name2');
const val2El = document.getElementById('val2');
const higherBtn = document.getElementById('higher-btn');
const lowerBtn = document.getElementById('lower-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const resultEl = document.getElementById('result');

highScoreEl.textContent = highScore;

function getRandomItem(exclude = null) {
    let item;
    do {
        item = stats[Math.floor(Math.random() * stats.length)];
    } while (exclude && item.name === exclude.name);
    return item;
}

function formatNumber(num) {
    if (num >= 1e18) return (num / 1e18).toFixed(1) + ' Quintillion';
    if (num >= 1e15) return (num / 1e15).toFixed(1) + ' Quadrillion';
    if (num >= 1e12) return (num / 1e12).toFixed(1) + ' Trillion';
    if (num >= 1e9) return (num / 1e9).toFixed(1) + ' Billion';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + ' Million';
    return num.toLocaleString();
}

function initGame() {
    score = 0;
    scoreEl.textContent = score;
    currentItem = getRandomItem();
    setupRound();
    restartBtn.classList.add('hidden');
    resultEl.textContent = '';
    resultEl.style.color = 'white';
}

function setupRound() {
    nextItem = getRandomItem(currentItem);
    
    name1El.textContent = currentItem.name;
    val1El.textContent = formatNumber(currentItem.value);
    
    name2El.textContent = nextItem.name;
    val2El.textContent = "???";
    val2El.classList.add('hidden');
    
    higherBtn.disabled = false;
    lowerBtn.disabled = false;
    nextBtn.classList.add('hidden');
    resultEl.textContent = '';
}

function handleGuess(guessIsHigher) {
    higherBtn.disabled = true;
    lowerBtn.disabled = true;
    
    val2El.textContent = formatNumber(nextItem.value);
    val2El.classList.remove('hidden');
    
    const isActuallyHigher = nextItem.value >= currentItem.value;
    const correct = (guessIsHigher && isActuallyHigher) || (!guessIsHigher && !isActuallyHigher);
    
    if (correct) {
        score++;
        scoreEl.textContent = score;
        if (score > highScore) {
            highScore = score;
            highScoreEl.textContent = highScore;
            localStorage.setItem('higherLowerHighScore', highScore);
        }
        resultEl.textContent = 'Correct!';
        resultEl.style.color = '#2ecc71';
        nextBtn.classList.remove('hidden');
    } else {
        resultEl.textContent = 'Wrong! Game Over.';
        resultEl.style.color = '#e74c3c';
        restartBtn.classList.remove('hidden');
    }
}

higherBtn.addEventListener('click', () => handleGuess(true));
lowerBtn.addEventListener('click', () => handleGuess(false));

nextBtn.addEventListener('click', () => {
    currentItem = nextItem;
    setupRound();
});

restartBtn.addEventListener('click', initGame);

initGame();
