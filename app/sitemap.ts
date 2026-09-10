import { MetadataRoute } from 'next'
import { SUBURBS, SERVICES, KNOWLEDGE_ARTICLES, AYRSHIRE_TOWNS, PORTFOLIO_ITEMS, BRAND } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BRAND.domain

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

  const ayrshireUrls = AYRSHIRE_TOWNS.map((t) => ({
    url: `${baseUrl}/ayrshire/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const portfolioUrls = PORTFOLIO_ITEMS.map((p) => ({
    url: `${baseUrl}/portfolio/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
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
    {
      url: `${baseUrl}/ayrshire`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
    ...serviceUrls,
    ...locationUrls,
    ...knowledgeUrls,
    ...ayrshireUrls,
    ...portfolioUrls,
  ]
}
