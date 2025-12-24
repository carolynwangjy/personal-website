 'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

const navItems = [
  { href: '/', name: 'home' },
  { href: '/writing', name: 'writing' },
  { href: '/experience', name: 'experience' },
  { href: '/courses', name: 'courses' },
  { href: '/teaching', name: 'teaching' },
  { href: '/hobbies', name: 'hobbies' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <aside className="mb-12 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex items-center justify-start relative px-0 pb-0 fade md:overflow-visible scroll-pr-6 md:relative py-3"
          id="nav"
        >
          <div className="flex flex-wrap md:flex-nowrap items-center gap-x-4 gap-y-2 text-[17px] w-full md:w-auto">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative px-1 py-0.5 rounded text-neutral-900 dark:text-neutral-100"
                >
                  {item.name}
                  <span
                    className={[
                      'pointer-events-none absolute left-0 right-0 -bottom-[1px] h-[1.6px] rounded-full origin-center transition-transform duration-200 ease-out',
                      'bg-neutral-900 dark:bg-neutral-100',
                      active ? 'scale-x-100' : 'scale-x-0',
                      'group-hover:scale-x-100',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  />
                </Link>
              )
            })}
            {/* duplicate map removed */}
            {/* original links removed */}
            {false && navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors px-1 py-0.5 rounded hover:bg-[#f2e8da] hover:text-neutral-900 dark:hover:bg-neutral-800/70"
              >
                {item.name}
              </Link>
            ))}
            <div className="ml-4 md:ml-6 mt-0 md:mt-1">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </div>
    </aside>
  )
}
