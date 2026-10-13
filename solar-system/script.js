// Solar System Scope Web - Core Astronomical Physics & Simulation Engine
// Realistic 3D WebGL (Three.js) & 2D Vector Orrery with 101 celestial bodies, search, & mobile-optimized touch controls

// -------------------------------------------------------------
// 1. CELESTIAL DATA VALIDATION & FALLBACK
// -------------------------------------------------------------
// CELESTIAL_DATA is loaded globally from celestial-data.js (101 verified entities)
if (typeof CELESTIAL_DATA === 'undefined' || !Array.isArray(CELESTIAL_DATA) || CELESTIAL_DATA.length === 0) {
    console.warn("CELESTIAL_DATA not found in global scope, initializing fallback system...");
    window.CELESTIAL_DATA = [
        {
            id: "Sun", name: "Sun (Sol)", cat: "STAR", tagline: "The Heart of the Solar System",
            radiusKm: 696340, sizeScale: 18.0, distAU: 0, orbitRadius: 0, periodDays: 0, rotationHours: 609.12,
            color: 0xffaa00, colorHex: "#ffaa00", tilt: 7.25, temp: "5,500 °C", moons: 0, day: "25.38 Days",
            desc: "Yellow dwarf star containing 99.86% of the solar system mass."
        },
        {
            id: "Earth", name: "Earth", cat: "PLANET", tagline: "The Blue Oasis of Life",
            radiusKm: 6371.0, sizeScale: 3.4, distAU: 1.0, orbitRadius: 58, periodDays: 365.25, rotationHours: 23.93,
            color: 0x38bdf8, colorHex: "#38bdf8", tilt: 23.44, temp: "-88 °C to 58 °C", moons: 1, day: "23h 56m",
            desc: "Only known harbor of biological life."
        }
    ];
}

// -------------------------------------------------------------
// 2. SIMULATION STATE & CONTROLLERS
// -------------------------------------------------------------
let simMode = '3D'; // '3D' or '2D'
let showOrbits = true;
let showLabels = true;
let isPlaying = true;
let timeMultiplier = 1.0; // 1 unit = 1 day per real second
let simDate = new Date();
let selectedTarget = CELESTIAL_DATA[0]; // Start at Sun
let cameraFocusedTarget = null;
let hudVisible = true;

// Three.js Scene State
let scene, camera, renderer, cameraLight;
let celestialMeshes = {};
let orbitLines = [];
let starfield;
let asteroidBeltParticles;
let raycaster, mouse;
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let cameraDistance = 380;
let cameraRotX = 0.45;
let cameraRotY = 0.35;

// Touch State
let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;
let touchStartDist = 0;

// 2D Orrery State
let canvas2D, ctx2D;
let pan2D = { x: 0, y: 0 };
let zoom2D = 1.0;
let isDragging2D = false;
let startDrag2D = { x: 0, y: 0 };

// -------------------------------------------------------------
// 3. INITIALIZATION
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    initUI();
    initThreeJS();
    init2DOrrery();
    setupSearch();
    selectTarget(CELESTIAL_DATA[0], false); // Focus Sun on start without popping card over mobile
    animateLoop();

    // Ensure responsive dimensions across mobile viewports & address bars
    setTimeout(() => {
        onWindowResize();
        resize2D();
    }, 150);
});

