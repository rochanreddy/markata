"use client";

import { useEffect, useRef, useState, useMemo } from 'react';

interface UseSimpleScrollOptions {
  threshold?: number;
  delay?: number;
  animation?: 'fadeIn' | 'slideUp';
}

interface UseSimpleScrollReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  style: React.CSSProperties;
  isVisible: boolean;
}

export const useSimpleScroll = (options: UseSimpleScrollOptions = {}): UseSimpleScrollReturn => {
  const { threshold = 0.1, delay = 0, animation = 'fadeIn' } = options;
  
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion) {
      // For reduced motion, show element immediately
      if (prefersReducedMotion) {
        setIsVisible(true);
      }
      return;
    }

    const element = ref.current;
    let timeoutId: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          if (delay > 0) {
            timeoutId = setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }
          // Unobserve after triggering to prevent re-triggering
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before element comes into view
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [threshold, delay, prefersReducedMotion]);

  // Generate styles based on animation type and visibility state
  const style = useMemo((): React.CSSProperties => {
    // For SSR or reduced motion, always show the element
    if (typeof window === 'undefined' || prefersReducedMotion) {
      return {
        opacity: 1,
        transform: 'none',
      };
    }

    const baseStyle: React.CSSProperties = {
      transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      willChange: 'opacity, transform',
    };

    if (isVisible) {
      return {
        ...baseStyle,
        opacity: 1,
        transform: 'translateY(0px)',
      };
    }

    // Initial state based on animation type
    switch (animation) {
      case 'slideUp':
        return {
          ...baseStyle,
          opacity: 0,
          transform: 'translateY(30px)',
        };
      case 'fadeIn':
      default:
        return {
          ...baseStyle,
          opacity: 0,
          transform: 'translateY(0px)',
        };
    }
  }, [isVisible, animation, prefersReducedMotion]);

  return {
    ref,
    style,
    isVisible: typeof window === 'undefined' ? true : isVisible, // For SSR, always return true
  };
};