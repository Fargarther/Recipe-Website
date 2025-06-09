// BlogPost.js
import React from 'react';
import styled from 'styled-components';

const Post = styled.article`
  background: var(--white);
  border-radius: var(--radius-standard);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  transition: transform var(--transition), box-shadow var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-medium);
  }
`;

const PostImage = styled.img.attrs({ loading: 'lazy' })`
  width: 100%;
  height: auto;
  display: block;
`;

const PostContent = styled.div`
  padding: 2rem;
`;

const PostTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const PostDate = styled.p`
  color: var(--accent);
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 1.2rem;
`;

const PostExcerpt = styled.p`
  color: var(--text-medium);
  margin-bottom: 1.2rem;
`;

const ReadMoreButton = styled.a`
  display: inline-block;
  background: var(--accent);
  color: var(--white);
  padding: 0.9rem 1.8rem;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: background var(--transition), transform 0.2s;
  font-weight: 600;
  font-size: 1.05rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  
  &:hover {
    background: var(--accent-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  }
`;

function BlogPost({ post }) {
  return (
    <Post className="blog-post">
      <PostImage src={post.image} alt={post.alt} />
      <PostContent className="content">
        <PostTitle>{post.title}</PostTitle>
        <PostDate>{post.date}</PostDate>
        <PostExcerpt>{post.excerpt}</PostExcerpt>
        <ReadMoreButton href="#" className="btn">Read More</ReadMoreButton>
      </PostContent>
    </Post>
  );
}

export default BlogPost;
