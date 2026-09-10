'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

interface FormState {
  firstName: string
  lastName: string
  phone: string
  email: string
  address: string
  message: string
}

const EMPTY_FORM: FormState = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  address: '',
  message: '',
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [messageId, setMessageId] = useState<string | null>(null)

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      setLoading(false)

      if (data.success) {
        setMessageId(data.messageId)
        setForm(EMPTY_FORM)
        trackEvent('contact_form_submit', {})
      } else {
        setErrors(data.errors || { general: data.message || 'Error sending message.' })
      }
    } catch {
      setLoading(false)
      setErrors({ general: 'Network connection issue. Please call us directly.' })
    }
  }

  if (messageId) {
    return (
      <div className="border border-accent/30 bg-accent/5 p-6 text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-accent text-white">
          <Check size={22} />
        </div>
        <p className="font-serif text-xl font-bold text-primary">Message Sent</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Thanks — reference <strong className="text-foreground">{messageId}</strong>. We&apos;ll get back to you within
          24 hours.
        </p>
        <button onClick={() => setMessageId(null)} className="button-quiet mx-auto mt-5">
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      {errors.general && <div className="rounded bg-destructive/10 p-3 text-sm text-destructive">{errors.general}</div>}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="sr-only" htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            value={form.firstName}
            onChange={set('firstName')}
            className="field"
            placeholder="First Name*"
            autoComplete="given-name"
          />
          {errors.firstName && <p className="mt-1 text-xs text-destructive">{errors.firstName}</p>}
        </div>
        <div>
          <label className="sr-only" htmlFor="lastName">
            Last Name
          </label>
          <input
            id="lastName"
            value={form.lastName}
            onChange={set('lastName')}
            className="field"
            placeholder="Last Name*"
            autoComplete="family-name"
          />
          {errors.lastName && <p className="mt-1 text-xs text-destructive">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="sr-only" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={set('phone')}
            className="field"
            placeholder="Your phone*"
            autoComplete="tel"
          />
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
        </div>
        <div>
          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={set('email')}
            className="field"
            placeholder="Your email*"
            autoComplete="email"
          />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label className="sr-only" htmlFor="address">
          Address
        </label>
        <input
          id="address"
          value={form.address}
          onChange={set('address')}
          className="field"
          placeholder="Your address*"
          autoComplete="street-address"
        />
        {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address}</p>}
      </div>

      <div>
        <label className="sr-only" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          value={form.message}
          onChange={set('message')}
          className="field min-h-[140px] resize-y"
          placeholder="Message*"
        />
        {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
      </div>

      <button type="submit" disabled={loading} className="button-clay w-fit">
        {loading ? 'Sending...' : 'Send a Message'} <ArrowRight size={16} />
      </button>
    </form>
  )
}
