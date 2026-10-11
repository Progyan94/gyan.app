// Universe Zoom: Dual-Engine 3D (WebGL Three.js) & 2D (Optimized Vector Canvas) Simulator
// Features: Realistic Mode (accurate procedural textures, terrain, planetary orbits, anatomy, galaxies) vs Poly-Asset Mode

// 1. COSMIC ENTITIES & POWERS OF TEN DATABASE
const cosmicEntities = [
    {
        name: "Planck Length / Quantum Foam",
        exponent: -18,
        sizeMeters: 1e-18,
        category: "SUB-QUANTUM",
        desc: "The theoretical threshold where the smooth geometry of space-time fractures into turbulent probabilistic fluctuations.",
        tags: ["Quantum Gravity", "String Scale"],
        color3D: 0x9333ea,
        color2D: "#9333ea",
        type: "quantum"
    },
    {
        name: "Up & Down Quarks",
        exponent: -15,
        sizeMeters: 1e-15,
        category: "SUBATOMIC",
        desc: "Fundamental elementary particles bound by gluon flux tubes, producing color charge confinement.",
        tags: ["Gluon Fields", "Fermions"],
        color3D: 0xec4899,
        color2D: "#ec4899",
        type: "quarks"
    },
    {
        name: "Proton & Atomic Nucleus",
        exponent: -14,
        sizeMeters: 1e-14,
        category: "SUBATOMIC",
        desc: "The ultra-dense composite core of an atom holding 99.9% of its mass, bound by nuclear interactions.",
        tags: ["Baryon Core", "Strong Force"],
        color3D: 0xef4444,
        color2D: "#ef4444",
        type: "nucleus"
    },
    {
        name: "Hydrogen Atom & Electron Orbitals",
        exponent: -10,
        sizeMeters: 1e-10,
        category: "ATOMIC",
        desc: "An electron wave-function probability cloud orbiting a proton. The fundamental building block of cosmic chemistry.",
        tags: ["Quantum Orbitals", "1 Angstrom"],
        color3D: 0x06b6d4,
        color2D: "#06b6d4",
        type: "atom"
    },
    {
        name: "DNA Double Helix",
        exponent: -9,
        sizeMeters: 2e-9,
        category: "MOLECULAR",
        desc: "A twisted double-stranded helical polymer carrying genetic base pairs for all terrestrial biological life.",
        tags: ["2.5 Nanometers", "Genetic Code"],
        color3D: 0x10b981,
        color2D: "#10b981",
        type: "dna"
    },
    {
        name: "Biological Cell & Mitochondria",
        exponent: -5,
        sizeMeters: 1e-5,
        category: "MICROBIAL",
        desc: "Microscopic self-replicating eukaryotic cell housing cytoplasm, cell walls, and cellular engines.",
        tags: ["10 Microns", "Cytoplasm"],
        color3D: 0x84cc16,
        color2D: "#84cc16",
        type: "cell"
    },
    {
        name: "Human Being",
        exponent: 0.23, // ~1.7m
        sizeMeters: 1.7,
        category: "MACROSCOPIC BIOLOGY",
        desc: "Homo sapiens: an apex sentient organism capable of constructing particle colliders and exploring space.",
        tags: ["Carbon-Based", "1.7 Meters"],
        color3D: 0x38bdf8,
        color2D: "#38bdf8",
        type: "human"
    },
    {
        name: "Mount Everest",
        exponent: 3.94, // 8,848m
        sizeMeters: 8848,
        category: "GEOLOGICAL",
        desc: "Earth's highest mountain peak above sea level, forced skyward by tectonic collision between Indian and Eurasian plates.",
        tags: ["8.8 Kilometers", "Lithosphere"],
        color3D: 0xe2e8f0,
        color2D: "#e2e8f0",
        type: "mountain"
    },
    {
        name: "Planet Earth",
        exponent: 7.1, // 12,742,000m
        sizeMeters: 1.27e7,
        category: "PLANETARY",
        desc: "The third rock from the Sun. A vibrant oasis wrapped in a nitrogen-oxygen atmosphere, liquid oceans, continents, and green biomes.",
        tags: ["12,742 km", "Habitable Zone"],
        color3D: 0x2563eb,
        color2D: "#2563eb",
        type: "earth"
    },
    {
        name: "The Sun (Sol)",
        exponent: 9.14, // 1.39e9m
        sizeMeters: 1.39e9,
        category: "STELLAR",
        desc: "A main-sequence G-type star fusing 600 million tons of hydrogen per second, complete with solar flares and sunspots.",
        tags: ["1.39 Million km", "Thermonuclear"],
        color3D: 0xf59e0b,
        color2D: "#f59e0b",
        type: "sun"
    },
    {
        name: "Solar System Planetary Orbits",
        exponent: 13, // ~1e13m
        sizeMeters: 1e13,
        category: "INTERPLANETARY",
        desc: "The entire heliocentric planetary structure with Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune, and orbit paths.",
        tags: ["Complete System", "9 Planar Orbits"],
        color3D: 0x6366f1,
        color2D: "#6366f1",
        type: "solar_system"
    },
    {
        name: "Milky Way Galaxy",
        exponent: 21, // ~1e21m (100,000 ly)
        sizeMeters: 9.5e20,
        category: "GALACTIC",
        desc: "A grand barred spiral galaxy containing over 100 billion stars orbiting Sagittarius A*, a central supermassive black hole.",
        tags: ["100,000 Light Years", "Spiral Arms"],
        color3D: 0xa855f7,
        color2D: "#a855f7",
        type: "galaxy"
    },
    {
        name: "Observable Universe & Cosmic Web",
        exponent: 26.94, // ~8.8e26m (93 billion ly)
        sizeMeters: 8.8e26,
        category: "COSMOLOGICAL",
        desc: "The total spherical boundary from which light has had time to reach Earth since the Big Bang, threaded by dark matter filaments.",
        tags: ["93 Billion Light Years", "Cosmic Web"],
        color3D: 0xf43f5e,
        color2D: "#f43f5e",
        type: "universe"
    }
];

