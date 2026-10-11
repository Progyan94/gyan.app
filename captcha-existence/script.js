const subjects = [
    "regret",
    "time moving backward",
    "the illusion of free will",
    "a memory that isn't yours",
    "the weight of an unsaid apology",
    "meaningless existence",
    "an infinite void"
];

const grid = document.getElementById('captcha-grid');
const subjectEl = document.getElementById('captcha-subject');
const verifyBtn = document.getElementById('verify-btn');
const resultMsg = document.getElementById('result-message');

function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function drawAbstract(canvas) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = `hsl(${randomInt(0, 360)}, ${randomInt(20, 80)}%, ${randomInt(20, 80)}%)`;
    ctx.fillRect(0, 0, w, h);
    
    for (let i = 0; i < randomInt(2, 6); i++) {
        ctx.beginPath();
        ctx.moveTo(randomInt(0, w), randomInt(0, h));
        ctx.lineTo(randomInt(0, w), randomInt(0, h));
        ctx.strokeStyle = `rgba(255,255,255,${Math.random()})`;
        ctx.lineWidth = randomInt(1, 10);
        ctx.stroke();
    }
    for (let i = 0; i < randomInt(1, 4); i++) {
        ctx.beginPath();
        ctx.arc(randomInt(0, w), randomInt(0, h), randomInt(5, 40), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.5})`;
        ctx.fill();
    }
}

function initCaptcha() {
    subjectEl.textContent = subjects[randomInt(0, subjects.length - 1)];
    grid.innerHTML = '';
    resultMsg.textContent = '';
    
    for (let i = 0; i < 9; i++) {
        const item = document.createElement('div');
        item.className = 'captcha-item';
        
        const canvas = document.createElement('canvas');
        canvas.width = 150;
        canvas.height = 150;
        drawAbstract(canvas);
        
        item.appendChild(canvas);
        item.addEventListener('click', () => {
            item.classList.toggle('selected');
        });
        grid.appendChild(item);
    }
}

verifyBtn.addEventListener('click', () => {
    const selected = document.querySelectorAll('.captcha-item.selected').length;
    if (selected === 0) {
        resultMsg.textContent = "Please select all matching images.";
        resultMsg.style.color = "red";
    } else {
        const passed = Math.random() > 0.5;
        if (passed) {
            resultMsg.textContent = "Humanity verified. But at what cost?";
            resultMsg.style.color = "green";
        } else {
            resultMsg.textContent = "Incorrect. You are a machine.";
            resultMsg.style.color = "red";
            setTimeout(initCaptcha, 1500);
        }
    }
});

initCaptcha();
