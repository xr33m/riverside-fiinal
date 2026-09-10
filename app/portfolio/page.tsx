import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { PORTFOLIO_ITEMS, PORTFOLIO_CATEGORY_LABELS, generateGraphSchema, BRAND } from '@/lib/content'
import { Breadcrumbs, Eyebrow, CtaBanner } from '@/components/silo-ui'
import { Reveal, RevealGrid } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'Completed Projects Portfolio - Riverside Landscaping Glasgow',
  description: 'Browse completed porcelain patio, driveway, and garden drainage projects across Bearsden, Newton Mearns, Giffnock, and Clarkston by Riverside Landscaping.',
}

export default function PortfolioHubPage() {
  const schema = generateGraphSchema(`${BRAND.domain}/portfolio`)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="mx-auto max-w-6xl space-y-12 px-4 pb-20 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Portfolio' }]} />

        <Reveal className="max-w-3xl space-y-4">
          <Eyebrow icon={ShieldCheck}>Completed Builds</Eyebrow>
          <h1>Our Completed Projects Across Greater Glasgow</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Every project here was engineered to BS7533 standard and backed by a 10-year structural guarantee — pick
            one to see the full technical breakdown of materials, drainage, and build specification.
          </p>
        </Reveal>

        <RevealGrid className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PORTFOLIO_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={`/portfolio/${item.slug}`}
              className="group block border border-border bg-background transition-colors duration-300 hover:border-accent"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.imageAfter}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  {item.area} ({item.postcode})
                </div>
                <div className="absolute bottom-3 right-3 bg-accent px-3 py-1 text-xs font-bold text-white shadow">
                  {item.metric}
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs font-bold uppercase tracking-wide text-accent">
                  {PORTFOLIO_CATEGORY_LABELS[item.category]}
                </span>
                <h2 className="mt-1 font-serif text-xl font-bold text-primary transition-colors group-hover:text-accent">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">{item.description}</p>
                <span className="mt-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-primary">
                  View Case Study
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </RevealGrid>

        <Reveal>
          <CtaBanner
            heading="Want results like these in your garden?"
            body="Get a written estimate based on your materials and labour, confirmed after a free, no-obligation site survey."
            ctaLabel="Request Site Survey"
            source="portfolio-hub-banner"
          />
        </Reveal>
      </div>
    </>
  )
}
