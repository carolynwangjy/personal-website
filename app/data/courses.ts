export type Semester = {
  term: string
  /** supports `[text](url)`, `**bold**` and `*italic*` */
  courses: string[]
}

const DRIVE = 'https://drive.google.com/file/d'

/** newest first */
export const courses: Semester[] = [
  {
    term: 'fall 2026',
    courses: [
      'cs 182: deep neural networks',
      'english 143a: advanced short fiction',
      'polecon c160: origins of capitalism',
      'cs 399: 189 course staff - teaching assistant',
    ],
  },
  {
    term: 'spring 2026',
    courses: [
      'cs 186: database systems',
      'cdss 94: building thoughtful ai systems ([notes](/writing/building-thoughtful-ai-systems))',
      'legalst 106wi: philosophy of law',
      `legalst 199: writing intensive seminar ([paper](${DRIVE}/16pYakjV4H3pjYCi_RfuHE88-YzeAn4hb/view?usp=sharing))`,
      'cs 199: research (sky lab)',
      'cs 197: 189 course staff - tutor ([materials](/teaching))',
    ],
  },
  {
    term: 'fall 2025',
    courses: [
      `cs 162: operating systems & system programming ([mt1](${DRIVE}/14G-38XDzyMTMdJzZzgvrgcKuMx43ks2P/view?usp=drive_link))`,
      'cs 189: machine learning',
      'cs 375: teaching techniques for computer science',
      'nusctx 10: human nutrition',
      'cs 399: 61a course staff - teaching assistant ([materials](/teaching))',
    ],
  },
  {
    term: 'spring 2025',
    courses: [
      `eecs 126: probability & random processes ([mt1](${DRIVE}/1_xv-2JWBlV3-DrLWOql-2Hx98kDpk2WH/view?usp=drive_link), [mt2](${DRIVE}/1krPB-E5mJwk7FPOYR3woRythdeDPtx1X/view?usp=drive_link), [final](${DRIVE}/1Qj4rM_W__fBbjimZHFXG8oSIxq4OAeDR/view?usp=drive_link))`,
      'data 100: principles & techniques of data science',
      'cs 39: technology, society, & power',
      'cs 198: computational game theory',
      'cs 197: 61a course staff - tutor',
    ],
  },
  {
    term: 'fall 2024',
    courses: [
      `cs 170: efficient algorithms & intractable problems ([mt1](${DRIVE}/1096Wxnep6WVch_3jDdZYj957QuWKPs-m/view?usp=drive_link), [mt2](${DRIVE}/1GqOqnA1mouGbz47mW9sKDhs_-8HTvRwp/view?usp=drive_link), [final](${DRIVE}/1fxoMnPoEsBHZ5AEQGPzmI7bkS21MJ4NR/view?usp=drive_link))`,
      `cs 61c: great ideas in computer architecture ([mt](${DRIVE}/1owvuVA5R8ok6EZCR2QsIl94MfRdaWVV5/view?usp=drive_link), [final](${DRIVE}/1eFUglWlBHXqVXmU3LiNXrEFNvfDPWg3F/view?usp=drive_link))`,
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
      `cs 70: discrete math & probability theory ([mt](${DRIVE}/1Q9M7T6yN7B8tCXWEs4cRakDH5mMEKJz4/view?usp=drive_link), [final](${DRIVE}/1aKD-45na4u_b1jVCQ4I1W-hWnjjhzd1B/view?usp=drive_link))`,
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
