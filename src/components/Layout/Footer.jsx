// src/components/Layout/Footer.jsx
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  text-align: center;
  padding: 3rem;
  background: var(--linen);
  margin-top: 5rem;
  color: var(--text-medium);
  font-size: 1.05rem;
`;

function Footer() {
  return (
    <FooterContainer>
      © {new Date().getFullYear()} Sal Artisan Sourdough Focaccia • Handcrafted with love in Metamora, IL
      <br />
      <em style={{ fontSize: '0.9rem', opacity: 0.8 }}>"Man shall not live by bread alone" - Matthew 4:4</em>
    </FooterContainer>
  );
}

export default Footer;