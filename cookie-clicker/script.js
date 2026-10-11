let score = 0;
let clickPower = 1;
let cps = 0;
let totalClicks = 0;
let unlockedAchievements = new Set();

const baseBuildings = [
    { name: 'Cursor', baseCost: 15, baseBps: 0.1 },
    { name: 'Grandma', baseCost: 100, baseBps: 1 },
    { name: 'Farm', baseCost: 1100, baseBps: 8 },
    { name: 'Mine', baseCost: 12000, baseBps: 47 },
    { name: 'Factory', baseCost: 130000, baseBps: 260 },
    { name: 'Bank', baseCost: 1400000, baseBps: 1400 },
    { name: 'Temple', baseCost: 20000000, baseBps: 7800 },
    { name: 'Wizard Tower', baseCost: 330000000, baseBps: 44000 },
    { name: 'Shipment', baseCost: 5100000000, baseBps: 260000 },
    { name: 'Alchemy Lab', baseCost: 75000000000, baseBps: 1600000 },
    { name: 'Portal', baseCost: 1000000000000, baseBps: 10000000 },
    { name: 'Time Machine', baseCost: 14000000000000, baseBps: 65000000 },
    { name: 'Antimatter Condenser', baseCost: 170000000000000, baseBps: 430000000 },
    { name: 'Prism', baseCost: 2100000000000000, baseBps: 2900000000 },
    { name: 'Chancemaker', baseCost: 26000000000000000, baseBps: 21000000000 },
    { name: 'Fractal Engine', baseCost: 310000000000000000, baseBps: 150000000000 },
    { name: 'Javascript Console', baseCost: 71000000000000000000, baseBps: 1100000000000 },
    { name: 'Idleverse', baseCost: 12000000000000000000000, baseBps: 8300000000000 },
    { name: 'Cortex Baker', baseCost: 1900000000000000000000000, baseBps: 64000000000000 },
    { name: 'You', baseCost: 540000000000000000000000000, baseBps: 510000000000000 }
];

const tiers = [
    { prefix: '', costMult: 1, bpsMult: 1 },
    { prefix: 'Super ', costMult: 1e5, bpsMult: 1e4 },
    { prefix: 'Quantum ', costMult: 1e10, bpsMult: 1e8 },
    { prefix: 'Galactic ', costMult: 1e15, bpsMult: 1e12 },
    { prefix: 'Dark Matter ', costMult: 1e20, bpsMult: 1e16 }
];

const upgrades = [];
let upgradeId = 0;
tiers.forEach(tier => {
    baseBuildings.forEach(base => {
        upgrades.push({
            id: 'b' + upgradeId++,
            name: tier.prefix + base.name,
            cost: base.baseCost * tier.costMult,
            bps: base.baseBps * tier.bpsMult,
            count: 0
        });
    });
});

const achievements = [];
// Clicks achievements
[1, 10, 100, 1000, 10000, 100000].forEach(clicks => {
    achievements.push({
        id: 'click_' + clicks,
        name: `Clicker Novice to God (${clicks})`,
        desc: `Click the cookie ${clicks} times.`,
        condition: () => totalClicks >= clicks
    });
});
// Building milestones
upgrades.forEach(u => {
    [1, 10, 50].forEach(amount => {
        achievements.push({
            id: `build_${u.id}_${amount}`,
            name: `${u.name} x${amount}`,
            desc: `Own ${amount} ${u.name}s.`,
            condition: () => u.count >= amount
        });
    });
});

const scoreEl = document.getElementById('score');
const cpsEl = document.getElementById('cps');
const cookieBtn = document.getElementById('cookie-btn');
const upgradesContainer = document.getElementById('upgrades');
const achievementsContainer = document.getElementById('achievements');
const achievementCountEl = document.getElementById('achievement-count');
const resetBtn = document.getElementById('reset-btn');

function saveGame() {
    const gameState = { score, upgrades, totalClicks, unlocked: Array.from(unlockedAchievements) };
    localStorage.setItem('cookieClickerSave', JSON.stringify(gameState));
}

