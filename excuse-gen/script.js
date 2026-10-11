const whoArray = [
    "My time-traveling cat",
    "The ghost of Abraham Lincoln",
    "A highly coordinated team of squirrels",
    "My evil twin from a parallel dimension",
    "A confused alien tourist",
    "The sentient fungus growing in my fridge",
    "An army of rogue Roombas",
    "My future self",
    "A wizard who took a wrong turn",
    "The Loch Ness Monster"
];

const actionArray = [
    "accidentally deleted",
    "swallowed",
    "set fire to",
    "teleported",
    "vaporized",
    "tried to deep-fry",
    "hijacked",
    "put a hex on",
    "dismantled",
    "ran off with"
];

const targetArray = [
    "the concept of gravity",
    "my router",
    "the sun",
    "my left shoe",
    "the entire internet",
    "my sense of direction",
    "the space-time continuum",
    "my motivation",
    "the local power grid",
    "my alarm clock"
];

const resultArray = [
    "so I have to apologize to Isaac Newton.",
    "so I'm currently fighting a bear.",
    "which means I'm stuck in the 4th dimension until Tuesday.",
    "so I need to wait for the universe to reboot.",
    "and now I'm being interrogated by the Men in Black.",
    "so I have to go on an epic quest to retrieve it.",
    "which left me questioning the nature of reality.",
    "so I am communicating with you via telepathy right now.",
    "and honestly, it's a whole legal nightmare.",
    "so I'm hiding in a bunker eating canned beans."
];

const excuseText = document.getElementById('excuse-text');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateExcuse() {
    const who = getRandomElement(whoArray);
    const action = getRandomElement(actionArray);
    const target = getRandomElement(targetArray);
    const result = getRandomElement(resultArray);

    const excuse = `${who} ${action} ${target}, ${result}`;
    excuseText.textContent = excuse;
    copyBtn.disabled = false;
}

function copyToClipboard() {
    if (copyBtn.disabled) return;
    
    const textToCopy = excuseText.textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
        showToast();
    }).catch(err => {
        console.error("Failed to copy text: ", err);
        // Fallback
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        showToast();
    });
}

function showToast() {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = 'Copied to clipboard!';
        document.body.appendChild(toast);
    }
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

generateBtn.addEventListener('click', generateExcuse);
copyBtn.addEventListener('click', copyToClipboard);
