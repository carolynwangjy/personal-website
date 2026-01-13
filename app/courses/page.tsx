'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CoursesPage() {
  const [activeSemester, setActiveSemester] = useState<string | null>(null)

  useEffect(() => {
    // Get the hash from URL on mount and when hash changes
    const updateActiveSemester = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash.startsWith('semester-')) {
        setActiveSemester(hash)
      } else {
        setActiveSemester(null)
      }
    }

    updateActiveSemester()
    window.addEventListener('hashchange', updateActiveSemester)
    return () => window.removeEventListener('hashchange', updateActiveSemester)
  }, [])
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
      term: 'spring 2026',
      courses: [
        'cs 186: database systems',
        'legalst 106wi: philosophy of law',
        'cs 197: 189 course staff - tutor',
      ],
    },
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
        'cs 61c: great ideas in computer architecture (mt, final)',
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
        'cs 70: discrete math & probability theory (mt, final)',
        'cs 61b: data structures & algorithms',
        'pubpol 101: public policy analysis',
        'pubpol 198: cal in the capital decal',
        'cs 197: computer science mentors (61a junior mentor)',
      ],
    },
    {
      term: 'fall 2023',
      courses: [
        'cs 61a: structure & interpretation of computer programs',
        'math 54: linear algebra & differential equations',
        'geog 10ac: worldings: regions, peoples, & states',
        'cs 198: web design decal',
        'cs 198: going down the eecs stack decal',
        'physed 1: circuit weight training',
      ],
    },
  ]

  return (
    <section className="space-y-4 text-[17px] leading-[1.45] text-neutral-800 dark:text-neutral-200 max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">coursework 📚</h1>
      <p className="text-neutral-700 dark:text-neutral-300">exam cheat sheets are linked and free to use as a resource :)</p>

      <div className="space-y-3">
        {semesters.map((semester) => {
          const targetId = `semester-${semester.term.replace(/\s+/g, '-').toLowerCase()}`
          return (
            <div
              key={semester.term}
              id={targetId}
              className={`courses-card border-2 rounded-xl scroll-mt-20 ${
                activeSemester === targetId
                  ? 'border-[#e1d4be] bg-white/80 ring-8 ring-[#f5ecde]/60 dark:border-neutral-700/70 dark:bg-transparent dark:ring-neutral-800/60'
                  : 'border-neutral-200 bg-white/80 dark:border-neutral-700/70 dark:bg-transparent'
              }`}
            >
              <div className="w-full flex items-center justify-between px-4 py-3 text-left">
                <span className="text-lg font-semibold tracking-tight">{semester.term}</span>
              </div>
              <div className="px-6 pb-4 text-[17px] leading-[1.45] text-neutral-800 dark:text-neutral-200">
                <ul className="list-disc space-y-1 pl-5">
                  {semester.courses.map((course, idx) => {
                    const linkClass = "underline decoration-neutral-400 dark:decoration-neutral-500 underline-offset-2 rounded transition-colors hover:bg-[#f2e8da] dark:hover:bg-neutral-700/70"
                    
                    // Check if course contains "materials" and make just that word a link
                    if (course.includes('materials')) {
                      const parts = course.split('materials')
                      return (
                        <li key={idx}>
                          {parts[0]}
                          <Link
                            href="/teaching"
                            className={`materials-link ${linkClass}`}
                          >
                            materials
                          </Link>
                          {parts[1]}
                        </li>
                      )
                    }
                    
                    // Handle exam links (mt1, mt2, etc.)
                    const examLinks: { [key: string]: string } = {}
                    if (course.includes('cs 162')) {
                      if (course.includes('mt1')) {
                        examLinks['mt1'] = 'https://drive.google.com/file/d/14G-38XDzyMTMdJzZzgvrgcKuMx43ks2P/view?usp=drive_link'
                      }
                    } else if (course.includes('cs 170')) {
                      if (course.includes('mt1')) {
                        examLinks['mt1'] = 'https://drive.google.com/file/d/1096Wxnep6WVch_3jDdZYj957QuWKPs-m/view?usp=drive_link'
                      }
                      if (course.includes('mt2')) {
                        examLinks['mt2'] = 'https://drive.google.com/file/d/1GqOqnA1mouGbz47mW9sKDhs_-8HTvRwp/view?usp=drive_link'
                      }
                      if (course.includes('final')) {
                        examLinks['final'] = 'https://drive.google.com/file/d/1fxoMnPoEsBHZ5AEQGPzmI7bkS21MJ4NR/view?usp=drive_link'
                      }
                    } else if (course.includes('cs 70')) {
                      // Check for "mt" specifically in exam context (not "mt1" or "mt2", and not part of "math")
                      if ((course.includes('(mt') || course.includes(', mt') || course.includes('mt,')) && !course.includes('mt1') && !course.includes('mt2')) {
                        examLinks['mt'] = 'https://drive.google.com/file/d/1Q9M7T6yN7B8tCXWEs4cRakDH5mMEKJz4/view?usp=drive_link'
                      }
                      if (course.includes('final')) {
                        examLinks['final'] = 'https://drive.google.com/file/d/1aKD-45na4u_b1jVCQ4I1W-hWnjjhzd1B/view?usp=drive_link'
                      }
                    } else if (course.includes('cs 61c')) {
                      // Check for "mt" specifically in exam context (not "mt1" or "mt2")
                      if ((course.includes('(mt') || course.includes(', mt') || course.includes('mt,')) && !course.includes('mt1') && !course.includes('mt2')) {
                        examLinks['mt'] = 'https://drive.google.com/file/d/1owvuVA5R8ok6EZCR2QsIl94MfRdaWVV5/view?usp=drive_link'
                      }
                      if (course.includes('final')) {
                        examLinks['final'] = 'https://drive.google.com/file/d/1eFUglWlBHXqVXmU3LiNXrEFNvfDPWg3F/view?usp=drive_link'
                      }
                    } else if (course.includes('eecs 126')) {
                      if (course.includes('mt1')) {
                        examLinks['mt1'] = 'https://drive.google.com/file/d/1_xv-2JWBlV3-DrLWOql-2Hx98kDpk2WH/view?usp=drive_link'
                      }
                      if (course.includes('mt2')) {
                        examLinks['mt2'] = 'https://drive.google.com/file/d/1krPB-E5mJwk7FPOYR3woRythdeDPtx1X/view?usp=drive_link'
                      }
                      if (course.includes('final')) {
                        examLinks['final'] = 'https://drive.google.com/file/d/1Qj4rM_W__fBbjimZHFXG8oSIxq4OAeDR/view?usp=drive_link'
                      }
                    }
                    
                    // If there are exam links, render them
                    if (Object.keys(examLinks).length > 0) {
                      const parts: React.ReactNode[] = []
                      let remainingText = course
                      let lastIndex = 0
                      
                      // Sort exam keys by their position in the string to maintain order
                      const examKeys = Object.keys(examLinks).sort((a, b) => {
                        const indexA = remainingText.indexOf(a, lastIndex)
                        const indexB = remainingText.indexOf(b, lastIndex)
                        return indexA - indexB
                      })
                      
                      examKeys.forEach((examKey) => {
                        const examIndex = remainingText.indexOf(examKey, lastIndex)
                        if (examIndex !== -1) {
                          // Add text before the exam link
                          if (examIndex > lastIndex) {
                            parts.push(remainingText.substring(lastIndex, examIndex))
                          }
                          // Add the exam link
                          parts.push(
                            <a
                              key={examKey}
                              href={examLinks[examKey]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={linkClass}
                            >
                              {examKey}
                            </a>
                          )
                          lastIndex = examIndex + examKey.length
                        }
                      })
                      
                      // Add remaining text after the last exam link
                      if (lastIndex < remainingText.length) {
                        parts.push(remainingText.substring(lastIndex))
                      }
                      
                      return <li key={idx}>{parts}</li>
                    }
                    
                    return <li key={idx}>{course}</li>
                  })}
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

