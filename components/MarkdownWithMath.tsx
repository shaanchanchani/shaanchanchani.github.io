import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

interface MarkdownWithMathProps {
  content: string
}

export default function MarkdownWithMath({ content }: MarkdownWithMathProps) {
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      className="prose prose-invert max-w-none"
    >
      {content}
    </ReactMarkdown>
  )
}
