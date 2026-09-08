import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SUBURBS, SERVICES, generateGraphSchema } from '@/lib/content'
import { MapPin, ArrowRight } from 'lucide-react'
import { Breadcrumbs, Eyebrow, DirectAnswer, SectionCard, SubCard, CtaBanner } from '@/components/silo-ui'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return SUBURBS.map((suburb) => ({
    slug: suburb.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const suburb = SUBURBS.find((s) => s.slug === slug)
  if (!suburb) return {}

  return {
    title: suburb.titleTag,
    description: `Expert porcelain paving, garden drainage, and driveway installation in ${suburb.name} (${suburb.postcodePrefix}). Engineered for ${suburb.soilProfile}.`,
  }
}

export default async function LocationDetailPage({ params }: PageProps) {
  const { slug } = await params
  const suburb = SUBURBS.find((s) => s.slug === slug)

  if (!suburb) {
    notFound()
  }

  const schema = generateGraphSchema(`https://riverside-landscaping.co.uk/locations/${suburb.slug}`)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto max-w-5xl space-y-12 px-4 pb-20 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Locations', href: '/locations' },
            { label: suburb.name },
          ]}
        />

        {/* H1 Heading Tag Formula: [Primary Category] in [Area] */}
        <header className="max-w-3xl space-y-4">
          <Eyebrow icon={MapPin}>{suburb.name} ({suburb.postcodePrefix}) Specification</Eyebrow>
          <h1>Porcelain Paving &amp; Landscaping in {suburb.name}</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Custom hardscaping engineered specifically for {suburb.name}&apos;s {suburb.soilProfile.toLowerCase()} and local planning standards.
          </p>
        </header>

        {/* 3-Second Direct Answer Rule */}
        <DirectAnswer>
          Landscaping and porcelain patio installations in {suburb.name} take 5 to 7 working days, utilizing a 150mm–200mm MOT Type 1 sub-base to counteract local {suburb.soilProfile.toLowerCase()} retention.
        </DirectAnswer>

        {/* Local Map & Service Radius */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <div className="overflow-hidden border border-border md:col-span-3">
            <iframe
              title={`Map of ${suburb.name}, Glasgow`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(`${suburb.name}, Glasgow, UK`)}&output=embed`}
              width="100%"
              height="320"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="space-y-4 border border-border bg-secondary/40 p-6 md:col-span-2">
            <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-primary">
              <MapPin className="h-4 w-4 text-accent" />
              {suburb.name} Service Area
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Covering {suburb.name} ({suburb.postcodePrefix}) and surrounding {suburb.council} postcodes with the same crews and equipment for every job.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                {suburb.postcodePrefix} priority coverage
              </span>
              <span className="border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                {suburb.council}
              </span>
            </div>
          </div>
        </section>

        {/* Heading Tag Hierarchy: H2s & H3s */}
        <div className="space-y-10">
          {/* H2: Secondary Category 1 */}
          <SectionCard>
            <h2 className="font-serif text-2xl font-bold text-primary">
              Driveway Installers &amp; Hardscaping Near Me in {suburb.name}
            </h2>
            {/* Direct Answer Paragraph */}
            <p className="border-l-2 border-accent/40 pl-3 text-base leading-relaxed text-foreground">
              Our hardscaping teams operating in {suburb.name} deliver BS7533-compliant driveways and outdoor dining terraces, overcoming site challenges like {suburb.keyChallenge.toLowerCase()}
            </p>

            {/* H3 Sub-sections */}
            <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
              <SubCard title="Site Access & Logistics Profile">{suburb.accessProfile}</SubCard>
              <SubCard title="Recommended Installation Method">{suburb.highlightInstall}</SubCard>
            </div>
          </SectionCard>

          {/* H2: Secondary Category 2 */}
          <SectionCard>
            <h2 className="font-serif text-2xl font-bold text-primary">
              Garden Drainage Solutions for Clay Soil &amp; Wet Glasgow Weather in {suburb.name}
            </h2>
            <p className="border-l-2 border-accent/40 pl-3 text-base leading-relaxed text-foreground">
              Heavy clay deposits in {suburb.name} require deep sub-base excavation (250mm–300mm) combined with non-woven geotextile separation membranes and high-flow ACO slot channels to ensure lifetime water drainage.
            </p>
          </SectionCard>

          {/* Cross-Silo Linking Rule: Location to Service Links ONLY with Exact Contextual Anchor Text */}
          <SectionCard>
            <h2 className="font-serif text-xl font-bold text-primary">
              Related Hardscaping Services Available in {suburb.name}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/landscaping-services/${service.slug}`}
                  className="group flex items-center justify-between border border-border bg-secondary/40 p-4 transition-colors duration-300 hover:border-accent"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-accent">{service.primaryCategory}</span>
                    <p className="text-sm font-medium text-primary">
                      Read about our {suburb.name} {service.primaryCategory.toLowerCase()} process
                    </p>
                  </div>
                  <ArrowRight className="ml-2 h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-accent" />
                </Link>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Winter CTA Trigger */}
        <CtaBanner
          heading={`Book Your ${suburb.name} Site Survey`}
          body="Get a fixed-price written quote with laser level falls calculation and 10-year structural warranty."
          ctaLabel="Request Site Survey"
          source={`location-detail-${suburb.slug}`}
        />
      </div>
    </>
  )
}
