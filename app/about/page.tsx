import { Metadata } from 'next'
import Link from 'next/link'
import { Award, ArrowRight, Check, FileCheck, ShieldCheck, Star } from 'lucide-react'
import { BRAND, AVG_GOOGLE_RATING, GOOGLE_REVIEW_COUNT, generateGraphSchema } from '@/lib/content'
import { Breadcrumbs, Eyebrow, CtaBanner } from '@/components/silo-ui'
import { Reveal, RevealGrid } from '@/components/reveal'
import TestimonialMarquee from '@/components/ui/marquee-01'

export const metadata: Metadata = {
  title: 'About Riverside Landscaping - Family-Run Glasgow Hardscaping Team',
  description: 'Meet the team behind Riverside Landscaping — a Glasgow-based hardscaping crew engineering porcelain patios, driveways, and drainage to BS7533 standard, backed by a 10-year guarantee.',
}

const PHILOSOPHY_POINTS = [
  { title: 'BS7533 Certified', body: 'Every sub-base engineered to British Standard 7533.' },
  { title: "Marshall's Approved Installer", body: 'Installed using Marshalls-specified materials and methods.' },
  { title: '10-Year Guarantee', body: 'A signed structural guarantee on every build.' },
]

const TRUST_STATS = [
  { value: `${AVG_GOOGLE_RATING}★`, label: 'Google Rating' },
  { value: `${GOOGLE_REVIEW_COUNT}+`, label: 'Verified Reviews' },
  { value: '10-Year', label: 'Structural Guarantee' },
  { value: 'BS7533', label: 'Compliant Builds' },
]

const VALUES = [
  {
    title: 'Engineered, Not Guessed',
    body: 'Every project starts with a laser-level survey and a BS7533 sub-base spec, not a rough estimate.',
  },
  {
    title: 'Built for Scottish Clay & Rainfall',
    body: '150mm–200mm MOT Type 1 sub-base and geotextile membrane on every job, engineered for heavy boulder clay.',
  },
  {
    title: 'Written Estimates, No Pushy Sales',
    body: 'A free site survey and a written estimate before any work starts — no pressure to sign on the day.',
  },
  {
    title: 'Weather-Sheltered Winter Installation',
    body: 'Rapid-setting frost-proof mortars mean work continues through Scottish winters, not just summer.',
  },
  {
    title: '10-Year Structural Guarantee',
    body: 'Every build is backed by a signed structural guarantee, not a verbal promise.',
  },
  {
    title: 'Family-Run Accountability',
    body: 'Led by Leon and a small crew of dedicated tradesmen — the same team from survey to handover.',
  },
]

export default function AboutPage() {
  const schema = generateGraphSchema(`${BRAND.domain}/about`)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
      </div>

      {/* Hero */}
      <Reveal>
        <section className="relative mt-8 h-[420px] w-full overflow-hidden sm:h-[480px]">
          <img
            src="/images/garden-after.png"
            alt="A completed Riverside Landscaping porcelain patio installation"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
          <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-10 sm:px-6 lg:px-8">
            <h1 className="text-white">The Team Behind Riverside Landscaping</h1>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-white/85">
              Family-run, engineered like a business built to last — every project handled by the same crew, from
              first survey to final handover.
            </p>
          </div>
        </section>
      </Reveal>

      <div className="mx-auto max-w-6xl space-y-20 px-4 pb-20 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        {/* Philosophy */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="grid grid-cols-2 gap-4 lg:col-span-5">
            <div className="h-56 overflow-hidden border border-border sm:h-72">
              <img
                src="/images/garden-before.png"
                alt="A waterlogged clay garden before Riverside Landscaping drainage work"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-8 h-56 overflow-hidden border border-border sm:h-72">
              <img
                src="/images/garden-after.png"
                alt="The same garden after Riverside Landscaping's porcelain patio and drainage install"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <Eyebrow icon={ShieldCheck}>Our Approach</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl font-bold text-primary sm:text-4xl">
              Built on Engineering, Not Guesswork
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We don&apos;t treat drainage as an afterthought or paving as a weekend job. Riverside Landscaping is a
              Glasgow-based hardscaping team led by Leon and a small crew of dedicated tradesmen — every build is
              engineered to BS7533 standard, sized for Scottish clay and rainfall, and backed by a signed 10-year
              structural guarantee.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {PHILOSOPHY_POINTS.map((point) => (
                <div key={point.title} className="border border-border bg-secondary/40 p-4">
                  <Check className="h-4 w-4 text-accent" />
                  <p className="mt-2 text-xs font-bold text-primary">{point.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{point.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Trust stats */}
      <Reveal>
        <section className="bg-primary py-12 text-primary-foreground">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
            {TRUST_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-3xl font-bold sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-primary-foreground/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-20 sm:px-6 lg:px-8">
        {/* Values */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <Reveal className="max-w-lg lg:col-span-5">
            <Eyebrow icon={Award}>What We Stand For</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl font-bold text-primary sm:text-4xl">
              Cultivating Trust, Guaranteeing the Result
            </h2>
            <div className="mt-6 h-80 overflow-hidden border border-border">
              <img
                src="/images/garden-after.png"
                alt="Completed Riverside Landscaping hardscaping project"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <RevealGrid className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:col-span-7" stagger={0.06}>
            {VALUES.map((value, i) => (
              <article key={value.title} className="border-t border-primary/20 pt-5">
                <span className="font-serif text-2xl font-bold text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 font-serif text-lg font-bold text-primary">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.body}</p>
              </article>
            ))}
          </RevealGrid>
        </div>

        {/* Testimonials */}
        <Reveal className="space-y-6">
          <div className="max-w-2xl">
            <Eyebrow icon={Star}>Client Reviews</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl font-bold text-primary sm:text-4xl">
              What Glasgow Homeowners Say
            </h2>
          </div>
          <TestimonialMarquee />
        </Reveal>
      </div>

      {/* Led by Leon */}
      <Reveal>
        <section className="bg-[#0c1c63] py-16 text-white">
          <div className="mx-auto max-w-4xl space-y-6 px-4 text-center sm:px-6 lg:px-8">
            <Eyebrow icon={FileCheck}>Family-Run</Eyebrow>
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
              Led by Leon and a Small Crew of Dedicated Tradesmen
            </h2>
            <p className="mx-auto max-w-xl text-white/75">
              No subcontracted labour and no rotating crews — the same team plans your survey, engineers the
              sub-base, and hands the finished build back to you.
            </p>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#8fe3ae]"
            >
              See the results our crew has built <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </Reveal>

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <CtaBanner
            heading="Ready to work with Riverside Landscaping?"
            body="Get a written estimate based on your materials and labour, confirmed after a free, no-obligation site survey."
            ctaLabel="Request Site Survey"
            source="about-page-banner"
          />
        </Reveal>
      </div>
    </>
  )
}
