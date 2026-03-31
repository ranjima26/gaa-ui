// Server-side API route to forward notifications to a Discord webhook.
// Requires DISCORD_WEBHOOK_URL (not public) to be set in environment on the server.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const webhook = process.env.DISCORD_WEBHOOK_URL
    if (!webhook) {
      return res.status(500).json({ error: 'DISCORD_WEBHOOK_URL not configured' })
    }

    const body = req.body || {}
    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'

    let embed

    // Distinguish between visit and enrollment payloads
    if (body.type === 'enroll' || body.name || body.email) {
      embed = {
        title: 'New Enrollment Submitted',
        fields: [
          { name: 'Name', value: body.name || 'N/A', inline: true },
          { name: 'Email', value: body.email || 'N/A', inline: true },
          { name: 'Phone', value: body.phone || 'N/A', inline: true },
          { name: 'City', value: body.city || 'N/A', inline: true },
          { name: 'Qualification', value: body.qualification || 'N/A', inline: true },
          { name: 'Course', value: body.course || 'N/A', inline: true },
          { name: 'IP', value: ip, inline: false },
        ],
        timestamp: new Date().toISOString(),
      }
    } else {
      embed = {
        title: 'New site visit',
        fields: [
          { name: 'Page', value: body.page || 'unknown', inline: true },
          { name: 'Referrer', value: body.referrer || 'none', inline: true },
          { name: 'IP', value: ip, inline: true },
          { name: 'User Agent', value: body.ua || 'unknown' },
        ],
        timestamp: new Date().toISOString(),
      }
    }

    const payload = { content: null, embeds: [embed] }

    // Use global fetch (Node 18+) available in Next.js server runtime
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('discord-notify error:', err)
    return res.status(500).json({ error: 'Notification failed' })
  }
}
