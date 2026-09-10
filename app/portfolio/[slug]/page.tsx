import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Check, MapPin } from 'lucide-react'
import {
  PORTFOLIO_ITEMS,
  PORTFOLIO_CATEGORY_LABELS,
  PORTFOLIO_CATEGORY_TO_SERVICE_SLUG,
  SERVICES,
  SUBURBS,
  BRAND,
  generateGraphSchema,
} from '@/lib/content'
import { Breadcrumbs, Eyebrow, SectionCard, CtaBanner } from '@/components/silo-ui'
import { Reveal } from '@/components/reveal'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return PORTFOLIO_ITEMS.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const item = PORTFOLIO_ITEMS.find((p) => p.slug === slug)
  if (!item) return {}

  return {
    title: `${item.title} - ${item.area} Case Study | Riverside Landscaping`,
    description: item.description,
  }
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params
  const item = PORTFOLIO_ITEMS.find((p) => p.slug === slug)

  if (!item) {
    notFound()
  }

  const schema = generateGraphSchema(`${BRAND.domain}/portfolio/${item.slug}`)
  const relatedService = SERVICES.find((s) => s.slug === PORTFOLIO_CATEGORY_TO_SERVICE_SLUG[item.category])
  const relatedSuburb = SUBURBS.find((s) => s.name === item.area)
  const otherProjects = PORTFOLIO_ITEMS.filter((p) => p.slug !== item.slug)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="mx-auto max-w-5xl space-y-12 px-4 pb-20 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Portfolio', href: '/portfolio' },
            { label: item.title },
          ]}
        />

        <Reveal>
          <header className="max-w-3xl space-y-4">
            <Eyebrow icon={MapPin}>
              {item.area} ({item.postcode}) · {PORTFOLIO_CATEGORY_LABELS[item.category]}
            </Eyebrow>
            <h1>{item.title}</h1>
            <p className="text-lg leading-relaxed text-muted-foreground">{item.description}</p>
          </header>
        </Reveal>

        {/* Hero visual — before/after when we have a real before photo, single shot otherwise */}
        <Reveal delay={0.1}>
          {item.imageBefore ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <span className="inline-block bg-foreground/80 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  Before
                </span>
                <div className="h-72 overflow-hidden border border-border">
                  <img src={item.imageBefore} alt={`${item.title} — before`} className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="space-y-2">
                <span className="inline-block bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  After
                </span>
                <div className="h-72 overflow-hidden border border-border">
                  <img src={item.imageAfter} alt={`${item.title} — after`} className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          ) : (
            <div className="h-80 overflow-hidden border border-border sm:h-96">
              <img src={item.imageAfter} alt={item.title} className="h-full w-full object-cover" />
            </div>
          )}
        </Reveal>

        {/* Result metric */}
        <Reveal delay={0.15}>
          <section className="border-y border-r border-l-4 border-border border-l-accent bg-secondary/60 p-6">
            <span className="text-xs font-bold uppercase tracking-wide text-accent">Result</span>
            <p className="mt-1 font-serif text-2xl font-bold text-primary">{item.metric}</p>
          </section>
        </Reveal>

        {/* Specification */}
        <Reveal>
          <SectionCard>
            <h2 className="font-serif text-xl font-bold text-primary">Technical Specification</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {item.specs.map((spec) => (
                <div key={spec} className="flex items-center gap-3 border border-border bg-secondary/40 p-3">
                  <Check className="h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm text-foreground">{spec}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </Reveal>

        {/* Cross-silo links */}
        <Reveal className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {relatedService && (
            <Link
              href={`/landscaping-services/${relatedService.slug}`}
              className="group flex items-center justify-between border border-border bg-background p-5 transition-colors duration-300 hover:border-accent"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wide text-accent">Related Service</span>
                <p className="mt-1 text-sm font-bold text-primary">
                  Read about our {relatedService.primaryCategory.toLowerCase()} process
                </p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          )}
          {relatedSuburb && (
            <Link
              href={`/locations/${relatedSuburb.slug}`}
              className="group flex items-center justify-between border border-border bg-background p-5 transition-colors duration-300 hover:border-accent"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wide text-accent">Coverage Area</span>
                <p className="mt-1 text-sm font-bold text-primary">See our {relatedSuburb.name} coverage area</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          )}
        </Reveal>

        {/* Other projects */}
        <Reveal className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-primary">More Completed Projects</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {otherProjects.map((p) => (
              <Link
                key={p.id}
                href={`/portfolio/${p.slug}`}
                className="group border border-border bg-background p-4 text-xs text-muted-foreground transition-colors hover:border-accent"
              >
                <span className="font-bold text-primary group-hover:text-accent">{p.area}</span>
                <p className="mt-1 leading-relaxed">{p.title}</p>
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <CtaBanner
            heading="Want a similar result?"
            body="Get a written estimate based on your materials and labour, confirmed after a free, no-obligation site survey."
            ctaLabel="Request Similar Build"
            source={`portfolio-detail-${item.slug}`}
          />
        </Reveal>
      </div>
    </>
  )
}
