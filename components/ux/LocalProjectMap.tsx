'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin } from 'lucide-react'
import { Reveal } from '@/components/reveal'

interface ProjectPin {
  id: string
  area: string
  postcode: string
  title: string
  materials: string[]
  lat: number
  lng: number
}

// Approximate suburb centres — content.ts tracks postcode coverage but not
// per-suburb coordinates, so these are hand-set for the three pins requested.
// Materials copy is pulled from the published project/coverage copy in
// lib/content.ts (PORTFOLIO_ITEMS specs, SUBURBS highlightInstall) rather
// than invented here, so it stays consistent with the rest of the site.
const PROJECT_PINS: ProjectPin[] = [
  {
    id: 'bearsden',
    area: 'Bearsden',
    postcode: 'G61',
    title: 'Outdoor Lounge & Heated Pergola',
    materials: ['60m² 20mm Italian porcelain', 'Sub-surface slot drainage', 'Heated pergola footings', 'BS7533 sub-base'],
    lat: 55.9219,
    lng: -4.3403,
  },
  {
    id: 'newton-mearns',
    area: 'Newton Mearns',
    postcode: 'G77',
    title: 'Deep Clay Drainage & Raised Terrace',
    materials: ['300mm MOT Type 1 sub-base', 'Geotextile clay separation', 'ACO slot drain channelling', 'Scottish whinstone borders'],
    lat: 55.7736,
    lng: -4.3383,
  },
  {
    id: 'west-end',
    area: 'West End Glasgow',
    postcode: 'G12',
    title: 'Tenement Rear Garden Transformation',
    materials: ['Compact excavator access', 'Flush threshold slot drains', 'Precision diamond-cut vitrified porcelain'],
    lat: 55.8763,
    lng: -4.2925,
  },
]

// --- Minimal ambient typing for the slice of the Maps JS API used here.
// Kept local rather than adding an @types/google.maps dependency for one
// component; extend the shape below if more of the API gets used later.
interface GLatLng {
  lat: number
  lng: number
}
interface GMap {
  fitBounds(bounds: GLatLngBounds, padding?: number): void
}
interface GMarker {
  addListener(event: string, handler: () => void): void
  setMap(map: GMap | null): void
}
interface GInfoWindow {
  open(opts: { map: GMap; anchor: GMarker }): void
  close(): void
  setContent(content: HTMLElement | string): void
}
interface GLatLngBounds {
  extend(latLng: GLatLng): void
}
interface GoogleMapsNamespace {
  maps: {
    Map: new (el: HTMLElement, opts: Record<string, unknown>) => GMap
    Marker: new (opts: Record<string, unknown>) => GMarker
    InfoWindow: new (opts: Record<string, unknown>) => GInfoWindow
    LatLngBounds: new () => GLatLngBounds
    Size: new (width: number, height: number) => unknown
    Point: new (x: number, y: number) => unknown
  }
}
declare global {
  interface Window {
    google?: GoogleMapsNamespace
  }
}

const PIN_ICON_SVG = (fill: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="46" viewBox="0 0 36 46"><path d="M18 0C8 0 0 8 0 18c0 13 18 28 18 28s18-15 18-28C36 8 28 0 18 0z" fill="${fill}"/><circle cx="18" cy="18" r="7" fill="#fff"/></svg>`,
  )}`

let mapsLoaderPromise: Promise<void> | null = null

/** Loads the Maps JS script at most once, even across multiple mounts. */
function loadGoogleMaps(apiKey: string): Promise<void> {
  if (window.google?.maps) return Promise.resolve()
  if (mapsLoaderPromise) return mapsLoaderPromise

  mapsLoaderPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById('riverside-google-maps-script')
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('Google Maps script failed to load')))
      return
    }

    const script = document.createElement('script')
    script.id = 'riverside-google-maps-script'
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Google Maps script failed to load'))
    document.head.appendChild(script)
  })

  return mapsLoaderPromise
}

type Status = 'loading' | 'ready' | 'fallback'

/**
 * Interactive coverage map with custom pins + info windows. Falls back to a
 * key-less Google Maps embed (same pattern used on the Ayrshire/locations
 * pages) when NEXT_PUBLIC_GOOGLE_MAPS_API_KEY isn't set or the script fails
 * to load, so the section never renders broken. The wrapper's fixed height
 * is identical across loading/ready/fallback so nothing shifts.
 */
