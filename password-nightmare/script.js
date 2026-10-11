const passwordInput = document.getElementById('password-input');
const rulesContainer = document.getElementById('rules-container');
const charCount = document.getElementById('char-count');

const currentMonthStr = new Date().toLocaleString('default', { month: 'long' });

const rules = [
    {
        id: 1,
        title: "Rule 1",
        description: "Your password must be at least 8 characters.",
        check: (pw) => pw.length >= 8
    },
    {
        id: 2,
        title: "Rule 2",
        description: "Your password must include a number.",
        check: (pw) => /\d/.test(pw)
    },
    {
        id: 3,
        title: "Rule 3",
        description: "Your password must include an uppercase letter.",
        check: (pw) => /[A-Z]/.test(pw)
    },
    {
        id: 4,
        title: "Rule 4",
        description: "Your password must include the name of a continent.",
        check: (pw) => {
            const continents = ['africa', 'antarctica', 'asia', 'europe', 'north america', 'oceania', 'south america', 'australia'];
            const lowerPw = pw.toLowerCase();
            return continents.some(continent => lowerPw.includes(continent));
        }
    },
    {
        id: 5,
        title: "Rule 5",
        description: "The digits in your password must sum to exactly 25.",
        check: (pw) => {
            let sum = 0;
            const matches = pw.match(/\d/g);
            if (matches) {
                sum = matches.reduce((acc, digit) => acc + parseInt(digit, 10), 0);
            }
            return sum === 25;
        }
    },
    {
        id: 6,
        title: "Rule 6",
        description: "Your password must include a Roman numeral.",
        check: (pw) => {
            const romanNumerals = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
            return romanNumerals.some(numeral => pw.includes(numeral));
        }
    },
    {
        id: 7,
        title: "Rule 7",
        description: `Your password must contain the current month (${currentMonthStr}).`,
        check: (pw) => {
            return pw.toLowerCase().includes(currentMonthStr.toLowerCase());
        }
    }
];

let highestRuleVisible = 0;

function updateRules() {
    const pw = passwordInput.value;
    charCount.textContent = pw.length;
    
    let allPreviousValid = true;
    
    // First, evaluate up to the highest visible rule + 1 (if current is valid)
    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        const isValid = rule.check(pw);
        
        if (i < highestRuleVisible) {
            updateRuleUI(rule, isValid);
            if (!isValid) allPreviousValid = false;
        } else if (i === highestRuleVisible && allPreviousValid) {
            // We can show a new rule!
            highestRuleVisible++;
            createRuleUI(rule);
            updateRuleUI(rule, isValid);
            if (!isValid) allPreviousValid = false;
        }
    }
    
    // Sort rules: failed rules on top
    const ruleElements = Array.from(rulesContainer.children);
    ruleElements.sort((a, b) => {
        const idA = parseInt(a.dataset.id, 10);
        const idB = parseInt(b.dataset.id, 10);
        
        const validA = a.classList.contains('valid');
        const validB = b.classList.contains('valid');
        
        if (validA === validB) {
            return idB - idA; // higher IDs on top by default
        }
        return validA ? 1 : -1; // invalid ones come first
    });
    
    ruleElements.forEach(el => rulesContainer.appendChild(el));
}

function createRuleUI(rule) {
    const ruleDiv = document.createElement('div');
    ruleDiv.className = 'rule';
    ruleDiv.dataset.id = rule.id;
    ruleDiv.id = `rule-${rule.id}`;
    
    ruleDiv.innerHTML = `
        <div class="rule-header">
            <h3>${rule.title}</h3>
            <span class="status-icon">❌</span>
        </div>
        <p>${rule.description}</p>
    `;
    rulesContainer.prepend(ruleDiv);
}

function updateRuleUI(rule, isValid) {
    const ruleDiv = document.getElementById(`rule-${rule.id}`);
    if (!ruleDiv) return;
    
    if (isValid) {
        ruleDiv.classList.remove('invalid');
        ruleDiv.classList.add('valid');
        ruleDiv.querySelector('.status-icon').textContent = '✅';
    } else {
        ruleDiv.classList.remove('valid');
        ruleDiv.classList.add('invalid');
        ruleDiv.querySelector('.status-icon').textContent = '❌';
    }
}

passwordInput.addEventListener('input', updateRules);

// Initialize with the first rule
updateRules();
