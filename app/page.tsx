'use client'

import { DynamicPlot } from '@/components/DynamicPlot'
import Link from 'next/link'

export default function Home() {
  const data = [{
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    type: 'scatter',
    mode: 'lines+markers',
    marker: { color: '#00ff00' },
    line: { color: '#00ff00' }
  }]

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Welcome to My Site</h1>
      <p className="text-xl">
        This is a VS Code-inspired personal website.
      </p>
      <div className="h-[400px] w-full">
        <DynamicPlot data={data} />
      </div>
    </div>
  )
}
