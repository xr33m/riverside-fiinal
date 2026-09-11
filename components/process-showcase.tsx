import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { Eyebrow } from '@/components/silo-ui'
import { Reveal, RevealGrid } from '@/components/reveal'
import { OpenSurveyButton } from '@/components/open-survey-button'

export interface ProcessStep {
  icon: LucideIcon
  title: string
  body: string
}

interface ProcessShowcaseProps {
  eyebrow?: string
  heading: ReactNode
  description: string
  ctaLabel?: string
  ctaSource: string
  steps: [ProcessStep, ProcessStep, ProcessStep]
}

// Vertical offsets (within a 160px band) and horizontal positions for the
// desktop wave layout — an up/down/up rhythm rather than a flat row.
const ICON_POSITIONS = [
  { left: '6%', top: 88 },
  { left: '50%', top: 8 },
  { left: '94%', top: 52 },
]

/**
 * Reusable "How It Works" process section — a wavy connector linking 3
 * icon badges on desktop, collapsing to a simple stacked list on mobile.
 * Copy (heading/description/steps) is supplied per page, so the same
 * visual is reused with different content on the homepage vs. each
 * service detail page.
 */
export function ProcessShowcase({
  eyebrow = 'How It Works',
  heading,
  description,
  ctaLabel = 'Book Free Survey',
  ctaSource,
  steps,
}: ProcessShowcaseProps) {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl space-y-4 text-center">
          <Eyebrow icon={steps[0].icon}>{eyebrow}</Eyebrow>
          <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl">{heading}</h2>
          <p className="text-muted-foreground">{description}</p>
          <div className="pt-2">
            <OpenSurveyButton source={ctaSource} className="button-clay mx-auto rounded-full">
              {ctaLabel} <ArrowRight size={16} />
            </OpenSurveyButton>
          </div>
        </Reveal>

        {/* Desktop: wavy connector with icons riding the curve */}
        <div className="relative mt-20 hidden lg:block">
          <div className="relative h-40">
            <svg
              viewBox="0 0 1000 160"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full text-accent/40"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M60,128 C220,40 320,40 500,48 C660,54 800,160 940,92"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="7 7"
              />
            </svg>
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="absolute -translate-x-1/2"
                style={{ left: ICON_POSITIONS[i].left, top: ICON_POSITIONS[i].top }}
              >
                <Reveal delay={i * 0.08}>
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background text-accent shadow-lg">
                    <step.icon className="h-7 w-7" />
                  </span>
                </Reveal>
              </div>
            ))}
          </div>

          <RevealGrid className="mt-6 grid grid-cols-3 gap-8" stagger={0.08}>
            {steps.map((step, i) => (
              <div key={step.title} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -top-4 right-0 select-none font-serif text-6xl font-bold text-muted-foreground/10"
                >
                  {i + 1}
                </span>
                <h3 className="relative font-serif text-lg font-bold text-primary">{step.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </RevealGrid>
        </div>

        {/* Mobile / tablet: simple stacked list, no decorative wave */}
        <RevealGrid className="mt-12 grid grid-cols-1 gap-8 lg:hidden" stagger={0.08}>
          {steps.map((step, i) => (
            <div key={step.title} className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-background text-accent shadow-md">
                <step.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-accent">Step {i + 1}</p>
                <h3 className="mt-1 font-serif text-lg font-bold text-primary">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </div>
          ))}
        </RevealGrid>
      </div>
    </section>
  )
}
