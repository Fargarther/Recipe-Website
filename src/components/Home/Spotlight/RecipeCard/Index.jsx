// src/components/Home/Spotlight/RecipeCard/Index.jsx
import React, { useState } from 'react';
import { 
  CardContainer, 
  RecipeCardWrapper, 
  CardSide, 
  FlipIndicator,
  ExpandButton,
  NotesButton,
  NotesArea,
  ExpandedContent,
  ExpandedSection
} from '../styles/RecipeCard.styles';
import CardFront from './CardFront';
import CardBack from './CardBack';
import { playFlipSound } from '../utils/helpers';

const RecipeCard = ({
  card,
  position,
  isDragging,
  isNew,
  rating,
  note,
  onMouseDown,
  onRatingChange,
  onNoteChange,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [localNote, setLocalNote] = useState(note || '');
  
  const toggleFlip = (e) => {
    e.stopPropagation();
    playFlipSound();
    setIsFlipped(!isFlipped);
  };
  
  const toggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
    // When expanding, close notes and flip to front if needed
    if (!isExpanded) {
      setShowNotes(false);
      setIsFlipped(false);
    }
  };
  
  const toggleNotes = (e) => {
    e.stopPropagation();
    setShowNotes(!showNotes);
  };
  
  const handleNoteChange = (e) => {
    const newNote = e.target.value;
    setLocalNote(newNote);
    if (onNoteChange) {
      onNoteChange(newNote);
    }
  };
  
  return (
    <CardContainer
      className={isNew ? 'new-card' : ''}
      isDragging={isDragging}
      isExpanded={isExpanded}
      rotate={card.rotate}
      x={position.x}
      y={position.y}
      zIndex={card.zIndex}
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
    >
      <ExpandButton 
        className="expand-button"
        onClick={toggleExpand}
        isExpanded={isExpanded}
        title={isExpanded ? "Collapse card" : "Expand card"}
      >
        {isExpanded ? '▼' : '▶'}
      </ExpandButton>
      
      <NotesButton
        className="notes-button"
        onClick={toggleNotes}
        hasNote={!!localNote}
        title="Add/view notes"
      >
        💬
      </NotesButton>
      
      <RecipeCardWrapper 
        isFlipped={isFlipped && !isExpanded}
        isExpanded={isExpanded}
        pinColor={card.pinColor}
        pinTop={card.pinTop}
        pinLeft={card.pinLeft}
      >
        {!isExpanded ? (
          <>
            <CardSide>
              <CardFront
                title={card.title}
                category={card.category}
                time={card.time}
                text={card.text}
                rating={rating}
                onRatingChange={onRatingChange}
              />
              {!showNotes && (
                <FlipIndicator 
                  className="flip-indicator" 
                  title="Flip card to see recipe"
                  onClick={toggleFlip}
                >
                  ↻
                </FlipIndicator>
              )}
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
          </>
        ) : (
          <ExpandedContent>
            <CardFront
              title={card.title}
              category={card.category}
              time={card.time}
              text={card.text}
              rating={rating}
              onRatingChange={onRatingChange}
              expanded
            />
            <ExpandedSection>
              <h4>Full Recipe Details</h4>
              <CardBack
                title=""
                ingredients={card.ingredients}
                instructions={card.instructions}
              />
            </ExpandedSection>
          </ExpandedContent>
        )}
      </RecipeCardWrapper>
      
      {showNotes && (
        <NotesArea
          value={localNote}
          onChange={handleNoteChange}
          placeholder="Add your notes about this recipe..."
          onClick={(e) => e.stopPropagation()}
        />
      )}
    </CardContainer>
  );
};

export default RecipeCard;