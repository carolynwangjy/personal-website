'use client'

import { usePathname } from 'next/navigation'
import Footer, { FooterWithLinks } from './footer'

export function ConditionalFooter() {
  const pathname = usePathname()
  
  // Show footer with links on homepage, empty footer on other pages
  if (pathname === '/') {
    return <FooterWithLinks />
  }
  
  return <Footer />
}

