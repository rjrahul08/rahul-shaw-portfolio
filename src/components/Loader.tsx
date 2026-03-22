import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ascii = ['██████╗ ', '██╔══██╗', '██████╔╝', '██╔══██╗', '██║  ██║', '╚═╝  ╚═╝']

export function Loader() {
  const [visible, setVisible] = useState(() => !sessionStorage.getItem('rps-loader'))
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!visible) return
    const start = Date.now()
    const timer = window.setInterval(() => {
      const next = Math.min(100, Math.round(((Date.now() - start) / 1800) * 100))
      setProgress(next)
      if (next >= 100) {
        window.clearInterval(timer)
        sessionStorage.setItem('rps-loader', '1')
        window.setTimeout(() => setVisible(false), 300)
      }
    }, 40)
    return () => window.clearInterval(timer)
  }, [visible])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-black"
        >
          <div className="font-mono text-sm text-[var(--cyan)] md:text-base">
            {ascii.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
          <div className="mt-8 h-px w-64 overflow-hidden bg-white/10">
            <div className="h-full bg-[var(--cyan)] transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-3 font-mono text-xs uppercase tracking-[0.35em] text-[var(--text-muted)]">Loading neural profile {progress}%</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
