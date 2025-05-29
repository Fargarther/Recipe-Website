// src/components/Home/Spotlight/InteractiveBulletinDecorations.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Stickers, { SeasonalStickers } from './decorations/Stickers';
import PostItNotes, { postItMessages } from './decorations/PostItNotes';

// Add New Item Button
const AddButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transition: all 0.3s;
  z-index: 100;
  
  &:hover {
    background: var(--accent-dark);
    transform: scale(1.1);
    box-shadow: 0 6px 12px rgba(0,0,0,0.3);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

// Menu for adding items
const AddMenu = styled.div`
  position: absolute;
  bottom: 80px;
  right: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  padding: 10px;
  display: ${props => props.$show ? 'flex' : 'none'};
  flex-direction: column;
  gap: 10px;
  z-index: 101;
  max-height: 400px;
  overflow-y: auto;
`;

const MenuButton = styled.button`
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  transition: all 0.2s;
  white-space: nowrap;
  
  &:hover {
    background: var(--accent);
    color: white;
  }
`;

const StickerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 10px;
`;

const StickerOption = styled.button`
  width: 60px;
  height: 60px;
  padding: 8px;
  border: 2px solid transparent;
  background: rgba(0,0,0,0.02);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    border-color: var(--accent);
    background: rgba(166, 124, 82, 0.1);
    transform: scale(1.05);
  }
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const StickerLabel = styled.div`
  font-size: 10px;
  color: var(--text-medium);
  margin-top: 4px;
  text-align: center;
`;

