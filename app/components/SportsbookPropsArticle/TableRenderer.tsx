import React from 'react';

export const renderTable = (headers: string[], rows: Record<string, string | number>[]) => (
  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-b-lg font-mono text-sm overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th key={i} className={`px-3 py-2 ${typeof rows[0]?.[header] === 'number' || header.includes('Score') || header.includes('Correlation') || header.includes('Vig') ? 'text-right' : 'text-left'}`}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
        {rows.map((row, i) => (
          <tr key={i}>
            {headers.map((header, j) => (
              <td key={j} className={`px-3 py-2 ${typeof row[header] === 'number' || header.includes('Score') || header.includes('Correlation') || header.includes('Vig') ? 'text-right' : ''}`}>
                {row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
