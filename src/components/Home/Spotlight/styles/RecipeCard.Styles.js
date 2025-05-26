// src/components/Home/Spotlight/styles/RecipeCard.styles.js
import styled from 'styled-components';

export const paperTexture = `
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

export const CardContainer = styled.div`
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

export const RecipeCardWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.455, 0.03, 0.515, 1.55);
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};
  will-change: transform;
  
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

export const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: ${props => props.back ? '#f0e8d0' : '#f5f0dc'};
  ${paperTexture}
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  padding: 12px;
  transform: ${props => props.back ? 'rotateY(180deg)' : 'rotateY(0deg)'};
  overflow-y: ${props => props.back ? 'auto' : 'visible'};
  will-change: transform;

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
  
  /* Custom scrollbar for back side */
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

export const FlipIndicator = styled.div`
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