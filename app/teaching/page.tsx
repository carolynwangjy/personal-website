'use client'

import React, { useState, useMemo } from 'react'

function parseLinks(text: string): React.ReactNode {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match
  let key = 0

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }
    const linkText = match[1]
    const linkUrl = match[2]
    const isExternal = linkUrl.startsWith('http://') || linkUrl.startsWith('https://')
    parts.push(
      <a
        key={key++}
        href={linkUrl}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="underline decoration-neutral-400 dark:decoration-neutral-500 underline-offset-2 rounded transition-colors hover:bg-[#f2e8da] dark:hover:bg-neutral-700/70"
      >
        {linkText}
      </a>
    )
    lastIndex = linkRegex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return parts.length > 0 ? parts : text
}

type MaterialLink = { label: string; url?: string }

type Material = {
  topic: string
  lab?: MaterialLink[]
  disc?: MaterialLink[]
  video?: MaterialLink[]
  pdfs?: MaterialLink[]
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
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [sortMode, setSortMode] = useState<'year' | 'popularity'>('year')
  const [yearDir, setYearDir] = useState<'desc' | 'asc'>('desc')
  
  const courses: CourseSection[] = [
    {
      id: 'cs189',
      shortName: 'cs189',
      title: 'CS 189: Introduction to Machine Learning (Spring 2026)',
      subtitle: 'Course Website: [eecs189.org](https://eecs189.org)',
      columnHeaders: ['topic', 'video', 'pdfs'],
      materials: [
        {
          topic: 'disc01: math review & data processing',
          video: [{label: 'video', url: 'https://www.youtube.com/watch?v=dTdHuJEHOsM&list=PL-ysCubq-Sa8_GGY5otoIkzjneKo-qfW3'}],
          pdfs: [{label: 'blank', url: 'https://drive.google.com/file/d/13TjzfhCv8lbf8pxoQjOx4RoEY0oS5-9b/view'}, {label: 'solution', url: 'https://drive.google.com/file/u/1/d/1rvdrRJ6YBEDrIhxeulEjq80H1iI2qwVR/view?usp=sharing'}, {label: 'notes', url: 'https://drive.google.com/file/d/1ePY_SImeT7HDDrlbuU8F8e064tpxd5Gb/view?usp=drive_link'}],
        },
        {
          topic: 'disc02: machine learning design',
          video: [{label: 'video', url: 'https://www.youtube.com/watch?v=Mf4deCkjUkQ&list=PL-ysCubq-Sa9uYDjsrzfmPCLLbjfOKVPd&index=2'}],
          pdfs: [{label: 'blank', url: 'https://drive.google.com/file/d/1MZs3r4ZOMhKUTAXjvLU9lxeCvGCUq1ND/view'}, {label: 'solution', url: 'https://drive.google.com/file/d/1-WUgqsS3b51pib-68iFYLFbWkBoBzdaM/view'}, {label: 'notes', url: 'https://drive.google.com/file/d/1ms5ml4mNaTGyyumOxf9Xjw0Y-ZzoUreo/view?usp=drive_link'}],
        },
        {
          topic: 'hw01 (written): math refresher',
          video: [{label: 'video', url: ''}],
          pdfs: [{label: 'blank', url: ''}, {label: 'solution', url: ''}, {label: 'notes', url: ''}],
        },  
      ],
    },
    {
      id: 'cs61a',
      shortName: 'cs61a',
      title: 'CS 61A: Structure & Interpretation of Computer Programs (Fall 2025)',
      subtitle: 'Lab: Tues 5-6:30pm (Soda 330)\nDiscussion: Thurs 12:30-2pm (Wheeler 106)\nOffice Hours: Wed 7-8pm (Warren 101B)\nCourse Website: [cs61a.org](https://cs61a.org)',
      columnHeaders: ['topic', 'lab', 'disc'],
      materials: [
        {
          topic: 'getting started',
          lab: [{label: 'lab00', url: 'https://cs61a.org/lab/lab00/'}, {label: 'slides', url: 'https://docs.google.com/presentation/d/12CbiBXRsFzIPn4Fi7QbJnWfbERbclNwRark3Y5Gq2GU/edit?usp=drive_link'}],
          disc: [{ label: 'disc00', url: 'https://cs61a.org/disc/disc00/' }, { label: 'slides', url: 'https://docs.google.com/presentation/d/1D6UYaZNJAAFKSjf5qnQx3X-HlOFhbuBnXmBOCMWWWUA/edit?usp=drive_link' }],
        },
        {
          topic: 'functions, control',
          lab: [{ label: 'lab01', url: 'https://cs61a.org/lab/lab01/' }, { label: 'slides', url: 'https://docs.google.com/presentation/d/12CbiBXRsFzIPn4Fi7QbJnWfbERbclNwRark3Y5Gq2GU/edit?usp=drive_link' }],
          disc: [{ label: 'disc01', url: 'https://cs61a.org/disc/disc01/' }, { label: 'slides', url: 'https://docs.google.com/presentation/d/1AZBRndzm7sY9YlcRNmRCAb49ip6ulaMYgBeCgHit9gI/edit?usp=drive_link' }],
        },
        {
          topic: 'env diagrams, hofs',
          lab: [{ label: 'lab02', url: 'https://cs61a.org/lab/lab02/' }, { label: 'slides', url: 'https://docs.google.com/presentation/d/1RnxgvnqVrfcV_kr3KjzSY_WID-NGrodKLZX-5xGIKFM/edit?usp=drive_link' }],
          disc: [{ label: 'disc02', url: 'https://cs61a.org/disc/disc02/' }, { label: 'slides', url: 'https://docs.google.com/presentation/d/1FWISIYHIVu-pnnpps9Hz2SH5RmOvrfws2P2knEt6Z5Q/edit?usp=drive_link' }],
        },
        {
          topic: 'recursion',
          lab: [{ label: 'midterm 1', url: ''}],
          disc: [{ label: 'disc03', url: 'https://cs61a.org/disc/disc03/' }, { label: 'slides', url: 'https://docs.google.com/presentation/d/1TtBvO_yWu3FRx2_D3cTw8g_S0T4TBVAWQU_32VY0XFQ/edit?usp=drive_link' }],
        },
        {
          topic: 'tree recursion, abstraction',
          lab: [{ label: 'lab03', url: 'https://cs61a.org/lab/lab03/' }, { label: 'slides', url: 'https://docs.google.com/presentation/d/1MU653xwO5e96QFwjBUiRaGgApkoX4EbxBvcizHcFk9M/edit?usp=drive_link' }],
          disc: [{ label: 'disc04', url: 'https://cs61a.org/disc/disc04/' }, { label: 'slides', url: 'https://docs.google.com/presentation/d/1hZ6hrmpGNHmyrTgiROqNHXymf8HymYtzfm2kry6AM14/edit?usp=drive_link' }],
        },
        {
          topic: 'trees',
          lab: [{ label: 'lab04', url: 'https://cs61a.org/lab/lab04/' }, { label: 'slides', url: 'https://docs.google.com/presentation/d/1X0OfO16McwA4e5SnodFb0RUWP4-qXcOrjd4MyXOOWjg/edit?usp=drive_link' }],
          disc: [{ label: 'disc05', url: 'https://cs61a.org/disc/disc05/' }, { label: 'slides', url: 'https://docs.google.com/presentation/d/1atc_D9Myaf8m2fDB79KGYlCNL7gUAvyzWQZ2gdAelRk/edit?usp=drive_link' }],
        },
        {
          topic: 'iterators, generators',
          lab: [{ label: 'lab05', url: 'https://cs61a.org/lab/lab05/' }, { label: 'slides', url: 'https://docs.google.com/presentation/d/1OeysgmPvYl85fA8JpLeyuRR2dbsRfi_ETEezGqzw4as/edit?usp=drive_link' }],
          disc: [{ label: 'disc06', url: 'https://cs61a.org/disc/disc06/' }, { label: 'slides', url: 'https://docs.google.com/presentation/d/1BzfSr5DEZ5bvnPa5T1TX4SSY_Ee8GaWyFz6ULnDZg9A/edit?usp=drive_link' }],
        },
        {
          topic: 'object oriented programming',
          lab: [{ label: 'lab06', url: 'https://cs61a.org/lab/lab06/' }, { label: 'slides', url: 'https://docs.google.com/presentation/d/18yHQETTdDB7l4Q_Rkv8MlZTFcOPr4b-ySKZOHcOM-_8/edit?usp=drive_link' }],
          disc: [{ label: 'disc07', url: 'https://cs61a.org/disc/disc07/' }, { label: 'slides', url: 'https://docs.google.com/presentation/d/1NVE_UXqVZFqCMBv60FA4aQDEHSOLYMH3b-LmmBEeccA/edit?usp=drive_link' }],
        },
        {
          topic: 'linked lists',
          lab: [{ label: 'lab07', url: 'https://cs61a.org/lab/lab07/' }, { label: 'slides', url: 'https://docs.google.com/presentation/d/18zj62P535LF9i0zPBGZ99MeKXbNNxwLGK8gR-X8CBCg/edit?usp=drive_link' }],
          disc: [{ label: 'disc08', url: 'https://cs61a.org/disc/disc08/' }, { label: 'slides', url: 'https://docs.google.com/presentation/d/1yPBfSsX8Re61JaDpCqDapX5a0uW5tDKAPk8zYmrwiog/edit?usp=drive_link' }],
        },
        {
          topic: 'concurrency',
          lab: [{ label: 'midterm 2', url: '' }],
          disc: [{ label: 'disc09', url: 'https://cs61a.org/disc/disc09/' }, { label: 'slides', url: 'https://docs.google.com/presentation/d/1AGLL3FK0HDZFn6lOvEp9GcXfGYI9oh7GfMaVoVKLIMU/edit?usp=drive_link' }],
        },
        {
          topic: 'scheme, scheme lists',
          lab: [{ label: 'lab8', url: 'https://cs61a.org/lab/lab08/' }, { label: 'slides', url: 'https://docs.google.com/presentation/d/1GclsCPWSCZMQChmce-Wxnozxyb64pTNBHHY0Weh74Jw/edit?usp=drive_link' }],
          disc: [{ label: 'disc10', url: 'https://cs61a.org/disc/disc10/' }, { label: 'slides', url: 'https://docs.google.com/presentation/d/1qlMbVMsMYu8PRIoGeOlYKF3F_LdEbJrNFCmz1pXPBh8/edit?usp=drive_link' }],
        },
        {
          topic: 'interpreters',
          lab: [{ label: 'lab9', url: 'https://cs61a.org/lab/lab09/' }, { label: 'slides', url: 'https://docs.google.com/presentation/d/1l9g8onfeOcxYr-iZdJ2gDexzrvW2bozX_HZwcrdhybE/edit?usp=drive_link' }],
          disc: [{ label: 'disc11', url: 'https://cs61a.org/disc/disc11/' }, { label: 'slides', url: 'https://docs.google.com/presentation/d/1a57yIoMzlV0WA4O1rdi4OroPfVlgQrs_8vLnFwShR8M/edit?usp=drive_link' }],
        },
        {
          topic: 'macros',
          lab: [{ label: 'lab10', url: 'https://cs61a.org/lab/lab10/' }, { label: 'slides', url: 'https://docs.google.com/presentation/d/15KL7wI_5n2NMjW7_4hhGLhSvpLkRMq_CG0s0su5Q-yM/edit?usp=drive_link' }],
          disc: [{ label: 'disc12', url: 'https://cs61a.org/disc/disc12/' }, { label: 'slides', url: 'https://docs.google.com/presentation/d/1rl430TxgR6Z6gk7UmcSHx-k5M-8FYglDSq3FltL6xs8/edit?usp=drive_link' }],
        },
        {
          topic: 'sql',
          lab: [{ label: 'lab11', url: 'https://cs61a.org/lab/lab11/' }, { label: 'slides', url: 'https://docs.google.com/presentation/d/1EyNHOfRY2U8fDdVBQ32namMFkbYzT6UT5Izb0XmzAqM/edit?usp=drive_link' }],
          disc: [{ label: 'disc13', url: 'https://cs61a.org/disc/disc13/' }, { label: 'slides', url: 'https://docs.google.com/presentation/d/1FMz23pDV0Ny60pTFnLSlhK_JArB99wqecb9mCJaDKc0/edit?usp=drive_link' }],
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
          year: "2015",
          round: "round 1",
          video: { label: 'video', url: 'https://youtu.be/VaCOkmJS2eM?si=pnYUaVCxCWUhXaJL&t=0' },
          blankSolution: [{ label: 'blank', url: 'https://naclo.org/resources/problems/2015/N2015-G.pdf' }, { label: 'solution', url: 'https://naclo.org/resources/problems/2015/N2015-GS.pdf' }],
          popularity: 2400,
        },
        {
          problem: 'junk mail (part 1)',
          year: "2021",
          round: "round 1",
          video: { label: 'video', url: 'https://youtu.be/apUjOpDGN5s?si=KTOiM_v-gLIlGGkk&t=0' },
          blankSolution: [{ label: 'blank', url: 'https://naclo.org/resources/problems/2021/N2021-B.pdf' }, { label: 'solution', url: 'https://naclo.org/resources/problems/2021/N2021-BS.pdf' }],
          popularity: 529,
        },
        {
          problem: 'junk mail (part 2)',
          year: "2021",
          round: "round 1",
          video: { label: 'video', url: 'https://youtu.be/Z2tqvwqPeBI?si=WGUiIBGoGjpizUNS&t=0' },
          blankSolution: [{ label: 'blank', url: 'https://naclo.org/resources/problems/2021/N2021-B.pdf' }, { label: 'solution', url: 'https://naclo.org/resources/problems/2021/N2021-BS.pdf' }],
          popularity: 528,
        },
        {
          problem: 'set in stone (part 1)',
          year: "2020",
          round: "round 1",
          video: { label: 'video', url: 'https://youtu.be/5mrZbv3OMHc?si=EiIKjQSwIPmmPE6n&t=0' },
          blankSolution: [{ label: 'blank', url: 'https://naclo.org/resources/problems/2020/N2020-C.pdf' }, { label: 'solution', url: 'https://naclo.org/resources/problems/2020/N2020-CS.pdf' }],
          popularity: 647,
        },
        {
          problem: 'set in stone (part 2)',
          year: "2020",
          round: "round 1",
          video: { label: 'video', url: 'https://youtu.be/pQrb64Dkku8?si=HULTukl6RVSSBs9T&t=0' },
          blankSolution: [{ label: 'blank', url: 'https://naclo.org/resources/problems/2020/N2020-C.pdf' }, { label: 'solution', url: 'https://naclo.org/resources/problems/2020/N2020-CS.pdf' }],
          popularity: 646,
        },
        {
          problem: 'set in stone (part 3)',
          year: "2020",
          round: "round 1",
          video: { label: 'video', url: 'https://youtu.be/v3lUbchwCw0?si=ZH2JN3y4jDtHXO6e&t=0' },
          blankSolution: [{ label: 'blank', url: 'https://naclo.org/resources/problems/2020/N2020-C.pdf' }, { label: 'solution', url: 'https://naclo.org/resources/problems/2020/N2020-CS.pdf' }],
          popularity: 645,
        },
        {
          problem: 'chess tournament (part 1)',
          year: "2016",
          round: "round 1",
          video: { label: 'video', url: 'https://youtu.be/4d35qAkGvQo?si=0G0aM4i-kS6c8SC8&t=0' },
          blankSolution: [{ label: 'blank', url: 'https://naclo.org/resources/problems/2016/N2016-N.pdf' }, { label: 'solution', url: 'https://naclo.org/resources/problems/2016/N2016-NS.pdf' }],
          popularity: 921,
        },
        {
          problem: 'chess tournament (part 2)',
          year: "2016",
          round: "round 1",
          video: { label: 'video', url: 'https://youtu.be/c18R-9w7ldc?si=dedewZrNbG-3ZDl0&t=0' },
          blankSolution: [{ label: 'blank', url: 'https://naclo.org/resources/problems/2016/N2016-N.pdf' }, { label: 'solution', url: 'https://naclo.org/resources/problems/2016/N2016-NS.pdf' }],
          popularity: 920,
        },
        {
          problem: 'we are all molistic in a way',
          year: "2007",
          round: "round 1",
          video: { label: 'video', url: 'https://youtu.be/O6Cel0m73MY?si=gxT-iB4IJ43SLtqI&t=0' },
          blankSolution: [{ label: 'blank', url: 'https://naclo.org/resources/problems/2007/N2007-A.pdf' }, { label: 'solution', url: 'https://naclo.org/resources/problems/2007/N2007-AS.pdf' }],
          popularity: 1000,
        },
      ],
    },
  ]

  return (
    <section className="space-y-4 text-[17px] leading-[1.45] text-neutral-800 dark:text-neutral-200 max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">teaching <span className="ml-1">🎓</span></h1>
      
      <div className="text-[17px] leading-[1.45] text-neutral-800 dark:text-neutral-200 flex flex-wrap items-center gap-2">
        <span className="text-neutral-700 dark:text-neutral-300">filter by:</span>
        <button
          type="button"
          onClick={() => setSelectedCourse(null)}
          className={[
            'px-1 rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2 decoration-[0.1em]',
            selectedCourse === null
              ? 'text-neutral-900 dark:text-neutral-100 writing-chip-active'
              : 'text-neutral-700 dark:text-neutral-300 writing-chip',
          ].join(' ')}
        >
          all
        </button>
        {courses.map((course) => (
          <React.Fragment key={course.id}>
            <span>|</span>
            <button
              type="button"
              onClick={() => setSelectedCourse(selectedCourse === course.id ? null : course.id)}
              className={[
                'px-1 rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2 decoration-[0.1em]',
                selectedCourse === course.id
                  ? 'text-neutral-900 dark:text-neutral-100 writing-chip-active'
                  : 'text-neutral-700 dark:text-neutral-300 writing-chip',
              ].join(' ')}
            >
              {course.shortName}
            </button>
          </React.Fragment>
        ))}
      </div>

      {courses
        .filter((course) => selectedCourse === null || course.id === selectedCourse)
        .map((course, courseIdx) => {
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
        <div
          key={courseIdx}
          className={`space-y-3 ${courseIdx < courses.length - 1 ? 'mb-6' : ''}`}
        >
          <div>
            <h2 className="text-xl font-semibold tracking-tight">{course.title}</h2>
            {course.subtitle && (
              <ul className="text-base text-neutral-700 dark:text-neutral-300 mt-1 list-disc pl-5 space-y-0.5">
                {course.subtitle.split('\n').map((line, idx) => (
                  <li key={idx}>{parseLinks(line.trim())}</li>
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
                      ? 'text-neutral-900 dark:text-neutral-100 writing-chip-active'
                      : 'text-neutral-700 dark:text-neutral-300 writing-chip',
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
                      ? 'text-neutral-900 dark:text-neutral-100 writing-chip-active'
                      : 'text-neutral-700 dark:text-neutral-300 writing-chip',
                  ].join(' ')}
                >
                  most popular
                </button>
                <span>|</span>
                <a
                  href="https://naclo.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-1 rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2 decoration-[0.1em] text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 writing-chip"
                >
                  website
                </a>
              </div>
            )}
          </div>
          {sortedMaterials.length > 0 ? (
            <div className="teaching-card border-2 border-neutral-200 bg-white/80 rounded-xl dark:border-neutral-700/70 dark:bg-transparent overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full teaching-table">
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
                                      className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] writing-chip"
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
                                      <span>
                                        {links[0].url && links[0].url.trim() !== '' ? (
                                          <a
                                            href={links[0].url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] writing-chip"
                                          >
                                            {links[0].label}
                                          </a>
                                        ) : (
                                          <span>{links[0].label}</span>
                                        )}
                                      </span>
                                    ) : (
                                      <span className="flex flex-wrap gap-1">
                                        {links.map((link, linkIdx) => (
                                          <span key={linkIdx}>
                                            {link.url && link.url.trim() !== '' ? (
                                              <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] writing-chip"
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
                            
                            if (header === 'lab' || header === 'disc' || header === 'video' || header === 'pdfs') {
                              const links = value as MaterialLink[]
                              return (
                                <td key={header} className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                                  {Array.isArray(links) && links.length > 0 ? (
                                    links.length === 1 ? (
                                      <span>
                                        {links[0].url && links[0].url.trim() !== '' ? (
                                          <a
                                            href={links[0].url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] writing-chip"
                                          >
                                            {links[0].label}
                                          </a>
                                        ) : (
                                          <span>{links[0].label}</span>
                                        )}
                                      </span>
                                    ) : (
                                      <span className="flex flex-wrap gap-1">
                                        {links.map((link, linkIdx) => (
                                          <span key={linkIdx}>
                                            {link.url && link.url.trim() !== '' ? (
                                              <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] writing-chip"
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


