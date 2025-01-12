import { spawn } from 'child_process';

export interface PlayFigure {
  data: Record<string, unknown>;
  layout: Record<string, unknown>;
}

export async function Play(gameId: number, playId: number): Promise<PlayFigure> {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python3', ['nfl_animator.py', gameId.toString(), playId.toString()]);
    
    let result = '';
    let error = '';

    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Python process exited with code ${code}: ${error}`));
        return;
      }
      
      try {
        const figure = JSON.parse(result);
        resolve(figure);
      } catch (e) {
        reject(new Error(`Failed to parse Python output: ${e}`));
      }
    });
  });
}
