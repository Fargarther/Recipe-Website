// src/components/Home/Spotlight/hooks/useDragAndDrop.js
import { useState, useEffect, useCallback } from 'react';
import { BOARD_DIMENSIONS, CARD_DIMENSIONS } from '../utils/constants';
import { getRandomPosition, getRotatedBoundingBox } from '../utils/helpers';

const useDragAndDrop = (cards, setCards, boardRef) => {
  const [activeCard, setActiveCard] = useState(null);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [cardPositions, setCardPositions] = useState({});

  // Initialize positions for new cards considering rotation
  useEffect(() => {
    if (!boardRef.current || cards.length === 0) return;
    
    const boardWidth = boardRef.current.offsetWidth;
    const boardHeight = boardRef.current.offsetHeight;
    
    const newPositions = {};
    cards.forEach(card => {
      if (!cardPositions[card.id]) {
        const rotatedBox = getRotatedBoundingBox(CARD_DIMENSIONS.width, CARD_DIMENSIONS.height, card.rotate);
        newPositions[card.id] = getRandomPosition(boardWidth, boardHeight, rotatedBox.width, rotatedBox.height);
      }
    });
    
    if (Object.keys(newPositions).length > 0) {
      setCardPositions(prev => ({ ...prev, ...newPositions }));
    }
  }, [cards.length]); // Only depend on cards.length to avoid infinite loops

  const handleCardMouseDown = useCallback((e, cardId) => {
    e.preventDefault();
    
    // Don't initiate drag if clicking on interactive elements
    if (e.target.classList.contains('star') || 
        e.target.classList.contains('flip-indicator') ||
        e.target.classList.contains('expand-button') ||
        e.target.classList.contains('comments-button') ||
        e.target.classList.contains('pin-button') ||
        e.target.closest('.pin-button')) {
      return;
    }
    
    // Bring card to front
    setCards(prevCards => 
      prevCards.map(card => ({
        ...card,
        zIndex: card.id === cardId 
          ? Math.max(...prevCards.map(c => c.zIndex)) + 1 
          : card.zIndex
      }))
    );
    
    // Record starting position
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    // Get board rect for calculations
    const board = boardRef.current;
    const boardRect = board.getBoundingClientRect();
    
    // Get current card position (accounting for the margin-left)
    const currentPos = cardPositions[cardId] || { x: 0, y: 0 };
    
    // Calculate cursor position relative to card's top-left corner
    // Add 13px to account for the margin-left on CardContainer
    const offsetX = clientX - boardRect.left - currentPos.x - 13;
    const offsetY = clientY - boardRect.top - currentPos.y;
    
    setDragStartPos({ x: offsetX, y: offsetY });
    setActiveCard(cardId);
  }, [setCards, cardPositions, boardRef]);

  const handleMouseMove = useCallback((e) => {
    if (activeCard === null || !boardRef.current) return;
    
    e.preventDefault();
    
    const board = boardRef.current;
    const boardRect = board.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    // Find the active card to get its rotation
    const activeCardData = cards.find(card => card.id === activeCard);
    if (!activeCardData) return;
    
    // Calculate the rotated bounding box
    const cardWidth = CARD_DIMENSIONS.width;
    const cardHeight = CARD_DIMENSIONS.height;
    const rotatedBox = getRotatedBoundingBox(cardWidth, cardHeight, activeCardData.rotate);
    
    // Calculate offset to center (difference between rotated and original box)
    const widthDiff = (rotatedBox.width - cardWidth) / 2;
    const heightDiff = (rotatedBox.height - cardHeight) / 2;
    
    // Calculate new position relative to the board
    // Subtract 13px to account for the margin-left offset
    let x = clientX - boardRect.left - dragStartPos.x - 13;
    let y = clientY - boardRect.top - dragStartPos.y;
    
    // Apply boundary constraints considering the rotated bounding box
    const boardWidth = board.offsetWidth;
    const boardHeight = board.offsetHeight;
    
    // Board boundaries
    const frameWidth = 12; // Border frame width
    const boardPadding = 32; // 2rem = 32px padding from BulletinBoardContainer
    const buttonExtension = 13; // Buttons extend 13px to the left
    const minPosition = frameWidth + boardPadding;
    
    // Adjust min/max positions for the rotated bounding box and button extension
    const minX = minPosition + widthDiff - buttonExtension;
    const minY = minPosition + heightDiff;
    const maxX = boardWidth - minPosition - cardWidth - widthDiff + buttonExtension;
    const maxY = boardHeight - minPosition - cardHeight - heightDiff;
    
    // Constrain positions to the boundary area
    x = Math.max(minX, Math.min(x, maxX));
    y = Math.max(minY, Math.min(y, maxY));
    
    // Update card position
    setCardPositions(prevPositions => ({
      ...prevPositions,
      [activeCard]: { x, y }
    }));
  }, [activeCard, dragStartPos, boardRef, cards]);

  const handleMouseUp = useCallback(() => {
    setActiveCard(null);
  }, []);

  // Register global mouse events for better drag experience
  useEffect(() => {
    if (activeCard !== null) {
      const handleGlobalMove = (e) => handleMouseMove(e);
      const handleGlobalUp = () => handleMouseUp();
      
      document.addEventListener('mousemove', handleGlobalMove);
      document.addEventListener('mouseup', handleGlobalUp);
      document.addEventListener('touchmove', handleGlobalMove, { passive: false });
      document.addEventListener('touchend', handleGlobalUp);
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalMove);
        document.removeEventListener('mouseup', handleGlobalUp);
        document.removeEventListener('touchmove', handleGlobalMove);
        document.removeEventListener('touchend', handleGlobalUp);
      };
    }
  }, [activeCard, handleMouseMove, handleMouseUp]);

  // Shuffle all card positions considering rotation
  const shufflePositions = useCallback(() => {
    if (!boardRef.current) return;
    
    const boardWidth = boardRef.current.offsetWidth;
    const boardHeight = boardRef.current.offsetHeight;
    
    const newPositions = {};
    cards.forEach(card => {
      const rotatedBox = getRotatedBoundingBox(CARD_DIMENSIONS.width, CARD_DIMENSIONS.height, card.rotate);
      newPositions[card.id] = getRandomPosition(boardWidth, boardHeight, rotatedBox.width, rotatedBox.height);
    });
    
    setCardPositions(newPositions);
  }, [cards, boardRef]);

  return {
    cardPositions,
    setCardPositions,
    activeCard,
    handleCardMouseDown,
    shufflePositions
  };
};

export default useDragAndDrop;