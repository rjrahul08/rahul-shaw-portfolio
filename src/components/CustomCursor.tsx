import { useEffect, useState } from 'react'

export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [ring, setRing] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    let raf = 0
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setRing((prev) => ({
          x: prev.x + (e.clientX - prev.x) * 0.18,
          y: prev.y + (e.clientY - prev.y) * 0.18,
        }))
      })
    }
    const onOver = (e: Event) => {
      const target = e.target as HTMLElement
      setActive(!!target.closest('a,button,input,textarea,select,.interactive'))
    }
    const onLeave = () => setHidden(true)
    const onEnter = () => setHidden(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      <div
        className={`pointer-events-none fixed z-[100] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--cyan)] transition-opacity duration-200 ${hidden || active ? 'opacity-0' : 'opacity-100'}`}
        style={{ left: pos.x, top: pos.y, boxShadow: '0 0 18px rgba(0,245,255,0.8)' }}
      />
      <div
        className={`pointer-events-none fixed z-[99] -translate-x-1/2 -translate-y-1/2 border border-[rgba(0,245,255,0.55)] transition-[width,height,background,border-radius,opacity] duration-200 ${active ? 'h-12 w-12 rounded-2xl bg-[rgba(0,245,255,0.08)]' : 'h-8 w-8 rounded-full bg-transparent'} ${hidden ? 'opacity-0' : 'opacity-100'}`}
        style={{ left: ring.x, top: ring.y, boxShadow: '0 0 24px rgba(0,245,255,0.18)' }}
      />
    </>
  )
}
