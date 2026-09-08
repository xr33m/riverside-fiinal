import LandingPage from '@/components/landing-page'
import { faqs } from '@/lib/content'

// Provisional structured data — verify all claims (rating, guarantee,
// accreditation, pricing) before enabling in production.
const localBusinessLd = {
  '@context': 'https://schema.org',
  '@type': 'LandscapingBusiness',
  name: 'Riverside Landscaping',
  url: 'https://riverside-landscaping.co.uk',
  telephone: '+447507604713',
  priceRange: '££-£££',
  description:
    'Bespoke porcelain patios, driveways, and engineered landscaping with BS7533-compliant deep sub-base drainage across Greater Glasgow & Ayrshire.',
  areaServed: [
    'Bearsden',
    'Newton Mearns',
    'West End Glasgow',
    'Clarkston',
    'Giffnock',
    'Milngavie',
    'Bothwell',
    'Kilmacolm',
    'Greater Glasgow',
  ].map((name) => ({ '@type': 'Place', name })),
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Central Depot, Mains Road',
    addressLocality: 'Glasgow',
    postalCode: 'G1 1AA',
    addressCountry: 'GB',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 55.8642,
    longitude: -4.2518,
  },
  knowsAbout: [
    'Porcelain Paving',
    'Driveway Installation',
    'Resin Bound Driveways',
    'Sub-Surface Garden Drainage',
    'Scottish Whinstone Retaining Walls',
    'Composite Decking',
    'Artificial Grass Lawns',
  ],
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
