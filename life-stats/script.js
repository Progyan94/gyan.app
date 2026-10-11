document.getElementById('calculate-btn').addEventListener('click', function() {
    const birthdateInput = document.getElementById('birthdate').value;
    if (!birthdateInput) {
        alert('Please enter your birthdate!');
        return;
    }

    const birthdate = new Date(birthdateInput);
    const now = new Date();
    const ageInMilliseconds = now - birthdate;

    if (ageInMilliseconds < 0) {
        alert('You cannot be born in the future!');
        return;
    }

    const ageInSeconds = ageInMilliseconds / 1000;
    const ageInMinutes = ageInSeconds / 60;
    const ageInHours = ageInMinutes / 60;
    const ageInDays = ageInHours / 24;
    const ageInYears = ageInDays / 365.25;

    // Averages used for calculations
    const blinksPerMinute = 15;
    const breathsPerMinute = 16;
    const heartbeatsPerMinute = 80;
    const pizzasPerYear = 6;
    const hoursSleepPerDay = 8;
    const milesWalkedPerDay = 1.5;

    const totalBlinks = ageInMinutes * blinksPerMinute;
    const totalBreaths = ageInMinutes * breathsPerMinute;
    const totalHeartbeats = ageInMinutes * heartbeatsPerMinute;
    const totalPizzas = ageInYears * pizzasPerYear;
    const totalSleep = ageInDays * hoursSleepPerDay;
    const totalMiles = ageInDays * milesWalkedPerDay;

    // Animate numbers
    function animateValue(id, start, end, duration) {
        let obj = document.getElementById(id);
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const payToWinsOptions = [
        "Bought WinRAR",
        "Extra Guacamole",
        "Premium Subscriptions",
        "Coffee everyday",
        "Skins in a free game"
    ];

    const loveWinsOptions = [
        "Pet a dog today",
        "Texted mom back",
        "Shared an umbrella",
        "Gave the last slice",
        "Remembered a birthday"
    ];

    const statsGrid = document.getElementById('stats-grid');
    statsGrid.style.display = 'grid';
    statsGrid.classList.add('rpg-mode');
    
    statsGrid.style.animation = 'none';
    statsGrid.offsetHeight; 
    statsGrid.style.animation = null;

    const spawnTimeStr = birthdate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    const hpRestored = Math.floor(ageInDays * 3);
    const sideQuests = Math.floor(Math.random() * 90000) + 10000;
    
    document.getElementById('spawn-time').textContent = spawnTimeStr;
    document.getElementById('pay-to-wins').textContent = payToWinsOptions[Math.floor(Math.random() * payToWinsOptions.length)];
    document.getElementById('love-wins').textContent = loveWinsOptions[Math.floor(Math.random() * loveWinsOptions.length)];

    animateValue("blinks", 0, totalBlinks, 2000);
    animateValue("breaths", 0, totalBreaths, 2000);
    animateValue("heartbeats", 0, totalHeartbeats, 2000);
    animateValue("pizzas", 0, totalPizzas, 2000);
    animateValue("sleep", 0, totalSleep, 2000);
    animateValue("miles", 0, totalMiles, 2000);
    animateValue("meals", 0, hpRestored, 2000);
    animateValue("side-quests", 0, sideQuests, 2000);
});
