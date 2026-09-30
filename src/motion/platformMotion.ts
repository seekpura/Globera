import gsap from 'gsap'

export function pulseNode(element: Element | null) {
  if (!element) return
  gsap.fromTo(element, { scale: 0.96 }, { scale: 1, duration: 0.45, ease: 'power2.out', transformOrigin: '50% 50%' })
}

export function revealPanel(element: Element | null) {
  if (!element) return
  gsap.fromTo(element, { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out' })
}
