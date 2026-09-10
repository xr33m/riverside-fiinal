import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { OpenSurveyButton } from '@/components/open-survey-button'

// Decorative leaf outline — matches the Figma reference's monstera-leaf
// accents, drawn in brand white/opacity instead of imported artwork.
function LeafAccent({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className={`pointer-events-none absolute text-white/10 ${className}`}
      fill="none"
    >
      <path
        d="M100 10C60 10 20 50 20 100c0 50 40 90 80 90s80-40 80-90c0-50-40-90-80-90Zm0 10c8 30 8 60 0 160M100 60c-25 8-45 25-55 45M100 60c25 8 45 25 55 45M100 110c-20 6-36 20-44 36M100 110c20 6 36 20 44 36"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}

/**
 * Full-bleed dark green CTA band with leaf accents — the Figma template's
 * closing CTA rhythm, in brand green rather than its orange, reused across
 * Contact and every service detail page.
 */
export function LeafCtaBanner({
  heading,
  source,
  secondaryHref = '/landscaping-services',
  secondaryLabel = 'Our Services',
}: {
  heading: string
  source: string
  secondaryHref?: string
  secondaryLabel?: string
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-accent to-[#013d1c] py-16 text-white">
      <LeafAccent className="-left-6 -top-6 h-40 w-40 -rotate-12" />
      <LeafAccent className="-bottom-8 -right-6 h-48 w-48 rotate-12" />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-bold sm:text-4xl">{heading}</h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <OpenSurveyButton source={source} className="button-light whitespace-nowrap">
            Get Started <ArrowRight size={16} />
          </OpenSurveyButton>
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap border border-white/40 px-[22px] py-[15px] text-xs font-extrabold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white/10"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
