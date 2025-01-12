import { BarChart } from 'lucide-react'

interface ChartData {
  [key: string]: unknown
}

export default function ChartBlock({ data }: { data: ChartData }) {
  return (
    <div className="bg-[#2d2d2d] p-4 rounded-lg my-4">
      <h3 className="text-lg font-semibold text-[#4ec9b0] flex items-center">
        <BarChart className="mr-2 h-5 w-5" />
        Chart
      </h3>
      <p className="mt-2">This is a placeholder for a chart component. Data: {JSON.stringify(data)}</p>
    </div>
  )
}