// -------------------------------------------------------------
// 4. UI INTERACTION SETUP
// -------------------------------------------------------------
function initUI() {
    const btn3D = document.getElementById('toggle3D');
    const btn2D = document.getElementById('toggle2D');
    const mount3D = document.getElementById('webgl-canvas-mount');
    const mount2D = document.getElementById('orrery2d-canvas');

    btn3D.addEventListener('click', () => {
        simMode = '3D';
        btn3D.classList.add('active');
        btn2D.classList.remove('active');
        mount3D.classList.remove('hidden');
        mount2D.classList.add('hidden');
        onWindowResize();
    });

    btn2D.addEventListener('click', () => {
        simMode = '2D';
        btn2D.classList.add('active');
        btn3D.classList.remove('active');
        mount2D.classList.remove('hidden');
        mount3D.classList.add('hidden');
        resize2D();
    });

    // Orbit & Label Toggles
    const btnOrbits = document.getElementById('toggleOrbits');
    btnOrbits.addEventListener('click', () => {
        showOrbits = !showOrbits;
        btnOrbits.classList.toggle('active', showOrbits);
        btnOrbits.textContent = `🪐 ORBITS: ${showOrbits ? 'ON' : 'OFF'}`;
        orbitLines.forEach(l => l.visible = showOrbits);
        if (asteroidBeltParticles) asteroidBeltParticles.visible = showOrbits;
    });

    const btnLabels = document.getElementById('toggleLabels');
    btnLabels.addEventListener('click', () => {
        showLabels = !showLabels;
        btnLabels.classList.toggle('active', showLabels);
        btnLabels.textContent = `🏷️ LABELS: ${showLabels ? 'ON' : 'OFF'}`;
    });

    // Reset Camera
    document.getElementById('resetCamBtn').addEventListener('click', () => {
        cameraFocusedTarget = null;
        const aspect = (window.innerWidth || 800) / (window.innerHeight || 600);
        cameraDistance = aspect < 1.0 ? Math.max(380, 260 / aspect) : 380;
        cameraRotX = 0.45;
        cameraRotY = 0.35;
        pan2D = { x: 0, y: 0 };
        zoom2D = 1.0;
        selectTarget(CELESTIAL_DATA[0], false);
    });

    // Info Card Toggle & Close
    const toggleInfoBtn = document.getElementById('toggleInfoBtn');
    if (toggleInfoBtn) {
        toggleInfoBtn.addEventListener('click', () => {
            const card = document.getElementById('celestial-card');
            card.classList.toggle('hidden');
        });
    }

    document.getElementById('closeCardBtn').addEventListener('click', () => {
        document.getElementById('celestial-card').classList.add('hidden');
    });

    // Mobile Sheet Handle tap
    const sheetHandleBar = document.getElementById('sheetHandleBar');
    if (sheetHandleBar) {
        sheetHandleBar.addEventListener('click', () => {
            document.getElementById('celestial-card').classList.add('hidden');
        });
    }

    // Toggle HUD (Full Immersion View)
    const toggleHudBtn = document.getElementById('toggleHudBtn');
    if (toggleHudBtn) {
        toggleHudBtn.addEventListener('click', () => {
            hudVisible = !hudVisible;
            document.getElementById('hudTop').classList.toggle('minimized', !hudVisible);
            document.getElementById('hudBottom').classList.toggle('minimized', !hudVisible);
            toggleHudBtn.textContent = hudVisible ? '👁️' : '🔭';
        });
    }

    // Card Actions
    document.getElementById('focusTargetBtn').addEventListener('click', () => {
        if (selectedTarget) {
            cameraFocusedTarget = selectedTarget;
            cameraDistance = Math.max(selectedTarget.sizeScale * 5.5, 20);
        }
    });

    document.getElementById('visitSurfaceBtn').addEventListener('click', () => {
        if (selectedTarget) {
            cameraFocusedTarget = selectedTarget;
            cameraDistance = Math.max(selectedTarget.sizeScale * 2.8, 12);
        }
    });

    // Quick Jump Celestial Dock
    document.querySelectorAll('.jump-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const target = CELESTIAL_DATA.find(t => t.id.toLowerCase() === targetId.toLowerCase());
            if (target) {
                document.querySelectorAll('.jump-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectTarget(target, window.innerWidth > 768); // Don't block screen on mobile
                cameraFocusedTarget = target;
                cameraDistance = Math.max(target.sizeScale * 5.5, 25);
            }
        });
    });

    // Timeline Controls
    const playPauseBtn = document.getElementById('timePlayPause');
    playPauseBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playPauseBtn.textContent = isPlaying ? '⏸' : '▶';
        playPauseBtn.classList.toggle('play-active', isPlaying);
    });

    document.getElementById('timeReverse').addEventListener('click', () => {
        timeMultiplier = -Math.abs(timeMultiplier || 1);
        updateSpeedUI();
    });

    document.getElementById('timeForward').addEventListener('click', () => {
        timeMultiplier = Math.abs(timeMultiplier || 1) * 2;
        if (timeMultiplier > 100) timeMultiplier = 100;
        updateSpeedUI();
    });

    document.getElementById('timeStepBack').addEventListener('click', () => {
        simDate.setDate(simDate.getDate() - 1);
        updateDateDisplay();
    });

    document.getElementById('timeStepForward').addEventListener('click', () => {
        simDate.setDate(simDate.getDate() + 1);
        updateDateDisplay();
    });

    document.getElementById('timeNow').addEventListener('click', () => {
        simDate = new Date();
        timeMultiplier = 1.0;
        updateSpeedUI();
        updateDateDisplay();
    });

    const speedSlider = document.getElementById('timeSpeedSlider');
    speedSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        timeMultiplier = val === 0 ? 0 : Math.sign(val) * Math.pow(Math.abs(val), 2);
        updateSpeedUI();
    });
}

