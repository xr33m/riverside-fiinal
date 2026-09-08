'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SurveyDialog } from '@/components/survey-dialog'
import { OPEN_SURVEY_EVENT } from '@/components/open-survey-button'

/**
 * Shared header/footer/survey chrome for every page outside the homepage
 * (which renders its own copy inline via components/landing-page.tsx).
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const [survey, setSurvey] = useState(false)
  const [sticky, setSticky] = useState(false)
  const reduceMotion = useReducedMotion()

  const openSurvey = useMemo(
    () => (source: string) => {
      trackEvent('cta_click', { source })
      trackEvent('survey_open', { source })
      setSurvey(true)
    },
    [],
  )

  useEffect(() => {
    const onOpenSurvey = (e: Event) => {
      const source = (e as CustomEvent<{ source: string }>).detail?.source ?? 'unknown'
      openSurvey(source)
    }
    window.addEventListener(OPEN_SURVEY_EVENT, onOpenSurvey)
    return () => window.removeEventListener(OPEN_SURVEY_EVENT, onOpenSurvey)
  }, [openSurvey])

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > window.innerHeight * 0.75)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <SiteHeader onSurvey={openSurvey} />
      <main>{children}</main>
      <SiteFooter />

      <AnimatePresence>
        {sticky && !survey && (
          <motion.div
            initial={reduceMotion ? false : { y: 100 }}
            animate={{ y: 0 }}
            exit={reduceMotion ? undefined : { y: 100 }}
            className="sticky-cta"
          >
            <span>
              <b>Ready to eliminate waterlogged lawns?</b>
              <small>Fixed-price survey, valid 12 months, zero pressure.</small>
            </span>
            <button onClick={() => openSurvey('sticky')} className="button-clay">
              Get Started <ArrowRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <SurveyDialog open={survey} onClose={() => setSurvey(false)} />
    </>
  )
}
