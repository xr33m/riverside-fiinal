import { Metadata } from 'next'
import { BRAND } from '@/lib/content'
import { Breadcrumbs, SectionCard } from '@/components/silo-ui'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'Privacy Policy - Riverside Landscaping',
  description: 'How Riverside Landscaping collects, uses, and protects the information you share through this website.',
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10 px-4 pb-20 pt-20 sm:px-6 sm:pt-24 lg:px-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />

      <Reveal>
        <header className="space-y-4">
          <h1>Privacy Policy</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            This explains what information {BRAND.legalName} collects through this website, why, and what your
            rights are over it.
          </p>
        </header>
      </Reveal>

      <div className="space-y-8">
        <Reveal>
          <SectionCard>
            <h2 className="font-serif text-xl font-bold text-primary">What we collect</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              When you request a free site survey through this website, we ask for your name, email address, phone
              number, postcode, project goal, and (optionally) an approximate garden or patio size. We only collect
              what's needed to assess your enquiry and get back to you with a survey booking or estimate — we don't
              ask for payment details through this site.
            </p>
          </SectionCard>
        </Reveal>

        <Reveal delay={0.05}>
          <SectionCard>
            <h2 className="font-serif text-xl font-bold text-primary">How we use it</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Survey submissions are used solely to contact you about your enquiry, arrange a site visit, and
              provide a written estimate. We do not sell your information to third parties, and we do not use it
              for marketing you haven't asked for.
            </p>
          </SectionCard>
        </Reveal>

        <Reveal delay={0.1}>
          <SectionCard>
            <h2 className="font-serif text-xl font-bold text-primary">Analytics &amp; cookies</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              This site's own event tracking does not send data to any third-party analytics provider. Where the
              site is deployed on Vercel, Vercel Analytics may collect anonymised, aggregate usage data (such as
              page views) to help us understand site performance — it does not use tracking cookies or identify you
              personally. Pages that embed a Google Map load content from Google, which is subject to{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Google's own privacy policy
              </a>
              .
            </p>
          </SectionCard>
        </Reveal>

        <Reveal delay={0.15}>
          <SectionCard>
            <h2 className="font-serif text-xl font-bold text-primary">Your rights</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              You can ask us what information we hold about you, ask us to correct it, or ask us to delete it at
              any time by emailing{' '}
              <a href={BRAND.emailHref} className="text-accent hover:underline">
                {BRAND.emailDisplay}
              </a>
              . We'll respond as soon as we reasonably can.
            </p>
          </SectionCard>
        </Reveal>

        <Reveal delay={0.2}>
          <SectionCard>
            <h2 className="font-serif text-xl font-bold text-primary">Contact</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Questions about this policy can be sent to{' '}
              <a href={BRAND.emailHref} className="text-accent hover:underline">
                {BRAND.emailDisplay}
              </a>{' '}
              or {BRAND.phoneDisplay}.
            </p>
          </SectionCard>
        </Reveal>
      </div>
    </div>
  )
}
