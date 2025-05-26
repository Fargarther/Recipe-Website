// ProgressBar.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  position: fixed; 
  top: 0; 
  left: 0; 
  height: 4px; 
  background: var(--accent); 
  width: ${props => props.width}%; 
  z-index: 20; 
  transition: width 0.1s;
`;

function ProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setWidth((scrollY / docHeight) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <ProgressBarContainer width={width} />;
}

export default ProgressBar;