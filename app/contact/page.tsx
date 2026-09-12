import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { BRAND, SUBURBS, generateGraphSchema } from '@/lib/content'
import { Breadcrumbs, Eyebrow } from '@/components/silo-ui'
import { Reveal, RevealGrid } from '@/components/reveal'
import { ContactForm } from '@/components/contact-form'
import { LeafCtaBanner } from '@/components/leaf-cta-banner'

export const metadata: Metadata = {
  title: 'Contact Riverside Landscaping - Glasgow Landscaping & Drainage Specialists',
  description: 'Get in touch with Riverside Landscaping for a free site survey and written estimate. Call, email, or send a message online — serving Greater Glasgow and Ayrshire.',
}

export default function ContactPage() {
  const schema = generateGraphSchema(`${BRAND.domain}/contact`)
  const mapQuery = encodeURIComponent(`${BRAND.gbpAddress.streetAddress}, ${BRAND.gbpAddress.addressLocality}, UK`)

  const contactRows = [
    { icon: Phone, value: BRAND.phoneDisplay, href: BRAND.phoneHref },
    { icon: Mail, value: BRAND.emailDisplay, href: BRAND.emailHref },
    {
      icon: MapPin,
      value: `${BRAND.gbpAddress.streetAddress}, ${BRAND.gbpAddress.addressLocality}`,
      href: `https://www.google.com/maps?q=${mapQuery}`,
      external: true,
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
      </div>

      {/* Hero */}
      <Reveal>
        <section className="relative mt-8 h-[420px] w-full overflow-hidden sm:h-[480px]">
          <img
            src="/images/garden-after.webp"
            alt="A completed Riverside Landscaping porcelain patio installation"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
          <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-10 sm:px-6 lg:px-8">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80">
              <Phone className="h-3.5 w-3.5" /> Get In Touch
            </span>
            <h1 className="mt-3 text-white">Fill the Form to Get a Free Consultation</h1>
          </div>
        </section>
      </Reveal>

      {/* Form + contact info */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-7">
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <Eyebrow icon={Phone}>Contact Us</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl font-bold text-primary sm:text-4xl">
              Prefer to Reach Us Directly?
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Complete the form for a free landscaping consultation, or call, email, or message us directly below.
              Our senior landscape engineer reviews every enquiry personally and gets back to you within 24 hours.
            </p>

            <RevealGrid className="mt-8 space-y-4" stagger={0.06}>
              {contactRows.map((row) => (
                <a
                  key={row.value}
                  href={row.href}
                  target={row.external ? '_blank' : undefined}
                  rel={row.external ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors group-hover:bg-primary">
                    <row.icon size={18} />
                  </span>
                  <span className="text-sm font-bold text-primary">{row.value}</span>
                </a>
              ))}
            </RevealGrid>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <Reveal>
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-serif text-2xl font-bold text-primary sm:text-3xl">Maps Location</h2>
            <div className="mt-8 h-[420px] w-full overflow-hidden border border-border sm:h-[480px]">
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
          </div>
        </section>
      </Reveal>

      {/* Areas we cover */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
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
      </div>

      {/* Closing CTA — full-bleed dark green band with leaf accents,
          matching the Figma reference's decorative rhythm in brand green. */}
      <Reveal>
        <LeafCtaBanner
          heading="Is Your Garden Craving Some Care and Attention? Reach Out to Us Today!"
          source="contact-page-banner"
        />
      </Reveal>
    </>
  )
}
