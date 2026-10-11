document.getElementById('shred-btn').addEventListener('click', () => {
    const paperContainer = document.querySelector('.paper-container');
    const shredsContainer = document.getElementById('shreds-container');
    
    // Clear previous shreds
    shredsContainer.innerHTML = '';
    
    // Create shreds
    for (let i = 0; i < 12; i++) {
        const shred = document.createElement('div');
        shred.classList.add('shred');
        shredsContainer.appendChild(shred);
    }
    
    // Animate paper going down
    paperContainer.classList.add('paper-animating');
    
    // Animate shreds coming out
    setTimeout(() => {
        const shreds = document.querySelectorAll('.shred');
        shreds.forEach(shred => {
            shred.style.height = '150px';
        });
    }, 500);
    
    // Reset after some time
    setTimeout(() => {
        paperContainer.classList.remove('paper-animating');
        document.getElementById('paper').value = '';
        shredsContainer.innerHTML = '';
    }, 3000);
});
