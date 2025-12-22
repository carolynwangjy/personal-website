'use client'

import { useState, useMemo } from 'react'

type MaterialLink = { label: string; url?: string }

type Material = {
  topic: string
  lab: MaterialLink[]
  disc: MaterialLink[]
}

type NacloMaterial = {
  problem: string
  year: string
  round: string
  video: MaterialLink | null
  blankSolution: MaterialLink[]
  popularity?: number
}

type CourseSection = {
  id: string
  shortName: string
  title: string
  subtitle?: string
  columnHeaders: string[]
  materials: Material[] | NacloMaterial[]
}

export default function TeachingPage() {
  const [sortMode, setSortMode] = useState<'year' | 'popularity'>('year')
  const [yearDir, setYearDir] = useState<'desc' | 'asc'>('desc')
  
  const courses: CourseSection[] = [
    {
      id: 'cs61a',
      shortName: 'cs61a',
      title: 'CS 61A: Structure & Interpretation of Computer Programs (Fall 2025)',
      subtitle: 'Lab: Tues 5-6:30pm (Soda 330)\nDiscussion: Thurs 12:30-2pm (Wheeler 106)\nOffice Hours: Wed 7-8pm (Warren 101B)',
      columnHeaders: ['topic', 'lab', 'disc'],
      materials: [
        {
          topic: 'getting started',
          lab: [{label: 'lab00', url: '#'}, {label: 'slides', url: '#'}],
          disc: [{ label: 'disc00', url: '#' }, { label: 'slides', url: '#' }],
        },
        {
          topic: 'functions, control',
          lab: [{ label: 'lab01', url: '#' }, { label: 'slides', url: '#' }],
          disc: [{ label: 'disc01', url: '#' }, { label: 'slides', url: '#' }],
        },
        {
          topic: 'env diagrams, hofs',
          lab: [{ label: 'lab02', url: '#' }, { label: 'slides', url: '#' }],
          disc: [{ label: 'disc02', url: '#' }, { label: 'slides', url: '#' }],
        },
        {
          topic: 'recursion',
          lab: [{ label: 'midterm 1', url: ''}],
          disc: [{ label: 'disc03', url: '#' }, { label: 'slides', url: '#' }],
        },
        {
          topic: 'tree recursion, abstraction',
          lab: [{ label: 'lab03', url: '#' }, { label: 'slides', url: '#' }],
          disc: [{ label: 'disc04', url: '#' }, { label: 'slides', url: '#' }],
        },
        {
          topic: 'trees',
          lab: [{ label: 'lab04', url: '#' }, { label: 'slides', url: '#' }],
          disc: [{ label: 'disc05', url: '#' }, { label: 'slides', url: '#' }],
        },
        {
          topic: 'iterators, generators',
          lab: [{ label: 'lab05', url: '#' }, { label: 'slides', url: '#' }],
          disc: [{ label: 'disc06', url: '#' }, { label: 'slides', url: '#' }],
        },
        {
          topic: 'object oriented programming',
          lab: [{ label: 'lab06', url: '#' }, { label: 'slides', url: '#' }],
          disc: [{ label: 'disc07', url: '#' }, { label: 'slides', url: '#' }],
        },
        {
          topic: 'linked lists',
          lab: [{ label: 'lab07', url: '#' }, { label: 'slides', url: '#' }],
          disc: [{ label: 'disc08', url: '#' }, { label: 'slides', url: '#' }],
        },
        {
          topic: 'concurrency',
          lab: [{ label: 'midterm 2', url: '' }],
          disc: [{ label: 'disc09', url: '#' }, { label: 'slides', url: '#' }],
        },
        {
          topic: 'scheme, scheme lists',
          lab: [{ label: 'lab8', url: '#' }, { label: 'slides', url: '#' }],
          disc: [{ label: 'disc10', url: '#' }, { label: 'slides', url: '#' }],
        },
        {
          topic: 'interpreters',
          lab: [{ label: 'lab9', url: '#' }, { label: 'slides', url: '#' }],
          disc: [{ label: 'disc11', url: '#' }, { label: 'slides', url: '#' }],
        },
        {
          topic: 'macros',
          lab: [{ label: 'lab10', url: '#' }, { label: 'slides', url: '#' }],
          disc: [{ label: 'disc12', url: '#' }, { label: 'slides', url: '#' }],
        },
        {
          topic: 'sql',
          lab: [{ label: 'lab11', url: '#' }, { label: 'slides', url: '#' }],
          disc: [{ label: 'disc13', url: '#' }, { label: 'slides', url: '#' }],
        },
      ],
    },
    {
      id: 'naclo',
      shortName: 'naclo',
      title: 'NACLO: North American Computational Linguistics Olympiad',
      columnHeaders: ['problem', 'year', 'round', 'video', 'pdfs'],
      materials: [
        {
          problem: 'zoink',
          year: "2021",
          round: "round 1",
          video: { label: 'video', url: '#' },
          blankSolution: [{ label: 'blank', url: '#' }, { label: 'solution', url: '#' }],
          popularity: 0,
        },
      ],
    },
  ]

  return (
    <section className="space-y-6 text-[17px] leading-[1.45] text-neutral-800 dark:text-neutral-200 max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">teaching</h1>
      
      <div className="flex flex-wrap gap-2 pt-1">
        {courses.map((course) => (
          <a
            key={course.id}
            href={`#${course.id}`}
            className="rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition flex items-center gap-2 border-[#efe2c8] bg-[#f5ecde] text-neutral-900 hover:bg-[#e1d4be] hover:border-[#e2d2b3]"
          >
            <span>{course.shortName}</span>
          </a>
        ))}
      </div>

      {courses.map((course, courseIdx) => {
        // Sort NACLO materials by year or popularity
        const sortedMaterials = course.id === 'naclo' 
          ? [...course.materials].sort((a, b) => {
              const aItem = a as NacloMaterial
              const bItem = b as NacloMaterial
              
              if (sortMode === 'popularity') {
                const aPop = aItem.popularity ?? 0
                const bPop = bItem.popularity ?? 0
                return bPop - aPop // Descending (most popular first)
              } else {
                const aYear = parseInt(aItem.year)
                const bYear = parseInt(bItem.year)
                return yearDir === 'desc' ? bYear - aYear : aYear - bYear
              }
            })
          : course.materials

        return (
        <div key={courseIdx} id={course.id} className="space-y-3 scroll-mt-20">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">{course.title}</h2>
            {course.subtitle && (
              <ul className="text-base text-neutral-700 dark:text-neutral-300 mt-1 list-disc pl-5 space-y-0.5">
                {course.subtitle.split('\n').map((line, idx) => (
                  <li key={idx}>{line.trim()}</li>
                ))}
              </ul>
            )}
            {course.id === 'naclo' && (
              <div className="text-base text-neutral-800 dark:text-neutral-200 flex flex-wrap items-center gap-2 mt-3">
                <span className="text-neutral-700 dark:text-neutral-300">sort by:</span>
                <button
                  type="button"
                  onClick={() => {
                    if (sortMode === 'year') {
                      setYearDir((d) => (d === 'desc' ? 'asc' : 'desc'))
                    } else {
                      setSortMode('year')
                    }
                  }}
                  className={[
                    'px-1 rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2 decoration-[0.1em]',
                    sortMode === 'year'
                      ? 'text-neutral-900 dark:text-neutral-100 bg-[#f2e8da] hover:bg-[#e1d4be]'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-[#f2e8da] dark:hover:bg-neutral-800/70',
                  ].join(' ')}
                >
                  year {yearDir === 'desc' ? '↓' : '↑'}
                </button>
                <span>|</span>
                <button
                  type="button"
                  onClick={() => setSortMode('popularity')}
                  className={[
                    'px-1 rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2 decoration-[0.1em]',
                    sortMode === 'popularity'
                      ? 'text-neutral-900 dark:text-neutral-100 bg-[#f2e8da] hover:bg-[#e1d4be]'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-[#f2e8da] dark:hover:bg-neutral-800/70',
                  ].join(' ')}
                >
                  most popular
                </button>
              </div>
            )}
          </div>
          {sortedMaterials.length > 0 ? (
            <div className="border border-neutral-200 bg-white/80 rounded-xl dark:border-neutral-700/70 dark:bg-transparent overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700/70">
                      {course.columnHeaders.map((header, idx) => (
                        <th key={idx} className="px-4 py-3 text-left text-lg font-semibold tracking-tight">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sortedMaterials.map((item, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-neutral-200 dark:border-neutral-700/70 last:border-b-0"
                      >
                        {course.columnHeaders.map((header) => {
                          if (course.id === 'naclo') {
                            const nacloItem = item as NacloMaterial
                            // Map header names to property names
                            const headerToProp: Record<string, keyof NacloMaterial> = {
                              'pdfs': 'blankSolution',
                            }
                            const propName = headerToProp[header] || header
                            const value = nacloItem[propName as keyof NacloMaterial]
                            
                            if (header === 'video') {
                              return (
                                <td key={header} className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                                  {value && typeof value === 'object' && value !== null && 'url' in value ? (
                                    <a
                                      href={value.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2 decoration-[0.1em] hover:bg-[#fbf4e6] dark:hover:bg-neutral-800/70"
                                    >
                                      {value.label}
                                    </a>
                                  ) : (
                                    '—'
                                  )}
                                </td>
                              )
                            }
                            
                            if (header === 'pdfs') {
                              const links = value as MaterialLink[]
                              return (
                                <td key={header} className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                                  {Array.isArray(links) && links.length > 0 ? (
                                    links.length === 1 ? (
                                      <div className="flex justify-center">
                                        {links[0].url && links[0].url.trim() !== '' ? (
                                          <a
                                            href={links[0].url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2 decoration-[0.1em] hover:bg-[#fbf4e6] dark:hover:bg-neutral-800/70"
                                          >
                                            {links[0].label}
                                          </a>
                                        ) : (
                                          <span>{links[0].label}</span>
                                        )}
                                      </div>
                                    ) : (
                                      <span className="flex flex-wrap gap-1">
                                        {links.map((link, linkIdx) => (
                                          <span key={linkIdx}>
                                            {link.url && link.url.trim() !== '' ? (
                                              <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2 decoration-[0.1em] hover:bg-[#fbf4e6] dark:hover:bg-neutral-800/70"
                                              >
                                                {link.label}
                                              </a>
                                            ) : (
                                              <span>{link.label}</span>
                                            )}
                                            {linkIdx < links.length - 1 && ' / '}
                                          </span>
                                        ))}
                                      </span>
                                    )
                                  ) : (
                                    '—'
                                  )}
                                </td>
                              )
                            }
                            
                            return (
                              <td key={header} className="px-4 py-3 text-neutral-800 dark:text-neutral-200">
                                {typeof value === 'string' ? value : '—'}
                              </td>
                            )
                          } else {
                            const materialItem = item as Material
                            const value = materialItem[header as keyof Material]
                            
                            if (header === 'lab' || header === 'disc') {
                              const links = value as MaterialLink[]
                              return (
                                <td key={header} className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                                  {Array.isArray(links) && links.length > 0 ? (
                                    links.length === 1 ? (
                                      <div className="flex justify-center">
                                        {links[0].url && links[0].url.trim() !== '' ? (
                                          <a
                                            href={links[0].url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2 decoration-[0.1em] hover:bg-[#fbf4e6] dark:hover:bg-neutral-800/70"
                                          >
                                            {links[0].label}
                                          </a>
                                        ) : (
                                          <span>{links[0].label}</span>
                                        )}
                                      </div>
                                    ) : (
                                      <span className="flex flex-wrap gap-1">
                                        {links.map((link, linkIdx) => (
                                          <span key={linkIdx}>
                                            {link.url && link.url.trim() !== '' ? (
                                              <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2 decoration-[0.1em] hover:bg-[#fbf4e6] dark:hover:bg-neutral-800/70"
                                              >
                                                {link.label}
                                              </a>
                                            ) : (
                                              <span>{link.label}</span>
                                            )}
                                            {linkIdx < links.length - 1 && ' / '}
                                          </span>
                                        ))}
                                      </span>
                                    )
                                  ) : (
                                    '—'
                                  )}
                                </td>
                              )
                            }
                            
                            return (
                              <td key={header} className="px-4 py-3 text-neutral-800 dark:text-neutral-200">
                                {typeof value === 'string' ? value : '—'}
                              </td>
                            )
                          }
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-neutral-600 dark:text-neutral-400">Coming soon.</p>
          )}
        </div>
        )
      })}
    </section>
  )
}


