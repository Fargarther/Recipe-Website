// src/components/Home/Spotlight/RecipeCard/CardBack.jsx
import React from 'react';
import styled from 'styled-components';

const CardTitle = styled.h3`
  font-family: 'Courier New', monospace;
  font-size: 18px;
  margin: 0 0 10px;
  color: #59483b;
  font-weight: bold;
  letter-spacing: -0.5px;
`;

const RecipeDetails = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: #59483b;
  line-height: 1.4;
  position: relative;
  z-index: 1;
  margin-bottom: 26px;
`;

const SectionTitle = styled.h4`
  font-family: 'Courier New', monospace;
  font-size: 14px;
  margin: 6px 0 4px;
  color: #59483b;
  text-decoration: underline;
  text-decoration-color: #8a7248;
  text-decoration-thickness: 1px;
  letter-spacing: -0.5px;
`;

const RecipeIngredient = styled.li`
  margin-bottom: 4px;
  font-size: 13px;
  position: relative;
  padding-left: 16px;
  
  &:before {
    content: '•';
    position: absolute;
    left: 0;
    color: #8a7248;
  }
`;

const RecipeStep = styled.li`
  margin-bottom: 6px;
  font-size: 13px;
  line-height: 1.4;
`;

const CardBack = ({ title, ingredients, instructions }) => {
  return (
    <>
      <CardTitle>{title}</CardTitle>
      
      <RecipeDetails>
        <SectionTitle>Ingredients:</SectionTitle>
        <ul>
          {Array.isArray(ingredients) && ingredients.map((ingredient, i) => (
            <RecipeIngredient key={i}>{ingredient}</RecipeIngredient>
          ))}
        </ul>
        
        <SectionTitle>Instructions:</SectionTitle>
        <ol>
          {Array.isArray(instructions) && instructions.map((step, i) => (
            <RecipeStep key={i}>{step}</RecipeStep>
          ))}
        </ol>
      </RecipeDetails>
    </>
  );
};

export default CardBack;