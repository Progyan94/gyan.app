// main.js - Core functionality for the hub

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Like and Pin buttons into every card
    const cards = document.querySelectorAll('.card');
    
    // Load saved data
    const savedLikes = JSON.parse(localStorage.getItem('gyanLikes')) || {};
    const savedPins = JSON.parse(localStorage.getItem('gyanPins')) || {};

    cards.forEach((card, index) => {
        const cardId = card.id || `card-${index}`;
        card.id = cardId;
        
        card.style.position = 'relative';

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'card-actions';

        // Pin Button
        const pinBtn = document.createElement('button');
        pinBtn.className = `btn-icon pin-btn ${savedPins[cardId] ? 'active' : ''}`;
        pinBtn.innerHTML = savedPins[cardId] ? '⭐' : '☆';
        pinBtn.title = 'Pin to top';
        
        // Like Button
        const likeBtn = document.createElement('button');
        likeBtn.className = `btn-icon like-btn ${savedLikes[cardId] ? 'active' : ''}`;
        if (!card.dataset.likes) {
            card.dataset.likes = Math.floor(Math.random() * 500) + 10;
        }
        if (savedLikes[cardId]) {
            card.dataset.likes = parseInt(card.dataset.likes) + 1;
        }
        likeBtn.innerHTML = savedLikes[cardId] ? '❤️' : '🤍';
        likeBtn.title = 'Like this game';

        actionsDiv.appendChild(pinBtn);
        actionsDiv.appendChild(likeBtn);
        card.appendChild(actionsDiv);

        // Events
        pinBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (savedPins[cardId]) {
                delete savedPins[cardId];
                pinBtn.classList.remove('active');
                pinBtn.innerHTML = '☆';
            } else {
                savedPins[cardId] = true;
                pinBtn.classList.add('active');
                pinBtn.innerHTML = '⭐';
            }
            localStorage.setItem('gyanPins', JSON.stringify(savedPins));
            applyCurrentSort();
        });

        likeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (savedLikes[cardId]) {
                delete savedLikes[cardId];
                likeBtn.classList.remove('active');
                likeBtn.innerHTML = '🤍';
                card.dataset.likes = parseInt(card.dataset.likes) - 1;
            } else {
                savedLikes[cardId] = true;
                likeBtn.classList.add('active');
                likeBtn.innerHTML = '❤️';
                card.dataset.likes = parseInt(card.dataset.likes) + 1;
            }
            localStorage.setItem('gyanLikes', JSON.stringify(savedLikes));
            if(currentSortMode === 'likes') applyCurrentSort();
        });
    });

    // 2. Sorting and Category Tag Filtering Logic
    const grid = document.getElementById('gamesGrid');
    const searchInput = document.getElementById('searchInput');
    const sortDropdown = document.getElementById('sortDropdown');
    const categoryPills = document.querySelectorAll('.cat-pill');
    
    let cardsArray = Array.from(cards);
    
    // Auto-detect category tag if not explicitly set
    cardsArray.forEach((card, i) => {
        card.dataset.originalIndex = i;
        if (!card.dataset.category) {
            const href = card.getAttribute('href') || '';
            const title = (card.querySelector('h2')?.innerText || '').toLowerCase();
            if (href.includes('solar') || href.includes('periodic') || href.includes('universe') || href.includes('debris') || title.includes('solar') || title.includes('universe') || title.includes('science')) {
                card.dataset.category = 'space';
            } else if (href.includes('os') || href.includes('update') || href.includes('busy') || href.includes('wifi') || href.includes('sandbox') || href.includes('pet')) {
                card.dataset.category = 'simulation';
            } else if (href.includes('sand-mandala') || href.includes('pebble') || href.includes('cloud') || href.includes('sound-garden') || href.includes('letter')) {
                card.dataset.category = 'zen';
            } else if (href.includes('button') || href.includes('troll') || href.includes('excuse') || href.includes('chaos') || href.includes('conspiracy') || href.includes('shredder')) {
                card.dataset.category = 'troll';
            } else {
                card.dataset.category = 'puzzle';
            }
        }
    });

    let currentSortMode = 'newest';
    let currentCategory = 'all';

    function applyCurrentSort() {
        const query = searchInput.value.toLowerCase().trim();
        
        cardsArray.forEach(card => {
            const title = (card.querySelector('h2')?.innerText || '').toLowerCase();
            const desc = (card.querySelector('p')?.innerText || '').toLowerCase();
            const cat = card.dataset.category || '';
            
            const matchesQuery = !query || title.includes(query) || desc.includes(query) || cat.includes(query);
            const matchesCategory = (currentCategory === 'all') || (cat === currentCategory);

            if (matchesQuery && matchesCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        let visibleCards = cardsArray.filter(c => c.style.display !== 'none');
        
        visibleCards.sort((a, b) => {
            const aPinned = savedPins[a.id] ? 1 : 0;
            const bPinned = savedPins[b.id] ? 1 : 0;
            
            if (aPinned !== bPinned) return bPinned - aPinned;

            if (currentSortMode === 'newest') {
                return parseInt(b.dataset.originalIndex) - parseInt(a.dataset.originalIndex);
            } else if (currentSortMode === 'oldest') {
                return parseInt(a.dataset.originalIndex) - parseInt(b.dataset.originalIndex);
            } else if (currentSortMode === 'az') {
                return a.querySelector('h2').innerText.localeCompare(b.querySelector('h2').innerText);
            } else if (currentSortMode === 'za') {
                return b.querySelector('h2').innerText.localeCompare(a.querySelector('h2').innerText);
            } else if (currentSortMode === 'likes') {
                return parseInt(b.dataset.likes) - parseInt(a.dataset.likes);
            } else if (currentSortMode === 'picks') {
                return Math.random() - 0.5;
            }
            return 0;
        });

        grid.innerHTML = '';
        visibleCards.forEach(c => grid.appendChild(c));
    }

    searchInput.addEventListener('input', applyCurrentSort);

    // Category Tag Click Handling
    categoryPills.forEach(pill => {
        pill.addEventListener('click', () => {
            categoryPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentCategory = pill.dataset.category;
            applyCurrentSort();
        });
    });

    sortDropdown.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            currentSortMode = e.target.dataset.sort;
            applyCurrentSort();
        }
    });

    applyCurrentSort();

    // 3. Global Procedural Web Audio Lo-Fi Synth Soundscape
    const lofiBtn = document.getElementById('lofiBtn');
    let audioCtx = null;
    let isLofiPlaying = false;
    let lofiInterval = null;

    const chordFrequencies = [
        [196.00, 246.94, 293.66, 392.00], // G major 7
        [164.81, 196.00, 246.94, 329.63], // E minor 7
        [174.61, 220.00, 261.63, 349.23], // F major 7
        [146.83, 174.61, 220.00, 293.66]  // D minor 7
    ];

    function startLofiSynth() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        let chordIndex = 0;

        function playAmbientPad() {
            if (!isLofiPlaying || !audioCtx) return;
            const chord = chordFrequencies[chordIndex % chordFrequencies.length];
            chordIndex++;

            chord.forEach((freq, i) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                const filter = audioCtx.createBiquadFilter();

                filter.type = 'lowpass';
                filter.frequency.setValueAtTime(650 + Math.sin(audioCtx.currentTime) * 150, audioCtx.currentTime);

                osc.type = i % 2 === 0 ? 'sine' : 'triangle';
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                osc.detune.setValueAtTime((Math.random() - 0.5) * 12, audioCtx.currentTime);

                const now = audioCtx.currentTime;
                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(0.04, now + 1.8);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.8);

                osc.connect(filter);
                filter.connect(gain);
                gain.connect(audioCtx.destination);

                osc.start(now);
                osc.stop(now + 5.0);
            });
        }

        playAmbientPad();
        lofiInterval = setInterval(playAmbientPad, 4500);
    }

    function stopLofiSynth() {
        if (lofiInterval) {
            clearInterval(lofiInterval);
            lofiInterval = null;
        }
    }

    if (lofiBtn) {
        lofiBtn.addEventListener('click', () => {
            isLofiPlaying = !isLofiPlaying;
            if (isLofiPlaying) {
                startLofiSynth();
                lofiBtn.innerText = '🎧 Lo-Fi Synth: ON';
                lofiBtn.classList.add('active');
            } else {
                stopLofiSynth();
                lofiBtn.innerText = '🎧 Lo-Fi Synth: OFF';
                lofiBtn.classList.remove('active');
            }
        });
    }

    // 4. PWA Service Worker Registration & Installation Prompt
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js').then((reg) => {
                console.log('PWA ServiceWorker registered:', reg.scope);
            }).catch((err) => {
                console.log('PWA ServiceWorker registration failed:', err);
            });
        });
    }

    let deferredPrompt;
    const pwaInstallBtn = document.getElementById('pwaInstallBtn');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        if (pwaInstallBtn) {
            pwaInstallBtn.classList.remove('hidden');
        }
    });

    if (pwaInstallBtn) {
        pwaInstallBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    pwaInstallBtn.classList.add('hidden');
                }
                deferredPrompt = null;
            }
        });
    }

    window.addEventListener('appinstalled', () => {
        if (pwaInstallBtn) pwaInstallBtn.classList.add('hidden');
        console.log('Gyan Hub PWA installed successfully!');
    });

    // 5. Native Downloads Modal (Android APK, Windows EXE, Mac DMG, Linux AppImage)
    const downloadAppsBtn = document.getElementById('downloadAppsBtn');
    const downloadsModal = document.getElementById('downloadsModal');
    const closeDownloadsModal = document.getElementById('closeDownloadsModal');

    if (downloadAppsBtn && downloadsModal) {
        downloadAppsBtn.addEventListener('click', () => {
            downloadsModal.classList.remove('hidden');
        });
    }

    if (closeDownloadsModal && downloadsModal) {
        closeDownloadsModal.addEventListener('click', () => {
            downloadsModal.classList.add('hidden');
        });
    }

    if (downloadsModal) {
        downloadsModal.addEventListener('click', (e) => {
            if (e.target === downloadsModal) {
                downloadsModal.classList.add('hidden');
            }
        });
    }
});