// Current State
let currentLog = 0.23; // Start at Human
let activeMode = "3d"; // "3d" or "2d"
let activeViewStyle = "realistic"; // "realistic" or "poly"

// DOM Elements
const threeContainer = document.getElementById('three-container');
const twoCanvas = document.getElementById('two-canvas');
const twoCtx = twoCanvas.getContext('2d');
const zoomSlider = document.getElementById('zoom-slider');
const scalePill = document.getElementById('scale-pill');
const targetName = document.getElementById('target-name');
const targetCategory = document.getElementById('target-category');
const targetExponent = document.getElementById('target-exponent');
const targetDesc = document.getElementById('target-desc');
const targetTags = document.getElementById('target-tags');
const telDist = document.getElementById('tel-dist');
const telLight = document.getElementById('tel-light');
const telJitter = document.getElementById('tel-jitter');

const btn3d = document.getElementById('btn-3d');
const btn2d = document.getElementById('btn-2d');
const btnStyleRealistic = document.getElementById('btn-style-realistic');
const btnStylePoly = document.getElementById('btn-style-poly');

// -------------------------------------------------------------
// 2. PROCEDURAL TEXTURE GENERATION FOR REALISTIC RENDER
// -------------------------------------------------------------
function createEarthTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Ocean deep blue gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, '#0c2461');
    grad.addColorStop(0.5, '#1e3799');
    grad.addColorStop(1, '#0c2461');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Procedural Continents (Earth terrain: green forests, brown mountains, golden deserts, polar icecaps)
    function drawBlob(cx, cy, rx, ry, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        for (let angle = 0; angle < Math.PI * 2; angle += 0.2) {
            const radX = rx + (Math.sin(angle * 4 + cx) * 20);
            const radY = ry + (Math.cos(angle * 3 + cy) * 16);
            const x = cx + Math.cos(angle) * radX;
            const y = cy + Math.sin(angle) * radY;
            if (angle === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
    }

    // Continents
    drawBlob(250, 200, 140, 80, '#27ae60'); // Americas North
    drawBlob(280, 180, 50, 40, '#784e20');  // Rockies
    drawBlob(320, 340, 80, 110, '#218c74'); // South America
    drawBlob(550, 170, 120, 70, '#10ac84'); // Eurasia
    drawBlob(540, 290, 100, 90, '#d35400'); // Africa & Sahara
    drawBlob(540, 250, 80, 40, '#f39c12');  // Sahara Desert
    drawBlob(750, 200, 140, 80, '#27ae60'); // Asia East
    drawBlob(780, 360, 70, 50, '#e67e22');  // Australia

    // Polar Caps
    ctx.fillStyle = '#f1f2f6';
    ctx.fillRect(0, 0, 1024, 45); // North Pole
    ctx.fillRect(0, 470, 1024, 42); // Antarctica

    // Swirling Cloud wisps
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 35; i++) {
        const x = (i * 32) % 1024;
        const y = 80 + (Math.sin(i * 1.5) * 150) + (i * 7) % 250;
        ctx.beginPath();
        ctx.ellipse(x, y, 60, 14, 0.2, 0, Math.PI * 2);
        ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
}

function createSunTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Sun Plasma & Convection Granulation
    ctx.fillStyle = '#ff9f1a';
    ctx.fillRect(0, 0, 512, 256);

    for (let x = 0; x < 512; x += 12) {
        for (let y = 0; y < 256; y += 12) {
            const bright = Math.random();
            ctx.fillStyle = bright > 0.5 ? '#ff3838' : (bright > 0.25 ? '#ffb142' : '#fffa65');
            ctx.beginPath();
            ctx.arc(x + Math.random() * 6, y + Math.random() * 6, 8, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Sunspots
    ctx.fillStyle = '#7d0000';
    [ [140, 90, 12], [280, 150, 16], [320, 140, 9], [420, 80, 10] ].forEach(s => {
        ctx.beginPath();
        ctx.arc(s[0], s[1], s[2], 0, Math.PI * 2);
        ctx.fill();
    });

    return new THREE.CanvasTexture(canvas);
}

// -------------------------------------------------------------
// 3. THREE.JS 3D SCENE & ENGINE SETUP
// -------------------------------------------------------------
let scene3D, camera3D, renderer3D, threeObjects = [];
let starField, realisticMeshes = {}, polyMeshes = {};

function init3D() {
    scene3D = new THREE.Scene();
    scene3D.fog = new THREE.FogExp2(0x030712, 0.0012);

    camera3D = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 8000);
    camera3D.position.set(0, 0, 110);

    renderer3D = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer3D.setSize(window.innerWidth, window.innerHeight);
    renderer3D.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    threeContainer.appendChild(renderer3D.domElement);

    // Cinematic Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene3D.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(200, 180, 300);
    scene3D.add(dirLight);

    const sunGlowLight = new THREE.PointLight(0xffd32a, 2.0, 3000);
    sunGlowLight.position.set(0, 0, 0);
    scene3D.add(sunGlowLight);

    // Deep Starfield
    const starGeo = new THREE.BufferGeometry();
    const starCount = 3500;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
        starPos[i] = (Math.random() - 0.5) * 4500;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x94a3b8, size: 2.2, transparent: true, opacity: 0.75 });
    starField = new THREE.Points(starGeo, starMat);
    scene3D.add(starField);

    buildEntities3D();
}

