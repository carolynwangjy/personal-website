'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Tab links keep their scroll position (scroll={false}), which is what you
 * want between pages of similar length. But /teaching is far taller than the
 * rest, so carrying a deep position onto a short page leaves it past the end
 * and the browser clamps it — landing you at the bottom for no reason.
 *
 * Landing pinned to the very bottom right after a navigation is that clamp,
 * so treat it as "this position doesn't exist here" and go to the top.
 */
export function KeepScroll() {
  const pathname = usePathname()

  useEffect(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    if (window.scrollY > 0 && window.scrollY >= max - 1) {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}
