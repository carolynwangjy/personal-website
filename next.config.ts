import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['katex'],
  async redirects() {
    return [
      // the old writing index; individual /writing/<slug> posts still resolve
      { source: '/writing', destination: '/blog', permanent: true },
    ]
  },
}

export default nextConfig
