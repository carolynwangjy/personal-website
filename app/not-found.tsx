import Link from 'next/link'

export default function NotFound() {
  return (
    <section>
      <h1>404 — page not found</h1>
      <p>the page you are looking for does not exist.</p>
      <p>
        <Link href="/">← back home</Link>
      </p>
    </section>
  )
}
