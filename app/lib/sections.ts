import fs from 'fs'
import path from 'path'
import { parseFrontmatter } from './frontmatter'

export const SECTION_IDS = ['fiction', 'blog', 'teaching', 'work'] as const
export type SectionId = (typeof SECTION_IDS)[number]

export type Section = {
  id: SectionId
  /** tab label in the nav */
  label: string
  /** prose above the generated list */
  before: string
  /** prose below it — whatever follows a `<!-- list -->` line */
  after: string
}

/** a line that is just `<!-- list -->`, marking where the generated list goes */
const LIST_MARKER = /^[ \t]*<!--\s*list\s*-->[ \t]*$/m

/** Reads app/sections/<id>.mdx — the editable copy for each homepage section. */
export function getSections(): Record<SectionId, Section> {
  const entries = SECTION_IDS.map((id) => {
    const raw = fs.readFileSync(
      path.join(process.cwd(), 'app', 'sections', `${id}.mdx`),
      'utf-8'
    )
    const { meta, body } = parseFrontmatter(raw)
    const parts = body.split(LIST_MARKER)

    return [
      id,
      {
        id,
        label: meta.label || id,
        before: parts[0].trim(),
        after: parts.slice(1).join('\n\n').trim(),
      },
    ] as const
  })

  return Object.fromEntries(entries) as Record<SectionId, Section>
}
