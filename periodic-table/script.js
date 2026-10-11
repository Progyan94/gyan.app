// Neon Atomic Lab: Full 118 Elements Dataset & Dual 3D/2D Simulation Engine

// Complete standard IUPAC 118 Elements with accurate period, group, electron configurations, masses & quirks
const full118Elements = [
    { n: 1, s: "H", name: "Hydrogen", mass: "1.008", cat: "nonmetal", period: 1, group: 1, p: 1, n_count: 0, shells: [1], quirk: "Most abundant element in the cosmos, fueling stellar fusion engines." },
    { n: 2, s: "He", name: "Helium", mass: "4.0026", cat: "noble-gas", period: 1, group: 18, p: 2, n_count: 2, shells: [2], quirk: "Superfluid at near absolute zero; climbs container walls defying gravity!" },
    { n: 3, s: "Li", name: "Lithium", mass: "6.94", cat: "alkali-metal", period: 2, group: 1, p: 3, n_count: 4, shells: [2, 1], quirk: "Lightest known solid metal; powers the global rechargeable battery revolution." },
    { n: 4, s: "Be", name: "Beryllium", mass: "9.0122", cat: "alkaline-earth", period: 2, group: 2, p: 4, n_count: 5, shells: [2, 2], quirk: "Forms emeralds and aquamarines, transparent to X-rays!" },
    { n: 5, s: "B", name: "Boron", mass: "10.81", cat: "metalloid", period: 2, group: 13, p: 5, n_count: 6, shells: [2, 3], quirk: "Creates thermal shock-resistant borosilicate glassware." },
    { n: 6, s: "C", name: "Carbon", mass: "12.011", cat: "nonmetal", period: 2, group: 14, p: 6, n_count: 6, shells: [2, 4], quirk: "The backbone of all organic life, graphite pencils, and diamond crystal lattices." },
    { n: 7, s: "N", name: "Nitrogen", mass: "14.007", cat: "nonmetal", period: 2, group: 15, p: 7, n_count: 7, shells: [2, 5], quirk: "Constitutes 78% of Earth's atmosphere; inert gas preserving packaged foods." },
    { n: 8, s: "O", name: "Oxygen", mass: "15.999", cat: "nonmetal", period: 2, group: 16, p: 8, n_count: 8, shells: [2, 6], quirk: "Liquid oxygen is pale sky-blue and paramagnetic, clinging to magnetic poles." },
    { n: 9, s: "F", name: "Fluorine", mass: "18.998", cat: "nonmetal", period: 2, group: 17, p: 9, n_count: 10, shells: [2, 7], quirk: "The most electronegative halogen; aggressively oxidizes water and glass." },
    { n: 10, s: "Ne", name: "Neon", mass: "20.180", cat: "noble-gas", period: 2, group: 18, p: 10, n_count: 10, shells: [2, 8], quirk: "Glows with iconic brilliant reddish-orange light in high-voltage discharge tubes." },
    { n: 11, s: "Na", name: "Sodium", mass: "22.990", cat: "alkali-metal", period: 3, group: 1, p: 11, n_count: 12, shells: [2, 8, 1], quirk: "Violently explosive with water on its own, but harmless table salt with chlorine." },
    { n: 12, s: "Mg", name: "Magnesium", mass: "24.305", cat: "alkaline-earth", period: 3, group: 2, p: 12, n_count: 12, shells: [2, 8, 2], quirk: "Burns with a blinding white flare and sits at the center of plant chlorophyll." },
    { n: 13, s: "Al", name: "Aluminium", mass: "26.982", cat: "post-transition", period: 3, group: 13, p: 13, n_count: 14, shells: [2, 8, 3], quirk: "Most abundant metal in Earth's crust; once more precious than silver." },
    { n: 14, s: "Si", name: "Silicon", mass: "28.085", cat: "metalloid", period: 3, group: 14, p: 14, n_count: 14, shells: [2, 8, 4], quirk: "Powers the digital age as the universal semiconductor of microprocessors." },
    { n: 15, s: "P", name: "Phosphorus", mass: "30.974", cat: "nonmetal", period: 3, group: 15, p: 15, n_count: 16, shells: [2, 8, 5], quirk: "Discovered by alchemist Hennig Brand boiling hundreds of liters of urine!" },
    { n: 16, s: "S", name: "Sulfur", mass: "32.06", cat: "nonmetal", period: 3, group: 16, p: 16, n_count: 16, shells: [2, 8, 6], quirk: "Known in antiquity as brimstone; responsible for volcanic pungent gases." },
    { n: 17, s: "Cl", name: "Chlorine", mass: "35.45", cat: "nonmetal", period: 3, group: 17, p: 17, n_count: 18, shells: [2, 8, 7], quirk: "Heavy yellowish-green toxic gas that purifies public municipal water systems." },
    { n: 18, s: "Ar", name: "Argon", mass: "39.948", cat: "noble-gas", period: 3, group: 18, p: 18, n_count: 22, shells: [2, 8, 8], quirk: "Named from Greek 'argos' (lazy) because of its chemical non-reactivity." },
    { n: 19, s: "K", name: "Potassium", mass: "39.098", cat: "alkali-metal", period: 4, group: 1, p: 19, n_count: 20, shells: [2, 8, 8, 1], quirk: "Essential electrolyte firing human neural synapses and heartbeats." },
    { n: 20, s: "Ca", name: "Calcium", mass: "40.078", cat: "alkaline-earth", period: 4, group: 2, p: 20, n_count: 20, shells: [2, 8, 8, 2], quirk: "Builds bone skeletons, marine coral reefs, and marble architecture." },
    { n: 21, s: "Sc", name: "Scandium", mass: "44.956", cat: "transition", period: 4, group: 3, p: 21, n_count: 24, shells: [2, 8, 9, 2], quirk: "Strengthens aluminum alloys in fighter jet airframes." },
    { n: 22, s: "Ti", name: "Titanium", mass: "47.867", cat: "transition", period: 4, group: 4, p: 22, n_count: 26, shells: [2, 8, 10, 2], quirk: "High strength-to-weight ratio; osseointegrates with living human bone." },
    { n: 23, s: "V", name: "Vanadium", mass: "50.942", cat: "transition", period: 4, group: 5, p: 23, n_count: 28, shells: [2, 8, 11, 2], quirk: "Named after Norse goddess Vanadis due to its rainbow of oxidation states." },
    { n: 24, s: "Cr", name: "Chromium", mass: "51.996", cat: "transition", period: 4, group: 6, p: 24, n_count: 28, shells: [2, 8, 13, 1], quirk: "Gives rubies red fire and prevents stainless steel cutlery from rusting." },
    { n: 25, s: "Mn", name: "Manganese", mass: "54.938", cat: "transition", period: 4, group: 7, p: 25, n_count: 30, shells: [2, 8, 13, 2], quirk: "Essential cofactor in water-splitting photosystem complexes." },
    { n: 26, s: "Fe", name: "Iron", mass: "55.845", cat: "transition", period: 4, group: 8, p: 26, n_count: 30, shells: [2, 8, 14, 2], quirk: "The peak of nuclear binding energy; makes blood red and planets magnetic." },
    { n: 27, s: "Co", name: "Cobalt", mass: "58.933", cat: "transition", period: 4, group: 9, p: 27, n_count: 32, shells: [2, 8, 15, 2], quirk: "Deep cobalt blue pigment and central core atom of vitamin B12." },
    { n: 28, s: "Ni", name: "Nickel", mass: "58.693", cat: "transition", period: 4, group: 10, p: 28, n_count: 31, shells: [2, 8, 16, 2], quirk: "Plentiful inside metallic iron-nickel planetary cores." },
    { n: 29, s: "Cu", name: "Copper", mass: "63.546", cat: "transition", period: 4, group: 11, p: 29, n_count: 35, shells: [2, 8, 18, 1], quirk: "Antimicrobial surface; oxidizes into green verdigris like Lady Liberty." },
    { n: 30, s: "Zn", name: "Zinc", mass: "65.38", cat: "transition", period: 4, group: 12, p: 30, n_count: 35, shells: [2, 8, 18, 2], quirk: "Sacrificial anode protecting ship hulls against salty sea corrosion." },
    { n: 31, s: "Ga", name: "Gallium", mass: "69.723", cat: "post-transition", period: 4, group: 13, p: 31, n_count: 39, shells: [2, 8, 18, 3], quirk: "Melts in the palm of your warm hand at 29.7°C!" },
    { n: 32, s: "Ge", name: "Germanium", mass: "72.630", cat: "metalloid", period: 4, group: 14, p: 32, n_count: 41, shells: [2, 8, 18, 4], quirk: "Used in wide-angle optical systems and infrared night vision." },
    { n: 33, s: "As", name: "Arsenic", mass: "74.922", cat: "metalloid", period: 4, group: 15, p: 33, n_count: 42, shells: [2, 8, 18, 5], quirk: "Infamous poison of Renaissance drama; smells faintly of bitter garlic." },
    { n: 34, s: "Se", name: "Selenium", mass: "78.971", cat: "nonmetal", period: 4, group: 16, p: 34, n_count: 45, shells: [2, 8, 18, 6], quirk: "Conductivity multiplies by 1,000x when struck by light photons." },
    { n: 35, s: "Br", name: "Bromine", mass: "79.904", cat: "nonmetal", period: 4, group: 17, p: 35, n_count: 45, shells: [2, 8, 18, 7], quirk: "Only nonmetallic element that exists as a liquid at room temperature." },
    { n: 36, s: "Kr", name: "Krypton", mass: "83.798", cat: "noble-gas", period: 4, group: 18, p: 36, n_count: 48, shells: [2, 8, 18, 8], quirk: "Once used to define the international standard length of one meter." },
    { n: 37, s: "Rb", name: "Rubidium", mass: "85.468", cat: "alkali-metal", period: 5, group: 1, p: 37, n_count: 48, shells: [2, 8, 18, 8, 1], quirk: "Ignites spontaneously in air with a vivid red-violet flame." },
    { n: 38, s: "Sr", name: "Strontium", mass: "87.62", cat: "alkaline-earth", period: 5, group: 2, p: 38, n_count: 50, shells: [2, 8, 18, 8, 2], quirk: "Produces vivid crimson red coloration in festive fireworks." },
    { n: 39, s: "Y", name: "Yttrium", mass: "88.906", cat: "transition", period: 5, group: 3, p: 39, n_count: 50, shells: [2, 8, 18, 9, 2], quirk: "Essential in YBCO high-temperature superconductors." },
    { n: 40, s: "Zr", name: "Zirconium", mass: "91.224", cat: "transition", period: 5, group: 4, p: 40, n_count: 51, shells: [2, 8, 18, 10, 2], quirk: "Cubic zirconia crystals simulate luxury diamond gems." },
    { n: 41, s: "Nb", name: "Niobium", mass: "92.906", cat: "transition", period: 5, group: 5, p: 41, n_count: 52, shells: [2, 8, 18, 12, 1], quirk: "Superconducting magnetic coils in particle accelerators." },
    { n: 42, s: "Mo", name: "Molybdenum", mass: "95.95", cat: "transition", period: 5, group: 6, p: 42, n_count: 54, shells: [2, 8, 18, 13, 1], quirk: "Withstands tremendous temperatures in military rocket engines." },
    { n: 43, s: "Tc", name: "Technetium", mass: "98", cat: "transition", period: 5, group: 7, p: 43, n_count: 55, shells: [2, 8, 18, 13, 2], quirk: "First purely synthetic element; widely used in medical gamma imaging." },
    { n: 44, s: "Ru", name: "Ruthenium", mass: "101.07", cat: "transition", period: 5, group: 8, p: 44, n_count: 57, shells: [2, 8, 18, 15, 1], quirk: "Hardens platinum and titanium electrical contacts." },
    { n: 45, s: "Rh", name: "Rhodium", mass: "102.91", cat: "transition", period: 5, group: 9, p: 45, n_count: 58, shells: [2, 8, 18, 16, 1], quirk: "Extremely precious catalyst scrubbing nitrogen oxide pollutants." },
    { n: 46, s: "Pd", name: "Palladium", mass: "106.42", cat: "transition", period: 5, group: 10, p: 46, n_count: 60, shells: [2, 8, 18, 18], quirk: "Can sponge up to 900 times its own volume in hydrogen gas!" },
    { n: 47, s: "Ag", name: "Silver", mass: "107.87", cat: "transition", period: 5, group: 11, p: 47, n_count: 61, shells: [2, 8, 18, 18, 1], quirk: "Highest electrical and thermal conductivity of any known metal." },
    { n: 48, s: "Cd", name: "Cadmium", mass: "112.41", cat: "transition", period: 5, group: 12, p: 48, n_count: 64, shells: [2, 8, 18, 18, 2], quirk: "Captures thermal neutrons in atomic reactor control rods." },
    { n: 49, s: "In", name: "Indium", mass: "114.82", cat: "post-transition", period: 5, group: 13, p: 49, n_count: 66, shells: [2, 8, 18, 18, 3], quirk: "Indium-tin oxide coats capacitive touchscreens on modern phones." },
    { n: 50, s: "Sn", name: "Tin", mass: "118.71", cat: "post-transition", period: 5, group: 14, p: 50, n_count: 69, shells: [2, 8, 18, 18, 4], quirk: "Bending a pure tin bar emits an audible crackling 'tin cry'!" },
    { n: 51, s: "Sb", name: "Antimony", mass: "121.76", cat: "metalloid", period: 5, group: 15, p: 51, n_count: 71, shells: [2, 8, 18, 18, 5], quirk: "Used in ancient Egyptian kohl eye cosmetics." },
    { n: 52, s: "Te", name: "Tellurium", mass: "127.60", cat: "metalloid", period: 5, group: 16, p: 52, n_count: 76, shells: [2, 8, 18, 18, 6], quirk: "Exposure causes human breath to reek of intense garlic for weeks." },
    { n: 53, s: "I", name: "Iodine", mass: "126.90", cat: "nonmetal", period: 5, group: 17, p: 53, n_count: 74, shells: [2, 8, 18, 18, 7], quirk: "Sublimes directly from solid dark crystals into vibrant violet fumes." },
    { n: 54, s: "Xe", name: "Xenon", mass: "131.29", cat: "noble-gas", period: 5, group: 18, p: 54, n_count: 77, shells: [2, 8, 18, 18, 8], quirk: "Propels ion-drive engines navigating deep-space exploratory probes." },
    { n: 55, s: "Cs", name: "Caesium", mass: "132.91", cat: "alkali-metal", period: 6, group: 1, p: 55, n_count: 78, shells: [2, 8, 18, 18, 8, 1], quirk: "Its natural hyperfine transition frequency defines the modern second in atomic clocks." },
    { n: 56, s: "Ba", name: "Barium", mass: "137.33", cat: "alkaline-earth", period: 6, group: 2, p: 56, n_count: 81, shells: [2, 8, 18, 18, 8, 2], quirk: "Barium contrast swallows visualize the GI tract under X-ray imaging." },

    // LANTHANIDES (57 to 71)
    { n: 57, s: "La", name: "Lanthanum", mass: "138.91", cat: "lanthanide", period: 8, group: 3, p: 57, n_count: 82, shells: [2, 8, 18, 18, 9, 2], quirk: "Names the Lanthanide series; used in heavy camera glass lenses." },
    { n: 58, s: "Ce", name: "Cerium", mass: "140.12", cat: "lanthanide", period: 8, group: 4, p: 58, n_count: 82, shells: [2, 8, 18, 19, 9, 2], quirk: "Produces sparks when struck in ferrocerium flint lighters." },
    { n: 59, s: "Pr", name: "Praseodymium", mass: "140.91", cat: "lanthanide", period: 8, group: 5, p: 59, n_count: 82, shells: [2, 8, 18, 21, 8, 2], quirk: "Gives glass a brilliant yellow-green hue in didymium glass." },
    { n: 60, s: "Nd", name: "Neodymium", mass: "144.24", cat: "lanthanide", period: 8, group: 6, p: 60, n_count: 84, shells: [2, 8, 18, 22, 8, 2], quirk: "Produces the world's most powerful permanent rare-earth magnets." },
    { n: 61, s: "Pm", name: "Promethium", mass: "145", cat: "lanthanide", period: 8, group: 7, p: 61, n_count: 84, shells: [2, 8, 18, 23, 8, 2], quirk: "Exclusively radioactive rare-earth; powers atomic luminous dials." },
    { n: 62, s: "Sm", name: "Samarium", mass: "150.36", cat: "lanthanide", period: 8, group: 8, p: 62, n_count: 88, shells: [2, 8, 18, 24, 8, 2], quirk: "Resistant to demagnetization at searing high temperatures." },
    { n: 63, s: "Eu", name: "Europium", mass: "151.96", cat: "lanthanide", period: 8, group: 9, p: 63, n_count: 89, shells: [2, 8, 18, 25, 8, 2], quirk: "Anti-counterfeiting red phosphor in European banknotes!" },
    { n: 64, s: "Gd", name: "Gadolinium", mass: "157.25", cat: "lanthanide", period: 8, group: 10, p: 64, n_count: 93, shells: [2, 8, 18, 25, 9, 2], quirk: "Intravenous paramagnetic contrast agent for MRI scans." },
    { n: 65, s: "Tb", name: "Terbium", mass: "158.93", cat: "lanthanide", period: 8, group: 11, p: 65, n_count: 94, shells: [2, 8, 18, 27, 8, 2], quirk: "Produces vivid neon-green phosphors in flat-panel TV screens." },
    { n: 66, s: "Dy", name: "Dysprosium", mass: "162.50", cat: "lanthanide", period: 8, group: 12, p: 66, n_count: 97, shells: [2, 8, 18, 28, 8, 2], quirk: "Named from 'dysprositos' (hard to get); stabilizes wind turbine magnets." },
    { n: 67, s: "Ho", name: "Holmium", mass: "164.93", cat: "lanthanide", period: 8, group: 13, p: 67, n_count: 98, shells: [2, 8, 18, 29, 8, 2], quirk: "Has the highest magnetic permeability of any natural element." },
    { n: 68, s: "Er", name: "Erbium", mass: "167.26", cat: "lanthanide", period: 8, group: 14, p: 68, n_count: 99, shells: [2, 8, 18, 30, 8, 2], quirk: "Amplifies optical signals in transoceanic internet fiber optic cables!" },
    { n: 69, s: "Tm", name: "Thulium", mass: "168.93", cat: "lanthanide", period: 8, group: 15, p: 69, n_count: 100, shells: [2, 8, 18, 31, 8, 2], quirk: "Least abundant of all naturally stable lanthanides; portable X-ray source." },
    { n: 70, s: "Yb", name: "Ytterbium", mass: "173.05", cat: "lanthanide", period: 8, group: 16, p: 70, n_count: 103, shells: [2, 8, 18, 32, 8, 2], quirk: "Atomic clocks using ytterbium tick accurately within one second per cosmic age." },
    { n: 71, s: "Lu", name: "Lutetium", mass: "174.97", cat: "lanthanide", period: 8, group: 17, p: 71, n_count: 104, shells: [2, 8, 18, 32, 9, 2], quirk: "Heaviest and hardest of all lanthanide elements." },

    // Period 6 Transition Metals
    { n: 72, s: "Hf", name: "Hafnium", mass: "178.49", cat: "transition", period: 6, group: 4, p: 72, n_count: 106, shells: [2, 8, 18, 32, 10, 2], quirk: "Crucial gate dielectric material in sub-nanometer Intel processor chips." },
    { n: 73, s: "Ta", name: "Tantalum", mass: "180.95", cat: "transition", period: 6, group: 5, p: 73, n_count: 108, shells: [2, 8, 18, 32, 11, 2], quirk: "Manufactures microcapacitors in virtually all portable electronics." },
    { n: 74, s: "W", name: "Tungsten", mass: "183.84", cat: "transition", period: 6, group: 6, p: 74, n_count: 110, shells: [2, 8, 18, 32, 12, 2], quirk: "Highest melting point of all metals (3,422°C / 6,192°F)!" },
    { n: 75, s: "Re", name: "Rhenium", mass: "186.21", cat: "transition", period: 6, group: 7, p: 75, n_count: 111, shells: [2, 8, 18, 32, 13, 2], quirk: "Withstands extreme thermal stress inside supersonic jet engine turbine blades." },
    { n: 76, s: "Os", name: "Osmium", mass: "190.23", cat: "transition", period: 6, group: 8, p: 76, n_count: 114, shells: [2, 8, 18, 32, 14, 2], quirk: "The densest naturally occurring element: twice as dense as lead!" },
    { n: 77, s: "Ir", name: "Iridium", mass: "192.22", cat: "transition", period: 6, group: 9, p: 77, n_count: 115, shells: [2, 8, 18, 32, 15, 2], quirk: "Associated with the dinosaur-killing asteroid impact boundary layer worldwide." },
    { n: 78, s: "Pt", name: "Platinum", mass: "195.08", cat: "transition", period: 6, group: 10, p: 78, n_count: 117, shells: [2, 8, 18, 32, 17, 1], quirk: "Unreactive precious catalyst used in catalytic converters and cisplatin anti-cancer drugs." },
    { n: 79, s: "Au", name: "Gold", mass: "196.97", cat: "transition", period: 6, group: 11, p: 79, n_count: 118, shells: [2, 8, 18, 32, 18, 1], quirk: "Forged in kilonova neutron star collisions; completely resistant to corrosion." },
    { n: 80, s: "Hg", name: "Mercury", mass: "200.59", cat: "transition", period: 6, group: 12, p: 80, n_count: 121, shells: [2, 8, 18, 32, 18, 2], quirk: "Quicksilver: only elemental metal liquid at room temperature." },
    { n: 81, s: "Tl", name: "Thallium", mass: "204.38", cat: "post-transition", period: 6, group: 13, p: 81, n_count: 123, shells: [2, 8, 18, 32, 18, 3], quirk: "Called 'The Poisoner's Poison' due to historical forensic stealth." },
    { n: 82, s: "Pb", name: "Lead", mass: "207.2", cat: "post-transition", period: 6, group: 14, p: 82, n_count: 125, shells: [2, 8, 18, 32, 18, 4], quirk: "Dense radiation shielding; the final stable decay product of uranium." },
    { n: 83, s: "Bi", name: "Bismuth", mass: "208.98", cat: "post-transition", period: 6, group: 15, p: 83, n_count: 126, shells: [2, 8, 18, 32, 18, 5], quirk: "Forms iridescent rainbow stepped crystals; active ingredient in Pepto-Bismol." },
    { n: 84, s: "Po", name: "Polonium", mass: "209", cat: "post-transition", period: 6, group: 16, p: 84, n_count: 125, shells: [2, 8, 18, 32, 18, 6], quirk: "Discovered by Marie Curie; intensely radioactive alpha emitter." },
    { n: 85, s: "At", name: "Astatine", mass: "210", cat: "metalloid", period: 6, group: 17, p: 85, n_count: 125, shells: [2, 8, 18, 32, 18, 7], quirk: "Rarest natural element in Earth's crust: less than 1 gram exists on the whole planet at any time!" },
    { n: 86, s: "Rn", name: "Radon", mass: "222", cat: "noble-gas", period: 6, group: 18, p: 86, n_count: 136, shells: [2, 8, 18, 32, 18, 8], quirk: "Heavy radioactive gas seeping upward from decaying underground granite." },

    // Period 7 Alkali & Alkaline
    { n: 87, s: "Fr", name: "Francium", mass: "223", cat: "alkali-metal", period: 7, group: 1, p: 87, n_count: 136, shells: [2, 8, 18, 32, 18, 8, 1], quirk: "Second rarest natural element; so unstable it would vaporize itself instantly in macroscopic amounts." },
    { n: 88, s: "Ra", name: "Radium", mass: "226", cat: "alkaline-earth", period: 7, group: 2, p: 88, n_count: 138, shells: [2, 8, 18, 32, 18, 8, 2], quirk: "Historically painted on glowing watch dials before the radiation hazards were realized." },

    // ACTINIDES (89 to 103)
    { n: 89, s: "Ac", name: "Actinium", mass: "227", cat: "actinide", period: 9, group: 3, p: 89, n_count: 138, shells: [2, 8, 18, 32, 18, 9, 2], quirk: "Glows with eerie pale blue light in the dark due to intense airborne alpha ionization." },
    { n: 90, s: "Th", name: "Thorium", mass: "232.04", cat: "actinide", period: 9, group: 4, p: 90, n_count: 142, shells: [2, 8, 18, 32, 18, 10, 2], quirk: "Abundant nuclear fuel candidate in clean molten salt reactors." },
    { n: 91, s: "Pa", name: "Protactinium", mass: "231.04", cat: "actinide", period: 9, group: 5, p: 91, n_count: 140, shells: [2, 8, 18, 32, 20, 9, 2], quirk: "Superconducting at ultra-cold temperatures; highly radiotoxic." },
    { n: 92, s: "U", name: "Uranium", mass: "238.03", cat: "actinide", period: 9, group: 6, p: 92, n_count: 146, shells: [2, 8, 18, 32, 21, 9, 2], quirk: "Heaviest naturally occurring primordial element; fuels nuclear fission power." },
    { n: 93, s: "Np", name: "Neptunium", mass: "237", cat: "actinide", period: 9, group: 7, p: 93, n_count: 144, shells: [2, 8, 18, 32, 22, 9, 2], quirk: "First transuranic element ever synthesized in a cyclotron accelerator." },
    { n: 94, s: "Pu", name: "Plutonium", mass: "244", cat: "actinide", period: 9, group: 8, p: 94, n_count: 150, shells: [2, 8, 18, 32, 24, 8, 2], quirk: "Generates thermoelectric power for Voyager spacecraft traversing interstellar space!" },
    { n: 95, s: "Am", name: "Americium", mass: "243", cat: "actinide", period: 9, group: 9, p: 95, n_count: 148, shells: [2, 8, 18, 32, 25, 8, 2], quirk: "A microgram sits inside almost every home ionization smoke detector." },
    { n: 96, s: "Cm", name: "Curium", mass: "247", cat: "actinide", period: 9, group: 10, p: 96, n_count: 151, shells: [2, 8, 18, 32, 25, 9, 2], quirk: "Named in honor of Marie & Pierre Curie; powerful alpha emitter." },
    { n: 97, s: "Bk", name: "Berkelium", mass: "247", cat: "actinide", period: 9, group: 11, p: 97, n_count: 150, shells: [2, 8, 18, 32, 27, 8, 2], quirk: "Synthesized at UC Berkeley by bombarding americium with alpha projectiles." },
    { n: 98, s: "Cf", name: "Californium", mass: "251", cat: "actinide", period: 9, group: 12, p: 98, n_count: 153, shells: [2, 8, 18, 32, 28, 8, 2], quirk: "One of the most expensive chemicals on Earth ($27 million/gram); powerful neutron emitter." },
    { n: 99, s: "Es", name: "Einsteinium", mass: "252", cat: "actinide", period: 9, group: 13, p: 99, n_count: 153, shells: [2, 8, 18, 32, 29, 8, 2], quirk: "Discovered in the thermonuclear radioactive debris of the 1952 'Ivy Mike' hydrogen bomb test!" },
    { n: 100, s: "Fm", name: "Fermium", mass: "257", cat: "actinide", period: 9, group: 14, p: 100, n_count: 157, shells: [2, 8, 18, 32, 30, 8, 2], quirk: "Named after Enrico Fermi; the heaviest element that can be formed by neutron capture." },
    { n: 101, s: "Md", name: "Mendelevium", mass: "258", cat: "actinide", period: 9, group: 15, p: 101, n_count: 157, shells: [2, 8, 18, 32, 31, 8, 2], quirk: "Named in tribute to Dmitri Mendeleev, father of the Periodic Table." },
    { n: 102, s: "No", name: "Nobelium", mass: "259", cat: "actinide", period: 9, group: 16, p: 102, n_count: 157, shells: [2, 8, 18, 32, 32, 8, 2], quirk: "Named for Alfred Nobel, inventor of dynamite and founder of Nobel Prizes." },
    { n: 103, s: "Lr", name: "Lawrencium", mass: "266", cat: "actinide", period: 9, group: 17, p: 103, n_count: 163, shells: [2, 8, 18, 32, 32, 8, 3], quirk: "The final actinide, named for cyclotron pioneer Ernest Lawrence." },

    // Superheavy Transactinides (104 to 118)
    { n: 104, s: "Rf", name: "Rutherfordium", mass: "267", cat: "transition", period: 7, group: 4, p: 104, n_count: 163, shells: [2, 8, 18, 32, 32, 10, 2], quirk: "First superheavy element beyond the actinides; synthesized via heavy-ion fusion." },
    { n: 105, s: "Db", name: "Dubnium", mass: "268", cat: "transition", period: 7, group: 5, p: 105, n_count: 163, shells: [2, 8, 18, 32, 32, 11, 2], quirk: "Named after the Russian nuclear research center in Dubna." },
    { n: 106, s: "Sg", name: "Seaborgium", mass: "269", cat: "transition", period: 7, group: 6, p: 106, n_count: 163, shells: [2, 8, 18, 32, 32, 12, 2], quirk: "Named after Glenn Seaborg while he was still alive, sparking fierce controversy!" },
    { n: 107, s: "Bh", name: "Bohrium", mass: "270", cat: "transition", period: 7, group: 7, p: 107, n_count: 163, shells: [2, 8, 18, 32, 32, 13, 2], quirk: "Honors quantum physicist Niels Bohr." },
    { n: 108, s: "Hs", name: "Hassium", mass: "277", cat: "transition", period: 7, group: 8, p: 108, n_count: 169, shells: [2, 8, 18, 32, 32, 14, 2], quirk: "Forms volatile tetroxide compounds similar to osmium." },
    { n: 109, s: "Mt", name: "Meitnerium", mass: "278", cat: "transition", period: 7, group: 9, p: 109, n_count: 169, shells: [2, 8, 18, 32, 32, 15, 2], quirk: "Named after Lise Meitner, discoverer of nuclear fission." },
    { n: 110, s: "Ds", name: "Darmstadtium", mass: "281", cat: "transition", period: 7, group: 10, p: 110, n_count: 171, shells: [2, 8, 18, 32, 32, 17, 1], quirk: "Created at GSI in Darmstadt, Germany by fusing lead and nickel." },
    { n: 111, s: "Rg", name: "Roentgenium", mass: "282", cat: "transition", period: 7, group: 11, p: 111, n_count: 171, shells: [2, 8, 18, 32, 32, 18, 1], quirk: "Honors Wilhelm Röntgen, discoverer of mysterious X-radiation." },
    { n: 112, s: "Cn", name: "Copernicium", mass: "285", cat: "transition", period: 7, group: 12, p: 112, n_count: 173, shells: [2, 8, 18, 32, 32, 18, 2], quirk: "Relativistic electron speeds make it behave almost like a volatile noble gas!" },
    { n: 113, s: "Nh", name: "Nihonium", mass: "286", cat: "post-transition", period: 7, group: 13, p: 113, n_count: 173, shells: [2, 8, 18, 32, 32, 18, 3], quirk: "First chemical element discovered in Asia (RIKEN in Japan)." },
    { n: 114, s: "Fl", name: "Flerovium", mass: "289", cat: "post-transition", period: 7, group: 14, p: 114, n_count: 175, shells: [2, 8, 18, 32, 32, 18, 4], quirk: "Sits near the fabled theoretical 'Island of Stability' for superheavy nuclei." },
    { n: 115, s: "Mc", name: "Moscovium", mass: "290", cat: "post-transition", period: 7, group: 15, p: 115, n_count: 175, shells: [2, 8, 18, 32, 32, 18, 5], quirk: "Produced by shooting calcium-48 beams into americium targets for months." },
    { n: 116, s: "Lv", name: "Livermorium", mass: "293", cat: "post-transition", period: 7, group: 16, p: 116, n_count: 177, shells: [2, 8, 18, 32, 32, 18, 6], quirk: "Named for Lawrence Livermore National Laboratory in California." },
    { n: 117, s: "Ts", name: "Tennessine", mass: "294", cat: "nonmetal", period: 7, group: 17, p: 117, n_count: 177, shells: [2, 8, 18, 32, 32, 18, 7], quirk: "The second heaviest halogen, named for the US state of Tennessee." },
    { n: 118, s: "Og", name: "Oganesson", mass: "294", cat: "noble-gas", period: 7, group: 18, p: 118, n_count: 176, shells: [2, 8, 18, 32, 32, 18, 8], quirk: "The heaviest synthesized element; only a handful of individual atoms have ever existed!" }
];

