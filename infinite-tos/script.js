const tosContent = document.getElementById('tos-content');
const tosContainer = document.getElementById('tos-container');
const winScreen = document.getElementById('win-screen');

const boringPhrases = [
    "The user agrees to indemnify and hold harmless the company...",
    "By continuing to use this service, you acknowledge that...",
    "All disputes shall be resolved through binding arbitration...",
    "The company reserves the right to modify these terms at any time...",
    "Liability is limited to the maximum extent permitted by law...",
    "Your data may be shared with third-party partners for marketing...",
    "Failure to enforce any provision does not constitute a waiver...",
    "This agreement constitutes the entire understanding between parties..."
];

let paragraphsAdded = 0;
const targetParagraph = Math.floor(Math.random() * 30) + 30; // Between 30 and 60 paragraphs

function addParagraphs(num) {
    for (let i = 0; i < num; i++) {
        paragraphsAdded++;
        const p = document.createElement('p');
        p.className = 'boring-text';
        
        if (paragraphsAdded === targetParagraph) {
            p.innerHTML = `${getRandomBoringText()} <span class="trigger" onclick="winGame()">I agree to the hidden terms of actually reading this document. Click here to proceed.</span> ${getRandomBoringText()}`;
        } else {
            p.textContent = getRandomBoringText();
        }
        
        tosContent.appendChild(p);
    }
}

function getRandomBoringText() {
    let text = "";
    const numSentences = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < numSentences; i++) {
        text += boringPhrases[Math.floor(Math.random() * boringPhrases.length)] + " ";
    }
    return text;
}

tosContainer.addEventListener('scroll', () => {
    if (tosContainer.scrollTop + tosContainer.clientHeight >= tosContainer.scrollHeight - 50) {
        addParagraphs(10);
    }
});

window.winGame = function() {
    tosContainer.classList.add('hidden');
    winScreen.classList.remove('hidden');
};

// Initial load
addParagraphs(20);
