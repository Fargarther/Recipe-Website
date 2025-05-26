// src/hooks/useScrollObserver.js
import { useEffect, useRef } from 'react';

/**
 * Custom hook to observe elements and add a class when they enter the viewport
 * @param {Object} options - IntersectionObserver options
 * @param {Array} targetRefs - Array of refs to observe (optional)
 * @returns {Object} ref - Ref to be attached to the observed element if targetRefs is not provided
 */
export function useScrollObserver(options = {}, targetRefs = []) {
  const defaultOptions = {
    threshold: 0.2,
    rootMargin: '0px',
    ...options
  };
  
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
    if (targetRefs.length > 0) {
      targetRefs.forEach((ref) => {
        if (ref.current) {
          observer.observe(ref.current);
        }
      });
    }
    // Otherwise observe the element referenced by elementRef
    else if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => {
      // Cleanup
      if (targetRefs.length > 0) {
        targetRefs.forEach((ref) => {
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        });
      } else if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [defaultOptions, targetRefs]);
  
  return elementRef;
}