function buildEntities3D() {
    // Clear any existing entities
    threeObjects.forEach(obj => scene3D.remove(obj));
    threeObjects = [];

    const earthTex = createEarthTexture();
    const sunTex = createSunTexture();

    cosmicEntities.forEach((ent) => {
        const rootGroup = new THREE.Group();

        // 1. REALISTIC REPRESENTATION SUB-GROUP
        const realGroup = new THREE.Group();
        buildRealisticEntity(ent, realGroup, earthTex, sunTex);

        // 2. POLY-ASSET REPRESENTATION SUB-GROUP
        const polyGroup = new THREE.Group();
        buildPolyAssetEntity(ent, polyGroup);

        rootGroup.add(realGroup);
        rootGroup.add(polyGroup);

        rootGroup.userData = {
            entity: ent,
            realGroup: realGroup,
            polyGroup: polyGroup
        };

        scene3D.add(rootGroup);
        threeObjects.push(rootGroup);
    });

    updateViewStyleVisibility();
}

function buildRealisticEntity(ent, group, earthTex, sunTex) {
    if (ent.type === "human") {
        // Realistic Human Anatomical Figure (Head, Torso, Arms, Legs)
        const skinMat = new THREE.MeshStandardMaterial({ color: 0xe0ac69, roughness: 0.6 });
        const clothMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.8 });

        // Head
        const head = new THREE.Mesh(new THREE.SphereGeometry(3.5, 24, 24), skinMat);
        head.position.y = 22;
        group.add(head);

        // Torso / Jacket
        const torso = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 4, 14, 20), clothMat);
        torso.position.y = 12;
        group.add(torso);

        // Legs
        const pantsMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.9 });
        [-2.2, 2.2].forEach(x => {
            const leg = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.4, 16, 16), pantsMat);
            leg.position.set(x, -2, 0);
            group.add(leg);
        });

        // Arms
        [-5.8, 5.8].forEach(x => {
            const arm = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.1, 13, 16), skinMat);
            arm.position.set(x, 11, 0);
            group.add(arm);
        });

    } else if (ent.type === "earth") {
        // Photorealistic Earth with Terrain Continents, Clouds, Atmosphere Rim
        const earthGeom = new THREE.SphereGeometry(24, 48, 48);
        const earthMat = new THREE.MeshStandardMaterial({
            map: earthTex,
            roughness: 0.45,
            metalness: 0.1
        });
        const earthMesh = new THREE.Mesh(earthGeom, earthMat);
        group.add(earthMesh);

        // Atmospheric glowing blue rim
        const atmoGeom = new THREE.SphereGeometry(25.4, 32, 32);
        const atmoMat = new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.18,
            side: THREE.BackSide
        });
        group.add(new THREE.Mesh(atmoGeom, atmoMat));

    } else if (ent.type === "sun") {
        // High-fidelity Photorealistic Sun
        const sunGeom = new THREE.SphereGeometry(30, 48, 48);
        const sunMat = new THREE.MeshBasicMaterial({
            map: sunTex
        });
        const sunMesh = new THREE.Mesh(sunGeom, sunMat);
        group.add(sunMesh);

        // Solar Flare / Prominence Emitters
        const flareGeom = new THREE.TorusGeometry(32, 1.2, 16, 64);
        const flareMat = new THREE.MeshBasicMaterial({ color: 0xff3838, transparent: true, opacity: 0.6 });
        const flare1 = new THREE.Mesh(flareGeom, flareMat);
        flare1.rotation.x = Math.PI / 3;
        group.add(flare1);

    } else if (ent.type === "solar_system") {
        // Entire Heliocentric System: Central Sun + 8 Planets & Orbit Paths
        const miniSun = new THREE.Mesh(new THREE.SphereGeometry(6, 24, 24), new THREE.MeshBasicMaterial({ color: 0xffa502 }));
        group.add(miniSun);

        const planets = [
            { name: "Mercury", r: 10, size: 0.8, color: 0xa4b0be },
            { name: "Venus", r: 15, size: 1.4, color: 0xeccc68 },
            { name: "Earth", r: 20, size: 1.6, color: 0x2ed573 },
            { name: "Mars", r: 26, size: 1.1, color: 0xff4757 },
            { name: "Jupiter", r: 35, size: 3.8, color: 0xff7f50 },
            { name: "Saturn", r: 45, size: 3.2, color: 0xf6b93b, hasRing: true },
            { name: "Uranus", r: 54, size: 2.2, color: 0x70a1ff },
            { name: "Neptune", r: 62, size: 2.1, color: 0x1e90ff }
        ];

        planets.forEach((p, idx) => {
            // Orbit Ring Line
            const orbitGeom = new THREE.RingGeometry(p.r - 0.15, p.r + 0.15, 64);
            const orbitMat = new THREE.MeshBasicMaterial({ color: 0x4b6584, side: THREE.DoubleSide, transparent: true, opacity: 0.4 });
            const orbitMesh = new THREE.Mesh(orbitGeom, orbitMat);
            orbitMesh.rotation.x = Math.PI / 2;
            group.add(orbitMesh);

            // Planet Body
            const angle = (idx * 0.9);
            const pMesh = new THREE.Mesh(new THREE.SphereGeometry(p.size, 16, 16), new THREE.MeshStandardMaterial({ color: p.color }));
            pMesh.position.set(Math.cos(angle) * p.r, 0, Math.sin(angle) * p.r);
            group.add(pMesh);

            // Saturn's Ring
            if (p.hasRing) {
                const ring = new THREE.Mesh(new THREE.RingGeometry(p.size * 1.5, p.size * 2.4, 32), new THREE.MeshBasicMaterial({ color: 0xe58e26, side: THREE.DoubleSide }));
                ring.rotation.x = Math.PI / 2.3;
                pMesh.add(ring);
            }
        });

    } else if (ent.type === "mountain") {
        // Realistic Mount Everest 3D Terrain Elevation Mesh
        const terrGeom = new THREE.ConeGeometry(28, 38, 32, 12);
        // Distort vertices to form rugged mountain ridges
        const pos = terrGeom.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            const y = pos.getY(i);
            if (y < 16) {
                pos.setX(i, pos.getX(i) + (Math.sin(pos.getY(i) * 2 + i) * 3));
                pos.setZ(i, pos.getZ(i) + (Math.cos(pos.getX(i) * 2 + i) * 3));
            }
        }
        terrGeom.computeVertexNormals();

        const terrMat = new THREE.MeshStandardMaterial({ color: 0x57606f, roughness: 0.9 });
        const mountain = new THREE.Mesh(terrGeom, terrMat);
        group.add(mountain);

        // Snow Cap
        const snowGeom = new THREE.ConeGeometry(12, 14, 32);
        snowGeom.translate(0, 12, 0);
        const snowMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
        group.add(new THREE.Mesh(snowGeom, snowMat));

    } else if (ent.type === "galaxy") {
        // Realistic Milky Way: Barred Core + 2 Major Golden/Blue Spiral Arms
        const particleCount = 4500;
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const arm = i % 2;
            const dist = Math.pow(Math.random(), 1.5) * 55 + 2;
            const angle = (dist * 0.18) + (arm * Math.PI) + (Math.random() - 0.5) * 0.45;

            pos[i * 3] = Math.cos(angle) * dist + (Math.random() - 0.5) * 4;
            pos[i * 3 + 1] = (Math.random() - 0.5) * (6 - dist * 0.08);
            pos[i * 3 + 2] = Math.sin(angle) * dist + (Math.random() - 0.5) * 4;

            // Core is warm yellow/orange, outer arms are stellar blue
            if (dist < 14) {
                colors[i * 3] = 1.0;
                colors[i * 3 + 1] = 0.85;
                colors[i * 3 + 2] = 0.4;
            } else {
                colors[i * 3] = 0.25;
                colors[i * 3 + 1] = 0.65;
                colors[i * 3 + 2] = 1.0;
            }
        }
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const mat = new THREE.PointsMaterial({ size: 1.4, vertexColors: true, transparent: true, opacity: 0.85 });
        group.add(new THREE.Points(geo, mat));

    } else if (ent.type === "universe") {
        // Realistic Observable Universe: Cosmic Web of Dark Matter Filaments
        const filamentCount = 3000;
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(filamentCount * 3);
        for (let i = 0; i < filamentCount * 3; i += 3) {
            const u = Math.random();
            const v = Math.random();
            const theta = u * 2.0 * Math.PI;
            const phi = Math.acos(2.0 * v - 1.0);
            const r = Math.cbrt(Math.random()) * 48;
            pos[i] = r * Math.sin(phi) * Math.cos(theta);
            pos[i + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i + 2] = r * Math.cos(phi);
        }
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const mat = new THREE.PointsMaterial({ color: 0xf43f5e, size: 2.2, transparent: true, opacity: 0.8 });
        group.add(new THREE.Points(geo, mat));

        // Translucent horizon shell
        const horizon = new THREE.Mesh(new THREE.SphereGeometry(50, 32, 32), new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.15 }));
        group.add(horizon);

    } else if (ent.type === "dna") {
        // Accurate Double Helix with Base Pair Rungs
        for (let i = -18; i <= 18; i++) {
            const angle = i * 0.45;
            const y = i * 1.4;
            const x1 = Math.cos(angle) * 7;
            const z1 = Math.sin(angle) * 7;
            const x2 = Math.cos(angle + Math.PI) * 7;
            const z2 = Math.sin(angle + Math.PI) * 7;

            // Strand backbone spheres
            const s1 = new THREE.Mesh(new THREE.SphereGeometry(0.9, 12, 12), new THREE.MeshStandardMaterial({ color: 0x10b981 }));
            s1.position.set(x1, y, z1);
            group.add(s1);

            const s2 = new THREE.Mesh(new THREE.SphereGeometry(0.9, 12, 12), new THREE.MeshStandardMaterial({ color: 0x06b6d4 }));
            s2.position.set(x2, y, z2);
            group.add(s2);

            // Base pair cross bar
            if (i % 2 === 0) {
                const cylGeom = new THREE.CylinderGeometry(0.35, 0.35, 14, 8);
                const bar = new THREE.Mesh(cylGeom, new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
                bar.position.set(0, y, 0);
                bar.rotation.z = Math.PI / 2;
                bar.rotation.y = -angle;
                group.add(bar);
            }
        }

    } else if (ent.type === "cell") {
        // Detailed Eukaryotic Cell with Nucleus & Organelles
        const membrane = new THREE.Mesh(new THREE.SphereGeometry(22, 32, 32), new THREE.MeshStandardMaterial({ color: 0x84cc16, transparent: true, opacity: 0.4, roughness: 0.2 }));
        group.add(membrane);

        const nucleus = new THREE.Mesh(new THREE.SphereGeometry(8, 24, 24), new THREE.MeshStandardMaterial({ color: 0xa855f7 }));
        group.add(nucleus);

        // Mitochondria beans
        [ [10, 6, 4], [-11, -5, 6], [5, -12, -4] ].forEach(pos => {
            const mito = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 6, 12), new THREE.MeshStandardMaterial({ color: 0xe11d48 }));
            mito.position.set(pos[0], pos[1], pos[2]);
            mito.rotation.x = Math.PI / 3;
            group.add(mito);
        });

    } else if (ent.type === "atom") {
        // Realistic Hydrogen atom: Quantum Probability Orbitals
        const nucleus = new THREE.Mesh(new THREE.SphereGeometry(3.5, 16, 16), new THREE.MeshStandardMaterial({ color: 0xef4444 }));
        group.add(nucleus);

        const pCount = 1200;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount * 3; i += 3) {
            const rad = 14 + (Math.random() - 0.5) * 8;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            pPos[i] = rad * Math.sin(phi) * Math.cos(theta);
            pPos[i + 1] = rad * Math.sin(phi) * Math.sin(theta);
            pPos[i + 2] = rad * Math.cos(phi);
        }
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const pMat = new THREE.PointsMaterial({ color: 0x38bdf8, size: 1.5, transparent: true, opacity: 0.6 });
        group.add(new THREE.Points(pGeo, pMat));

    } else {
        // Quarks / Quantum Foam Default Realistic
        const geom = new THREE.IcosahedronGeometry(18, 2);
        const mat = new THREE.MeshStandardMaterial({ color: ent.color3D, roughness: 0.3, metalness: 0.4 });
        group.add(new THREE.Mesh(geom, mat));
    }
}

