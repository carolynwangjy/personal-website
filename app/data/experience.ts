export type Entry = {
  org: string
  url?: string
  dates: string
  /** one line of what she did; supports `[text](url)`, `**bold**` and `*italic*` */
  line: string
}

export type Group = { heading: string; entries: Entry[] }

/** the experience page: industry, research, teaching — newest first within each */
export const experience: Group[] = [
  {
    heading: 'industry',
    entries: [
      {
        org: 'amazon (finauto division)',
        url: 'https://amazon.jobs/content/en/teams/fgbs/finance-automation',
        dates: 'summer 2026',
        line: 'swe intern. lavendar matcha peak era; built a finance automation catalog :)',
      },
      {
        org: 'amazon (finauto division)',
        url: 'https://amazon.jobs/content/en/teams/fgbs/finance-automation',
        dates: 'summer 2025',
        line: 'swe intern. developed agentic ai workflows for finance recon requests; drank free daily matcha and played pickleball; saved many spreadsheet hours...',
      },
      {
        org: 'the brookings institution',
        url: 'https://www.brookings.edu/projects/artificial-intelligence-and-emerging-technology-initiative/',
        dates: 'summer 2024',
        line: 'research intern. spied on ai deepfakes and twitter bots during a global election year; met the united states secretary of state!',
      },
    ],
  },
  {
    heading: 'research',
    entries: [
      {
        org: 'sky computing lab',
        url: 'https://sky.cs.berkeley.edu/',
        dates: 'spring 2026',
        line: 'undergraduate researcher. user mimics (see the [project page](https://recon-user-modeling.com/) and [paper](https://arxiv.org/abs/2605.26969)); larped as a grad student :D',
      },
      {
        org: 'gamescrafters',
        url: 'https://gamescrafters.berkeley.edu/',
        dates: 'spring 2024',
        line: 'undergraduate researcher. perfectly-solved 10+ [solitaire chess variants](https://nyc.cs.berkeley.edu/uni/puzzles/solitairechess/variants); played some games with great friends and ate some peruvian snacks',
      },
    ],
  },
  {
    heading: 'teaching',
    entries: [
      {
        org: 'cs189 (machine learning)',
        url: 'https://eecs189.org/',
        dates: 'fall 2026 – present',
        line: 'lead teaching assistant. running course logistics for 400+ ml students :); wrangling spreadsheets and hounding the rest of course staff',
      },
      {
        org: 'cs189 (machine learning)',
        url: 'https://eecs189.org/',
        dates: 'spring 2026 – fall 2026',
        line: 'tutor (video lead). became a youtuber for 900+ students :D (see the [cs189 channel](https://www.youtube.com/@cs189-sp26)); pimental proctoring at 90 degrees, or opera wordle dinosaur game?',
      },
      {
        org: 'cs61a (computer programs)',
        url: 'https://cs61a.org/',
        dates: 'fall 2025',
        line: 'lead teaching assistant. ran logistics for [cs scholars](https://eecs.berkeley.edu/cs-scholars/)! (i love my students <3); received highest TA ratings in lab and discussion for 61a’s fa25 iteration; 4.7/5 teaching effectiveness',
      },
      {
        org: 'cs61a (computer programs)',
        url: 'https://cs61a.org/',
        dates: 'fall 2024 – spring 2025',
        line: 'tutor. learned how to teach, how to critique, and how to learn; met and befriended the great john denero',
      },
      {
        org: 'computer science mentors',
        url: 'https://csmentors.studentorg.berkeley.edu/#/',
        dates: 'spring 2024 – fall 2024',
        line: 'senior mentor. learned how to teach teachers, learned how to teach students',
      },
    ],
  },
]

/** the service page: unpaid community and editorial roles */
export const service: Group[] = [
  {
    heading: 'community',
    entries: [
      {
        org: 'eecs study committee',
        dates: 'fall 2025 – present',
        line: 'undergrad representative. fangirling over all the legendary profs gathered in one meeting space',
      },
      {
        org: 'cdss department',
        url: 'https://cdss.berkeley.edu/',
        dates: 'fall 2024 – present',
        line: 'undergrad representative. providing input to the amazing associate dean of students (narges!)',
      },
      {
        org: 'paragon policy fellowship',
        url: 'https://www.paragonfellowship.org/',
        dates: 'spring 2024 – fall 2024',
        line: 'advancements director. built tech policy fellowship from the ground up; led research and media operations. had one-too-many car zoom calls',
      },
      {
        org: 'cs kickstart',
        url: 'https://www.cskickstart.com/',
        dates: 'fall 2023 – fall 2025',
        line: 'lead director. had the privilege to run (in my opinion) one of the most lifechanging programs for females in eecs and cs; check out our birds of a feather presentation at [sigcse 2026](https://sigcse2026.sigcse.org/details/sigcse-ts-2026-birds-of-a-feather/18/Developing-and-Sustaining-Summer-Bridge-Programs)!; still involved in an advisory role!',
      },
      {
        org: 'city of saratoga',
        url: 'https://www.saratoga.ca.us/337/Youth-Commission',
        dates: 'fall 2019 – spring 2021',
        line: 'youth commissioner. appointed and served two-year term in public office :)',
      },
    ],
  },
  {
    heading: 'writing & editorial',
    entries: [
      {
        org: 'tech policy press',
        url: 'https://www.techpolicy.press/',
        dates: 'fall 2024',
        line: 'guest writer.',
      },
      {
        org: 'berkeley political review',
        url: 'https://bpr.studentorg.berkeley.edu/',
        dates: 'fall 2023',
        line: 'staff writer.',
      },
      {
        org: 'saratoga falcon newspaper',
        url: 'https://saratogafalcon.org/',
        dates: 'fall 2020 – spring 2023',
        line: 'editor-in-chief.',
      },
    ],
  },
]
