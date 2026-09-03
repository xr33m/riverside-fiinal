import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LandingPage from '@/components/landing-page'
import { faqs } from '@/lib/content'

const SERVICES_MAP: Record<
  string,
  { title: string; subtitle: string; description: string; keywords: string[] }
> = {
  'porcelain-paving-glasgow': {
    title: 'Luxury Porcelain Paving Glasgow',
    subtitle: 'Vitrified 20mm Porcelain Paving with R11 Anti-Slip & Frost Proof Engineering',
    description: 'Bespoke porcelain patio installations across Bearsden, Newton Mearns, Clarkston & Giffnock. Installed on full wet mortar beds with slurry bonding.',
    keywords: ['porcelain paving glasgow', 'porcelain patio bearsden', 'vitrified paving newton mearns'],
  },
  'garden-drainage-engineering': {
    title: 'Deep Clay Soil Garden Drainage Engineering',
    subtitle: 'BS7533 Compliant Sub-Surface Water Mitigation & ACO Slot Drainage',
    description: 'Permanent waterlogged lawn and patio drainage solutions. We excavate heavy clay down to sub-grade and install geotextile separation membranes.',
    keywords: ['garden drainage glasgow', 'fix clay soil garden bearsden', 'sub surface water mitigation'],
  },
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(SERVICES_MAP).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES_MAP[slug]
  if (!service) return {}

  return {
    title: `${service.title} | Arden Works Landscape Engineering`,
    description: service.description,
    keywords: service.keywords,
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = SERVICES_MAP[slug]

  if (!service) {
    notFound()
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.subtitle,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      name: 'Arden Works',
      telephone: '+441413708921',
    },
    description: service.description,
    areaServed: ['Bearsden', 'Newton Mearns', 'Clarkston', 'Giffnock', 'Milngavie', 'Greater Glasgow'],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <div className="bg-primary text-primary-foreground px-4 py-2 text-center text-xs font-bold uppercase tracking-wider">
        🔨 Dedicated Technical Service: {service.title}
      </div>
      <LandingPage />
    </>
  )
}