// Ensure all e counts match protons
full118Elements.forEach(el => {
    el.e = el.p;
});

// Shell nomenclature letters
const shellLetters = ["K", "L", "M", "N", "O", "P", "Q"];

// Current State
let selectedElement = full118Elements[5]; // Default to Carbon
let simMode = "3d"; // "3d" or "2d"

// Three.js State
let scene3D, camera3D, renderer3D, nucleusGroup, shellsGroup;
let isDragging3D = false;
let previousMousePosition = { x: 0, y: 0 };
let cameraZoomDist = 80;

// DOM references
const grid = document.getElementById('periodic-grid');
const modal = document.getElementById('atomic-modal');
const btnClose = document.getElementById('btn-close-modal');
const btnSim3d = document.getElementById('btn-sim-3d');
const btnSim2d = document.getElementById('btn-sim-2d');
const threeViewport = document.getElementById('three-viewport');
const twoCanvas = document.getElementById('two-canvas');
const twoCtx = twoCanvas.getContext('2d');

const elemNumber = document.getElementById('elem-number');
const elemName = document.getElementById('elem-name');
const elemSymbol = document.getElementById('elem-symbol');
const elemMass = document.getElementById('elem-mass');
const elemCategory = document.getElementById('elem-category');
const countProtons = document.getElementById('count-protons');
const countNeutrons = document.getElementById('count-neutrons');
const countElectrons = document.getElementById('count-electrons');
const elemQuirk = document.getElementById('elem-quirk');
const shellTelemetry = document.getElementById('shell-telemetry');

