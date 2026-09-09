'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  ChevronRight,
  Calculator,
  Droplets,
  MapPin,
  Star,
  X,
  Zap,
} from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import {
  faqs,
  MATERIALS,
  PORTFOLIO_ITEMS,
  PROCESS_STEPS,
  SUBURBS,
  TESTIMONIALS,
  MaterialSwatch,
  PortfolioItem,
} from '@/lib/content'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SurveyDialog } from '@/components/survey-dialog'
import { Reveal, RevealGrid } from '@/components/reveal'
import TestimonialMarquee from '@/components/ui/marquee-01'

/* ------------------------------------------------------------------ *
 * Hero Section — full-bleed parallax video, minimal overlaid content
 * ------------------------------------------------------------------ */
function Hero({ onSurvey }: { onSurvey: (source: string) => void }) {
  const reduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLDivElement>(null)
  const avgRating = (TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / TESTIMONIALS.length).toFixed(1)

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
function AboutSection() {
  const avgRating = (TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / TESTIMONIALS.length).toFixed(1)

  return (
    <section id="about" className="section about-section border-t border-border">
      <div className="grid gap-10 md:grid-cols-12 md:items-start">
        <Reveal className="md:col-span-5">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-5xl font-bold text-primary">{avgRating}★</span>
            <span className="text-xs uppercase leading-snug tracking-wide text-muted-foreground">
              From {TESTIMONIALS.length} verified<br />Google reviews
            </span>
          </div>
          <p className="eyebrow mt-8 text-accent">About Us</p>
          <h2 className="mt-1 font-serif text-3xl text-primary sm:text-4xl">
            Family-run, engineered like a business built to last.
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Riverside Landscaping is a Glasgow-based hardscaping team led by Leon and a small crew of dedicated tradesmen. We don&apos;t treat drainage as an afterthought or paving as a weekend job — every build is engineered to BS7533 standard, sized for Scottish clay and rainfall, and backed by a signed 10-year structural guarantee.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {['BS7533 Certified', "Marshall's Approved Installer", '10-Year Guarantee'].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-bold text-accent"
              >
                <Award size={13} /> {badge}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-7">
          <div className="relative h-[320px] w-full overflow-hidden border border-border sm:h-[420px]">
            <img
              src="/images/garden-after.png"
              alt="Completed Riverside Landscaping porcelain patio installation"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="border border-border bg-secondary/40 p-6">
              <h3 className="font-serif text-lg font-bold text-primary">Built for Scottish Weather</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Every job is engineered around heavy clay soil and year-round rainfall, not a fair-weather install that fails by the second winter.
              </p>
            </div>
            <div className="flex flex-col justify-between bg-primary p-6 text-primary-foreground">
              <div>
                <p className="font-serif text-3xl font-bold">{avgRating}★</p>
                <p className="mt-1 text-xs text-primary-foreground/70">
                  {TESTIMONIALS.length} verified Google reviews, no fabricated testimonials
                </p>
              </div>
              <a href="/#testimonials" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#8fe3ae]">
                Read the reviews <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
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
    <section id="process" className="section process-section">
      <Reveal className="section-intro">
        <p className="eyebrow">The Riverside Method</p>
        <h2>
          Built like a small<br />
          <em>piece of architecture.</em>
        </h2>
        <p className="mt-3">
          Casual contractors lay paving over raw clay. We engineer sub-surface drainage systems certified to BS7533 standards.
        </p>
      </Reveal>

      <RevealGrid className="process-grid mt-10">
        {PROCESS_STEPS.map((step) => (
          <article key={step.step} className="border-t border-primary/20 pt-6">
            <span className="process-number font-serif font-bold text-accent text-2xl">{step.step}</span>
            <h3 className="mt-3 font-serif text-xl text-primary">{step.title}</h3>
            <p className="mt-1 text-xs font-bold text-accent uppercase tracking-wider">{step.subtitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            <ul className="mt-4 grid gap-1.5 text-xs text-muted-foreground">
              {step.details.map((d) => (
                <li key={d} className="flex items-center gap-2">
                  <Check size={13} className="text-accent" /> {d}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </RevealGrid>
    </section>
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
            </motion.div>
          )}
        </Reveal>

        <RevealGrid className="md:col-span-6 grid grid-cols-2 gap-3" stagger={0.04}>
          {SUBURBS.map((s) => (
            <button
              key={s.slug}
              onClick={() => setInput(s.postcodePrefix)}
              className={`w-full border p-4 text-left transition-all ${
                input === s.postcodePrefix ? 'border-accent bg-accent/10' : 'border-border bg-background hover:border-primary'
              }`}
            >
              <p className="font-bold text-primary">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.postcodePrefix} · {s.council}</p>
            </button>
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
 * Interactive ROI & Property Value Boost Estimator
 * ------------------------------------------------------------------ */
function RoiCalculator({ onSurvey }: { onSurvey: (source: string) => void }) {
  const [sizeM2, setSizeM2] = useState(50)
  const [condition, setCondition] = useState<'clay' | 'old' | 'turf'>('clay')

  const valueBoostMin = Math.round(sizeM2 * 260)
  const valueBoostMax = Math.round(sizeM2 * 410)
  const maintenanceSavings = Math.round(sizeM2 * 65)

  return (
    <section id="calculator" className="section roi-section border-t border-border">
      <div className="grid gap-10 md:grid-cols-12 items-center">
        <Reveal className="md:col-span-6">
          <p className="eyebrow text-accent">Home Equity &amp; Value Estimator</p>
          <h2 className="font-serif text-3xl text-primary sm:text-4xl">
            Calculate your property investment &amp; return.
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            High-end porcelain outdoor living spaces in Bearsden (G61) and Newton Mearns (G77) consistently yield strong resale premiums while eliminating recurring lawn maintenance expenses.
          </p>

          <div className="mt-8 grid gap-6">
            <div>
              <div className="flex justify-between items-center text-sm font-bold text-primary">
                <label htmlFor="area-slider">Estimated Garden / Patio Area:</label>
                <span className="rounded bg-primary px-3 py-1 text-xs text-primary-foreground font-mono">{sizeM2} m²</span>
              </div>
              <input
                id="area-slider"
                type="range"
                min="20"
                max="150"
                step="5"
                value={sizeM2}
                onChange={(e) => {
                  setSizeM2(Number(e.target.value))
                  trackEvent('calculator_change', { size: e.target.value })
                }}
                className="mt-3 w-full accent-accent cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
                <span>20 m² (Compact Terrace)</span>
                <span>80 m² (Standard Patio)</span>
                <span>150 m² (Estate Grounds)</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-primary block mb-2">Current Garden State:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  ['clay', 'Waterlogged Clay'],
                  ['old', 'Old Slabs'],
                  ['turf', 'Sloped Lawn'],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() => setCondition(id as any)}
                    className={`border p-3 text-xs font-bold transition-all text-center ${
                      condition === id ? 'border-accent bg-accent/10 text-primary' : 'border-border bg-background text-muted-foreground hover:border-primary'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-6 border border-primary/20 bg-primary text-primary-foreground p-8 rounded shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-primary-foreground/85 font-bold text-xs uppercase tracking-wider">
              <Calculator size={16} /> <span>Estimated Investment Impact (Glasgow Suburbs)</span>
            </div>

            <div className="mt-6 border-b border-primary-foreground/10 pb-6">
              <span className="text-xs text-primary-foreground/70 block">Estimated Resale Equity Increase</span>
              <p className="font-serif text-4xl text-[#8fe3ae] font-bold mt-1">
                +£{valueBoostMin.toLocaleString()} – £{valueBoostMax.toLocaleString()}
              </p>
              <p className="text-xs text-primary-foreground/60 mt-1">Based on 5%–10% property value enhancement for luxury outdoor living</p>
            </div>

            <div className="mt-6">
              <span className="text-xs text-primary-foreground/70 block">10-Year Sub-Surface Maintenance Savings</span>
              <p className="font-serif text-3xl text-white font-bold mt-1">
                £{maintenanceSavings.toLocaleString()} Saved
              </p>
              <p className="text-xs text-primary-foreground/60 mt-1">Eliminates re-turfing, drainage pumping, &amp; cracked slab repairs</p>
            </div>
          </div>

          <div className="mt-8 border-t border-primary-foreground/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-primary-foreground/80 font-bold">10-Year Structural Guarantee Included</span>
            <button onClick={() => onSurvey('roi-calculator')} className="button-clay text-xs w-full sm:w-auto">
              Lock In Survey Quote <ArrowRight size={14} />
            </button>
          </div>
        </Reveal>
      </div>
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
      <SiteHeader onSurvey={openSurvey} overlay />
      <main className="home-main">
        <Hero onSurvey={openSurvey} />
        <Proof />
        <AboutSection />

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
        <RoiCalculator onSurvey={openSurvey} />
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
