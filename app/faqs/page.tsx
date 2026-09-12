import Link from 'next/link'
import { HelpCircle, ArrowRight, Phone } from 'lucide-react'
import { SERVICES, faqs, GOOGLE_REVIEW_COUNT, generateGraphSchema } from '@/lib/content'
import { SERVICE_ICONS } from '@/lib/service-icons'
import { Breadcrumbs, Eyebrow } from '@/components/silo-ui'
import { Reveal } from '@/components/reveal'
import { FaqAccordion } from '@/components/faq-accordion'
import { LeafCtaBanner } from '@/components/leaf-cta-banner'

export const metadata = {
  title: 'Landscaping FAQs - Glasgow & Ayrshire Patios, Driveways & Drainage | Riverside Landscaping',
  description: 'Answers to the questions Glasgow and Ayrshire homeowners ask us most — pricing, timelines, planning permission, guarantees and BS7533 engineering, across every service we offer.',
}

// General, business-wide FAQs — the shared `faqs` list (used elsewhere for
// the home page teaser and as the default schema source) plus a few more
// aimed at this page specifically, all built only from facts already
// established elsewhere in the codebase (coverage area, quote policy, real
// project timelines) rather than new claims.
const GENERAL_FAQS = [
  ...faqs.map(([question, answer]) => ({ question, answer })),
  {
    question: 'Do you offer free quotes for landscaping work in Glasgow and Ayrshire?',
    answer:
      "Yes. Every project starts with a free site survey and a written estimate — no pushy sales, a guaranteed start date once you book, and your quote stays valid for 12 months.",
  },
  {
    question: 'What areas of Glasgow and Ayrshire do you cover?',
    answer:
      'We cover Greater Glasgow — including Bearsden, Newton Mearns, Giffnock, Clarkston, Milngavie, Bothwell, Kilmacolm and the West End — plus Ayrshire towns including Troon, Prestwick, Ayr & Alloway and West Kilbride.',
  },
  {
    question: 'How long does a typical landscaping project take?',
    answer:
      "It depends on scope: a standard porcelain patio usually takes 5 to 7 working days, a full garden landscaping redesign runs 1 to 3 weeks, and a garden room build takes 2 to 4 weeks. You'll get an exact timeline as part of your written estimate.",
  },
]

const CATEGORIES = [
  { id: 'general', label: 'General', items: GENERAL_FAQS },
  ...SERVICES.map((service) => ({
    id: service.slug.replace('-glasgow', ''),
    label: service.name,
    serviceSlug: service.slug,
    items: service.faqs,
  })),
]

export default function FaqsPage() {
  const allFaqItems = CATEGORIES.flatMap((c) => c.items)
  const schema = generateGraphSchema('https://riverside-landscaping.co.uk/faqs', allFaqItems)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQs' }]} />
      </div>

      {/* Hero */}
      <Reveal>
        <section className="relative mt-8 h-[340px] w-full overflow-hidden sm:h-[400px]">
          <img
            src="/images/garden-after.png"
            alt="Riverside Landscaping completed project in Glasgow"
            className="absolute inset-0 h-full w-full scale-105 animate-[kenburns_16s_ease-in-out_infinite_alternate] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
          <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80">
              <HelpCircle className="h-3.5 w-3.5" /> FAQs
            </span>
            <h1 className="mt-3 max-w-3xl text-white">Glasgow &amp; Ayrshire Landscaping FAQs</h1>
          </div>
        </section>
      </Reveal>

      {/* Intro */}
      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal className="space-y-3">
            <Eyebrow icon={HelpCircle}>Straight Answers</Eyebrow>
            <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
              What Glasgow &amp; Ayrshire Homeowners Ask Us Most
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex items-center">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Real questions from real site surveys and {GOOGLE_REVIEW_COUNT}+ verified Google reviews — grouped by
              service below, covering pricing, timelines, planning permission, and BS7533 engineering. Jump to a
              topic, or search your service page directly for the full specification.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Quick-jump index */}
      <section className="bg-secondary/40 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="inline-flex items-center gap-1.5 border border-accent/30 bg-background px-3 py-1.5 text-xs font-bold text-accent transition-colors hover:bg-accent hover:text-white"
              >
                {category.label}
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FAQ directory */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-4xl space-y-16 px-4 sm:px-6 lg:px-8">
          {CATEGORIES.map((category) => {
            const Icon = 'serviceSlug' in category ? SERVICE_ICONS[category.serviceSlug] ?? HelpCircle : HelpCircle
            return (
              <div key={category.id} id={category.id} className="scroll-mt-24 space-y-6">
                <Reveal className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-accent" />
                  <h2 className="font-serif text-2xl font-bold text-primary">
                    {category.id === 'general' ? 'General Questions' : `${category.label} FAQs`}
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <FaqAccordion items={category.items} />
                </Reveal>
                {'serviceSlug' in category && (
                  <Reveal delay={0.15}>
                    <Link
                      href={`/landscaping-services/${category.serviceSlug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:underline"
                    >
                      View full {category.label} guide <ArrowRight size={14} />
                    </Link>
                  </Reveal>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Still have questions */}
      <section className="border-t border-border bg-secondary/40 py-16">
        <Reveal className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl">Still Have Any Questions?</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            These FAQs cover what comes up most, but every garden is different. If yours isn&apos;t answered above,
            get in touch — we&apos;re happy to talk through your project before you commit to anything.
          </p>
          <Link href="/contact" className="button-clay mt-8 inline-flex text-sm">
            <Phone size={16} /> Contact Us
          </Link>
        </Reveal>
      </section>

      <Reveal>
        <LeafCtaBanner
          heading="Is Your Garden Craving Some Care and Attention? Reach Out to Us Today!"
          source="faqs-page-banner"
        />
      </Reveal>
    </>
  )
}
