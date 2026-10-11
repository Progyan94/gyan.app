const content = document.getElementById('content');
const loader = document.getElementById('loader');

const subjects = ["A swarm of bees", "The ghost of a Victorian baker", "A sentient toaster", "Your left shoe", "The moon", "A rogue AI", "A collective of highly intelligent squirrels", "The concept of time", "A forgotten 90s boy band", "The color purple"];
const actions = ["was elected mayor of", "secretly controls", "has been dreaming about", "is legally married to", "can communicate telepathically with", "invented a new flavor of", "was found guilty of stealing", "has a severe allergy to", "is the true author of", "once challenged to a duel"];
const objects = ["a parallel universe.", "the internet.", "a flock of flamingos.", "the feeling of deja vu.", "a very confused penguin.", "the global supply of cheese.", "an ancient prophecy.", "a mildly successful podcast.", "a cursed karaoke machine.", "the concept of zero."];

function generateFact() {
    const s = subjects[Math.floor(Math.random() * subjects.length)];
    const a = actions[Math.floor(Math.random() * actions.length)];
    const o = objects[Math.floor(Math.random() * objects.length)];
    return `${s} ${a} ${o}`;
}

function loadItems(count = 5) {
    for (let i = 0; i < count; i++) {
        const card = document.createElement('div');
        card.className = 'fact-card';
        card.innerText = generateFact();
        content.appendChild(card);
    }
}

// Initial load
loadItems(10);

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        // Load more items when near bottom
        setTimeout(() => {
            loadItems(5);
        }, 500);
    }
});
