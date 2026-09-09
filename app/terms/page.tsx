import { Metadata } from 'next'
import { BRAND } from '@/lib/content'
import { Breadcrumbs, SectionCard } from '@/components/silo-ui'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'Terms & Conditions - Riverside Landscaping',
  description: 'Terms and conditions for using the Riverside Landscaping website and requesting a site survey or estimate.',
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10 px-4 pb-20 pt-20 sm:px-6 sm:pt-24 lg:px-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms & Conditions' }]} />

      <Reveal>
        <header className="space-y-4">
          <h1>Terms &amp; Conditions</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            These terms cover your use of this website and the process for requesting a free site survey or
            indicative estimate from {BRAND.legalName}.
          </p>
        </header>
      </Reveal>

      <div className="space-y-8">
        <Reveal>
          <SectionCard>
            <h2 className="font-serif text-xl font-bold text-primary">Who we are</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              This website is operated by {BRAND.legalName}, trading as {BRAND.name}, based at{' '}
              {BRAND.gbpAddress.streetAddress}, {BRAND.gbpAddress.addressLocality}{' '}
              {BRAND.gbpAddress.postalCode}. You can reach us at{' '}
              <a href={BRAND.emailHref} className="text-accent hover:underline">
                {BRAND.emailDisplay}
              </a>{' '}
              or{' '}
              <a href={BRAND.phoneHref} className="text-accent hover:underline">
                {BRAND.phoneDisplay}
              </a>
              .
            </p>
          </SectionCard>
        </Reveal>

        <Reveal delay={0.05}>
          <SectionCard>
            <h2 className="font-serif text-xl font-bold text-primary">Site surveys &amp; estimates</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Any price range shown on this site — including the cost estimator, ROI figures, or survey-form
              output — is indicative only, based on typical Glasgow-area material and labour costs for the size
              and services you select. It is not a fixed quote and does not constitute a binding offer. Requesting
              a free site survey carries no obligation to proceed; a written estimate is confirmed only after we
              have assessed your site, materials, and access conditions in person.
            </p>
          </SectionCard>
        </Reveal>

        <Reveal delay={0.1}>
          <SectionCard>
            <h2 className="font-serif text-xl font-bold text-primary">Using this website</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              You may browse and use this site for the purpose of learning about our services and requesting a
              survey or estimate. Content, photography, and copy on this site belong to {BRAND.legalName} unless
              otherwise credited, and may not be reproduced for commercial use without permission. We aim to keep
              information accurate and up to date but do not guarantee the site will be error-free or
              uninterrupted at all times.
            </p>
          </SectionCard>
        </Reveal>

        <Reveal delay={0.15}>
          <SectionCard>
            <h2 className="font-serif text-xl font-bold text-primary">Liability</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Nothing in these terms excludes or limits our liability where it would be unlawful to do so. Beyond
              that, we are not liable for losses arising from your use of this website that are not directly
              connected to a contract for installation work we have separately agreed with you in writing.
            </p>
          </SectionCard>
        </Reveal>

        <Reveal delay={0.2}>
          <SectionCard>
            <h2 className="font-serif text-xl font-bold text-primary">Governing law</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              These terms are governed by the law of Scotland, and any dispute relating to this website will fall
              under the jurisdiction of the Scottish courts.
            </p>
          </SectionCard>
        </Reveal>
      </div>
    </div>
  )
}
