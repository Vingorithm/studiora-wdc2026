import { useRef, useState, useEffect, useCallback } from 'react'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

function useScrollProgress(containerRef) {
  const [progress, setProgress] = useState(0)

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return
    const el = containerRef.current
    const rect = el.getBoundingClientRect()
    const windowH = window.innerHeight
    // How far we've scrolled into the container
    const scrolled = windowH - rect.top
    const total = windowH + rect.height
    const raw = Math.min(Math.max(scrolled / total, 0), 1)
    setProgress(raw)
  }, [containerRef])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return progress
}

// Lerp helper
function lerp(a, b, t) {
  return a + (b - a) * t
}

/**
 * ContainerScroll
 * Props:
 *   titleComponent  – JSX rendered above the scrolling card
 *   children        – content inside the 3-D animated card
 *   className       – optional extra classes on the wrapper
 */
export function ContainerScroll({ titleComponent, children, className = '' }) {
  const containerRef = useRef(null)
  const isMobile = useIsMobile()
  const progress = useScrollProgress(containerRef)

  // Map scroll progress → animation values
  // progress 0 = card not yet visible (tilted back)
  // progress ~0.3-0.6 = card flat / fully revealed
  // progress 1 = scrolled past
  const scaleDimensions = isMobile ? [0.7, 0.9] : [1.05, 1]

  // Rotate: starts tilted, flattens out as you scroll in
  const rotateX = lerp(20, 0, Math.min(progress * 2.8, 1))
  const scale = lerp(scaleDimensions[0], scaleDimensions[1], Math.min(progress * 2.5, 1))

  // Title translate: slides up as card comes in
  const titleY = lerp(0, -60, Math.min(progress * 2.5, 1))
  const titleOpacity = Math.min(1, progress < 0.05 ? progress * 20 : 1)

  // Card opacity
  const cardOpacity = Math.min(1, progress * 6)

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center justify-start overflow-hidden ${className}`}
      style={{ height: isMobile ? '80vh' : '140vh' }}
    >
      {/* Sticky inner so the effect persists while scrolling */}
      <div
        className="sticky top-0 flex flex-col items-center justify-start w-full"
        style={{
          height: isMobile ? '80vh' : '100vh',
          paddingTop: isMobile ? '3rem' : '5rem',
        }}
      >
        {/* Title area */}
        <div
          className="w-full max-w-5xl mx-auto px-4 mb-8 text-center"
          style={{
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
            transition: 'none',
            willChange: 'transform, opacity',
          }}
        >
          {titleComponent}
        </div>

        {/* 3-D card wrapper */}
        <div
          style={{
            perspective: isMobile ? '600px' : '1000px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              transform: `rotateX(${rotateX}deg) scale(${scale})`,
              transformOrigin: 'center top',
              opacity: cardOpacity,
              transition: 'none',
              willChange: 'transform, opacity',
              width: isMobile ? '94vw' : 'min(90vw, 1100px)',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              boxShadow: `0 ${lerp(8, 48, Math.min(progress * 3, 1))}px ${lerp(24, 96, Math.min(progress * 3, 1))}px rgba(93,139,244,${lerp(0.08, 0.22, Math.min(progress * 3, 1))})`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContainerScroll
