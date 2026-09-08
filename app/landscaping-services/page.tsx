import Link from 'next/link'
import { SERVICES, generateGraphSchema } from '@/lib/content'
import { ShieldCheck, ArrowRight, Layers, Droplets, Car, Compass } from 'lucide-react'
import { Breadcrumbs, Eyebrow, DirectAnswer, CtaBanner } from '@/components/silo-ui'
import { Reveal, RevealGrid } from '@/components/reveal'

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

        {/* 3-Second Direct Answer Section */}
        <Reveal delay={0.1}>
          <DirectAnswer label="AEO Direct Summary">
            Riverside Landscaping provides BS7533-compliant hardscaping services across Greater Glasgow, specializing in 150mm–200mm MOT Type 1 sub-base compaction, heavy clay drainage mitigation, Italian porcelain paving, and weather-sheltered year-round installation.
          </DirectAnswer>
        </Reveal>

        {/* Category Hub Services Grid (Parent-to-Child Linking Rules) */}
        <RevealGrid className="grid grid-cols-1 gap-8 pt-4 md:grid-cols-2">
          {SERVICES.map((service) => (
            <article
              key={service.slug}
              className="group flex flex-col justify-between border border-border bg-background p-8 transition-colors duration-300 hover:border-accent"
            >
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center border border-accent/30 bg-accent/10 text-accent">
                  {service.slug.includes('porcelain') && <Layers className="h-6 w-6" />}
                  {service.slug.includes('driveway') && <Car className="h-6 w-6" />}
                  {service.slug.includes('drainage') && <Droplets className="h-6 w-6" />}
                  {service.slug.includes('decking') && <Compass className="h-6 w-6" />}
                </div>

                <h2 className="font-serif text-2xl font-bold text-primary transition-colors group-hover:text-accent">
                  {service.name}
                </h2>

                {/* 3-Second Direct Answer Block */}
                <p className="border-l-2 border-accent/50 py-1 pl-3 text-sm leading-relaxed text-muted-foreground">
                  {service.directAnswer3Sec}
                </p>

                <ul className="space-y-2 pt-2 text-xs text-muted-foreground">
                  {service.features.slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                {/* Contextual Anchor Text */}
                <Link
                  href={`/landscaping-services/${service.slug}`}
                  className="button-outline flex w-full items-center justify-between text-sm"
                >
                  <span>Read complete {service.primaryCategory.toLowerCase()} specification</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
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
