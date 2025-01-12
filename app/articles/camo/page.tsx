'use client'

import Link from 'next/link'
import MarkdownWithMath from '@/components/MarkdownWithMath'

const introContent = `# Introduction: Decoding Defensive Coverage Assignments

Metric Track | Authors: [Nick Gurol](www.linkedin.com/in/nick-gurol-87738a1b7), [Shaan Chanchani](https://www.linkedin.com/in/shaan-chanchani/), [Ben Wolbransky](https://www.linkedin.com/in/benwolbransky/), [Tim Bryan](https://www.linkedin.com/in/timothy-bryan-384360118/)

Understanding defensive coverage assignments at a granular level is a challenge within the football analytics space. Predicting frame-level outcomes and mapping play-level metrics to individual players are among the toughest problems to solve in this domain. Inspired by the insights provided by [Next Gen Stats](https://x.com/NextGenStats/status/1847099446590648369), we developed CAMO (**Coverage Assignment Misclassification Ownership**)—a metric designed to quantify how individual players contribute to disguising a defense's coverage in the pre-snap phase of a play.

Leveraging the Transformer architecture for tracking data through an adapted **[SumerSports framework](https://www.kaggle.com/code/pvabish/modeling-with-transformers-by-sumersports)**[1] we trained a model to perform static single-frame coverage classification across ~15k plays in the competition dataset. The model's attention weights are then distributed across defensive players, yielding a player-level metric that effectively measures each defender's contribution to coverage deception. 

### Objectives
1. **Visualize player-by-player coverage assignments**: Highlight how individual players contribute to coverage predictions.
2. **Accurately predict 1 of 8 coverage assignments for every frame of every play**: Achieve frame-by-frame predictions before zooming in on the pre-snap window.
3. **Develop CAMO**: Introduce a novel metric to assess **C**overage **A**ssignment **M**issclassification **O**wnership.
4. **Use CAMO**: Understand what team level strategies and player level movements contribute the most to a disguised coverage.`

const formulaContent = `## 2022 Model MisClassification Rate Per Team

The **team-level miss-classification rate (MR)** for the **line_set to ball_snap** window is defined as:

$ \\text{Team MR}_{\\text{line set to ball snap}} = \\frac{\\sum_{p=1}^{P} \\sum_{f \\in F_{p,\\text{line set to ball snap}}} \\mathbb{1}(\\hat{C}_{f,p} \\neq C_{f,p})}{\\sum_{p=1}^{P} |F_{p,\\text{line set to ball snap}}|} \\times 100 $

### Explanation
- **$ \\text{Team MR}_{\\text{line set to ball snap}} $**: Average misclassification rate for a team during the **line_set to ball_snap** window.
- **$ P $**: Total number of plays for the team.
- **$ F_{p,\\text{line set to ball snap}} $**: Set of frames within the **line_set to ball_snap** window for play $ p $.
- **$ \\mathbb{1}(\\hat{C}_{f,p} \\neq C_{f,p}) $**: Indicator function, equal to 1 if the **predicted coverage** ($ \\hat{C}_{f,p} $) for frame $ f $ of play $ p $ does not match the **true coverage** ($ C_{f,p} $), and 0 otherwise.
- **$ |F_{p,\\text{line set to ball snap}}| $**: Total number of frames in the **line_set to ball_snap** window for play $ p $.`

const CAMOArticle: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white">
      <Link href="/" className="fixed top-4 left-4 text-gray-400 hover:text-[#00b4b4]">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z"/>
        </svg>
      </Link>
      <main className="container mx-auto px-4 py-8">
        <MarkdownWithMath content={introContent} />
        
        <div className="my-8">
          <iframe 
            src="https://www.kaggle.com/brochillington/camo-the-art-of-pre-snap-disguise/notebook?cellId=15" 
            height="800" 
            style={{ margin: '0 auto', width: '100%', maxWidth: '950px', backgroundColor: '#1e1e1e' }} 
            frameBorder="0" 
            scrolling="auto" 
            title="CAMO: The Art of Pre-Snap Disguise"
            allowFullScreen
          />
        </div>

        <MarkdownWithMath content={formulaContent} />
      </main>
    </div>
  )
}

export default CAMOArticle
