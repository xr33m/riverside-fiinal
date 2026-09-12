import { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  HelpCircle,
  MapPin,
  Star,
  ClipboardList,
  Wrench,
  ShieldCheck,
  Sparkles,
  TreeDeciduous,
  FileCheck,
  Users,
  Trash2,
} from 'lucide-react'
import { SUBURBS, AVG_GOOGLE_RATING, GOOGLE_REVIEW_COUNT, generateGraphSchema } from '@/lib/content'
import { Breadcrumbs, Eyebrow, DirectAnswer, SubCard } from '@/components/silo-ui'
import { Reveal, RevealGrid } from '@/components/reveal'
import { LeafCtaBanner } from '@/components/leaf-cta-banner'
import { TestimonialCarousel } from '@/components/testimonial-carousel'
import { FaqAccordion } from '@/components/faq-accordion'
import { ServicesShowcase } from '@/components/services-showcase'
import { ProcessShowcase, type ProcessStep } from '@/components/process-showcase'

// Tree work uses its own credential row and process copy rather than the
// hardscaping template's — BS7533 and "structural guarantee" are paving
// standards and don't apply to felling or pruning a tree.
const CREDENTIALS = [
  { icon: ClipboardList, label: 'Free Site Visit' },
  { icon: Trash2, label: 'Full Waste Removal' },
  { icon: Users, label: 'Family-Run & Local' },
]

const FEATURES = [
  'Free, no-obligation site visit and written quote before any work is booked',
  'Risk-assessed approach around structures, power lines, fences and neighbouring gardens',
  'All arisings, branches and waste cleared and removed before we leave',
  'Same family-run crew from quote through to clean-up — no subcontracted labour',
  'Serving homeowners across Glasgow and Ayrshire',
]

const TREE_FAQS = [
  {
    question: 'Do I need permission to remove a tree in Glasgow?',
    answer:
      'It depends on the tree. If it has a Tree Preservation Order (TPO) on it, or sits within a Conservation Area, you need permission from your local council before removing or significantly pruning it. Most trees on private residential land have no such restriction, but we always recommend checking with your council first — we can help you figure out what applies during your free site visit.',
  },
  {
    question: 'How much does tree removal cost in Glasgow?',
    answer:
      "It depends on the tree's size, condition, and how accessible it is — a small garden tree with clear access costs a lot less than a large tree overhanging a roof or close to power lines. We don't quote fixed prices upfront; every job gets a free site visit and a written quote first.",
  },
  {
    question: 'Do you remove the stump as well?',
    answer:
      "Stump removal or grinding is available and can be included in your quote if you'd rather not have a stump left behind — just let us know when we visit.",
  },
  {
    question: 'What happens to the branches and wood after the tree is removed?',
    answer:
      "All arisings are cleared and removed from site as standard — we don't leave logs, branches, or chippings behind unless you specifically want to keep them (for firewood, for example).",
  },
]

export const metadata: Metadata = {
  title: "BEST Tree Removal Glasgow - If you're looking for tree surgeons near me or tree felling near me - Riverside Landscaping is the #1 Landscaper in Glasgow",
  description:
    'Tree removal, pruning, and stump grinding across Glasgow and Ayrshire. Free site visit and written quote, full site clean-up included, from the same family-run crew behind Riverside Landscaping.',
}

