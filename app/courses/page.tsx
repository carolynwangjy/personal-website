export default function CoursesPage() {
  const getBubbleLabel = (term: string) => {
    if (term.startsWith('fall ')) {
      const year = term.split(' ')[1]
      return `fa${year.slice(-2)}`
    }
    if (term.startsWith('spring ')) {
      const year = term.split(' ')[1]
      return `spr${year.slice(-2)}`
    }
    if (term.startsWith('summer ')) {
      const year = term.split(' ')[1]
      return `su${year.slice(-2)}`
    }
    return term
  }

  const semesters = [
    {
      term: 'fall 2025',
      courses: [
        'cs 162: operating systems & system programming (mt1)',
        'cs 189: machine learning',
        'cs 375: teaching techniques for computer science',
        'nusctx 10: human nutrition',
        'cs 399: 61a course staff - teaching assistant (materials)',
      ],
    },
    {
      term: 'spring 2025',
      courses: [
        'eecs 126: probability & random processes (mt1, mt2, final)',
        'data 100: principles & techniques of data science',
        'cs 39: technology, society, & power',
        'cs 198: computational game theory',
        'cs 197: 61a course staff - tutor',
      ],
    },
    {
      term: 'fall 2024',
      courses: [
        'cs 170: efficient algorithms & intractable problems (mt1, mt2, final)',
        'cs 61c: great ideas in computer architecture (mt1, mt2, final)',
        'data 8: foundations of data science',
        'cs 197: 61a course staff - tutor',
      ],
    },
    {
      term: 'summer 2024',
      courses: ['math 004a: multivariable calculus*'],
    },
    {
      term: 'spring 2024',
      courses: [
        'cs 70: discrete math & probability theory (mt1, mt2, final)',
        'cs 61b: data structures & algorithms',
        'pubpol 101: public policy analysis (final)',
        'pubpol 198: cal in the capital decal',
        'cs 197: computer science mentors (6la junior mentor)',
      ],
    },
    {
      term: 'fall 2023',
      courses: [
        'cs 61a: structure & interpretation of computer programs',
        'math 54: linear algebra & differential equations',
        'geog10ac: worldings: regions, peoples, & states',
        'cs 198: web design decal',
        'cs 198: going down the eecs stack decal',
        'physed 1: circuit weight training',
      ],
    },
  ]

  return (
    <section className="space-y-4 text-[17px] leading-[1.45] text-neutral-800 dark:text-neutral-200 max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">coursework 📚</h1>
      <p className="text-neutral-700 dark:text-neutral-300">exam cheat sheets are linked too and free to use as a resource :)</p>

      <div className="flex flex-wrap gap-2 pt-1">
        {semesters.map((semester) => {
          const targetId = `semester-${semester.term.replace(/\s+/g, '-').toLowerCase()}`
          return (
            <a
              key={semester.term}
              href={`#${targetId}`}
              className="rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition flex items-center gap-2 border-[#efe2c8] bg-[#f5ecde] text-neutral-900 hover:bg-[#e1d4be] hover:border-[#e2d2b3]"
            >
              <span>{getBubbleLabel(semester.term)}</span>
            </a>
          )
        })}
      </div>

      <div className="space-y-3">
        {semesters.map((semester) => {
          const targetId = `semester-${semester.term.replace(/\s+/g, '-').toLowerCase()}`
          return (
            <div
              key={semester.term}
              id={targetId}
              className="border border-neutral-200 bg-white/80 rounded-xl scroll-mt-20 dark:border-neutral-700/70 dark:bg-transparent"
            >
              <div className="w-full flex items-center justify-between px-4 py-3 text-left">
                <span className="text-lg font-semibold tracking-tight">{semester.term}</span>
              </div>
              <div className="px-6 pb-4 text-[17px] leading-[1.45] text-neutral-800 dark:text-neutral-200">
                <ul className="list-disc space-y-1 pl-5">
                  {semester.courses.map((course, idx) => (
                    <li key={idx}>{course}</li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4">
        * accredited courses taken outside of uc berkeley
      </p>
    </section>
  )
}