function loadGame() {
    const save = localStorage.getItem('cookieClickerSave');
    if (save) {
        const parsed = JSON.parse(save);
        score = parsed.score || 0;
        totalClicks = parsed.totalClicks || 0;
        if (parsed.unlocked) {
            unlockedAchievements = new Set(parsed.unlocked);
        }
        if (parsed.upgrades) {
            parsed.upgrades.forEach((savedUpgrade, index) => {
                if (upgrades[index]) {
                    upgrades[index].cost = savedUpgrade.cost;
                    upgrades[index].count = savedUpgrade.count;
                }
            });
        }
    }
    calculateCps();
    updateUI();
    renderAchievements();
}

function calculateCps() {
    cps = upgrades.reduce((total, upgrade) => total + (upgrade.bps * upgrade.count), 0);
    cpsEl.textContent = cps.toFixed(1);
    
    // Intense visual logic
    let duration = 10;
    if (cps > 0) duration = Math.max(0.1, 100 / cps);
    cookieBtn.style.animation = cps > 0 ? `spin ${duration}s linear infinite` : 'none';

    if (cps > 1000) {
        document.body.classList.add('shake');
    } else {
        document.body.classList.remove('shake');
    }
    
    if (cps > 10000) {
        document.body.classList.add('flash');
    } else {
        document.body.classList.remove('flash');
    }
}

let upgradesRendered = false;

function updateUI() {
    scoreEl.textContent = Math.floor(score);
    
    if (!upgradesRendered) {
        upgradesContainer.innerHTML = '';
        upgrades.forEach((u, index) => {
            const div = document.createElement('div');
            div.id = `upgrade-${index}`;
            div.className = `upgrade-item ${score < u.cost ? 'disabled' : ''}`;
            div.onclick = () => buyUpgrade(index);
            div.innerHTML = `
                <div>
                    <strong>${u.name}</strong> (<span id="upgrade-count-${index}">${u.count}</span>)<br>
                    <small>Cost: <span id="upgrade-cost-${index}">${Math.floor(u.cost)}</span> | +${u.bps} CPS</small>
                </div>
            `;
            upgradesContainer.appendChild(div);
        });
        upgradesRendered = true;
    } else {
        // Just update classes and texts
        upgrades.forEach((u, index) => {
            const div = document.getElementById(`upgrade-${index}`);
            if (div) {
                if (score < u.cost) {
                    div.classList.add('disabled');
                } else {
                    div.classList.remove('disabled');
                }
                document.getElementById(`upgrade-count-${index}`).textContent = u.count;
                document.getElementById(`upgrade-cost-${index}`).textContent = Math.floor(u.cost);
            }
        });
    }
}

function renderAchievements() {
    achievementsContainer.innerHTML = '';
    achievementCountEl.textContent = unlockedAchievements.size;
    achievements.forEach(a => {
        if (unlockedAchievements.has(a.id)) {
            const div = document.createElement('div');
            div.className = 'achievement-item';
            div.innerHTML = `
                <div class="icon">🏆</div>
                <div class="details">
                    <h4>${a.name}</h4>
                    <p>${a.desc}</p>
                </div>
            `;
            achievementsContainer.appendChild(div);
        }
    });
}

function checkAchievements() {
    let newUnlock = false;
    achievements.forEach(a => {
        if (!unlockedAchievements.has(a.id) && a.condition()) {
            unlockedAchievements.add(a.id);
            newUnlock = true;
        }
    });
    if (newUnlock) {
        renderAchievements();
    }
}

function buyUpgrade(index) {
    const u = upgrades[index];
    if (score >= u.cost) {
        score -= u.cost;
        u.count++;
        u.cost *= 1.15;
        calculateCps();
        updateUI();
        checkAchievements();
        saveGame();
    }
}

cookieBtn.addEventListener('click', (e) => {
    score += clickPower;
    totalClicks++;
    
    // Spawn particle
    for(let i=0; i<5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        const tx = (Math.random() - 0.5) * 200;
        const ty = (Math.random() - 0.5) * 200;
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
    
    updateUI();
    checkAchievements();
    saveGame();
});

resetBtn.addEventListener('click', () => {
    localStorage.removeItem('cookieClickerSave');
    location.reload();
});

setInterval(() => {
    score += cps / 10;
    updateUI();
    checkAchievements();
    if (Math.random() < 0.1) saveGame();
}, 100);

loadGame();
