// src/components/Home/ProductCarousel.jsx
import React from 'react';
import styled from 'styled-components';
import { recipeData } from '../../data/recipes.js';
import mixedBerry from '../../assets/Mixed Berry Focaccia.png';
import rosemaryGarlic from '../../assets/Rosemary-Garlic Focaccia.png';
import tomatoOlive from '../../assets/Tomato and Olive Focaccia.png';

// A new section wrapper for the carousel on the home page
const CarouselSection = styled.section`
  max-width: 100%; // Allow it to go full-width if desired
  background: var(--white);
  padding: 3rem 0; // Vertical padding, no horizontal
  box-shadow: 0 -2px 10px rgba(0,0,0,0.05);

  h2 {
    padding-left: 2.5rem; // Align title with other page content
    padding-right: 2.5rem;
  }
`;

// This will be the horizontally-scrolling container
const CarouselWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1.5rem;
  // Start the scroll just off the edge for a better look
  padding: 1.5rem 2.5rem; 
  scroll-snap-type: x mandatory;

  // Hide scrollbar for a cleaner look, but still allow scrolling
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

// A unique card style for this specific carousel
const ProductCard = styled.div`
  background: var(--linen);
  border-radius: var(--radius-standard);
  box-shadow: var(--shadow-soft);
  transition: all 0.3s ease;
  flex: 0 0 280px; // Give cards a fixed width so they don't shrink
  scroll-snap-align: start;
  text-align: center;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-medium);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0.5rem 0;
  color: var(--text-dark);
`;

const CardPrice = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--accent);
  margin: 0;
`;

function ProductCarousel() {
  // Create featured recipes using the actual images
  const featuredRecipes = [
    {
      id: 'mixed-berry',
      title: 'Mixed Berry Focaccia',
      price: '$22',
      image: mixedBerry
    },
    {
      id: 'rosemary-garlic',
      title: 'Rosemary-Garlic Focaccia',
      price: '$18',
      image: rosemaryGarlic
    },
    {
      id: 'tomato-olive',
      title: 'Tomato and Olive Focaccia',
      price: '$20',
      image: tomatoOlive
    }
  ];

  return (
    <CarouselSection>
      <h2>Featured Focaccias</h2>
      <CarouselWrapper>
        {featuredRecipes.map((recipe) => (
          <ProductCard key={recipe.id}>
            <CardImage src={recipe.image} alt={recipe.title} />
            <CardContent>
              <CardTitle>{recipe.title}</CardTitle>
              <CardPrice>{recipe.price}</CardPrice>
            </CardContent>
          </ProductCard>
        ))}
      </CarouselWrapper>
    </CarouselSection>
  );
}

export default ProductCarousel;