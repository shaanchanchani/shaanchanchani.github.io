'use client'

import * as React from 'react'
import { InlineMath, BlockMath } from 'react-katex'

interface Props {
  formula: string;
  description?: string;
  block?: boolean;
}

const MathFormula: React.FC<Props> = (props) => {
  const { formula, description, block = false } = props;
  
  return React.createElement('div', { className: "my-4" },
    block
      ? React.createElement(BlockMath, { math: formula })
      : React.createElement(InlineMath, { math: formula }),
    description && React.createElement('p', {
      className: "text-sm text-gray-600 mt-2"
    }, description)
  );
};

export default MathFormula;
