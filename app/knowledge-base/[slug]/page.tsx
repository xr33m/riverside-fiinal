import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { KNOWLEDGE_ARTICLES, generateGraphSchema } from '@/lib/content'
import { BookOpen, ArrowRight, Clock } from 'lucide-react'
import { Breadcrumbs, DirectAnswer, SectionCard } from '@/components/silo-ui'
import { Reveal, RevealGrid } from '@/components/reveal'

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
      <div className="mx-auto max-w-4xl space-y-10 px-4 pb-20 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Knowledge Base', href: '/knowledge-base' },
            { label: article.title },
          ]}
        />

        {/* Article Header */}
        <Reveal>
          <header className="space-y-4">
            <div className="flex items-center gap-4 text-xs text-accent">
              <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 font-bold">
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {article.readingTime}
              </span>
            </div>
            <h1>{article.title}</h1>
            <p className="text-lg leading-relaxed text-muted-foreground">{article.summary}</p>
          </header>
        </Reveal>

        {/* 3-Second Direct Answer Rule */}
        <Reveal delay={0.1}>
          <DirectAnswer>{article.directAnswer3Sec}</DirectAnswer>
        </Reveal>

        {/* Article Body Sections */}
        <RevealGrid className="space-y-8">
          {article.sections.map((section, idx) => (
            <SectionCard key={idx}>
              <h2 className="font-serif text-2xl font-bold text-primary">{section.h2}</h2>
              {section.directAnswer && (
                <p className="border-l-2 border-accent/50 py-1 pl-3 text-base font-medium text-foreground">
                  {section.directAnswer}
                </p>
              )}
              <p className="text-sm leading-relaxed text-muted-foreground">{section.content}</p>
            </SectionCard>
          ))}
        </RevealGrid>

        {/* Connect Informational Article back to Main Transactional Service Page using Exact Match Anchor Text */}
        <Reveal className="flex items-center justify-between gap-4 border border-accent/30 bg-accent/5 p-6">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 shrink-0 text-accent" />
            <div className="space-y-1">
              <span className="text-xs font-semibold text-accent">Main Transactional Service</span>
              <p className="text-sm font-medium text-primary">
                Need professional hardscaping installation in Greater Glasgow?
              </p>
            </div>
          </div>
          <Link
            href={`/landscaping-services/${article.relatedServiceSlug}`}
            className="button-clay shrink-0 whitespace-nowrap text-xs"
          >
            <span>{article.relatedServiceAnchor}</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </>
  )
}
