'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqItem {
  question: string
  answer: string
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-background shadow-sm">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-secondary/40"
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold text-primary">{item.question}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div className="grid transition-[grid-template-rows] duration-300 ease-in-out" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
              <div className="overflow-hidden">
                <p className="mx-5 mb-5 border-l-2 border-accent/50 pl-3 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