export function LocalProjectMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<Status>('loading')
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  useEffect(() => {
    if (!apiKey) {
      setStatus('fallback')
      return
    }

    let cancelled = false
    const markers: GMarker[] = []

    loadGoogleMaps(apiKey)
      .then(() => {
        if (cancelled || !mapRef.current || !window.google) return

        const { maps } = window.google
        const map = new maps.Map(mapRef.current, {
          center: { lat: 55.86, lng: -4.31 },
          zoom: 10,
          disableDefaultUI: false,
          streetViewControl: false,
          mapTypeControl: false,
          styles: [{ featureType: 'poi.business', stylers: [{ visibility: 'off' }] }],
        })

        const infoWindow = new maps.InfoWindow({})
        const bounds = new maps.LatLngBounds()

        for (const pin of PROJECT_PINS) {
          const position = { lat: pin.lat, lng: pin.lng }
          bounds.extend(position)

          const marker = new maps.Marker({
            position,
            map,
            title: `${pin.title} — ${pin.area} (${pin.postcode})`,
            icon: {
              url: PIN_ICON_SVG('#01642d'),
              scaledSize: new maps.Size(30, 38),
              anchor: new maps.Point(15, 38),
            },
          })

          // Info window content is built from the static PROJECT_PINS data above
          // (developer-authored, not user input), so innerHTML here is safe.
          marker.addListener('click', () => {
            const content = document.createElement('div')
            content.className = 'max-w-[220px] p-1 font-sans'
            content.innerHTML = `
              <p class="text-xs font-bold uppercase tracking-wide text-[#01642d]">${pin.area} · ${pin.postcode}</p>
              <p class="mt-1 text-sm font-bold text-[#1939bc]">${pin.title}</p>
              <ul class="mt-2 space-y-1 text-xs text-[#5b6167] list-disc pl-4">
                ${pin.materials.map((m) => `<li>${m}</li>`).join('')}
              </ul>
            `
            infoWindow.setContent(content)
            infoWindow.open({ map, anchor: marker })
          })

          markers.push(marker)
        }

        map.fitBounds(bounds, 60)
        if (!cancelled) setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('fallback')
      })

    return () => {
      cancelled = true
      markers.forEach((m) => m.setMap(null))
    }
  }, [apiKey])

  return (
    <Reveal>
      <section aria-labelledby="local-project-map-heading" className="border border-border bg-background p-6 sm:p-8">
        <p className="eyebrow text-accent">Where We&apos;ve Been Building</p>
        <h2 id="local-project-map-heading" className="font-serif text-2xl font-bold text-primary sm:text-3xl">
          Recent projects across Greater Glasgow
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          A sample of completed installs in Bearsden, Newton Mearns, and the West End — select a pin for the
          materials used on that job.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="relative h-[420px] w-full overflow-hidden border border-border lg:col-span-8">
            {status === 'loading' && (
              <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-muted" aria-hidden="true">
                <MapPin size={32} className="text-muted-foreground/40" />
              </div>
            )}

            {status === 'fallback' && (
              <iframe
                title="Map of Greater Glasgow — Riverside Landscaping coverage area"
                src={`https://www.google.com/maps?q=${encodeURIComponent('Glasgow, UK')}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            )}

            <div
              ref={mapRef}
              aria-label="Map showing recent Riverside Landscaping project locations in Bearsden, Newton Mearns, and the West End of Glasgow"
              className={`absolute inset-0 h-full w-full ${status === 'ready' ? '' : 'invisible'}`}
            />
          </div>

          {/* Text alternative to the map's pins/info-windows, always visible —
              keeps the same content reachable without relying on map interaction. */}
          <ul className="grid gap-3 lg:col-span-4">
            {PROJECT_PINS.map((pin) => (
              <li key={pin.id} className="border border-border bg-secondary/40 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-accent">
                  {pin.area} · {pin.postcode}
                </p>
                <p className="mt-1 text-sm font-bold text-primary">{pin.title}</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs leading-relaxed text-muted-foreground">
                  {pin.materials.map((material) => (
                    <li key={material}>{material}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Reveal>
  )
}
