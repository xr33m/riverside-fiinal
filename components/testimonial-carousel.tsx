'use client'

import { useState } from 'react'
import { TESTIMONIALS } from '@/lib/content'
import { ReviewCard } from '@/components/ui/marquee-01'

const PER_PAGE = 3

/**
 * Static, paginated testimonial row with dot indicators — an alternative
 * to the homepage's auto-scrolling marquee (components/ui/marquee-01.tsx),
 * for pages that want a controllable carousel instead. Same real
 * TESTIMONIALS data and ReviewCard styling either way.
 */
export function TestimonialCarousel() {
  const [page, setPage] = useState(0)
  const pageCount = Math.ceil(TESTIMONIALS.length / PER_PAGE)
  const start = page * PER_PAGE
  const visible = TESTIMONIALS.slice(start, start + PER_PAGE)

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((t) => (
          <ReviewCard
            key={t.id}
            name={t.name}
            username={t.location}
            body={t.quote}
            projectType={t.projectType}
            date={t.date}
            rating={t.rating}
            className="w-full"
          />
        ))}
      </div>

      {pageCount > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Show reviews page ${i + 1} of ${pageCount}`}
              aria-current={page === i}
              className={`h-2 rounded-full transition-all ${
                page === i ? 'w-6 bg-accent' : 'w-2 bg-border hover:bg-accent/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