function updateSpeedUI() {
    const text = document.getElementById('speedMultiplierText');
    const speed = timeMultiplier.toFixed(1);
    text.textContent = `${speed}x (${speed} D/s)`;
}

function updateDateDisplay() {
    const display = document.getElementById('currentDateDisplay');
    display.textContent = simDate.toISOString().substring(0, 10) + ' UTC';
}

// -------------------------------------------------------------
// 5. COMPREHENSIVE SEARCH ENGINE (101 Bodies)
// -------------------------------------------------------------
function setupSearch() {
    const searchInput = document.getElementById('targetSearch');
    const resultsBox = document.getElementById('searchResults');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (!query) {
            resultsBox.classList.add('hidden');
            return;
        }

        const matches = CELESTIAL_DATA.filter(item => 
            item.name.toLowerCase().includes(query) ||
            item.cat.toLowerCase().includes(query) ||
            item.tagline.toLowerCase().includes(query) ||
            (item.parent && item.parent.toLowerCase().includes(query)) ||
            item.desc.toLowerCase().includes(query)
        ).slice(0, 15); // Top 15 matches

        resultsBox.innerHTML = '';
        if (matches.length === 0) {
            resultsBox.innerHTML = '<div class="search-result-item" style="color:#94a3b8">No celestial bodies found</div>';
        } else {
            matches.forEach(item => {
                const row = document.createElement('div');
                row.className = 'search-result-item';
                const parentInfo = item.parent ? `<span class="result-parent">(${item.parent})</span>` : '';
                row.innerHTML = `
                    <div>
                        <span class="result-name">${item.name}</span>
                        ${parentInfo}
                    </div>
                    <span class="result-type">${item.cat}</span>
                `;
                row.onclick = () => {
                    selectTarget(item, true);
                    cameraFocusedTarget = item;
                    cameraDistance = Math.max(item.sizeScale * 5.5, 25);
                    resultsBox.classList.add('hidden');
                    searchInput.value = '';
                };
                resultsBox.appendChild(row);
            });
        }
        resultsBox.classList.remove('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box')) {
            resultsBox.classList.add('hidden');
        }
    });
}

// -------------------------------------------------------------
// 6. THREE.JS 3D SCENE SETUP & VIBRANT LIGHTING
// -------------------------------------------------------------
function initThreeJS() {
    const container = document.getElementById('webgl-canvas-mount');
    const width = Math.max(container.clientWidth || 0, window.innerWidth || 800);
    const height = Math.max(container.clientHeight || 0, window.innerHeight || 600);

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.00035);

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 8000);
    const aspect = width / height;
    cameraDistance = aspect < 1.0 ? Math.max(380, 260 / aspect) : 380;
    camera.position.set(0, 180, cameraDistance);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Vibrant Multi-Source Space Lighting (ensures models are ALWAYS visible)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x1e1b4b, 0.6);
    scene.add(hemiLight);

    // Sun Point Light
    const sunLight = new THREE.PointLight(0xfff8ee, 2.5, 5000, 0);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // Headlight attached to camera
    cameraLight = new THREE.DirectionalLight(0xffffff, 0.45);
    camera.add(cameraLight);
    scene.add(camera);

    buildStarfield();
    buildAsteroidBelt();
    buildSolarSystem3D();

    window.addEventListener('resize', onWindowResize);
    setup3DControls(container);
}

// Procedural 3D Starfield
function buildStarfield() {
    const starsCount = 4500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starsCount * 3);
    const colors = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
        const r = 1600 + Math.random() * 900;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i] = r * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = r * Math.cos(phi);

        const v = Math.random();
        if (v < 0.6) {
            colors[i] = 1.0; colors[i + 1] = 1.0; colors[i + 2] = 1.0;
        } else if (v < 0.8) {
            colors[i] = 0.65; colors[i + 1] = 0.85; colors[i + 2] = 1.0; // Cyan-white
        } else {
            colors[i] = 1.0; colors[i + 1] = 0.85; colors[i + 2] = 0.6; // Amber
        }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 2.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.85
    });

    starfield = new THREE.Points(geometry, material);
    scene.add(starfield);
}

