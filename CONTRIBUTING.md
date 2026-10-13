# 🌟 Contributing to Gyan's Wacky Web World

First off, thank you for considering contributing! Whether you are submitting a bizarre new mini-game, fixing an intentional glitch that wasn't supposed to be *that* broken, or submitting an idea, all help is welcome!

---

## 💡 Got a Crazy Idea?
We love hearing absurd, funny, zen, or creative concepts!
- Have an idea for a web toy, troll game, or cosmic simulator? Open a **[GitHub Discussion](https://github.com/Progyan94/gyan.app/discussions)** or file an **[Issue](https://github.com/Progyan94/gyan.app/issues)** with the tag `[Idea]`.
- Don't forget to **⭐ Star this repository** if you enjoy the chaos!

---

## 🛠️ How to Add a New Mini-Game in 3 Easy Steps

Adding a new game or experiment is straightforward:

### Step 1: Create Your Game Folder
Create a new directory under the root:
```
my-cool-game/
├── index.html
├── styles.css
└── script.js
```
- Make sure to add a back link in your game's HTML:
  ```html
  <a href="../index.html" class="back-btn">⮌ EXIT TO HUB</a>
  ```

### Step 2: Add Your Card to `index.html`
Open `index.html` and add an entry inside `<main class="grid-container" id="gamesGrid">`:
```html
<a href="my-cool-game/index.html" class="card" id="card-X" data-category="simulation">
    <div class="iframe-wrapper"><iframe src="my-cool-game/index.html"></iframe></div>
    <h2>My Cool Game</h2>
    <p>A 1-sentence hilarious or intriguing pitch.</p>
</a>
```
- Available categories: `space`, `simulation`, `troll`, `zen`, `puzzle`.

### Step 3: Test & Submit a PR
1. Open `index.html` in your browser (or run `npx serve .`).
2. Verify live search, category pills, and thumbnail preview work properly.
3. Commit and open a Pull Request!

---

## 📜 Acknowledgements & Attribution Rules
If your game is inspired by, an adaptation of, or borrows mechanics from classic Flash games, internet toys, or other creators (such as *Fireboy & Watergirl*, *Neal.fun*, *Sandboxels*, etc.):
- **Always include clear in-game credits** attributing the original creator/concept.
- Respect open-source licenses and give credit where credit is due.

Thank you for helping make the web weird, fun, and creative again! 🚀
