import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LandingPage from '@/components/landing-page'
import { SUBURBS, faqs } from '@/lib/content'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return SUBURBS.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const suburb = SUBURBS.find((s) => s.slug === slug)
  if (!suburb) return {}

  return {
    title: `Bespoke Patios & Landscaping ${suburb.name} (${suburb.postcodePrefix}) | Arden Works`,
    description: `BS7533-compliant porcelain paving & clay drainage engineering in ${suburb.name}, ${suburb.council}. Eliminate standing water with a 10-year structural guarantee.`,
    keywords: [
      `porcelain paving ${suburb.name}`,
      `landscaping ${suburb.name}`,
      `garden drainage ${suburb.postcodePrefix}`,
      `hardscaping ${suburb.council}`,
    ],
  }
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params
  const suburb = SUBURBS.find((s) => s.slug === slug)

  if (!suburb) {
    notFound()
  }

  // Linked `@graph` JSON-LD schema combining LocalBusiness + Place + Service
  const areaGraphLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HomeAndConstructionBusiness',
        '@id': 'https://ardenworks.co.uk/#business',
        name: 'Arden Works',
        description: `Bespoke patios and engineered landscaping with BS7533-compliant deep sub-base drainage in ${suburb.name} (${suburb.postcodePrefix}).`,
        areaServed: [
          {
            '@type': 'City',
            name: suburb.name,
            containedInPlace: { '@type': 'AdministrativeArea', name: suburb.council },
          },
        ],
        telephone: '+441413708921',
        url: `https://ardenworks.co.uk/areas/${suburb.slug}`,
      },
      {
        '@type': 'Service',
        name: `Landscaping & Porcelain Paving ${suburb.name}`,
        serviceType: 'Hardscaping & Drainage Engineering',
        provider: { '@id': 'https://ardenworks.co.uk/#business' },
        areaServed: { '@type': 'AdministrativeArea', name: suburb.name },
        termsOfService: '10-Year Structural Guarantee Included',
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(([q, a]) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areaGraphLd) }}
      />
      <div className="bg-accent/10 border-b border-accent/20 px-4 py-2 text-center text-xs font-bold text-accent">
        📍 Viewing Dedicated Services for {suburb.name} ({suburb.postcodePrefix}) · {suburb.soilProfile} Specialist
      </div>
      <LandingPage />
    </>
  )
}
