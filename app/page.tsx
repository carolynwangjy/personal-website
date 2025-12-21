import Image from 'next/image'

export default function Page() {
  return (
    <section>
      <div className="flex flex-col md:items-start">
        <div className="text-[17px] leading-relaxed text-neutral-900 dark:text-neutral-100 space-y-6 md:max-w-4xl">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight mb-4 text-neutral-900 dark:text-neutral-100">
            hi! i&apos;m carolyn 👋
          </h1>
        <div
          className="float-right -mt-2 ml-4 mb-4 w-[160px] max-w-[38vw] md:w-[190px] md:max-w-[210px] rounded-xl overflow-hidden bg-neutral-50 border-2 border-neutral-300 shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
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
            i&apos;m an undergraduate @ uc berkeley (go bears!) studying computer science and
            politics, philosophy &amp; law (ppl). my interests lie in machine learning and social
            systems.
          </p>
          <p>
            currently i&apos;m busy sidequesting (yay!), but you can find my past adventures{' '}
            <a
              href="/archives"
              className="rounded bg-[#f2e8da] hover:bg-[#e1d4be] transition-colors"
            >
              here
            </a>
            . in my free time, i like to{' '}
            <a
              href="/writing"
              className="rounded bg-[#f2e8da] hover:bg-[#e1d4be] transition-colors"
            >
              write
            </a>
            ,{' '}
            <a
              href="/hobbies"
              className="rounded bg-[#f2e8da] hover:bg-[#e1d4be] transition-colors"
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