// -------------------------------------------------------------
// 1. RENDER ALL 118 ELEMENTS WITH STANDARD IUPAC GRID
// -------------------------------------------------------------
function buildPeriodicTable() {
    grid.innerHTML = '';

    // Standard Periodic Table Slot Placeholders for 57-71 and 89-103 in Period 6 & 7 Group 3
    const lanthPlaceholder = document.createElement('div');
    lanthPlaceholder.className = 'element-tile cat-lanthanide placeholder-tile';
    lanthPlaceholder.style.gridColumn = 3;
    lanthPlaceholder.style.gridRow = 6;
    lanthPlaceholder.innerHTML = `
        <div class="tile-number">57-71</div>
        <div class="tile-symbol">La-Lu</div>
        <div class="tile-name">Lanthanoids</div>
    `;
    grid.appendChild(lanthPlaceholder);

    const actinPlaceholder = document.createElement('div');
    actinPlaceholder.className = 'element-tile cat-actinide placeholder-tile';
    actinPlaceholder.style.gridColumn = 3;
    actinPlaceholder.style.gridRow = 7;
    actinPlaceholder.innerHTML = `
        <div class="tile-number">89-103</div>
        <div class="tile-symbol">Ac-Lr</div>
        <div class="tile-name">Actinoids</div>
    `;
    grid.appendChild(actinPlaceholder);

    full118Elements.forEach(el => {
        const tile = document.createElement('div');
        tile.className = `element-tile cat-${el.cat}`;

        if (el.cat === 'lanthanide') {
            // Lanthanides: 57 to 71 mapped to row 9, columns 4 through 18
            const col = (el.n - 57) + 4;
            tile.style.gridColumn = col;
            tile.style.gridRow = 9;
        } else if (el.cat === 'actinide') {
            // Actinides: 89 to 103 mapped to row 10, columns 4 through 18
            const col = (el.n - 89) + 4;
            tile.style.gridColumn = col;
            tile.style.gridRow = 10;
        } else {
            // Main body elements (Periods 1 to 7, Groups 1 to 18)
            tile.style.gridColumn = el.group;
            tile.style.gridRow = el.period;
        }

        tile.innerHTML = `
            <div class="tile-number">${el.n}</div>
            <div class="tile-symbol">${el.s}</div>
            <div class="tile-name">${el.name}</div>
            <div class="tile-mass">${el.mass}</div>
        `;

        tile.onclick = () => openElementModal(el);
        grid.appendChild(tile);
    });
}

