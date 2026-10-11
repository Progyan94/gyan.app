const container = document.getElementById('wrap-container');
const resetBtn = document.getElementById('reset-btn');

// Audio Context setup
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
}

function playPopSound() {
    if (!audioCtx) return;
    
    // Create an oscillator for a short "pop" sound
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    // Pop sound envelope
    const now = audioCtx.currentTime;
    
    // Rapid pitch drop
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, now);
    oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.05);
    
    // Quick attack and decay
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(1, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    oscillator.start(now);
    oscillator.stop(now + 0.1);
}

function createSheet() {
    container.innerHTML = '';
    // Calculate how many bubbles we can fit roughly
    // Assuming 800px max width / 70px per column ~ 11 cols
    // Let's just make a grid of a fixed number for simplicity, or based on screen size
    const screenWidth = Math.min(window.innerWidth * 0.9, 800);
    const cols = Math.floor(screenWidth / 70);
    const rows = 6;
    const totalBubbles = cols * rows;
    
    for (let i = 0; i < totalBubbles; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        bubble.addEventListener('click', () => {
            if (!bubble.classList.contains('popped')) {
                initAudio();
                playPopSound();
                bubble.classList.add('popped');
                
                // Add a little random rotation for variety
                const rotation = Math.random() * 360;
                bubble.style.transform = `rotate(${rotation}deg)`;
            }
        });
        
        container.appendChild(bubble);
    }
}

resetBtn.addEventListener('click', createSheet);
window.addEventListener('resize', createSheet); // Recreate grid on resize

// Initial creation
createSheet();

// Initialize audio context on first click anywhere (browser policy)
document.body.addEventListener('click', initAudio, { once: true });
