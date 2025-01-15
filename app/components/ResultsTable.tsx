'use client'

import * as React from 'react'

interface Props {
  data: {
    headers: string[];
    rows: Record<string, string>[];
  };
}

const ResultsTable: React.FC<Props> = (props) => {
  const { data } = props;

  return React.createElement('div', { className: "overflow-x-auto" },
    React.createElement('table', { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700" },
      React.createElement('thead', { className: "bg-gray-50 dark:bg-gray-800" },
        React.createElement('tr', null,
          data.headers.map((header) =>
            React.createElement('th', {
              key: header,
              className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            }, header)
          )
        )
      ),
      React.createElement('tbody', { className: "bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700" },
        data.rows.map((row, idx) =>
          React.createElement('tr', { key: idx },
            data.headers.map((header, i) =>
              React.createElement('td', {
                key: i,
                className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
              }, row[header])
            )
          )
        )
      )
    )
  );
};

export default ResultsTable;
