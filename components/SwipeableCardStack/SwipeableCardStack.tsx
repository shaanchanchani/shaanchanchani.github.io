'use client'

import React, { useState, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
      const resistance = 0.15 // More resistance at edges
      setDragOffset(diff * resistance)
      return
    }
    
    const maxDrag = containerWidth * 0.5
    const boundedDiff = Math.max(Math.min(diff, maxDrag), -maxDrag)
    setDragOffset(boundedDiff)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    const diff = currentX.current - startX.current
    const containerWidth = containerRef.current?.offsetWidth || 0
    const threshold = containerWidth * 0.2

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
      const resistance = 0.15 // More resistance at edges
      setDragOffset(diff * resistance)
      return
    }
    
    const maxDrag = containerWidth * 0.5
    const boundedDiff = Math.max(Math.min(diff, maxDrag), -maxDrag)
    setDragOffset(boundedDiff)
    e.preventDefault()
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    const diff = currentX.current - startX.current
    const containerWidth = containerRef.current?.offsetWidth || 0
    const threshold = containerWidth * 0.2

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
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-gray-800 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows (Desktop Only) */}
        <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 w-full justify-between pointer-events-none px-2">
          <button
            onClick={() => navigate(-1)}
            className={`p-1.5 rounded-full bg-black/10 hover:bg-black/20 transition-colors pointer-events-auto ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate(1)}
            className={`p-1.5 rounded-full bg-black/10 hover:bg-black/20 transition-colors pointer-events-auto ${
              currentIndex === childArray.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={currentIndex === childArray.length - 1}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SwipeableCardStack
