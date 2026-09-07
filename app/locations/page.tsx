import Metadata from 'next'
import Link from 'next/link'
import { SUBURBS, generateGraphSchema } from '@/lib/content'
import { MapPin, ArrowRight, ShieldCheck } from 'lucide-react'

export const metadata = {
  title: 'BEST Glasgow Landscaping Location Hub - Bearsden, Newton Mearns, West End & Clarkston',
  description: 'GEO Location Silo hub mapping high-end residential landscaping, porcelain patio installations, and heavy clay soil drainage engineering across Greater Glasgow suburbs.',
}

export default function LocationsHubPage() {
  const schema = generateGraphSchema('https://ardenworks.co.uk/locations')

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
          {/* Breadcrumb Navigation */}
          <nav className="text-xs uppercase tracking-widest text-emerald-400/80 font-mono">
            <Link href="/" className="hover:underline">Home</Link> &nbsp;/&nbsp; <span className="text-slate-400">Locations</span>
          </nav>

          {/* Heading Hierarchy: H1 */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <MapPin className="w-3.5 h-3.5" />
              <span>Greater Glasgow GEO Coverage</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Greater Glasgow Suburb Coverage & GEO Landscaping Hub
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Discover localized hardscaping, heavy clay drainage mitigation, and porcelain patio installations engineered for your exact suburb soil profile and planning regulations.
            </p>
          </div>

          {/* 3-Second Direct Summary */}
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 p-6 rounded-2xl space-y-3">
            <h2 className="text-xs font-mono text-emerald-400 uppercase tracking-wider">AEO Local Coverage Summary</h2>
            <p className="text-slate-200 text-base leading-relaxed font-medium">
              Apex Landscaping provides local hardscaping teams operating across Bearsden, Newton Mearns, West End Glasgow, Clarkston, Giffnock, and Milngavie, delivering custom BS7533 sub-base drainage tailored to local ground conditions.
            </p>
          </div>

          {/* Suburb Location Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUBURBS.map((suburb) => (
              <article
                key={suburb.slug}
                className="bg-slate-900/60 backdrop-blur border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 p-6 rounded-3xl group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {suburb.postcodePrefix}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{suburb.council}</span>
                  </div>

                  <h2 className="text-2xl font-serif font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {suburb.name}
                  </h2>

                  <div className="space-y-2 text-xs text-slate-300">
                    <p><strong className="text-emerald-400 font-mono">Soil Profile:</strong> {suburb.soilProfile}</p>
                    <p><strong className="text-emerald-400 font-mono">Key Hurdle:</strong> {suburb.keyChallenge}</p>
                  </div>
                </div>

                <div className="pt-6">
                  <Link
                    href={`/locations/${suburb.slug}`}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-emerald-600 text-white font-medium text-xs transition-all duration-300"
                  >
                    <span>Read about our {suburb.name} porcelain paving process</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