function buildPolyAssetEntity(ent, group) {
    // Stylized Low-Poly Wireframe Geometry & Poly-Assets
    if (ent.type === "earth" || ent.type === "planet") {
        const geom = new THREE.IcosahedronGeometry(22, 1); // Faceted low poly
        const mat = new THREE.MeshStandardMaterial({ color: ent.color3D, flatShading: true, roughness: 0.6 });
        group.add(new THREE.Mesh(geom, mat));
        group.add(new THREE.Mesh(geom, new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true })));

    } else if (ent.type === "sun" || ent.type === "star") {
        const geom = new THREE.DodecahedronGeometry(26, 1);
        const mat = new THREE.MeshStandardMaterial({ color: ent.color3D, flatShading: true });
        group.add(new THREE.Mesh(geom, mat));
        group.add(new THREE.Mesh(geom, new THREE.MeshBasicMaterial({ color: 0xfffa65, wireframe: true })));

    } else if (ent.type === "solar_system") {
        const sun = new THREE.Mesh(new THREE.OctahedronGeometry(8, 0), new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true }));
        group.add(sun);
        [16, 28, 42].forEach((r, idx) => {
            const p = new THREE.Mesh(new THREE.TetrahedronGeometry(3, 0), new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true }));
            p.position.set(r, 0, 0);
            group.add(p);
        });

    } else if (ent.type === "human") {
        // Blocky Low-Poly Robot Figure
        const body = new THREE.Mesh(new THREE.BoxGeometry(10, 20, 6), new THREE.MeshStandardMaterial({ color: 0x38bdf8, flatShading: true }));
        const head = new THREE.Mesh(new THREE.BoxGeometry(6, 6, 6), new THREE.MeshStandardMaterial({ color: 0xfacc15, flatShading: true }));
        head.position.y = 14;
        group.add(body);
        group.add(head);

    } else if (ent.type === "mountain") {
        const geom = new THREE.ConeGeometry(24, 32, 5); // 5-sided pyramid
        const mat = new THREE.MeshStandardMaterial({ color: 0x64748b, flatShading: true });
        group.add(new THREE.Mesh(geom, mat));

    } else {
        // Default Poly Polyhedron
        const geom = new THREE.DodecahedronGeometry(20, 0);
        const mat = new THREE.MeshStandardMaterial({ color: ent.color3D, flatShading: true, wireframe: ent.type === "quantum" });
        group.add(new THREE.Mesh(geom, mat));
    }
}

