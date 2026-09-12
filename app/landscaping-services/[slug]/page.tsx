import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  MapPin,
  Star,
  Award,
  FileCheck,
  Users,
  ClipboardList,
  Wrench,
  BookOpen,
  Images,
  Sparkles,
} from 'lucide-react'
import {
  SERVICES,
  SUBURBS,
  AVG_GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  getPortfolioForService,
  getArticlesForService,
  generateGraphSchema,
  type PortfolioItem,
} from '@/lib/content'
import { SERVICE_ICONS } from '@/lib/service-icons'
import { Breadcrumbs, Eyebrow, DirectAnswer, SubCard } from '@/components/silo-ui'
import { Reveal, RevealGrid } from '@/components/reveal'
import { LeafCtaBanner } from '@/components/leaf-cta-banner'
import { TestimonialCarousel } from '@/components/testimonial-carousel'
import { FaqAccordion } from '@/components/faq-accordion'
import { ServicesShowcase } from '@/components/services-showcase'
import { ProcessShowcase, type ProcessStep } from '@/components/process-showcase'

interface PageProps {
  params: Promise<{ slug: string }>
}

const CREDENTIALS = [
  { icon: ShieldCheck, label: 'BS7533 Certified' },
  { icon: Award, label: "Marshall's Approved" },
  { icon: FileCheck, label: '10-Year Guarantee' },
  { icon: Users, label: 'Family-Run & Local' },
]

// Soft blurred colour blobs used to break up flat white/tinted bands —
// purely decorative, brand-colour, low-opacity.
function DecorBlob({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`pointer-events-none absolute rounded-full blur-3xl ${className}`} />
}

interface GalleryImage {
  src: string
  alt: string
  position: string
}

