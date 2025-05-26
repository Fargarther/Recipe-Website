// About.js
import React, { useState } from 'react';
import styled from 'styled-components';
import GalleryDialog from './GalleryDialog.jsx';

const AboutSection = styled.section`
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

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutImage = styled.div`
  border-radius: 50%;
  overflow: hidden;
  box-shadow: var(--shadow-medium);
  
  @media (max-width: 768px) {
    max-width: 250px;
    margin: 0 auto 2rem;
  }
`;

const ChefImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const AboutText = styled.div``;

const AboutParagraph = styled.p`
  margin-bottom: 1.5rem;
  color: var(--text-medium);
  font-size: 1.1rem;
  line-height: 1.8;
`;

const GalleryButton = styled.button`
  display: inline-block;
  background: var(--accent);
  color: var(--white);
  padding: 0.9rem 1.8rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
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

function About() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  
  const openGallery = () => setIsGalleryOpen(true);
  const closeGallery = () => setIsGalleryOpen(false);
  
  return (
    <AboutSection id="about" data-observe>
      <h2>About Chef Alex</h2>
      
      <AboutContent className="about-content">
        <AboutImage className="about-image">
          <ChefImage src="/api/placeholder/400/400" alt="Chef Alex" />
        </AboutImage>
        
        <AboutText>
          <AboutParagraph>
            After training at the Culinary Institute and working in Michelin-starred restaurants across Europe, I returned to my rural roots with a passion for seasonal, local ingredients and traditional techniques reimagined for the modern table.
          </AboutParagraph>
          
          <AboutParagraph>
            My food philosophy centers on respect for ingredients, minimalist presentation, and flavors that speak for themselves. This website is a collection of recipes and techniques I've refined over the years—things I cook at home, share with friends, and believe deserve a wider audience.
          </AboutParagraph>
          
          <AboutParagraph>
            All recipes are free to download and use. If you make something you love, consider joining my monthly newsletter or sharing with friends.
          </AboutParagraph>
          
          <GalleryButton id="openGallery" className="btn" onClick={openGallery}>
            View Kitchen Gallery
          </GalleryButton>
        </AboutText>
      </AboutContent>
      
      <GalleryDialog isOpen={isGalleryOpen} onClose={closeGallery} />
    </AboutSection>
  );
}

export default About;

