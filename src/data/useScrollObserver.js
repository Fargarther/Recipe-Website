// src/hooks/useScrollObserver.js
import { useEffect, useRef, useMemo } from 'react';

/**
 * Custom hook to observe elements and add a class when they enter the viewport
 * @param {Object} options - IntersectionObserver options
 * @param {Array} targetRefs - Array of refs to observe (optional)
 * @returns {Object} ref - Ref to be attached to the observed element if targetRefs is not provided
 */
export function useScrollObserver(options = {}, targetRefs = []) {
  const defaultOptions = useMemo(
    () => ({
      threshold: 0.2,
      rootMargin: '0px',
      ...options,
    }),
    [options]
  );
  
  const elementRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, defaultOptions);
    
    // If targetRefs are provided, observe those elements
    const el = elementRef.current;

    if (targetRefs.length > 0) {
      targetRefs.forEach((ref) => {
        if (ref.current) {
          observer.observe(ref.current);
        }
      });
    } else if (el) {
      observer.observe(el);
    }
    
    return () => {
      // Cleanup
      if (targetRefs.length > 0) {
        targetRefs.forEach((ref) => {
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        });
      } else if (el) {
        observer.unobserve(el);
      }
    };
  }, [defaultOptions, targetRefs]);
  
  return elementRef;
}