import React from 'react';
import Hero from './Hero';
import MissionSection from './MissionSection';
import ImageCarousel from '../common/ImageCarousel';

function Home() {
  return (
    <>
      <Hero />
      <ImageCarousel />
      <MissionSection />
    </>
  );
}

export default Home;