// -------------------------------------------------------------
// 2. OPEN INSPECTOR & UPDATE METRICS
// -------------------------------------------------------------
function openElementModal(el) {
    selectedElement = el;
    modal.classList.remove('hidden');

    elemNumber.textContent = el.n;
    elemName.textContent = el.name.toUpperCase();
    elemSymbol.textContent = el.s;
    elemMass.textContent = `${el.mass} u`;
    elemCategory.textContent = el.cat.replace('-', ' ').toUpperCase();

    countProtons.textContent = el.p;
    countNeutrons.textContent = el.n_count;
    countElectrons.textContent = el.e;
    elemQuirk.textContent = el.quirk;

    // Shell telemetry badges
    shellTelemetry.innerHTML = '<strong>ELECTRON SHELLS:</strong>';
    el.shells.forEach((electronsInShell, idx) => {
        const shellName = shellLetters[idx] || `S${idx + 1}`;
        const span = document.createElement('span');
        span.textContent = `${shellName}-Shell (n=${idx + 1}): ${electronsInShell} e⁻`;
        shellTelemetry.appendChild(span);
    });

    // Ensure renderer has valid dimensions now that modal is visible
    setTimeout(() => {
        resizeThree();
        resize2DCanvas();
        buildAtomicModel3D();
    }, 40);
}

