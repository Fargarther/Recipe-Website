// src/components/Home/RecipePortfolio.jsx
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { recipeData } from '../../data/recipes';

// Main portfolio container - sticky at bottom
const PortfolioContainer = styled.div`
 position: fixed;
 bottom: 0;
 left: 0;
 right: 0;
 height: ${props => props.$expanded ? '320px' : '80px'};
 background: #f5f0dc;
 background-image: 
   repeating-linear-gradient(
     90deg,
     transparent,
     transparent 2px,
     rgba(210, 190, 150, 0.1) 2px,
     rgba(210, 190, 150, 0.1) 4px
   ),
   radial-gradient(
     ellipse at top,
     rgba(255, 250, 240, 0.9),
     rgba(245, 240, 220, 0.95)
   );
 box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
 transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
 z-index: 90;
 border-top: 2px solid #d2be96;
 
 &:before {
   content: '';
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   height: 1px;
   background: linear-gradient(90deg, 
     transparent 0%, 
     rgba(166, 124, 82, 0.3) 20%, 
     rgba(166, 124, 82, 0.3) 80%, 
     transparent 100%
   );
 }
`;

// Portfolio header with handle - fixed positioning
const PortfolioHeader = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 height: 30px;
 cursor: pointer;
 user-select: none;
 position: relative;
 z-index: 100;
 background: transparent;
 
 &:hover .handle-container {
   transform: translateY(-2px);
 }
`;

// Container for handle to properly position it
const HandleContainer = styled.div`
 position: relative;
 width: 60px;
 height: 20px;
 display: flex;
 align-items: center;
 justify-content: center;
 transition: transform 0.2s;
`;

const Handle = styled.div`
 width: 60px;
 height: 4px;
 background: #a67c52;
 border-radius: 2px;
 opacity: 0.6;
 transition: all 0.2s;
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 position: relative;
 
 &:before,
 &:after {
   content: '';
   position: absolute;
   background: #a67c52;
   border-radius: 2px;
   opacity: 0.4;
   left: 50%;
   transform: translateX(-50%);
 }
 
 &:before {
   width: 40px;
   height: 3px;
   top: -8px;
 }
 
 &:after {
   width: 40px;
   height: 3px;
   bottom: -8px;
 }
`;

// Category tabs container
const CategoryTabs = styled.div`
 display: flex;
 height: 50px;
 padding: 0;
 gap: 0;
 align-items: flex-end;
 width: 100%;
`;

// Individual category tab
const CategoryTab = styled.div`
 flex: 1;
 height: ${props => props.$active ? '45px' : '40px'};
 background: ${props => props.$color};
 display: flex;
 align-items: center;
 justify-content: center;
 font-family: 'Playfair Display', serif;
 font-weight: 600;
 font-size: 14px;
 color: ${props => props.$active ? '#fff' : 'rgba(255, 255, 255, 0.9)'};
 cursor: pointer;
 position: relative;
 transition: all 0.2s;
 border-right: 1px solid rgba(0, 0, 0, 0.1);
 
 &:last-child {
   border-right: none;
 }
 
 &:hover {
   height: 45px;
   transform: translateY(-2px);
   color: #fff;
   z-index: 1;
   box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
 }
 
 &:before {
   content: '';
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   height: 100%;
   background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 50%);
   pointer-events: none;
 }
`;

// Recipe cards container with scroll
const RecipeCardsContainer = styled.div`
 display: ${props => props.$expanded ? 'block' : 'none'};
 height: ${props => props.$expanded ? '240px' : '0'};
 overflow: hidden;
 transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
 background: rgba(255, 255, 255, 0.05);
 position: relative;
`;

// Search and filter bar
const SearchFilterBar = styled.div`
 display: flex;
 align-items: center;
 gap: 15px;
 padding: 0 20px;
 height: 40px;
 background: rgba(255, 254, 245, 0.3);
 border-bottom: 1px solid rgba(210, 190, 150, 0.3);
