// src/components/Home/Home.jsx
import React from 'react';
import styled from 'styled-components';
import Hero from './Hero';
import Spotlight from './Spotlight/Index';
import Subscribe from './Subscribe';
import RecipePortfolio from './RecipePortfolio';

const HomeContainer = styled.div`
  /* Add padding at bottom to prevent content from being hidden behind portfolio */
  padding-bottom: 100px;
`;

function Home() {
  const handleRecipeDragStart = (recipe) => {
    // This will be passed to the Spotlight component
    // to handle adding the dragged recipe to the bulletin board
    console.log('Recipe dragged from portfolio:', recipe);
    
    // You'll need to implement a way to communicate with the Spotlight component
    // One option is to use a global state manager or React Context
    // For now, we'll dispatch a custom event that Spotlight can listen to
    window.dispatchEvent(new CustomEvent('portfolio-recipe-drag', { 
      detail: { recipe } 
    }));
  };
  
  return (
    <HomeContainer>
      <Hero />
      <Spotlight />
      <Subscribe />
      <RecipePortfolio onDragStart={handleRecipeDragStart} />
    </HomeContainer>
  );
}

export default Home;