function updateViewStyleVisibility() {
    threeObjects.forEach(root => {
        if (activeViewStyle === "realistic") {
            root.userData.realGroup.visible = true;
            root.userData.polyGroup.visible = false;
        } else {
            root.userData.realGroup.visible = false;
            root.userData.polyGroup.visible = true;
        }
    });
}

function update3DScene() {
    if (activeMode !== "3d") return;

    threeObjects.forEach(root => {
        const ent = root.userData.entity;
        const delta = ent.exponent - currentLog;

        // Proximity calculation
        const scaleFactor = Math.pow(10, -Math.abs(delta) * 0.7);
        const zDistance = delta * 45;

        root.position.set(0, 0, -zDistance);
        root.scale.setScalar(Math.max(0.001, scaleFactor * 1.5));

        const opacity = Math.max(0, 1 - Math.abs(delta) / 2.5);
        root.visible = opacity > 0.01;

        // Smooth rotation
        root.rotation.y += 0.007;
        root.rotation.x += 0.003;
    });

    if (starField) {
        starField.rotation.y += 0.0003;
    }

    renderer3D.render(scene3D, camera3D);
}

// -------------------------------------------------------------
// 4. OPTIMIZED 2D CANVAS SIMULATOR (LOW-END MODE)
// -------------------------------------------------------------
function resize2DCanvas() {
    twoCanvas.width = window.innerWidth;
    twoCanvas.height = window.innerHeight;
}

