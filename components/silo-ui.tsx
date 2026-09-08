import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { OpenSurveyButton } from '@/components/open-survey-button'

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="text-xs uppercase tracking-widest text-muted-foreground">
      {items.map((item, i) => (
        <span key={item.label}>
          {item.href ? (
            <Link href={item.href} className="hover:text-accent">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
          {i < items.length - 1 && <span className="px-2 text-muted-foreground/50">/</span>}
        </span>
      ))}
    </nav>
  )
}

export function Eyebrow({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
      <Icon className="h-3.5 w-3.5" />
      <span>{children}</span>
    </div>
  )
}

export function DirectAnswer({
  label = '3-Second Direct Answer',
  children,
}: {
  label?: string
  children: React.ReactNode
}) {
  return (
    <section className="border-y border-r border-l-4 border-border border-l-accent bg-secondary/60 p-6">
      <span className="eyebrow text-accent">{label}</span>
      <p className="mt-2 text-base font-medium leading-relaxed text-foreground">{children}</p>
    </section>
  )
}

export function SectionCard({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return <section className={`space-y-4 border border-border bg-background p-8 ${className}`}>{children}</section>
}

export function SubCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1 border border-border bg-secondary/40 p-4">
      <h3 className="text-sm font-semibold text-accent">{title}</h3>
      <p className="text-xs leading-relaxed text-muted-foreground">{children}</p>
    </div>
  )
}

export function CtaBanner({
  heading,
  body,
  ctaLabel,
  source,
}: {
  heading: string
  body: string
  ctaLabel: string
  source: string
}) {
  return (
    <div className="flex flex-col items-center justify-between gap-6 border border-primary bg-primary p-8 text-primary-foreground sm:flex-row">
      <div className="space-y-2">
        <h3 className="font-serif text-xl font-bold">{heading}</h3>
        <p className="max-w-xl text-sm text-primary-foreground/80">{body}</p>
      </div>
      <OpenSurveyButton source={source} className="button-clay whitespace-nowrap">
        {ctaLabel} <ArrowRight size={16} />
      </OpenSurveyButton>
    </div>
  )
}
