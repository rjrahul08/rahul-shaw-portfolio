import { Menu, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { navLinks, personalInfo } from '../lib/constants'
import { scrollToId } from '../lib/utils'
import { GlowButton } from './GlowButton'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)

  const ids = useMemo(() => navLinks.map((link) => link.id), [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)
      let current = 'hero'
      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (!el) return
        const rect = el.getBoundingClientRect()
        if (rect.top <= 160 && rect.bottom >= 160) current = id
      })
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])

  const handleNav = (id: string) => {
    setOpen(false)
    scrollToId(id)
  }

  const primaryLinks = navLinks.slice(0, 7)

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
        <div className={`mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl border border-white/8 bg-[rgba(7,7,12,0.82)] px-4 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-300 md:px-6 ${scrolled ? 'py-3' : 'py-4'}`}>
          <button className="flex min-w-0 items-center gap-3 lg:flex-[0_0_auto]" onClick={() => handleNav('hero')}>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(0,245,255,0.18)] bg-[linear-gradient(135deg,rgba(0,245,255,0.12),rgba(123,47,255,0.08))] font-mono text-sm font-semibold tracking-[0.24em] text-[var(--cyan)] shadow-[0_0_20px_rgba(0,245,255,0.12)]">
              RPS
            </span>
            <span className="hidden min-w-0 text-left xl:block">
              <span className="block truncate text-sm font-semibold tracking-[0.08em] text-[var(--text-primary)]">Rahul Prasad Shaw</span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--text-muted)]">AI Backend Engineer</span>
            </span>
          </button>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto rounded-full border border-white/8 bg-white/[0.03] p-1 xl:flex">
            {primaryLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`shrink-0 rounded-full px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 2xl:px-4 ${active === link.id ? 'bg-[linear-gradient(135deg,rgba(0,245,255,0.14),rgba(123,47,255,0.16))] text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_18px_rgba(0,245,255,0.08)]' : 'text-[var(--text-muted)] hover:bg-white/[0.04] hover:text-[var(--text-primary)]'}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex xl:flex-[0_0_auto]">
            <div className="hidden rounded-full border border-white/8 px-3 py-2 text-right 2xl:block">
              <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--text-muted)]">Available for</div>
              <div className="text-xs font-medium text-[var(--text-primary)]">Full-time · Freelance</div>
            </div>
            <GlowButton href={`mailto:${personalInfo.email}`} variant="secondary" className="!px-4 !py-2.5">
              Hire Me
            </GlowButton>
          </div>

          <button className="rounded-xl border border-white/8 bg-white/[0.03] p-3 lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X className="text-[var(--text-primary)]" size={18} /> : <Menu className="text-[var(--text-primary)]" size={18} />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="fixed inset-0 z-40 bg-[rgba(5,5,8,0.96)] px-6 pt-28 backdrop-blur-2xl lg:hidden">
          <div className="mx-auto max-w-md rounded-[28px] border border-white/8 bg-[rgba(10,10,15,0.84)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="mb-5 border-b border-white/8 pb-4">
              <div className="text-lg font-semibold text-[var(--text-primary)]">Rahul Prasad Shaw</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--text-muted)]">AI Backend Engineer</div>
            </div>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-left font-mono text-xs uppercase tracking-[0.24em] text-[var(--text-primary)]"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="mt-5">
              <GlowButton href={`mailto:${personalInfo.email}`} className="w-full justify-center">Hire Me</GlowButton>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
