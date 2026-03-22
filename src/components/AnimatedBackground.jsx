import { motion } from 'framer-motion'

const AnimatedBackground = () => {
  // Orbs - faster durations (was 10+i*3, now 4+i*1.5)
  const floatingVariants = {
    animate: (i) => ({
      y: [0, -50, 0],
      x: [0, 30 * Math.sin(i * 1.5), 0],
      rotate: [0, 360],
      transition: {
        duration: 4 + i * 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    }),
  }

  // Pulse orbs - faster (was 5+i, now 2+i*0.5)
  const pulseVariants = {
    animate: (i) => ({
      scale: [1, 1.4, 1],
      opacity: [0.3, 0.8, 0.3],
      transition: { duration: 2 + i * 0.5, repeat: Infinity, ease: 'easeInOut' },
    }),
  }

  // Drift blobs - faster (was 6+i*2, now 2.5+i*0.8)
  const driftVariants = {
    animate: (i) => ({
      x: [0, 70 * Math.cos(i), 0],
      y: [0, 50 * Math.sin(i), 0],
      opacity: [0.4, 0.9, 0.4],
      transition: {
        duration: 2.5 + i * 0.8,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: i * 0.3,
      },
    }),
  }

  // Particles - faster (was 4+i%5, now 1.2+i%3*0.4)
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: `${(i * 23 + 7) % 100}%`,
    y: `${(i * 17 + 11) % 100}%`,
    size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
    color: i % 3 === 0 ? 'bg-purple-400' : i % 3 === 1 ? 'bg-pink-400' : 'bg-cyan-400',
    delay: i * 0.15,
    duration: 1.2 + (i % 3) * 0.4,
  }))

  // Shapes - faster (was 6s, now 2.5s)
  const shapes = [
    { type: 'diamond', top: '15%', left: '8%', size: 16, color: 'border-purple-500/30', delay: 0 },
    { type: 'ring', top: '70%', left: '5%', size: 24, color: 'border-cyan-400/20', delay: 0.4 },
    { type: 'diamond', top: '40%', right: '6%', size: 12, color: 'border-pink-500/30', delay: 0.8 },
    { type: 'ring', top: '20%', right: '12%', size: 20, color: 'border-purple-400/25', delay: 0.2 },
    { type: 'diamond', top: '80%', right: '10%', size: 10, color: 'border-cyan-300/20', delay: 0.6 },
    { type: 'ring', top: '55%', left: '15%', size: 14, color: 'border-pink-400/20', delay: 1 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* ── Large gradient orbs ── */}
      <motion.div
        custom={0} animate="animate" variants={floatingVariants}
        className="absolute top-10 -left-20 w-[500px] h-[500px] rounded-full blur-[120px] bg-purple-600/25 mix-blend-screen"
      />
      <motion.div
        custom={1} animate="animate" variants={floatingVariants}
        className="absolute bottom-20 -right-20 w-[450px] h-[450px] rounded-full blur-[100px] bg-pink-500/20 mix-blend-screen"
      />
      <motion.div
        custom={2} animate="animate" variants={floatingVariants}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[80px] bg-cyan-400/10 mix-blend-screen"
      />
      <motion.div
        custom={3} animate="animate" variants={floatingVariants}
        className="absolute top-1/4 right-1/3 w-[280px] h-[280px] rounded-full blur-[90px] bg-indigo-500/15 mix-blend-screen"
      />

      {/* ── Pulsing mid orbs ── */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`pulse-${i}`}
          custom={i} animate="animate" variants={pulseVariants}
          className={`absolute w-56 h-56 rounded-full blur-2xl
            ${i === 0 ? 'top-1/4 left-1/4 bg-blue-500/10'
              : i === 1 ? 'top-2/3 right-1/3 bg-purple-400/10'
              : 'bottom-1/4 right-1/4 bg-pink-500/10'}`}
        />
      ))}

      {/* ── Drifting accent blobs ── */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`drift-${i}`}
          custom={i} animate="animate" variants={driftVariants}
          className={`absolute w-32 h-32 rounded-full blur-xl
            ${i === 0 ? 'top-[60%] left-[20%] bg-cyan-500/10'
              : i === 1 ? 'top-[10%] right-[30%] bg-purple-500/10'
              : i === 2 ? 'bottom-[15%] left-[40%] bg-pink-500/10'
              : 'top-[35%] right-[20%] bg-blue-400/10'}`}
        />
      ))}

      {/* ── Floating particles ── */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{ position: 'absolute', left: p.x, top: p.y }}
          animate={{ y: [0, -25, 0], opacity: [0.3, 1, 0.3], scale: [1, 1.6, 1] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        >
          <div className={`rounded-full ${p.color} opacity-70`} style={{ width: p.size * 4, height: p.size * 4 }} />
        </motion.div>
      ))}

      {/* ── Floating geometric shapes ── */}
      {shapes.map((s, i) => (
        <motion.div
          key={`shape-${i}`}
          style={{ position: 'absolute', top: s.top, left: s.left, right: s.right }}
          animate={{
            y: [0, -18, 0],
            rotate: s.type === 'diamond' ? [45, 100, 45] : [0, 20, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
        >
          {s.type === 'diamond' ? (
            <div className={`border-2 ${s.color}`} style={{ width: s.size * 4, height: s.size * 4, transform: 'rotate(45deg)' }} />
          ) : (
            <div className={`rounded-full border-2 ${s.color}`} style={{ width: s.size * 4, height: s.size * 4 }} />
          )}
        </motion.div>
      ))}

      {/* ── Dot grid ── */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      {/* ── Diagonal light beams ── */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400/10 to-transparent transform -skew-x-12" />
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/8 to-transparent transform skew-x-6" />

      {/* ── Bottom fade ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/60" />
    </div>
  )
}

export default AnimatedBackground