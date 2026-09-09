'use client'

import { useId, useMemo, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, Droplets, LayoutGrid, Lightbulb, Ruler } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { OpenSurveyButton } from '@/components/open-survey-button'
import { trackEvent } from '@/lib/analytics'

/**
 * Indicative rates only, matching the bands already published in
 * lib/pricing.ts and lib/content.ts's porcelain cost guide — this widget
 * intentionally does not invent new sitewide figures. Outdoor lighting has
 * no existing published band, so it uses a modest flat-plus-per-m² addon
 * (low-voltage LED circuit + fixtures, scaling a little with garden size).
 */
const RATE_CARD: Record<
  'patio' | 'drainage' | 'lighting',
  { label: string; icon: LucideIcon; describe: (size: number) => string } & (
    | { lowPerM2: number; highPerM2: number; lowFlat?: never; highFlat?: never }
    | { lowFlat: number; highFlat: number; lowPerM2: number; highPerM2: number }
  )
> = {
  patio: {
    label: 'Porcelain Patio',
    icon: LayoutGrid,
    lowPerM2: 120,
    highPerM2: 180,
    describe: () => '20mm vitrified porcelain, BS7533 sub-base',
  },
  drainage: {
    label: 'Drainage System',
    icon: Droplets,
    lowPerM2: 70,
    highPerM2: 110,
    describe: () => 'Sub-surface slot drains & clay sub-base prep',
  },
  lighting: {
    label: 'Outdoor Lighting',
    icon: Lightbulb,
    lowFlat: 450,
    highFlat: 1200,
    lowPerM2: 3,
    highPerM2: 7,
    describe: () => 'Low-voltage LED circuit & step lighting',
  },
}

type ToggleId = keyof typeof RATE_CARD

const roundTo10 = (n: number) => Math.round(n / 10) * 10

export function CostEstimator() {
  const [sizeM2, setSizeM2] = useState(50)
  const [active, setActive] = useState<Record<ToggleId, boolean>>({
    patio: true,
    drainage: false,
    lighting: false,
  })
  const sliderId = useId()

  const estimate = useMemo(() => {
    let low = 0
    let high = 0

    for (const id of Object.keys(RATE_CARD) as ToggleId[]) {
      if (!active[id]) continue
      const rate = RATE_CARD[id]
      const flatLow = 'lowFlat' in rate && rate.lowFlat ? rate.lowFlat : 0
      const flatHigh = 'highFlat' in rate && rate.highFlat ? rate.highFlat : 0
      low += flatLow + rate.lowPerM2 * sizeM2
      high += flatHigh + rate.highPerM2 * sizeM2
    }

    const anySelected = Object.values(active).some(Boolean)
    if (!anySelected) return null

    return { low: roundTo10(low), high: roundTo10(high) }
  }, [active, sizeM2])

  function toggle(id: ToggleId) {
    setActive((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      trackEvent('calculator_change', { toggle: id, enabled: next[id] })
      return next
    })
  }

  return (
    <Reveal>
      <section
        aria-labelledby={`${sliderId}-heading`}
        className="grid gap-8 border border-border bg-background p-6 sm:p-8 md:grid-cols-12 md:gap-10"
      >
        <div className="md:col-span-7">
          <p className="eyebrow text-accent">Instant Ballpark</p>
          <h2 id={`${sliderId}-heading`} className="font-serif text-2xl font-bold text-primary sm:text-3xl">
            What would your project cost?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Pick your garden size and the work you need. This is a starting-point range, not a fixed quote — the real number comes from a free site survey.
          </p>

          <div className="mt-7">
            <div className="flex items-center justify-between text-sm font-bold text-primary">
              <label htmlFor={sliderId} className="flex items-center gap-1.5">
                <Ruler size={15} aria-hidden="true" /> Garden / patio area
              </label>
              <span className="rounded bg-primary px-3 py-1 text-xs text-primary-foreground font-mono">
                {sizeM2} m²
              </span>
            </div>
            <input
              id={sliderId}
              type="range"
              min={10}
              max={200}
              step={5}
              value={sizeM2}
              aria-describedby={`${sliderId}-result`}
              onChange={(e) => {
                const value = Number(e.target.value)
                setSizeM2(value)
                trackEvent('calculator_change', { size: value })
              }}
              className="mt-3 w-full cursor-pointer accent-accent"
            />
            <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
              <span>10 m²</span>
              <span>200 m²</span>
            </div>
          </div>

          <fieldset className="mt-7">
            <legend className="text-sm font-bold text-primary">Services you&apos;re considering</legend>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
              {(Object.keys(RATE_CARD) as ToggleId[]).map((id) => {
                const rate = RATE_CARD[id]
                const Icon = rate.icon
                const checked = active[id]
                return (
                  <label
                    key={id}
                    className={`flex cursor-pointer flex-col gap-2 border p-3.5 text-left transition-colors ${
                      checked ? 'border-accent bg-accent/5' : 'border-border bg-background hover:border-primary/40'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => toggle(id)}
                    />
                    <span className="flex items-center justify-between">
                      <Icon
                        size={18}
                        aria-hidden="true"
                        className={checked ? 'text-accent' : 'text-muted-foreground'}
                      />
                      <span
                        aria-hidden="true"
                        className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
                          checked ? 'border-accent bg-accent' : 'border-border'
                        }`}
                      >
                        {checked && (
                          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 fill-none stroke-white stroke-2">
                            <path d="M2 6l2.5 2.5L10 3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                    </span>
                    <span className="text-xs font-bold text-primary">{rate.label}</span>
                    <span className="text-[11px] leading-snug text-muted-foreground">{rate.describe(sizeM2)}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        </div>

        <div className="flex flex-col justify-between border border-primary/20 bg-primary p-6 text-primary-foreground md:col-span-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary-foreground/80">
              Indicative Estimate
            </p>

            <div
              id={`${sliderId}-result`}
              aria-live="polite"
              className="mt-3 flex min-h-[76px] flex-col justify-center"
            >
              {estimate ? (
                <>
                  <p className="font-serif text-3xl font-bold sm:text-4xl">
                    £{estimate.low.toLocaleString()} – £{estimate.high.toLocaleString()}
                  </p>
                  <p className="mt-1 text-xs text-primary-foreground/70">
                    Based on typical Glasgow material &amp; labour costs for {sizeM2}m². Not a fixed quote.
                  </p>
                </>
              ) : (
                <p className="text-sm text-primary-foreground/75">
                  Select at least one service above to see your estimate.
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 border-t border-primary-foreground/10 pt-6">
            <OpenSurveyButton source="cost-estimator" className="button-clay w-full">
              Lock In This Estimate via Site Survey <ArrowRight size={16} />
            </OpenSurveyButton>
          </div>
        </div>
      </section>
    </Reveal>
  )
}
