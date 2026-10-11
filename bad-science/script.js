const discoveries = [
    "Bananas generate Wi-Fi when exposed to jazz.",
    "Drinking 8 glasses of water a day turns your bones to liquid.",
    "The moon is actually a giant mirror reflecting a smaller, hidden earth.",
    "Eating cheese before bed summons parallel universe versions of yourself.",
    "Cats purr at the exact frequency needed to hack into Pentagon mainframes.",
    "If you sneeze with your eyes open, you take a screenshot of your vision.",
    "Yawning is just your brain releasing excess ghost particles.",
    "Gravity is a myth; the Earth just sucks.",
    "Trees communicate using a complex network of underground Wi-Fi signals.",
    "Putting a spoon in the microwave creates a temporary black hole."
];

const discoveryElement = document.getElementById('discovery');
const generateBtn = document.getElementById('generate-btn');
const cursedSection = document.getElementById('cursed-section');
const cursedBtns = document.querySelectorAll('.cursed-btn');
const feedbackElement = document.getElementById('feedback');

generateBtn.addEventListener('click', () => {
    const randomDiscovery = discoveries[Math.floor(Math.random() * discoveries.length)];
    discoveryElement.textContent = `"${randomDiscovery}"`;
    cursedSection.classList.remove('hidden');
    feedbackElement.textContent = '';
});

cursedBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const rating = e.target.textContent;
        feedbackElement.textContent = `You rated this: ${rating}!`;
    });
});
