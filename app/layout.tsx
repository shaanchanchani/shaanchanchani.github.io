import './globals.css'
import type { Metadata } from 'next'
import { Fira_Code } from 'next/font/google'

const firaCode = Fira_Code({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My VS Code-Inspired Site',
  description: 'Welcome to my personal site with a VS Code-inspired design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${firaCode.className} bg-[#1e1e1e] text-white min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
