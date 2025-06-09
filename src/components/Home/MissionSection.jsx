// Part of src/components/Home/Home.jsx - Mission Section
import React from 'react';
import styled from 'styled-components';

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

const ValueIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const ValueTitle = styled.h3`
  color: var(--accent);
  margin-bottom: 1rem;
`;

const ValueText = styled.p`
  color: var(--text-medium);
  line-height: 1.6;
`;

// Component Usage:
function MissionSection() {
  return (
    <Mission id="mission" data-observe>
      <MissionTitle>Our Philosophy</MissionTitle>
      <MissionStatement>
        At Sal, we believe exceptional bread is worth the wait. Our mission is to craft 
        focaccia that brings people together, using time-honored techniques and the 
        finest organic ingredients to create something truly special.
      </MissionStatement>
      
      <Values>
        <ValueCard>
          <ValueIcon>🌾</ValueIcon>
          <ValueTitle>Quality First</ValueTitle>
          <ValueText>
            Only the best organic flour, premium olive oil, and locally-sourced 
            ingredients make it into our focaccia.
          </ValueText>
        </ValueCard>
        <ValueCard>
          <ValueIcon>⏰</ValueIcon>
          <ValueTitle>Time & Patience</ValueTitle>
          <ValueText>
            48-hour fermentation isn't just a process—it's our commitment to 
            developing complex flavors and perfect texture.
          </ValueText>
        </ValueCard>
        <ValueCard>
          <ValueIcon>🤝</ValueIcon>
          <ValueTitle>Community</ValueTitle>
          <ValueText>
            From local farmers to your dinner table, we're proud to be part of 
            Central Illinois' vibrant food community.
          </ValueText>
        </ValueCard>
        <ValueCard>
          <ValueIcon>✨</ValueIcon>
          <ValueTitle>Artisan Craft</ValueTitle>
          <ValueText>
            Every loaf is shaped by hand, dimpled with care, and baked to 
            golden perfection—no shortcuts, ever.
          </ValueText>
        </ValueCard>
      </Values>
    </Mission>
  );
}

export default MissionSection;
