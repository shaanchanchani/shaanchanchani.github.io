'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Create a loading placeholder that matches your card dimensions
const LoadingPlaceholder = () => (
  <div className="w-full h-[400px] rounded-lg border border-[#00151e]/20 animate-pulse bg-gray-100" />
)

interface SwipeableCardStackProps {
  children: React.ReactNode
}

// Dynamically import the actual component
const DynamicSwipeableCardStack = dynamic(
  () => import('./SwipeableCardStack'),
  {
    ssr: false,
    loading: () => <LoadingPlaceholder />,
  }
)

export default function SwipeableCardStackWrapper(props: SwipeableCardStackProps) {
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <DynamicSwipeableCardStack {...props} />
    </Suspense>
  )
}
