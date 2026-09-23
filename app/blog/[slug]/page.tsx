import { PostPage, postMetadata, postParams } from 'app/components/post-page'

export function generateStaticParams() {
  return postParams('blog')
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return postMetadata('blog', slug)
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <PostPage collection="blog" slug={slug} />
}
