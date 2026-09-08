import LandingPage from '@/components/landing-page'
import { faqs } from '@/lib/content'

const localBusinessLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'Riverside Landscaping',
  description:
    'Bespoke patios, driveways and engineered landscaping with BS7533-compliant deep sub-base drainage across Greater Glasgow.',
  telephone: '+447507604713',
  areaServed: ['Bearsden', 'Newton Mearns', 'Clarkston', 'Giffnock', 'Greater Glasgow'].map(
    (name) => ({ '@type': 'City', name }),
  ),
  address: {
    '@type': 'PostalAddress',
    streetAddress: '46 West George Street',
    addressLocality: 'Glasgow',
    postalCode: 'G2 4LL',
    addressRegion: 'Scotland',
    addressCountry: 'GB',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '11',
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
