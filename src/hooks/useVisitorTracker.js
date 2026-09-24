// src/hooks/useVisitorTracker.js
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function useVisitorTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const baseUrl = process.env.NEXT_PUBLIC_ENROLL_API

    // Tracking is optional in local development and static previews. Do not
    // crash the entire page when the API URL has not been configured.
    if (baseUrl) {
      const endpoint = `${baseUrl.replace(/\/$/, '')}/api/visitor`

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: pathname }),
      })
        .then(res => {
          if (!res.ok) throw new Error('Visitor API error')
          return res.json()
        })
        .catch(err => console.error('Visitor tracking failed:', err))
    }

    // Notify Discord: prefer sending to our serverless endpoint if available
    const notifyEndpoint = '/api/discord-notify'
    const payload = {
      page: pathname,
      referrer: document.referrer,
      ua: navigator.userAgent,
    }

    fetch(notifyEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => {
        // If serverless endpoint missing (404), fallback to direct webhook call
        if (res.status === 404) {
          const webhook = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK
          if (webhook) {
            return fetch(webhook, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ content: `New visit: ${pathname}` }),
            })
          }
        }
        return res
      })
      .catch(err => {
        // If calling /api/discord-notify fails (static sites), try direct webhook if provided
        const webhook = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK
        if (webhook) {
          fetch(webhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: `New visit: ${pathname}` }),
          }).catch(e => console.error('Discord webhook failed:', e))
        } else {
          console.warn('No Discord webhook configured for fallback')
        }
      })
  }, [pathname])
}
