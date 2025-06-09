// src/components/About/About.jsx
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

const ChefImage = styled.img.attrs({ loading: 'lazy' })`
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
      <h2>About Sal</h2>
      
      <AboutContent className="about-content">
        <AboutImage className="about-image">
          <ChefImage src="/api/placeholder/400/400" alt="Sal Artisan Focaccia" />
        </AboutImage>
        
        <AboutText>
          <AboutParagraph>
            Sal began with a simple belief: exceptional bread deserves to be shared. Our journey started in a home kitchen in Metamora, Illinois, where we spent countless hours perfecting the art of sourdough focaccia.
          </AboutParagraph>
          
          <AboutParagraph>
            We chose focaccia because it's more than just bread—it's a canvas for creativity and a centerpiece for gathering. Using organic King Arthur flour, premium semolina, and Partanna olive oil, we've developed recipes that honor tradition while bringing something new to Central Illinois.
          </AboutParagraph>
          
          <AboutParagraph>
            Today, we're blessed to offer made-to-order focaccia that combines old-world craftsmanship with modern convenience. From our kitchen to your table, we're committed to making every loaf special.
          </AboutParagraph>
          
          <GalleryButton id="openGallery" className="btn" onClick={openGallery}>
            View Our Kitchen
          </GalleryButton>
        </AboutText>
      </AboutContent>
      
      <GalleryDialog isOpen={isGalleryOpen} onClose={closeGallery} />
    </AboutSection>
  );
}

export default About;