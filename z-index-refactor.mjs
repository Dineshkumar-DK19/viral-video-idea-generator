import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function fixZIndexes() {
  const landingFile = path.join(__dirname, 'src/components/Landing.jsx');
  let landing = fs.readFileSync(landingFile, 'utf8');

  // TrustSection: The gradient was z-10 and marquee had no z-index, hiding the text.
  // Make gradient z-10 and marquee z-20 relative.
  landing = landing.replace(
    'className="flex gap-12 animate-marquee whitespace-nowrap"',
    'className="flex gap-12 animate-marquee whitespace-nowrap relative z-20"'
  );
  
  // Make sure TrustSection background is properly ordered
  landing = landing.replace(
    'className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-slate-900 z-10 pointer-events-none"',
    'className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-slate-900 z-10 pointer-events-none"'
  );

  // DemoModal: Make sure z-index is explicitly top level
  landing = landing.replace(
    'style={{ zIndex: 99999 }}',
    'style={{ zIndex: 100 }}'
  );

  fs.writeFileSync(landingFile, landing);


  // Rebuild Navbar fully to include the lost mobile menu and fix its z-index
  const navbarFile = path.join(__dirname, 'src/components/Navbar.jsx');
  const navbarContent = `import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'

const Navbar = ({ onNavigateToApp, onNavigateToLanding, isAppPage = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Idea Generator', href: '/' }
  ]

  const handleNavClick = (e, href, label) => {
    e.preventDefault()
    setMobileMenuOpen(false)

    if (label === 'Idea Generator') {
      if (onNavigateToApp) onNavigateToApp()
      return
    }

    if (label === 'Home') {
      if (isAppPage && onNavigateToLanding) {
        onNavigateToLanding()
      } else {
        const rootItem = document.getElementById('root');
        if (rootItem) {
          rootItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
      return
    }

    if (isAppPage && onNavigateToLanding) {
      onNavigateToLanding()
      setTimeout(() => {
        const target = document.querySelector(href)
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 150)
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const mobileMenuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } }
  }

  return (
    <>
      <motion.nav
        className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-400 border-b bg-slate-900/80 backdrop-blur-2xl \${
          scrolled ? 'border-white/12 shadow-2xl shadow-black/40' : 'border-white/6'
        }\`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={(e) => handleNavClick(e, '/', 'Home')}>
              <Zap className="w-6 h-6 text-cyan-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ViralAI
              </span>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={(e) => handleNavClick(e, item.href, item.label)}
                  className="px-4 py-2 text-white/70 hover:text-white text-sm font-medium transition-colors rounded-lg hover:bg-white/5"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {!isAppPage && (
                <button
                  onClick={onNavigateToApp}
                  className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg text-sm"
                >
                  🚀 Launch App
                </button>
              )}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay - z-40 so it sits under the z-50 Navbar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-3xl pt-24 px-6 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  onClick={(e) => handleNavClick(e, item.href, item.label)}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  className="text-2xl font-bold text-white/80 hover:text-white border-b border-white/10 pb-4 pt-2 cursor-pointer"
                >
                  {item.label}
                </motion.div>
              ))}
            </div>
            {!isAppPage && (
              <motion.button
                onClick={onNavigateToApp}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl text-center shadow-lg"
              >
                🚀 Launch App
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-16" />
    </>
  )
}

export default Navbar
`;

  fs.writeFileSync(navbarFile, navbarContent);
}

fixZIndexes();
console.log('Z-indexes and mobile menu restored successfully!');
