'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Page() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <section className={`home-bio ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
      <div className="flex flex-col md:items-start">
        <div className="text-[var(--text-body)] leading-relaxed text-neutral-900 dark:text-neutral-100 space-y-6 md:space-y-4 md:max-w-4xl">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight mb-4 text-neutral-900 dark:text-neutral-100 text-left max-[600px]:text-center min-[601px]:mb-0">
            hi! i&apos;m carolyn <span className="ml-1">👋</span>
          </h1>
        <div
          className="float-right mb-4 w-[190px] min-w-[190px] max-w-[190px] rounded-full overflow-hidden border-2 border-neutral-300 shadow-sm dark:border-neutral-700 min-[601px]:mt-2 min-[601px]:ml-10 min-[601px]:mb-4 min-[601px]:mr-4 max-[600px]:float-none max-[600px]:mx-auto max-[600px]:mt-6 max-[600px]:mb-8 max-[600px]:w-[160px] max-[600px]:min-w-[160px] max-[600px]:max-w-[160px]"
        >
          <div className="relative w-full aspect-[9.6/10] overflow-hidden rounded-full">
            <Image
              src="/carolyn-wang.jpg"
              alt="Carolyn Wang"
              fill
              className="object-cover object-[center_70%] "
              priority
            />
          </div>
        </div>
          <p>
            i&apos;m an undergraduate @{' '}
            <a
              href="https://www.berkeley.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] hover:bg-[#f2d6d6] dark:bg-neutral-700/70 dark:hover:bg-neutral-600"
            >
              uc berkeley
            </a>{' '}
            (go bears!) studying{' '}
            <a
              href="https://eecs.berkeley.edu/cs/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] hover:bg-[#f2d6d6] dark:bg-neutral-700/70 dark:hover:bg-neutral-600"
            >
              computer science
            </a>{' '}
            and{' '}
            <a
              href="https://ppl-minor.berkeley.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] hover:bg-[#f5dada] dark:hover:bg-neutral-700/70"
            >
              politics, philosophy &amp; law (ppl)
            </a>{' '}
            as part of the{' '}
            <a
              href="https://eecs.berkeley.edu/resources/undergrads/honors/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] hover:bg-[#f5dada] dark:hover:bg-neutral-700/70"
            >
              eecs honors program
            </a>
            . my interests lie in machine learning and social systems.
          </p>
          <p>
            currently, i&apos;m conducting research at{' '}
            <a
              href="https://sky.cs.berkeley.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] hover:bg-[#f5dada] dark:hover:bg-neutral-700/70"
            >
              sky lab
            </a>
            {' '}and teaching berkeley&apos;s machine learning course (
            <a
              href="https://www.carolynwang.me/teaching"
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] hover:bg-[#f5dada] dark:hover:bg-neutral-700/70"
            >
              cs189
            </a>
            ). in my free time, i like to{' '}
            <a
              href="/hobbies"
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] hover:bg-[#f5dada] dark:hover:bg-neutral-700/70"
            >
              sidequest
            </a>.
            {' '}🫶
          </p>
        </div>
      </div>
    </section>
  )
}
