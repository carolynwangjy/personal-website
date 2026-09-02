'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Tab links keep their scroll position (scroll={false}), which is what you want
 * between pages of similar length. But the pages differ a lot — /teaching is
 * many times taller than /hobbies — so carrying a deep position onto a short
 * page leaves it past the end and the browser clamps it to the bottom.
 *
 * That clamp is only a problem when it pushes the tab bar off the top of the
 * screen, which is what strands you at the footer with no way back. On a page
 * short enough that the clamped view still shows the tabs, nothing needs to
 * happen — moving the page then is just noise. So: intervene only when the tabs
 * have scrolled out of view, and then move the least amount that brings them
 * back, rather than jumping to the very top.
 */
export function KeepScroll() {
  const pathname = usePathname()

  useEffect(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    const clamped = window.scrollY > 0 && window.scrollY >= max - 1
    if (!clamped) return

    const nav = document.querySelector('nav[aria-label="sections"]')
    if (nav && nav.getBoundingClientRect().top < 0) {
      nav.scrollIntoView()
    }
  }, [pathname])

  return null
}
