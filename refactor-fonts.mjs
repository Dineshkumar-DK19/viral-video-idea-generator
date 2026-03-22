import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function refactorFonts() {
  const landingFile = path.join(__dirname, 'src/components/Landing.jsx');
  let landing = fs.readFileSync(landingFile, 'utf8');

  // Hero section
  landing = landing.replace('text-5xl sm:text-6xl lg:text-7xl', 'text-4xl sm:text-5xl lg:text-7xl');
  landing = landing.replace('className="text-xl text-white/70', 'className="text-lg sm:text-xl text-white/70');
  landing = landing.replace(/text-3xl font-bold bg-clip-text/g, 'text-2xl sm:text-3xl font-bold bg-clip-text');

  // Section Headers
  landing = landing.replace(/text-4xl sm:text-5xl font-bold/g, 'text-3xl sm:text-4xl md:text-5xl font-bold');
  landing = landing.replace(/className="text-xl text-white\/60"/g, 'className="text-base sm:text-xl text-white/60"');
  
  // Features Cards
  landing = landing.replace(/className="text-xl font-bold text-white mb-2"/g, 'className="text-lg sm:text-xl font-bold text-white mb-2"');
  landing = landing.replace(/className="text-white\/60 leading-relaxed"/g, 'className="text-sm sm:text-base text-white/60 leading-relaxed"');
  
  // How it works
  landing = landing.replace(/className="text-2xl font-bold text-white mb-2"/g, 'className="text-xl sm:text-2xl font-bold text-white mb-2"');
  landing = landing.replace(/className="text-white\/60"/g, 'className="text-sm sm:text-base text-white/60"');
  
  // Use Cases
  landing = landing.replace(/className="text-3xl font-bold text-white mb-3"/g, 'className="text-2xl sm:text-3xl font-bold text-white mb-3"');
  landing = landing.replace(/className="text-xl text-white\/80 mb-4/g, 'className="text-lg sm:text-xl text-white/80 mb-4');
  landing = landing.replace(/className="text-white\/50 leading-relaxed"/g, 'className="text-sm sm:text-base text-white/50 leading-relaxed"');

  // Final CTA
  landing = landing.replace(/text-5xl sm:text-6xl font-bold text-white mb-6/g, 'text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6');
  landing = landing.replace(/className="text-xl text-white\/70 mb-10/g, 'className="text-lg sm:text-xl text-white/70 mb-10');

  fs.writeFileSync(landingFile, landing);
  
  const homeFile = path.join(__dirname, 'src/components/Home.jsx');
  let home = fs.readFileSync(homeFile, 'utf8');

  // Hero inputs / titles in Home
  home = home.replace(/text-3xl md:text-5xl font-bold/g, 'text-2xl md:text-4xl lg:text-5xl font-bold');
  home = home.replace(/text-lg font-semibold/g, 'text-base sm:text-lg font-semibold');
  home = home.replace(/text-lg font-bold text-gray-900/g, 'text-base sm:text-lg font-bold text-gray-900');
  home = home.replace(/text-2xl font-bold/g, 'text-xl sm:text-2xl font-bold');

  fs.writeFileSync(homeFile, home);
}

refactorFonts();
console.log('Responsive fonts applied successfully!');
