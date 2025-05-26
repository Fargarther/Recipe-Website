// Footer.js
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
      © {new Date().getFullYear()} Chef Alex • Crafted with love & linen
    </FooterContainer>
  );
}

export default Footer;