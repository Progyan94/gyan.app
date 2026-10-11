// Disco background effect
setInterval(() => {
    const colors = ['#ff00ff', '#00ffff', '#ffff00', '#00ff00', '#ff0000', '#ff9900'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.documentElement.style.setProperty('--bg-color', randomColor);
}, 3000);

// Add random rotations to cards on hover
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const randomRot = Math.floor(Math.random() * 10) - 5; // -5 to +5 degrees
        card.style.transform = `scale(1.1) rotate(${randomRot}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = `scale(1) rotate(0deg)`;
    });
    // Note: No preventDefault here anymore, so clicking will naturally navigate to the game's page!
});
