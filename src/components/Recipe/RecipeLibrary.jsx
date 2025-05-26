// RecipeLibrary.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { recipeData, categories } from '../../data/recipes';
import RecipeCard from './RecipeCard';

const LibrarySection = styled.section`
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

const SearchWrapper = styled.div`
  position: relative;
  max-width: 400px;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid var(--text-medium);
  border-radius: var(--radius-standard);
  font-size: 1rem;
  color: var(--text-dark);
  
  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 2px rgba(166, 124, 82, 0.2);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-medium);
  font-size: 1.1rem;
  pointer-events: none;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-medium);
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  opacity: ${props => props.show ? 1 : 0};
  transition: all 0.2s;
  
  &:hover {
    background: rgba(0,0,0,0.1);
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? 'var(--accent)' : 'transparent'};
  color: ${props => props.active ? 'var(--white)' : 'var(--accent)'};
  border: 1.5px solid var(--accent);
  padding: 0.6rem 1.2rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: all var(--transition);
  font-weight: 600;
  font-size: 0.95rem;
  
  &:hover {
    background: var(--accent);
    color: var(--white);
  }
`;

const RecipeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-top: 2.5rem;
`;

const SkeletonCard = styled.div`
  background: var(--white);
  border-radius: var(--radius-standard);
  padding: 1.8rem;
  box-shadow: var(--shadow-soft);
  
  .skeleton-image {
    width: 100%;
    height: 200px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 8px;
  }
  
  .skeleton-text {
    height: 20px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
    margin: 10px 0;
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-medium);
  grid-column: 1 / -1;
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
  
  h3 {
    margin-bottom: 0.5rem;
    color: var(--text-dark);
  }
`;

function RecipeLibrary() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(recipeData);
  const [isLoading, setIsLoading] = useState(false);

  // Filter recipes based on active category and search query
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading delay for demo purposes
    setTimeout(() => {
      let filtered = recipeData;
      
      // Filter by category
      if (activeCategory !== 'All') {
        filtered = filtered.filter(recipe => recipe.category === activeCategory);
      }
      
      // Filter by search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(recipe => 
          recipe.title.toLowerCase().includes(query)
        );
      }
      
      setFilteredRecipes(filtered);
      setIsLoading(false);
    }, 300);
  }, [activeCategory, searchQuery]);

  return (
    <LibrarySection id="library" data-observe>
      <h2>Recipe Library</h2>
      
      <SearchWrapper>
        <SearchIcon>🔍</SearchIcon>
        <SearchInput
          type="text"
          id="searchInput"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ClearButton 
          show={searchQuery.length > 0}
          onClick={() => setSearchQuery('')}
          title="Clear search"
        >
          ✕
        </ClearButton>
      </SearchWrapper>
      
      <FiltersContainer className="filters">
        {categories.map(category => (
          <FilterButton
            key={category}
            className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
            active={activeCategory === category}
            data-cat={category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </FilterButton>
        ))}
      </FiltersContainer>
      
      <RecipeGrid className="library">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index}>
              <div className="skeleton-image"></div>
              <div className="skeleton-text" style={{ width: '70%' }}></div>
              <div className="skeleton-text" style={{ width: '50%' }}></div>
              <div className="skeleton-text" style={{ width: '60%' }}></div>
            </SkeletonCard>
          ))
        ) : filteredRecipes.length === 0 ? (
          <EmptyState>
            <div className="empty-icon">🍳</div>
            <h3>No recipes found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </EmptyState>
        ) : (
          filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        )}
      </RecipeGrid>
    </LibrarySection>
  );
}

export default RecipeLibrary;