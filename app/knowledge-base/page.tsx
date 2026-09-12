import Link from 'next/link'
import { KNOWLEDGE_ARTICLES, formatArticleDate, generateGraphSchema } from '@/lib/content'
import { BookOpen, ArrowRight, Clock, User } from 'lucide-react'
import { Breadcrumbs, Eyebrow } from '@/components/silo-ui'
import { Reveal, RevealGrid } from '@/components/reveal'
import { LeafCtaBanner } from '@/components/leaf-cta-banner'

// Real project photos, cycled with distinct framing per article rather
// than fabricating stock photography.
const ARTICLE_PHOTOS = [
  '/images/portfolio/patio-lawn-after.webp',
  '/images/portfolio/garden-room-patio.webp',
  '/images/portfolio/artificial-turf-1.webp',
]

export const metadata = {
  title: 'Glasgow Landscaping Knowledge Base & Cost Guides 2026 - Riverside Landscaping',
  description: 'Topical authority hub featuring 2026 Glasgow patio cost guides, clay soil drainage engineering breakdowns, and winter hardscaping maintenance tips.',
}

export default function KnowledgeBaseHubPage() {
  const schema = generateGraphSchema('https://riverside-landscaping.co.uk/knowledge-base')

  // Feature the most recently published guide; list the rest below. Real
  // article count (3) doesn't stretch to the reference's separate
  // "Trending" + "Most Read" grids without repeating the same posts twice,
  // so this uses one honest list instead of two redundant sections.
  const sorted = [...KNOWLEDGE_ARTICLES].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  )
  const [featured, ...rest] = sorted

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Knowledge Base' }]} />
      </div>

      {/* Hero */}
      <Reveal>
        <section className="relative mt-8 h-[340px] w-full overflow-hidden sm:h-[400px]">
          <img
            src="/images/portfolio/decking-composite.webp"
            alt="Riverside Landscaping completed project in Glasgow"
            className="absolute inset-0 h-full w-full scale-105 animate-[kenburns_16s_ease-in-out_infinite_alternate] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
          <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80">
              <BookOpen className="h-3.5 w-3.5" /> Blog
            </span>
            <h1 className="mt-3 max-w-3xl text-white">Glasgow Landscaping &amp; Hardscaping Knowledge Base</h1>
          </div>
        </section>
      </Reveal>

      {/* Intro */}
      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal className="space-y-3">
            <Eyebrow icon={BookOpen}>Our Guides</Eyebrow>
            <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl">In-Depth Guides &amp; Cost Breakdowns</h2>
          </Reveal>
          <Reveal delay={0.1} className="flex items-center">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Transparent pricing standards (£120–£180/m² for vitrified porcelain), BS7533 engineering specifications,
              and localized guidance for managing heavy Glasgow clay soil — written by the team who does the work.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured article */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Link
              href={`/knowledge-base/${featured.slug}`}
              className="group block overflow-hidden border border-border bg-background shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl"
            >
              <div className="h-64 overflow-hidden sm:h-96">
                <img
                  src={ARTICLE_PHOTOS[0]}
                  alt="Riverside Landscaping project example"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 sm:p-8">
                <span className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-xs font-bold text-accent">
                  {featured.category}
                </span>
                <h3 className="mt-3 font-serif text-2xl font-bold text-primary transition-colors group-hover:text-accent sm:text-3xl">
                  {featured.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{featured.summary}</p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" /> By Riverside Landscaping Team
                    </span>
                    <span>{formatArticleDate(featured.publishDate)}</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> {featured.readingTime}
                    </span>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-accent">
                    Read Guide <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* More guides */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-serif text-2xl font-bold text-primary sm:text-3xl">More From Our Knowledge Base</h2>
          </Reveal>
          <RevealGrid className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2" stagger={0.08}>
            {rest.map((article, i) => (
              <Link
                key={article.slug}
                href={`/knowledge-base/${article.slug}`}
                className="group flex gap-4 border border-border bg-background p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
              >
                <div className="h-24 w-32 shrink-0 overflow-hidden">
                  <img
                    src={ARTICLE_PHOTOS[(i + 1) % ARTICLE_PHOTOS.length]}
                    alt="Riverside Landscaping project example"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <span className="rounded-full border border-accent/20 bg-accent/10 px-2 py-0.5 text-[11px] font-bold text-accent">
                    {article.category}
                  </span>
                  <h3 className="mt-1.5 font-serif text-base font-bold leading-tight text-primary transition-colors group-hover:text-accent">
                    {article.title}
                  </h3>
                  <p className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span>By Riverside Landscaping Team</span>
                    <span>{formatArticleDate(article.publishDate)}</span>
                  </p>
                </div>
              </Link>
            ))}
          </RevealGrid>
        </div>
      </section>

      <Reveal>
        <LeafCtaBanner
          heading="Is Your Garden Craving Some Care and Attention? Reach Out to Us Today!"
          source="knowledge-base-hub-banner"
        />
      </Reveal>
    </>
  )
}
