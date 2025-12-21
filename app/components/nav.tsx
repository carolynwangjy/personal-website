import Link from 'next/link'

const navItems = [
  { href: '/', name: 'home' },
  { href: '/writing', name: 'writing' },
  { href: '/archives', name: 'experience' },
  { href: '/courses', name: 'courses' },
  { href: '/teaching', name: 'teaching' },
  { href: '/hobbies', name: 'hobbies' },
]

export function Navbar() {
  return (
    <aside className="mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex items-center justify-start relative px-0 pb-0 fade md:overflow-visible scroll-pr-6 md:relative py-5"
          id="nav"
        >
          <div className="flex items-center space-x-7 text-lg">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors px-1 py-0.5 rounded hover:bg-[#f2e8da] hover:text-neutral-900 dark:hover:bg-neutral-800/70"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  )
}
