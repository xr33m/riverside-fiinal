import Link from 'next/link'
import { KNOWLEDGE_ARTICLES, generateGraphSchema } from '@/lib/content'
import { BookOpen, ArrowRight, Clock } from 'lucide-react'
import { Breadcrumbs, Eyebrow, DirectAnswer } from '@/components/silo-ui'
import { Reveal, RevealGrid } from '@/components/reveal'

export const metadata = {
  title: 'Glasgow Landscaping Knowledge Base & Cost Guides 2026 - Riverside Landscaping',
  description: 'Topical authority hub featuring 2026 Glasgow patio cost guides, clay soil drainage engineering breakdowns, and winter hardscaping maintenance tips.',
}

export default function KnowledgeBaseHubPage() {
  const schema = generateGraphSchema('https://riverside-landscaping.co.uk/knowledge-base')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto max-w-6xl space-y-12 px-4 pb-20 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Knowledge Base' }]} />

        {/* Heading Tag Rule: H1 */}
        <Reveal className="max-w-3xl space-y-4">
          <Eyebrow icon={BookOpen}>Topical Authority &amp; Cost Guides</Eyebrow>
          <h1>Glasgow Landscaping &amp; Hardscaping Knowledge Base</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            In-depth technical guides, 2026 pricing breakdowns, and Scottish weather engineering advice for Glasgow homeowners.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <DirectAnswer>
            Our knowledge base provides transparent pricing standards (£120–£180/m² for vitrified porcelain), BS7533 engineering specifications, and localized guidance for managing heavy Glasgow clay soil.
          </DirectAnswer>
        </Reveal>

        {/* Article Cards Grid */}
        <RevealGrid className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {KNOWLEDGE_ARTICLES.map((article) => (
            <article
              key={article.slug}
              className="group flex flex-col justify-between border border-border bg-background p-8 transition-colors duration-300 hover:border-accent"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 font-bold text-accent">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readingTime}</span>
                </div>

                <h2 className="font-serif text-2xl font-bold text-primary transition-colors group-hover:text-accent">
                  {article.title}
                </h2>

                {/* 3-Second Direct Answer Block */}
                <p className="border-l-2 border-accent/50 py-1 pl-3 text-sm leading-relaxed text-muted-foreground">
                  {article.directAnswer3Sec}
                </p>
              </div>

              <div className="pt-8">
                <Link
                  href={`/knowledge-base/${article.slug}`}
                  className="button-outline flex w-full items-center justify-between text-sm"
                >
                  <span>Read full guide &amp; 2026 breakdown</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </RevealGrid>
      </div>
    </>
  )
}
