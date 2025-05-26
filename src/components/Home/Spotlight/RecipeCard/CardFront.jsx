// src/components/Home/Spotlight/RecipeCard/CardFront.jsx
import React from 'react';
import styled from 'styled-components';
import RatingSystem from './RatingSystem';

const CardTitle = styled.h3`
  font-family: 'Courier New', monospace;
  font-size: 14px;
  margin: 0 0 8px;
  color: #59483b;
  font-weight: bold;
  letter-spacing: -0.5px;
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
  transform: rotate(-0.5deg);
`;

const CardFront = ({ title, category, time, text, rating, onRatingChange }) => {
  return (
    <>
      <CardTitle>{title}</CardTitle>
      <CardMeta>{category} • {time}</CardMeta>
      <CardContent>{text}</CardContent>
      <RatingSystem rating={rating} onRate={onRatingChange} />
    </>
  );
};

export default CardFront;