btnClose.onclick = () => {
    modal.classList.add('hidden');
};

// -------------------------------------------------------------
// 3. THREE.JS 3D POLY-ASSET ATOMIC SIMULATION
// -------------------------------------------------------------
function initThree() {
    scene3D = new THREE.Scene();
    scene3D.fog = new THREE.FogExp2(0x020617, 0.0015);

    const w = threeViewport.clientWidth || 550;
    const h = threeViewport.clientHeight || 400;

    camera3D = new THREE.PerspectiveCamera(50, w / h, 0.1, 2000);
    camera3D.position.set(0, 0, cameraZoomDist);

    renderer3D = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer3D.setSize(w, h);
    renderer3D.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    threeViewport.appendChild(renderer3D.domElement);

    // Dynamic Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene3D.add(ambient);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.4);
    dirLight1.position.set(60, 90, 120);
    scene3D.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xff00aa, 0.8);
    dirLight2.position.set(-60, -50, -80);
    scene3D.add(dirLight2);

    nucleusGroup = new THREE.Group();
    shellsGroup = new THREE.Group();
    scene3D.add(nucleusGroup);
    scene3D.add(shellsGroup);

    setupCameraControls();
}

function resizeThree() {
    if (!renderer3D || !camera3D || !threeViewport) return;
    const w = threeViewport.clientWidth || 550;
    const h = threeViewport.clientHeight || 400;
    if (w > 0 && h > 0) {
        camera3D.aspect = w / h;
        camera3D.updateProjectionMatrix();
        renderer3D.setSize(w, h);
    }
}

