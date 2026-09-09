'use client'

import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { BRAND } from '@/lib/content'
import { trackEvent } from '@/lib/analytics'

const PREFILLED_MESSAGE = "Hi, I'm looking for a landscaping/drainage quote in Glasgow."

/**
 * Fixed floating WhatsApp launcher, rendered once in app/layout.tsx so it
 * floats site-wide at bottom-6 left-6. `position: fixed` keeps it out of
 * document flow entirely, so it never contributes to layout shift.
 *
 * Both SiteChrome (inner pages) and LandingPage (homepage) render their own
 * `.sticky-cta` bar — bottom, full-width, z-index 30 — using the same
 * `scrollY > innerHeight * 0.75` threshold. This widget mirrors that
 * threshold locally (rather than importing shared state, since it lives
 * outside both trees in the root layout) to lift itself above that bar
 * once it's showing, keeping the two bottom-fixed elements from overlapping
 * on mobile. z-40 keeps it above the sticky-cta (z-30) and below the survey
 * modal (z-50) so opening the modal covers it as expected.
 */
export function WhatsappWidget() {
  const [clearsStickyBar, setClearsStickyBar] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setClearsStickyBar(window.scrollY > window.innerHeight * 0.75)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const href = `${BRAND.whatsappHref}?text=${encodeURIComponent(PREFILLED_MESSAGE)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Riverside Landscaping on WhatsApp"
      onClick={() => trackEvent('cta_click', { source: 'whatsapp-widget' })}
      className={`group fixed left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] ${
        clearsStickyBar ? 'bottom-24' : 'bottom-6'
      }`}
    >
      {!reduceMotion && (
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-60 group-hover:opacity-0"
        />
      )}
      <MessageCircle aria-hidden="true" size={28} strokeWidth={2} className="relative" />
    </a>
  )
}
