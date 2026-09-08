import Metadata from 'next'
import Link from 'next/link'
import { SERVICES, generateGraphSchema } from '@/lib/content'
import { ShieldCheck, ArrowRight, Layers, Droplets, Car, Compass } from 'lucide-react'

export const metadata = {
  title: 'BEST Landscaping Services Glasgow - Porcelain Paving, Driveways & Clay Drainage',
  description: 'Core category hub for BS7533-compliant hardscaping, porcelain patio installation, permeable driveways, and clay soil drainage solutions across Greater Glasgow.',
}

export default function LandscapingServicesHubPage() {
  const schema = generateGraphSchema('https://riverside-landscaping.co.uk/landscaping-services')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="min-w-0 bg-[#0d0f12] text-slate-100 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Architectural Background Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10 space-y-12">
          {/* Breadcrumbs (Child-to-Parent Rule) */}
          <nav className="text-xs uppercase tracking-widest text-emerald-400/80 font-mono">
            <Link href="/" className="hover:underline">Home</Link> &nbsp;/&nbsp; <span className="text-slate-400">Landscaping Services</span>
          </nav>

          {/* Heading Tag Rule: H1 */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>BS7533 Compliant Pavement Engineering</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Landscaping Services & Hardscaping Engineering in Glasgow
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Explore our core category hubs for luxury vitrified porcelain paving, load-certified driveway installations, sub-surface clay soil drainage systems, and architectural composite decking built for Scottish weather.
            </p>
          </div>

          {/* 3-Second Direct Answer Section */}
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 p-6 rounded-2xl space-y-3">
            <h2 className="text-xs font-mono text-emerald-400 uppercase tracking-wider">AEO Direct Summary</h2>
            <p className="text-slate-200 text-base leading-relaxed font-medium">
              Riverside Landscaping provides BS7533-compliant hardscaping services across Greater Glasgow, specializing in 150mm–200mm MOT Type 1 sub-base compaction, heavy clay drainage mitigation, Italian porcelain paving, and weather-sheltered year-round installation.
            </p>
          </div>

          {/* Category Hub Services Grid (Parent-to-Child Linking Rules) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {SERVICES.map((service) => (
              <article
                key={service.slug}
                className="bg-slate-900/60 backdrop-blur border border-slate-800/80 hover:border-emerald-500/40 transition-all duration-300 p-8 rounded-3xl group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    {service.slug.includes('porcelain') && <Layers className="w-6 h-6" />}
                    {service.slug.includes('driveway') && <Car className="w-6 h-6" />}
                    {service.slug.includes('drainage') && <Droplets className="w-6 h-6" />}
                    {service.slug.includes('decking') && <Compass className="w-6 h-6" />}
                  </div>

                  <h2 className="text-2xl font-serif font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {service.name}
                  </h2>

                  {/* 3-Second Direct Answer Block */}
                  <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-emerald-500/50 pl-3 py-1">
                    {service.directAnswer3Sec}
                  </p>

                  <ul className="space-y-2 pt-2 text-xs text-slate-400 font-mono">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  {/* Contextual Anchor Text */}
                  <Link
                    href={`/landscaping-services/${service.slug}`}
                    className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-emerald-600 text-white font-medium text-sm transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-600/20"
                  >
                    <span>Read complete {service.primaryCategory.toLowerCase()} specification</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Winter Incentive Callout */}
          <div className="rounded-3xl p-8 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-serif font-bold text-white">Planning a Hardscaping Project in Glasgow?</h3>
              <p className="text-slate-300 text-sm max-w-xl">
                Beat the 12-week spring waitlist with weather-sheltered winter mortar installation and 10-year guaranteed excavation.
              </p>
            </div>
            <Link
              href="/#contact"
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-colors whitespace-nowrap shadow-lg shadow-emerald-500/20"
            >
              Request Free Consultation
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
