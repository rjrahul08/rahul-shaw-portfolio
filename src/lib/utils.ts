export const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ')

export const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export const isMobile = () =>
  typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false
