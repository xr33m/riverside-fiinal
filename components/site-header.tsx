'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Mail, MapPin, Menu, Phone, X } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { BRAND } from '@/lib/content'

/* ------------------------------------------------------------------ *
 * Contact Top Bar + Glassmorphic Shrinking Header Navigation
 * ------------------------------------------------------------------ */
export function SiteHeader({ onSurvey }: { onSurvey: (source: string) => void }) {
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div className="site-topbar">
        <div className="site-topbar-left">
          <span className="hidden items-center gap-1.5 sm:inline-flex">
            <MapPin size={13} /> {BRAND.gbpAddress.streetAddress}, {BRAND.gbpAddress.addressLocality}
          </span>
          <a href={BRAND.emailHref} className="hidden sm:inline-flex">
            <Mail size={13} /> {BRAND.emailDisplay}
          </a>
        </div>
        <a
          href={BRAND.phoneHref}
          onClick={() => trackEvent('call_click', { source: 'topbar' })}
        >
          <Phone size={13} /> {BRAND.phoneDisplay}
        </a>
      </div>

      <header className={`site-header transition-all duration-300 ${scrolled ? 'site-header-scrolled' : ''}`}>
        <a href="/#top" className="wordmark">
          <span className="wordmark-mark">R</span>
          <span>
            Riverside<span className="text-accent"> / </span>Landscaping
            <small>GLASGOW LANDSCAPING</small>
          </span>
        </a>
        <nav className="hidden items-center gap-6 md:flex text-sm">
          <a href="/#about" className="hover:text-accent font-medium">About</a>
          <a href="/landscaping-services" className="hover:text-accent font-medium">Services</a>
          <a href="/locations" className="hover:text-accent font-medium">Locations</a>
          <a href="/knowledge-base" className="hover:text-accent font-medium">Guides</a>
          <a href="/#portfolio" className="hover:text-accent">Portfolio</a>
          <a href="/#faq" className="hover:text-accent">FAQs</a>
        </nav>
        <div className="hidden md:block">
          <button onClick={() => onSurvey('header-nav')} className="button-clay rounded-full text-xs">
            <Phone size={14} /> Free Survey
          </button>
        </div>
        <button className="md:hidden" onClick={() => setMenu(!menu)} aria-label="Open menu" aria-expanded={menu}>
          {menu ? <X /> : <Menu />}
        </button>
        {menu && (
          <div className="absolute left-0 right-0 top-full grid gap-4 border-b border-border bg-background p-6 shadow-xl md:hidden">
            <a href="/#about" onClick={() => setMenu(false)}>About</a>
            <a href="/landscaping-services" onClick={() => setMenu(false)}>Services</a>
            <a href="/locations" onClick={() => setMenu(false)}>Locations</a>
            <a href="/knowledge-base" onClick={() => setMenu(false)}>Guides</a>
            <a href="/#portfolio" onClick={() => setMenu(false)}>Portfolio</a>
            <a href="/#faq" onClick={() => setMenu(false)}>FAQs</a>
            <a href={BRAND.phoneHref} className="flex items-center gap-2 text-primary font-bold">
              <Phone size={15} /> {BRAND.phoneDisplay}
            </a>
            <button
              onClick={() => {
                setMenu(false)
                onSurvey('mobile-menu')
              }}
              className="button-clay rounded-full"
            >
              Request Free Survey <ArrowRight size={16} />
            </button>
          </div>
        )}
      </header>
    </>
  )
}
