import { MetadataRoute } from 'next'
import { BRAND } from '@/lib/content'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${BRAND.domain}/sitemap.xml`,
  }
}
