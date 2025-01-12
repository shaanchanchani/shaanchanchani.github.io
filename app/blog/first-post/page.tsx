'use client'

import { DynamicPlot } from '@/components/DynamicPlot'
import { Data } from 'plotly.js'

export default function FirstPost() {
  const data: Partial<Data>[] = [{
    x: [2.5, 3, 3.5, 4],
    y: [14, 13, 15, 17],
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
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-[#4ec9b0] mb-4">Data Visualization with Plotly.js</h1>
      <p className="text-gray-400 text-xl mb-8">
        Exploring interactive data visualization using Plotly.js in a Next.js application
      </p>
      <div className="bg-[#2d2d2d] p-6 rounded-lg">
        <div className="h-[400px] w-full">
          <DynamicPlot data={data} />
        </div>
      </div>
    </div>
  )
}
