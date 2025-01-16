'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-6">
          <div className="relative w-48 h-48">
            <Image
              src="/profile.jpeg"
              alt="Profile"
              fill
              className="rounded-full object-cover"
            />
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl text-[#00151e]">Shaan Chanchani</h1>
            <p className="text-[#00151e]/70">Purdue ECE | MLE @ Huddlevision</p>
            <p className="text-[#00151e]/70">(Graduating May 2025)</p>
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-6">
            <Link href="https://github.com/shaanchanchani" target="_blank" className="text-[#00151e]/70 hover:text-[#00151e] transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </Link>
            <Link href="https://twitter.com/shaan__c" target="_blank" className="text-[#00151e]/70 hover:text-[#00151e] transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </Link>
            <Link href="mailto:schancha@purdue.edu" target="_blank" className="text-[#00151e]/70 hover:text-[#00151e] transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
              </svg>
            </Link>
            <Link href="/resume.pdf" target="_blank" className="text-[#00151e]/70 hover:text-[#00151e] transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Education and Work Experience Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-[#00151e]">Education</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-[#00151e]">Purdue University</h3>
                <p className="text-[#00151e]/70">Bachelor&apos;s degree, Computer Engineering</p>
                <p className="text-sm text-[#00151e]/70">Aug 2021 - May 2025</p>
                <p className="text-sm text-[#00151e]/70">West Lafayette, Indiana</p>
              </div>
            </div>
          </div>

          {/* Work Experience Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-[#00151e]">Work Experience</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-[#00151e]">Machine Learning Engineer</h3>
                <p className="text-[#00151e]/70">Huddlevision • Aug 2024 - Present</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-[#00151e]">Software Engineering Intern</h3>
                <p className="text-[#00151e]/70">John Deere • Apr 2024 - Aug 2024</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-[#00151e]">Research Assistant</h3>
                <p className="text-[#00151e]/70">Purdue University • Aug 2023 - Jan 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Projects and Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Projects Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-[#00151e]">Projects</h2>
            <div className="space-y-4">
              <Link href="/projects/ngs-visualizer" className="block p-6 rounded-lg border border-[#00151e]/20 hover:border-[#00151e] transition-colors">
                <h3 className="text-lg font-medium text-[#00151e] mb-2">Next Gen Stats Play Visualizer</h3>
                <p className="text-[#00151e]/70 mb-2">Interactive 2D visualizer for Next Gen Stats player tracking data</p>
                <div className="relative w-full h-[250px] overflow-hidden mb-4">
                  <div className="absolute w-[200%] h-[200%] origin-top-left scale-[0.5] transform-gpu">
                    <iframe 
                      src="/chargers_texans.html" 
                      width="100%" 
                      height="100%" 
                      scrolling="no"
                      className="border-0"
                    />
                  </div>
                </div>
                <p className="text-sm text-[#00151e]/50 mb-2">Jan 6, 2025</p>
                <span className="text-[#00151e]">View Project →</span>
              </Link>
            </div>
          </div>

          {/* Articles Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-[#00151e]">Articles</h2>
            <div className="space-y-4">
              <Link href="https://www.kaggle.com/code/brochillington/camo-the-art-of-pre-snap-disguise" target="_blank" className="block p-6 rounded-lg border border-[#00151e]/20 hover:border-[#00151e] transition-colors">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src="/big-data-bowl-transparent.png"
                      alt="NFL Big Data Bowl"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#00151e] mb-2">CAMO: The Art of Pre-Snap Disguise</h3>
                    <p className="text-[#00151e]/70 mb-2">NFL Big Data Bowl 2025 Submission</p>
                    <p className="text-sm text-[#00151e]/50 mb-2">Jan 6, 2025</p>
                    <span className="text-[#00151e]">Read more →</span>
                  </div>
                </div>
              </Link>

              <Link href="/articles/sportsbook-props" className="block p-6 rounded-lg border border-[#00151e]/20 hover:border-[#00151e] transition-colors">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src="/oddsjam.webp"
                      alt="OddsJam"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#00151e] mb-2">Sportsbook Accuracy on NFL Player Props</h3>
                    <p className="text-[#00151e]/70 mb-2">OddsJam 2024 Quant Challenge</p>
                    <p className="text-sm text-[#00151e]/50 mb-2">Feb 2, 2024</p>
                <span className="text-[#00151e]">Read more →</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
