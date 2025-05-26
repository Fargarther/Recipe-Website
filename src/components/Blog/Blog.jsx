// Blog.jsx
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

// Sample blog post data (in a real app, this would come from an API)
const blogPosts = [
  {
    id: 1,
    title: "Seasonal Foraging: Finding Inspiration in the Wild",
    date: "October 15, 2024",
    excerpt: "Exploring the hedgerows and woodlands for wild ingredients has been a cornerstone of my culinary approach...",
    image: "/api/placeholder/400/250",
    alt: "Seasonal Foraging"
  },
  {
    id: 2,
    title: "Essential Equipment for the Discerning Home Chef",
    date: "September 28, 2024",
    excerpt: "Quality equipment doesn't have to break the bank. Here's my guide to the essential tools that will elevate your cooking...",
    image: "/api/placeholder/400/250",
    alt: "Kitchen Equipment"
  }
];

function Blog() {
  return (
    <BlogSection id="blog" data-observe>
      <h2>Field Notes Blog</h2>
      
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