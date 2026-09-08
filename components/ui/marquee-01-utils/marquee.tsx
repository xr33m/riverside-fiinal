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
      style={{
        '--duration': '40s',
        ...(props.style ?? {}),
      }}
      className={cn(
        'group flex overflow-hidden p-2 [--gap:1rem]',
        className,
      )}
    >
      <div
        className={cn(
          'flex shrink-0 animate-marquee items-center [--gap:1rem] group-hover:[animation-play-state:paused]',
          reverse && '[animation-direction:reverse]',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
        )}
        style={{
          gap: 'var(--gap)',
          marginRight: 'calc(var(--gap) * -1)',
        }}
      >
        {children}
        {children}
      </div>
    </div>
  )
}
