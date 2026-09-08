'use client'

import type { ReactNode } from 'react'

export const OPEN_SURVEY_EVENT = 'riverside:open-survey'

/**
 * Fires the same survey dialog SiteChrome renders, from anywhere in the tree
 * (including server-rendered pages) without prop-drilling dialog state.
 */
export function OpenSurveyButton({
  source,
  className,
  children,
}: {
  source: string
  className?: string
  children: ReactNode
}) {
  return (
    <button
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_SURVEY_EVENT, { detail: { source } }))}
    >
      {children}
    </button>
  )
}
