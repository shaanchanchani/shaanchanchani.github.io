'use client'

import * as React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Props {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<Props> = ({ code, language = 'python' }) => {
  const [isExpanded, setIsExpanded] = React.useState(true);
  
  return (
    <div className={`relative min-h-[40px] ${isExpanded ? 'border border-gray-200 dark:border-gray-700' : ''} rounded-lg`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute top-2 right-2 px-3 py-1 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 z-10"
      >
        {isExpanded ? 'Hide Code' : 'Show Code'}
      </button>
      <div className={`transition-all duration-300 ${isExpanded ? 'max-h-[600px] overflow-auto' : 'max-h-0 overflow-hidden'}`}>
        <SyntaxHighlighter
          language={language}
          style={tomorrow}
          customStyle={{
            margin: 0,
            borderRadius: '0.5rem',
            padding: '1rem',
            paddingTop: '3rem',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
