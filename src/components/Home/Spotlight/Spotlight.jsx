// Improved Spotlight.js with recipe card bulletin board and rating system
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { recipeData } from '../../data/recipes';

const SpotlightSection = styled.section`
  &[data-observe] {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.9s, transform 0.9s;
  }
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Bulletin board background with cork texture
const BulletinBoardContainer = styled.div`
  position: relative;
  height: 600px;
  width: 100%;
  margin: 2rem 0;
  padding: 2rem;
  background-color: #b68d56;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23805527' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  border-radius: 8px;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3), 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.2);
    pointer-events: none;
  }
`;

// Border frame to make it look like a framed bulletin board
const BoardFrame = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 12px solid #5d3a1a;
  border-radius: 8px;
  pointer-events: none;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
`;

// Paper texture for the aged look
const paperTexture = `
  background-image: 
    repeating-linear-gradient(
      120deg, 
      rgba(255,250,240,0.05), 
      rgba(255,250,240,0.05) 1px, 
      transparent 1px, 
      transparent 2px
    ),
    radial-gradient(
      rgba(255,237,203,0.5) 25%, 
      rgba(255,244,222,0.5) 100%
    );
`;

// Card container for handling 3D perspective
const CardContainer = styled.div`
  position: absolute;
  width: 250px; 
  height: 150px;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  transform: ${props => `rotate(${props.rotate}deg)`};
  transform-origin: center center;
  transition: ${props => props.isDragging ? 'none' : 'all 0.3s'};
  z-index: ${props => props.isDragging ? 100 : props.zIndex};
  perspective: 1500px;
  cursor: ${props => props.isDragging ? 'grabbing' : 'grab'};
  
  &.new-card {
    animation: cardPulse 0.6s ease-out;
  }
  
  @keyframes cardPulse {
    0% {
      transform: scale(0) rotate(${props => props.rotate}deg);
      opacity: 0;
    }
    50% {
      transform: scale(1.1) rotate(${props => props.rotate}deg);
    }
    100% {
      transform: scale(1) rotate(${props => props.rotate}deg);
      opacity: 1;
    }
  }
`;

// Recipe card component styled like an aged 5x3 notecard
const RecipeCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.455, 0.03, 0.515, 1.55);
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};
  will-change: transform;
  
  /* Pin/tack effect when placed */
  &:after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: ${props => props.pinColor || '#b54b35'};
    border-radius: 50%;
    top: ${props => props.pinTop || '8px'};
    left: ${props => props.pinLeft || '50%'};
    transform: translateX(-50%);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    z-index: 999;
  }
`;

// Front side of the card
const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: #f5f0dc;
  ${paperTexture}
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  padding: 12px;
  transform: rotateY(0deg);
  will-change: transform;

  /* Aged edges effect */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid rgba(210, 190, 150, 0.8);
    border-radius: 4px;
    box-shadow: inset 0 0 30px rgba(200, 180, 120, 0.15);
    pointer-events: none;
  }
`;

// Back side of the card
const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: #f0e8d0;
  ${paperTexture}
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  padding: 12px;
  overflow-y: auto;
  will-change: transform;

  /* Aged edges effect */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid rgba(210, 190, 150, 0.8);
    border-radius: 4px;
    box-shadow: inset 0 0 30px rgba(200, 180, 120, 0.15);
    pointer-events: none;
  }
  
  /* Custom scrollbar for recipe details */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(210, 190, 150, 0.2);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(166, 124, 82, 0.5);
    border-radius: 3px;
  }
`;

// Flip indicator button with improved hover effect
const FlipIndicator = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: rgba(200, 180, 120, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #8a7248;
  cursor: pointer;
  border: 1px solid rgba(200, 180, 120, 0.5);
  z-index: 10;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  &:hover {
    background-color: rgba(200, 180, 120, 0.3);
    transform: scale(1.1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

// Recipe details for the back of the card
const RecipeDetails = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 10px;
  color: #59483b;
  line-height: 1.4;
  position: relative;
  z-index: 1;
  margin-bottom: 20px;
`;

const RecipeIngredient = styled.li`
  margin-bottom: 3px;
  font-size: 10px;
  position: relative;
  padding-left: 12px;
  
  &:before {
    content: '•';
    position: absolute;
    left: 0;
    color: #8a7248;
  }
`;

const RecipeInstructions = styled.p`
  margin-top: 6px;
  font-size: 10px;
`;

const RecipeStep = styled.li`
  margin-bottom: 5px;
  font-size: 10px;
  line-height: 1.4;
`;

