'use client'

import { trackEvent } from '@/lib/analytics'
import { BRAND } from '@/lib/brand'

export function SiteFooter() {
  return (
    <footer>
      <div className="wordmark">
        <span className="wordmark-mark">R</span>
        <span>
          Riverside<span className="text-accent"> / </span>Landscaping
          <small>GLASGOW LANDSCAPING</small>
        </span>
      </div>
      <div>
        <p className="font-bold text-foreground">Direct Engineering Contacts</p>
        <a href={BRAND.phoneHref} onClick={() => trackEvent('call_click', { source: 'footer' })}>
          {BRAND.phoneDisplay}
        </a>
        <br />
        <a href={BRAND.emailHref}>{BRAND.emailDisplay}</a>
      </div>
      <div>
        <p className="font-bold text-foreground">Glasgow Physical Silos</p>
        <div className="flex flex-col gap-1 text-xs text-muted-foreground pt-1">
          <a href="/landscaping-services" className="hover:text-accent font-mono">/landscaping-services/</a>
          <a href="/locations" className="hover:text-accent font-mono">/locations/</a>
          <a href="/knowledge-base" className="hover:text-accent font-mono">/knowledge-base/</a>
        </div>
      </div>
    </footer>
  )
}
