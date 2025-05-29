// src/components/Home/Spotlight/InteractiveBulletinDecorations.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// Falling animation with directional movement - starts immediately
const fallAnimation = keyframes`
  from {
    transform: translate(0, 0) rotate(var(--rotate));
    opacity: 1;
  }
  15% {
    transform: translate(calc(var(--throwX) * 0.2), calc(var(--throwY) * 0.15)) rotate(calc(var(--rotate) + var(--spinAmount) * 0.1));
    opacity: 1;
  }
  80% {
    opacity: 0.8;
  }
  to {
    transform: translate(calc(var(--throwX) * 1.2), calc(100vh + var(--throwY))) rotate(calc(var(--rotate) + var(--spinAmount)));
    opacity: 0;
  }
`;

// Seasonal Sticker SVG Components
const SeasonalStickers = {
  // Autumn Leaf
  autumnLeaf: {
    name: 'Autumn Leaf',
    svg: (
      <svg viewBox="0 0 50 50" fill="none">
        <path d="M25 5 C15 15, 10 25, 10 35 C10 40, 15 45, 25 45 C35 45, 40 40, 40 35 C40 25, 35 15, 25 5 Z" 
              fill="#b87333" stroke="#8b5a2b" strokeWidth="1"/>
        <path d="M25 15 L25 40 M18 22 L25 25 L32 22 M20 30 L25 32 L30 30" 
              stroke="#8b5a2b" strokeWidth="1" opacity="0.6"/>
      </svg>
    )
  },
  
  // Spring Herb
  herb: {
    name: 'Fresh Herbs',
    svg: (
      <svg viewBox="0 0 50 50" fill="none">
        <path d="M25 40 C25 35, 25 30, 25 20 M20 35 C20 30, 22 28, 25 25 M30 35 C30 30, 28 28, 25 25" 
              stroke="#7a8b6f" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="20" cy="35" r="3" fill="#8fa678"/>
        <circle cx="30" cy="35" r="3" fill="#8fa678"/>
        <circle cx="25" cy="20" r="3" fill="#8fa678"/>
        <circle cx="22" cy="28" r="2" fill="#a3b88c"/>
        <circle cx="28" cy="28" r="2" fill="#a3b88c"/>
      </svg>
    )
  },
  
  // Wheat
  wheat: {
    name: 'Wheat',
    svg: (
      <svg viewBox="0 0 50 50" fill="none">
        <path d="M25 45 L25 15" stroke="#c4a57b" strokeWidth="2"/>
        <ellipse cx="25" cy="10" rx="4" ry="6" fill="#d4b896" stroke="#c4a57b" strokeWidth="1"/>
        <ellipse cx="25" cy="18" rx="4" ry="6" fill="#d4b896" stroke="#c4a57b" strokeWidth="1"/>
        <ellipse cx="25" cy="26" rx="4" ry="6" fill="#d4b896" stroke="#c4a57b" strokeWidth="1"/>
        <path d="M21 12 L17 8 M29 12 L33 8 M21 20 L17 16 M29 20 L33 16 M21 28 L17 24 M29 28 L33 24" 
              stroke="#c4a57b" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    )
  },
  
  // Winter Branch
  winterBranch: {
    name: 'Winter Branch',
    svg: (
      <svg viewBox="0 0 50 50" fill="none">
        <path d="M10 40 L25 25 L40 10 M15 30 L20 25 M30 20 L35 15 M20 35 L25 30 M25 20 L30 15" 
              stroke="#8b7d6b" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="15" cy="30" r="2" fill="#e8dcc6"/>
        <circle cx="20" cy="35" r="2" fill="#e8dcc6"/>
        <circle cx="30" cy="20" r="2" fill="#e8dcc6"/>
        <circle cx="35" cy="15" r="2" fill="#e8dcc6"/>
      </svg>
    )
  },
  
  // Summer Sun
  sun: {
    name: 'Summer Sun',
    svg: (
      <svg viewBox="0 0 50 50" fill="none">
        <circle cx="25" cy="25" r="8" fill="#e3c099" stroke="#d4a574" strokeWidth="1"/>
        <path d="M25 10 L25 15 M25 35 L25 40 M40 25 L35 25 M15 25 L10 25 M35 15 L32 18 M18 32 L15 35 M35 35 L32 32 M18 18 L15 15" 
              stroke="#d4a574" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  
  // Mushroom
  mushroom: {
    name: 'Wild Mushroom',
    svg: (
      <svg viewBox="0 0 50 50" fill="none">
        <ellipse cx="25" cy="25" rx="12" ry="8" fill="#c4a27a" stroke="#a08563" strokeWidth="1"/>
        <path d="M20 25 C20 25, 20 35, 22 40 L28 40 C30 35, 30 25, 30 25" 
              fill="#e8dcc6" stroke="#a08563" strokeWidth="1"/>
        <circle cx="20" cy="23" r="2" fill="#a08563" opacity="0.5"/>
        <circle cx="30" cy="22" r="1.5" fill="#a08563" opacity="0.5"/>
        <circle cx="25" cy="24" r="1" fill="#a08563" opacity="0.5"/>
      </svg>
    )
  },
  
  // Rosemary Sprig
  rosemary: {
    name: 'Rosemary',
    svg: (
      <svg viewBox="0 0 50 50" fill="none">
        <path d="M25 45 L25 5" stroke="#7a8b6f" strokeWidth="2"/>
        <path d="M20 10 L25 8 L30 10 M20 15 L25 13 L30 15 M20 20 L25 18 L30 20 M20 25 L25 23 L30 25 M20 30 L25 28 L30 30 M20 35 L25 33 L30 35" 
              stroke="#8fa678" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </svg>
    )
  },
  
  // Garlic
  garlic: {
    name: 'Garlic Clove',
    svg: (
      <svg viewBox="0 0 50 50" fill="none">
        <ellipse cx="25" cy="28" rx="10" ry="12" fill="#f5f0dc" stroke="#d4ceb5" strokeWidth="1"/>
        <path d="M25 16 C25 16, 23 10, 25 8 C27 10, 25 16, 25 16" fill="#c4b896" stroke="#a09874" strokeWidth="1"/>
        <path d="M20 28 C20 28, 22 35, 25 35 C28 35, 30 28, 30 28" stroke="#d4ceb5" strokeWidth="1" fill="none"/>
        <line x1="25" y1="20" x2="25" y2="32" stroke="#d4ceb5" strokeWidth="0.5"/>
      </svg>
    )
  }
};

// Post-it wisdom and quotes
const postItMessages = [
  { text: "Salt early,\nsalt often", font: "Georgia, serif", style: "italic" },
  { text: "A watched pot\neventually boils\n(be patient)", font: "Playfair Display, serif", style: "normal" },
  { text: "TASTE\nAS YOU\nGO", font: "Impact, sans-serif", style: "normal" },
  { text: "mise en place\n= inner peace", font: "Courier New, monospace", style: "normal" },
  { text: "When in doubt,\nadd butter", font: "Comic Sans MS, cursive", style: "normal" },
  { text: "The secret ingredient\nis always\nlove", font: "Brush Script MT, cursive", style: "normal" },
  { text: "Sharp knives\nsave lives", font: "Arial Black, sans-serif", style: "normal" },
  { text: "Season\nfearlessly", font: "Trebuchet MS, sans-serif", style: "normal" },
  { text: "Good food\ntakes time", font: "Times New Roman, serif", style: "italic" },
  { text: "Trust the\nprocess", font: "Verdana, sans-serif", style: "normal" },
  { text: "Cook with\nwhat you have", font: "Palatino, serif", style: "normal" },
  { text: "Every meal is\na memory", font: "Garamond, serif", style: "italic" },
  { text: "ACID\nBALANCES\nFAT", font: "Franklin Gothic Medium, sans-serif", style: "normal" },
  { text: "Simmer down\n& carry on", font: "Book Antiqua, serif", style: "normal" },
  { text: "Life's too short\nfor bad coffee", font: "Lucida Console, monospace", style: "normal" },
  { text: "embrace\nthe\nchaos", font: "Arial Narrow, sans-serif", style: "italic" },
  { text: "Recipes are\nguidelines,\nnot rules", font: "Tahoma, sans-serif", style: "normal" },
  { text: "burnt edges\n=\nextra flavor", font: "Courier New, monospace", style: "normal" },
  { text: "Feed people\nwell", font: "Georgia, serif", style: "bold" },
  { text: "Kitchen dance\nparties\nencouraged", font: "Comic Sans MS, cursive", style: "normal" }
];

// Sticker Component
const Sticker = styled.div`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  left: ${props => props.$x}px;
  top: ${props => props.$y}px;
  transform: rotate(${props => props.$rotate}deg);
  cursor: move;
  user-select: none;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
  opacity: 0.85;
  transition: transform 0.2s, opacity 0.2s;
  z-index: ${props => props.$isDragging ? 50 : 4};
  
  &:hover {
    opacity: 1;
    transform: rotate(${props => props.$rotate}deg) scale(1.1);
  }
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

// Post-it Note
const PostItNote = styled.div`
  --rotate: ${props => props.$rotate}deg;
  --throwX: ${props => props.$throwX || 0}px;
  --throwY: ${props => props.$throwY || 0}px;
  --spinAmount: ${props => props.$spinAmount || 0}deg;
  position: absolute;
  width: ${props => props.$width}px;
  min-height: ${props => props.$height}px;
  left: ${props => props.$x}px;
  top: ${props => props.$y}px;
  transform: rotate(${props => props.$rotate}deg);
  background-color: ${props => props.$color};
  padding: 20px 15px 15px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  cursor: ${props => props.$isDragging ? 'grabbing' : 'grab'};
  z-index: ${props => props.$falling ? 61 : props.$isDragging ? 60 : 5};
  transition: ${props => props.$falling ? 'none' : 'box-shadow 0.2s'};
  animation: ${props => props.$falling ? fallAnimation : 'none'} ${props => props.$fallDuration || 1.2}s cubic-bezier(0.45, 0, 0.55, 1) forwards;
  
  &:hover {
    box-shadow: ${props => props.$falling ? '0 3px 6px rgba(0,0,0,0.1)' : '0 4px 8px rgba(0,0,0,0.15)'};
    transform: ${props => props.$falling ? `rotate(${props.$rotate}deg)` : `rotate(${props.$rotate}deg) translateY(-2px)`};
  }
  
  /* Tape effect */
  &:before {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 20px;
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  /* Curl effect */
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 25px;
    height: 25px;
    background: linear-gradient(135deg, transparent 50%, ${props => props.$color} 50%);
    box-shadow: -2px -2px 3px rgba(0, 0, 0, 0.1);
  }
`;

const PostItText = styled.div`
  font-family: ${props => props.$font};
  font-style: ${props => props.$style};
  font-weight: ${props => props.$weight};
  font-size: ${props => props.$fontSize}px;
  color: #2c2c2c;
  white-space: pre-line;
  text-align: center;
  line-height: 1.3;
  transform: rotate(${props => props.$textRotate}deg);
`;

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
      {stickers.map(sticker => (
        <Sticker
          key={sticker.id}
          $size={sticker.size}
          $x={sticker.x}
          $y={sticker.y}
          $rotate={sticker.rotate}
          $isDragging={draggedItem?.id === sticker.id}
          onMouseDown={(e) => handleMouseDown(e, sticker.id, 'sticker')}
          onDoubleClick={() => deleteSticker(sticker.id)}
          title="Drag to move, double-click to delete"
        >
          {SeasonalStickers[sticker.type]?.svg}
        </Sticker>
      ))}
      
      {/* Render Post-its */}
      {postIts.map(postIt => (
        <PostItNote
          key={postIt.id}
          $width={postIt.width}
          $height={postIt.height}
          $x={postIt.x}
          $y={postIt.y}
          $rotate={postIt.rotate}
          $color={postIt.color}
          $isDragging={draggedItem?.id === postIt.id}
          $falling={postIt.falling}
          $throwX={postIt.throwX}
          $throwY={postIt.throwY}
          $spinAmount={postIt.spinAmount}
          $fallDuration={postIt.fallDuration}
          onMouseDown={(e) => handleMouseDown(e, postIt.id, 'postit')}
        >
          <PostItText
            $font={postIt.font}
            $style={postIt.style}
            $weight={postIt.weight}
            $fontSize={postIt.fontSize}
            $textRotate={postIt.textRotate}
          >
            {postIt.text}
          </PostItText>
        </PostItNote>
      ))}
      
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