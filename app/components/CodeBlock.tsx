'use client'

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

interface Props {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<Props> = ({ code, language = 'python' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  return (
    <div className={`relative min-h-[40px] ${isExpanded ? 'border border-gray-200 dark:border-gray-700' : ''} rounded-lg`}>
      <div className="absolute top-2 left-2 flex gap-2 z-10">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-3 py-1 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
        >
          {isExpanded ? 'Hide Code' : 'Show Code'}
        </button>
        
        {isExpanded && (
          <button
            onClick={copyToClipboard}
            className="px-3 py-1 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 transition-all flex items-center gap-1"
            disabled={isCopied}
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        )}
      </div>
      
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