import Link from 'next/link'

const navItems = [
  { href: '/', name: 'bio' },
  { href: '/blog', name: 'writing' },
  { href: '#courses', name: 'courses' },
  { href: '/hobbies', name: 'hobbies' },
  { href: '/archives', name: 'archives' },
]

export function Navbar() {
  return (
    <aside className="mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex items-center justify-between relative px-0 pb-0 fade md:overflow-visible scroll-pr-6 md:relative py-4"
          id="nav"
        >
          <div className="flex items-center space-x-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-xl">
              ☺️
            </span>
            <span className="text-lg font-semibold uppercase tracking-[0.18em] text-neutral-900 dark:text-neutral-100">
              Carolyn Wang
            </span>
          </div>
          <div className="flex items-center space-x-7 text-lg">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 pb-0 underline-offset-[2px] decoration-[1.5px] hover:underline"
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
