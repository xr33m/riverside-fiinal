'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/** Counts up from 0 to `value` once it scrolls into view. */
export function AnimatedNumber({
  value,
  duration = 1.4,
  suffix = '',
}: {
  value: number
  duration?: number
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (reduceMotion) {
      setDisplay(value)
      return
    }

    let raf: number
    let started = false

    const runCountUp = () => {
      if (started) return
      started = true

      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 1000 / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(Math.round(value * eased))
        if (progress < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          runCountUp()
          observer.disconnect()
        }
      },
      // Vertical-only margin: a horizontal shrink would exclude tiles sitting
      // close to the left/right edge on a narrow viewport (they'd never
      // satisfy the margin no matter how far the page scrolls).
      { rootMargin: '-40px 0px' }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration, reduceMotion])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  )
}
