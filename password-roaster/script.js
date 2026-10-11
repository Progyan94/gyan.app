const passwordInput = document.getElementById('passwordInput');
const toggleBtn = document.getElementById('toggleBtn');
const roastOutput = document.getElementById('roastOutput');

toggleBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = 'Show';
    }
});

const commonPatterns = ['password', '12345', 'qwerty', 'admin', 'letmein', '123456', '12345678', 'iloveyou', 'dragon', 'monkey', 'hello', 'abcde', 'asdf'];

const intros = [
    "Oh boy.",
    "Let me process this...",
    "*Sigh*",
    "Beep boop. Analyzing... yikes.",
    "Error 404: Security not found.",
    "Wow.",
    "Okay, let's break this down.",
    "Really?",
    "Seriously?",
    "Is this a joke?",
    "My AI circuits are hurting.",
    "Initiating roast protocols..."
];

const conclusions = [
    "Please try harder.",
    "Do you want to get hacked?",
    "I'm praying for your accounts.",
    "Even my smart fridge has better security.",
    "Please, for your own sake, change it.",
    "I'm actually embarrassed for you.",
    "Just delete your account now.",
    "A toddler could brute-force this.",
    "I'd give you a zero, but that's too high.",
    "Try mashing your head on the keyboard instead."
];

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function analyzePassword(val) {
    const len = val.length;
    const isAllNums = /^\d+$/.test(val);
    const isAllLower = /^[a-z]+$/.test(val);
    const isAllUpper = /^[A-Z]+$/.test(val);
    const hasSpecial = /[^A-Za-z0-9]/.test(val);
    
    let commonMatch = null;
    const lowerVal = val.toLowerCase();
    for (let pattern of commonPatterns) {
        if (lowerVal.includes(pattern)) {
            commonMatch = pattern;
            break;
        }
    }
    
    return { len, isAllNums, isAllLower, isAllUpper, hasSpecial, commonMatch };
}

function generateRoast(val) {
    if (val.length === 0) {
        return "Are you going to type something or just stare?";
    }

    const { len, isAllNums, isAllLower, isAllUpper, hasSpecial, commonMatch } = analyzePassword(val);
    
    let bodies = [];
    
    if (len < 6) {
        bodies.push(`Only ${len} characters? I've seen longer sneezes.`);
        bodies.push(`Size matters, and ${len} characters isn't going to cut it.`);
        bodies.push(`Did you stop typing halfway through?`);
    } else if (len > 25) {
        bodies.push(`Whoa, ${len} characters? Are you writing a novel or a password?`);
        bodies.push(`Do you actually memorize all ${len} of those? Liar.`);
    }
    
    if (isAllNums) {
        bodies.push(`Oh, ${len} numbers? Is that your dog's birthday?`);
        bodies.push("Just numbers? What is this, a 1999 ATM PIN?");
        bodies.push("Ah yes, let me just guess your phone number really quick.");
    }
    
    if (isAllLower) {
        bodies.push("All lowercase? Was the shift key too heavy for you?");
        bodies.push("Not a single capital letter. How lazy can you be?");
    }
    
    if (isAllUpper) {
        bodies.push("STOP YELLING AT ME. Also, all caps isn't more secure.");
        bodies.push("Someone left CAPS LOCK on and called it a day.");
    }
    
    if (commonMatch) {
        bodies.push(`'${commonMatch}'? Really? That's literally in the dictionary of worst passwords.`);
        bodies.push(`You included '${commonMatch}'? Hackers are laughing at you right now.`);
        bodies.push(`Using '${commonMatch}' is like leaving your front door wide open.`);
    }
    
    if (len >= 8 && !isAllNums && !isAllLower && !commonMatch && !hasSpecial) {
        bodies.push("Letters and numbers, but no special characters? Living dangerously, I see.");
    }
    
    if (len >= 12 && hasSpecial && !commonMatch && !isAllNums && !isAllLower && !isAllUpper) {
        bodies.push("Oh look at you, using upper case, lower case, numbers AND special characters. Do you want a gold star?");
        bodies.push("Trying WAY too hard. Are you guarding the nuclear launch codes or just your Netflix account?");
        bodies.push(`Wow, ${len} characters of absolute gibberish. Good luck typing that on your phone without crying.`);
        bodies.push("Ah, the classic 'smash the keyboard and hope I remember it' strategy. Bold move.");
    }
    
    if (bodies.length === 0) {
        bodies.push("It's so aggressively mediocre I don't even know what to say.");
        bodies.push("It's not the worst, but I wouldn't trust it with my Neopets account.");
    }
    
    const intro = pickRandom(intros);
    const body = pickRandom(bodies);
    const conclusion = pickRandom(conclusions);
    
    return `${intro} ${body} ${conclusion}`;
}

passwordInput.addEventListener('input', () => {
    roastOutput.textContent = generateRoast(passwordInput.value);
});
