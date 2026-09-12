import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { KNOWLEDGE_ARTICLES, formatArticleDate, generateGraphSchema } from '@/lib/content'
import { BookOpen, ArrowRight, Clock, User } from 'lucide-react'
import { Breadcrumbs, DirectAnswer } from '@/components/silo-ui'
import { Reveal, RevealGrid } from '@/components/reveal'
import { LeafCtaBanner } from '@/components/leaf-cta-banner'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Real project photos, cycled with distinct framing per article rather
// than fabricating stock photography.
const ARTICLE_PHOTOS = [
  '/images/portfolio/patio-lawn-after.webp',
  '/images/portfolio/garden-room-patio.webp',
  '/images/portfolio/artificial-turf-1.webp',
]

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

  const articleIndex = KNOWLEDGE_ARTICLES.findIndex((a) => a.slug === slug)
  const heroPhoto = ARTICLE_PHOTOS[articleIndex % ARTICLE_PHOTOS.length]
  const featuredPhoto = ARTICLE_PHOTOS[(articleIndex + 1) % ARTICLE_PHOTOS.length]
  const otherArticles = KNOWLEDGE_ARTICLES.filter((a) => a.slug !== slug)

  const schema = generateGraphSchema(`https://riverside-landscaping.co.uk/knowledge-base/${article.slug}`)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Knowledge Base', href: '/knowledge-base' },
            { label: article.title },
          ]}
        />
      </div>

      {/* Hero */}
      <Reveal>
        <section className="relative mt-8 h-[340px] w-full overflow-hidden sm:h-[400px]">
          <img
            src={heroPhoto}
            alt="Riverside Landscaping project example"
            className="absolute inset-0 h-full w-full scale-105 animate-[kenburns_16s_ease-in-out_infinite_alternate] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15" />
          <div className="relative mx-auto flex h-full max-w-4xl flex-col justify-end px-4 pb-12 sm:px-6 lg:px-8">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80">
              <BookOpen className="h-3.5 w-3.5" /> Blog Details
            </span>
            <h1 className="mt-3 text-white">{article.title}</h1>
          </div>
        </section>
      </Reveal>

      <div className="mx-auto max-w-4xl space-y-10 px-4 pb-20 pt-14 sm:px-6 lg:px-8">
        {/* Meta row */}
        <Reveal className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-6">
          <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
            {article.category}
          </span>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" /> By Riverside Landscaping Team
            </span>
            <span>{formatArticleDate(article.publishDate)}</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {article.readingTime}
            </span>
          </div>
        </Reveal>

        {/* Intro */}
        <Reveal className="space-y-6">
          <p className="text-lg leading-relaxed text-muted-foreground">{article.summary}</p>
          <div className="h-64 overflow-hidden shadow-md sm:h-96">
            <img src={featuredPhoto} alt="Riverside Landscaping project example" className="h-full w-full object-cover" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <DirectAnswer>{article.directAnswer3Sec}</DirectAnswer>
        </Reveal>

        {/* Numbered sections */}
        <RevealGrid className="space-y-10" stagger={0.06}>
          {article.sections.map((section, i) => (
            <article key={i} className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-primary">
                {i + 1}. {section.h2}
              </h2>
              {section.directAnswer && (
                <p className="border-l-2 border-accent/50 py-1 pl-3 text-base font-medium text-foreground">
                  {section.directAnswer}
                </p>
              )}
              <p className="text-sm leading-relaxed text-muted-foreground">{section.content}</p>
            </article>
          ))}
        </RevealGrid>

        {/* Connect informational article back to the main transactional service page */}
        <Reveal className="flex flex-col items-start justify-between gap-4 border border-accent/30 bg-accent/5 p-6 sm:flex-row sm:items-center">
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

      {/* Latest posts */}
      {otherArticles.length > 0 && (
        <section className="bg-secondary/40 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-center font-serif text-3xl font-bold text-primary sm:text-4xl">Latest Posts</h2>
            </Reveal>
            <RevealGrid className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2" stagger={0.08}>
              {otherArticles.map((other, i) => (
                <Link
                  key={other.slug}
                  href={`/knowledge-base/${other.slug}`}
                  className="group block overflow-hidden border border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={ARTICLE_PHOTOS[i % ARTICLE_PHOTOS.length]}
                      alt="Riverside Landscaping project example"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-xs font-bold text-accent">
                      {other.category}
                    </span>
                    <h3 className="mt-3 font-serif text-lg font-bold text-primary transition-colors group-hover:text-accent">
                      {other.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">{other.summary}</p>
                    <p className="mt-4 text-xs text-muted-foreground">
                      By Riverside Landscaping Team · {formatArticleDate(other.publishDate)}
                    </p>
                  </div>
                </Link>
              ))}
            </RevealGrid>
          </div>
        </section>
      )}

      <Reveal>
        <LeafCtaBanner
          heading="Is Your Garden Craving Some Care and Attention? Reach Out to Us Today!"
          source={`knowledge-base-detail-${article.slug}`}
        />
      </Reveal>
    </>
  )
}
