// src/components/Recipe/RecipeCard.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Card = styled.article`
  background: var(--white);
  border-radius: var(--radius-standard);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(166, 124, 82, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    
    &:before {
      opacity: 1;
    }
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.4s ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1.8rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.75rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: var(--text-dark);
  flex: 1;
  margin-right: 1rem;
`;

const CardPrice = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--accent);
`;

const CardMeta = styled.p`
  color: var(--text-medium);
  margin-bottom: 1.2rem;
  font-size: 1.05rem;
`;

const DownloadButton = styled.a`
  display: inline-block;
  background: var(--accent);
  color: var(--white);
  padding: 0.9rem 1.8rem;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  font-size: 1.05rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
  text-align: center;
  width: 100%;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    background: var(--accent-dark);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(166, 124, 82, 0.3);
    
    &:before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const RatingContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.75rem;
`;

const Star = styled.span`
  color: ${props => props.filled ? 'gold' : '#bbbbbb'};
  cursor: pointer;
  font-size: 1.4em;
  transition: all 0.2s;
  
  &:hover {
    transform: scale(1.1);
    color: ${props => props.filled ? 'gold' : '#ffd700'};
  }
`;

const RatingText = styled.p`
  margin-left: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-medium);
`;

const SeasonalBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #e76f51;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
`;

function RecipeCard({ recipe }) {
  const [rating, setRating] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  
  useEffect(() => {
    // Load saved rating from localStorage
    const savedRating = localStorage.getItem(`rating_${recipe.id}`);
    if (savedRating) {
      setRating(parseInt(savedRating));
    }
  }, [recipe.id]);
  
  const handleRating = (value) => {
    localStorage.setItem(`rating_${recipe.id}`, value);
    setRating(value);
  };
  
  const handleDownload = () => {
    setIsDownloading(true);
    // In a real app, this would link to an order form
    window.location.href = `mailto:hello@salartisan.com?subject=Order: ${recipe.title}&body=I would like to order the ${recipe.title} (${recipe.price || '$12-25'}). %0D%0A%0D%0APickup date requested: %0D%0AQuantity: %0D%0ASpecial instructions:`;
    setTimeout(() => {
      setIsDownloading(false);
    }, 1000);
  };
  
  return (
    <Card className="recipe-card" data-cat={recipe.category} data-id={recipe.id}>
      {recipe.availability && <SeasonalBadge>Seasonal: {recipe.availability}</SeasonalBadge>}
      <CardImage src={recipe.image} alt={recipe.title} />
      <CardContent>
        <CardHeader>
          <CardTitle>{recipe.title}</CardTitle>
          {recipe.price && <CardPrice>{recipe.price}</CardPrice>}
        </CardHeader>
        <CardMeta>{recipe.category} · {recipe.time}</CardMeta>
        <DownloadButton 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            handleDownload();
          }}
          className="btn"
        >
          {isDownloading ? 'Processing...' : 'Order This Focaccia'}
        </DownloadButton>
        <RatingContainer className="rating" data-id={recipe.id}>
          {[1, 2, 3, 4, 5].map(value => (
            <Star
              key={value}
              data-value={value}
              filled={value <= rating}
              className={value <= rating ? 'filled' : ''}
              onClick={() => handleRating(value)}
            >
              ★
            </Star>
          ))}
          <RatingText className="ratingDisplay">Rating: {rating}</RatingText>
        </RatingContainer>
      </CardContent>
    </Card>
  );
}

export default RecipeCard;