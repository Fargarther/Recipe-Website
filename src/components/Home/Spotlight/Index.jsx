// src/components/Home/Spotlight/Index.jsx
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import BulletinBoard from './BulletinBoard';
import RecipeCard from './RecipeCard/Index';
import ControlBar from './ControlBar';
import useDragAndDrop from './hooks/useDragAndDrop';
import useCardManagement from './hooks/useCardManagement';
import { recipeData } from '../../../data/recipes';
import { getRandomPosition, getRotatedBoundingBox } from './utils/helpers';
import { CARD_DIMENSIONS } from './utils/constants';

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

function Spotlight() {
  const boardRef = useRef(null);
  const [newCardIds, setNewCardIds] = useState(new Set());
  
  // Use custom hooks
  const {
    cards,
    setCards,
    ratings,
    notes,
    handleRating,
    handleNoteChange,
    addNewCard,
    clearAllCards,
    updateCardRotations
  } = useCardManagement(recipeData);
  
  const {
    cardPositions,
    activeCard,
    handleCardMouseDown,
    shufflePositions,
    setCardPositions
  } = useDragAndDrop(cards, setCards, boardRef);
  
  // Handle adding a new card
  const handleAddCard = () => {
    const newCard = addNewCard();
    if (newCard && boardRef.current) {
      const boardWidth = boardRef.current.offsetWidth;
      const boardHeight = boardRef.current.offsetHeight;
      const rotatedBox = getRotatedBoundingBox(CARD_DIMENSIONS.width, CARD_DIMENSIONS.height, newCard.rotate);
      const pos = getRandomPosition(boardWidth, boardHeight, rotatedBox.width, rotatedBox.height);
      
      setCardPositions(prev => ({
        ...prev,
        [newCard.id]: { x: pos.x, y: pos.y }
      }));
      
      // Animation
      setNewCardIds(prev => new Set([...prev, newCard.id]));
      setTimeout(() => {
        setNewCardIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(newCard.id);
          return newSet;
        });
      }, 600);
    }
  };
  
  // Handle shuffle
  const handleShuffle = () => {
    updateCardRotations();
    shufflePositions();
  };
  
  // Handle clear with cleanup
  const handleClear = () => {
    clearAllCards();
    setNewCardIds(new Set());
  };
  
  return (
    <SpotlightSection id="spotlight" data-observe>
      <h2>Recipe Collection</h2>
      
      <ControlBar
        onAddCard={handleAddCard}
        onShuffleCards={handleShuffle}
        onClearCards={handleClear}
      />
      
      <BulletinBoard ref={boardRef}>
        {cards.map(card => (
          <RecipeCard
            key={card.id}
            card={card}
            position={cardPositions[card.id] || { x: 0, y: 0 }}
            isDragging={activeCard === card.id}
            isNew={newCardIds.has(card.id)}
            rating={ratings[card.id] || 0}
            note={notes[card.id] || ''}
            onMouseDown={(e) => handleCardMouseDown(e, card.id)}
            onRatingChange={(value) => handleRating(card.id, card.recipeId, value)}
            onNoteChange={(text) => handleNoteChange(card.id, card.recipeId, text)}
          />
        ))}
      </BulletinBoard>
    </SpotlightSection>
  );
}

export default Spotlight;