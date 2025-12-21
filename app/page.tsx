import Image from 'next/image'

export default function Page() {
  return (
    <section>
      <div className="flex flex-col md:items-start">
        <div className="text-lg leading-relaxed text-neutral-900 dark:text-neutral-100 space-y-6 md:max-w-4xl">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight mb-4 text-neutral-900 dark:text-neutral-100">
            hi! i&apos;m carolyn 👋
          </h1>
          <div
            className="float-right -mt-2 ml-6 mb-4 w-[175px] max-w-[42vw] md:w-[205px] md:max-w-[220px] rounded-full overflow-hidden bg-neutral-50 border border-neutral-300 shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
          style={{ shapeOutside: 'circle(52%)', shapeMargin: '24px' }}
          >
            <div className="relative aspect-square w-full">
              <Image
                src="/carolyn.jpg"
                alt="Carolyn Wang"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <p>
            i&apos;m an undergraduate @ uc berkeley (go bears!) studying computer science and
            politics, philosophy &amp; law (ppl). my interests lie in machine learning and social
            systems.
          </p>
          <p>
            currently i&apos;m busy sidequesting (yay!), but you can find my past adventures{' '}
            <a
              href="/archives"
              className="rounded bg-[#f2e8da] hover:bg-[#e1d4be] transition-colors underline underline-offset-[2px] decoration-[1.5px]"
            >
              here
            </a>
            . in my free time, i like to{' '}
            <a
              href="/writing"
              className="rounded bg-[#f2e8da] hover:bg-[#e1d4be] transition-colors underline underline-offset-[2px] decoration-[1.5px]"
            >
              write
            </a>
            ,{' '}
            <a
              href="/hobbies"
              className="rounded bg-[#f2e8da] hover:bg-[#e1d4be] transition-colors underline underline-offset-[2px] decoration-[1.5px]"
            >
              run
            </a>{' '}
            , and perform :)
          </p>
          <p>welcome to my little corner of the internet! 🫶</p>
        </div>
      </div>
    </section>
  )
}
