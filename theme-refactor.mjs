import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function refactorLanding() {
  const file = path.join(__dirname, 'src/components/Landing.jsx');
  let content = fs.readFileSync(file, 'utf8');

  // Background colors
  content = content.replace(/\bbg-slate-950\b/g, 'bg-white');
  content = content.replace(/\bbg-slate-900\b/g, 'bg-slate-50');
  content = content.replace(/\bbg-slate-800\b/g, 'bg-slate-100');
  
  // Gradients
  content = content.replace(/\bfrom-slate-900\b/g, 'from-slate-50');
  content = content.replace(/\bto-slate-900\b/g, 'to-slate-50');
  content = content.replace(/\bfrom-slate-800\b/g, 'from-slate-100');
  content = content.replace(/\bvia-slate-900\b/g, 'via-slate-50');
  
  // Text colors
  content = content.replace(/\btext-white\b/g, 'text-slate-900');
  // safety for opacities
  content = content.replace(/\btext-slate-900\/(\d+)\b/g, 'text-slate-900/$1'); 
  
  // Opacities & Borders (white overlays -> dark overlays)
  content = content.replace(/\bbg-white\/[0-9]+\b/g, 'bg-slate-900/5');
  content = content.replace(/\bborder-white\/[0-9]+\b/g, 'border-slate-900/10');
  content = content.replace(/\bborder-white\b/g, 'border-slate-300');
  
  // Shadows
  content = content.replace(/\bshadow-black\/40\b/g, 'shadow-slate-300/50');
  
  // Grids
  content = content.replace(/radial-gradient\(circle, white 1px/g, 'radial-gradient(circle, #cbd5e1 1px');
  
  fs.writeFileSync(file, content);
}

function refactorAnimatedBg() {
  const file = path.join(__dirname, 'src/components/AnimatedBackground.jsx');
  let content = fs.readFileSync(file, 'utf8');

  content = content.replace(/\bbg-slate-900\/60\b/g, 'bg-white/60');
  content = content.replace(/radial-gradient\(circle, white 1px/g, 'radial-gradient(circle, #cbd5e1 1px');
  
  fs.writeFileSync(file, content);
}

function refactorNavbar() {
  const file = path.join(__dirname, 'src/components/Navbar.jsx');
  let content = fs.readFileSync(file, 'utf8');

  // Navbar needs to support BOTH light (default) and dark.
  // Currently Navbar is coded with dark colors explicitly (e.g. bg-slate-900/80, text-white).
  // We want to transform them into: bg-white/80 dark:bg-slate-900/80
  
  const replacements = [
    { from: 'bg-slate-900/80', to: 'bg-white/80 dark:bg-slate-900/80' },
    { from: 'border-white/12', to: 'border-slate-900/10 dark:border-white/12' },
    { from: 'border-white/6', to: 'border-slate-900/5 dark:border-white/6' },
    { from: 'shadow-black/40', to: 'shadow-slate-300/50 dark:shadow-black/40' },
    { from: 'text-white/70', to: 'text-slate-600 dark:text-white/70' },
    { from: 'hover:text-white', to: 'hover:text-slate-900 dark:hover:text-white' },
    { from: 'hover:bg-white/5', to: 'hover:bg-slate-900/5 dark:hover:bg-white/5' },
    { from: 'p-2 text-white', to: 'p-2 text-slate-900 dark:text-white' }
  ];

  replacements.forEach(({from, to}) => {
    // Escape string for regex
    const regex = new RegExp(from.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
    content = content.replace(regex, to);
  });

  fs.writeFileSync(file, content);
}

refactorLanding();
refactorAnimatedBg();
refactorNavbar();

console.log('Theme transformations successful!');
