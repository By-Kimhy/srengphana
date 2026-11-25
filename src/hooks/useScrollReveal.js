import { useEffect } from 'react'

/** Reveal elements with [data-reveal] as they enter the scroll container. */
export default function useScrollReveal(rootRef, enabled) {
  useEffect(() => {
    if (!enabled) return undefined
    const root = rootRef.current
    if (!root) return undefined

    const nodes = [...root.querySelectorAll('[data-reveal]')]
    if (!nodes.length) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      nodes.forEach((node) => node.classList.add('is-in'))
      return undefined
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        })
      },
      {
        root,
        threshold: 0.14,
        rootMargin: '0px 0px -6% 0px',
      },
    )

    nodes.forEach((node) => io.observe(node))
    return () => io.disconnect()
  }, [enabled, rootRef])
}
