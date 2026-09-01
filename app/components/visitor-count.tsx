'use client'

import { useEffect, useState } from 'react'

function ordinal(n: number) {
  const rest = n % 100
  const suffix =
    rest >= 11 && rest <= 13
      ? 'th'
      : { 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] ?? 'th'
  return `${n.toLocaleString('en-US')}${suffix}`
}

/**
 * Counts once per browser session, then reads. Renders nothing until the
 * count arrives, and nothing at all when the store isn't configured — so
 * the footer never shows a placeholder or a made-up number.
 */
export function VisitorCount() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let counted = false
    try {
      counted = sessionStorage.getItem('visit-counted') === '1'
      sessionStorage.setItem('visit-counted', '1')
    } catch {
      // private mode or blocked storage: fall through and just count
    }

    fetch(`/api/visits${counted ? '' : '?bump=1'}`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.count === 'number') setCount(data.count)
      })
      .catch(() => {})
  }, [])

  if (count === null) return null

  return <>you’re the {ordinal(count)} visitor. </>
}
