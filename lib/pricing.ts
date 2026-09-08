/**
 * Indicative pricing only — Riverside Landscaping does not quote fixed prices upfront.
 * These are typical Glasgow-market material + labour rate bands per m², used to show a
 * ballpark range in the survey flow. The real number is confirmed in a written estimate
 * after a free site survey, once materials and site conditions are known.
 */

export type EstimateGoal =
  | 'Fix drainage & clay soil'
  | 'Winter patio & hardscaping'
  | 'Spring installation reservation'

interface RateBand {
  lowPerM2: number
  highPerM2: number
  label: string
}

// Porcelain rate (£120-£180/m²) matches the published cost-guide figure in lib/content.ts.
// Drainage and the blended "general" band are derived proportionally from that anchor
// rate using typical UK landscaping cost ratios, not separately published figures.
const RATE_BANDS: Record<EstimateGoal, RateBand> = {
  'Fix drainage & clay soil': { lowPerM2: 70, highPerM2: 110, label: 'garden drainage & sub-base work' },
  'Winter patio & hardscaping': { lowPerM2: 120, highPerM2: 180, label: 'porcelain patio installation' },
  'Spring installation reservation': { lowPerM2: 100, highPerM2: 160, label: 'general hardscaping installation' },
}

export function estimateRange(goal: string, sizeM2: number) {
  const band = RATE_BANDS[goal as EstimateGoal]
  if (!band) return null

  return {
    low: Math.round((band.lowPerM2 * sizeM2) / 10) * 10,
    high: Math.round((band.highPerM2 * sizeM2) / 10) * 10,
    label: band.label,
  }
}
