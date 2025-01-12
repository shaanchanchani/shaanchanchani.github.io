'use client'

export default function NGSVisualizer() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-[#00151e]">NGS Play Visualizer</h1>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-[#00151e] mb-2">Texans vs Chargers - Q2 10:00</h3>
            <div className="mb-4 text-[#00151e]/70 space-y-2">
              <p className="font-medium">D.Pierce right end for 75 yards, TOUCHDOWN</p>
              <ul className="text-sm space-y-1">
                <li>• Formation: I-Form, 2x1 alignment</li>
                <li>• Run Concept: Outside Zone with Lead/Pitch</li>
                <li>• Coverage: Cover-1 Man</li>
                <li>• EPA (Expected Points Added): +5.70</li>
                <li>• Score: Chargers 21 - Texans 0</li>
              </ul>
            </div>
            <div className="h-[600px] w-full border border-[#00151e]/20 rounded-lg overflow-hidden">
              <iframe 
                src="/chargers_texans.html"
                className="w-full h-full"
                title="Chargers vs Texans Play Animation"
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#00151e] mb-2">Rams vs Buccaneers - Q2 13:08</h3>
            <div className="mb-4 text-[#00151e]/70 space-y-2">
              <p className="font-medium">M.Stafford pass deep middle to C.Kupp for 69 yards, TOUCHDOWN</p>
              <ul className="text-sm space-y-1">
                <li>• Formation: Empty (3x2)</li>
                <li>• Pass: Deep Middle (27 yards), Completed</li>
                <li>• Coverage: Cover-3 Seam Zone</li>
                <li>• Time to Throw: 2.87s</li>
                <li>• EPA (Expected Points Added): +5.95</li>
                <li>• Score: Rams 3 - Bucs 0</li>
              </ul>
            </div>
            <div className="h-[600px] w-full border border-[#00151e]/20 rounded-lg overflow-hidden">
              <iframe 
                src="/rams_bucs.html"
                className="w-full h-full"
                title="Rams vs Buccaneers Play Animation"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#00151e]">About the Visualization</h2>
          <p className="text-[#00151e]/70">
            Hover over players to see detailed tracking data captured by RFID chips in their shoulder pads. 
            Each tooltip shows:
          </p>
          <div className="space-y-4 text-[#00151e]/70">
            <div>
              <h3 className="font-medium">Basic Information</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Player name, jersey number, and position</li>
                <li>Current speed (yards/second)</li>
                <li>Acceleration/deceleration (yards/second²)</li>
                <li>Direction of movement (degrees)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium">Role-Specific Data</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Defenders: Coverage assignments</li>
                <li>Receivers: Route type and pattern</li>
                <li>Pass Rushers: Time to pressure and get-off time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
