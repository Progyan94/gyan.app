const debrisNames = [
    "Lost USB Drive",
    "Alien Tupperware",
    "Elon's Car Key",
    "Astro-Dog's Toy",
    "Left Space Boot",
    "Rogue Satellite",
    "Pizza Box from 1998",
    "Space Tool Kit",
    "Soviet Calculator",
    "Abandoned Wifi Router"
];

const container = document.getElementById('debris-container');
const list = document.getElementById('debris-list');

const center = 200;
const radius = 180;

function spawnDebris() {
    container.innerHTML = '';
    list.innerHTML = '';
    
    const count = Math.floor(Math.random() * 4) + 3; // 3 to 6 debris
    
    for (let i = 0; i < count; i++) {
        // Random position within circle
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * radius;
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        
        // Calculate delay based on angle to sync with sweep (starts top right, clockwise)
        let angleDeg = (angle * 180 / Math.PI) - 90;
        if (angleDeg < 0) angleDeg += 360;
        const delay = (angleDeg / 360) * 4; // 4s sweep time
        
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        dot.style.animationDelay = `${delay}s`;
        
        container.appendChild(dot);
        
        // Add to list
        const name = debrisNames[Math.floor(Math.random() * debrisNames.length)];
        const li = document.createElement('li');
        li.textContent = `Target ${i+1}: ${name} [${Math.round(x)}, ${Math.round(y)}]`;
        list.appendChild(li);
    }
}

// Initial spawn
spawnDebris();

// Respawn occasionally
setInterval(spawnDebris, 12000);
