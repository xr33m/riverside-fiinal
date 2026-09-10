import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { firstName, lastName, phone, email, address, message } = body

    const errors: Record<string, string> = {}
    if (!firstName || typeof firstName !== 'string' || !firstName.trim()) errors.firstName = 'First name is required.'
    if (!lastName || typeof lastName !== 'string' || !lastName.trim()) errors.lastName = 'Last name is required.'
    if (!phone || typeof phone !== 'string' || !phone.trim()) errors.phone = 'Phone number is required.'
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Valid email is required.'
    if (!address || typeof address !== 'string' || !address.trim()) errors.address = 'Address is required.'
    if (!message || typeof message !== 'string' || !message.trim()) errors.message = 'Please add a short message.'

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 })
    }

    const submission = {
      id: `MSG-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      address: address.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      userAgent: req.headers.get('user-agent') || 'Unknown',
    }

    try {
      const dataDir = path.join(process.cwd(), 'data')
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true })
      }

      const filePath = path.join(dataDir, 'contact-messages.json')
      let messages = []
      if (fs.existsSync(filePath)) {
        try {
          const fileContent = fs.readFileSync(filePath, 'utf-8')
          messages = JSON.parse(fileContent)
        } catch (e) {
          messages = []
        }
      }

      messages.unshift(submission)
      fs.writeFileSync(filePath, JSON.stringify(messages, null, 2), 'utf-8')
    } catch (fsErr) {
      console.warn('[Contact Store Warning] File system write skipped or restricted:', fsErr)
    }

    console.log(`[Contact Message] ID: ${submission.id} - ${submission.firstName} ${submission.lastName} (${submission.email})`)

    return NextResponse.json({
      success: true,
      messageId: submission.id,
      message: 'Message received successfully.',
    })
  } catch (error) {
    console.error('Error processing contact submission:', error)
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 })
  }
}
