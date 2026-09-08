import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SUBURBS, SERVICES, generateGraphSchema } from '@/lib/content'
import { MapPin, ShieldCheck, CheckCircle2, ArrowRight, Layers, HelpCircle } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return SUBURBS.map((suburb) => ({
    slug: suburb.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const suburb = SUBURBS.find((s) => s.slug === slug)
  if (!suburb) return {}

  return {
    title: suburb.titleTag,
    description: `Expert porcelain paving, garden drainage, and driveway installation in ${suburb.name} (${suburb.postcodePrefix}). Engineered for ${suburb.soilProfile}.`,
  }
}

export default async function LocationDetailPage({ params }: PageProps) {
  const { slug } = await params
  const suburb = SUBURBS.find((s) => s.slug === slug)

  if (!suburb) {
    notFound()
  }

  const schema = generateGraphSchema(`https://riverside-landscaping.co.uk/locations/${suburb.slug}`)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="min-w-0 bg-[#0d0f12] text-slate-100 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Architectural Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10 space-y-12">
          {/* Breadcrumb Navigation */}
          <nav className="text-xs uppercase tracking-widest text-emerald-400/80 font-mono">
            <Link href="/" className="hover:underline">Home</Link> &nbsp;/&nbsp;{' '}
            <Link href="/locations" className="hover:underline">Locations</Link> &nbsp;/&nbsp;{' '}
            <span className="text-slate-400">{suburb.name}</span>
          </nav>

          {/* H1 Heading Tag Formula: [Primary Category] in [Area] */}
          <header className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <MapPin className="w-3.5 h-3.5" />
              <span>{suburb.name} ({suburb.postcodePrefix}) Specification</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Porcelain Paving & Landscaping in {suburb.name}
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Custom hardscaping engineered specifically for {suburb.name}&apos;s {suburb.soilProfile.toLowerCase()} and local planning standards.
            </p>
          </header>

          {/* 3-Second Direct Answer Rule */}
          <section className="bg-slate-900/90 backdrop-blur border-l-4 border-emerald-500 p-6 rounded-r-2xl border-y border-r border-slate-800 space-y-2">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold">
              3-Second Direct Answer
            </span>
            <p className="text-slate-100 text-base leading-relaxed font-medium">
              Landscaping and porcelain patio installations in {suburb.name} take 5 to 7 working days, utilizing a 150mm–200mm MOT Type 1 sub-base to counteract local {suburb.soilProfile.toLowerCase()} retention.
            </p>
          </section>

          {/* Local Map & Service Radius */}
          <section className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-3 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40">
              <iframe
                title={`Map of ${suburb.name}, Glasgow`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(`${suburb.name}, Glasgow, UK`)}&output=embed`}
                width="100%"
                height="320"
                style={{ border: 0, filter: 'grayscale(0.4) invert(0.9) contrast(0.9)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="md:col-span-2 space-y-4 rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
              <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                {suburb.name} Service Area
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Covering {suburb.name} ({suburb.postcodePrefix}) and surrounding {suburb.council} postcodes with the same crews and equipment for every job.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 rounded-full bg-slate-950/60 border border-slate-800 text-xs font-mono text-slate-300">
                  {suburb.postcodePrefix} priority coverage
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-950/60 border border-slate-800 text-xs font-mono text-slate-300">
                  {suburb.council}
                </span>
              </div>
            </div>
          </section>

          {/* Heading Tag Hierarchy: H2s & H3s */}
          <div className="space-y-10 text-slate-300">
            {/* H2: Secondary Category 1 */}
            <section className="space-y-4 bg-slate-900/40 p-8 rounded-3xl border border-slate-800">
              <h2 className="text-2xl font-serif font-bold text-white">
                Driveway Installers & Hardscaping Near Me in {suburb.name}
              </h2>
              {/* Direct Answer Paragraph */}
              <p className="text-slate-200 text-base leading-relaxed border-l-2 border-emerald-500/40 pl-3">
                Our hardscaping teams operating in {suburb.name} deliver BS7533-compliant driveways and outdoor dining terraces, overcoming site challenges like {suburb.keyChallenge.toLowerCase()}
              </p>

              {/* H3 Sub-sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <h3 className="text-sm font-semibold text-emerald-400 font-mono">
                    Site Access & Logistics Profile
                  </h3>
                  <p className="text-xs text-slate-400">{suburb.accessProfile}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <h3 className="text-sm font-semibold text-emerald-400 font-mono">
                    Recommended Installation Method
                  </h3>
                  <p className="text-xs text-slate-400">{suburb.highlightInstall}</p>
                </div>
              </div>
            </section>

            {/* H2: Secondary Category 2 */}
            <section className="space-y-4 bg-slate-900/40 p-8 rounded-3xl border border-slate-800">
              <h2 className="text-2xl font-serif font-bold text-white">
                Garden Drainage Solutions for Clay Soil & Wet Glasgow Weather in {suburb.name}
              </h2>
              <p className="text-slate-200 text-base leading-relaxed border-l-2 border-emerald-500/40 pl-3">
                Heavy clay deposits in {suburb.name} require deep sub-base excavation (250mm–300mm) combined with non-woven geotextile separation membranes and high-flow ACO slot channels to ensure lifetime water drainage.
              </p>
            </section>

            {/* Cross-Silo Linking Rule: Location to Service Links ONLY with Exact Contextual Anchor Text */}
            <section className="space-y-4 bg-slate-900/60 p-8 rounded-3xl border border-slate-800">
              <h2 className="text-xl font-serif font-bold text-white">
                Related Hardscaping Services Available in {suburb.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/landscaping-services/${service.slug}`}
                    className="p-4 rounded-2xl bg-slate-950/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 group flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-emerald-400">{service.primaryCategory}</span>
                      <p className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors">
                        Read about our {suburb.name} {service.primaryCategory.toLowerCase()} process
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-emerald-400 transition-all shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Winter CTA Trigger */}
          <div className="rounded-3xl p-8 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-serif font-bold text-white">Book Your {suburb.name} Site Survey</h3>
              <p className="text-slate-300 text-sm max-w-xl">
                Get a fixed-price written quote with laser level falls calculation and 10-year structural warranty.
              </p>
            </div>
            <Link
              href="/#contact"
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-colors whitespace-nowrap shadow-lg shadow-emerald-500/20"
            >
              Request Site Survey
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
