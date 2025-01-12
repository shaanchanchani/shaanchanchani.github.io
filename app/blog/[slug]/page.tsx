import { getBlogPost, getBlogPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import ChartBlock from '@/components/ChartBlock'
import VisualizationBlock from '@/components/VisualizationBlock'
import { FileText } from 'lucide-react'

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="prose prose-invert lg:prose-xl max-w-none">
      <h1 className="text-[#569cd6] flex items-center">
        <FileText className="mr-2 h-8 w-8" />
        {post.title}
      </h1>
      <p className="text-[#ce9178]">{post.date}</p>
      <MDXRemote 
        source={post.content} 
        components={{
          ChartBlock,
          VisualizationBlock,
          h2: (props) => <h2 className="text-[#4ec9b0]" {...props} />,
          a: (props) => <a className="text-[#ce9178] hover:underline" {...props} />,
          code: (props) => <code className="bg-[#1e1e1e] text-[#d4d4d4] p-1 rounded" {...props} />,
        }}
      />
    </article>
  )
}

