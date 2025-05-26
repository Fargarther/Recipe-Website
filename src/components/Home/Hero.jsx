// Hero.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeroSection = styled.section`
  text-align: center;
  padding: 8rem 2rem;
  background: rgba(234, 226, 214, 0.9);
  border-radius: var(--radius-standard);
  margin-top: 2rem;
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
  
  @media (max-width: 768px) {
    padding: 5rem 1.5rem;
  }
`;

const HeroTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: var(--text-dark);
  background: none;
  padding: 0;
  box-shadow: none;
  display: block;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const HeroParagraph = styled.p`
  font-size: 1.3rem;
  max-width: 700px;
  margin: 0 auto 2.5rem;
  color: var(--text-medium);
  line-height: 1.7;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Button = styled(Link)`
  display: inline-block;
  background: var(--accent);
  color: var(--white);
  padding: 0.9rem 1.8rem;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: background var(--transition), transform 0.2s;
  font-weight: 600;
  font-size: 1.05rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  
  &:hover {
    background: var(--accent-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  }
`;

function Hero() {
  return (
    <HeroSection id="hero" data-observe>
      <HeroTitle>Culinary Alchemy, Shared Freely</HeroTitle>
      <HeroParagraph>
        Frontier-inspired flavors and elevated experiments—take the recipes home, no strings attached.
      </HeroParagraph>
      <Button to="/recipes">Browse Recipes</Button>
    </HeroSection>
  );
}

export default Hero;