// Real matched portfolio photos first (when this service has completed
// case studies), padded out with honestly-captioned crops of the same 2-3
// general project photos used elsewhere on the site — never fabricated or
// mislabelled as service-specific when they aren't.
function buildGalleryImages(portfolioMatches: PortfolioItem[]): GalleryImage[] {
  const images: GalleryImage[] = []
  for (const item of portfolioMatches) {
    if (item.imageBefore) images.push({ src: item.imageBefore, alt: `${item.title} — before`, position: 'object-center' })
    images.push({ src: item.imageAfter, alt: item.title, position: 'object-center' })
  }
  const fallbacks: GalleryImage[] = [
    { src: '/images/garden-after.webp', alt: 'Riverside Landscaping completed installation example', position: 'object-top' },
    { src: '/images/garden-before.webp', alt: 'Riverside Landscaping groundworks example', position: 'object-bottom' },
    { src: '/images/materials/mat-1-1.jpg', alt: 'Riverside Landscaping material sample', position: 'object-center' },
    { src: '/images/garden-after.webp', alt: 'Riverside Landscaping finished detail example', position: 'object-left' },
    { src: '/images/garden-before.webp', alt: 'Riverside Landscaping site preparation example', position: 'object-right' },
  ]
  let i = 0
  while (images.length < 5) {
    images.push(fallbacks[i % fallbacks.length])
    i++
  }
  return images.slice(0, 5)
}

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
  const galleryImages = buildGalleryImages(portfolioMatches)
  const whyUsPhotoA = portfolioMatches[0]?.imageAfter ?? '/images/garden-after.webp'
  const whyUsPhotoB = portfolioMatches[0]?.imageBefore ?? '/images/garden-before.webp'

  const schema = generateGraphSchema(
    `https://riverside-landscaping.co.uk/landscaping-services/${service.slug}`,
    service.faqs
  )

  const processSteps: [ProcessStep, ProcessStep, ProcessStep] = [
    {
      icon: ClipboardList,
      title: 'Free Site Survey & Written Estimate',
      body: `Every ${service.primaryCategory.toLowerCase()} project starts with a senior engineer visiting site to measure levels, access, and drainage falls — you get a written estimate based on your materials and labour before anything is booked, not a rough guess.`,
    },
    {
      icon: Wrench,
      title: 'Groundworks Engineered for Your Site',
      body: service.soilContext,
    },
    {
      icon: ShieldCheck,
      title: 'Installation & Structural Handover',
      body: `${service.bsStandard} Every build is handed over with a signed structural guarantee, not a verbal promise.`,
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
            src="/images/garden-after.webp"
            alt={`Riverside Landscaping ${service.primaryCategory.toLowerCase()} project in Glasgow`}
            className="absolute inset-0 h-full w-full scale-105 animate-[kenburns_16s_ease-in-out_infinite_alternate] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-transparent" />
          <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80">
              <Icon className="h-3.5 w-3.5" /> Service Detail
            </span>
            <h1 className="mt-3 max-w-3xl text-white">{service.h1Title}</h1>
          </div>
        </section>
      </Reveal>

      {/* Floating trust stat card, overlapping the hero/content seam */}
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
            {CREDENTIALS.slice(0, 3).map((c) => (
              <div key={c.label} className="text-center">
                <c.icon className="mx-auto h-6 w-6 text-accent" />
                <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{c.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Intro / pain point */}
      <section className="relative overflow-hidden bg-background pb-16 pt-14 sm:pt-16">
        <DecorBlob className="-right-24 -top-24 h-64 w-64 bg-accent/10" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl space-y-5">
            <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl">{service.h2PainPoint}</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">{service.directAnswer3Sec}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 max-w-3xl">
            <DirectAnswer>{service.bsStandard}</DirectAnswer>
          </Reveal>
        </div>
      </section>

      {/* Technical subtopics — tinted band */}
      <section className="relative overflow-hidden bg-secondary/40 py-16">
        <DecorBlob className="-left-32 top-1/2 h-72 w-72 -translate-y-1/2 bg-primary/5" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal className="space-y-4 border-t-4 border-accent bg-background p-7 shadow-md">
            <h2 className="font-serif text-2xl font-bold text-primary">{service.h2Secondary1}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{service.soilContext}</p>
            <div className="grid grid-cols-1 gap-4 pt-2">
              <SubCard title="Geotextile Membrane & MOT Type 1 Sub-Base Prep">
                Prevents heavy boulder clay from migrating into aggregate layers during heavy winter rainfall.
              </SubCard>
              <SubCard title="Scottish Whinstone & Frost-Proof Materials">
                High-density basalt edging and frost-proof bonding for maximum durability in Scottish weather.
              </SubCard>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="space-y-4 border-t-4 border-primary bg-background p-7 shadow-md">
            <h2 className="font-serif text-2xl font-bold text-primary">{service.h2Secondary2}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{service.bsStandard}</p>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <ProcessShowcase
        eyebrow="Our Process"
        heading={
          <>
            How We Build Your <em>{service.primaryCategory}</em>
          </>
        }
        description={`No complicated process, no surprises. Here's exactly what happens when you contact us about ${service.primaryCategory.toLowerCase()}.`}
        ctaLabel="Book Free Survey"
        ctaSource={`process-section-${service.slug}`}
        steps={processSteps}
      />

      {/* Gallery */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-xl space-y-2">
            <Eyebrow icon={Images}>Gallery</Eyebrow>
            <h2 className="font-serif text-2xl font-bold text-primary sm:text-3xl">
              Some Latest Shots From Our {service.primaryCategory} Service
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 space-y-4">
            <div className="h-64 overflow-hidden shadow-md sm:h-80">
              <img
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                loading="lazy"
                className={`h-full w-full object-cover ${galleryImages[0].position}`}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {galleryImages.slice(1).map((img, i) => (
                <div key={i} className="h-32 overflow-hidden shadow-sm sm:h-40">
                  <img src={img.src} alt={img.alt} loading="lazy" className={`h-full w-full object-cover ${img.position}`} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why us — overlapping photos + feature checklist */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal className="relative mx-auto h-80 w-full max-w-sm sm:h-96 lg:mx-0">
            <div className="absolute left-0 top-0 h-64 w-52 overflow-hidden rounded-2xl border border-border shadow-lg sm:h-72 sm:w-60">
              <img src={whyUsPhotoA} alt={`Riverside Landscaping ${service.primaryCategory.toLowerCase()} example`} className="h-full w-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 h-52 w-44 overflow-hidden rounded-2xl border-4 border-background shadow-xl sm:h-60 sm:w-52">
              <img src={whyUsPhotoB} alt={`Riverside Landscaping ${service.primaryCategory.toLowerCase()} groundworks example`} className="h-full w-full object-cover" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Eyebrow icon={Sparkles}>Why Us</Eyebrow>
            <h2 className="mt-3 font-serif text-2xl font-bold text-primary sm:text-3xl">
              Why Our {service.primaryCategory} Stands Out
            </h2>
            <RevealGrid className="mt-6 space-y-3" stagger={0.05}>
              {service.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="text-sm leading-relaxed text-foreground">{feat}</span>
                </div>
              ))}
            </RevealGrid>
          </Reveal>
        </div>
      </section>

      {/* Real proof — tinted band */}
      <section className="relative overflow-hidden bg-accent/5 py-16">
        <DecorBlob className="right-0 top-0 h-56 w-56 bg-accent/10" />
        <div className="relative mx-auto max-w-6xl space-y-6 px-4 sm:px-6 lg:px-8">
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
                  className="group block overflow-hidden border border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl"
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
                className="group flex items-center justify-between border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
              >
                <span className="text-sm font-bold text-primary">
                  Browse our full portfolio of completed Riverside Landscaping projects across Greater Glasgow.
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          )}
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

      {/* FAQs — tinted band, real accordion */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8">
          <Reveal className="flex items-center gap-3">
            <HelpCircle className="h-6 w-6 text-accent" />
            <h2 className="font-serif text-2xl font-bold text-primary">
              Frequently Asked Questions About {service.primaryCategory} in Glasgow
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqAccordion items={service.faqs} />
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
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
                  className="group block border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
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
                className="group flex items-center justify-between border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
              >
                <span className="text-sm font-bold text-primary">
                  Explore our full knowledge base of cost guides, technical guides, and maintenance advice.
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          )}
        </div>

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
                className="flex items-center justify-between border border-border bg-background p-3 text-xs text-muted-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-md"
              >
                <span>{suburb.name} ({suburb.postcodePrefix})</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </Reveal>
      </div>

      <ServicesShowcase
        excludeSlug={service.slug}
        heading={
          <>
            Other Services
            <br />
            You Might Need
          </>
        }
        description={`Beyond ${service.primaryCategory.toLowerCase()}, we handle every stage of your garden — explore our other BS7533-engineered services.`}
      />

      <Reveal>
        <LeafCtaBanner
          heading={`Ready to Start Your ${service.primaryCategory} Project?`}
          source={`service-detail-${service.slug}`}
        />
      </Reveal>
    </>
  )
}
