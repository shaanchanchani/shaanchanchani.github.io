import Link from 'next/link'
import { getBlogPosts } from '@/lib/blog'
import { FileText } from 'lucide-react'

export default async function Blog() {
  const posts = await getBlogPosts()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#569cd6]">My Blog</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="bg-[#2d2d2d] p-4 rounded-md">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-[#4ec9b0]" />
                <h2 className="text-2xl font-semibold text-[#4ec9b0] hover:underline">{post.title}</h2>
              </div>
              <p className="text-[#ce9178] mt-2">{post.date}</p>
              <p className="mt-2">{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

