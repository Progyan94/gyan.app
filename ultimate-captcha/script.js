const stages = document.querySelectorAll('.stage');
const msg = document.getElementById('message-container');
let currentStage = 1;
let mathInterval;

function showStage(stageNum) {
    stages.forEach((s, idx) => {
        if (idx + 1 === stageNum) {
            s.classList.add('active');
        } else {
            s.classList.remove('active');
        }
    });
}

function fail(message) {
    msg.innerText = message || "Pathetic human. Resetting...";
    msg.classList.add('shake');
    setTimeout(() => {
        msg.classList.remove('shake');
        msg.innerText = '';
        currentStage = 1;
        resetGame();
        showStage(currentStage);
    }, 2000);
}

function resetGame() {
    document.getElementById('human-checkbox').checked = false;
    document.getElementById('btn-1').disabled = true;
    document.getElementById('captcha-input').value = '';
    document.getElementById('math-input').value = '';
    document.querySelectorAll('.img-square').forEach(sq => sq.classList.remove('selected'));
    clearInterval(mathInterval);
}

// Stage 1
document.getElementById('human-checkbox').addEventListener('change', (e) => {
    document.getElementById('btn-1').disabled = !e.target.checked;
});

document.getElementById('btn-1').addEventListener('click', () => {
    currentStage = 2;
    showStage(currentStage);
    startStage2();
});

// Stage 2
function startStage2() {
    const textEl = document.getElementById('moving-text');
    let x = 0;
    let y = 0;
    const interval = setInterval(() => {
        if (currentStage !== 2) {
            clearInterval(interval);
            return;
        }
        x = Math.random() * 50 - 25;
        y = Math.random() * 50 - 25;
        textEl.style.transform = `translate(${x}px, ${y}px) skew(-10deg) rotate(${Math.random()*20-10}deg)`;
    }, 100);
}

document.getElementById('btn-2').addEventListener('click', () => {
    const val = document.getElementById('captcha-input').value;
    if (val === 'h8G9aKp') {
        currentStage = 3;
        showStage(currentStage);
        startStage3();
    } else {
        fail("Are you even trying?");
    }
});

// Stage 3
function startStage3() {
    let timeLeft = 5.0;
    const timerEl = document.getElementById('timer');
    timerEl.innerText = timeLeft.toFixed(1);
    
    mathInterval = setInterval(() => {
        timeLeft -= 0.1;
        if (timeLeft <= 0) {
            clearInterval(mathInterval);
            timerEl.innerText = "0.0";
            fail("Too slow, carbon-based lifeform!");
        } else {
            timerEl.innerText = Math.max(0, timeLeft).toFixed(1);
        }
    }, 100);
}

document.getElementById('btn-3').addEventListener('click', () => {
    const val = document.getElementById('math-input').value;
    // ∫(3x² + 2x + 5)dx from 0 to 2
    // = [x³ + x² + 5x] from 0 to 2
    // = 8 + 4 + 10 = 22
    if (val === '22') {
        clearInterval(mathInterval);
        currentStage = 4;
        showStage(currentStage);
    } else {
        clearInterval(mathInterval);
        fail("Math is hard for biological brains, isn't it?");
    }
});

// Stage 4
document.querySelectorAll('.img-square').forEach(sq => {
    sq.addEventListener('click', () => {
        sq.classList.toggle('selected');
    });
});

document.getElementById('btn-4').addEventListener('click', () => {
    let correct = true;
    document.querySelectorAll('.img-square').forEach(sq => {
        const isCorrectChoice = sq.getAttribute('data-correct') === 'true';
        const isSelected = sq.classList.contains('selected');
        if (isCorrectChoice !== isSelected) {
            correct = false;
        }
    });
    
    if (correct) {
        msg.style.color = '#28a745';
        msg.innerText = "Verification complete. Welcome, human.";
        document.getElementById('btn-4').disabled = true;
    } else {
        fail("Incorrect. Your understanding of existential dread is lacking.");
    }
});
