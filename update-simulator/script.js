const btnRestart = document.getElementById('btn-restart');
const btnLater = document.getElementById('btn-later');
const shutdownScreen = document.getElementById('shutdown-screen');
const updatingScreen = document.getElementById('updating-screen');
const progressText = document.getElementById('progress');

const absurdMessages = [
    "Downloading More RAM...",
    "Installing Windows 9...",
    "Uploading user data to cloud...",
    "Mining Dogecoin in background...",
    "Deleting System32...",
    "Updating the updates...",
    "Scanning for alien life...",
    "Accept new EULA to continue breathing.",
    "Recalibrating mouse pad...",
    "Applying retro filters to all photos..."
];

btnRestart.addEventListener('click', () => {
    shutdownScreen.classList.add('hidden');
    updatingScreen.classList.remove('hidden');
    document.querySelector('.back-link').style.display = 'none';
    
    let prog = 0;
    setInterval(() => {
        if (prog < 99) {
            prog += Math.random() * 2;
            if (prog > 99) prog = 99;
            progressText.innerText = Math.floor(prog);
        }
    }, 2000);
});

btnLater.addEventListener('click', () => {
    spawnPopup();
    setInterval(spawnPopup, 1000); // Spawns infinitely
});

function spawnPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup';
    
    const x = Math.random() * (window.innerWidth - 250);
    const y = Math.random() * (window.innerHeight - 150);
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;

    const msg = absurdMessages[Math.floor(Math.random() * absurdMessages.length)];
    
    popup.innerHTML = `
        <div class="popup-header">
            <span>System Alert</span>
            <span class="popup-close">X</span>
        </div>
        <div class="popup-body">
            <p>${msg}</p>
            <button class="ok-btn">OK</button>
        </div>
    `;

    document.body.appendChild(popup);

    const closeHandlers = popup.querySelectorAll('.popup-close, .ok-btn');
    closeHandlers.forEach(el => {
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            // When closing, spawn two more!
            popup.remove();
            spawnPopup();
            spawnPopup();
        });
    });
}
