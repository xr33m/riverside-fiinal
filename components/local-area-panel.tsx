import { MapPin, Navigation, ArrowRight } from 'lucide-react'
import { BRAND } from '@/lib/content'
import { SectionCard } from '@/components/silo-ui'

interface LocalAreaPanelProps {
  areaName: string
  neighbourhoods: string[]
  keyLandmarks: string[]
  mainRoads: string[]
  drivingDirections?: string
}

/**
 * Real local-relevance signals (neighbourhoods, landmarks, main roads, and
 * directions back to the depot) already authored per suburb/town in
 * lib/content.ts — this just surfaces them, it doesn't invent anything.
 * `drivingDirections` is only set for the Glasgow suburbs (SUBURBS has a
 * real GBP-sourced route); Ayrshire towns don't have a dedicated depot yet,
 * so they fall back to a computed Google Maps link instead of invented text.
 */
export function LocalAreaPanel({ areaName, neighbourhoods, keyLandmarks, mainRoads, drivingDirections }: LocalAreaPanelProps) {
  const depotAddress = `${BRAND.gbpAddress.streetAddress}, ${BRAND.gbpAddress.addressLocality} ${BRAND.gbpAddress.postalCode}`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
    `${areaName}, UK`
  )}&destination=${encodeURIComponent(depotAddress)}`

  return (
    <SectionCard className="space-y-6">
      <h2 className="font-serif text-2xl font-bold text-primary">
        Local Knowledge: {areaName} Landmarks &amp; Access
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-accent">Neighbourhoods We Cover</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {neighbourhoods.map((n) => (
              <span key={n} className="border border-border bg-secondary/40 px-2.5 py-1 text-xs text-foreground">
                {n}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-accent">Local Landmarks</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {keyLandmarks.map((landmark) => (
              <li key={landmark} className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                <span>{landmark}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-accent">Main Roads</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {mainRoads.map((road) => (
              <li key={road} className="flex items-start gap-2">
                <Navigation className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                <span>{road}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="flex items-center gap-2 text-sm font-bold text-primary">
          <Navigation className="h-4 w-4 text-accent" /> Directions to Our Depot
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {drivingDirections ?? `Our depot is at ${depotAddress} — use the button below for live directions from ${areaName}.`}
        </p>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="button-outline mt-4 inline-flex w-fit items-center gap-2 text-xs"
        >
          Get Directions From {areaName} <ArrowRight size={14} />
        </a>
      </div>
    </SectionCard>
  )
}
