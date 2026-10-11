// Toggle logic
const terminalContainer = document.getElementById('terminal-container');
const progressContainer = document.getElementById('progress-container');
const toggleBtn = document.getElementById('toggle-mode');

let currentMode = 'terminal';

toggleBtn.addEventListener('click', () => {
    if (currentMode === 'terminal') {
        currentMode = 'progress';
        terminalContainer.classList.remove('active');
        progressContainer.classList.add('active');
        toggleBtn.innerText = 'Toggle Mode: Terminal';
    } else {
        currentMode = 'terminal';
        progressContainer.classList.remove('active');
        terminalContainer.classList.add('active');
        toggleBtn.innerText = 'Toggle Mode: Progress';
    }
});

// Terminal Simulation
const terminalBody = document.getElementById('terminal-body');
const fakeCode = [
    "Loading dependencies...",
    "Connecting to proxy server...",
    "Bypassing firewall...",
    "Extracting node_modules...",
    "Warning: Unresolved peer dependencies.",
    "Compiling TypeScript...",
    "Minifying assets...",
    "Generating source maps...",
    "Encrypting payloads...",
    "Establishing secure socket connection...",
    "Updating registry...",
    "Building docker image...",
    "Pushing to remote repository...",
    "Running unit tests: 403 passed, 0 failed.",
    "Deploying to production environment..."
];

const hexChars = "0123456789ABCDEF";

function generateHex() {
    let hex = "0x";
    for(let i=0; i<8; i++) {
        hex += hexChars[Math.floor(Math.random() * hexChars.length)];
    }
    return hex;
}

function addLogLine() {
    if (currentMode !== 'terminal') return;
    
    const line = document.createElement('div');
    line.className = 'log-line';
    
    const timestamp = new Date().toISOString().split('T')[1].slice(0, -1);
    const prefix = `[${timestamp}] ${generateHex()} `;
    
    // Random gibberish mixed with fake code
    const isCode = Math.random() > 0.5;
    let content = "";
    if (isCode) {
        content = fakeCode[Math.floor(Math.random() * fakeCode.length)];
    } else {
        const length = Math.floor(Math.random() * 50) + 20;
        for(let i=0; i<length; i++) {
            content += String.fromCharCode(Math.floor(Math.random() * 94) + 33);
        }
    }
    
    line.innerText = prefix + content;
    terminalBody.appendChild(line);
    
    if (terminalBody.childNodes.length > 40) {
        terminalBody.removeChild(terminalBody.firstChild);
    }
}

setInterval(addLogLine, 100);

// Progress Bar Simulation
const progressFill = document.getElementById('progress-fill');
const progressPercent = document.getElementById('progress-percent');
const progressStatus = document.getElementById('progress-status');

let progress = 0;

function updateProgress() {
    if (currentMode !== 'progress') return;
    if (progress >= 99) {
        progressStatus.innerText = "Stuck at 99%. Please wait indefinitely...";
        return;
    }
    
    // Non-linear progress increment
    const increment = Math.random() * 2;
    progress = Math.min(99, progress + increment);
    
    progressFill.style.width = `${progress}%`;
    progressPercent.innerText = `${progress.toFixed(1)}%`;
    
    if (progress < 30) progressStatus.innerText = "Building modules...";
    else if (progress < 60) progressStatus.innerText = "Optimizing chunks...";
    else if (progress < 90) progressStatus.innerText = "Emitting assets...";
    else progressStatus.innerText = "Finalizing build...";
}

setInterval(updateProgress, 300);
