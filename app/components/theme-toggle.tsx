'use client'

import { useTheme } from './theme-provider'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative inline-flex items-center h-5 w-9 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 bg-neutral-200 dark:bg-[#151515] hover:bg-neutral-300 dark:hover:bg-[#1a1a1a] border border-neutral-500 dark:border-neutral-800"
      aria-label="Toggle theme"
    >
      <span
        className={`inline-block w-3.5 h-3.5 transform rounded-full bg-white dark:bg-neutral-600 transition-transform duration-200 ease-in-out ${
          theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      >
        {theme === 'dark' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-2.5 h-2.5 text-neutral-800 mt-0.5 ml-0.5"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3 h-3 text-yellow-500 mt-0.5 ml-0.5"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        )}
      </span>
    </button>
  )
}

