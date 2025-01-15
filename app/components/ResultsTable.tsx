'use client'

import * as React from 'react'

interface Props {
  data: Record<string, string | number>[];
}

const ResultsTable: React.FC<Props> = (props) => {
  const { data } = props;

  return React.createElement('div', { className: "overflow-x-auto" },
    React.createElement('table', { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700" },
      React.createElement('thead', { className: "bg-gray-50 dark:bg-gray-800" },
        React.createElement('tr', null,
          Object.keys(data[0]).map((header) =>
            React.createElement('th', {
              key: header,
              className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            }, header)
          )
        )
      ),
      React.createElement('tbody', { className: "bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700" },
        data.map((row, idx) =>
          React.createElement('tr', { key: idx },
            Object.values(row).map((value, i) =>
              React.createElement('td', {
                key: i,
                className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
              }, typeof value === 'number' ? value.toFixed(6) : value)
            )
          )
        )
      )
    )
  );
};

export default ResultsTable;
