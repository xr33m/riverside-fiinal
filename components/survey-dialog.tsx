'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, ChevronRight, MapPin, X } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { estimateRange } from '@/lib/pricing'

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
const TOTAL_STEPS = 4

export function SurveyDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [goal, setGoal] = useState('')
  const [sizeM2, setSizeM2] = useState(40)
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
    setSizeM2(40)
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
  const estimate = estimateRange(goal, sizeM2)

  const advance = async () => {
    const nextErrors: Record<string, string> = {}
    if (step === 1 && !goal) nextErrors.goal = 'Choose the project outcome that fits best.'
    if (step === 3 && !UK_POSTCODE.test(postcode.trim())) {
      nextErrors.postcode = 'Enter a valid UK postcode so we can confirm coverage.'
    }
    if (step === 4) {
      if (!form.name.trim()) nextErrors.name = 'Please add your name.'
      if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Please enter a valid email.'
      if (!form.phone.trim()) nextErrors.phone = 'Please add a contact phone number.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      trackEvent('survey_validation_error', { field: Object.keys(nextErrors)[0] })
      return
    }
    if (step < TOTAL_STEPS) {
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
          sizeM2,
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
          {submittedLeadId ? 'Survey request complete.' : `Step ${step} of ${TOTAL_STEPS}`}
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
              ⚡ Free written estimate based on your materials and labour — zero sales pressure, valid 12 months.
            </div>
            <button onClick={close} className="button-clay mx-auto mt-8">
              Close Window <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow text-accent">Free Site Survey &amp; Estimate · Step {step} of {TOTAL_STEPS}</p>
            <h2 id="survey-title" className="mt-2 font-serif text-3xl leading-tight text-primary sm:text-4xl">
              Let&apos;s engineer your garden.
            </h2>
            <div className="mt-6 flex gap-2">
              {[1, 2, 3, 4].map((n) => (
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
                  <label className="text-base font-semibold text-foreground sm:text-lg" htmlFor="size-slider">
                    Roughly how big is the area?
                  </label>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    We don&apos;t quote fixed prices upfront — this gives you a ballpark based on typical materials and labour costs. Your exact number is confirmed after a free site survey.
                  </p>
                  <div className="mt-4 flex items-center justify-between text-sm font-bold text-primary">
                    <span>Estimated area</span>
                    <span className="rounded bg-primary px-3 py-1 text-xs text-primary-foreground">{sizeM2} m²</span>
                  </div>
                  <input
                    id="size-slider"
                    type="range"
                    min="10"
                    max="150"
                    step="5"
                    value={sizeM2}
                    onChange={(e) => setSizeM2(Number(e.target.value))}
                    className="mt-3 w-full accent-accent cursor-pointer"
                  />
                  {estimate && (
                    <div className="mt-5 border border-accent/30 bg-accent/5 p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-accent">Indicative Estimate</p>
                      <p className="mt-1 font-serif text-2xl font-bold text-primary">
                        £{estimate.low.toLocaleString()} – £{estimate.high.toLocaleString()}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Based on typical {estimate.label} material &amp; labour costs for {sizeM2}m². Not a fixed quote.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {step === 3 && (
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

              {step === 4 && (
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
                {loading ? 'Submitting...' : step === TOTAL_STEPS ? 'Request My Estimate' : 'Continue'} <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}
