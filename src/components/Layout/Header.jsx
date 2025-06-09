// src/components/Layout/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../common/Logo';

const HeaderContainer = styled.header`
  position: fixed; 
  top: 0; 
  width: 100%; 
  background: ${props => props.$isHome && !props.$scrolled ? 'transparent' : 'var(--linen)'}; 
  z-index: 1000;
  display: flex; 
  justify-content: space-between; 
  align-items: center;
  padding: ${props => props.$scrolled ? '0.7rem 2.5rem' : '1.2rem 2.5rem'}; 
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.$isHome && !props.$scrolled ? 'none' : '0 2px 8px rgba(0,0,0,0.05)'};

  &.scrolled { 
    padding: 0.7rem 2.5rem; 
    box-shadow: 0 3px 10px rgba(0,0,0,0.1); 
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: ${props => props.$scrolled ? '0.8rem 1.2rem' : '1.2rem'};
    
    &.scrolled {
      padding: 0.8rem 1.2rem;
    }
  }
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: transform var(--transition);
  
  &:hover {
    transform: scale(1.05);
  }
`;

const LogoSVG = styled(Logo)`
  height: ${props => props.$scrolled ? '50px' : '60px'};
  width: auto;
  transition: height var(--transition);
  
  path {
    fill: ${props => props.$isHome && !props.$scrolled ? 'var(--white)' : '#000000'};
    transition: fill 0.5s ease;
  }
  
  @media (max-width: 768px) {
    height: ${props => props.$scrolled ? '45px' : '55px'};
  }
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
  color: ${props => props.$isHome && !props.$scrolled ? 'var(--white)' : 'var(--text-dark)'}; 
  font-weight: 600; 
  transition: all var(--transition);
  font-size: 1.05rem;
  text-shadow: ${props => props.$isHome && !props.$scrolled ? '0 2px 4px rgba(0,0,0,0.2)' : 'none'};
  
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
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderContainer className={scrolled ? 'scrolled' : ''} $scrolled={scrolled} $isHome={isHomePage}>
      <LogoContainer to="/">
        <LogoSVG $scrolled={scrolled} $isHome={isHomePage} />
      </LogoContainer>
      <Nav>
        <NavLink to="/" $isHome={isHomePage} $scrolled={scrolled}>Home</NavLink>
        <NavLink to="/#spotlight" $isHome={isHomePage} $scrolled={scrolled}>Collection</NavLink>
        <NavLink to="/recipes" $isHome={isHomePage} $scrolled={scrolled}>Menu</NavLink>
        <NavLink to="/blog" $isHome={isHomePage} $scrolled={scrolled}>Blog</NavLink>
        <NavLink to="/about" $isHome={isHomePage} $scrolled={scrolled}>Our Story</NavLink>
        <NavLink to="/subscribe" $isHome={isHomePage} $scrolled={scrolled}>Order</NavLink>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;