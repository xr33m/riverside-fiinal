'use client'

import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { BRAND } from '@/lib/content'
import { trackEvent } from '@/lib/analytics'

const PREFILLED_MESSAGE = "Hi, I'm looking for a landscaping/drainage quote in Glasgow."

/**
 * Fixed floating WhatsApp launcher. `position: fixed` keeps it out of
 * document flow entirely, so it never contributes to layout shift.
 *
 * Lifts itself above SiteChrome's `.sticky-cta` bar (bottom, full-width,
 * z-index 30) once that bar is showing, using the same scroll threshold —
 * kept local rather than shared state since this widget is meant to drop
 * into any page independently of that chrome.
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
      className={`group fixed left-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:left-6 sm:h-16 sm:w-16 ${
        clearsStickyBar ? 'bottom-24 sm:bottom-28' : 'bottom-6 sm:bottom-8'
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
