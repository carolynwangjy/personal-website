export const dynamic = 'force-dynamic'

const KEY = 'visits'

/**
 * Upstash exposes its REST credentials under different names depending on how
 * the database was created: direct signup, the older Vercel KV integration, or
 * the Vercel Marketplace (which prefixes everything with `storage_`). Accept
 * whichever pair is present.
 *
 * Note the read-write token — INCR needs it, the READ_ONLY one won't do.
 */
const CANDIDATES: [url: string, token: string][] = [
  ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'],
  ['KV_REST_API_URL', 'KV_REST_API_TOKEN'],
  ['storage_KV_REST_API_URL', 'storage_KV_REST_API_TOKEN'],
]

function credentials() {
  for (const [urlVar, tokenVar] of CANDIDATES) {
    const url = process.env[urlVar]
    const token = process.env[tokenVar]
    if (url && token) return { url: url.replace(/\/$/, ''), token }
  }
  return null
}

/**
 * Returns the running visit count, incrementing it when `?bump=1`.
 *
 * Talks to Upstash over its REST API, so there is no npm dependency. With no
 * credentials configured it returns `{ count: null }` and the footer simply
 * omits the sentence.
 */
export async function GET(request: Request) {
  const creds = credentials()
  if (!creds) {
    return Response.json({ count: null })
  }

  const bump = new URL(request.url).searchParams.get('bump') === '1'

  try {
    const res = await fetch(`${creds.url}/${bump ? 'incr' : 'get'}/${KEY}`, {
      headers: { Authorization: `Bearer ${creds.token}` },
      cache: 'no-store',
    })

    if (!res.ok) {
      return Response.json({ count: null })
    }

    const { result } = await res.json()
    const count = Number(result)

    return Response.json({ count: Number.isFinite(count) ? count : null })
  } catch {
    return Response.json({ count: null })
  }
}
