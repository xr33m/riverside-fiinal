import { MetadataRoute } from 'next'
import { SUBURBS } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ardenworks.co.uk'

  const suburbUrls = SUBURBS.map((s) => ({
    url: `${baseUrl}/areas/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const serviceUrls = [
    'porcelain-paving-glasgow',
    'garden-drainage-engineering',
  ].map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    ...suburbUrls,
    ...serviceUrls,
  ]
}