// Visual Main Asteroid Belt (between Mars and Jupiter)
function buildAsteroidBelt() {
    const beltCount = 1800;
    const geom = new THREE.BufferGeometry();
    const pos = new Float32Array(beltCount * 3);

    for (let i = 0; i < beltCount * 3; i += 3) {
        const r = 88 + Math.random() * 22; // Orbit radius between Mars & Jupiter
        const theta = Math.random() * Math.PI * 2;
        const yOffset = (Math.random() - 0.5) * 5.0;

        pos[i] = r * Math.cos(theta);
        pos[i + 1] = yOffset;
        pos[i + 2] = r * Math.sin(theta);
    }

    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
        color: 0x94a3b8,
        size: 1.4,
        transparent: true,
        opacity: 0.45
    });

    asteroidBeltParticles = new THREE.Points(geom, mat);
    scene.add(asteroidBeltParticles);
}

// Build 101 Celestial Bodies, Rings, and Comets in 3D
function buildSolarSystem3D() {
    CELESTIAL_DATA.forEach(data => {
        const group = new THREE.Group();
        group.userData = data;

        let geom;
        let mat;

        if (data.id === "Sun") {
            geom = new THREE.SphereGeometry(data.sizeScale, 48, 48);
            mat = new THREE.MeshBasicMaterial({ color: data.color });

            // Glowing Corona Sphere
            const coronaGeom = new THREE.SphereGeometry(data.sizeScale * 1.25, 32, 32);
            const coronaMat = new THREE.MeshBasicMaterial({
                color: 0xffdd44,
                transparent: true,
                opacity: 0.35,
                side: THREE.BackSide
            });
            const corona = new THREE.Mesh(coronaGeom, coronaMat);
            group.add(corona);
        } else {
            if (data.textureType === 'elongated' || data.id === 'Oumuamua') {
                geom = new THREE.CylinderGeometry(data.sizeScale * 0.35, data.sizeScale * 0.45, data.sizeScale * 2.8, 16);
            } else if (data.cat === 'ASTEROID' && data.radiusKm < 40) {
                geom = new THREE.DodecahedronGeometry(data.sizeScale, 1);
            } else {
                geom = new THREE.SphereGeometry(data.sizeScale, 28, 28);
            }

            // Material with vibrant emissive tint so bodies are NEVER dark or hidden
            mat = new THREE.MeshStandardMaterial({
                color: data.color,
                roughness: 0.65,
                metalness: 0.15,
                emissive: data.color,
                emissiveIntensity: 0.18
            });
        }

        const mesh = new THREE.Mesh(geom, mat);
        mesh.userData = data;
        group.add(mesh);

        // Planetary Rings (Saturn, Uranus, Haumea)
        if (data.hasRings || data.id === 'Saturn' || data.id === 'Uranus' || data.id === 'Haumea') {
            const innerR = data.sizeScale * (data.id === 'Saturn' ? 1.4 : 1.2);
            const outerR = data.sizeScale * (data.id === 'Saturn' ? 2.4 : 1.6);
            const ringGeom = new THREE.RingGeometry(innerR, outerR, 48);
            const ringColor = data.id === 'Saturn' ? 0xd97706 : (data.id === 'Uranus' ? 0x67e8f9 : 0x94a3b8);
            const ringMat = new THREE.MeshStandardMaterial({
                color: ringColor,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.75,
                emissive: ringColor,
                emissiveIntensity: 0.2
            });
            const rings = new THREE.Mesh(ringGeom, ringMat);
            rings.rotation.x = Math.PI / 2 + (data.tilt ? (data.tilt * Math.PI / 180) : 0.4);
            group.add(rings);
        }

        // Comet Tail (Conical Particle Ion Tail)
        if (data.hasTail || data.cat === 'COMET') {
            const tailLen = Math.max(data.sizeScale * 12, 18);
            const tailGeom = new THREE.ConeGeometry(data.sizeScale * 1.5, tailLen, 16);
            const tailMat = new THREE.MeshBasicMaterial({
                color: data.colorHex ? parseInt(data.colorHex.replace('#', '0x')) : 0x38bdf8,
                transparent: true,
                opacity: 0.5
            });
            const tail = new THREE.Mesh(tailGeom, tailMat);
            tail.rotation.z = Math.PI / 2;
            tail.position.x = -tailLen / 2;
            group.add(tail);
        }

        scene.add(group);
        celestialMeshes[data.id] = { group, mesh, data };

        // Orbit Line for Sun-orbiting major bodies
        if (data.orbitRadius > 0 && !data.parent) {
            const orbitGeom = new THREE.BufferGeometry();
            const points = [];
            const segments = 128;
            const ecc = data.eccentricity || 0;
            const tiltRad = ((data.tilt || 0) * Math.PI) / 180;
            for (let i = 0; i <= segments; i++) {
                const theta = (i / segments) * Math.PI * 2;
                const r = ecc ? data.orbitRadius * (1 - ecc * 0.35 * Math.cos(theta)) : data.orbitRadius;
                const ox = r * Math.cos(theta);
                const oz = r * Math.sin(theta);
                const oy = Math.sin(tiltRad) * (r * 0.2) * Math.sin(theta);
                points.push(new THREE.Vector3(ox, oy, oz));
            }
            orbitGeom.setFromPoints(points);

            const orbitMat = new THREE.LineBasicMaterial({
                color: data.color,
                transparent: true,
                opacity: data.cat === 'PLANET' ? 0.35 : (data.cat === 'DWARF PLANET' ? 0.25 : 0.15)
            });
            const orbitLine = new THREE.Line(orbitGeom, orbitMat);
            scene.add(orbitLine);
            orbitLines.push(orbitLine);
        }
    });
}