const InteractiveBulletinDecorations = ({ boardRef }) => {
  const [stickers, setStickers] = useState(() => {
    const saved = localStorage.getItem('bulletinStickers');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [postIts, setPostIts] = useState(() => {
    const saved = localStorage.getItem('bulletinPostIts');
    if (saved) return JSON.parse(saved);
    
    // Wait for board to be ready
    if (!boardRef?.current) return [];
    
    // Get board dimensions
    const boardRect = boardRef.current.getBoundingClientRect();
    const boardWidth = boardRect.width;
    const boardHeight = boardRect.height;
    
    // Generate initial post-its within board boundaries
    const colors = ['#ffeb3b', '#ffc0cb', '#b8e6b8', '#b3d9ff', '#dda0dd', '#ffcc99', '#ffb3b3', '#c8e6c9'];
    const initialPostIts = [];
    const count = 8 + Math.floor(Math.random() * 5); // 8-12 post-its
    
    for (let i = 0; i < count; i++) {
      const message = postItMessages[Math.floor(Math.random() * postItMessages.length)];
      const noteWidth = 100 + Math.floor(Math.random() * 40);
      const noteHeight = 80 + Math.floor(Math.random() * 40);
      
      // Calculate safe spawn area (with padding from edges)
      const padding = 50;
      const maxX = boardWidth - noteWidth - padding;
      const maxY = boardHeight - noteHeight - padding;
      
      initialPostIts.push({
        id: `postit-${Date.now()}-${i}`,
        x: padding + Math.random() * Math.max(maxX - padding, 100),
        y: padding + Math.random() * Math.max(maxY - padding, 100),
        width: noteWidth,
        height: noteHeight,
        rotate: -12 + Math.random() * 24,
        textRotate: -3 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        text: message.text,
        font: message.font,
        style: message.style || 'normal',
        weight: message.weight || 'normal',
        fontSize: 13 + Math.floor(Math.random() * 5),
        falling: false,
        throwX: 0,
        throwY: 0,
        spinAmount: 0,
        fallDuration: 1.2
      });
    }
    
    return initialPostIts;
  });
  
  const [draggedItem, setDraggedItem] = useState(null);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showStickerMenu, setShowStickerMenu] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastPosRef = useRef({ x: 0, y: 0, time: 0 });
  
  // Initialize post-its after board is ready
  useEffect(() => {
    if (boardRef?.current && postIts.length === 0 && !localStorage.getItem('bulletinPostIts')) {
      // Get board dimensions
      const boardRect = boardRef.current.getBoundingClientRect();
      const boardWidth = boardRect.width;
      const boardHeight = boardRect.height;
      
      // Generate initial post-its within board boundaries
      const colors = ['#ffeb3b', '#ffc0cb', '#b8e6b8', '#b3d9ff', '#dda0dd', '#ffcc99', '#ffb3b3', '#c8e6c9'];
      const initialPostIts = [];
      const count = 8 + Math.floor(Math.random() * 5); // 8-12 post-its
      
      for (let i = 0; i < count; i++) {
        const message = postItMessages[Math.floor(Math.random() * postItMessages.length)];
        const noteWidth = 100 + Math.floor(Math.random() * 40);
        const noteHeight = 80 + Math.floor(Math.random() * 40);
        
        // Calculate safe spawn area (with padding from edges)
        const padding = 50;
        const maxX = boardWidth - noteWidth - padding;
        const maxY = boardHeight - noteHeight - padding;
        
        initialPostIts.push({
          id: `postit-${Date.now()}-${i}`,
          x: padding + Math.random() * Math.max(maxX - padding, 100),
          y: padding + Math.random() * Math.max(maxY - padding, 100),
          width: noteWidth,
          height: noteHeight,
          rotate: -12 + Math.random() * 24,
          textRotate: -3 + Math.random() * 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          text: message.text,
          font: message.font,
          style: message.style || 'normal',
          weight: message.weight || 'normal',
          fontSize: 13 + Math.floor(Math.random() * 5),
          falling: false,
          throwX: 0,
          throwY: 0,
          spinAmount: 0,
          fallDuration: 1.2
        });
      }
      
      setPostIts(initialPostIts);
    }
  }, [boardRef, postIts.length]);
  
  // Save to localStorage when items change
  useEffect(() => {
    localStorage.setItem('bulletinStickers', JSON.stringify(stickers));
  }, [stickers]);
  
  useEffect(() => {
    const nonFallingPostIts = postIts.filter(p => !p.falling);
    localStorage.setItem('bulletinPostIts', JSON.stringify(nonFallingPostIts));
  }, [postIts]);
  
  // Handle mouse down for dragging
  const handleMouseDown = (e, itemId, itemType) => {
    e.preventDefault();
    e.stopPropagation();
    
    const item = itemType === 'sticker' 
      ? stickers.find(s => s.id === itemId)
      : postIts.find(p => p.id === itemId);
    
    if (!item) return;
    
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    setDragStart({
      x: clientX - item.x,
      y: clientY - item.y
    });
    setDraggedItem({ id: itemId, type: itemType });
    
    // Reset velocity tracking
    velocityRef.current = { x: 0, y: 0 };
    lastPosRef.current = { x: clientX, y: clientY, time: Date.now() };
  };
  
  // Handle mouse move
  const handleMouseMove = (e) => {
    if (!draggedItem) return;
    
    const clientX = e.clientX;
    const clientY = e.clientY;
    const currentTime = Date.now();
    
    const newX = clientX - dragStart.x;
    const newY = clientY - dragStart.y;
    
    // Calculate velocity
    const timeDiff = currentTime - lastPosRef.current.time;
    if (timeDiff > 8) { // Only calculate if at least 8ms has passed (~120fps)
      const vx = (clientX - lastPosRef.current.x) / timeDiff;
      const vy = (clientY - lastPosRef.current.y) / timeDiff;
      
      // Smooth velocity with averaging (more weight on current velocity for responsiveness)
      velocityRef.current.x = velocityRef.current.x * 0.2 + vx * 0.8;
      velocityRef.current.y = velocityRef.current.y * 0.2 + vy * 0.8;
    }
    
    lastPosRef.current = { x: clientX, y: clientY, time: currentTime };
    
    if (draggedItem.type === 'sticker') {
      setStickers(prev => prev.map(s => 
        s.id === draggedItem.id ? { ...s, x: newX, y: newY } : s
      ));
    } else {
      setPostIts(prev => prev.map(p => 
        p.id === draggedItem.id ? { ...p, x: newX, y: newY } : p
      ));
    }
  };
  
  // Handle mouse up - post-its fall when released
  const handleMouseUp = () => {
    if (draggedItem && draggedItem.type === 'postit') {
      const vx = velocityRef.current.x;
      const vy = velocityRef.current.y;
      
      // Calculate throw power ONCE
      const calculatedThrowPower = Math.sqrt(vx * vx + vy * vy);
      
      // Calculate throw distance based on velocity
      const throwX = vx * 350; // Slightly reduced for more control
      const throwY = Math.max(vy * 200, -100); // Reduced vertical movement
      
      // Add slight downward bias for gentle releases
      const adjustedThrowY = calculatedThrowPower < 0.5 ? throwY + 50 : throwY;
      
      // Calculate spin based on horizontal velocity (only spin if moving fast enough)
      const spinThreshold = 0.2; // Lowered for more responsive spinning
      let spinAmount = 0;
      
      if (Math.abs(vx) > spinThreshold) {
        // Fast movement - calculated spin (direction based on throw direction)
        // More spin for really fast throws
        const spinMultiplier = Math.abs(vx) > 1 ? 200 : 150;
        spinAmount = (30 + Math.abs(vx) * spinMultiplier) * (vx > 0 ? 1 : -1);
      } else {
        // Gentle release - very subtle wobble for natural look (±2-8 degrees)
        const wobble = 2 + Math.random() * 6;
        spinAmount = Math.random() > 0.5 ? wobble : -wobble;
      }
      
      // Calculate duration based on throw power (faster fall time)
      const fallDuration = 1.2 + Math.min(calculatedThrowPower * 0.3, 0.5);
      
      // Update the post-it with fall animation immediately
      setPostIts(prev => prev.map(p => 
        p.id === draggedItem.id 
          ? { 
              ...p, 
              falling: true, 
              throwX,
              throwY: adjustedThrowY,
              spinAmount,
              fallDuration
            } 
          : p
      ));
      
      // Remove it after animation completes
      setTimeout(() => {
        setPostIts(prev => prev.filter(p => p.id !== draggedItem.id));
      }, (fallDuration * 1000) + 100);
    }
    
    setDraggedItem(null);
    velocityRef.current = { x: 0, y: 0 };
  };
  
  // Add mouse event listeners
  useEffect(() => {
    if (draggedItem) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedItem, dragStart]);
  
  // Add specific sticker type
  const addSticker = (stickerType) => {
    if (!boardRef?.current) return;
    
    const boardRect = boardRef.current.getBoundingClientRect();
    const boardWidth = boardRect.width;
    const boardHeight = boardRect.height;
    const stickerSize = 45 + Math.floor(Math.random() * 15);
    
    // Calculate safe spawn area
    const padding = 50;
    const maxX = boardWidth - stickerSize - padding;
    const maxY = boardHeight - stickerSize - padding;
    
    const newSticker = {
      id: `sticker-${Date.now()}`,
      type: stickerType,
      x: padding + Math.random() * Math.max(maxX - padding, 100),
      y: padding + Math.random() * Math.max(maxY - padding, 100),
      size: stickerSize,
      rotate: -15 + Math.random() * 30
    };
    
    setStickers([...stickers, newSticker]);
    setShowStickerMenu(false);
    setShowAddMenu(false);
  };
  
  // Add new post-it
  const addPostIt = () => {
    if (!boardRef?.current) return;
    
    const boardRect = boardRef.current.getBoundingClientRect();
    const boardWidth = boardRect.width;
    const boardHeight = boardRect.height;
    
    const colors = ['#ffeb3b', '#ffc0cb', '#b8e6b8', '#b3d9ff', '#dda0dd', '#ffcc99', '#ffb3b3', '#c8e6c9'];
    const message = postItMessages[Math.floor(Math.random() * postItMessages.length)];
    
    const noteWidth = 110 + Math.floor(Math.random() * 40);
    const noteHeight = 90 + Math.floor(Math.random() * 40);
    
    // Calculate safe spawn area
    const padding = 50;
    const maxX = boardWidth - noteWidth - padding;
    const maxY = boardHeight - noteHeight - padding;
    
    const newPostIt = {
      id: `postit-${Date.now()}`,
      x: padding + Math.random() * Math.max(maxX - padding, 100),
      y: padding + Math.random() * Math.max(maxY - padding, 100),
      width: noteWidth,
      height: noteHeight,
      rotate: -10 + Math.random() * 20,
      textRotate: -3 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      text: message.text,
      font: message.font,
      style: message.style || 'normal',
      weight: message.weight || 'normal',
      fontSize: 13 + Math.floor(Math.random() * 5),
      falling: false,
      throwX: 0,
      throwY: 0,
      spinAmount: 0,
      fallDuration: 1.8
    };
    
    setPostIts([...postIts, newPostIt]);
    setShowAddMenu(false);
  };
  
  // Delete sticker
  const deleteSticker = (id) => {
    setStickers(stickers.filter(s => s.id !== id));
  };
  
  return (
    <>
      {/* Render Stickers */}
      <Stickers 
        stickers={stickers}
        onMouseDown={handleMouseDown}
        onDoubleClick={deleteSticker}
        draggedItem={draggedItem}
      />
      
      {/* Render Post-its */}
      <PostItNotes
        postIts={postIts}
        onMouseDown={handleMouseDown}
        draggedItem={draggedItem}
      />
      
      {/* Add Button */}
      <AddButton 
        onClick={() => {
          setShowAddMenu(!showAddMenu);
          setShowStickerMenu(false);
        }}
        title="Add decoration"
      >
        +
      </AddButton>
      
      {/* Main Menu */}
      <AddMenu $show={showAddMenu && !showStickerMenu}>
        <MenuButton onClick={() => setShowStickerMenu(true)}>
          Choose Sticker →
        </MenuButton>
        <MenuButton onClick={addPostIt}>Add Wisdom Note</MenuButton>
      </AddMenu>
      
      {/* Sticker Selection Menu */}
      <AddMenu $show={showStickerMenu}>
        <MenuButton onClick={() => setShowStickerMenu(false)}>
          ← Back
        </MenuButton>
        <StickerGrid>
          {Object.entries(SeasonalStickers).map(([key, sticker]) => (
            <div key={key}>
              <StickerOption onClick={() => addSticker(key)}>
                {sticker.svg}
              </StickerOption>
              <StickerLabel>{sticker.name}</StickerLabel>
            </div>
          ))}
        </StickerGrid>
      </AddMenu>
    </>
  );
};

export default InteractiveBulletinDecorations;