let twoTick = 0;
function render2D() {
    if (activeMode !== "2d") return;
    twoTick++;

    twoCtx.clearRect(0, 0, twoCanvas.width, twoCanvas.height);

    const centerX = twoCanvas.width / 2;
    const centerY = twoCanvas.height / 2;

    // Tactical HUD Coordinate Grid lines
    twoCtx.strokeStyle = "rgba(56, 189, 248, 0.07)";
    twoCtx.lineWidth = 1;
    const gridSpacing = 60;
    for (let x = 0; x < twoCanvas.width; x += gridSpacing) {
        twoCtx.beginPath();
        twoCtx.moveTo(x, 0);
        twoCtx.lineTo(x, twoCanvas.height);
        twoCtx.stroke();
    }
    for (let y = 0; y < twoCanvas.height; y += gridSpacing) {
        twoCtx.beginPath();
        twoCtx.moveTo(0, y);
        twoCtx.lineTo(twoCanvas.width, y);
        twoCtx.stroke();
    }

    // Concentric orbital rings & vector diagrams
    cosmicEntities.forEach(ent => {
        const delta = ent.exponent - currentLog;
        if (Math.abs(delta) > 3.2) return;

        const visualRadius = Math.pow(10, -delta) * 140;
        const alpha = Math.max(0, 1 - Math.abs(delta) / 2.8);

        twoCtx.save();
        twoCtx.translate(centerX, centerY);

        // Vector Ring
        twoCtx.strokeStyle = ent.color2D;
        twoCtx.globalAlpha = alpha;
        twoCtx.lineWidth = Math.max(1.5, 3 - Math.abs(delta));
        twoCtx.beginPath();
        twoCtx.arc(0, 0, Math.max(8, visualRadius), 0, Math.PI * 2);
        twoCtx.stroke();

        // Fill disc if close
        if (visualRadius > 10 && visualRadius < 350) {
            twoCtx.fillStyle = ent.color2D;
            twoCtx.globalAlpha = alpha * 0.15;
            twoCtx.fill();
        }

        // Labels
        if (alpha > 0.4 && visualRadius > 15) {
            twoCtx.globalAlpha = alpha;
            const labelX = Math.cos(twoTick * 0.01 + ent.exponent) * (visualRadius + 14);
            const labelY = Math.sin(twoTick * 0.01 + ent.exponent) * (visualRadius + 14);

            twoCtx.fillStyle = "#ffffff";
            twoCtx.font = "bold 13px Orbitron";
            twoCtx.fillText(ent.name.toUpperCase(), labelX, labelY);

            twoCtx.fillStyle = "#38bdf8";
            twoCtx.font = "11px Rajdhani";
            twoCtx.fillText(`10^${ent.exponent}m`, labelX, labelY + 14);
        }

        twoCtx.restore();
    });
}

