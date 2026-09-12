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
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/gallery.html', destination: '/portfolio', permanent: true },
      { source: '/gallery', destination: '/portfolio', permanent: true },
      { source: '/reviews', destination: '/#testimonials', permanent: true },
      { source: '/faqs.html', destination: '/#faq', permanent: true },

      // Live Old-Site URLs — confirmed via a `site:riverside-landscaping.co.uk`
      // search of the currently-indexed pages (this environment can't reach
      // the live domain directly to crawl it, so these are the real indexed
      // paths the user reported). Regex-suffixed sources cover the full slug
      // even where Google's result truncated it, so the redirect still fires
      // if the real suffix differs slightly from the guessed one.
      { source: '/:slug(turfingservices-gla.*)', destination: '/landscaping-services/artificial-grass-glasgow', permanent: true },
      { source: '/treesurgery-glasgow', destination: '/landscaping-services', permanent: true },
      { source: '/fencing-glasgow', destination: '/landscaping-services/garden-fencing-glasgow', permanent: true },
      { source: '/:slug(hardlandscaping-s.*)', destination: '/landscaping-services/retaining-walls-glasgow', permanent: true },
      { source: '/:slug(patios-gravelling-g.*)', destination: '/landscaping-services/porcelain-paving-glasgow', permanent: true },
    ]
  },
}

export default nextConfig
