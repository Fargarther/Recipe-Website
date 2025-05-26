// src/components/Home/Home.jsx
import React from 'react';
import styled from 'styled-components';
import Hero from './Hero';
import Spotlight from './Spotlight/Index'; // Now imports from the new index.jsx
import Subscribe from './Subscribe';

const HomeContainer = styled.div``;

function Home() {
  return (
    <HomeContainer>
      <Hero />
      <Spotlight />
      <Subscribe />
    </HomeContainer>
  );
}

export default Home;




