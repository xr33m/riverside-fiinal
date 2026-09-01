'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, ChevronRight, Droplets, Hammer, Menu, MapPin, Phone, ShieldCheck, Star, X } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { faqs } from '@/lib/content'

/* ------------------------------------------------------------------ *
 * Provisional business config — replace every value before launch.
 * ------------------------------------------------------------------ */
const BRAND = {
  name: 'Arden Works',
  phoneDisplay: '0141 000 0000',
  phoneHref: 'tel:+441410000000',
  emailDisplay: 'hello@ardenworks.example',
  emailHref: 'mailto:hello@ardenworks.example',
}

const goals = ['Fix drainage', 'Winter patio', 'Spring reservation']

// Priority service areas keyed by outward-postcode prefix (verify before launch).
const PRIORITY_AREAS: Record<string, string> = {
  G61: 'Bearsden',
  G77: 'Newton Mearns',
  G76: 'Clarkston',
  G46: 'Giffnock',
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
 * Multi-step survey dialog (front-end only, confirmation on submit).
 * ------------------------------------------------------------------ */
function SurveyDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [goal, setGoal] = useState('')
  const [postcode, setPostcode] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const close = useCallback(() => {
    setStep(1); setGoal(''); setPostcode(''); setForm({ name: '', email: '', phone: '' })
    setErrors({}); setSubmitted(false); onClose()
  }, [onClose])

  // Announce each step for analytics + focus management.
  useEffect(() => {
    if (!open || submitted) return
    trackEvent('survey_step_view', { step })
  }, [open, step, submitted])

  // Scroll lock + Escape + focus trap while the dialog is open.
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
      if (e.key === 'Escape') { e.preventDefault(); close(); return }
      if (e.key !== 'Tab') return
      const items = focusables()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }

    document.addEventListener('keydown', onKeyDown)
    // Focus the first control shortly after mount.
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

  const advance = () => {
    const nextErrors: Record<string, string> = {}
    if (step === 1 && !goal) nextErrors.goal = 'Choose the project outcome that fits best.'
    if (step === 2 && !UK_POSTCODE.test(postcode.trim())) nextErrors.postcode = 'Enter a valid UK postcode so we can confirm coverage.'
    if (step === 3) {
      if (!form.name.trim()) nextErrors.name = 'Add your name.'
      if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter a valid email.'
      if (!form.phone.trim()) nextErrors.phone = 'Add a phone number.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      trackEvent('survey_validation_error', { field: Object.keys(nextErrors)[0] })
      return
    }
    if (step < 3) { setStep(step + 1); return }
    trackEvent('survey_submit')
    setSubmitted(true)
    trackEvent('survey_complete', { goal })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/60 p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="survey-title">
      <motion.div
        ref={panelRef}
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto bg-background p-6 shadow-2xl sm:p-10"
      >
        <button onClick={close} className="absolute right-5 top-5 rounded-full p-2 text-muted-foreground hover:bg-muted" aria-label="Close survey"><X size={20} /></button>
        <p className="sr-only" role="status" aria-live="polite">{submitted ? 'Survey request complete.' : `Step ${step} of 3`}</p>
        {submitted ? (
          <div className="py-10 text-center">
            <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check /></div>
            <p className="eyebrow">Survey request saved locally</p>
            <h2 className="mt-3 font-serif text-4xl text-primary">You&apos;re on the list.</h2>
            <p className="mx-auto mt-4 max-w-sm leading-7 text-muted-foreground">This prototype does not send data yet. In production, your details will be routed to the team with your preferred project goal{priorityArea ? ` in ${priorityArea}` : ''}.</p>
            <button onClick={close} className="button-clay mx-auto mt-8">Close <ArrowRight size={16} /></button>
          </div>
        ) : (
          <>
            <p className="eyebrow">Fixed-price site survey · Step {step} of 3</p>
            <h2 id="survey-title" className="mt-3 max-w-md font-serif text-4xl leading-tight text-primary">Let&apos;s make your garden work harder.</h2>
            <div className="mt-8 flex gap-2">{[1, 2, 3].map((n) => <div key={n} className={`h-1 flex-1 ${n <= step ? 'bg-accent' : 'bg-border'}`} />)}</div>
            <div className="mt-8">
              {step === 1 && (
                <fieldset>
                  <legend className="text-lg font-semibold text-foreground">What are you hoping to solve?</legend>
                  <div className="mt-4 grid gap-3">{goals.map((item) => <button key={item} onClick={() => setGoal(item)} className={`choice ${goal === item ? 'choice-active' : ''}`} aria-pressed={goal === item}>{item}<ChevronRight size={17} /></button>)}</div>
                  {errors.goal && <p className="mt-2 text-sm text-destructive">{errors.goal}</p>}
                </fieldset>
              )}
              {step === 2 && (
                <div>
                  <label className="text-lg font-semibold" htmlFor="postcode">What&apos;s your postcode?</label>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">We&apos;ll use this to confirm coverage. Bearsden, Newton Mearns, Clarkston and Giffnock are priority areas.</p>
                  <input id="postcode" value={postcode} onChange={(e) => setPostcode(e.target.value.toUpperCase())} className="field mt-5" placeholder="e.g. G61 2AB" autoComplete="postal-code" aria-describedby="postcode-hint" />
                  {priorityArea && <p id="postcode-hint" className="mt-2 flex items-center gap-2 text-sm font-semibold text-primary"><MapPin size={15} /> Priority area — {priorityArea}. We install here regularly.</p>}
                  {errors.postcode && <p className="mt-2 text-sm text-destructive">{errors.postcode}</p>}
                </div>
              )}
              {step === 3 && (
                <div>
                  <p className="text-lg font-semibold">Where should we send your confirmation?</p>
                  <div className="mt-4 grid gap-3">{(['name', 'email', 'phone'] as const).map((key) => (
                    <div key={key}>
                      <label className="sr-only" htmlFor={key}>{key}</label>
                      <input id={key} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="field" placeholder={key === 'name' ? 'Your name' : key === 'email' ? 'Email address' : 'Phone number'} type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'} autoComplete={key === 'name' ? 'name' : key === 'email' ? 'email' : 'tel'} />
                      {errors[key] && <p className="mt-1 text-sm text-destructive">{errors[key]}</p>}
                    </div>
                  ))}</div>
                  <p className="mt-4 text-xs leading-5 text-muted-foreground">By continuing, you agree to be contacted about this survey request. Replace this provisional consent copy before launch.</p>
                </div>
              )}
            </div>
            <div className="mt-8 flex justify-between gap-3">
              <button onClick={() => (step > 1 ? setStep(step - 1) : close())} className="button-quiet">{step > 1 ? 'Back' : 'Cancel'}</button>
              <button onClick={advance} className="button-clay">{step === 3 ? 'Request survey' : 'Continue'} <ArrowRight size={16} /></button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
function Header({ onSurvey }: { onSurvey: (source: string) => void }) {
  const [menu, setMenu] = useState(false)
  return (
    <header className="site-header">
      <a href="#top" className="wordmark"><span className="wordmark-mark">A</span><span>Arden<span className="text-accent"> / </span>Works<small>LANDSCAPE ENGINEERING</small></span></a>
      <nav className="hidden items-center gap-7 md:flex">
        <a href="#proof">Proof</a>
        <a href="#process">Process</a>
        <a href="#faq">FAQs</a>
        <a href={BRAND.phoneHref} className="flex items-center gap-2 text-primary" onClick={() => trackEvent('call_click', { source: 'header' })}><Phone size={15} /> {BRAND.phoneDisplay}</a>
      </nav>
      <button className="md:hidden" onClick={() => setMenu(!menu)} aria-label="Open menu" aria-expanded={menu}>{menu ? <X /> : <Menu />}</button>
      {menu && (
        <div className="absolute left-0 right-0 top-full grid gap-4 border-b border-border bg-background p-6 md:hidden">
          <a href="#proof" onClick={() => setMenu(false)}>Proof</a>
          <a href="#process" onClick={() => setMenu(false)}>Process</a>
          <a href="#faq" onClick={() => setMenu(false)}>FAQs</a>
          <button onClick={() => { setMenu(false); onSurvey('mobile-menu') }} className="button-clay">Free site survey <ArrowRight size={16} /></button>
        </div>
      )}
    </header>
  )
}

/* ------------------------------------------------------------------ */
function Hero({ onSurvey }: { onSurvey: (source: string) => void }) {
  const [winter, setWinter] = useState(false)
  const reduceMotion = useReducedMotion()
  return (
    <section id="top" className="hero">
      <div className="hero-copy">
        <p className="eyebrow text-accent">Glasgow · Bearsden · Newton Mearns</p>
        <h1>Bespoke patios &amp; landscaping <em>engineered</em> for Glasgow weather.</h1>
        <p className="hero-sub">Eliminate waterlogged lawns with BS7533-compliant deep sub-base drainage. Installed year-round across Greater Glasgow.</p>
        <div className="hero-actions">
          <button onClick={() => onSurvey('hero')} className="button-clay">Get your free fixed-price site survey <ArrowRight size={17} /></button>
          <a href="#proof" className="button-outline">See the proof <ChevronDown size={17} /></a>
        </div>
        <p className="microcopy">No pushy sales <span>·</span> Guaranteed start date <span>·</span> Valid 12 months</p>
      </div>
      <div className="hero-visual">
        <div className="season-switch">
          <span className={!winter ? 'active' : ''}>Summer</span>
          <button onClick={() => setWinter(!winter)} aria-label="Toggle summer or winter hero view" aria-pressed={winter}><motion.span animate={{ x: winter ? 24 : 0 }} transition={reduceMotion ? { duration: 0 } : undefined} /></button>
          <span className={winter ? 'active' : ''}>Winter</span>
        </div>
        <motion.div className="hero-image" animate={{ backgroundPosition: winter ? '60% center' : 'center' }} transition={reduceMotion ? { duration: 0 } : undefined}>
          <div className="image-caption">
            <AnimatePresence mode="wait">
              <motion.div key={winter ? 'winter' : 'summer'} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}>
                <p className="eyebrow text-accent">{winter ? 'Winter workflow' : 'Outdoor living'}</p>
                <h2>{winter ? 'Heated & lighted hardscape' : 'Summer outdoor living'}</h2>
                <p>{winter ? 'Keep the garden working after dark, whatever the forecast.' : 'Quietly detailed spaces, built for long Scottish evenings.'}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      <div className="trust-strip">
        <span><Star size={15} fill="currentColor" /> 5.0 Google rating <b>(128 reviews)</b></span>
        <span><ShieldCheck size={16} /> Marshall&apos;s approved installer</span>
        <span><Hammer size={16} /> 10-year structural guarantee</span>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
function Proof() {
  const [pos, setPos] = useState(51)
  const ref = useRef<HTMLDivElement>(null)
  const setFromClientX = (clientX: number) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    setPos(Math.max(3, Math.min(97, ((clientX - r.left) / r.width) * 100)))
  }
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); setPos((p) => Math.max(3, p - 4)) }
    else if (e.key === 'ArrowRight') { e.preventDefault(); setPos((p) => Math.min(97, p + 4)) }
    else if (e.key === 'Home') { e.preventDefault(); setPos(3) }
    else if (e.key === 'End') { e.preventDefault(); setPos(97) }
  }
  return (
    <section id="proof" className="section proof-section">
      <div className="section-intro">
        <p className="eyebrow">Proof, not promises</p>
        <h2>Turn the wettest corner<br /><em>into the best one.</em></h2>
        <p>Drainage is not an afterthought. It&apos;s the part of the build you never see — and the reason your patio still works after a week of Scottish rain.</p>
      </div>
      <div
        ref={ref}
        onPointerMove={(e) => { if (e.buttons === 1 || e.pointerType === 'mouse') setFromClientX(e.clientX) }}
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
        <div className="compare-handle" style={{ left: `${pos}%` }}><span>Drag</span><div /></div>
        <span className="compare-label before">Before</span>
        <span className="compare-label after">After</span>
        <div className="metric"><Droplets size={18} /><strong>100%</strong><span>sub-surface water mitigation</span></div>
      </div>
      <p className="slider-note">Drag, or focus the image and use ← → keys</p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
function Process() {
  return (
    <section id="process" className="section process-section">
      <div className="section-intro">
        <p className="eyebrow">The Arden method</p>
        <h2>Built like a small<br /><em>piece of architecture.</em></h2>
      </div>
      <div className="process-grid">
        {[
          ['01', 'Survey & levels', 'We map falls, thresholds and the water table before a single slab is ordered.'],
          ['02', 'Excavate & engineer', 'Clay out. Geotextile in. Deep MOT Type 1 sub-base compacted for the load and the rainfall.'],
          ['03', 'Lay & hand over', 'Precision porcelain, quiet drainage details and a site left cleaner than we found it.'],
        ].map(([n, t, d]) => (
          <article key={n}><span className="process-number">{n}</span><h3>{t}</h3><p>{d}</p></article>
        ))}
      </div>
      <div className="testimonial">
        <div className="stars" aria-hidden="true">★★★★★</div>
        <blockquote>&quot;The difference after the first proper downpour was remarkable. Every detail feels considered.&quot;</blockquote>
        <p>— Provisional homeowner testimonial · Bearsden</p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
function FAQ() {
  const [open, setOpen] = useState(0)
  const reduceMotion = useReducedMotion()
  return (
    <section id="faq" className="section faq-section">
      <div className="faq-heading">
        <p className="eyebrow">Straight answers</p>
        <h2>Good questions deserve<br /><em>proper answers.</em></h2>
      </div>
      <div className="faq-list">
        {faqs.map(([q, a], i) => (
          <div className="faq-item" key={q}>
            <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}><span>{q}</span><ChevronDown className={open === i ? 'rotate-180' : ''} size={20} /></button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div initial={reduceMotion ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={reduceMotion ? undefined : { height: 0, opacity: 0 }} className="faq-answer">
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

/* ------------------------------------------------------------------ */
export default function LandingPage() {
  const [survey, setSurvey] = useState(false)
  const [sticky, setSticky] = useState(false)
  const reduceMotion = useReducedMotion()

  const openSurvey = useMemo(
    () => (source: string) => { trackEvent('cta_click', { source }); trackEvent('survey_open', { source }); setSurvey(true) },
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
          <div>
            <p className="eyebrow text-accent">Winter bookings now open</p>
            <h2>Beat the 12-week spring backlog.</h2>
            <p>Lock in current material prices and book winter hardscaping while the calendar is clear.</p>
          </div>
          <button onClick={() => openSurvey('banner')} className="button-light">Reserve your survey <ArrowRight size={17} /></button>
        </section>
        <Process />
        <FAQ />
      </main>
      <footer>
        <div className="wordmark"><span className="wordmark-mark">A</span><span>Arden<span className="text-accent"> / </span>Works<small>LANDSCAPE ENGINEERING</small></span></div>
        <div>
          <p>Provisional contact details</p>
          <a href={BRAND.phoneHref} onClick={() => trackEvent('call_click', { source: 'footer' })}>{BRAND.phoneDisplay}</a><br />
          <a href={BRAND.emailHref}>{BRAND.emailDisplay}</a>
        </div>
        <div>
          <p>Serving Greater Glasgow</p>
          <p>Bearsden · Newton Mearns<br />Clarkston · Giffnock</p>
        </div>
      </footer>
      <AnimatePresence>
        {sticky && !survey && (
          <motion.div initial={reduceMotion ? false : { y: 100 }} animate={{ y: 0 }} exit={reduceMotion ? undefined : { y: 100 }} className="sticky-cta">
            <span><b>Ready to make it work?</b><small>Fixed-price survey, no pressure.</small></span>
            <button onClick={() => openSurvey('sticky')} className="button-clay">Get started <ArrowRight size={16} /></button>
          </motion.div>
        )}
      </AnimatePresence>
      <SurveyDialog open={survey} onClose={() => setSurvey(false)} />
    </>
  )
}
