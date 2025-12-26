import './global.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ConditionalFooter } from './components/conditional-footer'
import { ThemeProvider } from './components/theme-provider'
import { baseUrl } from './sitemap'
import { getLatestCommitDate } from './lib/git-date'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "carolyn wang's personal website :)",
    template: "%s | carolyn wang's personal website :)",
  },
  description: "carolyn is an undergraduate @ uc berkeley studying computer science and politics, philosophy & law (ppl).",
  openGraph: {
    title: "carolyn wang's personal website :)",
    description: "carolyn is an undergraduate @ uc berkeley studying computer science and politics, philosophy & law (ppl).",
    url: baseUrl,
    siteName: "carolyn wang's personal website :)",
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

const inter = Inter({ subsets: ['latin'] })
const cx = (...classes) => classes.filter(Boolean).join(' ')

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
  const month = (parts.find(p => p.type === 'month')?.value || '').toLowerCase()
  const day = parts.find(p => p.type === 'day')?.value || ''
  const year = parts.find(p => p.type === 'year')?.value || ''
  const dateString = `${month} ${day}, ${year}`
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.add(theme);
              })();
            `,
          }}
        />
      </head>
      <body
        className={cx(
          'antialiased max-w-[45rem] mx-6 mt-6 lg:mx-auto',
          inter.className,
        )}
      >
        <ThemeProvider>
          <main className="flex-auto min-w-0 mt-4 flex flex-col px-4 md:px-8">
            <Navbar />
            {children}
            <ConditionalFooter dateString={dateString} />
            <Analytics />
            <SpeedInsights />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
