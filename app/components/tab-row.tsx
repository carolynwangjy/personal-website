'use client'

import React, { useLayoutEffect, useRef } from 'react'

/**
 * Lays out the tab row on narrow screens, where it doesn't fit one line. The
 * row moves only by its arrows, a page at a time: tabs that don't fit whole
 * are clipped away, and an arrow sits beside the outermost tab showing.
 *
 * Self-contained (it uses no outside names) so the same code can also run as
 * an inline script, laying the row out before first paint instead of after
 * hydration. It only writes to the wrapper and the arrows, never the tabs.
 */
function tabRowKit() {
  /** arrow width, in ems of the tab text; matches `.tab-arrow` in global.css */
  const ARROW_EM = 1.6

  type Layout = {
    nav: HTMLElement
    /** each tab's left and right edge, measured from the start of the row */
    tabs: { left: number; right: number }[]
    /** visible width of the row */
    width: number
    arrow: number
  }

  function measure(box: HTMLElement): Layout {
    const nav = box.querySelector('nav') as HTMLElement
    const row = nav.getBoundingClientRect()
    const tabs = Array.from(nav.querySelectorAll('a')).map((tab) => {
      const r = tab.getBoundingClientRect()
      return { left: r.left - row.left + nav.scrollLeft, right: r.right - row.left + nav.scrollLeft }
    })
    const arrow = parseFloat(getComputedStyle(nav).fontSize) * ARROW_EM
    return { nav, tabs, width: nav.clientWidth, arrow }
  }

  /** room added past the last tab so the last page can line up (see goTo) */
  function room(box: HTMLElement) {
    return parseFloat(box.style.getPropertyValue('--room')) || 0
  }

  /**
   * Which tabs fit whole on the page that starts at scroll position `start`. An
   * arrow takes room on each side that has more tabs past it.
   */
  function shownAt(layout: Layout, start: number) {
    const { tabs, width, arrow } = layout
    const min = start + (start > 0.5 ? arrow : 0)
    const max = start + width - (tabs[tabs.length - 1].right > start + width + 1 ? arrow : 0)
    const shown: number[] = []
    tabs.forEach((tab, i) => {
      if (tab.left >= min - 0.5 && tab.right <= max + 0.5) shown.push(i)
    })
    return shown
  }

  /**
   * The page after this one: the next tab past the ones showing becomes the
   * first. Pages don't share tabs, so each tab belongs to exactly one page.
   */
  function nextPage(layout: Layout, start: number) {
    const shown = shownAt(layout, start)
    if (!shown.length) return null
    const last = shown[shown.length - 1]
    if (last === layout.tabs.length - 1) return null
    return layout.tabs[last + 1].left - layout.arrow
  }

  /**
   * The page before this one: the tab just before the ones showing becomes the
   * last. It starts at the leftmost tab that still leaves room for that one
   * before the arrow.
   */
  function prevPage(layout: Layout, start: number) {
    if (start <= 0.5) return null
    const { tabs, width, arrow } = layout
    const shown = shownAt(layout, start)
    if (!shown.length || shown[0] === 0) return 0
    const before = tabs[shown[0] - 1]
    for (let i = 0; i < tabs.length; i++) {
      const page = i === 0 ? 0 : tabs[i].left - arrow
      if (before.right <= page + width - arrow + 0.5) return page
    }
    return 0
  }

  /**
   * Scrolls to the page starting at `left`. The last page usually starts past
   * where the row can scroll to, so add just enough room after the last tab to
   * reach it; it reads as the end of a line.
   */
  function goTo(box: HTMLElement, left: number, smooth: boolean) {
    const nav = box.querySelector('nav') as HTMLElement
    const end = nav.scrollWidth - room(box) - nav.clientWidth
    if (left > end) box.style.setProperty('--room', `${left - end}px`)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    nav.scrollTo({ left, behavior: smooth && !reduce ? 'smooth' : 'auto' })
  }

  /**
   * Clips the row to the tabs that fit whole, and puts each arrow right beside
   * the outermost tab showing on a side with more tabs past it.
   */
  function render(box: HTMLElement) {
    const layout = measure(box)
    const { nav, tabs, width, arrow } = layout
    const start = nav.scrollLeft
    const left = box.querySelector('.tab-arrow.left') as HTMLElement
    const right = box.querySelector('.tab-arrow.right') as HTMLElement

    // drop the added room as the row scrolls back out of it (only while moving
    // left: shrinking it mid-scroll to the right would cut that scroll short)
    const end = nav.scrollWidth - room(box) - nav.clientWidth
    const box_ = box as HTMLElement & { lastLeft?: number }
    if (start < (box_.lastLeft || 0) && room(box) && start - end < room(box)) {
      box.style.setProperty('--room', `${Math.max(0, start - end)}px`)
    }
    box_.lastLeft = start

    const shown = shownAt(layout, start)
    // a pixel of slack: scroll positions can land on fractions
    const moreLeft = start > 1
    const moreRight = tabs[tabs.length - 1].right > start + width + 1
    if (!shown.length || (!moreLeft && !moreRight)) {
      box.style.setProperty('--clip-l', '0px')
      box.style.setProperty('--clip-r', '0px')
      left.hidden = true
      right.hidden = true
      return
    }
    const first = tabs[shown[0]]
    const last = tabs[shown[shown.length - 1]]
    box.style.setProperty('--clip-l', `${moreLeft ? first.left - start : 0}px`)
    box.style.setProperty('--clip-r', `${moreRight ? start + width - last.right : 0}px`)
    left.hidden = !moreLeft
    left.style.left = `${first.left - start - arrow}px`
    right.hidden = !moreRight
    right.style.left = `${last.right - start}px`
  }

  /** Moves one page; what an arrow does. */
  function turnPage(box: HTMLElement, direction: number) {
    const layout = measure(box)
    const start = layout.nav.scrollLeft
    const page = direction > 0 ? nextPage(layout, start) : prevPage(layout, start)
    if (page !== null) goTo(box, page, true)
  }

  /** Opens on the first page that shows the current tab. */
  function showCurrentTab(box: HTMLElement) {
    const layout = measure(box)
    const current = Array.from(layout.nav.querySelectorAll('a')).findIndex((tab) =>
      tab.hasAttribute('aria-current')
    )
    let page: number | null = 0
    if (current !== -1) {
      while (page !== null && shownAt(layout, page).indexOf(current) === -1) {
        page = nextPage(layout, page)
      }
    }
    goTo(box, page || 0, false)
    render(box)
  }

  /** Puts the row back at a scroll position it had on the page before. */
  function restore(box: HTMLElement, left: number) {
    goTo(box, left, false)
    render(box)
  }

  return { render, turnPage, showCurrentTab, restore }
}

