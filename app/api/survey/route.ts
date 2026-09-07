import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const UK_POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { goal, postcode, name, email, phone } = body

    // Server-side validation
    const errors: Record<string, string> = {}
    if (!goal) errors.goal = 'Project goal is required.'
    if (!postcode || !UK_POSTCODE_REGEX.test(postcode.trim())) {
      errors.postcode = 'Valid UK postcode is required.'
    }
    if (!name || typeof name !== 'string' || !name.trim()) errors.name = 'Name is required.'
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Valid email is required.'
    if (!phone || typeof phone !== 'string' || !phone.trim()) errors.phone = 'Phone number is required.'

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 })
    }

    const lead = {
      id: `LEAD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      goal,
      postcode: postcode.trim().toUpperCase(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      createdAt: new Date().toISOString(),
      userAgent: req.headers.get('user-agent') || 'Unknown',
    }

    // Safe persistence (works in Node.js, WebContainers, Bolt.new, Vercel, Netlify)
    try {
      const dataDir = path.join(process.cwd(), 'data')
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true })
      }

      const filePath = path.join(dataDir, 'leads.json')
      let leads = []
      if (fs.existsSync(filePath)) {
        try {
          const fileContent = fs.readFileSync(filePath, 'utf-8')
          leads = JSON.parse(fileContent)
        } catch (e) {
          leads = []
        }
      }

      leads.unshift(lead)
      fs.writeFileSync(filePath, JSON.stringify(leads, null, 2), 'utf-8')
    } catch (fsErr) {
      console.warn('[Lead Store Warning] File system write skipped or restricted:', fsErr)
    }

    console.log(`[Lead Created] ID: ${lead.id} - ${lead.name} (${lead.postcode}) - ${lead.goal}`)

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      message: 'Site survey request received successfully.',
    })
  } catch (error) {
    console.error('Error processing survey submission:', error)
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 })
  }
}
