// src/components/Home/RecipePortfolio.jsx
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { recipeData } from '../../data/recipes';

// Main portfolio container - sticky at bottom
const PortfolioContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${props => props.$expanded ? '280px' : '80px'};
  background: #f5f0dc;
  background-image: 
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(210, 190, 150, 0.1) 2px,
      rgba(210, 190, 150, 0.1) 4px
    ),
    radial-gradient(
      ellipse at top,
      rgba(255, 250, 240, 0.9),
      rgba(245, 240, 220, 0.95)
    );
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 90;
  border-top: 2px solid #d2be96;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(166, 124, 82, 0.3) 20%, 
      rgba(166, 124, 82, 0.3) 80%, 
      transparent 100%
    );
  }
`;

// Portfolio header with handle
const PortfolioHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  cursor: pointer;
  user-select: none;
  
  &:hover .handle {
    transform: translateY(-2px);
  }
`;

const Handle = styled.div`
  width: 60px;
  height: 4px;
  background: #a67c52;
  border-radius: 2px;
  opacity: 0.6;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 40px;
    height: 3px;
    background: #a67c52;
    border-radius: 2px;
    opacity: 0.4;
    left: 50%;
    transform: translateX(-50%);
  }
  
  &:before {
    top: -8px;
  }
  
  &:after {
    top: 8px;
  }
`;

// Category tabs container
const CategoryTabs = styled.div`
  display: flex;
  height: 50px;
  padding: 0 20px;
  gap: 2px;
  align-items: flex-end;
`;

// Individual category tab
const CategoryTab = styled.div`
  flex: 1;
  max-width: 200px;
  height: ${props => props.$active ? '45px' : '40px'};
  background: ${props => props.$color};
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  
  &:hover {
    height: 45px;
    transform: translateY(-2px);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 50%);
    border-radius: 8px 8px 0 0;
    pointer-events: none;
  }
`;

// Recipe cards container
const RecipeCardsContainer = styled.div`
  display: flex;
  gap: 15px;
  padding: 0 20px;
  height: ${props => props.$expanded ? '200px' : '0'};
  overflow: ${props => props.$expanded ? 'visible' : 'hidden'};
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

// Category section
const CategorySection = styled.div`
  flex: 1;
  max-width: 200px;
  display: ${props => props.$active ? 'flex' : 'none'};
  flex-direction: column;
  gap: 8px;
  padding-top: 10px;
`;

// Individual recipe card
const RecipeCard = styled.div`
  width: 100%;
  height: ${props => props.$expanded ? '140px' : '40px'};
  background: #fffef5;
  border: 1px solid rgba(210, 190, 150, 0.5);
  border-radius: 4px;
  padding: 8px 12px;
  cursor: grab;
  position: relative;
  transition: all 0.2s;
  transform: ${props => props.$index ? `rotate(${props.$index % 2 === 0 ? -1 : 1}deg)` : 'rotate(0deg)'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: -100px;
  z-index: ${props => 10 - props.$index};
  
  &:hover {
    transform: translateY(-5px) rotate(0deg) !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 20;
    height: 140px;
  }
  
  &:active {
    cursor: grabbing;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      repeating-linear-gradient(
        120deg, 
        rgba(255,250,240,0.05), 
        rgba(255,250,240,0.05) 1px, 
        transparent 1px, 
        transparent 2px
      );
    pointer-events: none;
  }
`;

const RecipeTitle = styled.h4`
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: #59483b;
  margin: 0 0 4px 0;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RecipeMeta = styled.p`
  font-family: 'Courier New', monospace;
  font-size: 11px;
  color: #8a7248;
  margin: 0;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.2s;
`;

const RecipeDescription = styled.p`
  font-family: 'Courier New', monospace;
  font-size: 11px;
  color: #5d4e3f;
  margin: 8px 0 0 0;
  line-height: 1.3;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.2s;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// Category colors
const categoryColors = {
  'All': '#a67c52',
  'Appetizers': '#e3c099',
  'Mains': '#7a9fb8',
  'Sides': '#8fa678',
  'Desserts': '#c8a2c8',
  'Drinks': '#f4a460',
  'Bread': '#d4a574'
};

const RecipePortfolio = ({ onDragStart }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [draggedRecipe, setDraggedRecipe] = useState(null);
  
  // Group recipes by category
  const recipesByCategory = recipeData.reduce((acc, recipe) => {
    if (!acc[recipe.category]) {
      acc[recipe.category] = [];
    }
    acc[recipe.category].push(recipe);
    acc['All'] = [...(acc['All'] || []), recipe];
    return acc;
  }, {});
  
  const handleDragStart = (e, recipe) => {
    setDraggedRecipe(recipe);
    
    // Create a ghost image for dragging
    const ghostElement = document.createElement('div');
    ghostElement.style.width = '250px';
    ghostElement.style.height = '150px';
    ghostElement.style.background = '#f5f0dc';
    ghostElement.style.border = '1px solid #d2be96';
    ghostElement.style.borderRadius = '4px';
    ghostElement.style.padding = '12px';
    ghostElement.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    ghostElement.style.transform = 'rotate(-2deg)';
    ghostElement.innerHTML = `
      <div style="font-family: 'Courier New', monospace; font-size: 14px; color: #59483b; font-weight: bold;">${recipe.title}</div>
      <div style="font-family: 'Courier New', monospace; font-size: 11px; color: #8a7248; margin-top: 4px;">${recipe.category} • ${recipe.time}</div>
    `;
    
    document.body.appendChild(ghostElement);
    e.dataTransfer.setDragImage(ghostElement, 125, 75);
    
    // Clean up ghost element
    setTimeout(() => {
      document.body.removeChild(ghostElement);
    }, 0);
    
    // Notify parent component
    if (onDragStart) {
      onDragStart(recipe);
    }
  };
  
  const categories = ['All', 'Appetizers', 'Mains', 'Sides', 'Desserts', 'Drinks', 'Bread'];
  
  return (
    <PortfolioContainer $expanded={expanded}>
      <PortfolioHeader onClick={() => setExpanded(!expanded)}>
        <Handle className="handle" />
      </PortfolioHeader>
      
      <CategoryTabs>
        {categories.map(category => (
          recipesByCategory[category] && (
            <CategoryTab
              key={category}
              $active={activeCategory === category}
              $color={categoryColors[category]}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </CategoryTab>
          )
        ))}
      </CategoryTabs>
      
      <RecipeCardsContainer $expanded={expanded}>
        {categories.map(category => (
          recipesByCategory[category] && (
            <CategorySection
              key={category}
              $active={activeCategory === category}
            >
              {recipesByCategory[category].slice(0, 5).map((recipe, index) => (
                <RecipeCard
                  key={recipe.id}
                  $expanded={expanded}
                  $index={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, recipe)}
                >
                  <RecipeTitle>{recipe.title}</RecipeTitle>
                  <RecipeMeta $visible={expanded}>
                    {recipe.category} • {recipe.time}
                  </RecipeMeta>
                  <RecipeDescription $visible={expanded}>
                    A delightful {recipe.category.toLowerCase()} recipe perfect for any occasion.
                  </RecipeDescription>
                </RecipeCard>
              ))}
            </CategorySection>
          )
        ))}
      </RecipeCardsContainer>
    </PortfolioContainer>
  );
};

export default RecipePortfolio;