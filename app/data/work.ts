export type WorkEntry = {
  org: string
  url?: string
  dates: string
  /** one line of what she did; supports `[text](url)`, `**bold**` and `*italic*` */
  line: string
}

/** newest first */
export const work: WorkEntry[] = [
  {
    org: 'amazon (finauto division)',
    url: 'https://amazon.jobs/content/en/teams/fgbs/finance-automation',
    dates: 'summer 2026',
    line: 'swe intern. lavendar matcha peak era; built a finance automation catalog :)',
  },
  {
    org: 'sky computing lab',
    url: 'https://sky.cs.berkeley.edu/',
    dates: 'spring 2026',
    line: 'undergraduate researcher. user mimics (see the [project page](https://recon-user-modeling.com/) and [paper](https://arxiv.org/abs/2605.26969)); larped as a grad student :D',
  },
  {
    org: 'eecs study committee',
    dates: 'fall 2025 – present',
    line: 'undergrad representative. fangirling over all the legendary profs gathered in one meeting space',
  },
  {
    org: 'amazon (finauto division)',
    url: 'https://amazon.jobs/content/en/teams/fgbs/finance-automation',
    dates: 'summer 2025',
    line: 'swe intern. developed agentic ai workflows for finance recon requests; drank free daily matcha and played pickleball; saved many spreadsheet hours...',
  },
  {
    org: 'cdss department',
    url: 'https://cdss.berkeley.edu/',
    dates: 'fall 2024 – present',
    line: 'undergrad representative. providing input to the amazing associate dean of students (narges!)',
  },
  {
    org: 'tech policy press',
    url: 'https://www.techpolicy.press/',
    dates: 'fall 2024',
    line: 'guest writer.',
  },
  {
    org: 'the brookings institution',
    url: 'https://www.brookings.edu/projects/artificial-intelligence-and-emerging-technology-initiative/',
    dates: 'summer 2024',
    line: 'research intern. spied on ai deepfakes and twitter bots during a global election year; met the united states secretary of state!',
  },
  {
    org: 'paragon policy fellowship',
    url: 'https://www.paragonfellowship.org/',
    dates: 'spring 2024 – fall 2024',
    line: 'advancements director. built tech policy fellowship from the ground up; led research and media operations. had one-too-many car zoom calls',
  },
  {
    org: 'gamescrafters',
    url: 'https://gamescrafters.berkeley.edu/',
    dates: 'spring 2024',
    line: 'undergraduate researcher. perfectly-solved 10+ [solitaire chess variants](https://nyc.cs.berkeley.edu/uni/puzzles/solitairechess/variants); played some games with great friends and ate some peruvian snacks',
  },
  {
    org: 'cs kickstart',
    url: 'https://www.cskickstart.com/',
    dates: 'fall 2023 – fall 2025',
    line: 'lead director. had the privilege to run (in my opinion) one of the most lifechanging programs for females in eecs and cs; check out our birds of a feather presentation at [sigcse 2026](https://sigcse2026.sigcse.org/details/sigcse-ts-2026-birds-of-a-feather/18/Developing-and-Sustaining-Summer-Bridge-Programs)!; still involved in an advisory role!',
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
  {
    org: 'city of saratoga',
    url: 'https://www.saratoga.ca.us/337/Youth-Commission',
    dates: 'fall 2019 – spring 2021',
    line: 'youth commissioner. appointed and served two-year term in public office :)',
  },
]
