// src/components/Home/Home.jsx
import React from 'react';
import Hero from './Hero';
import MissionSection from './MissionSection';
import ImageCarousel from '../common/ImageCarousel';
import ProductCarousel from './ProductCarousel'; // <-- 1. Import the new component

function Home() {
  return (
    <>
      <Hero />
      <ImageCarousel />
      <ProductCarousel /> {/* <-- 2. Add the component to your page */}
      <MissionSection />
    </>
  );
}

export default Home;