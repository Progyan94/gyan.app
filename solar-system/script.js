// Solar System Scope Web - Core Astronomical Physics & Simulation Engine
// Realistic 3D WebGL (Three.js) & 2D Vector Orrery with full interactive timeline, search, and celestial database

// -------------------------------------------------------------
// 1. CELESTIAL DATABASE (Planets, Moons, Dwarf Planets, Comets, Asteroids)
// -------------------------------------------------------------
const CELESTIAL_DATA = [
    {
        id: "Sun",
        name: "Sun (Sol)",
        cat: "STAR",
        tagline: "The Heart of the Solar System",
        radiusKm: 696340,
        sizeScale: 18.0, // Scaled for orrery visibility
        distAU: 0,
        orbitRadius: 0,
        periodDays: 0,
        rotationHours: 609.12,
        color: 0xffaa00,
        colorHex: "#ffaa00",
        textureType: "sun",
        tilt: 7.25,
        temp: "5,500 °C (Core: 15M °C)",
        moons: 0,
        day: "25.38 Earth Days",
        desc: "Yellow dwarf star containing 99.86% of the solar system's total mass. Powered by core nuclear proton-proton chain fusion converting 600M tons of hydrogen to helium per second."
    },
    {
        id: "Mercury",
        name: "Mercury",
        cat: "PLANET",
        tagline: "The Sun-Scorched Messenger",
        radiusKm: 2439.7,
        sizeScale: 1.8,
        distAU: 0.387,
        orbitRadius: 28,
        periodDays: 87.97,
        rotationHours: 1407.6,
        color: 0x9ca3af,
        colorHex: "#9ca3af",
        textureType: "cratered",
        tilt: 0.03,
        temp: "-180 °C to 430 °C",
        moons: 0,
        day: "58.6 Earth Days",
        desc: "Smallest planet, closest to the Sun. Tidally locked in a 3:2 spin-orbit resonance. Heavily cratered surface with high iron core density and virtually zero atmosphere."
    },
    {
        id: "Venus",
        name: "Venus",
        cat: "PLANET",
        tagline: "Runaway Greenhouse Inferno",
        radiusKm: 6051.8,
        sizeScale: 3.2,
        distAU: 0.723,
        orbitRadius: 42,
        periodDays: 224.7,
        rotationHours: -5832.5, // Retrograde
        color: 0xf59e0b,
        colorHex: "#f59e0b",
        textureType: "venus-clouds",
        tilt: 177.36,
        temp: "465 °C",
        moons: 0,
        day: "243 Earth Days (Retrograde)",
        desc: "Hottest planetary surface in the system, choked by a dense 93-bar supercritical CO2 atmosphere with sulfuric acid cloud layers. Rotates backward relative to most other planets."
    },
    {
        id: "Earth",
        name: "Earth",
        cat: "PLANET",
        tagline: "The Blue Oasis of Life",
        radiusKm: 6371.0,
        sizeScale: 3.4,
        distAU: 1.000,
        orbitRadius: 58,
        periodDays: 365.25,
        rotationHours: 23.93,
        color: 0x38bdf8,
        colorHex: "#38bdf8",
        textureType: "earth",
        tilt: 23.44,
        temp: "-88 °C to 58 °C",
        moons: 1,
        day: "23h 56m",
        desc: "Only known harbor of biological life. Dynamic nitrogen-oxygen atmosphere, active plate tectonics, protective geomagnetic magnetosphere, and liquid oceans covering 71% of the surface."
    },
    {
        id: "Moon",
        name: "The Moon (Luna)",
        cat: "MOON",
        tagline: "Earth's Ancient Cosmic Companion",
        radiusKm: 1737.4,
        sizeScale: 1.0,
        distAU: 1.002,
        parent: "Earth",
        orbitRadius: 7, // Relative to Earth
        periodDays: 27.32,
        rotationHours: 655.7,
        color: 0xd1d5db,
        colorHex: "#d1d5db",
        textureType: "lunar",
        tilt: 6.68,
        temp: "-130 °C to 120 °C",
        moons: 0,
        day: "27.3 Earth Days",
        desc: "Formed ~4.5 billion years ago via the giant impact hypothesis with protoplanet Theia. Drives Earth's ocean tides and stabilizes axial wobble."
    },
    {
        id: "Mars",
        name: "Mars",
        cat: "PLANET",
        tagline: "The Rust-Red Frontier",
        radiusKm: 3389.5,
        sizeScale: 2.2,
        distAU: 1.524,
        orbitRadius: 76,
        periodDays: 686.98,
        rotationHours: 24.62,
        color: 0xef4444,
        colorHex: "#ef4444",
        textureType: "mars",
        tilt: 25.19,
        temp: "-140 °C to 20 °C",
        moons: 2,
        day: "24h 37m",
        desc: "Red planet coated with oxidized iron dust. Home to Olympus Mons (tallest shield volcano) and Valles Marineris canyon. Subsurface water ice detected in polar caps."
    },
    {
        id: "Ceres",
        name: "Ceres",
        cat: "DWARF PLANET / ASTEROID",
        tagline: "Queen of the Asteroid Belt",
        radiusKm: 473.0,
        sizeScale: 0.9,
        distAU: 2.767,
        orbitRadius: 96,
        periodDays: 1682,
        rotationHours: 9.07,
        color: 0xa8a29e,
        colorHex: "#a8a29e",
        textureType: "asteroid",
        tilt: 4.0,
        temp: "-105 °C",
        moons: 0,
        day: "9.07 Hours",
        desc: "Largest object in the asteroid belt, composing 1/3 of its total mass. Contains water ice, clay minerals, and bright sodium carbonate salt deposits in Occator Crater."
    },
    {
        id: "Jupiter",
        name: "Jupiter",
        cat: "PLANET",
        tagline: "The King of Planets",
        radiusKm: 69911,
        sizeScale: 7.5,
        distAU: 5.204,
        orbitRadius: 124,
        periodDays: 4332.59,
        rotationHours: 9.93,
        color: 0xfbbf24,
        colorHex: "#fbbf24",
        textureType: "jupiter-bands",
        tilt: 3.13,
        temp: "-110 °C",
        moons: 95,
        day: "9h 55m",
        desc: "Massive gas giant with over 300 times Earth's mass. Iconic Great Red Spot anticyclonic storm larger than Earth. Surrounded by Galilean moons Io, Europa, Ganymede, and Callisto."
    },
    {
        id: "Saturn",
        name: "Saturn",
        cat: "PLANET",
        tagline: "The Jewel of the Solar System",
        radiusKm: 58232,
        sizeScale: 6.5,
        distAU: 9.582,
        orbitRadius: 160,
        periodDays: 10759.22,
        rotationHours: 10.7,
        color: 0xfde047,
        colorHex: "#fde047",
        textureType: "saturn",
        hasRings: true,
        tilt: 26.73,
        temp: "-140 °C",
        moons: 146,
        day: "10h 33m",
        desc: "Adorned with spectacular, razor-thin ice and rock ring systems spanning 282,000 km. Average density is less than water, meaning Saturn would float in a giant bathtub!"
    },
    {
        id: "Uranus",
        name: "Uranus",
        cat: "PLANET",
        tagline: "The Sideways Ice Giant",
        radiusKm: 25362,
        sizeScale: 4.5,
        distAU: 19.20,
        orbitRadius: 198,
        periodDays: 30685.4,
        rotationHours: -17.24, // Retrograde
        color: 0x67e8f9,
        colorHex: "#67e8f9",
        textureType: "uranus",
        tilt: 97.77, // Knocked sideways!
        temp: "-195 °C",
        moons: 28,
        day: "17h 14m",
        desc: "Ice giant composed of water, ammonia, and methane ices. Tilted almost 98 degrees on its side, rolling around the Sun like a ball with extreme 42-year polar seasons."
    },
    {
        id: "Neptune",
        name: "Neptune",
        cat: "PLANET",
        tagline: "The Supersonic Wind Giant",
        radiusKm: 24622,
        sizeScale: 4.4,
        distAU: 30.05,
        orbitRadius: 236,
        periodDays: 60189.0,
        rotationHours: 16.11,
        color: 0x3b82f6,
        colorHex: "#3b82f6",
        textureType: "neptune",
        tilt: 28.32,
        temp: "-200 °C",
        moons: 16,
        day: "16h 06m",
        desc: "Outermost major planet, rich deep azure blue from atmospheric methane. Possesses supersonic winds exceeding 2,100 km/h and geyser-erupting captured moon Triton."
    },
    {
        id: "Pluto",
        name: "Pluto",
        cat: "DWARF PLANET",
        tagline: "The Heart of the Kuiper Belt",
        radiusKm: 1188.3,
        sizeScale: 1.2,
        distAU: 39.48,
        orbitRadius: 275,
        periodDays: 90560,
        rotationHours: -153.3,
        color: 0xe2e8f0,
        colorHex: "#e2e8f0",
        textureType: "pluto",
        tilt: 122.53,
        temp: "-230 °C",
        moons: 5,
        day: "6.4 Earth Days",
        desc: "Kuiper Belt dwarf planet featuring Tombaugh Regio (a giant nitrogen ice heart), ice mountains of water ice, and binary companion moon Charon."
    },
    {
        id: "Halley",
        name: "1P / Halley's Comet",
        cat: "COMET",
        tagline: "The Historic Celestial Wanderer",
        radiusKm: 5.5,
        sizeScale: 0.8,
        distAU: 17.8, // Semi-major axis
        orbitRadius: 180,
        eccentricity: 0.967,
        periodDays: 27500, // ~75.3 Years
        color: 0x38bdf8,
        colorHex: "#38bdf8",
        textureType: "comet",
        hasTail: true,
        tilt: 18.0,
        temp: "-200 °C to 70 °C (Perihelion)",
        moons: 0,
        day: "52 Hours",
        desc: "Most famous periodic comet visible from Earth to the naked eye. Composed of volatile ices, carbon, and dust. Will next grace Earth's night sky in mid-2061."
    },
    {
        id: "Oumuamua",
        name: "1I / 'Oumuamua",
        cat: "INTERSTELLAR OBJECT",
        tagline: "The First Interstellar Scout",
        radiusKm: 0.2,
        sizeScale: 0.7,
        distAU: 25.0,
        orbitRadius: 210,
        periodDays: 35000,
        color: 0xf43f5e,
        colorHex: "#f43f5e",
        textureType: "elongated",
        tilt: 45.0,
        temp: "-220 °C",
        moons: 0,
        day: "8.14 Hours",
        desc: "First confirmed interstellar interloper passing through our solar system from deep space in 2017. Highly elongated reddish needle-shaped object with non-gravitational acceleration."
    }
];

