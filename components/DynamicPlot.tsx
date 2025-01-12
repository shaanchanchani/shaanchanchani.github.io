import dynamic from 'next/dynamic'
import { Layout, Data } from 'plotly.js'

// Import Plotly with no SSR
const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <div>Loading plot...</div>
})

interface PlotProps {
  data: Array<Partial<Data>>
  layout?: Partial<Layout>
}

export function DynamicPlot({ data, layout = {} }: PlotProps) {
  return (
    <Plot
      data={data}
      layout={{
        autosize: true,
        margin: { l: 50, r: 50, t: 50, b: 50 },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        font: { color: '#ffffff' },
        ...layout
      }}
      useResizeHandler={true}
      style={{ width: "100%", height: "100%" }}
      config={{
        displayModeBar: false,
        responsive: true
      }}
    />
  )
}
