'use client'

import { useEffect, useState } from 'react'
import { CloudRain, ShieldCheck, Snowflake, Sun } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { BRAND } from '@/lib/content'

// WMO weather codes (Open-Meteo): drizzle, rain, freezing rain, rain showers, thunderstorm.
const WET_CODES = new Set([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99])
const SNOW_CODES = new Set([71, 73, 75, 77, 85, 86])
const COLD_THRESHOLD_C = 10

interface WeatherState {
  tempC: number
  isWetOrCold: boolean
  isSnowy: boolean
}

function useGlasgowWeather() {
  const [weather, setWeather] = useState<WeatherState | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    const controller = new AbortController()
    const { latitude, longitude } = BRAND.geoCoordinates
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,weather_code&timezone=Europe%2FLondon`

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Weather API responded ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const code: number = data?.current?.weather_code
        const precipitation: number = data?.current?.precipitation ?? 0
        const tempC: number = data?.current?.temperature_2m
        if (typeof tempC !== 'number') throw new Error('Missing temperature in response')

        setWeather({
          tempC,
          isWetOrCold: WET_CODES.has(code) || SNOW_CODES.has(code) || precipitation > 0.1 || tempC < COLD_THRESHOLD_C,
          isSnowy: SNOW_CODES.has(code),
        })
        setStatus('ready')
      })
      .catch((err) => {
        if (err?.name === 'AbortError') return
        if (process.env.NODE_ENV === 'development') console.warn('[GlasgowWeatherBanner]', err)
        setStatus('error')
      })

    return () => controller.abort()
  }, [])

  return { weather, status }
}

function weatherMessage(weather: WeatherState) {
  return weather.isWetOrCold ? (
    <>
      Glasgow Weather: {Math.round(weather.tempC)}°C &amp; Wet — Our Winter Hardscaping Rigs Are Fully Operational.
    </>
  ) : (
    <>Glasgow Weather: {Math.round(weather.tempC)}°C &amp; Dry — Ideal conditions for a site survey this week.</>
  )
}

const ERROR_MESSAGE =
  "Glasgow's weather changes fast — but our crews don't stop for it. We install year-round, rain or shine."

/**
 * Live Glasgow conditions via Open-Meteo (no API key required — a fixed
 * lat/lng lookup, not user data, so a keyless public endpoint is fine here).
 *
 * `variant="card"` (default) is a bordered content block for dropping into a
 * page body. `variant="ticker"` is a slim full-bleed status bar meant to sit
 * above the site header/topbar, matching that chrome's edge-to-edge layout.
 * Both reserve the same box size across loading/ready/error states so
 * nothing shifts once the fetch resolves.
 */
export function GlasgowWeatherBanner({ variant = 'card' }: { variant?: 'card' | 'ticker' }) {
  const { weather, status } = useGlasgowWeather()
  const Icon = status === 'ready' && weather ? (weather.isSnowy ? Snowflake : weather.isWetOrCold ? CloudRain : Sun) : ShieldCheck

  if (variant === 'ticker') {
    return (
      <div role="status" aria-live="polite" className="weather-ticker">
        <Icon aria-hidden="true" size={13} className="shrink-0" />
        {status === 'loading' && (
          <span className="h-3 w-56 max-w-full animate-pulse rounded bg-white/25" aria-hidden="true" />
        )}
        {status === 'ready' && weather && <span>{weatherMessage(weather)}</span>}
        {status === 'error' && <span>{ERROR_MESSAGE}</span>}
      </div>
    )
  }

  return (
    <Reveal>
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-[64px] items-center gap-3 border border-border border-l-4 border-l-accent bg-secondary/60 px-5 py-4"
      >
        <Icon aria-hidden="true" size={22} className="shrink-0 text-accent" />

        {status === 'loading' && (
          <span className="h-4 w-64 max-w-full animate-pulse rounded bg-muted-foreground/20" aria-hidden="true" />
        )}

        {status === 'ready' && weather && (
          <p className="text-sm font-medium leading-relaxed text-foreground">{weatherMessage(weather)}</p>
        )}

        {status === 'error' && <p className="text-sm font-medium leading-relaxed text-foreground">{ERROR_MESSAGE}</p>}
      </div>
    </Reveal>
  )
}
