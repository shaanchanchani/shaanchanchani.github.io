import React from 'react';

const NGSVisualizer = () => {
  return (
    <div className="w-full h-full min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">NGS Play Visualizer</h1>
        
        {/* Example Play Visualization */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Example Play</h2>
          <iframe
            src="/complete_play.html"
            className="w-full h-[600px] border-2 border-gray-200 rounded-lg"
          />
        </div>

        {/* JupyterLite REPL Integration */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Interactive Console</h2>
          <iframe
            src="https://jupyterlite.github.io/demo/repl/index.html?kernel=python&toolbar=1"
            className="w-full h-[600px] border-2 border-gray-200 rounded-lg"
            allow="clipboard-read; clipboard-write"
          />
        </div>

        {/* Example Code Section */}
        <div className="bg-card p-4 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Example Code</h2>
          <pre className="bg-muted p-4 rounded overflow-x-auto">
            <code>{`# Import required libraries
import nfl_animator as nfl

# Create a play visualization
play = nfl.Play(game_id=2022090800, play_id=57)

# Display the play
play`}</code>
          </pre>
        </div>

        {/* Instructions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">How to Use</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>The console above is a fully functional Python environment</li>
            <li>Copy and paste the example code into the console</li>
            <li>Modify the game_id and play_id to visualize different plays</li>
            <li>The visualization will appear directly in the console</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default NGSVisualizer;