`;

const SearchInput = styled.input`
 flex: 1;
 max-width: 300px;
 padding: 6px 12px;
 border: 1px solid rgba(210, 190, 150, 0.5);
 border-radius: 4px;
 background: rgba(255, 254, 245, 0.8);
 font-family: 'Courier New', monospace;
 font-size: 13px;
 color: #59483b;
 transition: all 0.2s;
 
 &:focus {
   outline: none;
   border-color: #a67c52;
   background: rgba(255, 254, 245, 1);
   box-shadow: 0 0 0 2px rgba(166, 124, 82, 0.1);
 }
 
 &::placeholder {
   color: #a09080;
 }
`;

const FilterChip = styled.button`
 padding: 5px 12px;
 border: 1px solid ${props => props.$active ? '#a67c52' : 'rgba(210, 190, 150, 0.5)'};
 background: ${props => props.$active ? '#a67c52' : 'rgba(255, 254, 245, 0.6)'};
 color: ${props => props.$active ? '#fff' : '#59483b'};
 border-radius: 15px;
 font-family: 'Courier New', monospace;
 font-size: 12px;
 cursor: pointer;
 transition: all 0.2s;
 white-space: nowrap;
 
 &:hover {
   background: ${props => props.$active ? '#8c6a46' : 'rgba(166, 124, 82, 0.1)'};
   border-color: #a67c52;
 }
`;

const FilterGroup = styled.div`
 display: flex;
 gap: 8px;
 align-items: center;
 font-family: 'Courier New', monospace;
 font-size: 12px;
 color: #59483b;
`;

// Advanced filters section
const AdvancedFiltersSection = styled.div`
 display: ${props => props.$expanded ? 'flex' : 'none'};
 padding: 10px 20px;
 background: rgba(255, 254, 245, 0.2);
 border-bottom: 1px solid rgba(210, 190, 150, 0.3);
 gap: 20px;
 align-items: center;
 overflow-x: auto;
 
 &::-webkit-scrollbar {
   height: 6px;
 }
 
 &::-webkit-scrollbar-track {
   background: rgba(210, 190, 150, 0.2);
   border-radius: 3px;
 }
 
 &::-webkit-scrollbar-thumb {
   background: rgba(166, 124, 82, 0.5);
   border-radius: 3px;
 }
`;

const FilterSection = styled.div`
 display: flex;
 align-items: center;
 gap: 8px;
 flex-shrink: 0;
`;

const FilterLabel = styled.span`
 font-family: 'Courier New', monospace;
 font-size: 11px;
 color: #8a7248;
 font-weight: bold;
 text-transform: uppercase;
 letter-spacing: 0.5px;
`;

const FilterBadge = styled.span`
 background: #e76f51;
 color: white;
 font-size: 10px;
 padding: 2px 6px;
 border-radius: 10px;
 margin-left: 4px;
 font-weight: bold;
`;

// Scroll wrapper for horizontal scrolling - adjusted height
const ScrollWrapper = styled.div`
 display: flex;
 gap: 20px;
 padding: 20px;
 height: calc(100% - 40px - 40px); /* Account for search bar and filters */
 overflow-x: auto;
 overflow-y: hidden;
 scroll-behavior: smooth;
 
 /* Custom scrollbar styling */
 &::-webkit-scrollbar {
   height: 8px;
 }
 
 &::-webkit-scrollbar-track {
   background: rgba(210, 190, 150, 0.2);
   border-radius: 4px;
 }
 
 &::-webkit-scrollbar-thumb {
   background: rgba(166, 124, 82, 0.5);
   border-radius: 4px;
   
   &:hover {
     background: rgba(166, 124, 82, 0.7);
   }
 }
`;

// Category section
const CategorySection = styled.div`
 display: ${props => props.$active ? 'contents' : 'none'};
`;

// Individual recipe card
const RecipeCard = styled.div`
 background: #fffef5;
 border: 1px solid rgba(210, 190, 150, 0.5);
 border-radius: 6px;
 padding: 12px 16px;
 cursor: grab;
 position: relative;
 transition: all 0.2s;
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 min-width: 180px;
 max-width: 180px;
 height: 80px;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 flex-shrink: 0;
 
 &:hover {
   transform: translateY(-3px);
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
   background: #fffff8;
 }
 
 &:active {
   cursor: grabbing;
 }
 
 &:before {
   content: '';
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-image: 
     repeating-linear-gradient(
       120deg, 
       rgba(255,250,240,0.05), 
       rgba(255,250,240,0.05) 1px, 
       transparent 1px, 
       transparent 2px
     );
   pointer-events: none;
   border-radius: 6px;
 }