function buildAtomicModel3D() {
    if (!scene3D || !nucleusGroup || !shellsGroup) return;

    // Clear previous elements
    while (nucleusGroup.children.length > 0) nucleusGroup.remove(nucleusGroup.children[0]);
    while (shellsGroup.children.length > 0) shellsGroup.remove(shellsGroup.children[0]);

    const el = selectedElement;

    // 1. DENSE POLY-ASSET NUCLEUS (Clustered Protons & Neutrons)
    const nucleonCount = Math.min(50, el.p + el.n_count);
    const protonGeom = new THREE.IcosahedronGeometry(2.4, 0); // Poly-asset faceted
    const neutronGeom = new THREE.DodecahedronGeometry(2.4, 0);

    const protonMat = new THREE.MeshStandardMaterial({ color: 0xef4444, flatShading: true, roughness: 0.35 });
    const neutronMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, flatShading: true, roughness: 0.5 });

    for (let i = 0; i < nucleonCount; i++) {
        const isProton = (i % 2 === 0);
        const mesh = new THREE.Mesh(isProton ? protonGeom : neutronGeom, isProton ? protonMat : neutronMat);

        const radius = Math.cbrt(i + 1) * 3.4;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        mesh.position.set(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi)
        );
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        nucleusGroup.add(mesh);
    }

    // 2. POLY-ASSET ELECTRON SHELLS (K, L, M, N...)
    const electronGeom = new THREE.OctahedronGeometry(1.6, 0);
    const electronMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, flatShading: true, emissive: 0x00a8ff, emissiveIntensity: 0.4 });

    el.shells.forEach((electronCount, shellIdx) => {
        const shellRadius = 24 + (shellIdx * 14);
        const shellAngleOffset = (shellIdx * 0.45);

        // Orbit Ring
        const ringGeom = new THREE.RingGeometry(shellRadius - 0.25, shellRadius + 0.25, 64);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.35
        });
        const ringMesh = new THREE.Mesh(ringGeom, ringMat);
        ringMesh.rotation.x = Math.PI / 2.3 + shellAngleOffset;
        ringMesh.rotation.y = shellAngleOffset;

        // Rotating group for this shell
        const shellGroup = new THREE.Group();
        shellGroup.rotation.x = Math.PI / 2.3 + shellAngleOffset;
        shellGroup.rotation.y = shellAngleOffset;
        shellGroup.userData = { speed: 0.025 / (shellIdx + 1), radius: shellRadius };

        for (let e = 0; e < electronCount; e++) {
            const eAngle = (e / electronCount) * Math.PI * 2;
            const eMesh = new THREE.Mesh(electronGeom, electronMat);
            eMesh.position.set(Math.cos(eAngle) * shellRadius, Math.sin(eAngle) * shellRadius, 0);

            // Add luminous poly halo
            const halo = new THREE.Mesh(new THREE.IcosahedronGeometry(2.2, 0), new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true, transparent: true, opacity: 0.5 }));
            eMesh.add(halo);

            shellGroup.add(eMesh);
        }

        shellsGroup.add(ringMesh);
        shellsGroup.add(shellGroup);
    });

    cameraZoomDist = 55 + (el.shells.length * 15);
    camera3D.position.set(0, 0, cameraZoomDist);
}

