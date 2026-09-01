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
 * count arrives, nothing when the store isn't configured, and nothing for a
 * count below 1 — "you're the 0th visitor" is never a sentence worth showing.
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

    async function load() {
      const read = await fetch(`/api/visits${counted ? '' : '?bump=1'}`)
      let { count } = await read.json()

      // this session says it already counted, but the store is empty — the
      // count was reset or expired, so count now rather than showing a zero
      if (counted && count === 0) {
        ;({ count } = await (await fetch('/api/visits?bump=1')).json())
      }

      if (typeof count === 'number' && count > 0) setCount(count)
    }

    load().catch(() => {})
  }, [])

  if (count === null) return null

  return <>you’re the {ordinal(count)} visitor. </>
}
