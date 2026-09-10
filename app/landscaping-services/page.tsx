import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import {
  ShieldCheck,
  ArrowRight,
  Layers,
  Droplets,
  Car,
  PanelsTopLeft,
  Fence,
  Sparkles,
  Blocks,
  Leaf,
  Trees,
  Home,
  Cuboid,
} from 'lucide-react'
import { SERVICES, generateGraphSchema } from '@/lib/content'
import { Breadcrumbs, Eyebrow, DirectAnswer, CtaBanner } from '@/components/silo-ui'
import { Reveal, RevealGrid } from '@/components/reveal'

const SERVICE_ICONS: Record<string, LucideIcon> = {
  'porcelain-paving-glasgow': Layers,
  'driveway-installers-glasgow': Car,
  'garden-drainage-solutions-glasgow': Droplets,
  'composite-decking-glasgow': PanelsTopLeft,
  'garden-fencing-glasgow': Fence,
  'resin-bound-driveways-glasgow': Sparkles,
  'retaining-walls-glasgow': Blocks,
  'artificial-grass-glasgow': Leaf,
  'garden-landscaping-glasgow': Trees,
  'garden-rooms-glasgow': Home,
  '3d-garden-design-glasgow': Cuboid,
}

// Rotating brand-colour gradients for services without a real project photo
// yet (see ServiceDetail.heroImage) — keeps the grid visually varied without
// repeating the same 2-3 stock photos across 11 tiles.
const TILE_GRADIENTS = [
  'from-primary to-[#0c1c63]',
  'from-accent to-[#013d1c]',
  'from-[#1f2937] to-[#0b0f19]',
  'from-[#1939bc] to-[#01642d]',
]

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
      <div className="mx-auto max-w-6xl space-y-12 px-4 pb-20 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        {/* Breadcrumbs (Child-to-Parent Rule) */}
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Landscaping Services' }]} />

        {/* Heading Tag Rule: H1 */}
        <Reveal className="max-w-3xl space-y-4">
          <Eyebrow icon={ShieldCheck}>BS7533 Compliant Pavement Engineering</Eyebrow>
          <h1>Landscaping Services &amp; Hardscaping Engineering in Glasgow</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Explore our core category hubs for luxury vitrified porcelain paving, load-certified driveway installations, sub-surface clay soil drainage systems, and architectural composite decking built for Scottish weather.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <DirectAnswer>
            Riverside Landscaping provides BS7533-compliant hardscaping services across Greater Glasgow, specializing in 150mm–200mm MOT Type 1 sub-base compaction, heavy clay drainage mitigation, Italian porcelain paving, and weather-sheltered year-round installation.
          </DirectAnswer>
        </Reveal>

        {/* Category Hub Services Grid (Parent-to-Child Linking Rules) */}
        <RevealGrid className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-3 lg:grid-cols-4">
          {SERVICES.map((service, i) => {
            const Icon = SERVICE_ICONS[service.slug] ?? Layers
            return (
              <Link
                key={service.slug}
                href={`/landscaping-services/${service.slug}`}
                aria-label={`Read complete ${service.primaryCategory.toLowerCase()} specification`}
                className="group relative block aspect-[4/3] overflow-hidden"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                <div className="absolute inset-0 flex flex-col items-start justify-end p-4 sm:p-5">
                  <Icon className="mb-2 h-6 w-6 text-white/90 sm:h-7 sm:w-7" />
                  <h2 className="font-serif text-base font-bold leading-tight text-white sm:text-lg">
                    {service.primaryCategory}
                  </h2>
                  <span className="mt-1 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-white/0 transition-all group-hover:text-white/85">
                    Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            )
          })}
        </RevealGrid>

        {/* Winter Incentive Callout */}
        <Reveal>
          <CtaBanner
            heading="Planning a Hardscaping Project in Glasgow?"
            body="Beat the 12-week spring waitlist with weather-sheltered winter mortar installation and 10-year guaranteed excavation."
            ctaLabel="Request Free Consultation"
            source="services-hub-banner"
          />
        </Reveal>
      </div>
    </>
  )
}
