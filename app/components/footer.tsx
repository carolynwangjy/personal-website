function ArrowIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="mb-12">
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-1.5 text-neutral-600 md:flex-row md:space-x-3 md:space-y-0 dark:text-neutral-300 text-sm">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="mailto:carolyn.wang@berkeley.edu"
          >
            <span className="-translate-y-[0.225rem]">
              <ArrowIcon />
            </span>
            <p className="ml-2 h-7">email</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/carolyn-wang-70a870276/"
          >
            <span className="-translate-y-[0.225rem]">
              <ArrowIcon />
            </span>
            <p className="ml-2 h-7">linkedin</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/vercel/next.js"
          >
            <span className="-translate-y-[0.225rem]">
              <ArrowIcon />
            </span>
            <p className="ml-2 h-7">github</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="/rss"
          >
            <span className="-translate-y-[0.225rem]">
              <ArrowIcon />
            </span>
            <p className="ml-2 h-7">rss</p>
          </a>
        </li>
      </ul>
    </footer>
  )
}