// -------------------------------------------------------------
// 7. TOUCH & MOUSE 3D ORBIT CONTROLS
// -------------------------------------------------------------
function setup3DControls(container) {
    // Mouse Drag
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    container.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;

            cameraRotY -= deltaX * 0.005;
            cameraRotX = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, cameraRotX + deltaY * 0.005));

            previousMousePosition = { x: e.clientX, y: e.clientY };
        }

        const rect = container.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    });

    // Mouse Zoom
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        cameraDistance = Math.max(10, Math.min(950, cameraDistance + e.deltaY * 0.3));
    }, { passive: false });

    // Mouse Click to Select
    container.addEventListener('click', (e) => {
        handleRaycastSelect(e.clientX, e.clientY);
    });

    // Mobile Touch Controls (Single-touch rotate, double-touch pinch zoom, tap select)
    container.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDragging = true;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
            previousMousePosition = { x: touchStartX, y: touchStartY };
        } else if (e.touches.length === 2) {
            isDragging = false;
            touchStartDist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
        }
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1 && isDragging) {
            const deltaX = e.touches[0].clientX - previousMousePosition.x;
            const deltaY = e.touches[0].clientY - previousMousePosition.y;

            cameraRotY -= deltaX * 0.005;
            cameraRotX = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, cameraRotX + deltaY * 0.005));

            previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else if (e.touches.length === 2) {
            const dist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            const delta = touchStartDist - dist;
            cameraDistance = Math.max(10, Math.min(950, cameraDistance + delta * 0.5));
            touchStartDist = dist;
        }
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
        isDragging = false;
        const duration = Date.now() - touchStartTime;
        if (e.changedTouches.length === 1 && duration < 320) {
            const touch = e.changedTouches[0];
            const moveDist = Math.hypot(touch.clientX - touchStartX, touch.clientY - touchStartY);
            if (moveDist < 12) {
                handleRaycastSelect(touch.clientX, touch.clientY);
            }
        }
    });
}

function handleRaycastSelect(clientX, clientY) {
    const container = document.getElementById('webgl-canvas-mount');
    const rect = container.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera({ x, y }, camera);

    const hitMeshes = Object.values(celestialMeshes).map(m => m.mesh);
    const intersects = raycaster.intersectObjects(hitMeshes, true);

    if (intersects.length > 0) {
        let obj = intersects[0].object;
        while (obj && !obj.userData?.id) {
            obj = obj.parent;
        }
        if (obj && obj.userData) {
            selectTarget(obj.userData, true);
        }
    }
}

function onWindowResize() {
    const container = document.getElementById('webgl-canvas-mount');
    const width = Math.max(container.clientWidth || 0, window.innerWidth || 800);
    const height = Math.max(container.clientHeight || 0, window.innerHeight || 600);

    const aspect = width / height;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

    // If mobile portrait, expand camera distance so the full system is in view
    if (!cameraFocusedTarget && aspect < 1.0) {
        cameraDistance = Math.max(380, 260 / aspect);
    }
}

