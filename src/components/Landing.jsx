import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ChevronRight, ChevronLeft, Star, Zap, TrendingUp, MessageSquare, BarChart3, Users, Sparkles, ArrowRight, Play, X } from 'lucide-react'
import Navbar from './Navbar'
import AnimatedBackground from './AnimatedBackground'

// ── Shared variants ────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay } }),
}
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const cardItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// ── Demo Modal — rendered via portal directly on document.body ──
const DemoModal = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        style={{ zIndex: 100 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-3xl bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          initial={{ scale: 0.88, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-slate-800/60">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-white font-semibold text-sm">ViralAI — Product Demo</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="relative aspect-video bg-slate-950 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-center px-8">
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl shadow-purple-500/40"
              >
                <Play className="w-9 h-9 text-white ml-1 fill-white" />
              </motion.div>
              <p className="text-white/60 text-sm max-w-xs">
                Demo video coming soon! Add your YouTube/Vimeo embed URL inside{' '}
                <code className="text-purple-400 text-xs">DemoModal</code>.
              </p>
              <div className="w-full max-w-sm">
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

// ── Hero ───────────────────────────────────────────────────────
const HeroSection = ({ onNavigateToApp }) => {
  const [demoOpen, setDemoOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6])

  const stats = [
    { value: '10K+', label: 'Active Creators' },
    { value: '2M+', label: 'Ideas Generated' },
    { value: '98%', label: 'Satisfaction Rate' },
  ]

  return (
    <section className="relative min-h-screen bg-slate-900 overflow-hidden flex items-center justify-center pt-20">
      <AnimatedBackground />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="mb-6">
          <motion.div
            whileHover={{ scale: 1.06 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md"
          >
            <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </motion.div>
            <span className="text-sm text-white/80">Creativity Begins</span>
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
        >
          Create Viral Content{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            in Seconds
          </span>{' '}
          🚀
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
        >
          AI-powered platform to generate ideas, scripts & trends that actually go viral. Used by 10,000+ creators worldwide.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
          variants={fadeUp} initial="hidden" animate="visible" custom={0.3}
        >
          <motion.button
            onClick={onNavigateToApp}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168,85,247,0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            Start Creating
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-10 mb-14"
          variants={fadeUp} initial="hidden" animate="visible" custom={0.4}
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">{s.value}</div>
              <div className="text-sm text-white/50 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>

      {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}
    </section>
  )
}

// ── Trust / Logo Bar ───────────────────────────────────────────
const TrustSection = () => {
  const brands = ['Creator Hub', 'TrendLabs', 'ViralVerse', 'ContentForce', 'GrowthAI', 'SocialEdge', 'BuzzFactory']

  return (
    <section className="py-14 bg-slate-900 border-y border-white/8 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-slate-900 z-10 pointer-events-none" />
      <motion.p
        className="text-center text-white/40 text-sm mb-8 tracking-widest uppercase"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      >
        Trusted by creators, influencers & marketing teams
      </motion.p>
      <div className="flex gap-12 animate-marquee whitespace-nowrap relative z-20">
        {[...brands, ...brands].map((brand, i) => (
          <div key={i} className="inline-flex items-center gap-2 text-white/30 font-semibold text-lg hover:text-white/60 transition-colors cursor-default">
            <Sparkles className="w-3 h-3 text-purple-400/40" />
            {brand}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 22s linear infinite; }
      `}</style>
    </section>
  )
}

// ── Features ───────────────────────────────────────────────────
const FeaturesSection = () => {
  const features = [
    { icon: Zap, title: 'AI Idea Generator', description: 'Generate unlimited viral content ideas tailored to your niche', color: 'from-purple-500 to-purple-700', glow: 'group-hover:shadow-purple-500/20' },
    { icon: TrendingUp, title: 'Trend Detection Engine', description: 'Discover trending topics before they go mainstream', color: 'from-pink-500 to-pink-700', glow: 'group-hover:shadow-pink-500/20' },
    { icon: MessageSquare, title: 'Smart Script Builder', description: 'Create hook, content, and CTA in seconds with AI', color: 'from-cyan-500 to-cyan-700', glow: 'group-hover:shadow-cyan-500/20' },
    { icon: BarChart3, title: 'Hashtag Optimization', description: 'Generate high-performing hashtags automatically', color: 'from-blue-500 to-blue-700', glow: 'group-hover:shadow-blue-500/20' },
    { icon: Users, title: 'Multi-Platform Support', description: 'Optimize for YouTube, TikTok, Instagram, and more', color: 'from-violet-500 to-violet-700', glow: 'group-hover:shadow-violet-500/20' },
    { icon: Sparkles, title: 'Audience Personalization', description: 'Target specific demographics and interests', color: 'from-rose-500 to-rose-700', glow: 'group-hover:shadow-rose-500/20' },
  ]

  return (
    <section id="features" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-white/10 to-transparent" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Zap className="w-3 h-3" /> What We Offer
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Powerful Features</h2>
          <p className="text-base sm:text-xl text-white/60">Everything you need to create viral content</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i} variants={cardItem}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative p-7 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300 overflow-hidden cursor-default shadow-xl ${feature.glow} hover:shadow-2xl`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/8 to-pink-600/8 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/3 to-transparent rounded-bl-3xl" />
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-5 shadow-inner`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-white/60 leading-relaxed">{feature.description}</p>
                </div>
                <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-40 transition-opacity`} />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ── How It Works ───────────────────────────────────────────────
const HowItWorksSection = () => {
  const steps = [
    { step: 1, title: 'Enter Your Topic', icon: '🎯', desc: 'Tell AI your content niche or topic' },
    { step: 2, title: 'AI Generates Ideas', icon: '✨', desc: 'Get instant video ideas, scripts & hashtags' },
    { step: 3, title: 'Publish & Go Viral', icon: '🚀', desc: 'Copy, post, and watch engagement soar' },
  ]

  return (
    <section id="how-it-works" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[400, 600, 800].map((s, i) => (
          <div key={i} className="absolute rounded-full border border-white/3" style={{ width: s, height: s }} />
        ))}
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" /> Simple Process
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-base sm:text-xl text-white/60">Three simple steps to viral success</p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-[20%] right-[20%] h-px -translate-y-8">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-cyan-500/40"
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }} viewport={{ once: true }}
              style={{ transformOrigin: 'left' }}
            />
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            {steps.map((item, i) => (
              <motion.div key={i} variants={cardItem} className="relative text-center group">
                <div className="absolute  -top-3 z-2 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-purple-500/30">
                  {item.step}
                </div>
                <div className="pt-8 pb-6 px-6 rounded-2xl bg-white/4 border border-white/8 backdrop-blur-sm group-hover:border-white/16 group-hover:bg-white/6 transition-all duration-300">
                  <motion.div whileHover={{ scale: 1.15, rotate: 8 }} className="text-6xl mb-5 inline-block">{item.icon}</motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base text-white/60">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ── Use Cases – Tab Carousel ───────────────────────────────────
const UseCasesSection = () => {
  const [active, setActive] = useState(0)
  const useCases = [
    { icon: '📱', title: 'Content Creators', benefit: 'Never run out of video ideas. Generate 10x more content in 1/10th the time.', detail: 'Schedule posts, track performance, and maintain a consistent upload rhythm.' },
    { icon: '⭐', title: 'Influencers', benefit: 'Stay ahead of trends and maintain consistent growth across platforms.', detail: 'Identify what your audience wants before they even know it themselves.' },
    { icon: '🚀', title: 'Startups', benefit: 'Launch viral marketing campaigns without expensive agencies.', detail: 'Bootstrap your content strategy and compete with established brands.' },
    { icon: '📊', title: 'Marketing Teams', benefit: 'Streamline content planning and boost team productivity instantly.', detail: 'Centralize your workflow and produce more high-quality content at scale.' },
  ]

  useEffect(() => {
    const timer = setInterval(() => setActive((a) => (a + 1) % useCases.length), 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Users className="w-3 h-3" /> Who It's For
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Use Cases</h2>
          <p className="text-base sm:text-xl text-white/60">Designed for everyone who creates content</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {useCases.map((u, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                active === i
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>{u.icon}</span> {u.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative p-10 rounded-3xl bg-gradient-to-br from-white/8 to-white/3 border border-white/12 backdrop-blur-xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-600/15 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-600/10 to-transparent rounded-full blur-xl" />
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} className="text-7xl shrink-0">
                {useCases[active].icon}
              </motion.div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">{useCases[active].title}</h3>
                <p className="text-lg sm:text-xl text-white/80 mb-4 leading-relaxed">{useCases[active].benefit}</p>
                <p className="text-sm sm:text-base text-white/50 leading-relaxed">{useCases[active].detail}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-8 justify-center md:justify-start">
              {useCases.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${active === i ? 'w-8 bg-purple-400' : 'w-1.5 bg-white/20'}`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

// ── Testimonials – Card Carousel ───────────────────────────────
const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0)
  const testimonials = [
    { name: 'Alex Chen', role: 'Content Creator', avatar: '👨‍💼', quote: 'This helped me reach 1M views in 2 weeks! The AI ideas are incredibly accurate and on-trend.', rating: 5 },
    { name: 'Sarah Williams', role: 'Influencer', avatar: '👩‍💼', quote: 'I save 10 hours per week on content planning. ViralAI is genuinely a game-changer for my workflow.', rating: 5 },
    { name: 'Mike Johnson', role: 'Marketing Manager', avatar: '👨‍💻', quote: 'Our engagement increased 300% in one month. Simply unbelievable results across all platforms.', rating: 5 },
    { name: 'Priya Sharma', role: 'YouTuber', avatar: '👩‍🎤', quote: 'The script builder is magic. I went from blank page to polished content in minutes.', rating: 5 },
    { name: 'James Lee', role: 'Brand Strategist', avatar: '🧑‍💼', quote: 'My clients are amazed at the speed and quality. ViralAI is now core to every campaign.', rating: 5 },
  ]

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  useEffect(() => {
    const t = setInterval(next, 4000)
    return () => clearInterval(t)
  }, [])

  const visible = [
    (current - 1 + testimonials.length) % testimonials.length,
    current,
    (current + 1) % testimonials.length,
  ]

  return (
    <section id="testimonials" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Star className="w-3 h-3 fill-yellow-400" /> Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">What Creators Say</h2>
          <p className="text-base sm:text-xl text-white/60">Join thousands of satisfied users</p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 overflow-hidden">
            {visible.map((idx, pos) => {
              const t = testimonials[idx]
              const isCenter = pos === 1
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: isCenter ? 1 : 0.5, scale: isCenter ? 1 : 0.93, y: isCenter ? 0 : 12 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className={`p-7 rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
                    isCenter
                      ? 'bg-white/8 border-white/20 shadow-2xl shadow-purple-500/10'
                      : 'bg-white/3 border-white/8 hidden md:block'
                  }`}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white/80 italic mb-6 leading-relaxed">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{t.avatar}</div>
                    <div>
                      <h4 className="text-white font-bold">{t.name}</h4>
                      <p className="text-white/50 text-sm">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="p-2.5 rounded-full bg-white/8 border border-white/10 hover:bg-white/16 text-white transition-all hover:scale-110">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-purple-400' : 'w-1.5 bg-white/20'}`}
                />
              ))}
            </div>
            <button onClick={next} className="p-2.5 rounded-full bg-white/8 border border-white/10 hover:bg-white/16 text-white transition-all hover:scale-110">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Roadmap ────────────────────────────────────────────────────
const RoadmapSection = () => {
  const roadmapItems = [
    { phase: 'Now', title: 'Real-time Trend Scraping', description: 'Access live trending topics across all platforms', done: true },
    { phase: 'Coming Soon', title: 'AI Virality Prediction', description: 'Get accuracy scores before publishing', done: false },
    { phase: 'Q2 2026', title: 'Analytics Dashboard', description: 'Track performance across all content', done: false },
    { phase: 'Q3 2026', title: 'Creator Monetization', description: 'Earn from insights and collaborations', done: false },
  ]

  return (
    <section id="roadmap" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
            <TrendingUp className="w-3 h-3" /> What's Next
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Future Vision</h2>
          <p className="text-base sm:text-xl text-white/60">What's coming next to ViralAI</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/40 via-pink-500/30 to-transparent hidden md:block" />
          <motion.div className="space-y-8" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {roadmapItems.map((item, i) => (
              <motion.div key={i} variants={cardItem} className={`flex flex-col md:flex-row items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    className={`relative p-7 rounded-2xl border backdrop-blur-xl overflow-hidden group transition-all duration-300 ${
                      item.done ? 'bg-purple-600/10 border-purple-500/30 hover:border-purple-500/50' : 'bg-white/4 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-600/15 to-pink-600/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${item.done ? 'text-green-400 bg-green-400/10 border border-green-400/20' : 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/20'}`}>
                          {item.done ? '✓ ' : ''}{item.phase}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-sm sm:text-base text-white/60">{item.description}</p>
                    </div>
                  </motion.div>
                </div>
                <div className="hidden md:flex w-4 h-4 rounded-full border-2 shrink-0 z-10 relative border-purple-400 bg-slate-900 shadow-lg shadow-purple-500/30">
                  {item.done && <div className="absolute inset-0.5 rounded-full bg-purple-400" />}
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ── Final CTA ──────────────────────────────────────────────────
const FinalCTASection = ({ onNavigateToApp }) => (
  <section className="py-28 bg-slate-900 relative overflow-hidden">
    <motion.div
      className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
      animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"
      animate={{ scale: [1.2, 1, 1.2], x: [0, -30, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <motion.div
        className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/15 backdrop-blur-md"
        initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
      >
        <Zap className="w-4 h-4 text-yellow-400" />
        <span className="text-sm text-white/70">No credit card required</span>
      </motion.div>

      <motion.h2
        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} viewport={{ once: true }}
      >
        Ready to{' '}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
          Go Viral?
        </span>
      </motion.h2>

      <motion.p
        className="text-lg sm:text-xl text-white/70 mb-10 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}
      >
        Start creating high-performing content today.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}
      >
        <motion.button
          onClick={onNavigateToApp}
          whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(168,85,247,0.5)' }}
          whileTap={{ scale: 0.95 }}
          className="group px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-lg shadow-2xl transition-all flex items-center justify-center gap-2"
        >
          Launch App
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
    </div>
  </section>
)

// ── Footer ─────────────────────────────────────────────────────
const Footer = () => {
  const cols = [
    { title: 'Product', links: ['Features', 'Pricing', 'How It Works'] },
    { title: 'Company', links: ['About', 'Blog', 'Contact'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Cookie Policy'] },
  ]

  return (
    <footer className="bg-slate-950 border-t border-white/8 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-cyan-400" />
              <h3 className="text-white font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">ViralAI</h3>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">The AI platform for viral content creation. Used by 10K+ creators worldwide.</p>
            <div className="flex gap-3 mt-5">
              {['🐦', '💼', '📸'].map((icon, i) => (
                <div key={i} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sm cursor-pointer hover:bg-white/10 transition-colors">{icon}</div>
              ))}
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-bold mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}><span className="text-white/50 hover:text-white text-sm cursor-pointer transition-colors hover:translate-x-1 inline-block">{link}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">© 2026 ViralAI. All rights reserved.</p>
          <p className="text-white/30 text-sm">Made with ❤️ for creators everywhere 🚀</p>
        </div>
      </div>
    </footer>
  )
}

// ── Main ───────────────────────────────────────────────────────
const Landing = ({ onNavigateToApp }) => (
  <div className="bg-slate-900 text-white overflow-hidden">
    <Navbar onNavigateToApp={onNavigateToApp} />
    <HeroSection onNavigateToApp={onNavigateToApp} />
    <TrustSection />
    <FeaturesSection />
    <HowItWorksSection />
    <UseCasesSection />
    <TestimonialsSection />
    <RoadmapSection />
    <FinalCTASection onNavigateToApp={onNavigateToApp} />
    <Footer />
  </div>
)

export default Landing