export default function TreeRemovalPage() {
  const schema = generateGraphSchema(
    'https://riverside-landscaping.co.uk/landscaping-services/tree-removal-glasgow',
    TREE_FAQS
  )

  const processSteps: [ProcessStep, ProcessStep, ProcessStep] = [
    {
      icon: ClipboardList,
      title: 'Free Site Visit & Risk Assessment',
      body: "We visit to assess the tree's size, condition, and surroundings — access, power lines, structures, and anything else that affects the safest way to do the job — then give you a written quote.",
    },
    {
      icon: Wrench,
      title: 'Tree Work Carried Out Safely',
      body: 'Felling, sectional dismantling, crown reduction, or pruning — whichever the risk assessment calls for, worked through methodically and safely.',
    },
    {
      icon: ShieldCheck,
      title: 'Full Clean-Up & Waste Removal',
      body: 'All branches, logs and chippings are cleared and removed from site before we leave — your garden is left tidy, not full of arisings.',
    },
  ]

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
            { label: 'Landscaping Services', href: '/landscaping-services' },
            { label: 'Tree Removal & Surgery' },
          ]}
        />
      </div>

      {/* Hero */}
      <Reveal>
        <section className="relative mt-8 h-[380px] w-full overflow-hidden sm:h-[440px]">
          <img
            src="/images/portfolio/tree-removal.webp"
            alt="Riverside Landscaping tree removal work in Glasgow"
            className="absolute inset-0 h-full w-full scale-105 animate-[kenburns_16s_ease-in-out_infinite_alternate] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-transparent" />
          <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80">
              <TreeDeciduous className="h-3.5 w-3.5" /> Service Detail
            </span>
            <h1 className="mt-3 max-w-3xl text-white">Tree Removal &amp; Surgery in Glasgow</h1>
          </div>
        </section>
      </Reveal>

      {/* Floating trust stat card */}
      <div className="relative z-10 mx-auto -mt-8 max-w-5xl px-4 sm:-mt-10 sm:px-6 lg:px-8">
        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-4 border border-border bg-background p-6 shadow-xl sm:grid-cols-4">
            <div className="text-center">
              <p className="flex items-center justify-center gap-1 font-serif text-2xl font-bold text-primary">
                <Star className="h-5 w-5 fill-current text-accent" /> {AVG_GOOGLE_RATING}
              </p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                {GOOGLE_REVIEW_COUNT}+ Reviews
              </p>
            </div>
            {CREDENTIALS.map((c) => (
              <div key={c.label} className="text-center">
                <c.icon className="mx-auto h-6 w-6 text-accent" />
                <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{c.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Intro / pain point */}
      <section className="bg-background pb-16 pt-14 sm:pt-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl space-y-5">
            <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
              Overgrown, Damaged, or In The Way — We&apos;ll Sort It
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Riverside Landscaping removes, prunes, and manages trees across Glasgow and Ayrshire — from a single
              overgrown tree blocking light, to full garden clearance ahead of a landscaping project. Every job
              starts with a free site visit and a written quote, and we clear all arisings before we leave.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 max-w-3xl">
            <DirectAnswer>
              Every tree job starts with a site risk assessment — access, power lines, nearby structures, and the
              safest felling or dismantling method — before any cutting begins.
            </DirectAnswer>
          </Reveal>
        </div>
      </section>

      {/* Technical subtopics */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal className="space-y-4 border-t-4 border-accent bg-background p-7 shadow-md">
            <h2 className="font-serif text-2xl font-bold text-primary">What We Handle</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              From a single problem tree to clearing a whole garden boundary, we scope the work to what you actually
              need.
            </p>
            <div className="grid grid-cols-1 gap-4 pt-2">
              <SubCard title="Felling, Pruning & Crown Work">
                Full removal, crown reduction or thinning, and deadwooding for trees that are healthy but need
                managing.
              </SubCard>
              <SubCard title="Stump Grinding & Hedge Trimming">
                Optional stump removal after felling, plus hedge and overgrowth trimming as part of the same visit.
              </SubCard>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="space-y-4 border-t-4 border-primary bg-background p-7 shadow-md">
            <h2 className="font-serif text-2xl font-bold text-primary">Planning Permission &amp; Protected Trees</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Some trees are protected by a Tree Preservation Order (TPO) or sit within a Conservation Area, which
              means council permission is needed before removal or significant pruning. Most garden trees aren&apos;t
              affected, but we&apos;ll help you check what applies to yours before any work is booked.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <ProcessShowcase
        eyebrow="Our Process"
        heading={
          <>
            How We Handle Your <em>Tree Work</em>
          </>
        }
        description="No complicated process, no surprises. Here's exactly what happens when you contact us about a tree on your property."
        ctaLabel="Book Free Site Visit"
        ctaSource="process-section-tree-removal-glasgow"
        steps={processSteps}
      />

      {/* Photo */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-xl space-y-2">
            <Eyebrow icon={TreeDeciduous}>Recent Work</Eyebrow>
            <h2 className="font-serif text-2xl font-bold text-primary sm:text-3xl">
              A Recent Tree Removal Job in Glasgow
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <div className="h-72 overflow-hidden shadow-md sm:h-[420px]">
              <img
                src="/images/portfolio/tree-removal.webp"
                alt="Riverside Landscaping tree removal in progress in Glasgow"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Eyebrow icon={Sparkles}>Why Us</Eyebrow>
            <h2 className="mt-3 font-serif text-2xl font-bold text-primary sm:text-3xl">
              Why Our Tree Removal Stands Out
            </h2>
          </Reveal>
          <RevealGrid className="mt-6 max-w-2xl space-y-3" stagger={0.05}>
            {FEATURES.map((feat, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-sm leading-relaxed text-foreground">{feat}</span>
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      {/* Real reviews */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="space-y-6">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow icon={Star}>Client Reviews</Eyebrow>
              <h2 className="mt-3 font-serif text-2xl font-bold text-primary sm:text-3xl">
                What Glasgow Homeowners Say
              </h2>
            </div>
            <TestimonialCarousel />
          </Reveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8">
          <Reveal className="flex items-center gap-3">
            <HelpCircle className="h-6 w-6 text-accent" />
            <h2 className="font-serif text-2xl font-bold text-primary">
              Frequently Asked Questions About Tree Removal in Glasgow
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqAccordion items={TREE_FAQS} />
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
        {/* Local areas */}
        <Reveal className="space-y-4">
          <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-primary">
            <MapPin className="h-5 w-5 text-accent" />
            <span>Local Tree Removal Areas Across Greater Glasgow</span>
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {SUBURBS.map((suburb) => (
              <Link
                key={suburb.slug}
                href={`/locations/${suburb.slug}`}
                className="flex items-center justify-between border border-border bg-background p-3 text-xs text-muted-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-md"
              >
                <span>{suburb.name} ({suburb.postcodePrefix})</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <Link
            href="/knowledge-base"
            className="group flex items-center justify-between border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
          >
            <span className="text-sm font-bold text-primary">
              Explore our full knowledge base of cost guides, technical guides, and maintenance advice.
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      <ServicesShowcase
        heading={
          <>
            Other Services
            <br />
            You Might Need
          </>
        }
        description="Beyond tree work, we handle every stage of your garden — explore our other BS7533-engineered services."
      />

      <Reveal>
        <LeafCtaBanner heading="Ready to Sort Out That Tree?" source="service-detail-tree-removal-glasgow" />
      </Reveal>
    </>
  )
}