// -------------------------------------------------------------
// 2. SIMULATION STATE & CONTROLLERS
// -------------------------------------------------------------
let simMode = '3D'; // '3D' or '2D'
let showOrbits = true;
let showLabels = true;
let isPlaying = true;
let timeMultiplier = 1.0; // 1 unit = 1 day per second
let simDate = new Date(); // Start at real current date
let selectedTarget = CELESTIAL_DATA[0]; // Start focused on Sun
let cameraFocusedTarget = null;

// Three.js State
let scene, camera, renderer;
let celestialMeshes = {};
let orbitLines = [];
let labelSprites = [];
let starfield;
let raycaster, mouse;
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let cameraDistance = 350;
let cameraRotX = 0.5;
let cameraRotY = 0.3;

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
    selectTarget(CELESTIAL_DATA[0], false); // Select Sun by default without popping up card
    animateLoop();

    // Ensure non-zero layout dimensions across all mobile & desktop viewports
    setTimeout(() => {
        onWindowResize();
        resize2D();
    }, 150);
});

// -------------------------------------------------------------
// 4. UI INTERACTION SETUP
// -------------------------------------------------------------
function initUI() {
    // Engine toggles
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

    // Orbit & Label toggles
    const btnOrbits = document.getElementById('toggleOrbits');
    btnOrbits.addEventListener('click', () => {
        showOrbits = !showOrbits;
        btnOrbits.classList.toggle('active', showOrbits);
        btnOrbits.textContent = `🪐 ORBITS: ${showOrbits ? 'ON' : 'OFF'}`;
        orbitLines.forEach(l => l.visible = showOrbits);
    });

    const btnLabels = document.getElementById('toggleLabels');
    btnLabels.addEventListener('click', () => {
        showLabels = !showLabels;
        btnLabels.classList.toggle('active', showLabels);
        btnLabels.textContent = `🏷️ LABELS: ${showLabels ? 'ON' : 'OFF'}`;
        labelSprites.forEach(l => l.visible = showLabels);
    });

    // Reset Camera
    document.getElementById('resetCamBtn').addEventListener('click', () => {
        cameraFocusedTarget = null;
        cameraDistance = 350;
        cameraRotX = 0.5;
        cameraRotY = 0.3;
        pan2D = { x: 0, y: 0 };
        zoom2D = 1.0;
    });

    // Info card toggle & close
    const toggleInfoBtn = document.getElementById('toggleInfoBtn');
    if (toggleInfoBtn) {
        toggleInfoBtn.addEventListener('click', () => {
            const card = document.getElementById('celestial-card');
            card.classList.toggle('hidden');
        });
    }

    document.getElementById('closeCardBtn').addEventListener('click', () => {
        document.getElementById('celestial-card').classList.add('hidden');
        document.getElementById('selection-reticle').classList.add('hidden');
    });

    // Card Actions
    document.getElementById('focusTargetBtn').addEventListener('click', () => {
        if (selectedTarget) {
            cameraFocusedTarget = selectedTarget;
            cameraDistance = Math.max(selectedTarget.sizeScale * 5, 20);
        }
    });

    document.getElementById('visitSurfaceBtn').addEventListener('click', () => {
        if (selectedTarget) {
            cameraFocusedTarget = selectedTarget;
            cameraDistance = selectedTarget.sizeScale * 2.5;
        }
    });

    // Quick Jump Dock
    document.querySelectorAll('.jump-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const target = CELESTIAL_DATA.find(t => t.id === targetId);
            if (target) {
                selectTarget(target);
                cameraFocusedTarget = target;
                cameraDistance = Math.max(target.sizeScale * 5, 25);
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
    text.textContent = `${speed}x (${speed} Days/sec)`;
}

function updateDateDisplay() {
    const display = document.getElementById('currentDateDisplay');
    display.textContent = simDate.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
}

// -------------------------------------------------------------
// 5. SEARCH ENGINE IMPLEMENTATION
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
            item.tagline.toLowerCase().includes(query)
        );

        resultsBox.innerHTML = '';
        if (matches.length === 0) {
            resultsBox.innerHTML = '<div class="search-result-item" style="color:#94a3b8">No celestial bodies found</div>';
        } else {
            matches.forEach(item => {
                const row = document.createElement('div');
                row.className = 'search-result-item';
                row.innerHTML = `
                    <span class="result-name">${item.name}</span>
                    <span class="result-type">${item.cat}</span>
                `;
                row.onclick = () => {
                    selectTarget(item);
                    cameraFocusedTarget = item;
                    cameraDistance = Math.max(item.sizeScale * 5, 25);
                    resultsBox.classList.add('hidden');
                    searchInput.value = '';
                };
                resultsBox.appendChild(row);
            });
        }
        resultsBox.classList.remove('hidden');
    });

    // Close search on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box')) {
            resultsBox.classList.add('hidden');
        }
    });
}

