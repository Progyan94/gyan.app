const btn = document.getElementById('impossibleBtn');
const message = document.getElementById('message');

let teleportCount = 0;

btn.addEventListener('mouseover', () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnWidth = btn.offsetWidth;
    const btnHeight = btn.offsetHeight;

    const maxX = windowWidth - btnWidth;
    const maxY = windowHeight - btnHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    btn.style.left = `${randomX + btnWidth/2}px`;
    btn.style.top = `${randomY + btnHeight/2}px`;
    
    teleportCount++;
    if (teleportCount > 10) {
        message.textContent = "Wow, you're persistent! Still can't catch me though.";
    }
});

btn.addEventListener('click', () => {
    message.textContent = "Wait, you actually clicked it?! You must be a robot. Or cheating.";
    btn.style.backgroundColor = "#2ed573";
    btn.textContent = "You Win!";
    
    // Stop teleporting
    const oldBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(oldBtn, btn);
});