const SectionTitle = styled.h4`
  font-family: 'Courier New', monospace;
  font-size: 11px;
  margin: 5px 0 3px;
  color: #59483b;
  text-decoration: underline;
  text-decoration-color: #8a7248;
  text-decoration-thickness: 1px;
  letter-spacing: -0.5px;
`;

// Styled components for card content 
const CardTitle = styled.h3`
  font-family: 'Courier New', monospace;
  font-size: 14px;
  margin: 0 0 8px;
  color: #59483b;
  font-weight: bold;
  letter-spacing: -0.5px;
  
  /* Style to make it look handwritten */
  transform: rotate(-0.5deg);
`;

const CardMeta = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 10px;
  margin-bottom: 10px;
  color: #8a7248;
  font-style: italic;
`;

const CardContent = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 11px;
  color: #5d4e3f;
  flex: 1;
  line-height: 1.4;
  overflow: hidden;
  
  /* Style to make it look handwritten */
  transform: rotate(-0.5deg);
`;

// Rating system styled for bulletin board aesthetic
const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  gap: 2px;
`;

const Star = styled.span`
  color: ${props => props.filled ? '#b38c42' : '#d1c6a8'};
  cursor: pointer;
  font-size: 12px;
  transition: color 0.2s;
  
  &:hover {
    color: ${props => !props.filled ? '#c9a051' : '#b38c42'};
  }
`;

const RatingText = styled.span`
  font-family: 'Courier New', monospace;
  font-size: 9px;
  color: #8a7248;
  margin-left: 6px;
  font-style: italic;
`;

// Control bar for adding new cards
const ControlBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
`;

