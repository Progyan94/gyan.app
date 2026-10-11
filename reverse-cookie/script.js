const cookie = document.getElementById('cookie');
const scoreDisplay = document.getElementById('score');
const fakeError = document.getElementById('fake-error');
const gameArea = document.getElementById('game-area');

let score = 0;
let scoreInterval;

function startScoring() {
    scoreInterval = setInterval(() => {
        score++;
        scoreDisplay.textContent = score;
    }, 1000);
}

startScoring();

cookie.addEventListener('mouseover', () => {
    moveCookie();
    showFakeErrorRandomly();
});

cookie.addEventListener('click', () => {
    score = 0;
    scoreDisplay.textContent = score;
    alert("You clicked it! Score reset to 0.");
});

function moveCookie() {
    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;
    const cookieWidth = cookie.clientWidth || 64;
    const cookieHeight = cookie.clientHeight || 64;

    const newLeft = Math.random() * (areaWidth - cookieWidth);
    const newTop = Math.random() * (areaHeight - cookieHeight);

    cookie.style.left = `${newLeft}px`;
    cookie.style.top = `${newTop}px`;
}

function showFakeErrorRandomly() {
    if (Math.random() < 0.1) {
        fakeError.classList.remove('hidden');
        setTimeout(() => {
            fakeError.classList.add('hidden');
        }, 1000);
    }
}

// Initial position
moveCookie();
