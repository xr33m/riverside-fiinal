'use client'

import type { LucideIcon } from 'lucide-react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { BRAND } from '@/lib/content'

interface ContactCard {
  icon: LucideIcon
  label: string
  value: string
  href: string
  external?: boolean
}

export function ContactMethodCards() {
  const cards: ContactCard[] = [
    { icon: Phone, label: 'Phone', value: BRAND.phoneDisplay, href: BRAND.phoneHref },
    { icon: Mail, label: 'Email', value: BRAND.emailDisplay, href: BRAND.emailHref },
    {
      icon: MapPin,
      label: 'Depot Address',
      value: `${BRAND.gbpAddress.streetAddress}, ${BRAND.gbpAddress.addressLocality} ${BRAND.gbpAddress.postalCode}`,
      href: `https://www.google.com/maps?q=${encodeURIComponent(`${BRAND.gbpAddress.streetAddress}, ${BRAND.gbpAddress.addressLocality}, UK`)}`,
      external: true,
    },
  ]

  return (
    <div className="grid gap-3">
      {cards.map(({ icon: Icon, label, value, href, external }) => (
        <a
          key={label}
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          onClick={() => {
            if (label === 'Phone') trackEvent('call_click', { source: 'contact-page' })
          }}
          className="group flex items-start gap-4 border border-border bg-background p-5 transition-colors duration-300 hover:border-accent"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-accent/30 bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
            <Icon size={19} />
          </span>
          <span className="min-w-0">
            <span className="block text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</span>
            <span className="mt-0.5 block break-words text-sm font-bold text-primary">{value}</span>
          </span>
        </a>
      ))}
    </div>
  )
}
