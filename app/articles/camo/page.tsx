export async function generateMetadata() {
  return {
    title: 'CAMO: The Art of Pre-Snap Disguise',
    description: 'Redirecting to Kaggle notebook...',
  }
}

export default function CAMOArticle() {
  if (typeof window !== 'undefined') {
    window.location.href = 'https://www.kaggle.com/code/brochillington/camo-the-art-of-pre-snap-disguise'
  }
  
  return null
}
