'use client'

import { usePathname } from 'next/navigation'
import React, { useLayoutEffect } from 'react'

const TABS = 'nav[aria-label="sections"]'

/** Where the tab row sat on screen when a tab was clicked. */
let anchor: number | null = null

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
    if (before === null) return

    const nav = document.querySelector(TABS)
    if (!nav) return

    const after = nav.getBoundingClientRect().top
    if (after !== before) window.scrollBy(0, after - before)
  }, [pathname])

  return null
}
