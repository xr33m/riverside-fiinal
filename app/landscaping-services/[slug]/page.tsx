import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  MapPin,
  Star,
  Award,
  FileCheck,
  Users,
  ClipboardList,
  BookOpen,
} from 'lucide-react'
import {
  SERVICES,
  SUBURBS,
  AVG_GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  getPortfolioForService,
  getArticlesForService,
  getRelatedServices,
  generateGraphSchema,
} from '@/lib/content'
import { SERVICE_ICONS } from '@/lib/service-icons'
import { Breadcrumbs, Eyebrow, DirectAnswer, SectionCard, SubCard } from '@/components/silo-ui'
import { Reveal, RevealGrid } from '@/components/reveal'
import { LeafCtaBanner } from '@/components/leaf-cta-banner'
import { TestimonialCarousel } from '@/components/testimonial-carousel'

interface PageProps {
  params: Promise<{ slug: string }>
}

const CREDENTIALS = [
  { icon: ShieldCheck, label: 'BS7533 Certified' },
  { icon: Award, label: "Marshall's Approved" },
  { icon: FileCheck, label: '10-Year Guarantee' },
  { icon: Users, label: 'Family-Run & Local' },
]

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) return {}

  return {
    title: service.titleTag,
    description: service.directAnswer3Sec,
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)

  if (!service) {
    notFound()
  }

  const Icon = SERVICE_ICONS[service.slug] ?? ShieldCheck
  const portfolioMatches = getPortfolioForService(service.slug)
  const articleMatches = getArticlesForService(service.slug)
  const relatedServices = getRelatedServices(service.slug)

  const schema = generateGraphSchema(
    `https://riverside-landscaping.co.uk/landscaping-services/${service.slug}`,
    service.faqs
  )

  const processSteps = [
    {
      n: 1,
      title: 'Free Site Survey & Written Estimate',
      body: `Every ${service.primaryCategory.toLowerCase()} project starts with a senior engineer visiting site to measure levels, access, and drainage falls — you get a written estimate based on your materials and labour before anything is booked, not a rough guess.`,
      image: null,
    },
    {
      n: 2,
      title: 'Groundworks Engineered for Your Site',
      body: service.soilContext,
      image: '/images/garden-before.png',
      alt: 'Example of Riverside Landscaping groundworks and sub-base excavation ahead of installation',
    },
    {
      n: 3,
      title: 'Installation & Structural Handover',
      body: `${service.bsStandard} Every build is handed over with a signed structural guarantee, not a verbal promise.`,
      image: '/images/garden-after.png',
      alt: 'Example of a completed, handed-over Riverside Landscaping installation',
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
            { label: service.name },
          ]}
        />
      </div>

      {/* Hero */}
      <Reveal>
        <section className="relative mt-8 h-[380px] w-full overflow-hidden sm:h-[440px]">
          <img
            src="/images/garden-after.png"
            alt={`Riverside Landscaping ${service.primaryCategory.toLowerCase()} project in Glasgow`}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
          <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-10 sm:px-6 lg:px-8">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80">
              <Icon className="h-3.5 w-3.5" /> Service Detail
            </span>
            <h1 className="mt-3 max-w-3xl text-white">{service.h1Title}</h1>
          </div>
        </section>
      </Reveal>

      <div className="mx-auto max-w-6xl space-y-16 px-4 pb-20 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        {/* Intro / pain point + trust row */}
        <Reveal className="max-w-3xl space-y-5">
          <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl">{service.h2PainPoint}</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">{service.directAnswer3Sec}</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-5">
            <span className="flex items-center gap-1.5 text-sm font-bold text-primary">
              <Star className="h-4 w-4 fill-current text-accent" />
              {AVG_GOOGLE_RATING}★ from {GOOGLE_REVIEW_COUNT}+ reviews
            </span>
            {CREDENTIALS.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                <c.icon className="h-3.5 w-3.5 text-accent" />
                {c.label}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <DirectAnswer>{service.bsStandard}</DirectAnswer>
        </Reveal>

        {/* Technical subtopics */}
        <div className="space-y-10">
          <Reveal>
            <SectionCard>
              <h2 className="font-serif text-2xl font-bold text-primary">{service.h2Secondary1}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{service.soilContext}</p>
              <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
                <SubCard title="Geotextile Membrane & MOT Type 1 Sub-Base Prep">
                  Prevents heavy boulder clay from migrating into aggregate layers during heavy winter rainfall.
                </SubCard>
                <SubCard title="Scottish Whinstone & Frost-Proof Materials">
                  High-density basalt edging and frost-proof bonding for maximum durability in Scottish weather.
                </SubCard>
              </div>
            </SectionCard>
          </Reveal>

          <Reveal>
            <SectionCard>
              <h2 className="font-serif text-2xl font-bold text-primary">{service.h2Secondary2}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{service.bsStandard}</p>
            </SectionCard>
          </Reveal>
        </div>

        {/* Process */}
        <div className="space-y-10">
          <Reveal className="mx-auto max-w-2xl space-y-3 text-center">
            <Eyebrow icon={ClipboardList}>Our Process</Eyebrow>
            <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
              How We Build Your {service.primaryCategory}
            </h2>
          </Reveal>

          <div className="space-y-12">
            {processSteps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.08}>
                <div
                  className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 ${
                    step.image && i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  {step.image ? (
                    <div className="h-56 overflow-hidden border border-border sm:h-72">
                      <img src={step.image} alt={step.alt} className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <div className="flex h-56 items-center justify-center border border-dashed border-accent/40 bg-accent/5 sm:h-72">
                      <ClipboardList className="h-12 w-12 text-accent/50" />
                    </div>
                  )}
                  <div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                      {step.n}
                    </span>
                    <h3 className="mt-4 font-serif text-xl font-bold text-primary">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Technical Specification checklist */}
        <Reveal>
          <SectionCard>
            <h3 className="font-serif text-xl font-bold text-primary">Technical Specification &amp; Build Guarantee</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {service.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-3 border border-border bg-secondary/40 p-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm text-foreground">{feat}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </Reveal>

        {/* Real proof: matching portfolio case studies, or a link out to the hub */}
        <div className="space-y-6">
          <Reveal className="space-y-2">
            <Eyebrow icon={ShieldCheck}>Proof, Not Promises</Eyebrow>
            <h2 className="font-serif text-2xl font-bold text-primary sm:text-3xl">
              {portfolioMatches.length > 0 ? `Recent ${service.primaryCategory} Work` : 'See Our Completed Work'}
            </h2>
          </Reveal>

          {portfolioMatches.length > 0 ? (
            <RevealGrid className="grid grid-cols-1 gap-6 sm:grid-cols-2" stagger={0.08}>
              {portfolioMatches.map((item) => (
                <Link
                  key={item.id}
                  href={`/portfolio/${item.slug}`}
                  className="group block border border-border bg-background transition-colors duration-300 hover:border-accent"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.imageAfter}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3 bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                      {item.area} ({item.postcode})
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-bold text-primary transition-colors group-hover:text-accent">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">{item.description}</p>
                    <span className="mt-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-primary">
                      View Case Study <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </RevealGrid>
          ) : (
            <Reveal>
              <Link
                href="/portfolio"
                className="group flex items-center justify-between border border-border bg-secondary/40 p-6 transition-colors hover:border-accent"
              >
                <span className="text-sm font-bold text-primary">
                  Browse our full portfolio of completed Riverside Landscaping projects across Greater Glasgow.
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          )}
        </div>

        {/* Real reviews */}
        <Reveal className="space-y-6">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow icon={Star}>Client Reviews</Eyebrow>
            <h2 className="mt-3 font-serif text-2xl font-bold text-primary sm:text-3xl">
              What Glasgow Homeowners Say
            </h2>
          </div>
          <TestimonialCarousel />
        </Reveal>

        {/* FAQs */}
        <Reveal>
          <SectionCard className="space-y-6">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-6 w-6 text-accent" />
              <h2 className="font-serif text-2xl font-bold text-primary">
                Frequently Asked Questions About {service.primaryCategory} in Glasgow
              </h2>
            </div>
            <div className="space-y-4">
              {service.faqs.map((faq, i) => (
                <div key={i} className="space-y-2 border border-border bg-secondary/40 p-5">
                  <h3 className="text-base font-semibold text-primary">{faq.question}</h3>
                  <p className="border-l-2 border-accent/50 py-0.5 pl-3 text-sm text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>
        </Reveal>

        {/* Related guides */}
        <div className="space-y-6">
          <Reveal className="space-y-2">
            <Eyebrow icon={BookOpen}>Learn More</Eyebrow>
            <h2 className="font-serif text-2xl font-bold text-primary sm:text-3xl">
              {articleMatches.length > 0 ? `In-Depth Guides on ${service.primaryCategory}` : 'From Our Knowledge Base'}
            </h2>
          </Reveal>

          {articleMatches.length > 0 ? (
            <RevealGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.08}>
              {articleMatches.map((article) => (
                <Link
                  key={article.slug}
                  href={`/knowledge-base/${article.slug}`}
                  className="group block border border-border bg-background p-5 transition-colors hover:border-accent"
                >
                  <span className="text-xs font-bold uppercase tracking-wide text-accent">{article.category}</span>
                  <h3 className="mt-1 font-serif text-base font-bold text-primary transition-colors group-hover:text-accent">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">{article.summary}</p>
                </Link>
              ))}
            </RevealGrid>
          ) : (
            <Reveal>
              <Link
                href="/knowledge-base"
                className="group flex items-center justify-between border border-border bg-secondary/40 p-6 transition-colors hover:border-accent"
              >
                <span className="text-sm font-bold text-primary">
                  Explore our full knowledge base of cost guides, technical guides, and maintenance advice.
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          )}
        </div>

        {/* Related services */}
        {relatedServices.length > 0 && (
          <Reveal className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-primary">Other Services You Might Need</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {relatedServices.map((related) => {
                const RelatedIcon = SERVICE_ICONS[related.slug] ?? ShieldCheck
                return (
                  <Link
                    key={related.slug}
                    href={`/landscaping-services/${related.slug}`}
                    className="group flex items-center gap-3 border border-border bg-background p-4 transition-colors hover:border-accent"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent/10 text-accent">
                      <RelatedIcon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1 text-sm font-bold text-primary">{related.primaryCategory}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                  </Link>
                )
              })}
            </div>
          </Reveal>
        )}

        {/* Local areas */}
        <Reveal className="space-y-4">
          <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-primary">
            <MapPin className="h-5 w-5 text-accent" />
            <span>Local Installation Areas Across Greater Glasgow</span>
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {SUBURBS.map((suburb) => (
              <Link
                key={suburb.slug}
                href={`/locations/${suburb.slug}`}
                className="flex items-center justify-between border border-border bg-background p-3 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <span>{suburb.name} ({suburb.postcodePrefix})</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal>
        <LeafCtaBanner
          heading={`Ready to Start Your ${service.primaryCategory} Project?`}
          source={`service-detail-${service.slug}`}
        />
      </Reveal>
    </>
  )
}
