// src/components/Layout/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: sticky; 
  top: 0; 
  width: 100%; 
  background: var(--linen); 
  z-index: 10;
  display: flex; 
  justify-content: space-between; 
  align-items: center;
  padding: 1.2rem 2.5rem; 
  transition: padding var(--transition);
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);

  &.scrolled { 
    padding: 0.7rem 2.5rem; 
    box-shadow: 0 3px 10px rgba(0,0,0,0.1); 
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1.2rem;
    
    &.scrolled {
      padding: 0.8rem 1.2rem;
    }
  }
`;

const Title = styled.h1`
  margin: 0;
  font-family: 'Brush Script MT', cursive;
  font-size: 2.5rem;
  color: var(--accent);
`;

const Nav = styled.nav`
  @media (max-width: 768px) {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const NavLink = styled(Link)`
  margin-left: 2rem; 
  text-decoration: none; 
  color: var(--text-dark); 
  font-weight: 600; 
  transition: color var(--transition);
  font-size: 1.05rem;
  
  &:hover { 
    color: var(--accent); 
  }
  
  @media (max-width: 768px) {
    margin-left: 0;
    font-size: 0.9rem;
  }
`;

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > window.innerHeight / 2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderContainer className={scrolled ? 'scrolled' : ''}>
      <Title>Sal</Title>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/#spotlight">Collection</NavLink>
        <NavLink to="/recipes">Menu</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/about">Our Story</NavLink>
        <NavLink to="/subscribe">Order</NavLink>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;