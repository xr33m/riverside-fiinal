/**
 * Measurement hooks (no analytics provider connected yet).
 *
 * This is a deliberate no-op in production and console-only in development so
 * that wiring a real provider later (GA4, PostHog, Vercel Analytics custom
 * events, etc.) is a single-file change. Do NOT add a network dependency here
 * in this phase.
 *
 * Reserved event names — keep these stable so downstream dashboards don't break:
 *  - cta_click              { source: 'header' | 'hero' | 'banner' | 'sticky' | 'mobile-menu' | 'whatsapp-widget' }
 *  - call_click             { source: 'header' | 'footer' }
 *  - survey_open            { source?: string }
 *  - survey_step_view       { step: number }
 *  - survey_validation_error{ field: string }
 *  - survey_submit          {}
 *  - survey_complete        { goal?: string }
 */

export type AnalyticsEvent =
  | 'cta_click'
  | 'call_click'
  | 'survey_open'
  | 'survey_step_view'
  | 'survey_validation_error'
  | 'survey_submit'
  | 'survey_complete'
  | 'calculator_change'

export function trackEvent(
  name: AnalyticsEvent,
  payload?: Record<string, string | number | boolean | undefined>,
) {
  if (process.env.NODE_ENV === 'development') {
    console.log('[v0][analytics]', name, payload ?? {})
  }
  // Intentionally no network call in this phase.
}
