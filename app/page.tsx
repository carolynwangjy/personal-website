import Image from 'next/image'
import { Caveat } from 'next/font/google'

const caveat = Caveat({ subsets: ['latin'], weight: ['700'] })

export default function Page() {
  return (
    <section>
      <header className="mb-8">
        <h1 className={`${caveat.className} text-[4.25rem] mb-0`}>
          BIO :)
        </h1>
        <svg
          width="118"
          height="8"
          viewBox="0 0 118 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-neutral-900 dark:text-neutral-100 -mt-1"
        >
          <path
            d="M2 4.5C24 3 48 2.6 74 3.6C92.5 4.2 107 5 116 4.8"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </header>

      <div>
        <div
          className="float-right ml-6 mb-5 w-[220px] max-w-[36vw] md:w-[240px]"
          style={{
            shapeOutside: 'circle(50%)',
            shapeMargin: '22px',
          }}
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-full border-2 border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900">
            <Image
              src="/carolyn.jpg"
              alt="Carolyn Wang"
              fill
              className="object-cover"
              priority
            />
          </div>

        </div>

        <div className="text-[18.5px] leading-[1.45] text-neutral-800 dark:text-neutral-200 space-y-4 max-w-3xl">
          <p className="max-w-[54ch] md:max-w-[58ch]">
            hey hey! 👋 i&apos;m carolyn, an undergraduate @ uc berkeley (go
            bears!) studying computer science and politics, philosophy &amp; law
            (ppl). my interests lie in ai/nlp, sociopolitical systems, and public
            service. welcome to my little corner of the internet :)
          </p>

          <div className="space-y-2">
            <p className="text-neutral-700 dark:text-neutral-300">
              currently, i&apos;m:
            </p>
            <ul className="list-disc space-y-1.5 pl-7" />
          </div>
        </div>

        <div className="clear-both" />
      </div>
    </section>
  )
}