// -------------------------------------------------------------
// 8. 2D ORRERY VECTOR ENGINE
// -------------------------------------------------------------
function init2DOrrery() {
    canvas2D = document.getElementById('orrery2d-canvas');
    ctx2D = canvas2D.getContext('2d');
    resize2D();

    window.addEventListener('resize', resize2D);

    canvas2D.addEventListener('mousedown', (e) => {
        isDragging2D = true;
        startDrag2D = { x: e.clientX - pan2D.x, y: e.clientY - pan2D.y };
    });

    window.addEventListener('mouseup', () => { isDragging2D = false; });

    canvas2D.addEventListener('mousemove', (e) => {
        if (isDragging2D) {
            pan2D.x = e.clientX - startDrag2D.x;
            pan2D.y = e.clientY - startDrag2D.y;
        }
    });

    canvas2D.addEventListener('wheel', (e) => {
        e.preventDefault();
        const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
        zoom2D = Math.max(0.2, Math.min(8.0, zoom2D * zoomFactor));
    }, { passive: false });

    // Touch for 2D
    let touch2DStart = { x: 0, y: 0 };
    canvas2D.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDragging2D = true;
            touch2DStart = { x: e.touches[0].clientX - pan2D.x, y: e.touches[0].clientY - pan2D.y };
        }
    }, { passive: true });

    canvas2D.addEventListener('touchmove', (e) => {
        if (isDragging2D && e.touches.length === 1) {
            pan2D.x = e.touches[0].clientX - touch2DStart.x;
            pan2D.y = e.touches[0].clientY - touch2DStart.y;
        }
    }, { passive: true });

    canvas2D.addEventListener('touchend', () => { isDragging2D = false; });

    // 2D Click selection
    canvas2D.addEventListener('click', (e) => {
        const rect = canvas2D.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        const centerX = canvas2D.width / 2 + pan2D.x;
        const centerY = canvas2D.height / 2 + pan2D.y;

        CELESTIAL_DATA.forEach(data => {
            const pos = getCelestialCoords(data);
            const screenX = centerX + pos.x * zoom2D * 1.5;
            const screenY = centerY + pos.z * zoom2D * 1.5;
            const radius = Math.max(data.sizeScale * zoom2D * 0.8, 8);

            const dist = Math.hypot(clickX - screenX, clickY - screenY);
            if (dist <= radius + 6) {
                selectTarget(data, true);
            }
        });
    });
}

function resize2D() {
    if (!canvas2D) return;
    canvas2D.width = window.innerWidth;
    canvas2D.height = window.innerHeight;
}

