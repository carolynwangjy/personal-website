type YearItem = { label: string }

const data: { year: string; items: YearItem[] }[] = [
  {
    year: '2025',
    items: [
      { label: "taught berkeley's cs61a course, leading the cs scholars program" },
      { label: 'ran the eecs-dept sponsored cs kickstart program' },
      { label: 'built ai agents for finance reconciliation systems at amazon' },
    ],
  },
  {
    year: '2024',
    items: [
      { label: 'conducted ai + election research at the brookings institution' },
      { label: 'building tech policy opportunities at the paragon policy fellowship' },
      { label: 'authored for the tech policy press' },
    ],
  },
  {
    year: '2023 - prior',
    items: [
      { label: 'wrote for the berkeley political review' },
      { label: 'led the saratoga falcon newspaper' },
      { label: 'served on the city of saratoga\'s youth commission' },
    ],
  },
]

export default function ArchivesPage() {
  return (
    <section className="space-y-4 text-[17px] leading-[1.45] text-neutral-800 dark:text-neutral-200 max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">experience</h1>
      <p className="text-neutral-700 dark:text-neutral-300">some things i've been up to :)</p>

      <div className="flex flex-wrap gap-2 pt-1">
        {data.map((entry) => {
          const targetId = `year-${entry.year.replace(/\s+/g, '-').toLowerCase()}`
          return (
            <a
              key={entry.year}
              href={`#${targetId}`}
              className="rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition flex items-center gap-2 border-[#d9c8aa] bg-[#f2e8da] text-neutral-900 hover:bg-[#e1d4be] hover:border-[#cbb896]"
            >
              <span>{entry.year}</span>
            </a>
          )
        })}
      </div>

      <div className="space-y-3">
        {data.map((entry) => {
          const targetId = `year-${entry.year.replace(/\s+/g, '-').toLowerCase()}`
          return (
            <div
              key={entry.year}
              id={targetId}
              className="border border-neutral-200 bg-white/80 rounded-xl scroll-mt-20"
            >
              <div className="w-full flex items-center justify-between px-4 py-3 text-left">
                <span className="text-lg font-semibold tracking-tight">{entry.year}</span>
              </div>
              <div className="px-6 pb-4 text-[17px] leading-[1.45] text-neutral-800 dark:text-neutral-200">
                <ul className="list-disc space-y-1.5 pl-5">
                  {entry.items.map((item, idx) => (
                    <li key={idx}>{item.label}</li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
