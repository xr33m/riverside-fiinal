import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { AYRSHIRE_TOWNS, SERVICES, generateAyrshireGraphSchema } from '@/lib/content'
import { MapPin, ArrowRight } from 'lucide-react'
import { Breadcrumbs, Eyebrow, DirectAnswer, SectionCard, SubCard, CtaBanner } from '@/components/silo-ui'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return AYRSHIRE_TOWNS.map((town) => ({
    slug: town.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const town = AYRSHIRE_TOWNS.find((t) => t.slug === slug)
  if (!town) return {}

  return {
    title: town.titleTag,
    description: `Porcelain paving, driveways, and garden landscaping in ${town.name} (${town.postcodePrefix}). Engineered for ${town.soilProfile}.`,
  }
}

export default async function AyrshireTownDetailPage({ params }: PageProps) {
  const { slug } = await params
  const town = AYRSHIRE_TOWNS.find((t) => t.slug === slug)

  if (!town) {
    notFound()
  }

  const schema = generateAyrshireGraphSchema(`https://riverside-landscaping.co.uk/ayrshire/${town.slug}`)

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
            { label: 'Ayrshire', href: '/ayrshire' },
            { label: town.name },
          ]}
        />

        {/* H1 Heading Tag Formula: [Primary Category] in [Area] */}
        <header className="max-w-3xl space-y-4">
          <Eyebrow icon={MapPin}>{town.name} ({town.postcodePrefix}) Coverage</Eyebrow>
          <h1>Landscaping &amp; Patio Installation in {town.name}</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Hardscaping engineered for {town.name}&apos;s {town.soilProfile.toLowerCase()}, adapted from the same BS7533 methods we use across Greater Glasgow.
          </p>
        </header>

        {/* 3-Second Direct Answer Rule */}
        <DirectAnswer>
          Riverside Landscaping installs porcelain paving, driveways, and drainage in {town.name} using foundations suited to {town.soilProfile.toLowerCase()}, rather than the boulder-clay approach used further inland in Glasgow.
        </DirectAnswer>

        {/* Local Map */}
        <section className="overflow-hidden border border-border">
          <iframe
            title={`Map of ${town.name}, Ayrshire`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(`${town.name}, Ayrshire, UK`)}&output=embed`}
            width="100%"
            height="320"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>

        {/* Heading Tag Hierarchy: H2s & H3s */}
        <div className="space-y-10">
          <SectionCard>
            <h2 className="font-serif text-2xl font-bold text-primary">
              Local Ground Conditions in {town.name}
            </h2>
            <p className="border-l-2 border-accent/40 pl-3 text-base leading-relaxed text-foreground">
              Building in {town.name} means designing around {town.keyChallenge.toLowerCase()}
            </p>

            <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
              <SubCard title="Site Access & Logistics Profile">{town.accessProfile}</SubCard>
              <SubCard title="Recommended Installation Method">{town.highlightInstall}</SubCard>
            </div>
          </SectionCard>

          {/* Cross-Silo Linking Rule: Ayrshire to Service Links with Exact Contextual Anchor Text */}
          <SectionCard>
            <h2 className="font-serif text-xl font-bold text-primary">
              Related Hardscaping Services Available in {town.name}
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
                      Read about our {service.primaryCategory.toLowerCase()} process
                    </p>
                  </div>
                  <ArrowRight className="ml-2 h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-accent" />
                </Link>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* CTA Trigger */}
        <CtaBanner
          heading={`Get a ${town.name} Site Survey`}
          body="Ayrshire coverage is new — tell us your postcode and we'll confirm availability along with a written estimate based on your materials and labour."
          ctaLabel="Request Site Survey"
          source={`ayrshire-detail-${town.slug}`}
        />
      </div>
    </>
  )
}
