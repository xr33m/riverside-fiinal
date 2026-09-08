'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Marquee } from '@/components/ui/marquee-01-utils/marquee'
import { Star } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/content'

const reviews = TESTIMONIALS.map((t) => ({
  name: t.name,
  username: t.location,
  body: t.quote,
  projectType: t.projectType,
  date: t.date,
  rating: t.rating,
}))

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2))
const secondRow = reviews.slice(Math.ceil(reviews.length / 2))

interface ReviewData {
  name: string
  username: string
  body: string
  projectType: string
  date: string
  rating: number
}

const ReviewCard = ({
  name,
  username,
  body,
  projectType,
  date,
  rating,
}: ReviewData) => {
  return (
    <Card className="relative h-full w-72 cursor-pointer overflow-hidden border-border bg-card p-4 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md">
      <CardContent className="flex flex-col gap-3 p-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 font-serif text-sm font-bold text-primary">
              {name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-bold text-foreground">{name}</p>
              <p className="text-xs text-muted-foreground">{username}</p>
            </div>
          </div>
          <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden="true">
            <path fill="#4285F4" d="M21.35 12.27c0-.72-.06-1.42-.18-2.09H12v3.95h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.25Z" />
            <path fill="#34A853" d="M12 21.7c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.7Z" />
            <path fill="#FBBC05" d="M6.54 13.78A5.85 5.85 0 0 1 6.23 12c0-.62.11-1.22.31-1.78V7.69H3.3A9.74 9.74 0 0 0 2.26 12c0 1.56.37 3.03 1.04 4.31l3.24-2.53Z" />
            <path fill="#EA4335" d="M12 6.19c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.27 14.63 2.3 12 2.3a9.74 9.74 0 0 0-8.7 5.39l3.24 2.53C7.31 7.91 9.46 6.19 12 6.19Z" />
          </svg>
        </div>
        <div className="flex gap-0.5 text-[#fbbc04]" aria-label={`${rating} star rating`}>
          {[...Array(rating)].map((_, i) => (
            <Star key={i} size={14} fill="currentColor" strokeWidth={1.5} />
          ))}
        </div>
        <p className="text-sm leading-[1.5] text-foreground line-clamp-4">{body}</p>
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
          {projectType} · {date}
        </p>
      </CardContent>
    </Card>
  )
}

export default function TestimonialMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:30s]">
        {firstRow.map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:30s]">
        {secondRow.map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} {...review} />
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r" />
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l" />
    </div>
  )
}
