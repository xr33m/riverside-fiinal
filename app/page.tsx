import LandingPage from '@/components/landing-page'
import { faqs, BRAND } from '@/lib/content'

const localBusinessLd = {
  '@context': 'https://schema.org',
  '@type': 'LandscapingBusiness',
  name: BRAND.name,
  url: BRAND.domain,
  telephone: BRAND.phoneDisplay,
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
    streetAddress: BRAND.gbpAddress.streetAddress,
    addressLocality: BRAND.gbpAddress.addressLocality,
    addressRegion: BRAND.gbpAddress.addressRegion,
    postalCode: BRAND.gbpAddress.postalCode,
    addressCountry: BRAND.gbpAddress.addressCountry,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: BRAND.geoCoordinates.latitude,
    longitude: BRAND.geoCoordinates.longitude,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '11',
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
