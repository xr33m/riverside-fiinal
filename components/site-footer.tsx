'use client'

import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { BRAND, SOCIAL_LINKS } from '@/lib/content'
import { FacebookIcon, LinkedinIcon, InstagramIcon } from '@/components/icons/social-icons'

const QUICK_LINKS = [
  { label: 'Home', href: '/#top' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/landscaping-services' },
  { label: 'Guides', href: '/knowledge-base' },
  { label: 'FAQs', href: '/#faq' },
]

const SOCIALS = [
  { label: 'Facebook', href: SOCIAL_LINKS.facebook, Icon: FacebookIcon },
  { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin, Icon: LinkedinIcon },
  { label: 'Instagram', href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
]

// Real project photos only — no repeats/stock stand-ins. The 4th tile is a
// CTA through to the full portfolio rather than a fabricated placeholder.
const RECENT_WORK = [
  { src: '/images/garden-before.png', alt: 'Waterlogged clay garden before Riverside Landscaping drainage work' },
  { src: '/images/garden-after.png', alt: 'Finished porcelain patio and drainage after Riverside Landscaping install' },
  { src: '/images/materials/mat-1-1.jpg', alt: 'Porcelain paving material sample used on a Riverside Landscaping job' },
]

export function SiteFooter() {
  const address = `${BRAND.gbpAddress.streetAddress}, ${BRAND.gbpAddress.addressLocality} ${BRAND.gbpAddress.postalCode}`
  const domainLabel = BRAND.domain.replace(/^https?:\/\//, '')

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="site-footer-inner mx-auto grid max-w-[1180px] gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {/* Brand */}
        <div>
          <Link href="/#top" className="wordmark">
            <span className="wordmark-mark">R</span>
            <span>
              Riverside<span className="text-accent"> / </span>Landscaping
              <small>GLASGOW LANDSCAPING</small>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Riverside Landscaping specialises in bespoke porcelain patios, driveways, and BS7533-engineered garden
            drainage for homes across Greater Glasgow &amp; Ayrshire, built for Scottish weather and backed by a
            10-year structural guarantee.
          </p>
          <div className="mt-5 flex gap-2.5">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Riverside Landscaping on ${label}`}
                onClick={() => trackEvent('cta_click', { source: `footer-${label.toLowerCase()}` })}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-bold text-foreground">Quick Links</h3>
          <nav className="mt-4 grid gap-2.5">
            {QUICK_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className="text-sm text-muted-foreground hover:text-accent">
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-accent">
              Contact Us
            </Link>
          </nav>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-sm font-bold text-foreground">Contact Us</h3>
          <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
            <a
              href={BRAND.phoneHref}
              onClick={() => trackEvent('call_click', { source: 'footer' })}
              className="flex items-center gap-2.5 hover:text-accent"
            >
              <Phone size={15} className="shrink-0 text-accent" /> {BRAND.phoneDisplay}
            </a>
            <span className="flex items-start gap-2.5">
              <MapPin size={15} className="mt-0.5 shrink-0 text-accent" /> {address}
            </span>
            <a href={BRAND.emailHref} className="flex items-center gap-2.5 hover:text-accent">
              <Mail size={15} className="shrink-0 text-accent" /> {BRAND.emailDisplay}
            </a>
            <a
              href={BRAND.domain}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 hover:text-accent"
            >
              <Globe size={15} className="shrink-0 text-accent" /> {domainLabel}
            </a>
          </div>
        </div>

        {/* Recent Work */}
        <div>
          <h3 className="text-sm font-bold text-foreground">Recent Work</h3>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {RECENT_WORK.map((photo) => (
              <a
                key={photo.src}
                href="/portfolio"
                className="block aspect-square overflow-hidden bg-muted"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </a>
            ))}
            <Link
              href="/portfolio"
              className="flex aspect-square flex-col items-center justify-center gap-1 bg-primary text-center text-white transition-colors hover:bg-accent"
            >
              <ArrowRight size={16} />
              <span className="text-[11px] font-bold uppercase tracking-wide">View All</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        {/* Extra bottom padding (vs. a plain py-6) so this bar always clears the
            fixed .sticky-cta bar (~79px tall, pinned to the viewport bottom
            once visible) — otherwise the Terms/Privacy links sit permanently
            behind it at the true bottom of the page. */}
        <div className="site-footer-inner mx-auto flex max-w-[1180px] flex-col-reverse items-center gap-3 pb-28 pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>© Copyright {new Date().getFullYear()} — {BRAND.name}. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-accent">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy" className="hover:text-accent">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