`;

const RecipeTitle = styled.h4`
 font-family: 'Courier New', monospace;
 font-size: 14px;
 color: #59483b;
 margin: 0;
 font-weight: bold;
 text-align: center;
 line-height: 1.2;
`;

const RecipeTags = styled.div`
 display: flex;
 gap: 4px;
 margin-top: 4px;
 flex-wrap: wrap;
 justify-content: center;
`;

const RecipeTag = styled.span`
 font-family: 'Courier New', monospace;
 font-size: 9px;
 color: #a09080;
 background: rgba(210, 190, 150, 0.2);
 padding: 1px 4px;
 border-radius: 3px;
`;

const EmptyMessage = styled.div`
 font-family: 'Courier New', monospace;
 font-size: 14px;
 color: #8a7248;
 font-style: italic;
 padding: 20px;
 text-align: center;
`;

// Controls section for alphabetize toggle - now inline with search
const ControlsSection = styled.div`
 display: ${props => props.$expanded ? 'flex' : 'none'};
 align-items: center;
 gap: 10px;
`;

const AlphabetizeToggle = styled.label`
 display: flex;
 align-items: center;
 gap: 6px;
 font-family: 'Courier New', monospace;
 font-size: 12px;
 color: #59483b;
 cursor: pointer;
 background: rgba(255, 254, 245, 0.6);
 padding: 5px 10px;
 border-radius: 4px;
 border: 1px solid rgba(210, 190, 150, 0.5);
 transition: all 0.2s;
 
 &:hover {
   background: rgba(255, 254, 245, 0.8);
   border-color: #a67c52;
 }
 
 input {
   cursor: pointer;
 }
`;

const ClearFiltersButton = styled.button`
 font-family: 'Courier New', monospace;
 font-size: 11px;
 color: #e76f51;
 background: transparent;
 border: 1px solid #e76f51;
 padding: 4px 8px;
 border-radius: 4px;
 cursor: pointer;
 transition: all 0.2s;
 margin-left: auto;
 
 &:hover {
   background: #e76f51;
   color: white;
 }
