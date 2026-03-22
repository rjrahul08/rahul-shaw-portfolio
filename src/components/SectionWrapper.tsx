import { motion } from 'framer-motion'

type SectionWrapperProps = {
  id: string
  label: string
  title?: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}

export function SectionWrapper({ id, label, title, subtitle, children, className }: SectionWrapperProps) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-7xl px-6 py-24 md:px-10 md:py-32 ${className ?? ''}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="mb-6 text-xs uppercase tracking-[0.35em] text-[var(--text-muted)]">{label}</div>
        {title ? <h2 className="font-display text-4xl text-[var(--text-primary)] md:text-5xl">{title}</h2> : null}
        {subtitle ? <p className="mt-4 max-w-3xl text-base text-[var(--text-secondary)] md:text-lg">{subtitle}</p> : null}
        <div className="mt-10">{children}</div>
      </motion.div>
    </section>
  )
}
