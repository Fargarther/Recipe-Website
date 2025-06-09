import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.svg';
import reactLogo from '../../assets/react.svg';

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 3rem auto;
  overflow: hidden;
`;

const Slides = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(${props => props.$index * -100}%);
`;

const Slide = styled.div`
  flex: 0 0 100%;
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
`;

const Controls = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
`;

const Button = styled.button`
  background: rgba(0,0,0,0.5);
  border: none;
  color: white;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

function ImageCarousel() {
  const images = [logo, reactLogo];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(id);
  }, [images.length]);

  const prev = () => {
    setIndex(i => (i - 1 + images.length) % images.length);
  };

  const next = () => {
    setIndex(i => (i + 1) % images.length);
  };

  return (
    <CarouselWrapper>
      <Slides $index={index}>
        {images.map((src, i) => (
          <Slide key={i}>
            <Img src={src} alt="slide" />
          </Slide>
        ))}
      </Slides>
      <Controls>
        <Button onClick={prev} aria-label="Previous">‹</Button>
        <Button onClick={next} aria-label="Next">›</Button>
      </Controls>
    </CarouselWrapper>
  );
}

export default ImageCarousel;
