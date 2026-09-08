import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SERVICES, SUBURBS, generateGraphSchema } from '@/lib/content'
import { ShieldCheck, CheckCircle2, ArrowRight, Layers, HelpCircle, MapPin } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) return {}

  return {
    title: service.titleTag,
    description: service.directAnswer3Sec,
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)

  if (!service) {
    notFound()
  }

  const schema = generateGraphSchema(
    `https://riverside-landscaping.co.uk/landscaping-services/${service.slug}`,
    service.faqs
  )

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

        <div className="max-w-5xl mx-auto relative z-10 space-y-12">
          {/* Breadcrumb Navigation (Child-to-Parent Rule) */}
          <nav className="text-xs uppercase tracking-widest text-emerald-400/80 font-mono">
            <Link href="/" className="hover:underline">Home</Link> &nbsp;/&nbsp;{' '}
            <Link href="/landscaping-services" className="hover:underline">Landscaping Services</Link> &nbsp;/&nbsp;{' '}
            <span className="text-slate-400">{service.name}</span>
          </nav>

          {/* Heading Tag Rule: H1 */}
          <header className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>BS7533 Structural Specification</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              {service.h1Title}
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Engineered specifically for heavy Scottish clay soil, high annual rainfall, and severe freeze-thaw cycles across Greater Glasgow.
            </p>
          </header>

          {/* 3-Second Direct Answer Banner (SEO/GEO Rule) */}
          <section className="bg-slate-900/90 backdrop-blur border-l-4 border-emerald-500 p-6 rounded-r-2xl border-y border-r border-slate-800 space-y-2">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold">
              3-Second Direct Answer
            </span>
            <p className="text-slate-100 text-base leading-relaxed font-medium">
              {service.directAnswer3Sec}
            </p>
          </section>

          {/* Core Content & Heading Hierarchy: H2s & H3s */}
          <div className="space-y-10 text-slate-300">
            {/* H2: Secondary Category 1 */}
            <section className="space-y-4 bg-slate-900/40 p-8 rounded-3xl border border-slate-800">
              <h2 className="text-2xl font-serif font-bold text-white">
                {service.h2Secondary1}
              </h2>
              {/* Direct Answer Paragraph under H2 */}
              <p className="text-slate-200 text-base leading-relaxed border-l-2 border-emerald-500/40 pl-3">
                Our hardscaping installation teams cover all major Glasgow suburbs, combining excavation equipment with frost-proof slurry bonding layers to create zero-maintenance outdoor spaces.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                {service.soilContext}
              </p>

              {/* H3 Sub-sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <h3 className="text-sm font-semibold text-emerald-400 font-mono">
                    Geotextile Membrane & MOT Type 1 Sub-Base Prep
                  </h3>
                  <p className="text-xs text-slate-400">
                    Prevents heavy boulder clay from migrating into aggregate layers during heavy winter rainfall.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <h3 className="text-sm font-semibold text-emerald-400 font-mono">
                    Scottish Whinstone & Resin Bound Options
                  </h3>
                  <p className="text-xs text-slate-400">
                    High-density basalt edging stone and permeable resin channels for maximum water shedding.
                  </p>
                </div>
              </div>
            </section>

            {/* H2: Secondary Category 2 */}
            <section className="space-y-4 bg-slate-900/40 p-8 rounded-3xl border border-slate-800">
              <h2 className="text-2xl font-serif font-bold text-white">
                {service.h2Secondary2}
              </h2>
              <p className="text-slate-200 text-base leading-relaxed border-l-2 border-emerald-500/40 pl-3">
                Integrated land drains and ACO slot channels divert surface water directly into soakaway units, ensuring compliance with Scottish building standards and preventing waterlogging.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                {service.bsStandard}
              </p>
            </section>

            {/* Features Checklist */}
            <section className="space-y-4 bg-slate-900/60 p-8 rounded-3xl border border-slate-800">
              <h3 className="text-xl font-serif font-bold text-white">
                Technical Specification & Build Guarantee
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="text-sm text-slate-200">{feat}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ Section with 3-Second Direct Answers */}
            <section className="space-y-6 bg-slate-900/60 p-8 rounded-3xl border border-slate-800">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-emerald-400" />
                <h2 className="text-2xl font-serif font-bold text-white">
                  Frequently Asked Questions About {service.primaryCategory} in Glasgow
                </h2>
              </div>
              <div className="space-y-4">
                {service.faqs.map((faq, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <h3 className="text-base font-semibold text-white">{faq.question}</h3>
                    <p className="text-sm text-slate-300 border-l-2 border-emerald-500/50 pl-3 py-0.5">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Suburb Linking Grid (Cross-Silo Linking Rule: Geo to Service) */}
            <section className="space-y-4 pt-4">
              <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span>Local Installation Areas Across Greater Glasgow</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SUBURBS.map((suburb) => (
                  <Link
                    key={suburb.slug}
                    href={`/locations/${suburb.slug}`}
                    className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 hover:text-emerald-400 transition-colors flex items-center justify-between"
                  >
                    <span>{suburb.name} ({suburb.postcodePrefix})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Winter CTA Trigger */}
          <div className="rounded-3xl p-8 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-serif font-bold text-white">Ready for a BS7533 Structural Handover?</h3>
              <p className="text-slate-300 text-sm max-w-xl">
                Book your site survey today to receive a fixed-price written proposal with 10-year structural guarantee.
              </p>
            </div>
            <Link
              href="/#contact"
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-colors whitespace-nowrap shadow-lg shadow-emerald-500/20"
            >
              Book Site Survey
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
