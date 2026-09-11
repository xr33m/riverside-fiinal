import Link from 'next/link'
import { Wrench, ArrowUpRight } from 'lucide-react'
import { SERVICES, getRelatedServices } from '@/lib/content'
import { SERVICE_ICONS } from '@/lib/service-icons'
import { TILE_GRADIENTS } from '@/lib/tile-gradients'
import { Eyebrow } from '@/components/silo-ui'
import { Reveal, RevealGrid } from '@/components/reveal'

interface ServicesShowcaseProps {
  excludeSlug?: string
  eyebrow?: string
  heading?: React.ReactNode
  description?: string
}

/**
 * "What We Can Do For You" — a 5-tile services teaser reused on the
 * homepage (no excludeSlug, first 5 services) and on each service detail
 * page (excludeSlug = the current service, curated related services first,
 * padded out with the rest) so every page links to real other services.
 */
export function ServicesShowcase({
  excludeSlug,
  eyebrow = 'Our Services',
  heading = (
    <>
      What We Can Do
      <br />
      For You
    </>
  ),
  description = 'From site survey to handover, we provide BS7533-engineered landscaping solutions tailored to your garden.',
}: ServicesShowcaseProps) {
  const related = excludeSlug ? getRelatedServices(excludeSlug) : []
  const relatedSlugs = new Set(related.map((r) => r.slug))
  const rest = SERVICES.filter((s) => s.slug !== excludeSlug && !relatedSlugs.has(s.slug))
  const items = [...related, ...rest].slice(0, 5)

  return (
    <section className="bg-secondary/30 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
          <Reveal className="space-y-3">
            <Eyebrow icon={Wrench}>{eyebrow}</Eyebrow>
            <h2 className="font-serif text-3xl font-bold italic leading-tight text-primary sm:text-4xl">
              {heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-4 lg:items-end lg:text-right">
            <p className="max-w-md text-muted-foreground">{description}</p>
            <Link
              href="/landscaping-services"
              className="button-outline inline-flex w-fit items-center gap-2 rounded-full text-xs"
            >
              See Our Services <ArrowUpRight size={14} />
            </Link>
          </Reveal>
        </div>

        <RevealGrid className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5" stagger={0.06}>
          {items.map((service, i) => {
            const Icon = SERVICE_ICONS[service.slug] ?? Wrench
            return (
              <Link
                key={service.slug}
                href={`/landscaping-services/${service.slug}`}
                aria-label={`Explore our ${service.primaryCategory.toLowerCase()} service`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl shadow-md transition-shadow duration-300 hover:shadow-xl"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-110 ${
                    TILE_GRADIENTS[i % TILE_GRADIENTS.length]
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                <Icon className="absolute left-4 top-4 h-5 w-5 text-white/35" />
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/25">
                  <ArrowUpRight className="h-4 w-4" />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-serif text-sm font-bold leading-tight text-white sm:text-base">
                    {service.primaryCategory}
                  </p>
                </div>
              </Link>
            )
          })}
        </RevealGrid>
      </div>
    </section>
  )
}
