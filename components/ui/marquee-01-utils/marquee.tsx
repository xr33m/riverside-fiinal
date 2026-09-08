'use client'

import React from 'react'

import { cn } from '@/lib/utils'

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  reverse?: boolean
  pauseOnHover?: boolean
}

export function Marquee({
  children,
  reverse,
  pauseOnHover,
  className,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        'group flex w-full overflow-hidden',
        className,
      )}
    >
      <div
        className={cn(
          'flex shrink-0 animate-marquee items-center gap-4 group-hover:[animation-play-state:paused]',
          reverse && '[animation-direction:reverse]',
        )}
      >
        {children}
        {children}
      </div>
    </div>
  )
}
