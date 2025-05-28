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

// Camera icon component
const CameraIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
    <circle cx="12" cy="13" r="4"></circle>
  </svg>
);

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
  onExpand,
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
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    // When expanding, close notes and flip to front if needed
    if (newExpandedState) {
      setShowNotes(false);
      setIsFlipped(false);
    }
    // Notify parent component of expansion state change
    if (onExpand) {
      onExpand(newExpandedState);
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
      $isDragging={isDragging}
      $isExpanded={isExpanded}
      $rotate={card.rotate}
      $x={position.x}
      $y={position.y}
      $zIndex={card.zIndex}
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
    >
      <ExpandButton 
        className="expand-button"
        onClick={toggleExpand}
        $isExpanded={isExpanded}
        title={isExpanded ? "Collapse card" : "Expand card"}
      >
        {isExpanded ? '▼' : '▶'}
      </ExpandButton>
      
      <NotesButton
        className="notes-button"
        onClick={toggleNotes}
        $hasNote={!!localNote}
        title="Add/view notes"
      >
        💬
      </NotesButton>
      
      <RecipeCardWrapper 
        $isFlipped={isFlipped && !isExpanded}
        $isExpanded={isExpanded}
        $pinColor={card.pinColor}
        $pinTop={card.pinTop}
        $pinLeft={card.pinLeft}
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
                  title="View recipe photo"
                  onClick={toggleFlip}
                >
                  <CameraIcon />
                </FlipIndicator>
              )}
            </CardSide>
            
            <CardSide $back>
              <CardBack
                title={card.title}
                image={card.image}
                imageAlt={card.imageAlt}
                category={card.category}
              />
              <FlipIndicator 
                className="flip-indicator"
                title="Back to recipe details"
                onClick={toggleFlip}
              >
                <CameraIcon />
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
              <h4>Ingredients</h4>
              <ul>
                {Array.isArray(card.ingredients) && card.ingredients.map((ingredient, i) => (
                  <li key={i} style={{
                    marginBottom: '4px',
                    fontSize: '14px',
                    paddingLeft: '16px',
                    position: 'relative',
                    fontFamily: 'Courier New, monospace',
                    color: '#59483b'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: '#8a7248'
                    }}>•</span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </ExpandedSection>
            <ExpandedSection>
              <h4>Instructions</h4>
              <ol style={{ paddingLeft: '20px' }}>
                {Array.isArray(card.instructions) && card.instructions.map((step, i) => (
                  <li key={i} style={{
                    marginBottom: '6px',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    fontFamily: 'Courier New, monospace',
                    color: '#59483b'
                  }}>
                    {step}
                  </li>
                ))}
              </ol>
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