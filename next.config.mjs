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
      // Standard Legacy Page 301 Redirects
      { source: '/services.html', destination: '/services', permanent: true },
      { source: '/services', destination: '/#services', permanent: true },
      { source: '/contact.html', destination: '/#contact', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
      { source: '/about.html', destination: '/#about', permanent: true },
      { source: '/about-us', destination: '/#about', permanent: true },
      { source: '/gallery.html', destination: '/#portfolio', permanent: true },
      { source: '/portfolio', destination: '/#portfolio', permanent: true },
      { source: '/reviews', destination: '/#testimonials', permanent: true },
      { source: '/faqs.html', destination: '/#faq', permanent: true },
      // Legacy Area & Service Specific Redirects
      { source: '/landscaping-bearsden', destination: '/areas/bearsden', permanent: true },
      { source: '/patios-newton-mearns', destination: '/areas/newton-mearns', permanent: true },
      { source: '/driveways-giffnock', destination: '/areas/giffnock', permanent: true },
      { source: '/porcelain-paving', destination: '/services/porcelain-paving-glasgow', permanent: true },
      { source: '/garden-drainage', destination: '/services/garden-drainage-engineering', permanent: true },
      // Catch legacy .php / .html extensions cleanly
      { source: '/:path*.html', destination: '/:path*', permanent: true },
      { source: '/:path*.php', destination: '/:path*', permanent: true },
    ]
  },
}

export default nextConfig
