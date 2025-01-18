import './globals.css'
import type { Metadata } from 'next'
import { Fira_Code } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import Script from 'next/script'

const firaCode = Fira_Code({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'shaan c',
  description: 'Welcome to my personal site with a VS Code-inspired design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={firaCode.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="bg-background text-foreground min-h-screen">
            {children}
          </div>
          <Script 
            strategy="afterInteractive"
            data-goatcounter="https://shaanc.goatcounter.com/count"
            src="//gc.zgo.at/count.js"
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
