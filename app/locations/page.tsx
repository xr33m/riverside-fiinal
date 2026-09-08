import Link from 'next/link'
import { SUBURBS, generateGraphSchema } from '@/lib/content'
import { MapPin, ArrowRight } from 'lucide-react'
import { Breadcrumbs, Eyebrow, DirectAnswer } from '@/components/silo-ui'

export const metadata = {
  title: 'BEST Glasgow Landscaping Location Hub - Bearsden, Newton Mearns, West End & Clarkston',
  description: 'GEO Location Silo hub mapping high-end residential landscaping, porcelain patio installations, and heavy clay soil drainage engineering across Greater Glasgow suburbs.',
}

export default function LocationsHubPage() {
  const schema = generateGraphSchema('https://riverside-landscaping.co.uk/locations')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto max-w-6xl space-y-12 px-4 pb-20 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Locations' }]} />

        {/* Heading Hierarchy: H1 */}
        <div className="max-w-3xl space-y-4">
          <Eyebrow icon={MapPin}>Greater Glasgow GEO Coverage</Eyebrow>
          <h1>Greater Glasgow Suburb Coverage &amp; GEO Landscaping Hub</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Discover localized hardscaping, heavy clay drainage mitigation, and porcelain patio installations engineered for your exact suburb soil profile and planning regulations.
          </p>
        </div>

        {/* 3-Second Direct Summary */}
        <DirectAnswer label="AEO Local Coverage Summary">
          Riverside Landscaping provides local hardscaping teams operating across Bearsden, Newton Mearns, West End Glasgow, Clarkston, Giffnock, and Milngavie, delivering custom BS7533 sub-base drainage tailored to local ground conditions.
        </DirectAnswer>

        {/* Suburb Location Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SUBURBS.map((suburb) => (
            <article
              key={suburb.slug}
              className="group flex flex-col justify-between border border-border bg-background p-6 transition-colors duration-300 hover:border-accent"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-xs font-bold text-accent">
                    {suburb.postcodePrefix}
                  </span>
                  <span className="text-xs text-muted-foreground">{suburb.council}</span>
                </div>

                <h2 className="font-serif text-2xl font-bold text-primary transition-colors group-hover:text-accent">
                  {suburb.name}
                </h2>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <p><strong className="text-accent">Soil Profile:</strong> {suburb.soilProfile}</p>
                  <p><strong className="text-accent">Key Hurdle:</strong> {suburb.keyChallenge}</p>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href={`/locations/${suburb.slug}`}
                  className="button-outline flex w-full items-center justify-between text-xs"
                >
                  <span>Read about our {suburb.name} porcelain paving process</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}