// Render 2D Vector Orrery cleanly for 101 bodies
function render2DOrrery() {
    if (simMode !== '2D') return;

    ctx2D.clearRect(0, 0, canvas2D.width, canvas2D.height);

    const grad = ctx2D.createRadialGradient(
        canvas2D.width / 2, canvas2D.height / 2, 50,
        canvas2D.width / 2, canvas2D.height / 2, canvas2D.width
    );
    grad.addColorStop(0, '#0a0f1d');
    grad.addColorStop(1, '#020617');
    ctx2D.fillStyle = grad;
    ctx2D.fillRect(0, 0, canvas2D.width, canvas2D.height);

    const centerX = canvas2D.width / 2 + pan2D.x;
    const centerY = canvas2D.height / 2 + pan2D.y;

    // Draw Asteroid Belt ring
    if (showOrbits) {
        ctx2D.beginPath();
        ctx2D.arc(centerX, centerY, 98 * zoom2D * 1.5, 0, Math.PI * 2);
        ctx2D.strokeStyle = 'rgba(148, 163, 184, 0.12)';
        ctx2D.lineWidth = 14 * zoom2D;
        ctx2D.stroke();
    }

    // Draw Primary Orbits
    if (showOrbits) {
        CELESTIAL_DATA.forEach(data => {
            if (data.orbitRadius > 0 && !data.parent) {
                const r = data.orbitRadius * zoom2D * 1.5;
                ctx2D.beginPath();
                ctx2D.arc(centerX, centerY, r, 0, Math.PI * 2);
                ctx2D.strokeStyle = data.cat === 'PLANET' ? 'rgba(56, 189, 248, 0.22)' : 'rgba(56, 189, 248, 0.1)';
                ctx2D.lineWidth = 1;
                ctx2D.stroke();
            }
        });
    }

    // Draw Bodies
    CELESTIAL_DATA.forEach(data => {
        const pos = getCelestialCoords(data);
        const screenX = centerX + pos.x * zoom2D * 1.5;
        const screenY = centerY + pos.z * zoom2D * 1.5;
        const radius = Math.max(data.sizeScale * zoom2D * 0.7, data.cat === 'MOON' || data.cat === 'ASTEROID' ? 3 : 4.5);

        // Core glow
        ctx2D.beginPath();
        ctx2D.arc(screenX, screenY, radius + 3, 0, Math.PI * 2);
        ctx2D.fillStyle = `${data.colorHex}44`;
        ctx2D.fill();

        // Core body
        ctx2D.beginPath();
        ctx2D.arc(screenX, screenY, radius, 0, Math.PI * 2);
        ctx2D.fillStyle = data.colorHex;
        ctx2D.fill();

        // Selected halo
        if (selectedTarget && selectedTarget.id === data.id) {
            ctx2D.beginPath();
            ctx2D.arc(screenX, screenY, radius + 7, 0, Math.PI * 2);
            ctx2D.strokeStyle = '#38bdf8';
            ctx2D.lineWidth = 2;
            ctx2D.setLineDash([4, 4]);
            ctx2D.stroke();
            ctx2D.setLineDash([]);
        }

        // Clean label filtering (prevents visual clutter with 101 bodies)
        const isPrimary = data.cat === 'STAR' || data.cat === 'PLANET' || data.cat === 'DWARF PLANET';
        const isSelected = selectedTarget && selectedTarget.id === data.id;
        const shouldShowLabel = showLabels && (isPrimary || isSelected || zoom2D > 2.2);

        if (shouldShowLabel) {
            ctx2D.font = isSelected ? '700 13px "Rajdhani", sans-serif' : '600 11px "Rajdhani", sans-serif';
            ctx2D.fillStyle = isSelected ? '#38bdf8' : '#e2e8f0';
            ctx2D.fillText(data.name, screenX + radius + 5, screenY + 4);
        }
    });
}

// -------------------------------------------------------------
// 9. ORBITAL MECHANICS & SCIENTIFIC MATH
// -------------------------------------------------------------
function getCelestialCoords(data) {
    if (!data || data.orbitRadius === 0) return { x: 0, y: 0, z: 0 };

    const epoch = new Date('2026-01-01T00:00:00Z').getTime();
    const currentMs = simDate.getTime();
    const daysElapsed = (currentMs - epoch) / (1000 * 60 * 60 * 24);

    const period = data.periodDays || 365.25;
    const angle = (daysElapsed / period) * Math.PI * 2;

    // Hierarchical Moon Orbit around Parent Planet
    if (data.parent) {
        const parentData = CELESTIAL_DATA.find(d => d.id === data.parent);
        if (!parentData) return { x: 0, y: 0, z: 0 };
        const parentPos = getCelestialCoords(parentData);
        const moonSpeed = (daysElapsed / Math.max(data.periodDays || 27.3, 0.4)) * Math.PI * 2;
        const moonX = parentPos.x + data.orbitRadius * Math.cos(moonSpeed);
        const moonZ = parentPos.z + data.orbitRadius * Math.sin(moonSpeed);
        const moonY = (data.tilt ? Math.sin((data.tilt * Math.PI) / 180) * (data.orbitRadius * 0.25) * Math.sin(moonSpeed) : 0);
        return { x: moonX, y: moonY, z: moonZ };
    }

    // Solar Orbit with Eccentricity and Inclination Tilt
    const ecc = data.eccentricity || 0;
    const r = ecc ? data.orbitRadius * (1 - ecc * 0.35 * Math.cos(angle)) : data.orbitRadius;
    const tiltRad = ((data.tilt || 0) * Math.PI) / 180;
    const x = r * Math.cos(angle);
    const z = r * Math.sin(angle);
    const y = Math.sin(tiltRad) * (r * 0.2) * Math.sin(angle);

    return { x, y, z };
}

