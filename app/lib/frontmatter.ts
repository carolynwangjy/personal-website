/** Splits `---` frontmatter off an mdx file. Values are plain strings. */
export function parseFrontmatter(raw: string) {
  const match = /^---\s*([\s\S]*?)\s*---/.exec(raw)
  const meta: Record<string, string> = {}

  if (match) {
    for (const line of match[1].split('\n')) {
      const [key, ...rest] = line.split(': ')
      if (rest.length === 0) continue
      meta[key.trim()] = rest.join(': ').trim().replace(/^['"](.*)['"]$/, '$1')
    }
  }

  return { meta, body: raw.replace(/^---[\s\S]*?---/, '').trim() }
}
