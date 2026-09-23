'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useLayoutEffect } from 'react'

const TABS = 'nav[aria-label="sections"]'

/** Where the tab row sat on screen when a tab was clicked. */
let anchor: number | null = null

/** Where each section page was when we last left it. */
const positions = new Map<string, number>()

/** Set while a ← back link is the thing navigating. */
let goingBack = false

export function rememberScroll(event: React.MouseEvent) {
  // Cmd-click and friends open a new tab: this page isn't going anywhere, and a
  // measurement left lying around would be applied to some later navigation.
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return
  }
  const nav = document.querySelector(TABS)
  anchor = nav ? nav.getBoundingClientRect().top : null
}

/**
 * A post's ← back link. The browser's own back button puts you back at the spot
 * in the list you left from, and this is the same gesture, so it should land in
 * the same place rather than at the top of the list. A post reached directly,
 * with no list behind it, has no position to return to and goes to the top.
 */
export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      scroll={false}
      className="post-back"
      onClick={(event) => {
        if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
          goingBack = true
        }
      }}
    >
      {children}
    </Link>
  )
}

/**
 * Switching tabs replaces everything below the tab row, and the pages differ a
 * lot in height — /teaching is many times taller than /hobbies. That much change
 * under the viewport is enough for the browser to move you: it clamps a position
 * that no longer exists, and re-anchors around content that just disappeared.
 *
 * What should happen is much simpler. The tab row is the fixed point of these
 * pages, the line you clicked from, so it should sit exactly where it sat and
 * the section under it should change. Not a proportional position, not a jump to
 * the top — the same line, in the same place, on a different tab.
 *
 * So measure it on the way out, measure it again once the new page is in the
 * DOM, and scroll by the difference. Before paint, so nothing is ever seen in
 * the wrong place. A page too short to hold that position clamps on its own,
 * which is the one case where the row has to move and you land near the end.
 */
export function KeepScroll() {
  const pathname = usePathname()

  useLayoutEffect(() => {
    const before = anchor
    anchor = null
    const back = goingBack
    goingBack = false

    if (back) {
      window.scrollTo(0, positions.get(pathname) ?? 0)
    } else if (before !== null) {
      const nav = document.querySelector(TABS)
      const after = nav ? nav.getBoundingClientRect().top : before
      if (after !== before) window.scrollBy(0, after - before)
    }

    // on the way out, note where this page was, in case a ← back link returns
    return () => {
      positions.set(pathname, window.scrollY)
    }
  }, [pathname])

  return null
}
