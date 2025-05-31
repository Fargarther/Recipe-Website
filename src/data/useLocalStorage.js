// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

/**
 * Custom hook to persist state in localStorage
 * @param {string} key - The key to use in localStorage
 * @param {any} initialValue - The initial value if no value is found in localStorage
 * @returns {Array} [value, setValue] - State and setter function
 */
export function useLocalStorage(key, initialValue) {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      return initialValue;
    }
  });

  // Set to localStorage whenever the state changes
  useEffect(() => {
    try {
      // Save state
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      // A more advanced implementation would handle the error case
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}