const kit = tabRowKit()

/** runs while the HTML is still loading, right after the row it lays out */
const INLINE = `(${tabRowKit.toString()})().showCurrentTab(document.currentScript.parentElement)`

/** For KeepScroll, which knows whether the last page was left by a tab click. */
export function placeTabs(nav: HTMLElement, left: number | null) {
  const box = nav.closest<HTMLElement>('.tab-row')
  if (!box) return
  if (left === null) kit.showCurrentTab(box)
  else kit.restore(box, left)
}

export function TabRow({ children }: { children: React.ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null)

  // a layout effect, so a row arriving by client navigation is also laid out
  // before it is first painted
  useLayoutEffect(() => {
    const box = wrapper.current
    const nav = box?.querySelector('nav')
    if (!box || !nav) return
    const update = () => kit.render(box)
    update()
    nav.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      nav.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  function turn(direction: number) {
    if (wrapper.current) kit.turnPage(wrapper.current, direction)
  }

  // suppressHydrationWarning: the inline script may have set these elements'
  // style and hidden attributes before React reaches them
  return (
    <div className="tab-row" ref={wrapper} suppressHydrationWarning>
      {children}
      <button
        type="button"
        className="tab-arrow left"
        aria-label="scroll tabs left"
        hidden
        suppressHydrationWarning
        onClick={() => turn(-1)}
      >
        «
      </button>
      <button
        type="button"
        className="tab-arrow right"
        aria-label="scroll tabs right"
        hidden
        suppressHydrationWarning
        onClick={() => turn(1)}
      >
        »
      </button>
      <script dangerouslySetInnerHTML={{ __html: INLINE }} suppressHydrationWarning />
    </div>
  )
}
