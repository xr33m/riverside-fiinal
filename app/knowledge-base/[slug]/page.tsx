import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { KNOWLEDGE_ARTICLES, generateGraphSchema } from '@/lib/content'
import { BookOpen, ArrowRight, Clock, Calendar, ShieldCheck } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return KNOWLEDGE_ARTICLES.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = KNOWLEDGE_ARTICLES.find((a) => a.slug === slug)
  if (!article) return {}

  return {
    title: article.titleTag,
    description: article.summary,
  }
}

export default async function KnowledgeArticleDetailPage({ params }: PageProps) {
  const { slug } = await params
  const article = KNOWLEDGE_ARTICLES.find((a) => a.slug === slug)

  if (!article) {
    notFound()
  }

  const schema = generateGraphSchema(`https://riverside-landscaping.co.uk/knowledge-base/${article.slug}`)

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

        <div className="max-w-4xl mx-auto relative z-10 space-y-10">
          {/* Breadcrumb Navigation */}
          <nav className="text-xs uppercase tracking-widest text-emerald-400/80 font-mono">
            <Link href="/" className="hover:underline">Home</Link> &nbsp;/&nbsp;{' '}
            <Link href="/knowledge-base" className="hover:underline">Knowledge Base</Link> &nbsp;/&nbsp;{' '}
            <span className="text-slate-400">{article.title}</span>
          </nav>

          {/* Article Header */}
          <header className="space-y-4">
            <div className="flex items-center gap-4 text-xs font-mono text-emerald-400">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-slate-400"><Clock className="w-3.5 h-3.5" />{article.readingTime}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              {article.title}
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">{article.summary}</p>
          </header>

          {/* 3-Second Direct Answer Rule */}
          <section className="bg-slate-900/90 backdrop-blur border-l-4 border-emerald-500 p-6 rounded-r-2xl border-y border-r border-slate-800 space-y-2">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold">
              3-Second Direct Answer
            </span>
            <p className="text-slate-100 text-base leading-relaxed font-medium">
              {article.directAnswer3Sec}
            </p>
          </section>

          {/* Article Body Sections */}
          <div className="space-y-8">
            {article.sections.map((section, idx) => (
              <section key={idx} className="space-y-4 bg-slate-900/40 p-8 rounded-3xl border border-slate-800">
                <h2 className="text-2xl font-serif font-bold text-white">{section.h2}</h2>
                {section.directAnswer && (
                  <p className="text-slate-200 text-base font-medium border-l-2 border-emerald-500/50 pl-3 py-1">
                    {section.directAnswer}
                  </p>
                )}
                <p className="text-slate-300 text-sm leading-relaxed">{section.content}</p>
              </section>
            ))}
          </div>

          {/* Connect Informational Article back to Main Transactional Service Page using Exact Match Anchor Text */}
          <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400">Main Transactional Service</span>
              <p className="text-sm font-medium text-white">
                Need professional hardscaping installation in Greater Glasgow?
              </p>
            </div>
            <Link
              href={`/landscaping-services/${article.relatedServiceSlug}`}
              className="inline-flex items-center px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors shrink-0"
            >
              <span>{article.relatedServiceAnchor}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
