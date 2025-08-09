"use client"

import { useCallback, useEffect, useRef, useState, useMemo } from 'react'

export interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  delay?: number
  duration?: number
  easing?: string
  disabled?: boolean
  triggerOnce?: boolean
}

export interface StaggerOptions extends ScrollAnimationOptions {
  staggerDelay?: number
  staggerDuration?: number
}

export type AnimationVariant = 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'scale' | 'blur'

export interface AnimationState {
  isVisible: boolean
  hasTriggered: boolean
  style: React.CSSProperties
  ref: React.RefObject<HTMLElement | null>
}

export interface StaggerAnimationState {
  items: AnimationState[]
  addRef: (element: HTMLElement | null) => void
  removeRef: (element: HTMLElement | null) => void
}

// Check for reduced motion preference
const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Animation variant configurations
const getAnimationConfig = (variant: AnimationVariant, isVisible: boolean) => {
  const baseConfig = {
    transition: 'all var(--animation-duration, 300ms) var(--animation-easing, cubic-bezier(0.4, 0, 0.2, 1))',
    willChange: 'transform, opacity, filter',
  }

  switch (variant) {
    case 'fadeIn':
      return {
        ...baseConfig,
        opacity: isVisible ? 1 : 0,
      }
    
    case 'slideUp':
      return {
        ...baseConfig,
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? '0' : '20px'})`,
      }
    
    case 'slideInLeft':
      return {
        ...baseConfig,
        opacity: isVisible ? 1 : 0,
        transform: `translateX(${isVisible ? '0' : '-20px'})`,
      }
    
    case 'slideInRight':
      return {
        ...baseConfig,
        opacity: isVisible ? 1 : 0,
        transform: `translateX(${isVisible ? '0' : '20px'})`,
      }
    
    case 'scale':
      return {
        ...baseConfig,
        opacity: isVisible ? 1 : 0,
        transform: `scale(${isVisible ? '1' : '0.95'})`,
      }
    
    case 'blur':
      return {
        ...baseConfig,
        opacity: isVisible ? 1 : 0,
        filter: `blur(${isVisible ? '0px' : '4px'})`,
      }
    
    default:
      return baseConfig
  }
}

// Single element scroll animation hook
export const useScrollAnimation = (
  variant: AnimationVariant = 'fadeIn',
  options: ScrollAnimationOptions = {}
): AnimationState => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    delay = 0,
    duration = 300,
    easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
    disabled = false,
    triggerOnce = true,
  } = options

  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const shouldAnimate = useMemo(() => {
    return !disabled && !prefersReducedMotion()
  }, [disabled])

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      
      if (entry.isIntersecting) {
        if (!hasTriggered || !triggerOnce) {
          setTimeout(() => {
            setIsVisible(true)
            setHasTriggered(true)
          }, delay)
        }
      } else if (!triggerOnce && hasTriggered) {
        setIsVisible(false)
      }
    },
    [delay, hasTriggered, triggerOnce]
  )

  useEffect(() => {
    const element = ref.current
    if (!element || !shouldAnimate) {
      if (!shouldAnimate) {
        setIsVisible(true)
        setHasTriggered(true)
      }
      return
    }

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    })

    observerRef.current.observe(element)

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element)
      }
    }
  }, [handleIntersection, threshold, rootMargin, shouldAnimate])

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const style = useMemo(() => {
    const animationConfig = shouldAnimate 
      ? getAnimationConfig(variant, isVisible) 
      : { opacity: 1 }

    return {
      ...animationConfig,
      '--animation-duration': `${duration}ms`,
      '--animation-easing': easing,
    } as React.CSSProperties & {
      '--animation-duration'?: string
      '--animation-easing'?: string
    }
  }, [variant, isVisible, duration, easing, shouldAnimate])

  return {
    isVisible: shouldAnimate ? isVisible : true,
    hasTriggered: shouldAnimate ? hasTriggered : true,
    style,
    ref,
  }
}

// Stagger animation hook for multiple elements
export const useStaggerAnimation = (
  variant: AnimationVariant = 'fadeIn',
  options: StaggerOptions = {}
): StaggerAnimationState => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    delay = 0,
    duration = 300,
    easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
    disabled = false,
    triggerOnce = true,
    staggerDelay = 100,
    staggerDuration,
  } = options

  const [elements, setElements] = useState<HTMLElement[]>([])
  const [visibleStates, setVisibleStates] = useState<boolean[]>([])
  const [triggeredStates, setTriggeredStates] = useState<boolean[]>([])
  const observersRef = useRef<Map<HTMLElement, IntersectionObserver>>(new Map())
  const timeoutsRef = useRef<Map<HTMLElement, NodeJS.Timeout>>(new Map())

  const shouldAnimate = useMemo(() => {
    return !disabled && !prefersReducedMotion()
  }, [disabled])

  const addRef = useCallback((element: HTMLElement | null) => {
    if (!element) return

    setElements(prev => {
      if (prev.includes(element)) return prev
      const newElements = [...prev, element]
      
      // Initialize visibility states
      setVisibleStates(prevStates => [...prevStates, false])
      setTriggeredStates(prevTriggered => [...prevTriggered, false])
      
      return newElements
    })
  }, [])

  const removeRef = useCallback((element: HTMLElement | null) => {
    if (!element) return

    setElements(prev => {
      const index = prev.indexOf(element)
      if (index === -1) return prev

      // Clean up observer and timeout
      const observer = observersRef.current.get(element)
      const timeout = timeoutsRef.current.get(element)
      
      if (observer) {
        observer.disconnect()
        observersRef.current.delete(element)
      }
      
      if (timeout) {
        clearTimeout(timeout)
        timeoutsRef.current.delete(element)
      }

      // Remove element and update states
      const newElements = prev.filter((_, i) => i !== index)
      setVisibleStates(prevStates => prevStates.filter((_, i) => i !== index))
      setTriggeredStates(prevTriggered => prevTriggered.filter((_, i) => i !== index))
      
      return newElements
    })
  }, [])

  const handleIntersection = useCallback(
    (element: HTMLElement, index: number) => (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      
      if (entry.isIntersecting) {
        setTriggeredStates(prev => {
          if (prev[index] && triggerOnce) return prev
          
          const elementDelay = delay + (index * staggerDelay)
          const timeout = setTimeout(() => {
            setVisibleStates(prevVisible => {
              const newVisible = [...prevVisible]
              newVisible[index] = true
              return newVisible
            })
          }, elementDelay)
          
          timeoutsRef.current.set(element, timeout)
          
          const newTriggered = [...prev]
          newTriggered[index] = true
          return newTriggered
        })
      } else if (!triggerOnce) {
        setVisibleStates(prev => {
          const newVisible = [...prev]
          newVisible[index] = false
          return newVisible
        })
      }
    },
    [delay, staggerDelay, triggerOnce]
  )

  useEffect(() => {
    if (!shouldAnimate) {
      setVisibleStates(elements.map(() => true))
      setTriggeredStates(elements.map(() => true))
      return
    }

    elements.forEach((element, index) => {
      if (!observersRef.current.has(element)) {
        const observer = new IntersectionObserver(
          handleIntersection(element, index),
          { threshold, rootMargin }
        )
        
        observer.observe(element)
        observersRef.current.set(element, observer)
      }
    })

    return () => {
      observersRef.current.forEach(observer => observer.disconnect())
      observersRef.current.clear()
      
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
      timeoutsRef.current.clear()
    }
  }, [elements, handleIntersection, threshold, rootMargin, shouldAnimate])

  const items: AnimationState[] = useMemo(() => {
    return elements.map((element, index) => {
      const isVisible = shouldAnimate ? visibleStates[index] : true
      const hasTriggered = shouldAnimate ? triggeredStates[index] : true
      const elementDuration = staggerDuration || duration
      
      const style = {
        ...(shouldAnimate ? getAnimationConfig(variant, isVisible) : { opacity: 1 }),
        '--animation-duration': `${elementDuration}ms`,
        '--animation-easing': easing,
      } as React.CSSProperties & {
        '--animation-duration'?: string
        '--animation-easing'?: string
      }

      return {
        isVisible,
        hasTriggered,
        style,
        ref: { current: element },
      }
    })
  }, [elements, visibleStates, triggeredStates, variant, duration, staggerDuration, easing, shouldAnimate])

  return {
    items,
    addRef,
    removeRef,
  }
}

// Utility hook for animating on mount (no intersection observer)
export const useAnimationOnMount = (
  variant: AnimationVariant = 'fadeIn',
  options: Omit<ScrollAnimationOptions, 'threshold' | 'rootMargin' | 'triggerOnce'> = {}
) => {
  const {
    delay = 0,
    duration = 300,
    easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
    disabled = false,
  } = options

  const [isVisible, setIsVisible] = useState(!prefersReducedMotion() && !disabled)

  useEffect(() => {
    if (disabled || prefersReducedMotion()) {
      setIsVisible(true)
      return
    }

    setIsVisible(false)
    const timeout = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timeout)
  }, [delay, disabled])

  const style = useMemo(() => {
    const shouldAnimate = !disabled && !prefersReducedMotion()
    const animationConfig = shouldAnimate 
      ? getAnimationConfig(variant, isVisible) 
      : { opacity: 1 }

    return {
      ...animationConfig,
      '--animation-duration': `${duration}ms`,
      '--animation-easing': easing,
    } as React.CSSProperties & {
      '--animation-duration'?: string
      '--animation-easing'?: string
    }
  }, [variant, isVisible, duration, easing, disabled])

  return {
    isVisible,
    style,
  }
}