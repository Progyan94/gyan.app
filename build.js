const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const distDir = path.join(__dirname, 'dist');

const IGNORE_LIST = new Set([
    'node_modules',
    '.git',
    '.github',
    '.vercel',
    'src-tauri',
    'android',
    'ios',
    'dist',
    'package.json',
    'package-lock.json',
    'build.js',
    'capacitor.config.json',
    'Cargo.lock',
    'README.md',
    'CONTRIBUTING.md'
]);

function copyRecursive(src, dest) {
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        for (const file of fs.readdirSync(src)) {
            if (src === srcDir && IGNORE_LIST.has(file)) continue;
            copyRecursive(path.join(src, file), path.join(dest, file));
        }
    } else {
        fs.copyFileSync(src, dest);
    }
}

console.log('Building dist web bundle...');
if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

copyRecursive(srcDir, distDir);
console.log('Dist bundle successfully created in ./dist');
