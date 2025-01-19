'use client'

import React, { useState, useRef, useCallback } from 'react'

interface SwipeableCardStackProps {
  children: React.ReactNode
  containerWidth?: string
}

const SwipeableCardStack = ({ children, containerWidth = "w-11/12 md:w-4/5" }: SwipeableCardStackProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const startX = useRef(0)
  const currentX = useRef(0)
  const childArray = React.Children.toArray(children)
  const containerRef = useRef<HTMLDivElement>(null)

  const navigate = useCallback((direction: number) => {
    const newIndex = currentIndex + direction
    if (newIndex >= 0 && newIndex < childArray.length) {
      setCurrentIndex(newIndex)
      setDragOffset(0)
    }
  }, [currentIndex, childArray.length])

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    startX.current = e.clientX
    currentX.current = e.clientX
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    currentX.current = e.clientX
    const diff = currentX.current - startX.current
    const containerWidth = containerRef.current?.offsetWidth || 0
    
    // Prevent swiping left on first card or right on last card
    if ((currentIndex === 0 && diff > 0) || (currentIndex === childArray.length - 1 && diff < 0)) {
      const resistance = 0.25 // Increased resistance at edges for smoother feel
      setDragOffset(diff * resistance)
      return
    }
    
    const maxDrag = containerWidth * 0.6 // Increased max drag distance
    const boundedDiff = Math.max(Math.min(diff, maxDrag), -maxDrag)
    setDragOffset(boundedDiff)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    const diff = currentX.current - startX.current
    const containerWidth = containerRef.current?.offsetWidth || 0
    const threshold = containerWidth * 0.10 // Reduced threshold to 10% for even easier swipes

    if (Math.abs(diff) > threshold) {
      navigate(diff < 0 ? 1 : -1)
    } else {
      setDragOffset(0)
    }
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp()
    }
  }

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    startX.current = e.touches[0].clientX
    currentX.current = e.touches[0].clientX
    e.preventDefault()
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    currentX.current = e.touches[0].clientX
    const diff = currentX.current - startX.current
    const containerWidth = containerRef.current?.offsetWidth || 0
    
    // Prevent swiping left on first card or right on last card
    if ((currentIndex === 0 && diff > 0) || (currentIndex === childArray.length - 1 && diff < 0)) {
      const resistance = 0.25 // Increased resistance at edges for smoother feel
      setDragOffset(diff * resistance)
      return
    }
    
    const maxDrag = containerWidth * 0.6 // Increased max drag distance
    const boundedDiff = Math.max(Math.min(diff, maxDrag), -maxDrag)
    setDragOffset(boundedDiff)
    e.preventDefault()
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    const diff = currentX.current - startX.current
    const containerWidth = containerRef.current?.offsetWidth || 0
    const threshold = containerWidth * 0.10 // Reduced threshold to 10% for even easier swipes

    if (Math.abs(diff) > threshold) {
      navigate(diff < 0 ? 1 : -1)
    } else {
      setDragOffset(0)
    }
  }

  return (
    <div className="w-full flex justify-center">
      <div className={`${containerWidth} mx-auto relative`}>
        <div
          ref={containerRef}
          className="relative overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`flex transform will-change-transform ${
              isDragging ? '' : 'transition-transform duration-150 ease-out'
            }`}
            style={{ 
              transform: `translate3d(calc(-${currentIndex * 100}% + ${dragOffset}px), 0, 0)`,
              width: `${childArray.length * 100}%`,
              backfaceVisibility: 'hidden'
            }}
          >
            {childArray.map((child, index) => (
              <div 
                key={index} 
                className={`w-full flex-shrink-0 ${isDragging ? 'scale-99' : ''}`}
                style={{
                  transform: 'translate3d(0, 0, 0)',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform'
                }}
              >
                {child}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-4">
          {childArray.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-opacity duration-300 ${
                index === currentIndex 
                  ? 'bg-black/40' 
                  : 'bg-black/10 hover:bg-black/20'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SwipeableCardStack
