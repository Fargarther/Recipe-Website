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
  position: relative;
  z-index: 100;
  background: #f5f0dc;
  
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
  color: ${props => props.$active ? '#fff' : 'rgba(255, 255, 255, 0.9)'};
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    height: 45px;
    transform: translateY(-2px);
    color: #fff;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 50%);
    border-radius: 8px 8px 0 0;
    pointer-events: none;
  }
`;

// Recipe cards container
const RecipeCardsContainer = styled.div`
  display: ${props => props.$expanded ? 'flex' : 'none'};
  gap: 20px;
  padding: 20px;
  height: ${props => props.$expanded ? '200px' : '0'};
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.05);
  flex-wrap: wrap;
  align-content: flex-start;
`;

// Category section
const CategorySection = styled.div`
  display: ${props => props.$active ? 'contents' : 'none'};
`;

// Individual recipe card
const RecipeCard = styled.div`
  background: #fffef5;
  border: 1px solid rgba(210, 190, 150, 0.5);
  border-radius: 6px;
  padding: 12px 16px;
  cursor: grab;
  position: relative;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 180px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background: #fffff8;
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
    border-radius: 6px;
  }
`;

const RecipeTitle = styled.h4`
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #59483b;
  margin: 0;
  font-weight: bold;
  text-align: center;
  line-height: 1.2;
`;

const EmptyMessage = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #8a7248;
  font-style: italic;
  padding: 20px;
  text-align: center;
`;

// Category colors
const categoryColors = {
  'All': '#9e9e9e',
  'Apps': '#a8b5c4',
  'Mains': '#8fa5b8',
  'Sides': '#9cb89c',
  'Desserts': '#c8a8b8',
  'Drinks': '#d4b896',
  'Bread': '#b8a898'
};

const RecipePortfolio = ({ onDragStart }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [draggedRecipe, setDraggedRecipe] = useState(null);
  
  // Group recipes by category
  const recipesByCategory = recipeData.reduce((acc, recipe) => {
    let category = recipe.category;
    // Map recipe categories to tab names
    if (category === 'Main') category = 'Mains';
    if (category === 'Dessert') category = 'Desserts';
    if (category === 'Appetizers') category = 'Apps';
    
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(recipe);
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
  
  const categories = ['All', 'Apps', 'Sides', 'Mains', 'Desserts'];
  
  return (
    <PortfolioContainer $expanded={expanded}>
      <PortfolioHeader onClick={() => setExpanded(!expanded)}>
        <Handle className="handle" />
      </PortfolioHeader>
      
      <CategoryTabs>
        {categories.map(category => (
          <CategoryTab
            key={category}
            $active={activeCategory === category}
            $color={categoryColors[category]}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </CategoryTab>
        ))}
      </CategoryTabs>
      
      <RecipeCardsContainer $expanded={expanded}>
        {categories.map(category => {
          const recipes = recipesByCategory[category] || [];
          return (
            <CategorySection
              key={category}
              $active={activeCategory === category}
            >
              {recipes.length > 0 ? (
                recipes.map((recipe, index) => (
                  <RecipeCard
                    key={recipe.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, recipe)}
                  >
                    <RecipeTitle>{recipe.title}</RecipeTitle>
                  </RecipeCard>
                ))
              ) : (
                activeCategory === category && (
                  <EmptyMessage>No recipes in this category</EmptyMessage>
                )
              )}
            </CategorySection>
          );
        })}
      </RecipeCardsContainer>
    </PortfolioContainer>
  );
};

export default RecipePortfolio;