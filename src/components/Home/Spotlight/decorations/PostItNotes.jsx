// src/components/Home/Spotlight/decorations/PostItNotes.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Post-it wisdom and quotes
export const postItMessages = [
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

const PostItNotes = ({ postIts, onMouseDown, draggedItem }) => {
  return (
    <>
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
          onMouseDown={(e) => onMouseDown(e, postIt.id, 'postit')}
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
    </>
  );
};

export default PostItNotes;