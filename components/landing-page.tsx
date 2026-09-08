'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  Calculator,
  Droplets,
  Flame,
  Hammer,
  Layers,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
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

/* ------------------------------------------------------------------ *
 * Business Configuration & Postcode Rules
 * ------------------------------------------------------------------ */
const BRAND = {
  name: 'Arden Works',
  phoneDisplay: '0141 370 8921',
  phoneHref: 'tel:+441413708921',
  emailDisplay: 'surveys@ardenworks.co.uk',
  emailHref: 'mailto:surveys@ardenworks.co.uk',
}

const goals = ['Fix drainage & clay soil', 'Winter patio & hardscaping', 'Spring installation reservation']

const PRIORITY_AREAS: Record<string, string> = {
  G61: 'Bearsden',
  G77: 'Newton Mearns',
  G76: 'Clarkston',
  G46: 'Giffnock',
  G62: 'Milngavie',
  PA13: 'Kilmacolm',
}

const UK_POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i

function getPriorityArea(postcode: string): string | null {
  const outward = postcode.trim().toUpperCase().split(/\s+/)[0]
  for (const prefix of Object.keys(PRIORITY_AREAS)) {
    if (outward.startsWith(prefix)) return PRIORITY_AREAS[prefix]
  }
  return null
}

/* ------------------------------------------------------------------ *
 * Multi-Step Survey Dialog (Wired to Server API `/api/survey`)
 * ------------------------------------------------------------------ */
function SurveyDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [goal, setGoal] = useState('')
  const [postcode, setPostcode] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const close = useCallback(() => {
    setStep(1)
    setGoal('')
    setPostcode('')
    setForm({ name: '', email: '', phone: '' })
    setErrors({})
    setSubmittedLeadId(null)
    setLoading(false)
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!open || submittedLeadId) return
    trackEvent('survey_step_view', { step })
  }, [open, step, submittedLeadId])

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => !el.hasAttribute('disabled'))

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab') return
      const items = focusables()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const t = window.setTimeout(() => focusables()[0]?.focus(), 30)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      window.clearTimeout(t)
      previouslyFocused?.focus?.()
    }
  }, [open, close])

  if (!open) return null

  const priorityArea = getPriorityArea(postcode)

  const advance = async () => {
    const nextErrors: Record<string, string> = {}
    if (step === 1 && !goal) nextErrors.goal = 'Choose the project outcome that fits best.'
    if (step === 2 && !UK_POSTCODE.test(postcode.trim())) {
      nextErrors.postcode = 'Enter a valid UK postcode so we can confirm coverage.'
    }
    if (step === 3) {
      if (!form.name.trim()) nextErrors.name = 'Please add your name.'
      if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Please enter a valid email.'
      if (!form.phone.trim()) nextErrors.phone = 'Please add a contact phone number.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      trackEvent('survey_validation_error', { field: Object.keys(nextErrors)[0] })
      return
    }
    if (step < 3) {
      setStep(step + 1)
      return
    }

    // Submit to Server API Endpoint
    setLoading(true)
    try {
      const res = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal,
          postcode: postcode.toUpperCase(),
          name: form.name,
          email: form.email,
          phone: form.phone,
        }),
      })

      const data = await res.json()
      setLoading(false)

      if (data.success) {
        setSubmittedLeadId(data.leadId)
        trackEvent('survey_complete', { goal, postcode })
      } else {
        setErrors(data.errors || { general: data.message || 'Error submitting request.' })
      }
    } catch (err) {
      setLoading(false)
      setErrors({ general: 'Network connection issue. Please call us directly.' })
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/65 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="survey-title"
    >
      <motion.div
        ref={panelRef}
        initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto border border-border bg-background p-6 shadow-2xl sm:p-10"
      >
        <button
          onClick={close}
          className="absolute right-5 top-5 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close survey"
        >
          <X size={20} />
        </button>

        <p className="sr-only" role="status" aria-live="polite">
          {submittedLeadId ? 'Survey request complete.' : `Step ${step} of 3`}
        </p>

        {submittedLeadId ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check size={28} />
            </div>
            <p className="eyebrow text-accent">Reference ID: {submittedLeadId}</p>
            <h2 className="mt-2 font-serif text-3xl text-primary sm:text-4xl">Survey Request Registered.</h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Thank you, <strong className="text-foreground">{form.name}</strong>. Our senior landscape engineer will review your project goal ({goal}){priorityArea ? ` in ${priorityArea}` : ''} and contact you at {form.phone} within 24 hours.
            </p>
            <div className="mt-6 rounded border border-border bg-muted/40 p-4 text-xs text-muted-foreground">
              ⚡ Guaranteed fixed-price quote with zero sales pressure & 12-month proposal validity.
            </div>
            <button onClick={close} className="button-clay mx-auto mt-8">
              Close Window <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow text-accent">Fixed-Price Site Survey · Step {step} of 3</p>
            <h2 id="survey-title" className="mt-2 font-serif text-3xl leading-tight text-primary sm:text-4xl">
              Let&apos;s engineer your garden.
            </h2>
            <div className="mt-6 flex gap-2">
              {[1, 2, 3].map((n) => (
                <div key={n} className={`h-1 flex-1 transition-all ${n <= step ? 'bg-accent' : 'bg-border'}`} />
              ))}
            </div>

            <div className="mt-6">
              {errors.general && (
                <div className="mb-4 rounded bg-destructive/10 p-3 text-sm text-destructive">{errors.general}</div>
              )}

              {step === 1 && (
                <fieldset>
                  <legend className="text-base font-semibold text-foreground sm:text-lg">
                    What is your primary project goal?
                  </legend>
                  <div className="mt-4 grid gap-3">
                    {goals.map((item) => (
                      <button
                        key={item}
                        onClick={() => setGoal(item)}
                        className={`choice ${goal === item ? 'choice-active' : ''}`}
                        aria-pressed={goal === item}
                      >
                        <span>{item}</span>
                        <ChevronRight size={17} />
                      </button>
                    ))}
                  </div>
                  {errors.goal && <p className="mt-2 text-sm text-destructive">{errors.goal}</p>}
                </fieldset>
              )}

              {step === 2 && (
                <div>
                  <label className="text-base font-semibold text-foreground sm:text-lg" htmlFor="postcode">
                    What is your property postcode?
                  </label>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    We cover Greater Glasgow. Bearsden, Newton Mearns, Clarkston, Giffnock, Milngavie &amp; Kilmacolm are priority installation zones.
                  </p>
                  <input
                    id="postcode"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                    className="field mt-4 uppercase"
                    placeholder="e.g. G61 2AB or G77 6AA"
                    autoComplete="postal-code"
                    aria-describedby="postcode-hint"
                  />
                  {priorityArea && (
                    <p id="postcode-hint" className="mt-3 flex items-center gap-2 text-sm font-semibold text-primary">
                      <MapPin size={16} className="text-accent" /> Priority Installation Zone — {priorityArea}. Regular installation teams active.
                    </p>
                  )}
                  {errors.postcode && <p className="mt-2 text-sm text-destructive">{errors.postcode}</p>}
                </div>
              )}

              {step === 3 && (
                <div>
                  <p className="text-base font-semibold text-foreground sm:text-lg">
                    Where should we send your survey confirmation?
                  </p>
                  <div className="mt-4 grid gap-3">
                    {(['name', 'email', 'phone'] as const).map((key) => (
                      <div key={key}>
                        <label className="sr-only" htmlFor={key}>
                          {key}
                        </label>
                        <input
                          id={key}
                          value={form[key]}
                          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                          className="field"
                          placeholder={
                            key === 'name' ? 'Full Name' : key === 'email' ? 'Email Address' : 'Phone Number'
                          }
                          type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
                          autoComplete={key === 'name' ? 'name' : key === 'email' ? 'email' : 'tel'}
                        />
                        {errors[key] && <p className="mt-1 text-sm text-destructive">{errors[key]}</p>}
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs leading-normal text-muted-foreground">
                    🔒 Your contact details are stored securely for survey scheduling only. No spam, no pushy sales calls.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-between gap-3">
              <button onClick={() => (step > 1 ? setStep(step - 1) : close())} className="button-quiet">
                {step > 1 ? 'Back' : 'Cancel'}
              </button>
              <button onClick={advance} disabled={loading} className="button-clay">
                {loading ? 'Submitting...' : step === 3 ? 'Request Fixed-Price Survey' : 'Continue'} <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Glassmorphic Shrinking Header Navigation
 * ------------------------------------------------------------------ */
function Header({ onSurvey }: { onSurvey: (source: string) => void }) {
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`site-header transition-all duration-300 ${scrolled ? 'site-header-scrolled' : ''}`}>
      <a href="#top" className="wordmark">
        <span className="wordmark-mark">A</span>
        <span>
          Arden<span className="text-accent"> / </span>Works
          <small>LANDSCAPE ENGINEERING</small>
        </span>
      </a>
      <nav className="hidden items-center gap-6 md:flex text-sm">
        <a href="/landscaping-services" className="hover:text-accent font-medium">Services</a>
        <a href="/locations" className="hover:text-accent font-medium">Locations</a>
        <a href="/knowledge-base" className="hover:text-accent font-medium">Guides</a>
        <a href="#proof" className="hover:text-accent">Proof &amp; Drainage</a>
        <a href="#portfolio" className="hover:text-accent">Portfolio</a>
        <a href="#process" className="hover:text-accent">Process</a>
        <a href="#faq" className="hover:text-accent">FAQs</a>
        <a
          href={BRAND.phoneHref}
          className="flex items-center gap-2 font-bold text-primary hover:text-accent"
          onClick={() => trackEvent('call_click', { source: 'header' })}
        >
          <Phone size={15} /> {BRAND.phoneDisplay}
        </a>
      </nav>
      <div className="hidden md:block">
        <button onClick={() => onSurvey('header-nav')} className="button-clay text-xs">
          Free Survey <ArrowRight size={14} />
        </button>
      </div>
      <button className="md:hidden" onClick={() => setMenu(!menu)} aria-label="Open menu" aria-expanded={menu}>
        {menu ? <X /> : <Menu />}
      </button>
      {menu && (
        <div className="absolute left-0 right-0 top-full grid gap-4 border-b border-border bg-background p-6 shadow-xl md:hidden">
          <a href="#proof" onClick={() => setMenu(false)}>Proof &amp; Drainage</a>
          <a href="#portfolio" onClick={() => setMenu(false)}>Portfolio</a>
          <a href="#process" onClick={() => setMenu(false)}>Our Process</a>
          <a href="#materials" onClick={() => setMenu(false)}>Materials</a>
          <a href="#faq" onClick={() => setMenu(false)}>FAQs</a>
          <a href={BRAND.phoneHref} className="flex items-center gap-2 text-primary font-bold">
            <Phone size={15} /> {BRAND.phoneDisplay}
          </a>
          <button
            onClick={() => {
              setMenu(false)
              onSurvey('mobile-menu')
            }}
            className="button-clay"
          >
            Request Free Survey <ArrowRight size={16} />
          </button>
        </div>
      )}
    </header>
  )
}

/* ------------------------------------------------------------------ *
 * Hero Section (Higgsfield AI Video Parallax Hero + Motion Scroll)
 * ------------------------------------------------------------------ */
function Hero({ onSurvey }: { onSurvey: (source: string) => void }) {
  const [winter, setWinter] = useState(false)
  const reduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Scroll Parallax Transforms
  const yVideo = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '28%'])
  const scaleVideo = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.12])
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '-12%'])
  const opacityText = useTransform(scrollYProgress, [0, 0.85], [1, reduceMotion ? 1 : 0.2])

  return (
    <section ref={heroRef} id="top" className="hero relative overflow-hidden">
      <motion.div style={{ y: yText, opacity: opacityText }} className="hero-copy z-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-bold text-accent shadow-sm">
          <Zap size={14} /> <span>Winter Installation Schedule: 3 Slots Remaining for G61 / G77</span>
        </div>
        <p className="eyebrow text-accent">Glasgow · Bearsden · Newton Mearns · Giffnock</p>
        <h1>Bespoke patios &amp; landscaping <em>engineered</em> for Glasgow weather.</h1>
        <p className="hero-sub">
          Eliminate waterlogged lawns with BS7533-compliant deep sub-base drainage. Installed year-round across Greater Glasgow with a 10-year structural guarantee.
        </p>
        <div className="hero-actions">
          <button onClick={() => onSurvey('hero')} className="button-clay">
            Get your free fixed-price site survey <ArrowRight size={17} />
          </button>
          <a href="#proof" className="button-outline">
            See the proof <ChevronDown size={17} />
          </a>
        </div>
        <p className="microcopy">
          No pushy sales <span>·</span> Guaranteed start date <span>·</span> Valid 12 months
        </p>
      </motion.div>

      <div className="hero-visual z-10">
        <div className="season-switch">
          <span className={!winter ? 'active font-bold' : ''}>Summer</span>
          <button
            onClick={() => setWinter(!winter)}
            aria-label="Toggle summer or winter hero view"
            aria-pressed={winter}
          >
            <motion.span
              animate={{ x: winter ? 24 : 0 }}
              transition={reduceMotion ? { duration: 0 } : undefined}
            />
          </button>
          <span className={winter ? 'active font-bold' : ''}>Winter</span>
        </div>

        <div className="hero-image border border-border shadow-2xl relative overflow-hidden">
          {/* Framer Motion Scroll Parallax Video Frame */}
          <motion.div
            style={{ y: yVideo, scale: scaleVideo }}
            className="absolute inset-0 size-full"
          >
            <video
              key={winter ? 'winter-vid' : 'summer-vid'}
              autoPlay
              loop
              muted
              playsInline
              poster="/images/garden-after.png"
              className="hero-video-element"
            >
              <source src={winter ? '/videos/hero-winter.mp4' : '/videos/hero.mp4'} type="video/mp4" />
            </video>
          </motion.div>

          <div className="image-caption">
            <AnimatePresence mode="wait">
              <motion.div
                key={winter ? 'winter' : 'summer'}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              >
                <p className="eyebrow text-accent">
                  {winter ? 'Winter Workflow · Covered Installation' : 'Outdoor Living · All-Season Finish'}
                </p>
                <h2>{winter ? 'Heated & lighted hardscape' : 'Summer outdoor living'}</h2>
                <p>
                  {winter
                    ? 'Keep the garden working after dark with built-in heating & discreet step lighting, installed clean through winter.'
                    : 'Architect-level porcelain paving built for long Scottish evenings with zero maintenance.'}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="trust-strip z-10">
        <span>
          <Star size={15} fill="currentColor" className="text-accent" /> 5.0 Google rating <b>(128 reviews)</b>
        </span>
        <span>
          <ShieldCheck size={16} className="text-primary" /> Marshall&apos;s approved installer
        </span>
        <span>
          <Hammer size={16} className="text-accent" /> 10-year structural guarantee
        </span>
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
      <div className="section-intro">
        <p className="eyebrow">Proof, not promises</p>
        <h2>
          Turn the wettest corner<br />
          <em>into the best one.</em>
        </h2>
        <p>
          Drainage is not an afterthought. It&apos;s the part of the build you never see — and the reason your patio still works after weeks of heavy Scottish rainfall.
        </p>
      </div>

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
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
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
      </div>

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
 * Process Component (The Arden Method 4-Step Engineering Timeline)
 * ------------------------------------------------------------------ */
function Process() {
  return (
    <section id="process" className="section process-section">
      <div className="section-intro">
        <p className="eyebrow">The Arden Method</p>
        <h2>
          Built like a small<br />
          <em>piece of architecture.</em>
        </h2>
        <p className="mt-3">
          Casual contractors lay paving over raw clay. We engineer sub-surface drainage systems certified to BS7533 standards.
        </p>
      </div>

      <div className="process-grid mt-10">
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
      </div>
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
      <div className="section-intro">
        <p className="eyebrow text-accent">Architectural Materials</p>
        <h2>
          Vitrified Porcelain &amp;<br />
          <em>Scottish Whinstone.</em>
        </h2>
        <p>
          We source high-density vitrified porcelain from Bologna &amp; Modena, paired with local Scottish Whinstone borders engineered for frost-proof durability.
        </p>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-12">
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
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * Dedicated Testimonials Showcase Grid
 * ------------------------------------------------------------------ */
function TestimonialsShowcase() {
  return (
    <section id="testimonials" className="section testimonials-section border-t border-border bg-muted/20">
      <div className="section-intro">
        <p className="eyebrow">Client Verification</p>
        <h2>
          Trusted by homeowners<br />
          <em>across Greater Glasgow.</em>
        </h2>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <article key={t.id} className="border border-border bg-background p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex gap-1 text-accent" aria-label={`${t.rating} star rating`}>
                {[...Array(t.rating)].map((_, i) => (
                  <Star size={16} key={i} fill="currentColor" />
                ))}
              </div>
              <blockquote className="mt-4 font-serif text-lg leading-snug text-primary">
                &quot;{t.quote}&quot;
              </blockquote>
            </div>

            <div className="mt-6 border-t border-border pt-4">
              <p className="font-bold text-foreground text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">
                {t.postcode ? `${t.location} (${t.postcode})` : t.location} · {t.projectType}
              </p>
              <p className="mt-1 text-[10px] uppercase font-bold text-accent">{t.date}</p>
            </div>
          </article>
        ))}
      </div>
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
        <div className="md:col-span-6">
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
        </div>

        <div className="md:col-span-6 grid grid-cols-2 gap-3">
          {SUBURBS.map((s) => (
            <button
              key={s.slug}
              onClick={() => setInput(s.postcodePrefix)}
              className={`border p-4 text-left transition-all ${
                input === s.postcodePrefix ? 'border-accent bg-accent/10' : 'border-border bg-background hover:border-primary'
              }`}
            >
              <p className="font-bold text-primary">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.postcodePrefix} · {s.council}</p>
            </button>
          ))}
        </div>
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
      <div className="faq-heading">
        <p className="eyebrow">Straight answers</p>
        <h2>
          Good questions deserve<br />
          <em>proper answers.</em>
        </h2>
      </div>
      <div className="faq-list">
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
      </div>
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
        <div className="md:col-span-6">
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
        </div>

        <div className="md:col-span-6 border border-primary/20 bg-primary text-primary-foreground p-8 rounded shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-wider">
              <Calculator size={16} /> <span>Estimated Investment Impact (Glasgow Suburbs)</span>
            </div>

            <div className="mt-6 border-b border-primary-foreground/10 pb-6">
              <span className="text-xs text-primary-foreground/70 block">Estimated Resale Equity Increase</span>
              <p className="font-serif text-4xl text-accent font-bold mt-1">
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
        </div>
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
      <Header onSurvey={openSurvey} />
      <main>
        <Hero onSurvey={openSurvey} />
        <Proof />

        <section className="offseason">
          <ParallaxCard strength={16}>
            <div>
              <p className="eyebrow text-accent">Winter Bookings Open · Guaranteed Start Dates</p>
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

      <footer>
        <div className="wordmark">
          <span className="wordmark-mark">A</span>
          <span>
            Arden<span className="text-accent"> / </span>Works
            <small>LANDSCAPE ENGINEERING</small>
          </span>
        </div>
        <div>
          <p className="font-bold text-foreground">Direct Engineering Contacts</p>
          <a href={BRAND.phoneHref} onClick={() => trackEvent('call_click', { source: 'footer' })}>
            {BRAND.phoneDisplay}
          </a>
          <br />
          <a href={BRAND.emailHref}>{BRAND.emailDisplay}</a>
        </div>
        <div>
          <p className="font-bold text-foreground">Glasgow Physical Silos</p>
          <div className="flex flex-col gap-1 text-xs text-muted-foreground pt-1">
            <a href="/landscaping-services" className="hover:text-accent font-mono">/landscaping-services/</a>
            <a href="/locations" className="hover:text-accent font-mono">/locations/</a>
            <a href="/knowledge-base" className="hover:text-accent font-mono">/knowledge-base/</a>
          </div>
        </div>
      </footer>

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
              <small>Fixed-price survey, valid 12 months, zero pressure.</small>
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
