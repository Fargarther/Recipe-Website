// src/components/Home/Spotlight/RecipeCard/index.jsx
import React, { useState } from 'react';
import { CardContainer, RecipeCardWrapper, CardSide, FlipIndicator } from '../styles/RecipeCard.styles';
import CardFront from './CardFront';
import CardBack from './CardBack';
import { playFlipSound } from '../utils/helpers';

const RecipeCard = ({
  card,
  position,
  isDragging,
  isNew,
  rating,
  onMouseDown,
  onRatingChange,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const toggleFlip = (e) => {
    e.stopPropagation();
    playFlipSound();
    setIsFlipped(!isFlipped);
  };
  
  return (
    <CardContainer
      className={isNew ? 'new-card' : ''}
      isDragging={isDragging}
      rotate={card.rotate}
      x={position.x}
      y={position.y}
      zIndex={card.zIndex}
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
    >
      <RecipeCardWrapper 
        isFlipped={isFlipped}
        pinColor={card.pinColor}
        pinTop={card.pinTop}
        pinLeft={card.pinLeft}
      >
        <CardSide>
          <CardFront
            title={card.title}
            category={card.category}
            time={card.time}
            text={card.text}
            rating={rating}
            onRatingChange={onRatingChange}
          />
          <FlipIndicator 
            className="flip-indicator" 
            title="Flip card to see recipe"
            onClick={toggleFlip}
          >
            ↻
          </FlipIndicator>
        </CardSide>
        
        <CardSide back>
          <CardBack
            title={card.title}
            ingredients={card.ingredients}
            instructions={card.instructions}
          />
          <FlipIndicator 
            className="flip-indicator"
            title="Flip card to front"
            onClick={toggleFlip}
          >
            ↻
          </FlipIndicator>
        </CardSide>
      </RecipeCardWrapper>
    </CardContainer>
  );
};

export default RecipeCard;