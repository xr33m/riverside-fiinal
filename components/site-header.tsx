'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, ChevronDown, Mail, MapPin, Menu, Phone, X } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { BRAND, SUBURBS, AYRSHIRE_TOWNS, SERVICES } from '@/lib/content'

/* ------------------------------------------------------------------ *
 * Contact Top Bar + Glassmorphic Shrinking Header Navigation
 * with Dropdown Menus for Services & Areas
 * ------------------------------------------------------------------ */

interface NavLink {
  label: string
  href: string
  description?: string
}

const serviceLinks: NavLink[] = SERVICES.map((s) => ({
  label: s.name,
  href: `/landscaping-services/${s.slug}`,
}))

const areaLinks: NavLink[] = [
  ...SUBURBS.map((s) => ({
    label: s.name,
    href: `/locations/${s.slug}`,
    description: s.postcodePrefix,
  })),
  ...AYRSHIRE_TOWNS.map((t) => ({
    label: t.name,
    href: `/ayrshire/${t.slug}`,
    description: t.postcodePrefix,
  })),
]

function Dropdown({ label, links, wide }: { label: string; links: NavLink[]; wide?: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 font-medium transition-colors hover:text-accent"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {label}
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div
          className={`absolute left-0 top-full z-50 mt-2 border border-border bg-background shadow-xl ${
            wide ? 'grid grid-cols-2 gap-1 p-3' : 'grid gap-1 p-3'
          } ${wide ? 'min-w-[440px]' : 'min-w-[240px]'}`}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block border-b border-transparent px-3 py-2 text-xs transition-colors hover:border-accent hover:bg-muted/40"
            >
              <span className="block font-bold text-foreground">{link.label}</span>
              {link.description && (
                <span className="block text-[10px] text-muted-foreground">{link.description}</span>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function MobileDropdown({ label, links }: { label: string; links: NavLink[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border">
      <button
        className="flex w-full items-center justify-between py-2 font-bold text-foreground"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {label}
        <ChevronDown size={16} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="grid gap-1 pb-3 pl-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-1.5 text-xs text-muted-foreground hover:text-accent"
            >
              {link.label}
              {link.description && <span className="ml-2 text-[10px] text-muted-foreground/70">{link.description}</span>}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export function SiteHeader({
  onSurvey,
  overlay = false,
}: {
  onSurvey: (source: string) => void
  overlay?: boolean
}) {
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

      <header
        className={`site-header transition-all duration-300 ${scrolled ? 'site-header-scrolled' : ''} ${
          overlay && !scrolled ? 'site-header-transparent' : ''
        }`}
      >
        <a href="/#top" className="wordmark">
          <span className="wordmark-mark">R</span>
          <span>
            Riverside<span className="text-accent"> / </span>Landscaping
            <small>GLASGOW LANDSCAPING</small>
          </span>
        </a>

        <nav className="hidden items-center gap-5 md:flex text-sm">
          <a href="/#about" className="hover:text-accent font-medium">About</a>
          <Dropdown label="Services" links={serviceLinks} />
          <Dropdown label="Areas" links={areaLinks} wide />
          <a href="/knowledge-base" className="hover:text-accent font-medium">Guides</a>
          <a href="/portfolio" className="hover:text-accent">Portfolio</a>
          <a href="/#faq" className="hover:text-accent">FAQs</a>
          <a href="/contact" className="hover:text-accent font-medium">Contact</a>
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
          <div className="absolute left-0 right-0 top-full grid gap-2 border-b border-border bg-background p-6 shadow-xl md:hidden">
            <a href="/#about" onClick={() => setMenu(false)} className="py-2 font-bold text-foreground">About</a>
            <MobileDropdown label="Services" links={serviceLinks} />
            <MobileDropdown label="Areas" links={areaLinks} />
            <a href="/knowledge-base" onClick={() => setMenu(false)} className="py-2 font-bold text-foreground">Guides</a>
            <a href="/portfolio" onClick={() => setMenu(false)} className="py-2 font-bold text-foreground">Portfolio</a>
            <a href="/#faq" onClick={() => setMenu(false)} className="py-2 font-bold text-foreground">FAQs</a>
            <a href="/contact" onClick={() => setMenu(false)} className="py-2 font-bold text-foreground">Contact</a>
            <a href={BRAND.phoneHref} className="flex items-center gap-2 py-2 font-bold text-primary">
              <Phone size={15} /> {BRAND.phoneDisplay}
            </a>
            <button
              onClick={() => {
                setMenu(false)
                onSurvey('mobile-menu')
              }}
              className="button-clay mt-2 rounded-full"
            >
              Request Free Survey <ArrowRight size={16} />
            </button>
          </div>
        )}
      </header>
    </>
  )
}
