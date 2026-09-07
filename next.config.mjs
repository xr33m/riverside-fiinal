/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Physical Silo Category Hub Redirects
      { source: '/services.html', destination: '/landscaping-services', permanent: true },
      { source: '/services', destination: '/landscaping-services', permanent: true },
      { source: '/services/:slug*', destination: '/landscaping-services/:slug*', permanent: true },

      // GEO Location Silo Redirects
      { source: '/areas.html', destination: '/locations', permanent: true },
      { source: '/areas', destination: '/locations', permanent: true },
      { source: '/areas/:slug*', destination: '/locations/:slug*', permanent: true },

      // Legacy Service Specific Redirects
      { source: '/porcelain-paving', destination: '/landscaping-services/porcelain-paving-glasgow', permanent: true },
      { source: '/garden-drainage', destination: '/landscaping-services/garden-drainage-solutions-glasgow', permanent: true },
      { source: '/driveways', destination: '/landscaping-services/driveway-installers-glasgow', permanent: true },
      { source: '/landscaping-bearsden', destination: '/locations/bearsden', permanent: true },
      { source: '/patios-newton-mearns', destination: '/locations/newton-mearns', permanent: true },
      { source: '/driveways-giffnock', destination: '/locations/giffnock', permanent: true },

      // General Page Anchor Redirects
      { source: '/contact.html', destination: '/#contact', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
      { source: '/gallery.html', destination: '/#portfolio', permanent: true },
      { source: '/portfolio', destination: '/#portfolio', permanent: true },
      { source: '/reviews', destination: '/#testimonials', permanent: true },
      { source: '/faqs.html', destination: '/#faq', permanent: true },
    ]
  },
}

export default nextConfig
