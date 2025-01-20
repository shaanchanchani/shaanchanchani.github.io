'use client'

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  code: string;
  language?: string;
  output?: string;
  title?: string;
  children?: React.ReactNode;
  defaultExpanded?: boolean;
  showExpandButton?: boolean;
}

const CodeBlock: React.FC<Props> = ({ 
  code, 
  language = 'python', 
  output, 
  title, 
  children,
  defaultExpanded = false,
  showExpandButton = true
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isCopied, setIsCopied] = useState(false);
  
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  return (
    <div className={`${isExpanded ? 'my-4' : 'my-1'} w-full max-w-4xl mx-auto`}>
      {showExpandButton && (
        <div className={`flex justify-center ${isExpanded ? 'mb-4' : '-mb-2'}`}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`px-2 ${isExpanded ? 'py-0.5' : 'py-0'} text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 text-xs font-medium flex items-center gap-0.5 transition-colors`}
          >
            {isExpanded ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
            {title || (isExpanded ? 'Hide Code' : 'Show hidden code')}
          </button>
        </div>
      )}
      
      <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'mt-2' : '-mt-2'} overflow-hidden ${
        isExpanded ? 'max-h-[2000px] opacity-100' : (showExpandButton ? 'max-h-0 opacity-0' : 'opacity-100')
      }`}>
        <div className="space-y-2">
          <div className="relative rounded-lg overflow-hidden bg-gray-900">
            <div className="absolute right-2 top-2 z-10">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-800/50 hover:bg-gray-700/50 rounded text-xs text-gray-300 transition-colors"
                disabled={isCopied}
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            
            <SyntaxHighlighter
              language={language}
              style={tomorrow}
              customStyle={{
                margin: 0,
                padding: '2rem',
                paddingTop: '3.5rem',
                borderRadius: '0.5rem',
                background: '#1a1a1a'
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
          {output && (
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-xs">
              {output}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;