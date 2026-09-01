import LandingPage from '@/components/landing-page'
import { faqs } from '@/lib/content'

// Provisional structured data — verify all claims (rating, guarantee,
// accreditation, pricing) before enabling in production.
const localBusinessLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'Arden Works',
  description:
    'Bespoke patios and engineered landscaping with BS7533-compliant deep sub-base drainage across Greater Glasgow.',
  areaServed: ['Bearsden', 'Newton Mearns', 'Clarkston', 'Giffnock', 'Greater Glasgow'].map(
    (name) => ({ '@type': 'City', name }),
  ),
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Glasgow',
    addressRegion: 'Scotland',
    addressCountry: 'GB',
  },
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(([question, answer]) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <LandingPage />
    </>
  )
}
