import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['katex'],
  async redirects() {
    return [
      // the old writing index; individual /writing/<slug> posts still resolve
      { source: '/writing', destination: '/blog', permanent: true },
      // fiction is the root page, so /fiction is a url people reasonably guess
      // from the tab and never a url this site serves. temporary, not permanent:
      // a 308 would be cached past the day fiction moves onto a page of its own.
      { source: '/fiction', destination: '/', permanent: false },
    ]
  },
}

export default nextConfig
