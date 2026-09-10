import Link from 'next/link'
import { AYRSHIRE_TOWNS, generateAyrshireGraphSchema } from '@/lib/content'
import { MapPin, ArrowRight } from 'lucide-react'
import { Breadcrumbs, Eyebrow, DirectAnswer } from '@/components/silo-ui'
import { Reveal, RevealGrid } from '@/components/reveal'

export const metadata = {
  title: 'Landscaping & Patio Installers in Ayrshire - Riverside Landscaping',
  description: 'Porcelain paving, driveways, and garden drainage for coastal Ayrshire towns including Troon, Prestwick, Ayr, and West Kilbride, from the team behind Riverside Landscaping Glasgow.',
}

export default function AyrshireHubPage() {
  const schema = generateAyrshireGraphSchema('https://riverside-landscaping.co.uk/ayrshire')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto max-w-6xl space-y-12 px-4 pb-20 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Ayrshire' }]} />

        {/* Heading Hierarchy: H1 */}
        <Reveal className="max-w-3xl space-y-4">
          <Eyebrow icon={MapPin}>Now Covering Coastal Ayrshire</Eyebrow>
          <h1>Landscaping &amp; Hardscaping Across Ayrshire</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            The same BS7533-engineered porcelain paving, driveways, and drainage work we build across Greater Glasgow, now reaching coastal Ayrshire — from Troon&apos;s links sand to Ayr&apos;s riverside gardens.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <DirectAnswer>
            Riverside Landscaping now serves Troon, Prestwick, Ayr &amp; Alloway, and West Kilbride, adapting our BS7533 sub-base engineering to Ayrshire&apos;s coastal links sand and exposed, windswept plots rather than Glasgow&apos;s heavy boulder clay.
          </DirectAnswer>
        </Reveal>

        {/* Town Cards Grid */}
        <RevealGrid className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {AYRSHIRE_TOWNS.map((town) => (
            <article
              key={town.slug}
              className="group flex flex-col justify-between border border-border bg-background p-6 transition-colors duration-300 hover:border-accent"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-xs font-bold text-accent">
                    {town.postcodePrefix}
                  </span>
                  <span className="text-xs text-muted-foreground">{town.council}</span>
                </div>

                <h2 className="font-serif text-2xl font-bold text-primary transition-colors group-hover:text-accent">
                  {town.name}
                </h2>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <p><strong className="text-accent">Ground Profile:</strong> {town.soilProfile}</p>
                  <p><strong className="text-accent">Key Hurdle:</strong> {town.keyChallenge}</p>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href={`/ayrshire/${town.slug}`}
                  className="button-outline flex w-full items-center justify-between text-xs"
                >
                  <span>Read about our {town.name} installation process</span>
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