// -------------------------------------------------------------
// 5. TELEMETRY & HUD METRICS UPDATE
// -------------------------------------------------------------
function updateHUD() {
    scalePill.textContent = `SCALE: 10^${currentLog.toFixed(2)} m`;
    zoomSlider.value = currentLog;

    let closest = cosmicEntities[0];
    let minDiff = Infinity;
    cosmicEntities.forEach(ent => {
        const diff = Math.abs(currentLog - ent.exponent);
        if (diff < minDiff) {
            minDiff = diff;
            closest = ent;
        }
    });

    targetName.textContent = closest.name;
    targetCategory.textContent = closest.category;
    targetExponent.textContent = `10^${closest.exponent} METERS (${formatMeters(closest.sizeMeters)})`;
    targetDesc.textContent = closest.desc;

    targetTags.innerHTML = '';
    closest.tags.forEach(t => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = t;
        targetTags.appendChild(span);
    });

    const curMeters = Math.pow(10, currentLog);
    telDist.textContent = formatMeters(curMeters);

    const lightSpeed = 299792458; // m/s
    const lightTimeSec = curMeters / lightSpeed;
    if (lightTimeSec < 1e-6) {
        telLight.textContent = (lightTimeSec * 1e9).toFixed(2) + " ns";
    } else if (lightTimeSec < 1) {
        telLight.textContent = (lightTimeSec * 1e3).toFixed(2) + " ms";
    } else if (lightTimeSec < 60) {
        telLight.textContent = lightTimeSec.toFixed(2) + " sec";
    } else if (lightTimeSec < 3600) {
        telLight.textContent = (lightTimeSec / 60).toFixed(1) + " min";
    } else if (lightTimeSec < 86400 * 365) {
        telLight.textContent = (lightTimeSec / 86400).toFixed(1) + " days";
    } else {
        telLight.textContent = (lightTimeSec / (86400 * 365.25)).toFixed(1) + " ly";
    }

    telJitter.textContent = (Math.sin(currentLog * 4) * 0.0004 + 0.0005).toFixed(6) + "%";
}

