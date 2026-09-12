'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Droplets,
  MapPin,
  ShieldCheck,
  Star,
  Wrench,
  X,
  Zap,
} from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import {
  faqs,
  MATERIALS,
  PORTFOLIO_ITEMS,
  SUBURBS,
  TESTIMONIALS,
  AVG_GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  MaterialSwatch,
  PortfolioItem,
} from '@/lib/content'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SurveyDialog } from '@/components/survey-dialog'
import { Reveal, RevealGrid } from '@/components/reveal'
import { AnimatedNumber } from '@/components/animated-number'
import TestimonialMarquee from '@/components/ui/marquee-01'
import { GlasgowWeatherBanner } from '@/components/ux/GlasgowWeatherBanner'
import { CostEstimator } from '@/components/ux/CostEstimator'
import { LocalProjectMap } from '@/components/ux/LocalProjectMap'
import { ServicesShowcase } from '@/components/services-showcase'
import { ProcessShowcase } from '@/components/process-showcase'

/* ------------------------------------------------------------------ *
 * Hero Section — full-bleed parallax video, minimal overlaid content
 * ------------------------------------------------------------------ */
function Hero({ onSurvey }: { onSurvey: (source: string) => void }) {
  const reduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLDivElement>(null)
  const avgRating = AVG_GOOGLE_RATING

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Scroll Parallax Transforms — background drifts and scales slower than the page scrolls
  const yMedia = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '18%'])
  const scaleMedia = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.15])
  const yContent = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '20%'])
  const opacityContent = useTransform(scrollYProgress, [0, 0.7], [1, reduceMotion ? 1 : 0])

  return (
    <section ref={heroRef} id="top" className="hero-full">
      <motion.div style={{ y: yMedia, scale: scaleMedia }} className="hero-full-media">
        <video autoPlay loop muted playsInline poster="/images/garden-after.png">
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <div className="hero-full-scrim" />

      <motion.div style={{ y: yContent, opacity: opacityContent }} className="hero-full-content">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
          <Zap size={14} className="text-accent" /> <span>Winter Installation Schedule: 3 Slots Remaining for G61 / G77</span>
        </div>
        <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>Glasgow · Bearsden · Newton Mearns · Giffnock</p>
        <h1>Bespoke patios &amp; landscaping <em>engineered</em> for Glasgow weather.</h1>
        <p className="hero-sub">
          Eliminate waterlogged lawns with BS7533-compliant deep sub-base drainage. Installed year-round across Greater Glasgow with a 10-year structural guarantee.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <button onClick={() => onSurvey('hero')} className="button-clay">
            Get your free site survey &amp; estimate <ArrowRight size={17} />
          </button>
          <div className="google-badge">
            <svg viewBox="0 0 24 24" className="size-6 shrink-0" aria-hidden="true">
              <path fill="#4285F4" d="M21.35 12.27c0-.72-.06-1.42-.18-2.09H12v3.95h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.25Z" />
              <path fill="#34A853" d="M12 21.7c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.7Z" />
              <path fill="#FBBC05" d="M6.54 13.78A5.85 5.85 0 0 1 6.23 12c0-.62.11-1.22.31-1.78V7.69H3.3A9.74 9.74 0 0 0 2.26 12c0 1.56.37 3.03 1.04 4.31l3.24-2.53Z" />
              <path fill="#EA4335" d="M12 6.19c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.27 14.63 2.3 12 2.3a9.74 9.74 0 0 0-8.7 5.39l3.24 2.53C7.31 7.91 9.46 6.19 12 6.19Z" />
            </svg>
            <span className="google-badge-stars" aria-hidden="true">
              {[...Array(5)].map((_, i) => <Star size={14} key={i} fill="currentColor" strokeWidth={1.5} />)}
            </span>
            <span className="text-sm font-bold text-white">{avgRating} · {TESTIMONIALS.length} Google Reviews</span>
          </div>
        </div>

        <p className="microcopy">
          No pushy sales <span>·</span> Guaranteed start date <span>·</span> Valid 12 months
        </p>
      </motion.div>

      <a href="#proof" className="hero-scroll-cue">
        See the proof
        <ChevronDown size={18} />
      </a>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * About Section (Trust & Credibility, sits directly under the Hero)
 * ------------------------------------------------------------------ */
const ABOUT_STATS: { value: number; suffix: string; label: string }[] = [
  { value: AVG_GOOGLE_RATING, suffix: '★', label: 'Google Rating' },
  { value: GOOGLE_REVIEW_COUNT, suffix: '+', label: 'Verified Reviews' },
  { value: 10, suffix: '-Year', label: 'Structural Guarantee' },
  { value: 100, suffix: '%', label: 'Sub-Surface Water Mitigation' },
]

function AboutSection() {
  return (
    <section id="about" className="section about-section border-t border-border">
      <div className="grid gap-14 md:grid-cols-12 md:items-center">
        <Reveal className="md:col-span-5">
          <p className="eyebrow text-accent">About Us</p>
          <h2 className="mt-2 font-serif text-3xl text-primary sm:text-4xl">
            Family-run, engineered like a business built to last.
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Riverside Landscaping is a Glasgow-based hardscaping team led by Leon and a small crew of dedicated
            tradesmen. We don&apos;t treat drainage as an afterthought or paving as a weekend job.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Every build is engineered to BS7533 standard, sized for Scottish clay and rainfall, and backed by a
            signed 10-year structural guarantee — not a verbal promise.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {['BS7533 Certified', "Marshall's Approved Installer"].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-bold text-accent"
              >
                <Award size={13} /> {badge}
              </span>
            ))}
          </div>
          <Link href="/about" className="button-clay mt-7 inline-flex w-fit rounded-full text-sm">
            More About Us <ArrowRight size={16} />
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-7">
          <div className="relative mx-auto max-w-[540px] pb-8 pr-8 sm:pb-10 sm:pr-10">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border shadow-xl">
              <img
                src="/images/garden-after.png"
                alt="Completed Riverside Landscaping porcelain patio installation"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-[52%] rotate-3 overflow-hidden rounded-2xl border-4 border-background shadow-2xl transition-transform duration-300 hover:rotate-0">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src="/images/garden-before.png"
                  alt="The same garden before Riverside Landscaping's drainage and patio install"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -top-4 left-4 flex items-center gap-2 rounded-full border border-accent bg-background px-3.5 py-2 text-xs font-bold text-primary shadow-lg sm:-top-5">
              <ShieldCheck size={14} className="text-accent" /> 10-Year Guarantee
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-border pt-10 sm:mt-20 sm:grid-cols-4">
        {ABOUT_STATS.map((stat) => (
          <div key={stat.label}>
            <p className="font-serif text-3xl font-bold text-primary sm:text-4xl">
              <AnimatedNumber value={stat.value} />
              <span className="text-accent">{stat.suffix}</span>
            </p>
            <p className="mt-1.5 text-xs leading-snug text-muted-foreground sm:text-sm">{stat.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * Proof Section (Before / After Comparison Drag Slider)
 * ------------------------------------------------------------------ */
function Proof() {
  const [pos, setPos] = useState(51)
  const ref = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const yCompare = useTransform(scrollYProgress, [0, 1], [reduceMotion ? '0%' : '6%', reduceMotion ? '0%' : '-6%'])

  const setFromClientX = (clientX: number) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    setPos(Math.max(3, Math.min(97, ((clientX - r.left) / r.width) * 100)))
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setPos((p) => Math.max(3, p - 4))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      setPos((p) => Math.min(97, p + 4))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setPos(3)
    } else if (e.key === 'End') {
      e.preventDefault()
      setPos(97)
    }
  }

  return (
    <section ref={sectionRef} id="proof" className="section proof-section">
      <Reveal className="section-intro">
        <p className="eyebrow">Proof, not promises</p>
        <h2>
          Turn the wettest corner<br />
          <em>into the best one.</em>
        </h2>
        <p>
          Drainage is not an afterthought. It&apos;s the part of the build you never see — and the reason your patio still works after weeks of heavy Scottish rainfall.
        </p>
      </Reveal>

      <motion.div style={{ y: yCompare }}>
        <div
          ref={ref}
          onPointerMove={(e) => {
            if (e.buttons === 1 || e.pointerType === 'mouse') setFromClientX(e.clientX)
          }}
          onPointerDown={(e) => setFromClientX(e.clientX)}
          onKeyDown={onKeyDown}
          className="compare"
          role="slider"
          tabIndex={0}
          aria-label="Before and after garden comparison. Use left and right arrow keys to reveal."
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% before image shown`}
        >
          <img src="/images/garden-after.png" alt="Finished porcelain patio with perimeter drainage" />
          <div className="compare-before" style={{ width: `${pos}%` }}>
            <img src="/images/garden-before.png" alt="Waterlogged clay garden before landscaping" />
          </div>
          <div className="compare-handle" style={{ left: `${pos}%` }}>
            <span>Drag</span>
            <div />
          </div>
          <span className="compare-label before">Before</span>
          <span className="compare-label after">After</span>
          <div className="metric">
            <Droplets size={18} />
            <strong>100%</strong>
            <span>sub-surface water mitigation</span>
          </div>
        </div>
      </motion.div>
      <p className="slider-note">Drag, or focus the image and use ← → keys to reveal</p>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * Reusable Scroll Parallax Wrapper (alternating drift per card)
 * ------------------------------------------------------------------ */
function ParallaxCard({ children, strength = 24 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [strength, -strength])

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ *
 * Portfolio Showcase Component with Modal Detail View
 * ------------------------------------------------------------------ */
function PortfolioShowcase({ onSurvey }: { onSurvey: (source: string) => void }) {
  const [activeTab, setActiveTab] = useState<'all' | 'porcelain' | 'drainage'>('all')
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)

  const filtered = PORTFOLIO_ITEMS.filter((item) =>
    activeTab === 'all' ? true : item.category === activeTab,
  )

  return (
    <section id="portfolio" className="section portfolio-section border-t border-border">
      <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow text-accent">Recent Glasgow Builds</p>
          <h2 className="font-serif text-4xl text-primary sm:text-5xl">Architectural Gallery</h2>
          <p className="mt-2 max-w-lg text-muted-foreground">
            Explore completed installations across Bearsden, Newton Mearns, Clarkston &amp; Giffnock.
          </p>
        </div>
        <div className="flex gap-2">
          {(['all', 'porcelain', 'drainage'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-bold uppercase transition-all ${
                activeTab === tab ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-border'
              }`}
            >
              {tab === 'all' ? 'All Projects' : tab === 'porcelain' ? 'Porcelain Patios' : 'Clay Drainage'}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {filtered.map((item, i) => (
          <ParallaxCard key={item.id} strength={i % 2 === 0 ? 22 : -22}>
            <article
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer border border-border bg-background p-4 shadow-sm transition-all hover:border-accent hover:shadow-md"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.imageAfter}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 rounded bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  {item.area} ({item.postcode})
                </div>
                <div className="absolute bottom-3 right-3 rounded bg-accent px-3 py-1 text-xs font-bold text-white shadow">
                  {item.metric}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-serif text-xl font-bold text-primary group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.specs.slice(0, 3).map((spec) => (
                    <span key={spec} className="rounded bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
                      ✓ {spec}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </ParallaxCard>
        ))}
      </div>

      <Reveal className="flex justify-center">
        <Link href="/portfolio" className="button-outline text-sm">
          View Full Portfolio <ArrowRight size={16} />
        </Link>
      </Reveal>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/70 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-background p-6 shadow-2xl sm:p-8">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted"
            >
              <X size={20} />
            </button>
            <span className="eyebrow text-accent">{selectedItem.area} ({selectedItem.postcode}) Project</span>
            <h2 className="mt-1 font-serif text-3xl text-primary">{selectedItem.title}</h2>
            <img src={selectedItem.imageAfter} alt={selectedItem.title} className="mt-4 h-72 w-full object-cover rounded" />
            <p className="mt-4 text-muted-foreground">{selectedItem.description}</p>
            <div className="mt-4">
              <p className="font-bold text-foreground">Key Technical Specifications:</p>
              <ul className="mt-2 grid gap-1 text-sm text-muted-foreground">
                {selectedItem.specs.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <Check size={14} className="text-accent" /> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex justify-between items-center border-t border-border pt-4">
              <span className="text-xs text-muted-foreground font-bold uppercase">{selectedItem.metric}</span>
              <button
                onClick={() => {
                  setSelectedItem(null)
                  onSurvey(`portfolio-${selectedItem.id}`)
                }}
                className="button-clay text-xs"
              >
                Request Similar Build <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * Process Component (The Riverside Method 4-Step Engineering Timeline)
 * ------------------------------------------------------------------ */
function Process() {
  return (
    <ProcessShowcase
      eyebrow="The Riverside Method"
      heading={
        <>
          Our Simple <em>3-Step</em> Process
        </>
      }
      description="No complicated process, no surprises. Here's exactly what happens when you contact us."
      ctaLabel="Book Free Survey"
      ctaSource="process-section"
      steps={[
        {
          icon: ClipboardList,
          title: 'Free Site Survey & Estimate',
          body: 'We visit your garden, laser-level the site, check drainage falls, and give you a written estimate based on your materials and labour — completely free.',
        },
        {
          icon: Wrench,
          title: 'Engineered Groundworks',
          body: 'We excavate 250mm–300mm deep, isolate the clay with geotextile membrane, and build a compacted BS7533 MOT Type 1 sub-base with integrated slot drainage.',
        },
        {
          icon: ShieldCheck,
          title: 'Installation & 10-Year Handover',
          body: 'Porcelain laid on full wet mortar beds, jointed with weatherproof resin grout, and handed over with a signed 10-year structural guarantee.',
        },
      ]}
    />
  )
}

/* ------------------------------------------------------------------ *
 * Material Swatch Selector Component
 * ------------------------------------------------------------------ */
function MaterialSelector() {
  const [selected, setSelected] = useState<MaterialSwatch>(MATERIALS[0])

  return (
    <section id="materials" className="section materials-section border-t border-border">
      <Reveal className="section-intro">
        <p className="eyebrow text-accent">Architectural Materials</p>
        <h2>
          Vitrified Porcelain &amp;<br />
          <em>Scottish Whinstone.</em>
        </h2>
        <p>
          We source high-density vitrified porcelain from Bologna &amp; Modena, paired with local Scottish Whinstone borders engineered for frost-proof durability.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 grid gap-8 md:grid-cols-12">
        <div className="grid gap-3 md:col-span-5">
          {MATERIALS.map((mat) => (
            <button
              key={mat.id}
              onClick={() => setSelected(mat)}
              className={`flex items-center justify-between border p-4 text-left transition-all ${
                selected.id === mat.id
                  ? 'border-accent bg-accent/5 shadow-sm'
                  : 'border-border bg-background hover:border-primary/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="size-6 rounded-full border border-black/20" style={{ backgroundColor: mat.colorHex }} />
                <div>
                  <p className="font-bold text-primary">{mat.name}</p>
                  <p className="text-xs text-muted-foreground">{mat.origin}</p>
                </div>
              </div>
              <ChevronRight size={16} className={selected.id === mat.id ? 'text-accent' : 'text-muted-foreground'} />
            </button>
          ))}
        </div>

        <div className="border border-border bg-background p-6 shadow-sm md:col-span-7 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <p className="eyebrow text-accent">{selected.origin}</p>
                <h3 className="font-serif text-2xl text-primary mt-1">{selected.name}</h3>
              </div>
              <span className="rounded bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                {selected.slipRating}
              </span>
            </div>
            <p className="mt-4 text-muted-foreground leading-relaxed">{selected.description}</p>
          </div>

          <div className="mt-8 border-t border-border pt-6 grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-muted-foreground block">Frost Resistance</span>
              <strong className="text-primary font-bold">{selected.frostProof ? '100% Frost Proof (<0.05% absorption)' : 'Standard'}</strong>
            </div>
            <div>
              <span className="text-muted-foreground block">Maintenance</span>
              <strong className="text-primary font-bold">Zero Sealant Required · Pressure Washable</strong>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * Dedicated Testimonials Showcase Grid
 * ------------------------------------------------------------------ */
function TestimonialsShowcase() {
  return (
    <section id="testimonials" className="section testimonials-section border-t border-border bg-background">
      <Reveal className="section-intro">
        <p className="eyebrow">Client Verification</p>
        <h2>
          Trusted by homeowners<br />
          <em>across Greater Glasgow.</em>
        </h2>
        <div className="mt-4 flex items-center gap-2" aria-label="Google rating: 5 out of 5 stars">
          <svg viewBox="0 0 24 24" className="size-6 shrink-0" aria-hidden="true">
            <path fill="#4285F4" d="M21.35 12.27c0-.72-.06-1.42-.18-2.09H12v3.95h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.25Z" />
            <path fill="#34A853" d="M12 21.7c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.7Z" />
            <path fill="#FBBC05" d="M6.54 13.78A5.85 5.85 0 0 1 6.23 12c0-.62.11-1.22.31-1.78V7.69H3.3A9.74 9.74 0 0 0 2.26 12c0 1.56.37 3.03 1.04 4.31l3.24-2.53Z" />
            <path fill="#EA4335" d="M12 6.19c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.27 14.63 2.3 12 2.3a9.74 9.74 0 0 0-8.7 5.39l3.24 2.53C7.31 7.91 9.46 6.19 12 6.19Z" />
          </svg>
          <span className="flex gap-0.5 text-[#fbbc04]" aria-hidden="true">
            {[...Array(5)].map((_, i) => <Star size={16} key={i} fill="currentColor" strokeWidth={1.5} />)}
          </span>
          <span className="text-xs font-bold text-muted-foreground">5.0 · Verified Google Reviews</span>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <TestimonialMarquee />
      </Reveal>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * Interactive Suburb Postcode Coverage Checker Widget
 * ------------------------------------------------------------------ */
function CoverageChecker({ onSurvey }: { onSurvey: (source: string) => void }) {
  const [input, setInput] = useState('')
  const matched = SUBURBS.find((s) => s.postcodePrefix === input.trim().toUpperCase() || s.name.toLowerCase() === input.trim().toLowerCase())

  return (
    <section id="coverage" className="section coverage-section border-t border-border">
      <div className="grid gap-8 md:grid-cols-12 items-center">
        <Reveal className="md:col-span-6">
          <p className="eyebrow text-accent">Service Area Validator</p>
          <h2 className="font-serif text-3xl text-primary sm:text-4xl">Do we cover your postcode?</h2>
          <p className="mt-3 text-muted-foreground">
            Enter your Glasgow outward postcode prefix (e.g. G61, G77, G76, G46, G62) to verify priority installation team coverage.
          </p>

          <div className="mt-6 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value.toUpperCase())}
              placeholder="e.g. G61 or Bearsden"
              className="field max-w-xs uppercase"
            />
            <button onClick={() => onSurvey('coverage-widget')} className="button-clay text-xs">
              Check Coverage
            </button>
          </div>

          {matched && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 border border-accent bg-accent/5 p-4 rounded">
              <p className="font-bold text-primary flex items-center gap-2">
                <MapPin size={16} className="text-accent" /> Priority Coverage Confirmed: {matched.name} ({matched.postcodePrefix})
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Soil Profile: {matched.soilProfile} · Council: {matched.council}</p>
              <p className="mt-2 text-xs text-foreground">Highlight Fix: {matched.highlightInstall}</p>
              <Link
                href={`/locations/${matched.slug}`}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-primary"
              >
                View {matched.name} coverage details <ArrowRight size={13} />
              </Link>
            </motion.div>
          )}
        </Reveal>

        <RevealGrid className="md:col-span-6 grid grid-cols-2 gap-3" stagger={0.04}>
          {SUBURBS.map((s) => (
            <Link
              key={s.slug}
              href={`/locations/${s.slug}`}
              onMouseEnter={() => setInput(s.postcodePrefix)}
              className={`group block w-full border p-4 text-left transition-all ${
                input === s.postcodePrefix ? 'border-accent bg-accent/10' : 'border-border bg-background hover:border-primary'
              }`}
            >
              <p className="font-bold text-primary">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.postcodePrefix} · {s.council}</p>
              <span className="mt-2 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-accent opacity-0 transition-opacity group-hover:opacity-100">
                View area <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </RevealGrid>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * FAQ Accordion Component
 * ------------------------------------------------------------------ */
function FAQ() {
  const [open, setOpen] = useState(0)
  const reduceMotion = useReducedMotion()

  return (
    <section id="faq" className="section faq-section">
      <Reveal className="faq-heading">
        <p className="eyebrow">Straight answers</p>
        <h2>
          Good questions deserve<br />
          <em>proper answers.</em>
        </h2>
      </Reveal>
      <Reveal delay={0.1} className="faq-list">
        {faqs.map(([q, a], i) => (
          <div className="faq-item" key={q}>
            <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              <span>{q}</span>
              <ChevronDown className={open === i ? 'rotate-180 text-accent' : ''} size={20} />
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  className="faq-answer"
                >
                  <p>{a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * Main Landing Page Component Export
 * ------------------------------------------------------------------ */
export default function LandingPage() {
  const [survey, setSurvey] = useState(false)
  const [sticky, setSticky] = useState(false)
  const reduceMotion = useReducedMotion()

  const openSurvey = useMemo(
    () => (source: string) => {
      trackEvent('cta_click', { source })
      trackEvent('survey_open', { source })
      setSurvey(true)
    },
    [],
  )

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > window.innerHeight * 0.75)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <GlasgowWeatherBanner variant="ticker" />
      <SiteHeader onSurvey={openSurvey} overlay />
      <main className="home-main">
        <Hero onSurvey={openSurvey} />
        <Proof />

        <AboutSection />

        <ServicesShowcase />

        <section className="offseason">
          <ParallaxCard strength={16}>
            <div>
              <p className="eyebrow text-primary-foreground/85">Winter Bookings Open · Guaranteed Start Dates</p>
              <h2>Beat the 12-week spring backlog.</h2>
              <p>Lock in current material prices and book winter hardscaping while installation calendars remain clear.</p>
            </div>
          </ParallaxCard>
          <ParallaxCard strength={-16}>
            <button onClick={() => openSurvey('banner')} className="button-light">
              Reserve your survey <ArrowRight size={17} />
            </button>
          </ParallaxCard>
        </section>

        <PortfolioShowcase onSurvey={openSurvey} />
        <Process />
        <MaterialSelector />
        <TestimonialsShowcase />
        <CoverageChecker onSurvey={openSurvey} />

        <div className="section border-t border-border">
          <CostEstimator />
        </div>

        <div className="section border-t border-border">
          <LocalProjectMap />
        </div>

        <FAQ />
      </main>

      <SiteFooter />

      <AnimatePresence>
        {sticky && !survey && (
          <motion.div
            initial={reduceMotion ? false : { y: 100 }}
            animate={{ y: 0 }}
            exit={reduceMotion ? undefined : { y: 100 }}
            className="sticky-cta"
          >
            <span>
              <b>Ready to eliminate waterlogged lawns?</b>
              <small>Free estimate, valid 12 months, zero pressure.</small>
            </span>
            <button onClick={() => openSurvey('sticky')} className="button-clay">
              Get Started <ArrowRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <SurveyDialog open={survey} onClose={() => setSurvey(false)} />
    </>
  )
}