function setupCameraControls() {
    const el = threeViewport;

    el.addEventListener('mousedown', (e) => {
        isDragging3D = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging3D || !nucleusGroup) return;
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        nucleusGroup.rotation.y += deltaX * 0.01;
        nucleusGroup.rotation.x += deltaY * 0.01;

        shellsGroup.rotation.y += deltaX * 0.01;
        shellsGroup.rotation.x += deltaY * 0.01;

        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
        isDragging3D = false;
    });

    // Touch support for mobile / tablets
    el.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDragging3D = true;
            previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
    });

    window.addEventListener('touchmove', (e) => {
        if (!isDragging3D || e.touches.length !== 1 || !nucleusGroup) return;
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;

        nucleusGroup.rotation.y += deltaX * 0.015;
        nucleusGroup.rotation.x += deltaY * 0.015;

        shellsGroup.rotation.y += deltaX * 0.015;
        shellsGroup.rotation.x += deltaY * 0.015;

        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });

    window.addEventListener('touchend', () => {
        isDragging3D = false;
    });

    // Zoom via Mouse Wheel
    el.addEventListener('wheel', (e) => {
        e.preventDefault();
        cameraZoomDist = Math.max(20, Math.min(260, cameraZoomDist + e.deltaY * 0.15));
        camera3D.position.z = cameraZoomDist;
    }, { passive: false });
}

