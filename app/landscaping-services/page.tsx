import Link from 'next/link'
import { ShieldCheck, ArrowRight, Layers, Star, TreeDeciduous } from 'lucide-react'
import { SERVICES, generateGraphSchema } from '@/lib/content'
import { SERVICE_ICONS } from '@/lib/service-icons'
import { TILE_GRADIENTS } from '@/lib/tile-gradients'
import { Breadcrumbs, Eyebrow } from '@/components/silo-ui'
import { Reveal, RevealGrid } from '@/components/reveal'
import { LeafCtaBanner } from '@/components/leaf-cta-banner'
import { TestimonialCarousel } from '@/components/testimonial-carousel'

export const metadata = {
  title: 'BEST Landscaping Services Glasgow - Porcelain Paving, Driveways & Clay Drainage',
  description: 'Core category hub for BS7533-compliant hardscaping, porcelain patio installation, permeable driveways, and clay soil drainage solutions across Greater Glasgow.',
}

export default function LandscapingServicesHubPage() {
  const schema = generateGraphSchema('https://riverside-landscaping.co.uk/landscaping-services')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Landscaping Services' }]} />
      </div>

      {/* Hero */}
      <Reveal>
        <section className="relative mt-8 h-[380px] w-full overflow-hidden sm:h-[440px]">
          <img
            src="/images/portfolio/patio-lawn-after.webp"
            alt="Riverside Landscaping completed hardscaping project in Glasgow"
            className="absolute inset-0 h-full w-full scale-105 animate-[kenburns_16s_ease-in-out_infinite_alternate] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
          <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80">
              <ShieldCheck className="h-3.5 w-3.5" /> Services
            </span>
            <h1 className="mt-3 max-w-3xl text-white">Landscaping Services &amp; Hardscaping Engineering in Glasgow</h1>
          </div>
        </section>
      </Reveal>

      {/* Intro */}
      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal className="space-y-3">
            <Eyebrow icon={ShieldCheck}>Our Services</Eyebrow>
            <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl">Our Diverse Service Offerings</h2>
          </Reveal>
          <Reveal delay={0.1} className="flex items-center">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Riverside Landscaping provides BS7533-compliant hardscaping across Greater Glasgow — 150mm–200mm MOT
              Type 1 sub-base compaction, heavy clay drainage mitigation, Italian porcelain paving, and
              weather-sheltered year-round installation. Explore each service below for the full technical
              specification.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Service tiles */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <RevealGrid className="grid grid-cols-1 gap-6 sm:grid-cols-2" stagger={0.06}>
            {SERVICES.map((service, i) => {
              const Icon = SERVICE_ICONS[service.slug] ?? Layers
              return (
                <Link
                  key={service.slug}
                  href={`/landscaping-services/${service.slug}`}
                  aria-label={`Read complete ${service.primaryCategory.toLowerCase()} specification`}
                  className="group relative block h-80 overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-xl sm:h-96"
                >
                  {service.heroImage ? (
                    <img
                      src={service.heroImage}
                      alt={`${service.primaryCategory} by Riverside Landscaping in Glasgow`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div
                      className={`absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-110 ${
                        TILE_GRADIENTS[i % TILE_GRADIENTS.length]
                      }`}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  <div className="absolute inset-0 flex flex-col items-start justify-end p-6 sm:p-8">
                    <Icon className="mb-3 h-7 w-7 text-white/90" />
                    <h3 className="font-serif text-2xl font-bold leading-tight text-white sm:text-[26px]">
                      {service.primaryCategory}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/80 line-clamp-2">
                      {service.h2PainPoint}
                    </p>
                    <span className="button-clay mt-5 rounded-full text-xs">
                      Learn More <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              )
            })}
            <Link
              href="/landscaping-services/tree-removal-glasgow"
              aria-label="Read complete tree removal specification"
              className="group relative block h-80 overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-xl sm:h-96"
            >
              <img
                src="/images/portfolio/tree-removal.webp"
                alt="Tree removal by Riverside Landscaping in Glasgow"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6 sm:p-8">
                <TreeDeciduous className="mb-3 h-7 w-7 text-white/90" />
                <h3 className="font-serif text-2xl font-bold leading-tight text-white sm:text-[26px]">Tree Removal</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/80 line-clamp-2">
                  Removal, pruning and stump grinding — safely assessed and fully cleared up after.
                </p>
                <span className="button-clay mt-5 rounded-full text-xs">
                  Learn More <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
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
        <LeafCtaBanner heading="Planning a Hardscaping Project in Glasgow?" source="services-hub-banner" />
      </Reveal>
    </>
  )
}
