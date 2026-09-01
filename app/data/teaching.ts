export type Resource = { label: string; url?: string }

export type Item = {
  /** supports `[text](url)`, `**bold**` and `*italic*` */
  text: string
  meta?: string
  links?: Resource[]
}

export type Group = { heading: string; items: Item[] }

export const teaching: Group[] = [
  {
    heading: 'cs 189 / 289a: introduction to machine learning',
    items: [
      {
        text: 'lead teaching assistant',
        meta: 'fall 2026 – present',
      },
      {
        text: 'running course logistics for 400+ ml students :), wrangling spreadsheets and hounding the rest of course staff',
      },
      {
        text: 'tutor (video lead)',
        meta: 'spring 2026 – fall 2026',
      },
      {
        text: 'became a youtuber for 900+ students :D (see the [cs189 channel](https://www.youtube.com/@cs189-sp26)); pimental proctoring at 90 degrees, or opera wordle dinosaur game?',
      },
      { text: 'office hours: wed 10-11am (gateway 1040 bear)', meta: 'fall 2026' },
      {
        text: 'course website',
        links: [{ label: 'eecs189.org/fa26/', url: 'https://eecs189.org/fa26/' }],
      },
      {
        text: "**note:** i'm leading all cs189 course logistics for this semester, so most of my resources will be posted on ed! see below for my materials from previous semesters :)",
      },
    ],
  },
  {
    heading: 'cs 189 discussion materials (spring 2026)',
    items: [
      {
        text: 'course website',
        links: [{ label: 'eecs189.org/sp26/', url: 'https://eecs189.org/sp26/' }],
      },
      {
        text: 'discussion videos',
        links: [
          {
            label: 'youtube.com/@cs189-sp26',
            url: 'https://www.youtube.com/@cs189-sp26/playlists',
          },
        ],
      },
      {
        text: 'disc01: math review',
        links: [
          { label: 'video', url: 'https://www.youtube.com/watch?v=dTdHuJEHOsM&list=PL-ysCubq-Sa8_GGY5otoIkzjneKo-qfW3' },
          { label: 'blank', url: 'https://drive.google.com/file/d/13TjzfhCv8lbf8pxoQjOx4RoEY0oS5-9b/view' },
          { label: 'solution', url: 'https://drive.google.com/file/u/1/d/1rvdrRJ6YBEDrIhxeulEjq80H1iI2qwVR/view?usp=sharing' },
          { label: 'notes', url: 'https://drive.google.com/file/d/1ePY_SImeT7HDDrlbuU8F8e064tpxd5Gb/view?usp=drive_link' },
        ],
      },
      {
        text: 'disc02: machine learning design',
        links: [
          { label: 'video', url: 'https://youtube.com/playlist?list=PL-ysCubq-Sa9uYDjsrzfmPCLLbjfOKVPd&si=zvS0-v6MBnLiwmCa' },
          { label: 'blank', url: 'https://drive.google.com/file/d/1MZs3r4ZOMhKUTAXjvLU9lxeCvGCUq1ND/view' },
          { label: 'solution', url: 'https://drive.google.com/file/d/1-WUgqsS3b51pib-68iFYLFbWkBoBzdaM/view' },
          { label: 'notes', url: 'https://drive.google.com/file/d/1ms5ml4mNaTGyyumOxf9Xjw0Y-ZzoUreo/view?usp=drive_link' },
        ],
      },
      {
        text: 'disc03: k-means, multivariate gaussians',
        links: [
          { label: 'video', url: 'https://www.youtube.com/playlist?list=PL-ysCubq-Sa-bRfFhYJkcJ-TDF3oTAWQj' },
          { label: 'blank', url: 'https://drive.google.com/file/d/1PAxeqyZj4QAEW4tc7MBPKhhjMcz0rBoZ/view?usp=drive_link' },
          { label: 'solution', url: 'https://drive.google.com/file/d/11YV3yrkNRU5VclX8xDaAM5xX__gHMiK8/view?usp=drive_link' },
          { label: 'notes', url: 'https://drive.google.com/file/d/1gdPa6p4cJVKVKwUqGKnGXXOHzmwQ1wOx/view?usp=drive_link' },
        ],
      },
      {
        text: 'disc04: gradients, GMMs, ridge',
        links: [
          { label: 'video', url: 'https://youtube.com/playlist?list=PL-ysCubq-Sa88y_YPkqtdNi_SQ3URFY2N&si=317QIm66ppncPqcO' },
          { label: 'blank', url: 'https://drive.google.com/file/d/1GV_knujkL_ooo51cF7bM2PDCQo8z0e-B/view?usp=drive_link' },
          { label: 'solution', url: 'https://drive.google.com/file/d/18PGUKc33SP9Gyv8AILqQOpeDOFJ7aOsV/view?usp=drive_link' },
          { label: 'notes', url: 'https://drive.google.com/file/d/1vm69EWgOA0S-iVdj8ZJbybNnDS2_4SKT/view?usp=drive_link' },
        ],
      },
      {
        text: 'disc05: bias-variance decomposition',
        links: [
          { label: 'video', url: 'https://youtube.com/playlist?list=PL-ysCubq-Sa9TlqqkuL1y7ybVRtrA6l6w&si=9wl4JqRk8RTvrkJY' },
          { label: 'blank', url: 'https://drive.google.com/file/d/1I0qfBd1cCc_QUU9wPcfCcEg6-5eCNbCb/view' },
          { label: 'solution', url: 'https://drive.google.com/file/u/1/d/1auD6wh7wN9QPGN52bMKZSc1KoSipxrVF/view?usp=sharing' },
          { label: 'notes', url: 'https://drive.google.com/file/d/1VZQ2SUxIDqykqMY-_A30RdOKe1D759JK/view?usp=drive_link' },
        ],
      },
      {
        text: 'disc06: logistic regression',
        links: [
          { label: 'video', url: 'https://youtube.com/playlist?list=PL-ysCubq-Sa-JYWlXIx1NaT7fp5djA_gc&si=6LSoYkVLFLggA8Fa' },
          { label: 'blank', url: 'https://drive.google.com/file/u/1/d/1FFNxd-TEkK53m8s-eHfN9V6xXsoSqMHa/view?usp=drive_link' },
          { label: 'solution', url: 'https://drive.google.com/file/d/1gfUeWtTRnIXlj_H8pnL3BSl4THOriQQG/view' },
          { label: 'notes', url: 'https://drive.google.com/file/d/17djiFE20PaLWtlba45uSNSAxr-vab0yS/view?usp=drive_link' },
        ],
      },
      {
        text: 'disc07: gradient descent',
        links: [
          { label: 'video', url: 'https://youtube.com/playlist?list=PL-ysCubq-Sa-ueQ6jkjrrr-qiTlBmv0zd&si=We5HXAwLE8t2U9aJ' },
          { label: 'blank', url: 'https://drive.google.com/file/u/1/d/1SloZ3iTpq9qEJ-0uWhQtcdT0fhZh5VVH/view?usp=drive_link' },
          { label: 'solution', url: 'https://drive.google.com/file/d/16jrdhv1s9cgvaU76tTZdVFIA_zE1sgWf/view' },
          { label: 'notes', url: 'https://drive.google.com/file/d/1qn8gUyZ2FkTx1woK_hkOEmKMRxgiLZ4_/view?usp=drive_link' },
        ],
      },
      {
        text: 'midterm (disc 01-07 content)',
        links: [
          { label: 'video', url: 'https://youtube.com/playlist?list=PL-ysCubq-Sa-oUudIQgL4uTjsiR-UWBlI&si=tBQFCHboT1jplM1m' },
          { label: 'blank', url: 'https://drive.google.com/file/d/1KZFOxAYg4RYP_xzf5-OnjqVvZQ82Quw5/view?usp=drive_link' },
          { label: 'solution', url: 'https://drive.google.com/file/d/1VCTJML71X_RZevsNpdsuy9IlFKl9QrxR/view?usp=drive_link' },
        ],
      },
      {
        text: 'disc08: convergence, approximation',
        links: [
          { label: 'video', url: 'https://youtube.com/playlist?list=PL-ysCubq-Sa9sA7c_KW-WwRudeMkxQZu_&si=zCLLkbY4A2pW07rk' },
          { label: 'blank', url: 'https://drive.google.com/file/u/1/d/1XNAVahEf4jiRfGyUCr-x4XGSSseohf2M/view?usp=drive_link' },
          { label: 'solution', url: 'https://drive.google.com/file/u/1/d/12OuB5CcxfG4Ega4_BREMC1cyijm0FUd7/view?usp=drive_link' },
          { label: 'notes', url: 'https://drive.google.com/file/d/1X6DD1NSvbFoIMfiPy-MMNMQM6U9mtD9q/view?usp=drive_link' },
        ],
      },
      {
        text: 'disc09: back propogation, cnns',
        links: [
          { label: 'video', url: 'https://www.youtube.com/playlist?list=PL-ysCubq-Sa8dQDvhNbABwFT3JWWBTRAW' },
          { label: 'blank', url: 'https://drive.google.com/file/d/1Aa40Z2Ufa91YBNAlhfwsHG2JCT23T2SA/view' },
          { label: 'solution', url: 'https://drive.google.com/file/d/16n2T86Vx2bneCubkQ7b52MV8c8wwFUyF/view' },
          { label: 'notes', url: 'https://drive.google.com/file/d/1R3WzVrljeXRbPMphABDOwS0NDg72XCEE/view?usp=drive_link' },
        ],
      },
      {
        text: 'disc10: transformers, attention',
        links: [
          { label: 'video', url: 'https://youtube.com/playlist?list=PL-ysCubq-Sa8nZKoYa7TbLsNlBgXQ3xQR&si=a8Fq28Su6ehuIIda' },
          { label: 'blank', url: 'https://drive.google.com/file/d/16H_chNl76tHPrRUkf6T1G0pQaM1W0eKm/view' },
          { label: 'solution', url: 'https://drive.google.com/file/u/1/d/1QV5d9Mr2XAaYv7QAT_6ttZ37CKBRCdfu/view?usp=drive_link' },
          { label: 'notes', url: 'https://drive.google.com/file/d/1pjI2ZbnE8mQNGqJ2GlmeZ6LexqrBIfrN/view?usp=drive_link' },
        ],
      },
      {
        text: 'disc11: positional encoding, kv caching',
        links: [
          { label: 'video', url: 'https://youtube.com/playlist?list=PL-ysCubq-Sa9h8mIf8s2L-vL68rx8_hx8&si=JXS8O-n86Jxr5CJg' },
          { label: 'blank', url: 'https://drive.google.com/file/u/1/d/11WJr0gQUuMON1ub34DSUhSMsDl8GuM06/view?usp=drive_link' },
          { label: 'solution', url: 'https://drive.google.com/file/u/1/d/11KGelwaG_trTVtxBHPgkUFrG_BhlZE7E/view?usp=drive_link' },
          { label: 'notes', url: 'https://drive.google.com/file/d/1xP3YdonJTGlFpjxJ56KoIv9dj7iUa-r7/view?usp=drive_link' },
        ],
      },
      {
        text: 'disc12: finetuning, generative models',
        links: [
          { label: 'video', url: 'https://youtube.com/playlist?list=PL-ysCubq-Sa-e6UXPAnaIlmaHf_Wv3HPX&si=Gnm3eYuw6bC5brGQ' },
          { label: 'blank', url: 'https://drive.google.com/file/d/1DWLHmY5RVWolf0KVyPDFDfpouBiwALuz/view' },
          { label: 'solution', url: 'https://drive.google.com/file/d/1iT9kueFCRKrU47y0eKiIEzMJteH4zPJD/view' },
          { label: 'notes', url: 'https://drive.google.com/file/d/17y88D1csn6EWcncrAsZ0Tqte9VsT0wN7/view?usp=drive_link' },
        ],
      },
    ],
  },
  {
    heading: 'cs 61a: structure & interpretation of computer programs',
    items: [
      { text: 'lead teaching assistant', meta: 'fall 2025' },
      {
        text: 'ran logistics for [cs scholars](https://eecs.berkeley.edu/cs-scholars/)! (i love my students <3); received highest TA ratings in lab and discussion for 61a’s fa25 iteration; 4.7/5 teaching effectiveness',
      },
      { text: 'tutor', meta: 'fall 2024 – spring 2025' },
      { text: 'learned how to teach, how to critique, and how to learn; met and befriended the great john denero' },
      { text: 'lab: tues 5-6:30pm (soda 330)', meta: 'fall 2025' },
      { text: 'discussion: thurs 12:30-2pm (wheeler 106)', meta: 'fall 2025' },
      { text: 'office hours: wed 7-8pm (warren 101B)', meta: 'fall 2025' },
      { text: 'course website', links: [{ label: 'cs61a.org', url: 'https://cs61a.org' }] },
    ],
  },
  {
    heading: 'cs 61a lab & discussion materials (fall 2025)',
    items: [
      {
        text: 'getting started',
        links: [
          { label: 'lab00', url: 'https://cs61a.org/lab/lab00/' },
          { label: 'lab slides', url: 'https://docs.google.com/presentation/d/12CbiBXRsFzIPn4Fi7QbJnWfbERbclNwRark3Y5Gq2GU/edit?usp=drive_link' },
          { label: 'disc00', url: 'https://cs61a.org/disc/disc00/' },
          { label: 'disc slides', url: 'https://docs.google.com/presentation/d/1D6UYaZNJAAFKSjf5qnQx3X-HlOFhbuBnXmBOCMWWWUA/edit?usp=drive_link' },
        ],
      },
      {
        text: 'functions, control',
        links: [
          { label: 'lab01', url: 'https://cs61a.org/lab/lab01/' },
          { label: 'lab slides', url: 'https://docs.google.com/presentation/d/12CbiBXRsFzIPn4Fi7QbJnWfbERbclNwRark3Y5Gq2GU/edit?usp=drive_link' },
          { label: 'disc01', url: 'https://cs61a.org/disc/disc01/' },
          { label: 'disc slides', url: 'https://docs.google.com/presentation/d/1AZBRndzm7sY9YlcRNmRCAb49ip6ulaMYgBeCgHit9gI/edit?usp=drive_link' },
        ],
      },
      {
        text: 'env diagrams, hofs',
        links: [
          { label: 'lab02', url: 'https://cs61a.org/lab/lab02/' },
          { label: 'lab slides', url: 'https://docs.google.com/presentation/d/1RnxgvnqVrfcV_kr3KjzSY_WID-NGrodKLZX-5xGIKFM/edit?usp=drive_link' },
          { label: 'disc02', url: 'https://cs61a.org/disc/disc02/' },
          { label: 'disc slides', url: 'https://docs.google.com/presentation/d/1FWISIYHIVu-pnnpps9Hz2SH5RmOvrfws2P2knEt6Z5Q/edit?usp=drive_link' },
        ],
      },
      {
        text: 'recursion',
        links: [
          { label: 'midterm 1' },
          { label: 'disc03', url: 'https://cs61a.org/disc/disc03/' },
          { label: 'disc slides', url: 'https://docs.google.com/presentation/d/1TtBvO_yWu3FRx2_D3cTw8g_S0T4TBVAWQU_32VY0XFQ/edit?usp=drive_link' },
        ],
      },
      {
        text: 'tree recursion, abstraction',
        links: [
          { label: 'lab03', url: 'https://cs61a.org/lab/lab03/' },
          { label: 'lab slides', url: 'https://docs.google.com/presentation/d/1MU653xwO5e96QFwjBUiRaGgApkoX4EbxBvcizHcFk9M/edit?usp=drive_link' },
          { label: 'disc04', url: 'https://cs61a.org/disc/disc04/' },
          { label: 'disc slides', url: 'https://docs.google.com/presentation/d/1hZ6hrmpGNHmyrTgiROqNHXymf8HymYtzfm2kry6AM14/edit?usp=drive_link' },
        ],
      },
      {
        text: 'trees',
        links: [
          { label: 'lab04', url: 'https://cs61a.org/lab/lab04/' },
          { label: 'lab slides', url: 'https://docs.google.com/presentation/d/1X0OfO16McwA4e5SnodFb0RUWP4-qXcOrjd4MyXOOWjg/edit?usp=drive_link' },
          { label: 'disc05', url: 'https://cs61a.org/disc/disc05/' },
          { label: 'disc slides', url: 'https://docs.google.com/presentation/d/1atc_D9Myaf8m2fDB79KGYlCNL7gUAvyzWQZ2gdAelRk/edit?usp=drive_link' },
        ],
      },
      {
        text: 'iterators, generators',
        links: [
          { label: 'lab05', url: 'https://cs61a.org/lab/lab05/' },
          { label: 'lab slides', url: 'https://docs.google.com/presentation/d/1OeysgmPvYl85fA8JpLeyuRR2dbsRfi_ETEezGqzw4as/edit?usp=drive_link' },
          { label: 'disc06', url: 'https://cs61a.org/disc/disc06/' },
          { label: 'disc slides', url: 'https://docs.google.com/presentation/d/1BzfSr5DEZ5bvnPa5T1TX4SSY_Ee8GaWyFz6ULnDZg9A/edit?usp=drive_link' },
        ],
      },
      {
        text: 'object oriented programming',
        links: [
          { label: 'lab06', url: 'https://cs61a.org/lab/lab06/' },
          { label: 'lab slides', url: 'https://docs.google.com/presentation/d/18yHQETTdDB7l4Q_Rkv8MlZTFcOPr4b-ySKZOHcOM-_8/edit?usp=drive_link' },
          { label: 'disc07', url: 'https://cs61a.org/disc/disc07/' },
          { label: 'disc slides', url: 'https://docs.google.com/presentation/d/1NVE_UXqVZFqCMBv60FA4aQDEHSOLYMH3b-LmmBEeccA/edit?usp=drive_link' },
        ],
      },
      {
        text: 'linked lists',
        links: [
          { label: 'lab07', url: 'https://cs61a.org/lab/lab07/' },
          { label: 'lab slides', url: 'https://docs.google.com/presentation/d/18zj62P535LF9i0zPBGZ99MeKXbNNxwLGK8gR-X8CBCg/edit?usp=drive_link' },
          { label: 'disc08', url: 'https://cs61a.org/disc/disc08/' },
          { label: 'disc slides', url: 'https://docs.google.com/presentation/d/1yPBfSsX8Re61JaDpCqDapX5a0uW5tDKAPk8zYmrwiog/edit?usp=drive_link' },
        ],
      },
      {
        text: 'concurrency',
        links: [
          { label: 'midterm 2' },
          { label: 'disc09', url: 'https://cs61a.org/disc/disc09/' },
          { label: 'disc slides', url: 'https://docs.google.com/presentation/d/1AGLL3FK0HDZFn6lOvEp9GcXfGYI9oh7GfMaVoVKLIMU/edit?usp=drive_link' },
        ],
      },
      {
        text: 'scheme, scheme lists',
        links: [
          { label: 'lab8', url: 'https://cs61a.org/lab/lab08/' },
          { label: 'lab slides', url: 'https://docs.google.com/presentation/d/1GclsCPWSCZMQChmce-Wxnozxyb64pTNBHHY0Weh74Jw/edit?usp=drive_link' },
          { label: 'disc10', url: 'https://cs61a.org/disc/disc10/' },
          { label: 'disc slides', url: 'https://docs.google.com/presentation/d/1qlMbVMsMYu8PRIoGeOlYKF3F_LdEbJrNFCmz1pXPBh8/edit?usp=drive_link' },
        ],
      },
      {
        text: 'interpreters',
        links: [
          { label: 'lab9', url: 'https://cs61a.org/lab/lab09/' },
          { label: 'lab slides', url: 'https://docs.google.com/presentation/d/1l9g8onfeOcxYr-iZdJ2gDexzrvW2bozX_HZwcrdhybE/edit?usp=drive_link' },
          { label: 'disc11', url: 'https://cs61a.org/disc/disc11/' },
          { label: 'disc slides', url: 'https://docs.google.com/presentation/d/1a57yIoMzlV0WA4O1rdi4OroPfVlgQrs_8vLnFwShR8M/edit?usp=drive_link' },
        ],
      },
      {
        text: 'macros',
        links: [
          { label: 'lab10', url: 'https://cs61a.org/lab/lab10/' },
          { label: 'lab slides', url: 'https://docs.google.com/presentation/d/15KL7wI_5n2NMjW7_4hhGLhSvpLkRMq_CG0s0su5Q-yM/edit?usp=drive_link' },
          { label: 'disc12', url: 'https://cs61a.org/disc/disc12/' },
          { label: 'disc slides', url: 'https://docs.google.com/presentation/d/1rl430TxgR6Z6gk7UmcSHx-k5M-8FYglDSq3FltL6xs8/edit?usp=drive_link' },
        ],
      },
      {
        text: 'sql',
        links: [
          { label: 'lab11', url: 'https://cs61a.org/lab/lab11/' },
          { label: 'lab slides', url: 'https://docs.google.com/presentation/d/1EyNHOfRY2U8fDdVBQ32namMFkbYzT6UT5Izb0XmzAqM/edit?usp=drive_link' },
          { label: 'disc13', url: 'https://cs61a.org/disc/disc13/' },
          { label: 'disc slides', url: 'https://docs.google.com/presentation/d/1FMz23pDV0Ny60pTFnLSlhK_JArB99wqecb9mCJaDKc0/edit?usp=drive_link' },
        ],
      },
    ],
  },
  {
    heading: 'naclo: north american computational linguistics olympiad',
    items: [
      { text: 'website', links: [{ label: 'naclo.org', url: 'https://naclo.org' }] },
      {
        text: 'zoink',
        meta: '2015, round 1',
        links: [
          { label: 'video', url: 'https://youtu.be/VaCOkmJS2eM?si=pnYUaVCxCWUhXaJL&t=0' },
          { label: 'blank', url: 'https://naclo.org/resources/problems/2015/N2015-G.pdf' },
          { label: 'solution', url: 'https://naclo.org/resources/problems/2015/N2015-GS.pdf' },
        ],
      },
      {
        text: 'junk mail (part 1)',
        meta: '2021, round 1',
        links: [
          { label: 'video', url: 'https://youtu.be/apUjOpDGN5s?si=KTOiM_v-gLIlGGkk&t=0' },
          { label: 'blank', url: 'https://naclo.org/resources/problems/2021/N2021-B.pdf' },
          { label: 'solution', url: 'https://naclo.org/resources/problems/2021/N2021-BS.pdf' },
        ],
      },
      {
        text: 'junk mail (part 2)',
        meta: '2021, round 1',
        links: [
          { label: 'video', url: 'https://youtu.be/Z2tqvwqPeBI?si=WGUiIBGoGjpizUNS&t=0' },
          { label: 'blank', url: 'https://naclo.org/resources/problems/2021/N2021-B.pdf' },
          { label: 'solution', url: 'https://naclo.org/resources/problems/2021/N2021-BS.pdf' },
        ],
      },
      {
        text: 'set in stone (part 1)',
        meta: '2020, round 1',
        links: [
          { label: 'video', url: 'https://youtu.be/5mrZbv3OMHc?si=EiIKjQSwIPmmPE6n&t=0' },
          { label: 'blank', url: 'https://naclo.org/resources/problems/2020/N2020-C.pdf' },
          { label: 'solution', url: 'https://naclo.org/resources/problems/2020/N2020-CS.pdf' },
        ],
      },
      {
        text: 'set in stone (part 2)',
        meta: '2020, round 1',
        links: [
          { label: 'video', url: 'https://youtu.be/pQrb64Dkku8?si=HULTukl6RVSSBs9T&t=0' },
          { label: 'blank', url: 'https://naclo.org/resources/problems/2020/N2020-C.pdf' },
          { label: 'solution', url: 'https://naclo.org/resources/problems/2020/N2020-CS.pdf' },
        ],
      },
      {
        text: 'set in stone (part 3)',
        meta: '2020, round 1',
        links: [
          { label: 'video', url: 'https://youtu.be/v3lUbchwCw0?si=ZH2JN3y4jDtHXO6e&t=0' },
          { label: 'blank', url: 'https://naclo.org/resources/problems/2020/N2020-C.pdf' },
          { label: 'solution', url: 'https://naclo.org/resources/problems/2020/N2020-CS.pdf' },
        ],
      },
      {
        text: 'chess tournament (part 1)',
        meta: '2016, round 1',
        links: [
          { label: 'video', url: 'https://youtu.be/4d35qAkGvQo?si=0G0aM4i-kS6c8SC8&t=0' },
          { label: 'blank', url: 'https://naclo.org/resources/problems/2016/N2016-N.pdf' },
          { label: 'solution', url: 'https://naclo.org/resources/problems/2016/N2016-NS.pdf' },
        ],
      },
      {
        text: 'chess tournament (part 2)',
        meta: '2016, round 1',
        links: [
          { label: 'video', url: 'https://youtu.be/c18R-9w7ldc?si=dedewZrNbG-3ZDl0&t=0' },
          { label: 'blank', url: 'https://naclo.org/resources/problems/2016/N2016-N.pdf' },
          { label: 'solution', url: 'https://naclo.org/resources/problems/2016/N2016-NS.pdf' },
        ],
      },
      {
        text: 'we are all molistic in a way',
        meta: '2007, round 1',
        links: [
          { label: 'video', url: 'https://youtu.be/O6Cel0m73MY?si=gxT-iB4IJ43SLtqI&t=0' },
          { label: 'blank', url: 'https://naclo.org/resources/problems/2007/N2007-A.pdf' },
          { label: 'solution', url: 'https://naclo.org/resources/problems/2007/N2007-AS.pdf' },
        ],
      },
    ],
  },
  {
    heading: 'other',
    items: [
      {
        text: 'senior mentor, [computer science mentors](https://csmentors.studentorg.berkeley.edu/#/)',
        meta: 'spring 2024 – fall 2024',
      },
      { text: 'learned how to teach teachers, learned how to teach students' },
    ],
  },
]
