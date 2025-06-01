// src/components/Blog/Blog.jsx
import React from 'react';
import styled from 'styled-components';
import BlogPost from './BlogPost';
import Comments from './Comments';

const BlogSection = styled.section`
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

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
`;

// Sample blog post data for Sal
const blogPosts = [
  {
    id: 1,
    title: "The Art of 48-Hour Fermentation",
    date: "November 15, 2024",
    excerpt: "Discover why we ferment our focaccia dough for 48 hours and how this time-honored technique creates the perfect texture and flavor...",
    image: "/api/placeholder/400/250",
    alt: "Sourdough Fermentation"
  },
  {
    id: 2,
    title: "Seasonal Ingredients: From Farm to Focaccia",
    date: "October 28, 2024",
    excerpt: "Learn how we incorporate local, seasonal ingredients from Central Illinois farmers into our artisan focaccias...",
    image: "/api/placeholder/400/250",
    alt: "Local Ingredients"
  }
];

function Blog() {
  return (
    <BlogSection id="blog" data-observe>
      <h2>From Our Kitchen</h2>
      
      <BlogGrid className="blog-posts">
        {blogPosts.map(post => (
          <BlogPost key={post.id} post={post} />
        ))}
      </BlogGrid>
      
      <Comments />
    </BlogSection>
  );
}

export default Blog;