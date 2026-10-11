const scenarios = {
    soda_oceans: {
        stat1: ["Sugar Content:", "1.4 × 10^21 kg of sugar (enough to give the Earth diabetes)"],
        stat2: ["Carbonation Level:", "Burps audible from Mars"],
        stat3: ["Sticky Rating:", "11/10 - Boats would just get stuck"]
    },
    no_gravity: {
        stat1: ["Air Retention Time:", "About 45 minutes before we all suffocate"],
        stat2: ["Lost Items:", "Everything not bolted down (including your coffee)"],
        stat3: ["Commute Time:", "Infinite (you just float away)"]
    },
    jump_moon: {
        stat1: ["Earth Movement:", "0.00000000000001 mm"],
        stat2: ["Seismic Activity:", "Maybe a magnitude 0.1 earthquake locally"],
        stat3: ["Awkwardness:", "Extreme (everyone looking at each other after)"]
    },
    cats_bark: {
        stat1: ["Confusion Level:", "Global panic in pet stores"],
        stat2: ["Burglary Rate:", "Drops 50% due to terrifying guard-cats"],
        stat3: ["Internet Brokenness:", "Total collapse of meme economy"]
    },
    earth_cheese: {
        stat1: ["Structural Integrity:", "Crumbles under its own gravitational weight"],
        stat2: ["Mouse Population:", "Quintillions, initiating interstellar expansion"],
        stat3: ["Scent Radius:", "Detectable from Alpha Centauri"]
    },
    sun_disco: {
        stat1: ["Global Vibe:", "Uncontrollable urge to do the Hustle"],
        stat2: ["Photosynthesis:", "Plants grow in bell-bottom shapes"],
        stat3: ["Epilepsy Rate:", "100%"]
    },
    cats_takeover: {
        stat1: ["New Laws:", "Mandatory chin scratches at 3 AM"],
        stat2: ["Global Currency:", "High-grade catnip"],
        stat3: ["Human Role:", "Designated can openers"]
    },
    all_water_jello: {
        stat1: ["Swimming:", "More like aggressive digging"],
        stat2: ["Plumbing:", "Pipes burst with terrifying fruity force"],
        stat3: ["Rain:", "Lethal incoming gelatinous blobs"]
    },
    reverse_aging: {
        stat1: ["Retirement:", "Starts immediately after birth"],
        stat2: ["High School:", "Full of grumpy 70-year-olds in teenage bodies"],
        stat3: ["Final Moments:", "Pop out of existence as a baby"]
    },
    cloud_trampolines: {
        stat1: ["Air Travel:", "Replaced by giant leaps"],
        stat2: ["Weather:", "Forecast calls for bouncing"],
        stat3: ["Injury Rate:", "Astronomical"]
    },
    sleep_obsolete: {
        stat1: ["Productivity:", "Up 100%, but everyone hates it"],
        stat2: ["Bed Industry:", "Bankrupt overnight"],
        stat3: ["Boredom:", "Levels reach critical mass around 3 AM"]
    },
    everyone_telepaths: {
        stat1: ["Secrets:", "Gone forever"],
        stat2: ["Headaches:", "Constant buzzing of 8 billion voices"],
        stat3: ["Relationships:", "Average length: 3 minutes"]
    },
    trees_walk: {
        stat1: ["Lumberjacks:", "Now considered an extreme sport"],
        stat2: ["Real Estate:", "Your yard leaves for a better climate"],
        stat3: ["Traffic:", "Blocked by migrating oak herds"]
    },
    animals_talk: {
        stat1: ["Diet:", "Everyone goes vegan out of guilt"],
        stat2: ["Pets:", "Endless complaining about food brands"],
        stat3: ["Wildlife:", "Birds constantly screaming 'MINE!'"]
    },
    everything_musical: {
        stat1: ["Spontaneous Choreography:", "Daily traffic jams from dance numbers"],
        stat2: ["Arguments:", "Settled via rap battles"],
        stat3: ["Exhaustion:", "Singing everything is tiring"]
    },
    dinosaurs_return: {
        stat1: ["Commute:", "Riding a Triceratops to work"],
        stat2: ["Pest Control:", "Dealing with Compys in the trash"],
        stat3: ["Life Expectancy:", "Drops significantly due to T-Rex encounters"]
    },
    sky_neon_green: {
        stat1: ["Aesthetics:", "Cyberpunk vibes everywhere"],
        stat2: ["Sunglasses Sales:", "Up 10,000%"],
        stat3: ["Mood:", "Perpetually uneasy"]
    },
    money_is_leaves: {
        stat1: ["Economy:", "Hyperinflation every autumn"],
        stat2: ["Rich People:", "Just anyone with a rake"],
        stat3: ["Deforestation:", "Ironically, stops immediately"]
    },
    everyone_invisible: {
        stat1: ["Crime Rate:", "Off the charts"],
        stat2: ["Fashion Industry:", "Completely destroyed"],
        stat3: ["Bumping into things:", "The leading cause of injury"]
    },
    time_freezes: {
        stat1: ["Productivity:", "Zero"],
        stat2: ["Aging:", "Halted"],
        stat3: ["Boredom:", "Literally impossible to feel"]
    },
    floor_is_lava: {
        stat1: ["Furniture Sales:", "Only heat-resistant couches sell"],
        stat2: ["Transportation:", "Parkour is now a vital life skill"],
        stat3: ["Casualties:", "High for those who slip"]
    },
    breathe_water: {
        stat1: ["Real Estate:", "Atlantis is booming"],
        stat2: ["Showers:", "Just breathing normally in a tube"],
        stat3: ["Fire Hazards:", "Non-existent"]
    },
    no_friction: {
        stat1: ["Movement:", "Once you start, you never stop"],
        stat2: ["Knots:", "Untie themselves instantly"],
        stat3: ["Writing:", "Pens just slide off paper"]
    },
    thoughts_visible: {
        stat1: ["Lying:", "Impossible"],
        stat2: ["Airspace:", "Cluttered with thought bubbles"],
        stat3: ["Embarrassment:", "A constant state of being"]
    },
    moon_crashes: {
        stat1: ["Tides:", "Gone, then extremely big, then gone forever"],
        stat2: ["Night Sky:", "Dusty"],
        stat3: ["Survival Rate:", "0%"]
    },
    everyone_clones: {
        stat1: ["Identity Crisis:", "A global pandemic"],
        stat2: ["Chores:", "Delegated to clones, who also refuse to do them"],
        stat3: ["Food Shortage:", "Double the mouths to feed"]
    },
    size_shifts: {
        stat1: ["Clothing:", "One-size-fits-all is a lie"],
        stat2: ["Architecture:", "Doors must accommodate mice and giants"],
        stat3: ["Hugs:", "Dangerous"]
    },
    food_pills: {
        stat1: ["Culinary Arts:", "Dead"],
        stat2: ["Chewing:", "A forgotten sensation"],
        stat3: ["Dinner Time:", "Takes 2 seconds"]
    },
    internet_deletes: {
        stat1: ["Productivity:", "Skyrockets"],
        stat2: ["Arguments:", "Cannot be settled with a quick Google search"],
        stat3: ["Influencers:", "Must get real jobs"]
    },
    colors_swap: {
        stat1: ["Traffic Lights:", "Chaos"],
        stat2: ["Art:", "Ruined or improved, subjective"],
        stat3: ["Camouflage:", "Completely ineffective"]
    }
};

document.getElementById('calculate-btn').addEventListener('click', () => {
    const scenario = document.getElementById('scenario').value;
    const data = scenarios[scenario];
    
    document.getElementById('stat1').innerHTML = `<span>${data.stat1[0]}</span> ${data.stat1[1]}`;
    document.getElementById('stat2').innerHTML = `<span>${data.stat2[0]}</span> ${data.stat2[1]}`;
    document.getElementById('stat3').innerHTML = `<span>${data.stat3[0]}</span> ${data.stat3[1]}`;
    
    document.getElementById('results').classList.remove('hidden');
});
