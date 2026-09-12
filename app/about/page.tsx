import { Metadata } from 'next'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { Award, ArrowRight, Check, FileCheck, ShieldCheck, Star, Users } from 'lucide-react'
import { BRAND, AVG_GOOGLE_RATING, GOOGLE_REVIEW_COUNT, generateGraphSchema } from '@/lib/content'
import { Breadcrumbs, Eyebrow, CtaBanner } from '@/components/silo-ui'
import { Reveal, RevealGrid } from '@/components/reveal'
import { TestimonialCarousel } from '@/components/testimonial-carousel'

// Decorative ribbon/flag accent behind the Values section photo — matches
// the Figma reference's corner ribbons, in brand accent green instead of
// its orange.
function RibbonAccent({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute h-28 w-12 bg-accent ${className}`}
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 82%, 50% 100%, 0 82%)' }}
    />
  )
}

interface Credential {
  icon: LucideIcon
  label: string
}

const CREDENTIALS: Credential[] = [
  { icon: ShieldCheck, label: 'BS7533 Certified' },
  { icon: Award, label: "Marshall's Approved Installer" },
  { icon: FileCheck, label: '10-Year Guarantee' },
  { icon: Users, label: 'Family-Run & Local' },
]

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
            src="/images/garden-after.webp"
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
          {/* Only 2 real project photos exist (before/after) — shown 4x here
              with different crops/framing rather than inventing more photos. */}
          <Reveal className="grid grid-cols-2 gap-4 lg:col-span-5">
            <div className="h-40 overflow-hidden border border-border sm:h-52">
              <img
                src="/images/garden-before.webp"
                alt="A waterlogged clay garden before Riverside Landscaping drainage work"
                className="h-full w-full object-cover object-left-top"
              />
            </div>
            <div className="mt-6 h-40 overflow-hidden border border-border sm:h-52">
              <img
                src="/images/garden-after.webp"
                alt="The finished patio after Riverside Landscaping's install"
                className="h-full w-full object-cover object-right-top"
              />
            </div>
            <div className="h-40 overflow-hidden border border-border sm:h-52">
              <img
                src="/images/garden-after.webp"
                alt="Detail of the finished patio's lighting and planting"
                className="h-full w-full object-cover object-left-bottom"
              />
            </div>
            <div className="mt-6 h-40 overflow-hidden border border-border sm:h-52">
              <img
                src="/images/garden-before.webp"
                alt="Detail of the waterlogged lawn before drainage work"
                className="h-full w-full object-cover object-right-bottom"
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
        <div className="space-y-12">
          <Reveal className="mx-auto max-w-2xl space-y-3 text-center">
            <Eyebrow icon={Award}>Our Values</Eyebrow>
            <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
              Cultivating Trust, Guaranteeing the Result
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:items-center lg:gap-8">
            <RevealGrid className="grid gap-10 lg:order-1" stagger={0.06}>
              {VALUES.slice(0, 3).map((value, i) => (
                <article key={value.title}>
                  <h3 className="font-serif text-lg font-bold text-primary">
                    {i + 1}. {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.body}</p>
                </article>
              ))}
            </RevealGrid>

            <Reveal delay={0.1} className="relative order-first lg:order-2">
              <RibbonAccent className="-left-4 -top-4 -rotate-[15deg]" />
              <RibbonAccent className="-bottom-4 -right-4 rotate-[15deg]" />
              <div className="relative h-80 overflow-hidden border border-border sm:h-[420px]">
                <img
                  src="/images/garden-after.webp"
                  alt="Completed Riverside Landscaping hardscaping project"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>

            <RevealGrid className="grid gap-10 lg:order-3" stagger={0.06}>
              {VALUES.slice(3, 6).map((value, i) => (
                <article key={value.title}>
                  <h3 className="font-serif text-lg font-bold text-primary">
                    {i + 4}. {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.body}</p>
                </article>
              ))}
            </RevealGrid>
          </div>
        </div>

        {/* Testimonials */}
        <Reveal className="space-y-6">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow icon={Star}>Client Reviews</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl font-bold text-primary sm:text-4xl">
              What Glasgow Homeowners Say
            </h2>
          </div>
          <TestimonialCarousel />
        </Reveal>
      </div>

      {/* Led by Leon — same dark full-bleed band + card-grid rhythm as a
          "meet the team" section, but built from real credentials rather
          than stock headshots standing in for staff we can't show. */}
      <Reveal>
        <section className="bg-[#0c1c63] py-16 text-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl space-y-4 text-center">
              <Eyebrow icon={FileCheck}>Family-Run</Eyebrow>
              <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
                Led by Leon and a Small Crew of Dedicated Tradesmen
              </h2>
              <p className="mx-auto max-w-xl text-white/75">
                No subcontracted labour and no rotating crews — the same team plans your survey, engineers the
                sub-base, and hands the finished build back to you.
              </p>
            </div>

            <RevealGrid className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4" stagger={0.06}>
              {CREDENTIALS.map((c) => (
                <div key={c.label} className="border border-white/15 bg-white/5 p-5 text-center">
                  <c.icon className="mx-auto h-6 w-6 text-[#8fe3ae]" />
                  <p className="mt-3 text-xs font-bold uppercase tracking-wide text-white">{c.label}</p>
                </div>
              ))}
            </RevealGrid>

            <div className="mt-8 text-center">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#8fe3ae]"
              >
                See the results our crew has built <ArrowRight size={16} />
              </Link>
            </div>
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
