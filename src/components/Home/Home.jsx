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
  margin-top: 0; /* Remove default margin since hero is full screen */
`;

const Mission = styled.section`
  background: var(--white);
  padding: 5rem 2.5rem;
  text-align: center;
  margin: 5rem auto 3rem;
  max-width: 1200px;
  border-radius: var(--radius-standard);
  box-shadow: var(--shadow-soft);
  
  &[data-observe] {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.9s, transform 0.9s;
  }
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MissionTitle = styled.h2`
  margin-bottom: 2rem;
  color: var(--accent);
`;

const MissionStatement = styled.p`
  font-size: 1.3rem;
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.8;
  color: var(--text-medium);
`;

const Values = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ValueCard = styled.div`
  padding: 2rem;
  background: var(--linen);
  border-radius: 0.5rem;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ValueTitle = styled.h3`
  color: var(--accent);
  margin-bottom: 1rem;
`;

const ValueText = styled.p`
  color: var(--text-medium);
  line-height: 1.6;
`;

function Home() {
  const handleRecipeDragStart = (recipe) => {
    // This will be passed to the Spotlight component
    // to handle adding the dragged recipe to the bulletin board
    
    // Dispatch a custom event that Spotlight can listen to
    window.dispatchEvent(new CustomEvent('portfolio-recipe-drag', { 
      detail: { recipe } 
    }));
  };
  
  return (
    <HomeContainer>
      <Hero />
      
      <Mission id="mission" data-observe>
        <MissionTitle>Our Mission</MissionTitle>
        <MissionStatement>
          At Sal, we believe great bread brings people together. Our mission is to craft exceptional 
          sourdough focaccia using time-honored techniques and the finest organic ingredients.
        </MissionStatement>
        
        <Values>
          <ValueCard>
            <ValueTitle>Quality</ValueTitle>
            <ValueText>
              Premium organic ingredients and traditional sourdough methods ensure excellence.
            </ValueText>
          </ValueCard>
          <ValueCard>
            <ValueTitle>Craftsmanship</ValueTitle>
            <ValueText>
              Each focaccia is handmade to order with attention to every detail.
            </ValueText>
          </ValueCard>
          <ValueCard>
            <ValueTitle>Community</ValueTitle>
            <ValueText>
              Building relationships one customer at a time in Central Illinois.
            </ValueText>
          </ValueCard>
          <ValueCard>
            <ValueTitle>Faith</ValueTitle>
            <ValueText>
              Guided by our values, serving with integrity and love.
            </ValueText>
          </ValueCard>
        </Values>
      </Mission>
      
      <Spotlight />
      <Subscribe />
      <RecipePortfolio onDragStart={handleRecipeDragStart} />
    </HomeContainer>
  );
}

export default Home;