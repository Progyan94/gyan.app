const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const sounds = [
    { name: 'Zap', freq: 440, type: 'square', duration: 0.1, key: 'a', midiPitch: 'A4' },
    { name: 'Laser', freq: 880, type: 'sawtooth', duration: 0.2, slide: true, key: 's', midiPitch: 'A5' },
    { name: 'Boop', freq: 300, type: 'sine', duration: 0.15, key: 'd', midiPitch: 'D4' },
    { name: 'Growl', freq: 100, type: 'sawtooth', duration: 0.4, key: 'f', midiPitch: 'G2' },
    { name: 'Beep', freq: 1200, type: 'sine', duration: 0.1, key: 'g', midiPitch: 'D6' },
    { name: 'Buzzer', freq: 150, type: 'square', duration: 0.5, key: 'h', midiPitch: 'D3' },
    { name: 'Chime', freq: 1500, type: 'sine', duration: 0.6, fade: true, key: 'j', midiPitch: 'F6' },
    { name: 'Wobble', freq: 400, type: 'triangle', duration: 0.4, wobble: true, key: 'k', midiPitch: 'G4' },
    { name: 'Drop', freq: 800, type: 'sine', duration: 0.3, slideDown: true, key: 'l', midiPitch: 'G5' }
];

const grid = document.getElementById('sound-grid');
const recordBtn = document.getElementById('record-btn');
const downloadBtn = document.getElementById('download-btn');

let isRecording = false;
let startTime = 0;
let recordedNotes = [];

recordBtn.addEventListener('click', () => {
    isRecording = !isRecording;
    if (isRecording) {
        recordBtn.innerText = 'Stop Recording';
        recordBtn.style.backgroundColor = '#ff4757';
        downloadBtn.disabled = true;
        recordedNotes = [];
        if (audioCtx.state === 'suspended') audioCtx.resume();
        startTime = audioCtx.currentTime;
    } else {
        recordBtn.innerText = 'Record';
        recordBtn.style.backgroundColor = '';
        if (recordedNotes.length > 0) {
            downloadBtn.disabled = false;
        }
    }
});

downloadBtn.addEventListener('click', () => {
    if (recordedNotes.length === 0) return;

    const track = new MidiWriter.Track();
    let lastTime = 0;
    
    const BEAT_DURATION = 0.5; // seconds per beat at 120 BPM
    const TICKS_PER_BEAT = 128; // default in MidiWriterJS
    const SECONDS_TO_TICKS = TICKS_PER_BEAT / BEAT_DURATION;

    recordedNotes.forEach(note => {
        let waitTime = note.time - lastTime;
        let waitTicks = Math.round(waitTime * SECONDS_TO_TICKS);
        let durationTicks = Math.round(note.duration * SECONDS_TO_TICKS);
        
        track.addEvent(new MidiWriter.NoteEvent({
            pitch: [note.pitch],
            duration: 'T' + durationTicks,
            wait: 'T' + waitTicks
        }));
        
        lastTime = note.time;
    });

    const write = new MidiWriter.Writer(track);
    const dataUri = write.dataUri();
    
    const a = document.createElement('a');
    a.href = dataUri;
    a.download = 'soundboard_recording.mid';
    a.click();
});

function playSound(sound) {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    if (isRecording) {
        let timeOffset = audioCtx.currentTime - startTime;
        recordedNotes.push({
            pitch: sound.midiPitch,
            time: timeOffset,
            duration: sound.duration
        });
    }

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = sound.type;
    oscillator.frequency.setValueAtTime(sound.freq, audioCtx.currentTime);

    if (sound.slide) {
        oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + sound.duration);
    } else if (sound.slideDown) {
        oscillator.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + sound.duration);
    } else if (sound.wobble) {
        oscillator.frequency.setValueAtTime(sound.freq, audioCtx.currentTime);
        oscillator.frequency.linearRampToValueAtTime(sound.freq + 200, audioCtx.currentTime + sound.duration * 0.25);
        oscillator.frequency.linearRampToValueAtTime(sound.freq - 200, audioCtx.currentTime + sound.duration * 0.5);
        oscillator.frequency.linearRampToValueAtTime(sound.freq, audioCtx.currentTime + sound.duration * 0.75);
    }

    gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
    if (sound.fade || sound.slideDown) {
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + sound.duration);
    } else {
        gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime + sound.duration - 0.05);
        gainNode.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + sound.duration);
    }

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + sound.duration);
}

const keyMap = {};

sounds.forEach((sound, index) => {
    const btn = document.createElement('button');
    btn.className = `sound-btn color-${index % 9}`;
    
    btn.innerHTML = `${sound.name} <br><span>${sound.type}</span><br><span>[${sound.key.toUpperCase()}]</span>`;
    
    const trigger = () => {
        playSound(sound);
        btn.classList.add('playing');
        setTimeout(() => btn.classList.remove('playing'), sound.duration * 1000);
    };

    btn.addEventListener('mousedown', trigger);
    btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        trigger();
    });

    grid.appendChild(btn);
    keyMap[sound.key] = trigger;
});

document.addEventListener('keydown', (e) => {
    if (e.repeat) return; // Prevent repeated triggers for holding down
    const key = e.key.toLowerCase();
    if (keyMap[key]) {
        keyMap[key]();
    }
});
