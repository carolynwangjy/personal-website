export const dynamic = 'force-dynamic'

const REST_URL = process.env.UPSTASH_REDIS_REST_URL
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN
const KEY = 'visits'

/**
 * Returns the running visit count, incrementing it when `?bump=1`.
 *
 * Backed by Upstash Redis over its REST API, so there is no npm dependency.
 * With the two env vars unset it returns `{ count: null }` and the footer
 * simply omits the sentence.
 */
export async function GET(request: Request) {
  if (!REST_URL || !REST_TOKEN) {
    return Response.json({ count: null })
  }

  const bump = new URL(request.url).searchParams.get('bump') === '1'

  try {
    const res = await fetch(`${REST_URL}/${bump ? 'incr' : 'get'}/${KEY}`, {
      headers: { Authorization: `Bearer ${REST_TOKEN}` },
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
