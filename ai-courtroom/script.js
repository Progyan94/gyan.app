const cases = [
    "The People vs. A Suspiciously Intelligent Toaster",
    "The State vs. A Roomba Accused of Premeditated Ankles-Biting",
    "The Commonwealth vs. Three Pigeons in a Trenchcoat",
    "The People vs. A Refrigerator That Judges Your Diet"
];

const roles = ["Judge", "Defense Lawyer", "Prosecutor", "Witness", "Defendant"];

const dialogues = [
    { text: "Prosecutor: Your Honor, this appliance clearly plotted to burn the toast ON PURPOSE!", options: ["Objection! Hearsay!", "Gasp dramatically", "Sustain the objection"] },
    { text: "Witness: I saw the defendant beep three times menacingly before the incident.", options: ["Cross-examine the witness", "Faint", "Ask if the beeps were in Morse code"] },
    { text: "Defendant: [Whirrs apologetically but slightly sarcastically]", options: ["Demand a translator", "Hold in contempt of court", "Offer a plea deal: 10 years without Wi-Fi"] },
    { text: "Judge: The court will now hear closing statements regarding the 'crumb trail'.", options: ["Scream 'YOU CAN'T HANDLE THE TRUTH!'", "Submit a half-eaten bagel as Exhibit A", "Rest your case"] }
];

let currentStep = 0;

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function initCourtroom() {
    document.getElementById('case-title').textContent = getRandomItem(cases);
    document.getElementById('user-role').textContent = getRandomItem(roles);
    
    updateDialogue();
}

function updateDialogue() {
    const dialogueBox = document.getElementById('dialogue-text');
    const optionsContainer = document.getElementById('options-container');
    
    if (currentStep < dialogues.length) {
        const stepData = dialogues[currentStep];
        dialogueBox.innerHTML = stepData.text; // Reset text to base
        
        optionsContainer.innerHTML = '';
        stepData.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.textContent = opt;
            btn.onclick = () => {
                const reaction = document.createElement('div');
                reaction.style.color = '#ffb74d';
                reaction.style.fontStyle = 'italic';
                reaction.style.marginTop = '10px';
                reaction.textContent = `*You chose: ${opt}*`;
                
                dialogueBox.appendChild(reaction);
                
                // Wait a bit before next step
                optionsContainer.innerHTML = '';
                setTimeout(() => {
                    currentStep++;
                    updateDialogue();
                }, 1500);
            };
            optionsContainer.appendChild(btn);
        });
    } else {
        dialogueBox.innerHTML = "<strong>The jury has reached a verdict!</strong><br><br>The defendant is found... GUILTY of being absolutely ridiculous!";
        optionsContainer.innerHTML = '';
        const restartBtn = document.createElement('button');
        restartBtn.textContent = "Start New Case";
        restartBtn.onclick = () => {
            currentStep = 0;
            initCourtroom();
        };
        optionsContainer.appendChild(restartBtn);
    }
}

document.addEventListener('DOMContentLoaded', initCourtroom);
