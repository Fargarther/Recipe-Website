// src/components/Home/Home.jsx
import React from 'react';
import Hero from './Hero';
import MissionSection from './MissionSection';
import ProductCarousel from './ProductCarousel';

function Home() {
  return (
    <>
      <Hero />
      <ProductCarousel />
      <MissionSection />
    </>
  );
}

export default Home;