import Image from 'next/image'

export default function Page() {
  return (
    <section>
      <div className="flex flex-col md:items-start">
        <div className="text-[17px] leading-relaxed text-neutral-900 dark:text-neutral-100 space-y-6 md:max-w-4xl">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight mb-4 text-neutral-900 dark:text-neutral-100 text-left max-[420px]:text-center">
            hi! i&apos;m carolyn 👋
          </h1>
        <div
          className="float-right mb-4 w-[190px] min-w-[190px] max-w-[190px] rounded-xl overflow-hidden bg-neutral-50 border-2 border-neutral-300 shadow-sm dark:border-neutral-700 dark:bg-neutral-900 min-[421px]:-mt-2 min-[421px]:ml-4 min-[421px]:mb-4 max-[420px]:float-none max-[420px]:mx-auto max-[420px]:mt-6 max-[420px]:mb-8 max-[420px]:w-[160px] max-[420px]:min-w-[160px] max-[420px]:max-w-[160px]"
        >
            <div className="relative aspect-square w-full">
              <Image
                src="/carolyn.jpg"
                alt="Carolyn Wang"
                fill
              className="object-cover scale-[1.12]"
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
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-500 underline-offset-2 decoration-[0.1em] bg-[#f5ecde] hover:bg-[#e1d4be]"
            >
              uc berkeley
            </a>{' '}
            (go bears!) studying{' '}
            <a
              href="https://eecs.berkeley.edu/cs/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-500 underline-offset-2 decoration-[0.1em] bg-[#f5ecde] hover:bg-[#e1d4be]"
            >
              computer science
            </a>{' '}
            and{' '}
            <a
              href="https://ppl-minor.berkeley.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-500 underline-offset-2 decoration-[0.1em] bg-[#f2e8da] hover:bg-[#e1d4be]"
            >
              politics, philosophy &amp; law (ppl)
            </a>
            . my interests lie in machine learning and social systems.
          </p>
          <p>
            currently i&apos;m busy sidequesting (yay!), but you can find my{' '}
            <a
              href="/archives"
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-500 underline-offset-2 decoration-[0.1em] bg-[#f2e8da] hover:bg-[#e1d4be]"
            >
              past adventures here
            </a>
            . in my free time, i like to{' '}
            <a
              href="/writing"
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-500 underline-offset-2 decoration-[0.1em] bg-[#f2e8da] hover:bg-[#e1d4be]"
            >
              write
            </a>
            ,{' '}
            <a
              href="/hobbies"
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-500 underline-offset-2 decoration-[0.1em] bg-[#f2e8da] hover:bg-[#e1d4be]"
            >
              run
            </a>
            , and perform :)
          </p>
          <p>welcome to my little corner of the internet! 🫶</p>
        </div>
      </div>
    </section>
  )
}
