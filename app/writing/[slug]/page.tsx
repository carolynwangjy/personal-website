import { notFound, permanentRedirect } from 'next/navigation'
import { getAllPosts, postHref } from 'app/lib/posts'

/**
 * Posts used to live here, under a name that said nothing about which list a
 * piece belonged to. They sit under their own section now, the way the hobby
 * pages always have — but these urls are on medium, in search results and in
 * whatever anyone bookmarked, so they keep working and point at the new one.
 */
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getAllPosts().find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  permanentRedirect(postHref(post))
}
