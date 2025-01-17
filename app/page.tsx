'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import SwipeableCardStack from '@/components/SwipeableCardStack'

const projects = [
  {
    title: 'Next Gen Stats Play Visualizer',
    description: 'Interactive 2D visualizer for Next Gen Stats player tracking data',
    technologies: ['Jupyter', 'Plotly'],
    github: 'https://github.com/shaanchanchani/ngs-visualizer',
    demo: '/projects/ngs-visualizer',
    preview: {
      type: 'iframe',
      src: '/rams_bucs.html'
    },
    date: 'Jan 6, 2025'
  },
  {
    title: 'HS Football CV System',
    description: 'Player detection model coupled with a field registration model to extract tracking data from film.',
    technologies: ['Pytorch', 'OpenCV'],
    github: '#',
    demo: '#',
    preview: {
      type: 'image',
      src: '/field-registration-demo.gif'
    },
    date: 'Nov 18, 2024'
  },
]

const articles = [
  {
    title: 'CAMO: The Art of Pre-Snap Disguise',
    description: 'NFL Big Data Bowl 2025 Submission',
    url: 'https://www.kaggle.com/code/brochillington/camo-the-art-of-pre-snap-disguise',
    image: '/big-data-bowl-transparent.png',
    date: 'Jan 6, 2025'
  },
  {
    title: 'Sportsbook Accuracy on NFL Player Props',
    description: 'OddsJam 2024 Quant Challenge',
    url: '/articles/sportsbook-props',
    image: '/oddsjam.webp',
    date: 'Feb 2, 2024'
  },
]

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-32 h-32">
            <Image
              src="/profile.jpeg"
              alt="Profile"
              fill
              className="rounded-full object-cover"
            />
          </div>
          
          <div className="text-center space-y-1">
            <h1 className="text-lg font-medium text-[#00151e]">Shaan Chanchani</h1>
            <p className="text-sm text-[#00151e]/70">Purdue ECE | MLE @ Huddlevision</p>
            <p className="text-sm text-[#00151e]/70">(Graduating May 2025)</p>
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education Section */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-base font-semibold text-[#00151e]">Education</h2>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image
                    src="/purdue_university_logo.jpeg"
                    alt="Purdue Logo"
                    fill
                    className="object-contain opacity-70"
                  />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-sm font-medium text-[#00151e]">Purdue University</h3>
                  <p className="text-sm text-[#00151e]/70">Bachelor&apos;s degree, Computer Engineering</p>
                  <p className="text-xs text-[#00151e]/70">Aug 2021 - May 2025</p>
                  <p className="text-xs text-[#00151e]/70">West Lafayette, Indiana</p>
                </div>
              </div>
            </div>
          </div>

          {/* Work Experience Section */}
          <div>
            <h2 className="text-base font-semibold mb-3 text-[#00151e]">Work Experience</h2>
            <div className="space-y-4">
              {/* Always visible experiences */}
              <div className="flex gap-3">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image
                    src="/huddlevision.svg"
                    alt="Huddlevision Logo"
                    fill
                    className="object-contain opacity-70"
                  />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-sm font-medium text-[#00151e]">Machine Learning Engineer</h3>
                  <p className="text-sm text-[#00151e]/70">Huddlevision • Aug 2024 - Present</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image
                    src="/purdue_university_logo.jpeg"
                    alt="Purdue Logo"
                    fill
                    className="object-contain opacity-70"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#00151e]">Purdue University</h3>
                  <p className="text-sm text-[#00151e]/70">West Lafayette, Indiana, United States</p>
                  <div className="mt-2 space-y-2">
                    <div>
                      <p className="font-medium text-[#00151e]"><span className="mr-2">▪</span>Undergraduate Researcher</p>
                      <p className="text-[#00151e]/70">Jan 2022 - Present</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#00151e]"><span className="mr-2">▪</span>Teaching Assistant, ECE 57000</p>
                      <p className="text-[#00151e]/70">Jan 2025 - Present</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image
                    src="/BTB.png"
                    alt="BTB Analytics Logo"
                    fill
                    className="object-contain opacity-70"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#00151e]">Software Consultant</h3>
                  <p className="text-sm text-[#00151e]/70">BTB Analytics • Jan 2025 - Present</p>
                  <p className="text-xs text-[#00151e]/70">West Lafayette, Indiana, United States</p>
                </div>
              </div>

              {/* Show More/Less Button and Expandable Content */}
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-[#00151e]/70 hover:text-[#00151e] transition-colors mx-auto"
              >
                <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
                <svg 
                  className={`w-5 h-5 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <div 
                className={`space-y-4 overflow-hidden transition-all duration-500 ease-in-out
                  ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="flex gap-3">
                  <div className="relative w-10 h-10 flex-shrink-0">
                    <Image
                      src="/john_deere.svg"
                      alt="John Deere Logo"
                      fill
                      className="object-contain opacity-70"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#00151e]">Software Engineering Intern</h3>
                    <p className="text-sm text-[#00151e]/70">John Deere • Apr 2024 - Aug 2024</p>
                    <p className="text-xs text-[#00151e]/70">Waterloo, Iowa, United States</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="relative w-10 h-10 flex-shrink-0">
                    <Image
                      src="/purdue_university_logo.jpeg"
                      alt="Purdue Logo"
                      fill
                      className="object-contain opacity-70"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#00151e]">Teaching Assistant, ENGR 13200</h3>
                    <p className="text-sm text-[#00151e]/70">Purdue University • Jan 2022 - May 2022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects and Articles Sections */}
        <div className="space-y-8">
          {/* Articles Section */}
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-[#00151e]">Articles</h2>
            <div className="max-w-[90vw] mx-auto">
              <SwipeableCardStack>
                {articles.map((article, index) => (
                  <div 
                    key={index} 
                    className="block border border-[#00151e]/20 rounded-lg p-4 space-y-4 bg-white"
                  >
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-[#00151e]">{article.title}</h3>
                        <p className="text-sm text-[#00151e]/70">{article.description}</p>
                        <p className="text-xs text-[#00151e]/50 mt-2">{article.date}</p>
                        <Link 
                          href={article.url} 
                          target="_blank" 
                          className="text-[#00151e] mt-2 inline-block hover:underline"
                        >
                          Read more →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </SwipeableCardStack>
            </div>
          </div>

          {/* Projects Section */}
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-[#00151e]">Projects</h2>
            <div className="max-w-[90vw] mx-auto">
              <SwipeableCardStack>
                {projects.map((project, index) => (
                  <div key={index} className="border border-[#00151e]/20 rounded-lg p-4 space-y-4 bg-white w-[600px]">
                    <h3 className="text-lg font-medium text-[#00151e]">{project.title}</h3>
                    <p className="text-sm text-[#00151e]/70">{project.description}</p>
                    
                    {/* Preview Section */}
                    <div className="h-[250px] bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                      {project.preview.type === 'iframe' ? (
                        <div className="relative w-[500px] h-[250px]">
                          <div className="absolute top-1/2 left-1/2 w-[1000px] h-[500px]" style={{ transform: 'translate(-50%, -50%) scale(0.5)' }}>
                            <iframe 
                              src={project.preview.src}
                              width="100%" 
                              height="100%" 
                              scrolling="no"
                              className="border-0"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="relative w-[500px] h-[250px]">
                          <Image
                            src={project.preview.src}
                            alt={project.title}
                            fill
                            className="object-contain"
                            style={{ pointerEvents: 'none' }}
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="px-2 py-1 text-xs rounded-full bg-[#00151e]/10 text-[#00151e]">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-[#00151e]/50">{project.date}</p>

                    {project.title === 'Next Gen Stats Play Visualizer' ? (
                      <Link 
                        href={project.demo} 
                        target="_blank" 
                        className="text-[#00151e] inline-block hover:underline"
                      >
                        Read more →
                      </Link>
                    ) : (
                      <div className="flex space-x-4">
                        <span className="text-[#00151e]/70">
                          More soon...
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </SwipeableCardStack>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
