// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import homepageFocaccia from './assets/Homepage_Focaccia.jpg';

// Layout Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ProgressBar from './components/Layout/ProgressBar';

// Page Components
import Home from './components/Home/Home';
import RecipeLibrary from './components/Recipe/RecipeLibrary';
import Blog from './components/Blog/Blog';
import About from './components/About/About';
import Subscribe from './components/Home/Subscribe';
import BoardPage from './components/Board/BoardPage';
import styled from 'styled-components';
import NotFound from './components/NotFound/NotFound';

const SkipLink = styled.a.attrs({ className: 'skip-link' })``;
const Main = styled.main``;

// Global styles
const GlobalStyle = createGlobalStyle`
  :root {
    --linen: #faf8f3;
    --charcoal: #333333;
    --accent: #8B4513;
    --accent-dark: #6B3410;
    --text-dark: #222222;
    --text-medium: #555555;
    --text-light: #777777;
    --white: #ffffff;
    --shadow-soft: 0 4px 16px rgba(0,0,0,0.05);
    --shadow-medium: 0 8px 24px rgba(0,0,0,0.1);
    --radius-standard: 1rem;
    --transition: 0.3s ease;
  }

  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--accent);
    color: var(--white);
    padding: 0.75rem 1rem;
    z-index: 1000;
    transition: top var(--transition);
  }

  .skip-link:focus {
    top: 0;
  }

  *, *::before, *::after { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0; 
  }
  
  body {
    font-family: 'Source Sans 3', sans-serif;
    color: var(--text-dark);
    background: var(--linen)
      url(${homepageFocaccia})
      center/cover fixed;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
  }
  
  h1, h2, h3 { 
    font-family: 'Playfair Display', serif; 
    letter-spacing: 0.02em; 
    color: var(--text-dark);
    line-height: 1.4;
  }

  h1 { 
    font-size: 2rem; 
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }
  
  p {
    margin-bottom: 1rem;
  }

  section { 
    padding: 5rem 2.5rem; 
    max-width: 1200px; 
    margin: auto; 
  }

  section h2 {
    background-color: rgba(255, 255, 255, 0.85);
    display: inline-block;
    padding: 0.7rem 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }

  @media (max-width: 768px) {
    body {
      font-size: 15px;
    }
    
    h1 {
      font-size: 1.8rem;
    }
    
    h2 {
      font-size: 1.9rem;
    }
    
    section {
      padding: 3.5rem 1.5rem;
    }
  }

  @media (max-width: 480px) {
    nav {
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.8rem;
    }
    
    nav a {
      font-size: 0.85rem;
    }
  }
`;

function App() {
  // Initialize scroll observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('[data-observe]').forEach((el) => observer.observe(el));

    return () => {
      document.querySelectorAll('[data-observe]').forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <Router>
      <GlobalStyle />
      <SkipLink href="#main">Skip to content</SkipLink>
      <ProgressBar />
      <Header />
      <Main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<RecipeLibrary />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Main>
      <Footer />
    </Router>
  );
}

export default App;