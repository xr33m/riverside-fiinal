import Metadata from 'next'
import Link from 'next/link'
import { KNOWLEDGE_ARTICLES, generateGraphSchema } from '@/lib/content'
import { BookOpen, ArrowRight, Clock, Calendar } from 'lucide-react'

export const metadata = {
  title: 'Glasgow Landscaping Knowledge Base & Cost Guides 2026 - Apex Landscaping',
  description: 'Topical authority hub featuring 2026 Glasgow patio cost guides, clay soil drainage engineering breakdowns, and winter hardscaping maintenance tips.',
}

export default function KnowledgeBaseHubPage() {
  const schema = generateGraphSchema('https://ardenworks.co.uk/knowledge-base')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="min-w-0 bg-[#0d0f12] text-slate-100 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10 space-y-12">
          {/* Breadcrumbs */}
          <nav className="text-xs uppercase tracking-widest text-emerald-400/80 font-mono">
            <Link href="/" className="hover:underline">Home</Link> &nbsp;/&nbsp; <span className="text-slate-400">Knowledge Base</span>
          </nav>

          {/* Heading Tag Rule: H1 */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Topical Authority & Cost Guides</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Glasgow Landscaping & Hardscaping Knowledge Base
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              In-depth technical guides, 2026 pricing breakdowns, and Scottish weather engineering advice for Glasgow homeowners.
            </p>
          </div>

          {/* 3-Second Direct Summary */}
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 p-6 rounded-2xl space-y-3">
            <h2 className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Topical Summary</h2>
            <p className="text-slate-200 text-base leading-relaxed font-medium">
              Our knowledge base provides transparent pricing standards (£120–£180/m² for vitrified porcelain), BS7533 engineering specifications, and localized guidance for managing heavy Glasgow clay soil.
            </p>
          </div>

          {/* Article Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {KNOWLEDGE_ARTICLES.map((article) => (
              <article
                key={article.slug}
                className="bg-slate-900/60 backdrop-blur border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 p-8 rounded-3xl group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readingTime}</span>
                  </div>

                  <h2 className="text-2xl font-serif font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {article.title}
                  </h2>

                  {/* 3-Second Direct Answer Block */}
                  <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-emerald-500/50 pl-3 py-1">
                    {article.directAnswer3Sec}
                  </p>
                </div>

                <div className="pt-8">
                  <Link
                    href={`/knowledge-base/${article.slug}`}
                    className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-emerald-600 text-white font-medium text-sm transition-all duration-300"
                  >
                    <span>Read full guide & 2026 breakdown</span>
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
