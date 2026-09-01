import { getAllPosts } from 'app/lib/posts'
import { getHobbies } from 'app/lib/hobbies'
import { baseUrl } from 'app/lib/site'

export default async function sitemap() {
  let blogs = getAllPosts().map((post) => ({
    url: `${baseUrl}/writing/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let hobbies = getHobbies().map((hobby) => ({
    url: `${baseUrl}/hobbies/${hobby.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  let routes = ['', '/blog', '/teaching', '/experience', '/hobbies'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...hobbies, ...blogs]
}
