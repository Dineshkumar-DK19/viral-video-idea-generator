const fs = require('fs');
const path = require('path');

const files = [
  'src/components/Landing.jsx',
  'src/components/Navbar.jsx',
  'src/components/AnimatedBackground.jsx'
];

files.forEach(relativePath => {
  const file = path.join(__dirname, relativePath);
  if (!fs.existsSync(file)) return;
  
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
  content = content.replace(/\btext-slate-900\/(\d+)\b/g, 'text-slate-900/$1'); // safety
  
  // Opacities & Borders (white overlays -> dark overlays)
  content = content.replace(/\bbg-white\/[0-9]+\b/g, 'bg-slate-900/5');
  content = content.replace(/\bborder-white\/[0-9]+\b/g, 'border-slate-900/10');
  content = content.replace(/\bborder-white\b/g, 'border-slate-300');
  
  // Shadows
  content = content.replace(/\bshadow-black\/40\b/g, 'shadow-slate-300/50');
  
  // Grids
  content = content.replace(/radial-gradient\(circle, white 1px/g, 'radial-gradient(circle, #cbd5e1 1px');
  
  fs.writeFileSync(file, content);
});

// For Home.jsx, we just strip all 'dark:' classes to enforce light theme only
const homeFile = path.join(__dirname, 'src/components/Home.jsx');
if (fs.existsSync(homeFile)) {
  let homeContent = fs.readFileSync(homeFile, 'utf8');
  homeContent = homeContent.replace(/\bdark:[a-zA-Z0-9_/-]+\b/g, '');
  // Also remove the dark mode logic in getInitialTheme
  homeContent = homeContent.replace(/return window\.matchMedia.*: "light";/g, 'return "light";');
  // And the toggleTheme classList part
  homeContent = homeContent.replace(/document\.documentElement\.classList\.toggle\("dark", next === "dark"\);/g, 'document.documentElement.classList.remove("dark");');
  
  fs.writeFileSync(homeFile, homeContent);
}

// App.css or index.css might have root dark mode
const cssFile = path.join(__dirname, 'src/index.css');
if (fs.existsSync(cssFile)) {
  let cssContent = fs.readFileSync(cssFile, 'utf8');
  cssContent = cssContent.replace(/@media \(prefers-color-scheme: dark\) \{[\s\S]*?\}/g, '');
  fs.writeFileSync(cssFile, cssContent);
}

console.log('Replacements completed.');
