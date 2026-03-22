import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Star, Zap, TrendingUp, MessageSquare, BarChart3, Users, Sparkles, ArrowRight, Play } from 'lucide-react'

const Landing = ({ onNavigateToApp }) => {
  const [email, setEmail] = useState('')

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  }

  const floatingBlob = {
    animate: {
      y: [0, -30, 0],
      x: [0, 20, 0],
      transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
    },
  }

  // Hero Section
  const HeroSection = () => (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 overflow-hidden flex items-center justify-center pt-20">
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl"
        animate={floatingBlob.animate}
        initial={{ y: 0, x: 0 }}
      />
      <motion.div
        className="absolute bottom-32 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
        animate={{
          y: [0, 30, 0],
          x: [0, -30, 0],
          transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <div className="inline-block mb-6">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-white/80">AI-Powered Viral Content Platform</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          Create Viral Content{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            in Seconds
          </span>{' '}
          🚀
        </motion.h1>

        <motion.p
          className="text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          AI-powered platform to generate ideas, scripts & trends that actually go viral. Used by 10,000+ creators
          worldwide.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <motion.button
            onClick={onNavigateToApp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
          >
            Start Creating
            <ArrowRight className="inline ml-2 w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white/10 border border-white/30 text-white font-bold rounded-lg backdrop-blur-md hover:bg-white/20 transition-all duration-300"
          >
            <Play className="inline mr-2 w-4 h-4" />
            Try Demo
          </motion.button>
        </motion.div>

        <motion.div
          className="relative mx-auto max-w-4xl"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-2xl" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 overflow-hidden">
            <div className="bg-slate-900 rounded-lg aspect-video flex items-center justify-center">
              <Play className="w-20 h-20 text-white/40" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )

  // Trust Section
  const TrustSection = () => (
    <motion.section
      className="py-16 bg-slate-900 border-y border-white/10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p className="text-center text-white/60 mb-8">
          Trusted by creators, influencers, and marketing teams
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {['Creator Hub', 'TrendLabs', 'ViralVerse', 'ContentForce', 'GrowthAI'].map((brand, i) => (
            <motion.div key={i} variants={fadeInUp} className="text-white/40 font-semibold text-lg">
              {brand}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )

  // Features Section
  const features = [
    {
      icon: Zap,
      title: 'AI Idea Generator',
      description: 'Generate unlimited viral content ideas tailored to your niche',
    },
    {
      icon: TrendingUp,
      title: 'Trend Detection Engine',
      description: 'Discover trending topics before they go mainstream',
    },
    {
      icon: MessageSquare,
      title: 'Smart Script Builder',
      description: 'Create hook, content, and CTA in seconds with AI',
    },
    {
      icon: BarChart3,
      title: 'Hashtag Optimization',
      description: 'Generate high-performing hashtags automatically',
    },
    {
      icon: Users,
      title: 'Multi-Platform Support',
      description: 'Optimize for YouTube, TikTok, Instagram, and more',
    },
    {
      icon: Sparkles,
      title: 'Audience Personalization',
      description: 'Target specific demographics and interests',
    },
  ]

  const FeaturesSection = () => (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Powerful Features</h2>
          <p className="text-xl text-white/60">Everything you need to create viral content</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <Icon className="w-12 h-12 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/60">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )

  // How It Works Section
  const HowItWorks = () => (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-xl text-white/60">Three simple steps to viral success</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { step: 1, title: 'Enter Your Topic', icon: '🎯' },
            { step: 2, title: 'AI Generates Ideas', icon: '✨' },
            { step: 3, title: 'Publish & Go Viral', icon: '🚀' },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeInUp} className="relative">
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="text-6xl mb-4 inline-block"
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/60">
                  {i === 0 && 'Tell AI your content niche or topic'}
                  {i === 1 && 'Get instant video ideas, scripts & hashtags'}
                  {i === 2 && 'Copy, post, and watch engagement soar'}
                </p>
              </div>
              {i < 2 && (
                <motion.div
                  className="hidden md:block absolute top-1/3 -right-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <ChevronRight className="w-8 h-8 text-white/30" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )

  // Use Cases Section
  const useCases = [
    {
      icon: '📱',
      title: 'Content Creators',
      benefit: 'Never run out of video ideas. Generate 10x more content in 1/10th the time.',
    },
    {
      icon: '⭐',
      title: 'Influencers',
      benefit: 'Stay ahead of trends and maintain consistent growth across platforms.',
    },
    {
      icon: '🚀',
      title: 'Startups',
      benefit: 'Launch viral marketing campaigns without expensive agencies.',
    },
    {
      icon: '📊',
      title: 'Marketing Teams',
      benefit: 'Streamline content planning and boost team productivity instantly.',
    },
  ]

  const UseCasesSection = () => (
    <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Use Cases</h2>
          <p className="text-xl text-white/60">Designed for everyone who creates content</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {useCases.map((useCase, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl hover:border-cyan-400/30 transition-all"
            >
              <div className="text-4xl mb-4">{useCase.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-2">{useCase.title}</h3>
              <p className="text-white/70">{useCase.benefit}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )

  // Testimonials Section
  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Content Creator',
      avatar: '👨‍💼',
      quote: 'This helped me reach 1M views in 2 weeks! The AI ideas are incredibly accurate.',
    },
    {
      name: 'Sarah Williams',
      role: 'Influencer',
      avatar: '👩‍💼',
      quote: 'I save 10 hours per week on content planning. ViralAI is a game-changer.',
    },
    {
      name: 'Mike Johnson',
      role: 'Marketing Manager',
      avatar: '👨‍💻',
      quote: 'Our engagement increased 300% in one month. Simply unbelievable results.',
    },
  ]

  const TestimonialsSection = () => (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">What Creators Say</h2>
          <p className="text-xl text-white/60">Join thousands of satisfied users</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-white/60 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-white/80 italic">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )

  // Roadmap Section
  const roadmapItems = [
    { phase: 'Now', title: 'Real-time Trend Scraping', description: 'Access live trending topics across all platforms' },
    { phase: 'Coming Soon', title: 'AI Virality Prediction', description: 'Get accuracy scores before publishing' },
    { phase: 'Q2 2026', title: 'Analytics Dashboard', description: 'Track performance across all content' },
    { phase: 'Q3 2026', title: 'Creator Monetization', description: 'Earn from insights and collaborations' },
  ]

  const RoadmapSection = () => (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Future Vision</h2>
          <p className="text-xl text-white/60">What's coming next to ViralAI</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {roadmapItems.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden group hover:border-cyan-400/50 transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 mb-4 text-xs font-bold text-cyan-400 bg-cyan-400/10 rounded-full">
                  {item.phase}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/70">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )

  // Final CTA Section
  const FinalCTASection = () => (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h2
          className="text-5xl sm:text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Ready to Go Viral?
        </motion.h2>

        <motion.p
          className="text-xl text-white/70 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Start creating high-performing content today. No credit card required.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={onNavigateToApp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-lg shadow-2xl hover:shadow-purple-500/50 transition-all"
          >
            Launch App
            <ArrowRight className="inline ml-2 w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )

  // Footer
  const Footer = () => (
    <footer className="bg-slate-950 border-t border-white/10 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">ViralAI</h3>
            <p className="text-white/60">The AI platform for viral content creation.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li className="hover:text-white cursor-pointer">Features</li>
              <li className="hover:text-white cursor-pointer">Pricing</li>
              <li className="hover:text-white cursor-pointer">How It Works</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li className="hover:text-white cursor-pointer">About</li>
              <li className="hover:text-white cursor-pointer">Blog</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li className="hover:text-white cursor-pointer">Privacy</li>
              <li className="hover:text-white cursor-pointer">Terms</li>
              <li className="hover:text-white cursor-pointer">Cookie Policy</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-white/60 text-sm">
          <p>&copy; 2026 ViralAI. All rights reserved. 🚀</p>
        </div>
      </div>
    </footer>
  )

  return (
    <div className="bg-slate-900 text-white overflow-hidden">
      <HeroSection />
      <TrustSection />
      <FeaturesSection />
      <HowItWorks />
      <UseCasesSection />
      <TestimonialsSection />
      <RoadmapSection />
      <FinalCTASection />
      <Footer />
    </div>
  )
}

export default Landing