const ActionButton = styled.button`
  background-color: #a67c52;
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    background-color: #8c6a46;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(140, 106, 70, 0.3);
    
    &:before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Helper function to calculate the bounding box of a rotated rectangle
const getRotatedBoundingBox = (width, height, rotation) => {
  const rad = (rotation * Math.PI) / 180;
  const cos = Math.abs(Math.cos(rad));
  const sin = Math.abs(Math.sin(rad));
  
  const newWidth = width * cos + height * sin;
  const newHeight = width * sin + height * cos;
  
  return { width: newWidth, height: newHeight };
};

// Helper function to get random position within bounds
const getRandomPosition = (width, height, cardWidth, cardHeight) => {
  const frameWidth = 12; // Border frame width
  const boardPadding = 32; // 2rem = 32px padding from BulletinBoardContainer
  const minPosition = frameWidth + boardPadding; // 44px from edges
  
  // Calculate max positions (where the bottom-right of card touches the boundary)
  const maxX = width - minPosition - cardWidth;
  const maxY = height - minPosition - cardHeight;
  
  return {
    x: minPosition + Math.random() * (maxX - minPosition),
    y: minPosition + Math.random() * (maxY - minPosition)
  };
};

// Helper function to get random rotation
const getRandomRotation = () => {
  return (Math.random() * 10) - 5; // -5 to 5 degrees
};

// Helper function to generate random pin colors
const getPinColor = () => {
  const colors = ['#b54b35', '#3a81b5', '#55a546', '#986db2', '#b38c42'];
  return colors[Math.floor(Math.random() * colors.length)];
};

function Spotlight() {
  const [cards, setCards] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [activeCard, setActiveCard] = useState(null);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [cardPositions, setCardPositions] = useState({});
  const [ratings, setRatings] = useState({});
  const [flippedCards, setFlippedCards] = useState({});
  const [newCardIds, setNewCardIds] = useState(new Set());
  const boardRef = useRef(null);

  // Initialize with a few cards
  useEffect(() => {
    if (cards.length === 0 && recipeData.length > 0) {
      const initialCards = recipeData.slice(0, 5).map((recipe, index) => {
        return {
          id: index + 1,
          recipeId: recipe.id,
          title: recipe.title,
          category: recipe.category,
          time: recipe.time,
          text: `${recipe.title} is a ${recipe.category.toLowerCase()} recipe that takes ${recipe.time.toLowerCase()} to prepare.`,
          ingredients: recipe.ingredients || [
            "2 cups all-purpose flour", 
            "1 cup granulated sugar", 
            "1/2 cup unsalted butter", 
            "2 large eggs", 
            "1 cup milk",
            "1 tsp baking powder",
            "1/2 tsp salt",
            "1 tsp vanilla extract"
          ],
          instructions: recipe.instructions || [
            "Preheat oven to 350°F (175°C).",
            "In a large bowl, mix the flour, sugar, baking powder, and salt.",
            "In another bowl, cream the butter until smooth, then add eggs one at a time.",
            "Gradually add the dry ingredients to the wet mixture, alternating with milk.",
            "Add vanilla extract and mix until just combined.",
            "Pour into prepared pan and bake for 25-30 minutes or until a toothpick comes out clean.",
            "Allow to cool before serving."
          ],
          zIndex: index + 1,
          rotate: getRandomRotation(),
          pinColor: getPinColor(),
          pinTop: `${8 + Math.random() * 15}px`,
          pinLeft: `${10 + Math.random() * 80}%`
        };
      });
      
      setCards(initialCards);
      setNextId(initialCards.length + 1);
      
      // Set initial positions
      const boardWidth = boardRef.current?.offsetWidth || 800;
      const boardHeight = boardRef.current?.offsetHeight || 600;
      
      const positions = {};
      initialCards.forEach(card => {
        const rotatedBox = getRotatedBoundingBox(250, 150, card.rotate);
        const adjustedWidth = rotatedBox.width;
        const adjustedHeight = rotatedBox.height;
        const pos = getRandomPosition(boardWidth, boardHeight, adjustedWidth, adjustedHeight);
        positions[card.id] = { x: pos.x, y: pos.y };
      });
      
      setCardPositions(positions);
      
      // Load saved ratings from localStorage
      const savedRatings = {};
      const initialFlippedState = {};
      initialCards.forEach(card => {
        const savedRating = localStorage.getItem(`bulletin_rating_${card.recipeId}`);
        if (savedRating) {
          savedRatings[card.id] = parseInt(savedRating);
        } else {
          savedRatings[card.id] = 0;
        }
        initialFlippedState[card.id] = false;
      });
      setRatings(savedRatings);
      setFlippedCards(initialFlippedState);
    }
  }, [cards.length, recipeData]);

  // Toggle card flip with audio feedback
  const toggleCardFlip = (cardId) => {
    // Play flip sound
    const playFlipSound = () => {
      try {
        const flipSound = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fO4Xw==");
        flipSound.volume = 0.2;
        flipSound.play();
      } catch (e) {
        console.log("Audio not supported");
      }
    };
    
    playFlipSound();
    
    // Toggle flip state
    setFlippedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };
  
  // Handle card mouse down
  const handleCardMouseDown = (e, cardId) => {
    e.preventDefault();
    
    // Don't initiate drag if clicking on a star or flip indicator
    if (e.target.classList.contains('star') || e.target.classList.contains('flip-indicator')) {
      return;
    }
    
    // Bring card to front
    setCards(prevCards => 
      prevCards.map(card => ({
        ...card,
        zIndex: card.id === cardId ? Math.max(...prevCards.map(c => c.zIndex)) + 1 : card.zIndex
      }))
    );
    
    // Record starting position
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    // Get board rect for calculations
    const board = boardRef.current;
    const boardRect = board.getBoundingClientRect();
    
    // Get current card position
    const currentPos = cardPositions[cardId] || { x: 0, y: 0 };
    
    // Calculate cursor position relative to card's top-left corner
    const offsetX = clientX - boardRect.left - currentPos.x;
    const offsetY = clientY - boardRect.top - currentPos.y;
    
    setDragStartPos({ x: offsetX, y: offsetY });
    setActiveCard(cardId);
  };

  // Handle mouse move
  const handleMouseMove = (e) => {
    if (activeCard !== null) {
      e.preventDefault();
      
      const board = boardRef.current;
      if (!board) return;
      
      const boardRect = board.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      // Find the active card to get its rotation
      const activeCardData = cards.find(card => card.id === activeCard);
      if (!activeCardData) return;
      
      // Calculate the rotated bounding box
      const cardWidth = 250;
      const cardHeight = 150;
      const rotatedBox = getRotatedBoundingBox(cardWidth, cardHeight, activeCardData.rotate);
      
      // Calculate offset to center (difference between rotated and original box)
      const widthDiff = (rotatedBox.width - cardWidth) / 2;
      const heightDiff = (rotatedBox.height - cardHeight) / 2;
      
      // Calculate new position relative to the board
      let x = clientX - boardRect.left - dragStartPos.x;
      let y = clientY - boardRect.top - dragStartPos.y;
      
      // Apply boundary constraints considering the rotated bounding box
      const boardWidth = board.offsetWidth;
      const boardHeight = board.offsetHeight;
      const frameWidth = 12; // Border frame width
      const boardPadding = 32; // 2rem = 32px padding from BulletinBoardContainer
      const minPosition = frameWidth + boardPadding; // 44px from edges
      
      // Adjust min/max positions for the rotated bounding box
      const minX = minPosition + widthDiff;
      const minY = minPosition + heightDiff;
      const maxX = boardWidth - minPosition - cardWidth - widthDiff;
      const maxY = boardHeight - minPosition - cardHeight - heightDiff;
      
      // Constrain positions to the boundary area
      x = Math.max(minX, Math.min(x, maxX));
      y = Math.max(minY, Math.min(y, maxY));
      
      // Update card position
      setCardPositions(prevPositions => ({
        ...prevPositions,
        [activeCard]: { x, y }
      }));
    }
  };

  // Handle mouse up
  const handleMouseUp = () => {
    setActiveCard(null);
  };

  // Handle rating click
  const handleRating = (cardId, recipeId, value) => {
    // Save to localStorage
    localStorage.setItem(`bulletin_rating_${recipeId}`, value);
    
    // Update state
    setRatings(prevRatings => ({
      ...prevRatings,
      [cardId]: value
    }));
  };

  // Add a new card
  const addNewCard = () => {
    if (recipeData.length < nextId) return;
    
    const recipe = recipeData[nextId - 1];
    
    // Create new card
    const newCard = {
      id: nextId,
      recipeId: recipe.id,
      title: recipe.title,
      category: recipe.category,
      time: recipe.time,
      text: `${recipe.title} is a ${recipe.category.toLowerCase()} recipe that takes ${recipe.time.toLowerCase()} to prepare.`,
      ingredients: recipe.ingredients || [
        "2 cups all-purpose flour", 
        "1 cup granulated sugar", 
        "1/2 cup unsalted butter", 
        "2 large eggs", 
        "1 cup milk",
        "1 tsp baking powder",
        "1/2 tsp salt",
        "1 tsp vanilla extract"
      ],
      instructions: recipe.instructions || [
        "Preheat oven to 350°F (175°C).",
        "In a large bowl, mix the flour, sugar, baking powder, and salt.",
        "In another bowl, cream the butter until smooth, then add eggs one at a time.",
        "Gradually add the dry ingredients to the wet mixture, alternating with milk.",
        "Add vanilla extract and mix until just combined.",
        "Pour into prepared pan and bake for 25-30 minutes or until a toothpick comes out clean.",
        "Allow to cool before serving."
      ],
      zIndex: Math.max(...cards.map(c => c.zIndex), 0) + 1,
      rotate: getRandomRotation(),
      pinColor: getPinColor(),
      pinTop: `${8 + Math.random() * 15}px`,
      pinLeft: `${10 + Math.random() * 80}%`
    };
    
    // Random position considering rotation
    const boardWidth = boardRef.current.offsetWidth;
    const boardHeight = boardRef.current.offsetHeight;
    const rotatedBox = getRotatedBoundingBox(250, 150, newCard.rotate);
    const pos = getRandomPosition(boardWidth, boardHeight, rotatedBox.width, rotatedBox.height);
    
    // Update state
    setCards(prevCards => [...prevCards, newCard]);
    setCardPositions(prevPositions => ({
      ...prevPositions,
      [nextId]: { x: pos.x, y: pos.y }
    }));
    
    // Mark as new card for animation
    setNewCardIds(prev => new Set([...prev, nextId]));
    setTimeout(() => {
      setNewCardIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(nextId);
        return newSet;
      });
    }, 600);
    
    // Get saved rating or set to 0
    const savedRating = localStorage.getItem(`bulletin_rating_${recipe.id}`);
    setRatings(prevRatings => ({
      ...prevRatings,
      [nextId]: savedRating ? parseInt(savedRating) : 0
    }));
    
    // Set initial flip state
    setFlippedCards(prev => ({
      ...prev,
      [nextId]: false
    }));
    
    setNextId(prevId => prevId + 1);
  };

  // Clear all cards
  const clearAllCards = () => {
    setCards([]);
    setCardPositions({});
    setRatings({});
    setFlippedCards({});
    setNewCardIds(new Set());
    setNextId(1);
  };

  // Randomize card positions
  const shuffleCards = () => {
    const boardWidth = boardRef.current.offsetWidth;
    const boardHeight = boardRef.current.offsetHeight;
    
    // Update rotations first
    const updatedCards = cards.map(card => ({
      ...card,
      rotate: getRandomRotation(),
      pinTop: `${8 + Math.random() * 15}px`,
      pinLeft: `${10 + Math.random() * 80}%`
    }));
    
    // Then calculate positions based on new rotations
    const newPositions = {};
    updatedCards.forEach(card => {
      const rotatedBox = getRotatedBoundingBox(250, 150, card.rotate);
      const pos = getRandomPosition(boardWidth, boardHeight, rotatedBox.width, rotatedBox.height);
      newPositions[card.id] = { x: pos.x, y: pos.y };
    });
    
    setCards(updatedCards);
    setCardPositions(newPositions);
  };

  // Register global mouse events for better drag experience
  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();
    
    if (activeCard !== null) {
      // Add listeners to document for global tracking
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchmove', handleGlobalMouseMove, { passive: false });
      document.addEventListener('touchend', handleGlobalMouseUp);
    }
    
    return () => {
      // Clean up global listeners
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalMouseMove);
      document.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [activeCard, dragStartPos]); // Re-run when activeCard or dragStartPos changes

  return (
    <SpotlightSection id="spotlight" data-observe>
      <h2>Recipe Collection</h2>
      
      <ControlBar>
        <ActionButton onClick={addNewCard}>Add Recipe Card</ActionButton>
        <ActionButton onClick={shuffleCards}>Shuffle Cards</ActionButton>
        <ActionButton onClick={clearAllCards}>Clear Board</ActionButton>
      </ControlBar>
      
      <BulletinBoardContainer 
        ref={boardRef}
      >
        <BoardFrame />
        
        {cards.map(card => (
          <CardContainer
            key={card.id}
            className={newCardIds.has(card.id) ? 'new-card' : ''}
            isDragging={activeCard === card.id}
            rotate={card.rotate}
            x={cardPositions[card.id]?.x || 0}
            y={cardPositions[card.id]?.y || 0}
            zIndex={card.zIndex}
            onMouseDown={(e) => handleCardMouseDown(e, card.id)}
            onTouchStart={(e) => handleCardMouseDown(e, card.id)}
          >
            <RecipeCard 
              isFlipped={flippedCards[card.id] || false}
              pinColor={card.pinColor}
              pinTop={card.pinTop}
              pinLeft={card.pinLeft}
            >
              {/* Front of card */}
              <CardFront>
                <CardTitle>{card.title}</CardTitle>
                <CardMeta>{card.category} • {card.time}</CardMeta>
                <CardContent>{card.text}</CardContent>
                
                {/* Rating system */}
                <RatingContainer>
                  {[1, 2, 3, 4, 5].map(value => (
                    <Star
                      key={value}
                      className="star"
                      filled={value <= (ratings[card.id] || 0)}
                      onClick={() => handleRating(card.id, card.recipeId, value)}
                    >
                      ★
                    </Star>
                  ))}
                  <RatingText>
                    {ratings[card.id] > 0 ? `${ratings[card.id]}/5` : 'Rate this'}
                  </RatingText>
                </RatingContainer>
                
                <FlipIndicator 
                  className="flip-indicator" 
                  title="Flip card to see recipe"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCardFlip(card.id);
                  }}
                >
                  ↻
                </FlipIndicator>
              </CardFront>
              
              {/* Back of card */}
              <CardBack>
                <CardTitle>{card.title}</CardTitle>
                
                <RecipeDetails>
                  <SectionTitle>Ingredients:</SectionTitle>
                  <ul>
                    {Array.isArray(card.ingredients) && card.ingredients.map((ingredient, i) => (
                      <RecipeIngredient key={i}>{ingredient}</RecipeIngredient>
                    ))}
                  </ul>
                  
                  <SectionTitle>Instructions:</SectionTitle>
                  {Array.isArray(card.instructions) ? (
                    <ol>
                      {card.instructions.map((step, i) => (
                        <RecipeStep key={i}>{step}</RecipeStep>
                      ))}
                    </ol>
                  ) : (
                    <RecipeInstructions>{card.instructions}</RecipeInstructions>
                  )}
                </RecipeDetails>
                
                <FlipIndicator 
                  className="flip-indicator"
                  title="Flip card to front"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCardFlip(card.id);
                  }}
                >
                  ↻
                </FlipIndicator>
              </CardBack>
            </RecipeCard>
          </CardContainer>
        ))}
      </BulletinBoardContainer>
    </SpotlightSection>
  );
}

export default Spotlight;