// -------------------------------------------------------------
// 6. THREE.JS 3D SCENE SETUP
// -------------------------------------------------------------
function initThreeJS() {
    const container = document.getElementById('webgl-canvas-mount');
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.0006);

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
    camera.position.set(0, 200, 350);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x334155, 0.8);
    scene.add(ambientLight);

    // Sun Point Light
    const sunLight = new THREE.PointLight(0xffffff, 2.2, 3000, 0.5);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    buildStarfield();
    buildSolarSystem3D();

    // Window resize
    window.addEventListener('resize', onWindowResize);

    // Mouse & Touch Orbit Controls
    setup3DControls(container);
}

// Procedural Starfield
function buildStarfield() {
    const starsCount = 4000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starsCount * 3);
    const colors = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
        const r = 1200 + Math.random() * 800;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i] = r * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = r * Math.cos(phi);

        // Subtle realistic stellar colors
        const colorVariation = Math.random();
        if (colorVariation < 0.6) {
            colors[i] = 1.0; colors[i + 1] = 1.0; colors[i + 2] = 1.0; // White
        } else if (colorVariation < 0.8) {
            colors[i] = 0.7; colors[i + 1] = 0.85; colors[i + 2] = 1.0; // Blue-white
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

// Build Planets, Sun, Orbits & Rings in 3D
function buildSolarSystem3D() {
    CELESTIAL_DATA.forEach(data => {
        const group = new THREE.Group();
        group.userData = data;

        // Geometry & Material
        let geom;
        let mat;

        if (data.id === "Sun") {
            geom = new THREE.SphereGeometry(data.sizeScale, 48, 48);
            mat = new THREE.MeshBasicMaterial({
                color: data.color
            });

            // Glowing Corona Sphere
            const coronaGeom = new THREE.SphereGeometry(data.sizeScale * 1.25, 32, 32);
            const coronaMat = new THREE.MeshBasicMaterial({
                color: 0xffdd44,
                transparent: true,
                opacity: 0.25,
                side: THREE.BackSide
            });
            const corona = new THREE.Mesh(coronaGeom, coronaMat);
            group.add(corona);
        } else {
            geom = new THREE.SphereGeometry(data.sizeScale, 36, 36);
            mat = new THREE.MeshStandardMaterial({
                color: data.color,
                roughness: 0.7,
                metalness: 0.1
            });
        }

        const mesh = new THREE.Mesh(geom, mat);
        mesh.userData = data;
        group.add(mesh);

        // Saturn Rings
        if (data.hasRings) {
            const ringGeom = new THREE.RingGeometry(data.sizeScale * 1.4, data.sizeScale * 2.3, 48);
            const ringMat = new THREE.MeshStandardMaterial({
                color: 0xd97706,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.8
            });
            const rings = new THREE.Mesh(ringGeom, ringMat);
            rings.rotation.x = Math.PI / 2 + 0.3;
            group.add(rings);
        }

        // Comet Tail (Particle Tail for Halley)
        if (data.hasTail) {
            const tailGeom = new THREE.ConeGeometry(data.sizeScale * 1.5, 25, 16);
            const tailMat = new THREE.MeshBasicMaterial({
                color: 0x38bdf8,
                transparent: true,
                opacity: 0.45
            });
            const tail = new THREE.Mesh(tailGeom, tailMat);
            tail.rotation.z = Math.PI / 2;
            tail.position.x = -14;
            group.add(tail);
        }

        scene.add(group);
        celestialMeshes[data.id] = { group, mesh, data };

        // Orbit Line
        if (data.orbitRadius > 0 && !data.parent) {
            const orbitGeom = new THREE.BufferGeometry();
            const points = [];
            const segments = 128;
            for (let i = 0; i <= segments; i++) {
                const theta = (i / segments) * Math.PI * 2;
                // Add eccentricity for Halley
                const r = data.eccentricity ? data.orbitRadius * (1 - 0.3 * Math.cos(theta)) : data.orbitRadius;
                points.push(new THREE.Vector3(r * Math.cos(theta), 0, r * Math.sin(theta)));
            }
            orbitGeom.setFromPoints(points);

            const orbitMat = new THREE.LineBasicMaterial({
                color: data.color,
                transparent: true,
                opacity: 0.25
            });
            const orbitLine = new THREE.Line(orbitGeom, orbitMat);
            scene.add(orbitLine);
            orbitLines.push(orbitLine);
        }
    });
}

// Controls: Orbit, Drag, Zoom
function setup3DControls(container) {
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

        // Raycasting for object selection
        const rect = container.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    });

    // Zoom on wheel
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        cameraDistance = Math.max(10, Math.min(900, cameraDistance + e.deltaY * 0.3));
    }, { passive: false });

    // Click to select
    container.addEventListener('click', (e) => {
        raycaster.setFromCamera(mouse, camera);
        const hitMeshes = Object.values(celestialMeshes).map(m => m.mesh);
        const intersects = raycaster.intersectObjects(hitMeshes, true);

        if (intersects.length > 0) {
            const clickedData = intersects[0].object.userData;
            if (clickedData) {
                selectTarget(clickedData);
            }
        }
    });

    // Touch controls for mobile
    let touchStartDist = 0;
    container.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDragging = true;
            previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else if (e.touches.length === 2) {
            touchStartDist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
        }
    });

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
            cameraDistance = Math.max(10, Math.min(900, cameraDistance + delta * 0.5));
            touchStartDist = dist;
        }
    });

    container.addEventListener('touchend', () => {
        isDragging = false;
    });
}

