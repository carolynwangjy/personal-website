import Link from 'next/link'
import { getHobbySections } from './utils'

export default function HobbiesPage() {
  const sections = getHobbySections()

  return (
    <section className="space-y-4 text-[17px] leading-[1.45] text-neutral-800 dark:text-neutral-200 max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight flex items-end">hobbies <span className="ml-2.5 text-[1.2em]" style={{ marginTop: '0.8rem' }}>☕</span></h1>
      <p className="text-neutral-700 dark:text-neutral-300">on a quest for more side quests :D</p>

      
      <ul className="list-disc pl-5 space-y-[1px]">
        {sections.map((section) => (
          <li
            key={section.id}
            className="transition-colors rounded-lg -mx-2 px-2 py-1 list-inside writing-chip"
          >
            <Link
              className="text-neutral-900 dark:text-neutral-100 tracking-tight underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2"
              href={`/hobbies/${section.id}`}
            >
              {section.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
