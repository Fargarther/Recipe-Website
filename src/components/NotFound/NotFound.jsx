import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  text-align: center;
  padding: 5rem 2.5rem;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Message = styled.p`
  margin-bottom: 2rem;
`;

const HomeLink = styled.a`
  display: inline-block;
  background: var(--accent);
  color: var(--white);
  padding: 0.9rem 1.8rem;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: background var(--transition), transform 0.2s;
  font-weight: 600;

  &:hover {
    background: var(--accent-dark);
    transform: translateY(-2px);
  }
`;

function NotFound() {
  return (
    <Section data-observe>
      <Title>Page Not Found</Title>
      <Message>We can't seem to find the page you're looking for.</Message>
      <HomeLink href="/">Return Home</HomeLink>
    </Section>
  );
}

export default NotFound;