// -------------------------------------------------------------
// 10. TARGET SELECTION & METRICS CARD
// -------------------------------------------------------------
function selectTarget(data, openCard = true) {
    if (!data) return;
    selectedTarget = data;

    document.getElementById('cardCat').textContent = data.cat;
    document.getElementById('cardName').textContent = data.name.toUpperCase();
    document.getElementById('cardTagline').textContent = data.tagline || '';

    const parentTag = document.getElementById('cardParent');
    if (data.parent) {
        parentTag.textContent = `HOST: ${data.parent.toUpperCase()}`;
        parentTag.classList.remove('hidden');
    } else {
        parentTag.classList.add('hidden');
    }

    document.getElementById('cardDist').textContent = data.distAU ? `${data.distAU} AU` : (data.parent ? `${data.orbitRadius} Radii` : '0 AU (Sol)');
    document.getElementById('cardRadius').textContent = `${data.radiusKm.toLocaleString()} km`;
    document.getElementById('cardPeriod').textContent = data.periodDays ? (data.periodDays >= 365 ? `${(data.periodDays / 365.25).toFixed(2)} Yrs` : `${data.periodDays.toFixed(1)} Days`) : 'N/A';
    document.getElementById('cardDay').textContent = data.day || 'N/A';
    document.getElementById('cardTemp').textContent = data.temp || 'N/A';
    document.getElementById('cardMoons').textContent = data.moons !== undefined ? data.moons : '0';
    document.getElementById('cardDesc').textContent = data.desc;

    if (openCard) {
        document.getElementById('celestial-card').classList.remove('hidden');
    }

    const reticle = document.getElementById('selection-reticle');
    document.getElementById('reticle-name').textContent = data.name.toUpperCase();
    reticle.classList.remove('hidden');
}

function updateReticlePosition() {
    if (!selectedTarget) return;

    const reticle = document.getElementById('selection-reticle');
    const pos = getCelestialCoords(selectedTarget);
    const vec = new THREE.Vector3(pos.x, pos.y, pos.z);
    vec.project(camera);

    const x = (vec.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-(vec.y * 0.5) + 0.5) * window.innerHeight;

    if (vec.z < 1) {
        reticle.style.left = `${x}px`;
        reticle.style.top = `${y}px`;
        reticle.classList.remove('hidden');
    } else {
        reticle.classList.add('hidden');
    }
}

// -------------------------------------------------------------
// 11. MAIN ANIMATION & RENDERING LOOP
// -------------------------------------------------------------
let lastTimestamp = performance.now();

function animateLoop() {
    requestAnimationFrame(animateLoop);

    const now = performance.now();
    const deltaSeconds = (now - lastTimestamp) / 1000;
    lastTimestamp = now;

    // Advance Simulation Time
    if (isPlaying && timeMultiplier !== 0) {
        const daysDelta = deltaSeconds * timeMultiplier;
        simDate = new Date(simDate.getTime() + daysDelta * 24 * 60 * 60 * 1000);
        updateDateDisplay();
    }

    // Update 3D Positions & Axial Rotations
    CELESTIAL_DATA.forEach(data => {
        const item = celestialMeshes[data.id];
        if (item) {
            const coords = getCelestialCoords(data);
            item.group.position.set(coords.x, coords.y, coords.z);

            const rotHours = Math.abs(data.rotationHours) || 24;
            const rotSpeed = (2 * Math.PI) / (rotHours * 3600);
            item.mesh.rotation.y += rotSpeed * 800 * deltaSeconds;
        }
    });

    // Update Camera Target Follow
    if (cameraFocusedTarget) {
        const targetCoords = getCelestialCoords(cameraFocusedTarget);
        const camX = targetCoords.x + cameraDistance * Math.sin(cameraRotY) * Math.cos(cameraRotX);
        const camY = targetCoords.y + cameraDistance * Math.sin(cameraRotX);
        const camZ = targetCoords.z + cameraDistance * Math.cos(cameraRotY) * Math.cos(cameraRotX);

        camera.position.set(camX, camY, camZ);
        camera.lookAt(targetCoords.x, targetCoords.y, targetCoords.z);
    } else {
        const camX = cameraDistance * Math.sin(cameraRotY) * Math.cos(cameraRotX);
        const camY = cameraDistance * Math.sin(cameraRotX);
        const camZ = cameraDistance * Math.cos(cameraRotY) * Math.cos(cameraRotX);

        camera.position.set(camX, camY, camZ);
        camera.lookAt(0, 0, 0);
    }

    if (simMode === '3D') {
        renderer.render(scene, camera);
        updateReticlePosition();
    } else {
        render2DOrrery();
    }
}
