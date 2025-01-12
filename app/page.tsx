'use client'

import { DynamicPlot } from '@/components/DynamicPlot'
import { Data } from 'plotly.js'

export default function Home() {
  const data: Partial<Data>[] = [{
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    type: 'scatter' as const,
    mode: 'lines+markers',
    marker: {
      color: '#4ec9b0'
    },
    line: {
      color: '#4ec9b0'
    }
  }]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Site</h1>
      <p className="text-lg mb-4">
        This is a sample visualization using Plotly.js
      </p>
      <div className="h-[400px] w-full">
        <DynamicPlot data={data} />
      </div>
    </div>
  )
}
