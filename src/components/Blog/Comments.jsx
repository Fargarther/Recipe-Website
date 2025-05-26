// Comments.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CommentsSection = styled.div`
  background: var(--white);
  padding: 2rem;
  border-radius: var(--radius-standard);
  box-shadow: var(--shadow-soft);
  margin-top: 3rem;
`;

const CommentsTitle = styled.h3`
  margin-bottom: 1.5rem;
`;

const CommentList = styled.div``;

const Comment = styled.p`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  
  &:last-child {
    border-bottom: none;
  }
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid var(--text-light);
  border-radius: 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  color: var(--text-dark);
  
  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 2px rgba(166, 124, 82, 0.2);
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid var(--text-light);
  border-radius: 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  color: var(--text-dark);
  
  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 2px rgba(166, 124, 82, 0.2);
  }
`;

const SubmitButton = styled.button`
  align-self: flex-start;
  background: var(--accent);
  color: var(--white);
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color var(--transition);
  
  &:hover {
    background-color: var(--accent-dark);
  }
`;

function Comments() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  
  // Load comments from localStorage on mount
  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    setComments(savedComments);
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nameValue = name.trim() || 'Anonymous';
    const textValue = text.trim();
    
    if (!textValue) return;
    
    const newComments = [...comments, { name: nameValue, text: textValue }];
    
    setComments(newComments);
    localStorage.setItem('comments', JSON.stringify(newComments));
    
    setName('');
    setText('');
  };
  
  return (
    <CommentsSection id="commentsSection">
      <CommentsTitle>Comments</CommentsTitle>
      
      <CommentList id="commentList">
        {comments.map((comment, index) => (
          <Comment key={index}>
            <strong>{comment.name}:</strong> {comment.text}
          </Comment>
        ))}
      </CommentList>
      
      <CommentForm id="commentForm" onSubmit={handleSubmit}>
        <Input
          type="text"
          id="commentName"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Textarea
          id="commentText"
          rows="3"
          placeholder="Your comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <SubmitButton type="submit">Post Comment</SubmitButton>
      </CommentForm>
    </CommentsSection>
  );
}

export default Comments;