`;

// Category colors
const categoryColors = {
 'All': '#9e9e9e',
 'Apps': '#a8b5c4',
 'Mains': '#8fa5b8',
 'Sides': '#9cb89c',
 'Desserts': '#c8a8b8',
 'Drinks': '#d4b896',
 'Bread': '#b8a898'
};

// Enhanced recipe data with metadata
const enhancedRecipeData = recipeData.map(recipe => {
 // Generate random values once
 const randomDietary = Math.random();
 const dietaryArray = [];
 
 if (randomDietary > 0.7) dietaryArray.push('vegetarian');
 if (randomDietary > 0.8) dietaryArray.push('vegan');
 if (randomDietary > 0.85) dietaryArray.push('gluten-free');
 
 return {
   ...recipe,
   // Add metadata for filtering
   dietary: recipe.dietary || dietaryArray,
   difficulty: recipe.difficulty || ['easy', 'medium', 'advanced'][Math.floor(Math.random() * 3)],
   season: recipe.season || [
     ['spring', 'summer'],
     ['summer', 'fall'],
     ['fall', 'winter'],
     ['winter', 'spring'],
     ['fall'],
     ['winter'],
     ['summer'],
     ['spring']
   ][Math.floor(Math.random() * 8)]
 };
});

const RecipePortfolio = ({ onDragStart }) => {
 const [expanded, setExpanded] = useState(false);
 const [activeCategory, setActiveCategory] = useState('All');
 const [alphabetize, setAlphabetize] = useState(false);
 const [searchQuery, setSearchQuery] = useState('');
 const [timeFilter, setTimeFilter] = useState('all'); // all, quick, medium, long
 const [dietaryFilters, setDietaryFilters] = useState([]);
 const [difficultyFilter, setDifficultyFilter] = useState('all');
 const [seasonFilter, setSeasonFilter] = useState('all');
 const scrollWrapperRef = useRef(null);
 
 // Handle mouse wheel for horizontal scrolling
 useEffect(() => {
   const scrollWrapper = scrollWrapperRef.current;
   if (!scrollWrapper) return;
   
   const handleWheel = (e) => {
     // Only handle if portfolio is expanded
     if (!expanded) return;
     
     // Check if this is a horizontal scroll (trackpad gesture)
     // If deltaX is significant, it's likely a trackpad horizontal swipe
     if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
       // Let the native horizontal scroll work
       return;
     }
     
     // This is a vertical scroll (mouse wheel), convert to horizontal
     e.preventDefault();
     
     // Convert vertical scroll to horizontal
     // Multiply by 2 for faster scrolling
     scrollWrapper.scrollLeft += e.deltaY * 2;
   };
   
   // Add passive: false to be able to preventDefault
   scrollWrapper.addEventListener('wheel', handleWheel, { passive: false });
   
   return () => {
     scrollWrapper.removeEventListener('wheel', handleWheel);
   };
 }, [expanded]);
 
 // Toggle dietary filter
 const toggleDietaryFilter = (filter) => {
   setDietaryFilters(prev => 
     prev.includes(filter) 
       ? prev.filter(f => f !== filter)
       : [...prev, filter]
   );
 };
 
 // Clear all filters
 const clearAllFilters = () => {
   setSearchQuery('');
   setTimeFilter('all');
   setDietaryFilters([]);
   setDifficultyFilter('all');
   setSeasonFilter('all');
   setAlphabetize(false);
 };
 
 // Check if any filters are active
 const hasActiveFilters = searchQuery || timeFilter !== 'all' || 
   dietaryFilters.length > 0 || difficultyFilter !== 'all' || 
   seasonFilter !== 'all' || alphabetize;
 
 // Count active filters
 const activeFilterCount = [
   searchQuery ? 1 : 0,
   timeFilter !== 'all' ? 1 : 0,
   dietaryFilters.length,
   difficultyFilter !== 'all' ? 1 : 0,
   seasonFilter !== 'all' ? 1 : 0,
   alphabetize ? 1 : 0
 ].reduce((a, b) => a + b, 0);
 
 // Group and sort recipes by category
 const recipesByCategory = enhancedRecipeData.reduce((acc, recipe) => {
   let category = recipe.category;
   // Map recipe categories to tab names
   if (category === 'Main') category = 'Mains';
   if (category === 'Dessert') category = 'Desserts';
   if (category === 'Appetizers') category = 'Apps';
   
   if (!acc[category]) {
     acc[category] = [];
   }
   acc[category].push(recipe);
   acc['All'] = [...(acc['All'] || []), recipe];
   return acc;
 }, {});
 
 // Filter recipes based on search and all filters
 const filterRecipes = (recipes) => {
   return recipes.filter(recipe => {
     // Search filter
     const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
     
     // Time filter
     let matchesTime = true;
     if (timeFilter !== 'all') {
       const time = recipe.time.toLowerCase();
       const minutes = parseInt(time);
       
       if (timeFilter === 'quick' && (minutes > 30 || time.includes('hr'))) {
         matchesTime = false;
       } else if (timeFilter === 'medium' && (minutes <= 30 || minutes > 60 || time.includes('hr'))) {
         matchesTime = false;
       } else if (timeFilter === 'long' && !time.includes('hr') && minutes <= 60) {
         matchesTime = false;
       }
     }
     
     // Dietary filters (must match ALL selected dietary filters)
     let matchesDietary = true;
     if (dietaryFilters.length > 0) {
       matchesDietary = dietaryFilters.every(filter => 
         recipe.dietary && recipe.dietary.includes(filter)
       );
     }
     
     // Difficulty filter
     let matchesDifficulty = true;
     if (difficultyFilter !== 'all') {
       matchesDifficulty = recipe.difficulty === difficultyFilter;
     }
     
     // Season filter
     let matchesSeason = true;
     if (seasonFilter !== 'all') {
       matchesSeason = recipe.season && recipe.season.includes(seasonFilter);
     }
     
     return matchesSearch && matchesTime && matchesDietary && matchesDifficulty && matchesSeason;
   });
 };
 
 // Apply filters to categorized recipes
 Object.keys(recipesByCategory).forEach(category => {
   recipesByCategory[category] = filterRecipes(recipesByCategory[category]);
 });
 
 // Sort recipes alphabetically if toggle is on
 if (alphabetize) {
   Object.keys(recipesByCategory).forEach(category => {
     recipesByCategory[category].sort((a, b) => 
       a.title.localeCompare(b.title)
     );
   });
 }
 
 const handleDragStart = (e, recipe) => {
   
   // Create a ghost image for dragging
   const ghostElement = document.createElement('div');
   ghostElement.style.width = '250px';
   ghostElement.style.height = '150px';
   ghostElement.style.background = '#f5f0dc';
   ghostElement.style.border = '1px solid #d2be96';
   ghostElement.style.borderRadius = '4px';
   ghostElement.style.padding = '12px';
   ghostElement.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
   ghostElement.style.transform = 'rotate(-2deg)';
   ghostElement.innerHTML = `
     <div style="font-family: 'Courier New', monospace; font-size: 14px; color: #59483b; font-weight: bold;">${recipe.title}</div>
     <div style="font-family: 'Courier New', monospace; font-size: 11px; color: #8a7248; margin-top: 4px;">${recipe.category} • ${recipe.time}</div>
   `;
   
   document.body.appendChild(ghostElement);
   e.dataTransfer.setDragImage(ghostElement, 125, 75);
   
   // Clean up ghost element
   setTimeout(() => {
     document.body.removeChild(ghostElement);
   }, 0);
   
   // Notify parent component
   if (onDragStart) {
     onDragStart(recipe);
   }
 };
 
 const categories = ['All', 'Apps', 'Sides', 'Mains', 'Desserts'];
 
 return (
   <PortfolioContainer $expanded={expanded}>
     <PortfolioHeader onClick={() => setExpanded(!expanded)}>
       <HandleContainer className="handle-container">
         <Handle className="handle" />
       </HandleContainer>
     </PortfolioHeader>
     
     <CategoryTabs>
       {categories.map(category => (
         <CategoryTab
           key={category}
           $active={activeCategory === category}
           $color={categoryColors[category]}
           onClick={() => setActiveCategory(category)}
         >
           {category}
           {activeFilterCount > 0 && activeCategory === category && (
             <FilterBadge>{activeFilterCount}</FilterBadge>
           )}
         </CategoryTab>
       ))}
     </CategoryTabs>
     
     <RecipeCardsContainer $expanded={expanded}>
       <SearchFilterBar>
         <SearchInput
           type="text"
           placeholder="Search recipes..."
           value={searchQuery}
           onChange={(e) => setSearchQuery(e.target.value)}
         />
         
         <FilterGroup>
           <span>Time:</span>
           <FilterChip
             $active={timeFilter === 'all'}
             onClick={() => setTimeFilter('all')}
           >
             All
           </FilterChip>
           <FilterChip
             $active={timeFilter === 'quick'}
             onClick={() => setTimeFilter('quick')}
           >
             &lt;30min
           </FilterChip>
           <FilterChip
             $active={timeFilter === 'medium'}
             onClick={() => setTimeFilter('medium')}
           >
             30-60min
           </FilterChip>
           <FilterChip
             $active={timeFilter === 'long'}
             onClick={() => setTimeFilter('long')}
           >
             1hr+
           </FilterChip>
         </FilterGroup>
         
         <ControlsSection $expanded={true}>
           <AlphabetizeToggle>
             <input
               type="checkbox"
               checked={alphabetize}
               onChange={(e) => setAlphabetize(e.target.checked)}
             />
             A-Z
           </AlphabetizeToggle>
         </ControlsSection>
       </SearchFilterBar>
       
       <AdvancedFiltersSection $expanded={true}>
         <FilterSection>
           <FilterLabel>Dietary:</FilterLabel>
           <FilterChip
             $active={dietaryFilters.includes('vegetarian')}
             onClick={() => toggleDietaryFilter('vegetarian')}
           >
             Vegetarian
           </FilterChip>
           <FilterChip
             $active={dietaryFilters.includes('vegan')}
             onClick={() => toggleDietaryFilter('vegan')}
           >
             Vegan
           </FilterChip>
           <FilterChip
             $active={dietaryFilters.includes('gluten-free')}
             onClick={() => toggleDietaryFilter('gluten-free')}
           >
             Gluten-Free
           </FilterChip>
           <FilterChip
             $active={dietaryFilters.includes('dairy-free')}
             onClick={() => toggleDietaryFilter('dairy-free')}
           >
             Dairy-Free
           </FilterChip>
         </FilterSection>
         
         <FilterSection>
           <FilterLabel>Difficulty:</FilterLabel>
           <FilterChip
             $active={difficultyFilter === 'all'}
             onClick={() => setDifficultyFilter('all')}
           >
             All
           </FilterChip>
           <FilterChip
             $active={difficultyFilter === 'easy'}
             onClick={() => setDifficultyFilter('easy')}
           >
             Easy
           </FilterChip>
           <FilterChip
             $active={difficultyFilter === 'medium'}
             onClick={() => setDifficultyFilter('medium')}
           >
             Medium
           </FilterChip>
           <FilterChip
             $active={difficultyFilter === 'advanced'}
             onClick={() => setDifficultyFilter('advanced')}
           >
             Advanced
           </FilterChip>
         </FilterSection>
         
         <FilterSection>
           <FilterLabel>Season:</FilterLabel>
           <FilterChip
             $active={seasonFilter === 'all'}
             onClick={() => setSeasonFilter('all')}
           >
             All
           </FilterChip>
           <FilterChip
             $active={seasonFilter === 'spring'}
             onClick={() => setSeasonFilter('spring')}
           >
             Spring
           </FilterChip>
           <FilterChip
             $active={seasonFilter === 'summer'}
             onClick={() => setSeasonFilter('summer')}
           >
             Summer
           </FilterChip>
           <FilterChip
             $active={seasonFilter === 'fall'}
             onClick={() => setSeasonFilter('fall')}
           >
             Fall
           </FilterChip>
           <FilterChip
             $active={seasonFilter === 'winter'}
             onClick={() => setSeasonFilter('winter')}
           >
             Winter
           </FilterChip>
         </FilterSection>
         
         {hasActiveFilters && (
           <ClearFiltersButton onClick={clearAllFilters}>
             Clear All ({activeFilterCount})
           </ClearFiltersButton>
         )}
       </AdvancedFiltersSection>
       
       <ScrollWrapper ref={scrollWrapperRef}>
         {categories.map(category => {
           const recipes = recipesByCategory[category] || [];
           return (
             <CategorySection
               key={category}
               $active={activeCategory === category}
             >
               {recipes.length > 0 ? (
                recipes.map((recipe) => (
                   <RecipeCard
                     key={recipe.id}
                     draggable
                     onDragStart={(e) => handleDragStart(e, recipe)}
                   >
                     <RecipeTitle>{recipe.title}</RecipeTitle>
                     <RecipeTags>
                       {recipe.difficulty && (
                         <RecipeTag>{recipe.difficulty}</RecipeTag>
                       )}
                       {recipe.dietary && recipe.dietary.map(diet => (
                         <RecipeTag key={diet}>{diet}</RecipeTag>
                       ))}
                     </RecipeTags>
                   </RecipeCard>
                 ))
               ) : (
                 activeCategory === category && (
                   <EmptyMessage>
                     {hasActiveFilters 
                       ? 'No recipes match your filters' 
                       : 'No recipes in this category'}
                   </EmptyMessage>
                 )
               )}
             </CategorySection>
           );
         })}
       </ScrollWrapper>
     </RecipeCardsContainer>
   </PortfolioContainer>
 );
};

export default RecipePortfolio;