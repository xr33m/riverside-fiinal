import { MetadataRoute } from 'next'
import { SUBURBS, SERVICES, KNOWLEDGE_ARTICLES } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ardenworks.co.uk'

  const locationUrls = SUBURBS.map((s) => ({
    url: `${baseUrl}/locations/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const serviceUrls = SERVICES.map((s) => ({
    url: `${baseUrl}/landscaping-services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const knowledgeUrls = KNOWLEDGE_ARTICLES.map((a) => ({
    url: `${baseUrl}/knowledge-base/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/landscaping-services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/knowledge-base`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...serviceUrls,
    ...locationUrls,
    ...knowledgeUrls,
  ]
}
