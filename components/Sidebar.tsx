'use client'

import Link from 'next/link'
import { Home, FileText, User, ChevronRight, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export function Sidebar() {
  const [blogExpanded, setBlogExpanded] = useState(true)

  return (
    <aside className="w-64 bg-[#252526] text-[#cccccc] p-2 hidden md:block">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/" className="flex items-center p-2 hover:bg-[#2a2d2e] rounded">
              <Home className="mr-2 h-5 w-5" />
              Home
            </Link>
          </li>
          <li>
            <button 
              onClick={() => setBlogExpanded(!blogExpanded)}
              className="flex items-center p-2 hover:bg-[#2a2d2e] rounded w-full text-left"
            >
              {blogExpanded ? <ChevronDown className="mr-2 h-5 w-5" /> : <ChevronRight className="mr-2 h-5 w-5" />}
              Blog
            </button>
            {blogExpanded && (
              <ul className="ml-4 mt-2 space-y-2">
                <li>
                  <Link href="/blog/first-post" className="flex items-center p-2 hover:bg-[#2a2d2e] rounded">
                    <FileText className="mr-2 h-4 w-4" />
                    First Post
                  </Link>
                </li>
                {/* Add more blog posts here */}
              </ul>
            )}
          </li>
          <li>
            <Link href="/resume" className="flex items-center p-2 hover:bg-[#2a2d2e] rounded">
              <User className="mr-2 h-5 w-5" />
              Resume
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
