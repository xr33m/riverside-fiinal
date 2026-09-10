import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Phone } from 'lucide-react'
import { BRAND, SOCIAL_LINKS, SUBURBS, generateGraphSchema } from '@/lib/content'
import { Breadcrumbs, Eyebrow, CtaBanner } from '@/components/silo-ui'
import { Reveal } from '@/components/reveal'
import { OpenSurveyButton } from '@/components/open-survey-button'
import { FacebookIcon, LinkedinIcon, InstagramIcon } from '@/components/icons/social-icons'
import { ContactMethodCards } from '@/components/contact-method-cards'

export const metadata: Metadata = {
  title: 'Contact Riverside Landscaping - Glasgow Landscaping & Drainage Specialists',
  description: 'Get in touch with Riverside Landscaping for a free site survey and written estimate. Call, email, or request a survey online — serving Greater Glasgow and Ayrshire.',
}

const SOCIALS = [
  { label: 'Facebook', href: SOCIAL_LINKS.facebook, Icon: FacebookIcon },
  { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin, Icon: LinkedinIcon },
  { label: 'Instagram', href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
]

export default function ContactPage() {
  const schema = generateGraphSchema(`${BRAND.domain}/contact`)
  const mapQuery = encodeURIComponent(`${BRAND.gbpAddress.streetAddress}, ${BRAND.gbpAddress.addressLocality}, UK`)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="mx-auto max-w-6xl space-y-14 px-4 pb-20 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

        <Reveal className="max-w-2xl space-y-4">
          <Eyebrow icon={Phone}>Get In Touch</Eyebrow>
          <h1>Contact Riverside Landscaping</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Call, email, or request a free site survey below — our senior landscape engineer reviews every enquiry
            personally and gets back to you within 24 hours.
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Contact methods */}
          <div className="lg:col-span-5">
            <Reveal>
              <ContactMethodCards />
            </Reveal>

            <Reveal delay={0.15} className="mt-6 border border-primary/20 bg-primary p-6 text-primary-foreground">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary-foreground/80">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8fe3ae] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8fe3ae]" />
                </span>
                Currently taking on new projects
              </span>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/85">
                Tell us about your garden and we&apos;ll confirm a survey slot with no obligation to proceed.
              </p>
              <OpenSurveyButton source="contact-page" className="button-clay mt-5 w-full">
                Request Your Free Site Survey <ArrowRight size={16} />
              </OpenSurveyButton>
            </Reveal>

            <Reveal delay={0.2} className="mt-6 flex items-center gap-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Riverside Landscaping on ${label}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </Reveal>
          </div>

          {/* Map */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="h-[420px] w-full overflow-hidden border border-border lg:h-full lg:min-h-[420px]">
              <iframe
                title={`Map of Riverside Landscaping, ${BRAND.gbpAddress.streetAddress}, ${BRAND.gbpAddress.addressLocality}`}
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>

        {/* Coverage */}
        <Reveal className="space-y-4">
          <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-primary">
            <MapPin className="h-5 w-5 text-accent" />
            <span>Areas We Cover</span>
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {SUBURBS.map((suburb) => (
              <Link
                key={suburb.slug}
                href={`/locations/${suburb.slug}`}
                className="flex items-center justify-between border border-border bg-background p-3 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <span>{suburb.name} ({suburb.postcodePrefix})</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0" />
              </Link>
            ))}
            <Link
              href="/ayrshire"
              className="flex items-center justify-between border border-border bg-background p-3 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <span>Coastal Ayrshire</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0" />
            </Link>
          </div>
        </Reveal>

        <Reveal>
          <CtaBanner
            heading="Ready to start your project?"
            body="Get a written estimate based on your materials and labour, confirmed after a free, no-obligation site survey."
            ctaLabel="Request Site Survey"
            source="contact-page-banner"
          />
        </Reveal>
      </div>
    </>
  )
}
