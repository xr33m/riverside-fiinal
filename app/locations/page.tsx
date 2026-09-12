import Link from 'next/link'
import { MapPin, ArrowRight, Star } from 'lucide-react'
import { SUBURBS, generateGraphSchema } from '@/lib/content'
import { TILE_GRADIENTS } from '@/lib/tile-gradients'
import { Breadcrumbs, Eyebrow } from '@/components/silo-ui'
import { Reveal, RevealGrid } from '@/components/reveal'
import { LeafCtaBanner } from '@/components/leaf-cta-banner'
import { TestimonialCarousel } from '@/components/testimonial-carousel'

export const metadata = {
  title: 'BEST Glasgow Landscaping Location Hub - Bearsden, Newton Mearns, West End & Clarkston',
  description: 'Local landscaping coverage across Greater Glasgow suburbs, including high-end residential porcelain patio installations and heavy clay soil drainage engineering.',
}

export default function LocationsHubPage() {
  const schema = generateGraphSchema('https://riverside-landscaping.co.uk/locations')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Locations' }]} />
      </div>

      {/* Hero */}
      <Reveal>
        <section className="relative mt-8 h-[380px] w-full overflow-hidden sm:h-[440px]">
          <img
            src="/images/portfolio/driveway-light-flags-2.webp"
            alt="Riverside Landscaping completed hardscaping project across Greater Glasgow"
            className="absolute inset-0 h-full w-full scale-105 animate-[kenburns_16s_ease-in-out_infinite_alternate] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
          <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80">
              <MapPin className="h-3.5 w-3.5" /> Areas We Cover
            </span>
            <h1 className="mt-3 max-w-3xl text-white">Landscaping Services Across Greater Glasgow</h1>
          </div>
        </section>
      </Reveal>

      {/* Intro */}
      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal className="space-y-3">
            <Eyebrow icon={MapPin}>Local Coverage</Eyebrow>
            <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl">Our Local Area Coverage</h2>
          </Reveal>
          <Reveal delay={0.1} className="flex items-center">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Riverside Landscaping provides local hardscaping teams operating across Bearsden, Newton Mearns, West
              End Glasgow, Clarkston, Giffnock, and Milngavie, delivering custom BS7533 sub-base drainage tailored to
              local ground conditions. Explore each area below for the soil profile and key challenges we engineer
              around.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Suburb tiles */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <RevealGrid className="grid grid-cols-1 gap-6 sm:grid-cols-2" stagger={0.06}>
            {SUBURBS.map((suburb, i) => (
              <Link
                key={suburb.slug}
                href={`/locations/${suburb.slug}`}
                aria-label={`Read about our ${suburb.name} landscaping coverage`}
                className="group relative block h-80 overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-xl sm:h-96"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-110 ${
                    TILE_GRADIENTS[i % TILE_GRADIENTS.length]
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute inset-0 flex flex-col items-start justify-end p-6 sm:p-8">
                  <span className="mb-3 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                    {suburb.postcodePrefix}
                  </span>
                  <h3 className="font-serif text-2xl font-bold leading-tight text-white sm:text-[26px]">
                    {suburb.name}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/80 line-clamp-2">
                    {suburb.keyChallenge}
                  </p>
                  <span className="button-clay mt-5 rounded-full text-xs">
                    Learn More <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </RevealGrid>
        </div>
      </section>

      {/* Real reviews */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="space-y-6">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow icon={Star}>Client Reviews</Eyebrow>
              <h2 className="mt-3 font-serif text-3xl font-bold text-primary sm:text-4xl">
                Words From Our Clients: Insights Into Exceptional Service
              </h2>
            </div>
            <TestimonialCarousel />
          </Reveal>
        </div>
      </section>

      <Reveal>
        <LeafCtaBanner heading="Not Sure If We Cover Your Area?" source="locations-hub-banner" />
      </Reveal>
    </>
  )
}
