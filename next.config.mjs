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
      { source: '/faqs.html', destination: '/faqs', permanent: true },

      // Live Old-Site URLs — sourced from the old site's own Yoast XML
      // sitemap (page-sitemap.xml), which lists the complete, authoritative
      // set of 8 real pages on riverside-landscaping.co.uk (exact slugs,
      // not guessed). The old site serves these with a trailing slash;
      // Next's own trailing-slash normalization runs first and adds one
      // extra 308 hop for those requests before landing here, which still
      // resolves to the correct final destination.
      { source: '/turfingservices-glasgow', destination: '/landscaping-services/artificial-grass-glasgow', permanent: true },
      { source: '/treesurgery-glasgow', destination: '/landscaping-services/tree-removal-glasgow', permanent: true },
      { source: '/fencing-glasgow', destination: '/landscaping-services/garden-fencing-glasgow', permanent: true },
      { source: '/hardlandscaping-surfacing-glasgow', destination: '/landscaping-services/retaining-walls-glasgow', permanent: true },
      { source: '/patios-gravelling-glasgow', destination: '/landscaping-services/porcelain-paving-glasgow', permanent: true },
    ]
  },
}

export default nextConfig
