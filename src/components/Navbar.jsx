import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'

const Navbar = ({ onNavigateToApp }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    handler() // run once on mount
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Roadmap', href: '#roadmap' },
  ]

  // Smooth scroll handler — prevents instant jump, animates smoothly
  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileMenuOpen(false)

    // Add small delay to allow menu to close first
    setTimeout(() => {
      const target = document.querySelector(href)
      if (!target) {
        console.warn(`Section ${href} not found`)
        return
      }

      const navHeight = 64
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
        duration: 800
      })
    }, 100)
  }

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -16, scaleY: 0.95 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.25, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, scaleY: 0.95, transition: { duration: 0.18, ease: 'easeIn' } },
  }

  return (
    <>
      <motion.nav
        // Always blurred dark — more opaque when scrolled
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 border-b
          bg-slate-900/80 backdrop-blur-2xl
          ${scrolled
            ? 'border-white/12 shadow-2xl shadow-black/40'
            : 'border-white/6'
          }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400/30 rounded-full blur-md scale-150" />
                <Zap className="relative w-6 h-6 text-cyan-400" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ViralAI
              </span>
            </motion.div>

            {/* Desktop nav items */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  className="relative px-4 py-2 text-white/70 hover:text-white text-sm font-medium transition-colors duration-200 group rounded-lg hover:bg-white/5 cursor-pointer"
                >
                  {item.label}
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-purple-400 to-pink-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                </motion.div>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={onNavigateToApp}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300 text-sm"
              >
                🚀 Launch App
              </motion.button>

              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden origin-top border-t border-white/10 bg-slate-900/97 backdrop-blur-2xl"
            >
              <div className="px-4 py-5 space-y-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    onClick={(e) => handleNavClick(e, item.href)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 text-white/80 hover:text-white font-medium py-3 px-3 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    {item.label}
                  </motion.div>
                ))}
                <div className="pt-3">
                  <motion.button
                    onClick={() => { onNavigateToApp(); setMobileMenuOpen(false) }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg"
                  >
                    🚀 Launch App
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div className="h-16" />
    </>
  )
}

export default Navbar