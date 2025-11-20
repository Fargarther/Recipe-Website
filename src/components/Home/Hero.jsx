// src/components/Home/Hero.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import homepageFocaccia from '../../assets/Homepage_Focaccia.jpg';

const FullScreenHero = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2c1810 0%, #8b4513 50%, #d4a574 100%);
  overflow: hidden;
  margin-top: -80px; /* Pull up to go under header */
  padding-top: 80px; /* Add padding to compensate */
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(${homepageFocaccia}) center/cover;
    opacity: 0.3;
    z-index: 0;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 900px;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 3rem;
  opacity: ${props => props.$show ? 1 : 0};
  transform: ${props => props.$show ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)'};
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.3s;
`;

const HeroLogo = styled(Logo)`
  width: ${props => props.$scrolled ? '150px' : '300px'};
  height: auto;
  filter: drop-shadow(0 10px 30px rgba(0,0,0,0.3));
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  
  path {
    fill: var(--white);
  }
  
  @media (max-width: 768px) {
    width: ${props => props.$scrolled ? '120px' : '250px'};
  }
  
  @media (max-width: 480px) {
    width: ${props => props.$scrolled ? '100px' : '200px'};
  }
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  color: var(--white);
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  text-shadow: 0 4px 20px rgba(0,0,0,0.3);
  opacity: ${props => props.$show ? 1 : 0};
  transform: ${props => props.$show ? 'translateY(0)' : 'translateY(30px)'};
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.6s;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  max-width: 700px;
  margin: 0 auto 3rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.7;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
  opacity: ${props => props.$show ? 1 : 0};
  transform: ${props => props.$show ? 'translateY(0)' : 'translateY(30px)'};
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.9s;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  opacity: ${props => props.$show ? 1 : 0};
  transform: ${props => props.$show ? 'translateY(0)' : 'translateY(30px)'};
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 1.2s;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const Button = styled(Link)`
  display: inline-block;
  background: ${props => props.$primary ? 'var(--white)' : 'transparent'};
  color: ${props => props.$primary ? 'var(--accent)' : 'var(--white)'};
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: ${props => props.$primary ? '0 4px 15px rgba(0,0,0,0.2)' : 'none'};
  border: 2px solid ${props => props.$primary ? 'var(--white)' : 'rgba(255,255,255,0.3)'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
    background: ${props => props.$primary ? 'var(--accent)' : 'var(--white)'};
    color: ${props => props.$primary ? 'var(--white)' : 'var(--accent)'};
    border-color: ${props => props.$primary ? 'var(--accent)' : 'var(--white)'};
  }
  
  @media (max-width: 480px) {
    width: 200px;
    text-align: center;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  opacity: ${props => props.$show ? 1 : 0};
  transition: opacity 1s ease;
  transition-delay: 1.5s;
  cursor: pointer;
  
  &:hover {
    transform: translateX(-50%) translateY(5px);
  }
`;

const ScrollMouse = styled.div`
  width: 30px;
  height: 50px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 25px;
  position: relative;
  
  &:before {
    content: '';
    width: 4px;
    height: 10px;
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 2px;
    animation: scroll 2s infinite;
  }
  
  @keyframes scroll {
    0% {
      opacity: 0;
      transform: translateX(-50%) translateY(0);
    }
    40% {
      opacity: 1;
    }
    80% {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
    100% {
      opacity: 0;
    }
  }
`;

const Verse = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 3rem;
  font-style: italic;
  opacity: ${props => props.$show ? 1 : 0};
  transform: ${props => props.$show ? 'translateY(0)' : 'translateY(30px)'};
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 1.4s;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

function Hero() {
  const [showContent, setShowContent] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    setTimeout(() => setShowContent(true), 100);

    // Handle scroll for logo size
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <FullScreenHero id="hero">
      <HeroContent>
        <LogoContainer $show={showContent}>
          <HeroLogo $scrolled={scrolled} />
        </LogoContainer>
        
        <HeroTitle $show={showContent}>Artisan Sourdough Focaccia</HeroTitle>
        <HeroSubtitle $show={showContent}>
          Handcrafted with love in Metamora, Illinois. Each loaf tells a story of tradition, 
          patience, and the finest organic ingredients.
        </HeroSubtitle>
        
        <ButtonGroup $show={showContent}>
          <Button to="/recipes" $primary>Browse Our Menu</Button>
          <Button to="/subscribe">Order Today</Button>
        </ButtonGroup>
        
        <Verse $show={showContent}>"Give us this day our daily bread" - Matthew 6:11</Verse>
      </HeroContent>
      
      <ScrollIndicator $show={showContent} onClick={handleScrollDown}>
        <ScrollMouse />
      </ScrollIndicator>
    </FullScreenHero>
  );
}

export default Hero;