// -------------------------------------------------------------
// 4. 2D BOHR ELECTRON SHELL SIMULATOR
// -------------------------------------------------------------
function resize2DCanvas() {
    twoCanvas.width = threeViewport.clientWidth || 550;
    twoCanvas.height = threeViewport.clientHeight || 400;
}

let tick2D = 0;
function render2D() {
    if (simMode !== "2d" || modal.classList.contains('hidden')) return;
    tick2D++;

    twoCtx.clearRect(0, 0, twoCanvas.width, twoCanvas.height);
    const cx = twoCanvas.width / 2;
    const cy = twoCanvas.height / 2;
    const el = selectedElement;

    twoCtx.save();
    twoCtx.translate(cx, cy);

    // Glowing Nucleus Orb
    const nGrad = twoCtx.createRadialGradient(0, 0, 4, 0, 0, 24);
    nGrad.addColorStop(0, '#ef4444');
    nGrad.addColorStop(0.7, '#b91c1c');
    nGrad.addColorStop(1, 'rgba(185, 28, 28, 0)');
    twoCtx.fillStyle = nGrad;
    twoCtx.beginPath();
    twoCtx.arc(0, 0, 26, 0, Math.PI * 2);
    twoCtx.fill();

    // Nucleus Label
    twoCtx.fillStyle = '#fff';
    twoCtx.font = 'bold 13px Orbitron';
    twoCtx.textAlign = 'center';
    twoCtx.textBaseline = 'middle';
    twoCtx.fillText(`${el.s}`, 0, -4);
    twoCtx.font = '10px Rajdhani';
    twoCtx.fillText(`${el.p}p ${el.n_count}n`, 0, 9);

    // Concentric Shells (K, L, M, N...)
    el.shells.forEach((eCount, idx) => {
        const radius = 45 + (idx * 26);
        const shellName = shellLetters[idx] || `S${idx + 1}`;

        // Orbit Circle
        twoCtx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
        twoCtx.lineWidth = 1.5;
        twoCtx.setLineDash([4, 4]);
        twoCtx.beginPath();
        twoCtx.arc(0, 0, radius, 0, Math.PI * 2);
        twoCtx.stroke();
        twoCtx.setLineDash([]);

        // Shell Identifier Tag
        twoCtx.fillStyle = '#38bdf8';
        twoCtx.font = 'bold 11px Orbitron';
        twoCtx.fillText(`${shellName} (${eCount}e⁻)`, radius + 4, -4);

        // Orbiting Electrons
        const speed = (0.02 / (idx + 1)) * tick2D;
        for (let i = 0; i < eCount; i++) {
            const angle = (i / eCount) * Math.PI * 2 + speed;
            const ex = Math.cos(angle) * radius;
            const ey = Math.sin(angle) * radius;

            twoCtx.fillStyle = '#00f0ff';
            twoCtx.shadowColor = '#00f0ff';
            twoCtx.shadowBlur = 10;
            twoCtx.beginPath();
            twoCtx.arc(ex, ey, 4.5, 0, Math.PI * 2);
            twoCtx.fill();
            twoCtx.shadowBlur = 0;
        }
    });

    twoCtx.restore();
}

// -------------------------------------------------------------
// 5. ENGINE TOGGLES & ANIMATION LOOP
// -------------------------------------------------------------
btnSim3d.onclick = () => {
    simMode = "3d";
    btnSim3d.classList.add('active');
    btnSim2d.classList.remove('active');
    threeViewport.classList.remove('hidden');
    twoCanvas.classList.add('hidden');
    resizeThree();
};

btnSim2d.onclick = () => {
    simMode = "2d";
    btnSim2d.classList.add('active');
    btnSim3d.classList.remove('active');
    twoCanvas.classList.remove('hidden');
    threeViewport.classList.add('hidden');
    resize2DCanvas();
};

function mainLoop() {
    if (simMode === "3d" && renderer3D && scene3D && !modal.classList.contains('hidden')) {
        nucleusGroup.rotation.y += 0.005;
        nucleusGroup.rotation.x += 0.002;

        shellsGroup.children.forEach(child => {
            if (child.userData && child.userData.speed) {
                child.rotation.z += child.userData.speed;
            }
        });

        renderer3D.render(scene3D, camera3D);
    } else if (simMode === "2d") {
        render2D();
    }
    requestAnimationFrame(mainLoop);
}

// Window resize
window.addEventListener('resize', () => {
    resizeThree();
    resize2DCanvas();
});

// Boot Sequence
buildPeriodicTable();
initThree();
// Default to Carbon
openElementModal(full118Elements[5]);
mainLoop();
