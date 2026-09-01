import fs from 'fs'
import path from 'path'
import { parseFrontmatter } from './frontmatter'

/**
 * Which folder a post lives in decides which list it shows up in — there is
 * no category field to keep in sync. Drop a new .mdx file in one of these.
 */
export const COLLECTIONS = {
  'short-stories': 'app/content/short-stories',
  blog: 'app/content/blog',
} as const

export type Collection = keyof typeof COLLECTIONS

export type PostMetadata = {
  title: string
  publishedAt: string
  summary?: string
  image?: string
  subtitle?: string
  originalLink?: string
  displayTitle?: string
}

export type Post = {
  collection: Collection
  slug: string
  metadata: PostMetadata
  content: string
}

function read(collection: Collection): Post[] {
  const dir = path.join(process.cwd(), COLLECTIONS[collection])

  return fs
    .readdirSync(dir)
    .filter((file) => path.extname(file) === '.mdx')
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
      const { meta, body } = parseFrontmatter(raw)

      return {
        collection,
        slug: path.basename(file, '.mdx'),
        metadata: meta as PostMetadata,
        content: body,
      }
    })
}

const newestFirst = (a: Post, b: Post) =>
  new Date(b.metadata.publishedAt).getTime() -
  new Date(a.metadata.publishedAt).getTime()

/** One folder's posts, newest first. */
export function getPosts(collection: Collection): Post[] {
  return read(collection).sort(newestFirst)
}

/** Every post from both folders, newest first. */
export function getAllPosts(): Post[] {
  return [...read('short-stories'), ...read('blog')].sort(newestFirst)
}
