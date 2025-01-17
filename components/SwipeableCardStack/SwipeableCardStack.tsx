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
    const maxDrag = containerWidth * 0.5
    const boundedDiff = Math.max(Math.min(diff, maxDrag), -maxDrag)
    setDragOffset(boundedDiff)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    const diff = startX.current - currentX.current
    const containerWidth = containerRef.current?.offsetWidth || 0
    const threshold = containerWidth * 0.2 // 20% of container width

    if (Math.abs(diff) > threshold) {
      navigate(diff > 0 ? 1 : -1)
    } else {
      setDragOffset(0) // Spring back if threshold not met
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
    e.preventDefault() // Prevent scrolling while swiping
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    currentX.current = e.touches[0].clientX
    const diff = currentX.current - startX.current
    const containerWidth = containerRef.current?.offsetWidth || 0
    const maxDrag = containerWidth * 0.4 // Reduced max drag distance for more control
    const boundedDiff = Math.max(Math.min(diff, maxDrag), -maxDrag)
    setDragOffset(boundedDiff)
    e.preventDefault() // Prevent scrolling while swiping
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    const diff = startX.current - currentX.current
    const containerWidth = containerRef.current?.offsetWidth || 0
    const threshold = containerWidth * 0.15 // Reduced threshold for easier swipes

    if (Math.abs(diff) > threshold) {
      navigate(diff > 0 ? 1 : -1)
    } else {
      setDragOffset(0)
    }
  }

  return (
    <div className="w-full flex justify-center">
      <div className={`${containerWidth} relative`}>
        <div 
          ref={containerRef}
          className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className={`flex will-change-transform ${
              isDragging ? 'transition-none' : 'transition-all duration-300 ease-out'
            }`}
            style={{ 
              transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
              width: `${childArray.length * 100}%`
            }}
          >
            {childArray.map((child, index) => (
              <div 
                key={index} 
                className="w-full flex-shrink-0"
                style={{
                  transform: isDragging ?
                    `scale(${Math.max(0.98, 1 - Math.abs(dragOffset) / (containerRef.current?.offsetWidth || 1) * 0.05)})` : 
                    'scale(1)',
                  transition: isDragging ? 'none' : 'all 300ms ease-out',
                  opacity: isDragging ? 
                    Math.max(0.8, 1 - Math.abs(dragOffset) / (containerRef.current?.offsetWidth || 1) * 0.4) : 
                    1
                }}
              >
                {child}
              </div>
            ))}
          </div>
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

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {childArray.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-[#00151e]' : 'bg-[#00151e]/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SwipeableCardStack
