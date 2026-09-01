import './global.css'
import 'katex/dist/katex.min.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { baseUrl } from './sitemap'
import { getLatestCommitDate } from './lib/git-date'

const description =
  "carolyn is an undergrad at uc berkeley majoring in computer science and minoring in politics, philosophy & law (ppl) as part of the eecs honors program. she's doing nlp research at bair, teaching cs189, and inhabiting a little intellectual burrow between machine learning and social systems."

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'carolyn wang',
    template: '%s | carolyn wang',
  },
  description,
  openGraph: {
    title: 'carolyn wang',
    description,
    url: baseUrl,
    siteName: 'carolyn wang',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get the commit date on the server side and convert to Pacific time
  const commitDate = getLatestCommitDate()
  // Format date components in Pacific time (handles both PST and PDT automatically)
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  const parts = formatter.formatToParts(commitDate)
  const month = (parts.find((p) => p.type === 'month')?.value || '').toLowerCase()
  const day = parts.find((p) => p.type === 'day')?.value || ''
  const year = parts.find((p) => p.type === 'year')?.value || ''
  const dateString = `${month} ${day}, ${year}`

  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="light dark" />
      </head>
      <body>
        <main>
          {children}
          <footer>
            <p className="links">
              <a href="mailto:carolynwang.jy@berkeley.edu">email</a>
              <a
                href="https://www.linkedin.com/in/carolyn-wang-jy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin
              </a>
              <a
                href="https://github.com/carolynwangjy"
                target="_blank"
                rel="noopener noreferrer"
              >
                github
              </a>
              <a href="/rss">rss</a>
            </p>
            <p>
              last updated{' '}
              <a
                href="https://github.com/carolynwangjy/personal-website"
                target="_blank"
                rel="noopener noreferrer"
              >
                {dateString}
              </a>
              . built with love ᯓ ᥫ᭡
            </p>
          </footer>
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
