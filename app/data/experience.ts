export type Entry = {
  /** the position held */
  role: string
  org: string
  url?: string
  dates: string
  /** supports `[text](url)`, `**bold**` and `*italic*` */
  bullets: string[]
}

export type Group = { heading: string; entries: Entry[] }


/** industry, research, teaching, service, writing — newest first within each group */
export const experience: Group[] = [
  {
    heading: "industry",
    entries: [
      {
        role: "swe intern",
        org: "amazon (finauto division)",
        url: "https://amazon.jobs/content/en/teams/fgbs/finance-automation",
        dates: "summer 2026",
        bullets: [
          "lavendar matcha peak era",
          "built a finance automation catalog :)",
        ],
      },
      {
        role: "swe intern",
        org: "amazon (finauto division)",
        url: "https://amazon.jobs/content/en/teams/fgbs/finance-automation",
        dates: "summer 2025",
        bullets: [
          "developed agentic ai workflows for finance recon requests",
          "drank free daily matcha and played pickleball",
          "saved many spreadsheet hours...",
        ],
      },
      {
        role: "research intern",
        org: "the brookings institution",
        url: "https://www.brookings.edu/projects/artificial-intelligence-and-emerging-technology-initiative/",
        dates: "summer 2024",
        bullets: [
          "spied on ai deepfakes and twitter bots during a global election year",
          "met the united states secretary of state!",
        ],
      },
    ],
  },
  {
    heading: "research",
    entries: [
      {
        role: "undergraduate researcher",
        org: "bair",
        url: "https://bair.berkeley.edu/",
        dates: "fall 2026 - present",
        bullets: [
        ],
      },
      {
        role: "undergraduate researcher",
        org: "sky computing lab",
        url: "https://sky.cs.berkeley.edu/",
        dates: "spring 2026",
        bullets: [
          "user mimics (see [project page](https://recon-user-modeling.com/), [paper](https://arxiv.org/abs/2605.26969))",
          "larped as a grad student :D",
        ],
      },
      {
        role: "undergraduate researcher",
        org: "gamescrafters",
        url: "https://gamescrafters.berkeley.edu/",
        dates: "spring 2024",
        bullets: [
          "perfectly-solved 10+ [solitaire chess variants](https://nyc.cs.berkeley.edu/uni/puzzles/solitairechess/variants)",
          "played some games with great friends and ate some peruvian snacks",
        ],
      },
    ],
  },
  {
    heading: "teaching",
    entries: [
      {
        role: "lead teaching assistant",
        org: "cs189 (machine learning)",
        url: "https://eecs189.org/",
        dates: "fall 2026 - present",
        bullets: [
          "running course logistics for 400+ ml students :)",
          "wrangling spreadsheets and hounding the rest of course staff",
        ],
      },
      {
        role: "tutor (video lead)",
        org: "cs189 (machine learning)",
        url: "https://eecs189.org/",
        dates: "spring 2026 - fall 2026",
        bullets: [
          "became a youtuber for 900+ students :D (see [cs189 channel](https://www.youtube.com/@cs189-sp26))",
          "pimental proctoring at 90 degrees, or opera wordle dinosaur game?",
        ],
      },
      {
        role: "lead teaching assistant",
        org: "cs61a (computer programs)",
        url: "https://cs61a.org/",
        dates: "fall 2025",
        bullets: [
          "ran logistics for [cs scholars](https://eecs.berkeley.edu/cs-scholars/)! (i love my students <3)",
          "received highest TA ratings in lab and discussion for 61a’s fa25 iteration",
          "4.7/5 teaching effectiveness",
        ],
      },
      {
        role: "tutor",
        org: "cs61a (computer programs)",
        url: "https://cs61a.org/",
        dates: "fall 2024 - spring 2025",
        bullets: [
          "learned how to teach, how to critique, and how to learn",
          "met and befriended the great john denero",
        ],
      },
      {
        role: "senior mentor",
        org: "computer science mentors",
        url: "https://csmentors.studentorg.berkeley.edu/#/",
        dates: "spring 2024 - fall 2024",
        bullets: [
          "learned how to teach teachers, learned how to teach students",
        ],
      },
    ],
  },
  {
    heading: "service",
    entries: [
      {
        role: "undergrad representative",
        org: "eecs study committee",
        dates: "fall 2025 - present",
        bullets: [
          "fangirling over all the legendary profs gathered in one meeting space",
        ],
      },
      {
        role: "undergrad representative",
        org: "cdss department",
        url: "https://cdss.berkeley.edu/",
        dates: "fall 2024 - present",
        bullets: [
          "providing input to the amazing associate dean of students (narges!)",
        ],
      },
      {
        role: "lead director",
        org: "cs kickstart",
        url: "https://www.cskickstart.com/",
        dates: "fall 2023 - fall 2025",
        bullets: [
          "had the privilege to run (in my opinion) one of the most lifechanging programs for females in eecs and cs",
          "check out our birds of a feather presentation at [sigcse 2026](https://sigcse2026.sigcse.org/details/sigcse-ts-2026-birds-of-a-feather/18/Developing-and-Sustaining-Summer-Bridge-Programs)!",
          "still involved in an advisory role!",
        ],
      },
      {
        role: "advancements director",
        org: "paragon policy fellowship",
        url: "https://www.paragonfellowship.org/",
        dates: "spring 2024 - fall 2024",
        bullets: [
          "built tech policy fellowship from the ground up",
          "led research and media operations. had one-too-many car zoom calls",
        ],
      },
      {
        role: "youth commissioner",
        org: "city of saratoga",
        url: "https://www.saratoga.ca.us/337/Youth-Commission",
        dates: "fall 2019 - spring 2021",
        bullets: [
          "appointed and served two-year term in public office :)",
        ],
      },
    ],
  },
  {
    heading: "writing & editorial",
    entries: [
      {
        role: "guest writer",
        org: "tech policy press",
        url: "https://www.techpolicy.press/",
        dates: "fall 2024",
        bullets: [],
      },
      {
        role: "staff writer",
        org: "berkeley political review",
        url: "https://bpr.studentorg.berkeley.edu/",
        dates: "fall 2023",
        bullets: [],
      },
      {
        role: "editor-in-chief",
        org: "saratoga falcon newspaper",
        url: "https://saratogafalcon.org/",
        dates: "fall 2020 - spring 2023",
        bullets: [],
      },
    ],
  },
]
