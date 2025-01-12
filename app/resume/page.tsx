import { Briefcase, GraduationCap, Code } from 'lucide-react'

export default function Resume() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#569cd6]">My Resume</h1>
      <section>
        <h2 className="text-2xl font-semibold text-[#4ec9b0] flex items-center">
          <Briefcase className="mr-2 h-6 w-6" />
          Experience
        </h2>
        <ul className="list-disc list-inside mt-2 space-y-2">
          <li>Software Engineer at Tech Company (2020-Present)</li>
          <li>Junior Developer at Startup (2018-2020)</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-[#4ec9b0] flex items-center">
          <GraduationCap className="mr-2 h-6 w-6" />
          Education
        </h2>
        <ul className="list-disc list-inside mt-2">
          <li>BS in Computer Science, University Name (2014-2018)</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-[#4ec9b0] flex items-center">
          <Code className="mr-2 h-6 w-6" />
          Skills
        </h2>
        <ul className="list-disc list-inside mt-2 space-y-2">
          <li>JavaScript, TypeScript, React, Next.js</li>
          <li>Node.js, Express, MongoDB</li>
          <li>Git, Docker, AWS</li>
        </ul>
      </section>
    </div>
  )
}

