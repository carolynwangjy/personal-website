import './global.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ConditionalFooter } from './components/conditional-footer'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Next.js Portfolio Starter',
    template: '%s | Next.js Portfolio Starter',
  },
  description: 'This is my portfolio.',
  openGraph: {
    title: 'My Portfolio',
    description: 'This is my portfolio.',
    url: baseUrl,
    siteName: 'My Portfolio',
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
  return (
    <html
      lang="en"
      className={cx('text-black bg-[#f5f5f5] dark:text-white dark:bg-black', inter.className)}
    >
      <body
      className={cx(
          'antialiased max-w-[45rem] mx-6 mt-6 lg:mx-auto text-black bg-[#f5f5f5] dark:text-white dark:bg-black',
          inter.className
      )}
    >
        <main className="flex-auto min-w-0 mt-4 flex flex-col px-4 md:px-8">
          <Navbar />
          {children}
          <ConditionalFooter />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
