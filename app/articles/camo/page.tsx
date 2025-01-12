'use client'

export default function CAMOArticle() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <iframe 
          src="https://www.kaggle.com/embed/brochillington/camo-the-art-of-pre-snap-disguise?kernelSessionId=216705422" 
          height="800" 
          style={{ margin: '0 auto', width: '100%', maxWidth: '950px' }} 
          frameBorder="0" 
          scrolling="auto" 
          title="CAMO: The Art of Pre-Snap Disguise"
        />
      </div>
    </div>
  )
}
