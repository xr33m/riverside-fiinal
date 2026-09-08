import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SERVICES, SUBURBS, generateGraphSchema } from '@/lib/content'
import { ShieldCheck, CheckCircle2, ArrowRight, HelpCircle, MapPin } from 'lucide-react'
import { Breadcrumbs, Eyebrow, DirectAnswer, SectionCard, SubCard, CtaBanner } from '@/components/silo-ui'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) return {}

  return {
    title: service.titleTag,
    description: service.directAnswer3Sec,
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)

  if (!service) {
    notFound()
  }

  const schema = generateGraphSchema(
    `https://riverside-landscaping.co.uk/landscaping-services/${service.slug}`,
    service.faqs
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto max-w-5xl space-y-12 px-4 pb-20 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        {/* Breadcrumb Navigation (Child-to-Parent Rule) */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Landscaping Services', href: '/landscaping-services' },
            { label: service.name },
          ]}
        />

        {/* Heading Tag Rule: H1 */}
        <header className="max-w-3xl space-y-4">
          <Eyebrow icon={ShieldCheck}>BS7533 Structural Specification</Eyebrow>
          <h1>{service.h1Title}</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Engineered specifically for heavy Scottish clay soil, high annual rainfall, and severe freeze-thaw cycles across Greater Glasgow.
          </p>
        </header>

        {/* 3-Second Direct Answer Banner (SEO/GEO Rule) */}
        <DirectAnswer>{service.directAnswer3Sec}</DirectAnswer>

        {/* Core Content & Heading Hierarchy: H2s & H3s */}
        <div className="space-y-10">
          {/* H2: Secondary Category 1 */}
          <SectionCard>
            <h2 className="font-serif text-2xl font-bold text-primary">{service.h2Secondary1}</h2>
            {/* Direct Answer Paragraph under H2 */}
            <p className="border-l-2 border-accent/40 pl-3 text-base leading-relaxed text-foreground">
              Our hardscaping installation teams cover all major Glasgow suburbs, combining excavation equipment with frost-proof slurry bonding layers to create zero-maintenance outdoor spaces.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">{service.soilContext}</p>

            {/* H3 Sub-sections */}
            <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
              <SubCard title="Geotextile Membrane & MOT Type 1 Sub-Base Prep">
                Prevents heavy boulder clay from migrating into aggregate layers during heavy winter rainfall.
              </SubCard>
              <SubCard title="Scottish Whinstone & Resin Bound Options">
                High-density basalt edging stone and permeable resin channels for maximum water shedding.
              </SubCard>
            </div>
          </SectionCard>

          {/* H2: Secondary Category 2 */}
          <SectionCard>
            <h2 className="font-serif text-2xl font-bold text-primary">{service.h2Secondary2}</h2>
            <p className="border-l-2 border-accent/40 pl-3 text-base leading-relaxed text-foreground">
              Integrated land drains and ACO slot channels divert surface water directly into soakaway units, ensuring compliance with Scottish building standards and preventing waterlogging.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">{service.bsStandard}</p>
          </SectionCard>

          {/* Features Checklist */}
          <SectionCard>
            <h3 className="font-serif text-xl font-bold text-primary">Technical Specification &amp; Build Guarantee</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {service.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-3 border border-border bg-secondary/40 p-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm text-foreground">{feat}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* FAQ Section with 3-Second Direct Answers */}
          <SectionCard className="space-y-6">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-6 w-6 text-accent" />
              <h2 className="font-serif text-2xl font-bold text-primary">
                Frequently Asked Questions About {service.primaryCategory} in Glasgow
              </h2>
            </div>
            <div className="space-y-4">
              {service.faqs.map((faq, i) => (
                <div key={i} className="space-y-2 border border-border bg-secondary/40 p-5">
                  <h3 className="text-base font-semibold text-primary">{faq.question}</h3>
                  <p className="border-l-2 border-accent/50 py-0.5 pl-3 text-sm text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Suburb Linking Grid (Cross-Silo Linking Rule: Geo to Service) */}
          <div className="space-y-4 pt-4">
            <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-primary">
              <MapPin className="h-5 w-5 text-accent" />
              <span>Local Installation Areas Across Greater Glasgow</span>
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {SUBURBS.map((suburb) => (
                <Link
                  key={suburb.slug}
                  href={`/locations/${suburb.slug}`}
                  className="flex items-center justify-between border border-border bg-background p-3 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <span>{suburb.name} ({suburb.postcodePrefix})</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Winter CTA Trigger */}
        <CtaBanner
          heading="Ready for a BS7533 Structural Handover?"
          body="Book your site survey today to receive a fixed-price written proposal with 10-year structural guarantee."
          ctaLabel="Book Site Survey"
          source={`service-detail-${service.slug}`}
        />
      </div>
    </>
  )
}
