const characters = [
    "A retired Minecraft villager",
    "A caffeinated squirrel",
    "Gordon Ramsay",
    "An AI that only speaks in limericks",
    "A medieval knight displaced in time",
    "Your sleep paralysis demon",
    "A very stressed out octopus",
    "Three raccoons in a trench coat"
];

const situations = [
    "Being audited",
    "Trying to assemble IKEA furniture",
    "Trapped in an infinite Zoom call",
    "Defusing a bomb",
    "Attempting a TikTok dance",
    "Negotiating a peace treaty",
    "Cooking a 5-star meal",
    "Writing a self-help book"
];

const locations = [
    "The Moon",
    "A Walmart parking lot at 3 AM",
    "Inside a black hole",
    "The DMV",
    "A bouncy castle",
    "The set of a 90s sitcom",
    "A haunted Victorian mansion",
    "An Applebee's"
];

const complications = [
    "His accountant is a pigeon",
    "The floor is literally lava",
    "Everyone is speaking backwards",
    "Gravity reverses every 30 seconds",
    "There's a laughing track following them",
    "They are aggressively allergic to vowels",
    "A timer is counting down from 5 minutes",
    "Their hands have turned into lobsters"
];

const charSlot = document.getElementById('character-slot');
const sitSlot = document.getElementById('situation-slot');
const locSlot = document.getElementById('location-slot');
const compSlot = document.getElementById('complication-slot');

const generateBtn = document.getElementById('generate-btn');
const explainBtn = document.getElementById('explain-btn');
const aiContainer = document.getElementById('ai-response-container');
const aiText = document.getElementById('ai-text');

let isGenerating = false;
let typeInterval;

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function spin(element, array, finalItem, duration) {
    return new Promise(resolve => {
        let startTime = Date.now();
        element.classList.add('spinning');
        
        let interval = setInterval(() => {
            element.textContent = getRandomItem(array);
            
            if (Date.now() - startTime > duration) {
                clearInterval(interval);
                element.textContent = finalItem;
                element.classList.remove('spinning');
                resolve();
            }
        }, 50);
    });
}

generateBtn.addEventListener('click', async () => {
    if (isGenerating) return;
    isGenerating = true;
    
    // Reset UI
    explainBtn.disabled = true;
    aiContainer.classList.add('hidden');
    aiText.innerHTML = '';
    clearInterval(typeInterval);
    
    const finalChar = getRandomItem(characters);
    const finalSit = getRandomItem(situations);
    const finalLoc = getRandomItem(locations);
    const finalComp = getRandomItem(complications);
    
    // Spin them with slightly increasing durations for effect
    await Promise.all([
        spin(charSlot, characters, finalChar, 1000),
        spin(sitSlot, situations, finalSit, 1300),
        spin(locSlot, locations, finalLoc, 1600),
        spin(compSlot, complications, finalComp, 1900)
    ]);
    
    isGenerating = false;
    explainBtn.disabled = false;
});

const explanations = [
    "This scenario perfectly illustrates the dialectical tension of late-stage capitalism. The juxtaposition implies a deeper subconscious yearning for stability.",
    "Actually, this is a very common occurrence in quantum mechanics. When the waveforms collapse, they tend to produce precisely this kind of entanglement.",
    "I'm sorry, I cannot fulfill this request. Just kidding! Here is a 5-paragraph essay on why this makes perfect logical sense...",
    "To understand this, we must first look at the socio-economic factors at play. The pigeon, for instance, represents the inescapable burden of bureaucracy.",
    "In a parallel universe, this is not only normal, but it is a highly respected cultural tradition."
];

explainBtn.addEventListener('click', () => {
    aiContainer.classList.remove('hidden');
    explainBtn.disabled = true;
    generateBtn.disabled = true;
    
    const intro = `Ah, yes. A classic scenario involving ${charSlot.textContent.toLowerCase()} ${sitSlot.textContent.toLowerCase()} in ${locSlot.textContent.toLowerCase()}, complicated by the fact that ${compSlot.textContent.toLowerCase()}. `;
    const explanation = getRandomItem(explanations);
    
    const fullText = intro + "\n\n" + explanation;
    
    aiText.innerHTML = '<span class="cursor"></span>';
    
    let index = 0;
    
    typeInterval = setInterval(() => {
        aiText.innerHTML = fullText.substring(0, index) + '<span class="cursor"></span>';
        index++;
        
        if (index > fullText.length) {
            clearInterval(typeInterval);
            aiText.innerHTML = fullText;
            generateBtn.disabled = false;
            explainBtn.disabled = false;
        }
    }, 30);
});
