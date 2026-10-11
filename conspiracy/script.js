const nouns = [
    "5G towers", "fluoride", "cryptocurrency", "chemtrails", "birds", 
    "the matrix", "vaccines", "microchips", "the moon landing", "crop circles",
    "the Pyramids", "Stonehenge", "the Denver Airport", "the internet", "social media",
    "smartphones", "AI", "the global elite", "tap water", "the ozone layer",
    "the Mandela Effect", "Bitcoin", "the deep state", "hollow Earth", "flat Earth",
    "the simulation", "ancient texts", "UFOs", "weather control machines", "subliminal messages"
];

const organizations = [
    "The Illuminati", "The CIA", "The FBI", "NASA", "The Freemasons",
    "Lizard People", "The Knights Templar", "The Men in Black", "The World Economic Forum",
    "Big Pharma", "Big Tech", "The secret government", "The reptilian overlords",
    "The New World Order", "The shadow government", "The UN", "Silicon Valley billionaires"
];

const historicalFigures = [
    "Abraham Lincoln", "Nikola Tesla", "JFK", "Albert Einstein", "Leonardo da Vinci",
    "Cleopatra", "Julius Caesar", "George Washington", "Amelia Earhart", "Genghis Khan",
    "Elvis Presley", "Marilyn Monroe", "Shakespeare", "Mozart", "Isaac Newton"
];

const locations = [
    "Area 51", "Atlantis", "the Bermuda Triangle", "the North Pole", "the Mariana Trench",
    "a secret underground bunker", "Mars", "the dark side of the moon", "the Pentagon",
    "Antarctica", "a parallel universe", "the 4th dimension", "the Vatican archives"
];

const verbs = [
    "invented", "hid", "destroyed", "manipulated", "covered up",
    "secretly funded", "worshipped", "weaponized", "communicated with", "stole",
    "cloned", "time-traveled to change", "suppressed the truth about", "faked", "brainwashed us using"
];

const reasons = [
    "to control our minds.", "to establish a New World Order.", "because the Earth is flat.",
    "to harvest our energy.", "to hide the simulation we live in.", "to prepare for the alien invasion.",
    "because they are actually vampires.", "to keep us from ascending to the 5th dimension.", "to manipulate the stock market.",
    "to cover up their own existence.", "so we never discover our true power.", "to fuel their secret spaceships.",
    "as part of a multi-century social experiment.", "because an ancient prophecy foretold it."
];

const adjectives = [
    "mind-controlling", "interdimensional", "radioactive", "holographic", "synthetic",
    "telepathic", "extraterrestrial", "ancient", "super-secret", "cybernetic"
];

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateTheory() {
    const templates = [
        // Standard
        () => `${getRandom(organizations)} ${getRandom(verbs)} ${getRandom(nouns)} ${getRandom(reasons)}`,
        
        // Reddit-style
        () => `Hear me out guys: ${getRandom(historicalFigures)} didn't die. They were taken to ${getRandom(locations)} by ${getRandom(organizations)} ${getRandom(reasons)}`,
        
        // Frantic warning
        () => `WAKE UP! The ${getRandom(adjectives)} ${getRandom(nouns)} are a distraction! ${getRandom(organizations)} is actually hiding in ${getRandom(locations)}!`,
        
        // Academic/Documentary style
        () => `Recent declassified documents reveal that in 1947, ${getRandom(organizations)} actively ${getRandom(verbs)} ${getRandom(nouns)} in ${getRandom(locations)}.`,
        
        // The "It all connects" theory
        () => `You think ${getRandom(nouns)} and ${getRandom(nouns)} are unrelated? Wrong. ${getRandom(historicalFigures)} knew the truth, which is why ${getRandom(organizations)} silenced them.`,
        
        // The Tech paranoia
        () => `Every time you use ${getRandom(nouns)}, you're sending data directly to ${getRandom(locations)}. It's how ${getRandom(organizations)} plans ${getRandom(reasons)}`,
        
        // The "Fake Reality" theory
        () => `Nothing is real. ${getRandom(nouns)}? Fake. ${getRandom(locations)}? A projection. It was all designed by ${getRandom(organizations)} ${getRandom(reasons)}`,
        
        // Historical twist
        () => `${getRandom(historicalFigures)} was actually a time traveler sent by ${getRandom(organizations)} to ensure we never found out about ${getRandom(nouns)}.`,
        
        // The bizarre mashup
        () => `If you play the audio of ${getRandom(historicalFigures)} backwards, it proves that ${getRandom(locations)} is made of ${getRandom(adjectives)} ${getRandom(nouns)}.`,
        
        // The cryptic question
        () => `Why do you think ${getRandom(organizations)} spends billions on ${getRandom(nouns)}? To protect us? No. It's ${getRandom(reasons)}`
    ];

    const selectedTemplate = getRandom(templates);
    document.getElementById("theory-text").innerText = selectedTemplate();
}

document.getElementById("generate-btn").addEventListener("click", generateTheory);

