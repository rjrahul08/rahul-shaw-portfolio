import { ArrowUpRight } from 'lucide-react'
import { cn } from '../lib/utils'

type GlowButtonProps = {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
}

export function GlowButton({ children, href, onClick, variant = 'primary', className }: GlowButtonProps) {
  const base = cn(
    'group inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium tracking-[0.18em] uppercase transition-all duration-300',
    variant === 'primary'
      ? 'border-[var(--cyan)] text-[var(--cyan)] hover:border-transparent hover:text-[var(--bg-void)] hover:shadow-[var(--glow-cyan-md)]'
      : 'border-[var(--border-dim)] text-[var(--text-primary)] hover:border-[var(--violet)] hover:shadow-[var(--glow-violet)]',
    className,
  )

  const inner = (
    <span className="relative overflow-hidden rounded-full px-1 py-0.5">
      <span className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,var(--cyan),var(--violet))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative inline-flex items-center gap-2">
        {children}
        <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </span>
  )

  if (href) {
    return (
      <a href={href} onClick={onClick} className={base} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {inner}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={base}>
      {inner}
    </button>
  )
}
