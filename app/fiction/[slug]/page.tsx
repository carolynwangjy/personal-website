import { PostPage, postMetadata, postParams } from 'app/components/post-page'

export function generateStaticParams() {
  return postParams('fiction')
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return postMetadata('fiction', slug)
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <PostPage collection="fiction" slug={slug} />
}