function onWindowResize() {
    const container = document.getElementById('webgl-canvas-mount');
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// -------------------------------------------------------------
// 7. 2D ORRERY CANVAS ENGINE
// -------------------------------------------------------------
function init2DOrrery() {
    canvas2D = document.getElementById('orrery2d-canvas');
    ctx2D = canvas2D.getContext('2d');
    resize2D();

    window.addEventListener('resize', resize2D);

    // 2D Pan & Zoom
    canvas2D.addEventListener('mousedown', (e) => {
        isDragging2D = true;
        startDrag2D = { x: e.clientX - pan2D.x, y: e.clientY - pan2D.y };
    });

    window.addEventListener('mouseup', () => {
        isDragging2D = false;
    });

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

    // 2D Target Selection on click
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
            if (dist <= radius + 5) {
                selectTarget(data);
            }
        });
    });
}

function resize2D() {
    if (!canvas2D) return;
    canvas2D.width = window.innerWidth;
    canvas2D.height = window.innerHeight;
}

// Render 2D Vector Orrery
function render2DOrrery() {
    if (simMode !== '2D') return;

    ctx2D.clearRect(0, 0, canvas2D.width, canvas2D.height);

    // Background gradient space
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

    // Draw Orbits
    if (showOrbits) {
        CELESTIAL_DATA.forEach(data => {
            if (data.orbitRadius > 0 && !data.parent) {
                const r = data.orbitRadius * zoom2D * 1.5;
                ctx2D.beginPath();
                ctx2D.arc(centerX, centerY, r, 0, Math.PI * 2);
                ctx2D.strokeStyle = 'rgba(56, 189, 248, 0.15)';
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
        const radius = Math.max(data.sizeScale * zoom2D * 0.7, 4);

        // Body glow
        ctx2D.beginPath();
        ctx2D.arc(screenX, screenY, radius + 4, 0, Math.PI * 2);
        ctx2D.fillStyle = `${data.colorHex}33`;
        ctx2D.fill();

        // Body core
        ctx2D.beginPath();
        ctx2D.arc(screenX, screenY, radius, 0, Math.PI * 2);
        ctx2D.fillStyle = data.colorHex;
        ctx2D.fill();

        // Selected halo
        if (selectedTarget && selectedTarget.id === data.id) {
            ctx2D.beginPath();
            ctx2D.arc(screenX, screenY, radius + 8, 0, Math.PI * 2);
            ctx2D.strokeStyle = '#38bdf8';
            ctx2D.lineWidth = 2;
            ctx2D.setLineDash([4, 4]);
            ctx2D.stroke();
            ctx2D.setLineDash([]);
        }

        // Labels
        if (showLabels) {
            ctx2D.font = '600 12px "Rajdhani", sans-serif';
            ctx2D.fillStyle = '#f8fafc';
            ctx2D.fillText(data.name, screenX + radius + 6, screenY + 4);
        }
    });
}

// -------------------------------------------------------------
// 8. ORBITAL MECHANICS & MATH FORMULAE
// -------------------------------------------------------------
// Returns 3D {x, y, z} relative to origin for simulation time
function getCelestialCoords(data) {
    if (data.orbitRadius === 0) return { x: 0, y: 0, z: 0 };

    // Calculate days elapsed from reference epoch
    const epoch = new Date('2026-01-01T00:00:00Z').getTime();
    const currentMs = simDate.getTime();
    const daysElapsed = (currentMs - epoch) / (1000 * 60 * 60 * 24);

    // Orbital Mean Anomaly
    const period = data.periodDays || 365.25;
    const angle = (daysElapsed / period) * Math.PI * 2;

    if (data.parent) {
        // Moon orbiting Earth
        const parentData = CELESTIAL_DATA.find(d => d.id === data.parent);
        const parentPos = getCelestialCoords(parentData);
        const moonX = parentPos.x + data.orbitRadius * Math.cos(angle * 12);
        const moonZ = parentPos.z + data.orbitRadius * Math.sin(angle * 12);
        return { x: moonX, y: 0, z: moonZ };
    }

    // Eccentric orbit calculation for comets
    const r = data.eccentricity ? data.orbitRadius * (1 - 0.3 * Math.cos(angle)) : data.orbitRadius;
    const x = r * Math.cos(angle);
    const z = r * Math.sin(angle);

    return { x, y: 0, z };
}

// -------------------------------------------------------------
// 9. TARGET SELECTION & METRICS CARD
// -------------------------------------------------------------
function selectTarget(data, openCard = true) {
    selectedTarget = data;

    // Fill UI Info Card
    document.getElementById('cardCat').textContent = data.cat;
    document.getElementById('cardName').textContent = data.name.toUpperCase();
    document.getElementById('cardTagline').textContent = data.tagline;

    document.getElementById('cardDist').textContent = data.distAU ? `${data.distAU} AU` : '0 AU (Origin)';
    document.getElementById('cardRadius').textContent = `${data.radiusKm.toLocaleString()} km`;
    document.getElementById('cardPeriod').textContent = data.periodDays ? `${(data.periodDays / 365.25).toFixed(2)} Earth Yrs` : 'N/A';
    document.getElementById('cardDay').textContent = data.day;
    document.getElementById('cardTemp').textContent = data.temp;
    document.getElementById('cardMoons').textContent = data.moons;
    document.getElementById('cardDesc').textContent = data.desc;

    if (openCard) {
        document.getElementById('celestial-card').classList.remove('hidden');
    }

    // Update Reticle Label
    const reticle = document.getElementById('selection-reticle');
    document.getElementById('reticle-name').textContent = data.name.toUpperCase();
    reticle.classList.remove('hidden');
}

// Position Reticle 2D screen coordinate over 3D selected mesh
function updateReticlePosition() {
    if (!selectedTarget) return;

    const reticle = document.getElementById('selection-reticle');
    const pos = getCelestialCoords(selectedTarget);
    const vec = new THREE.Vector3(pos.x, pos.y, pos.z);
    vec.project(camera);

    const x = (vec.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-(vec.y * 0.5) + 0.5) * window.innerHeight;

    // Only show if in front of camera
    if (vec.z < 1) {
        reticle.style.left = `${x}px`;
        reticle.style.top = `${y}px`;
        reticle.classList.remove('hidden');
    } else {
        reticle.classList.add('hidden');
    }
}

// -------------------------------------------------------------
// 10. MAIN ANIMATION & SIMULATION LOOP
// -------------------------------------------------------------
let lastTimestamp = performance.now();

function animateLoop() {
    requestAnimationFrame(animateLoop);

    const now = performance.now();
    const deltaSeconds = (now - lastTimestamp) / 1000;
    lastTimestamp = now;

    // Advance Simulation Time
    if (isPlaying && timeMultiplier !== 0) {
        // timeMultiplier units: days advanced per real second
        const daysDelta = deltaSeconds * timeMultiplier;
        simDate = new Date(simDate.getTime() + daysDelta * 24 * 60 * 60 * 1000);
        updateDateDisplay();
    }

    // Update 3D Positions & Rotations
    CELESTIAL_DATA.forEach(data => {
        const item = celestialMeshes[data.id];
        if (item) {
            const coords = getCelestialCoords(data);
            item.group.position.set(coords.x, coords.y, coords.z);

            // Axial Rotation
            const rotSpeed = (2 * Math.PI) / (Math.abs(data.rotationHours) * 3600);
            item.mesh.rotation.y += rotSpeed * 1000 * deltaSeconds;
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
        // Global Free Orbit
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
