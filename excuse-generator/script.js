const intros = [
    "I deeply apologize, but",
    "You're not going to believe this, but",
    "It pains me to say that",
    "Due to unforeseen circumstances,",
    "As wild as it sounds,",
    "I was on my way, but suddenly",
    "Please forgive me, but"
];

const subjects = [
    "a highly classified government drone",
    "my neighbor's radioactive iguana",
    "a rogue time traveler from the 24th century",
    "a sentient sourdough starter",
    "an army of hyper-intelligent squirrels",
    "the ghost of Abraham Lincoln",
    "a sudden localized tear in the space-time continuum"
];

const actions = [
    "confiscated my shoes",
    "hacked into my mainframe and deleted my assignment",
    "challenged me to a high-stakes breakdancing battle",
    "trapped me in a multidimensional pocket universe",
    "demanded I explain the entire plot of Shrek in Latin",
    "mistook my backpack for a mystical artifact",
    "held me hostage with a laser pointer"
];

const conclusions = [
    "and I had to negotiate my release using interpretive dance.",
    "so I was forced to forge a new identity and lay low.",
    "which naturally required an immediate exorcism.",
    "meaning I was physically incapable of leaving my kitchen.",
    "and the FBI advised me to stay absolutely still until further notice.",
    "so I'm currently stranded on the astral plane.",
    "which left me questioning the very nature of reality."
];

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateExcuse() {
    const intro = getRandomElement(intros);
    const subject = getRandomElement(subjects);
    const action = getRandomElement(actions);
    const conclusion = getRandomElement(conclusions);

    const excuse = `${intro} ${subject} ${action}, ${conclusion}`;
    
    document.getElementById('excuse-text').innerText = excuse;
}

document.getElementById('generate-btn').addEventListener('click', generateExcuse);
