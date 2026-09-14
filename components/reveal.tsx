'use client'

import { Children, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Fade + slide-up entrance as content scrolls into view. Animates once per
 * element (no re-trigger on scroll-back) and no-ops under reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Wraps a card grid's children with a small stagger, one Reveal per child.
 * Uses Children.toArray rather than a raw .map() because JSX children that
 * mix an array (e.g. items.map(...)) with a plain sibling element don't
 * arrive as one flat array — React.Children.toArray flattens both into a
 * single list so every card becomes its own grid item (otherwise the whole
 * mapped array gets wrapped in a single cell, and the rest of the grid
 * collapses to one column of stacked cards next to it).
 */
export function RevealGrid({
  children,
  className = '',
  stagger = 0.08,
}: {
  children: ReactNode
  className?: string
  stagger?: number
}) {
  return (
    <div className={className}>
      {Children.toArray(children).map((child, i) => (
        <Reveal key={i} delay={Math.min(i * stagger, 0.4)}>
          {child}
        </Reveal>
      ))}
    </div>
  )
}
