// src/components/Home/ProductCarousel.jsx
import React from 'react';
import styled from 'styled-components';
import { recipeData } from '../../data/recipes.js';
import mixedBerry from '../../assets/Mixed Berry Focaccia.png';
import rosemaryGarlic from '../../assets/Rosemary-Garlic Focaccia.png';
import tomatoOlive from '../../assets/Tomato and Olive Focaccia.png';
import figWalnut from '../../assets/Fig_Walnut_Focaccia.png';

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
  flex: 0 0 350px; // Increased width to accommodate content
  scroll-snap-align: start;
  text-align: center;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-medium);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 280px; // Increased height
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f6f1;
`;

const CardImage = styled.img`
  width: 85%; // Adjusted for better proportion
  height: 85%;
  object-fit: contain;
  transition: transform 0.6s ease;
  
  ${ProductCard}:hover & {
    transform: rotate(80deg);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem 1.5rem 2rem;
`;

const CardTitle = styled.h3`
  font-size: 1.3rem; // Slightly larger
  margin: 0.5rem 0;
  color: var(--text-dark);
`;

const StartingPrice = styled.p`
  font-size: 0.95rem;
  color: var(--text-medium);
  margin: 0.5rem 0 1rem;
  font-style: italic;
  transition: opacity 0.3s ease;
  
  ${ProductCard}:hover & {
    opacity: 0;
    height: 0;
    margin: 0;
  }
`;

const PriceList = styled.div`
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  ${ProductCard}:hover & {
    max-height: 150px;
    opacity: 1;
  }
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  
  &:not(:last-child) {
    border-bottom: 1px dotted rgba(166, 124, 82, 0.2);
  }
`;

const SizeLabel = styled.span`
  color: var(--text-medium);
  font-weight: 500;
`;

const Price = styled.span`
  color: var(--accent);
  font-weight: 600;
`;

function ProductCarousel() {
  // Create featured recipes with size-based pricing
  const featuredRecipes = [
    {
      id: 'mixed-berry',
      title: 'Mixed Berry Focaccia',
      image: mixedBerry,
      prices: {
        '6"': '$14',  // Premium due to berries
        '8"': '$20',
        '10"': '$28'
      }
    },
    {
      id: 'rosemary-garlic',
      title: 'Rosemary-Garlic Focaccia',
      image: rosemaryGarlic,
      prices: {
        '6"': '$10',  // Classic, simpler ingredients
        '8"': '$16',
        '10"': '$22'
      }
    },
    {
      id: 'tomato-olive',
      title: 'Tomato and Olive Focaccia',
      image: tomatoOlive,
      prices: {
        '6"': '$12',  // Mid-range, quality toppings
        '8"': '$18',
        '10"': '$25'
      }
    },
    {
      id: 'fig-walnut',
      title: 'Fig & Walnut Focaccia',
      image: figWalnut,
      prices: {
        '6"': '$16',  // Premium artisan with figs and walnuts
        '8"': '$22',
        '10"': '$30'
      }
    }
  ];

  return (
    <CarouselSection>
      <h2>Featured Focaccias</h2>
      <CarouselWrapper>
        {featuredRecipes.map((recipe) => (
          <ProductCard key={recipe.id}>
            <ImageContainer>
              <CardImage 
                src={recipe.image || '/api/placeholder/400/250'} 
                alt={recipe.title} 
              />
            </ImageContainer>
            <CardContent>
              <CardTitle>{recipe.title}</CardTitle>
              <StartingPrice>Starting at {recipe.prices['6"']}</StartingPrice>
              <PriceList>
                <PriceRow>
                  <SizeLabel>Personal (6")</SizeLabel>
                  <Price>{recipe.prices['6"']}</Price>
                </PriceRow>
                <PriceRow>
                  <SizeLabel>Classic (8")</SizeLabel>
                  <Price>{recipe.prices['8"']}</Price>
                </PriceRow>
                <PriceRow>
                  <SizeLabel>Family (10")</SizeLabel>
                  <Price>{recipe.prices['10"']}</Price>
                </PriceRow>
              </PriceList>
            </CardContent>
          </ProductCard>
        ))}
      </CarouselWrapper>
    </CarouselSection>
  );
}

export default ProductCarousel;