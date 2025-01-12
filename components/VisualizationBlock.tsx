import { PieChart } from 'lucide-react'

export default function VisualizationBlock({ data }: { data: any }) {
  return (
    <div className="bg-[#2d2d2d] p-4 rounded-lg my-4">
      <h3 className="text-lg font-semibold text-[#4ec9b0] flex items-center">
        <PieChart className="mr-2 h-5 w-5" />
        Visualization
      </h3>
      <p className="mt-2">This is a placeholder for a visualization component. Data: {JSON.stringify(data)}</p>
    </div>
  )
}