function formatMeters(m) {
    if (m < 1e-12) return m.toExponential(2) + " m";
    if (m < 1e-9) return (m * 1e12).toFixed(2) + " pm";
    if (m < 1e-6) return (m * 1e9).toFixed(2) + " nm";
    if (m < 1e-3) return (m * 1e6).toFixed(2) + " µm";
    if (m < 1) return (m * 100).toFixed(1) + " cm";
    if (m < 1e3) return m.toFixed(2) + " m";
    if (m < 1e6) return (m / 1e3).toFixed(2) + " km";
    if (m < 1e12) return (m / 1e6).toFixed(1) + " × 10⁶ m";
    return m.toExponential(2) + " m";
}

// -------------------------------------------------------------
// 6. EVENT LISTENERS & SMOOTH CONTROLS
// -------------------------------------------------------------
zoomSlider.addEventListener('input', (e) => {
    currentLog = parseFloat(e.target.value);
    updateHUD();
});

window.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * 0.0035;
    currentLog = Math.max(-18, Math.min(27, currentLog + zoomDelta));
    updateHUD();
}, { passive: false });

document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetExp = parseFloat(btn.dataset.target);
        smoothTransitionTo(targetExp);
    });
});

function smoothTransitionTo(targetExp) {
    const start = currentLog;
    const duration = 600;
    const startTime = performance.now();

    function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        currentLog = start + (targetExp - start) * ease;
        updateHUD();

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}

// 3D vs 2D Engine Toggle
btn3d.addEventListener('click', () => {
    activeMode = "3d";
    btn3d.classList.add('active');
    btn2d.classList.remove('active');
    threeContainer.classList.remove('hidden');
    twoCanvas.classList.add('hidden');
});

btn2d.addEventListener('click', () => {
    activeMode = "2d";
    btn2d.classList.add('active');
    btn3d.classList.remove('active');
    twoCanvas.classList.remove('hidden');
    threeContainer.classList.add('hidden');
});

// View Type: Realistic vs Poly-Asset Toggle
btnStyleRealistic.addEventListener('click', () => {
    activeViewStyle = "realistic";
    btnStyleRealistic.classList.add('active');
    btnStylePoly.classList.remove('active');
    updateViewStyleVisibility();
});

btnStylePoly.addEventListener('click', () => {
    activeViewStyle = "poly";
    btnStylePoly.classList.add('active');
    btnStyleRealistic.classList.remove('active');
    updateViewStyleVisibility();
});

// Window Resize Handling
window.addEventListener('resize', () => {
    if (camera3D && renderer3D) {
        camera3D.aspect = window.innerWidth / window.innerHeight;
        camera3D.updateProjectionMatrix();
        renderer3D.setSize(window.innerWidth, window.innerHeight);
    }
    resize2DCanvas();
});

// -------------------------------------------------------------
// 7. MAIN ENGINE ANIMATION LOOP
// -------------------------------------------------------------
function mainLoop() {
    if (activeMode === "3d") {
        update3DScene();
    } else {
        render2D();
    }
    requestAnimationFrame(mainLoop);
}

// Initial Boot Sequence
init3D();
resize2DCanvas();
updateHUD();
mainLoop();
