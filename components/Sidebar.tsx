'use client'

import Link from 'next/link'
import { Home, FileText, User, ChevronRight, ChevronDown, Menu } from 'lucide-react'
import { useState } from 'react'

export function Sidebar() {
  const [blogExpanded, setBlogExpanded] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 p-2 rounded bg-[#2a2d2e] md:hidden z-50"
      >
        <Menu className="h-6 w-6 text-[#cccccc]" />
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed md:static top-0 left-0 h-full bg-[#252526] text-[#cccccc] 
        transition-all duration-300 ease-in-out z-40
        ${isOpen ? 'w-64' : 'w-0 md:w-64'} 
      `}>
        <nav className="p-2 pt-16 md:pt-2">
          <ul className="space-y-2">
            <li>
              <Link href="/" className="flex items-center p-2 hover:bg-[#2a2d2e] rounded">
                <Home className="mr-2 h-5 w-5" />
                <span className={`${isOpen ? 'opacity-100' : 'opacity-0 md:opacity-100'} transition-opacity duration-200`}>
                  Home
                </span>
              </Link>
            </li>
            <li>
              <button 
                onClick={() => setBlogExpanded(!blogExpanded)}
                className="flex items-center p-2 hover:bg-[#2a2d2e] rounded w-full text-left"
              >
                {blogExpanded ? <ChevronDown className="mr-2 h-5 w-5" /> : <ChevronRight className="mr-2 h-5 w-5" />}
                <span className={`${isOpen ? 'opacity-100' : 'opacity-0 md:opacity-100'} transition-opacity duration-200`}>
                  Blog
                </span>
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
                <span className={`${isOpen ? 'opacity-100' : 'opacity-0 md:opacity-100'} transition-opacity duration-200`}>
                  Resume
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
