// src/components/Home/Subscribe.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Confetti from 'react-confetti';

const SubscribeSection = styled.section`
  text-align: center;
  background: var(--white);
  padding: 5rem 2.5rem;
  border-radius: var(--radius-standard);
  box-shadow: var(--shadow-soft);
  
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

const SubscribeTitle = styled.h2`
  margin-bottom: 1.2rem;
`;

const SubscribeParagraph = styled.p`
  max-width: 700px;
  margin: 0 auto 2.5rem;
  color: var(--text-medium);
  font-size: 1.1rem;
  line-height: 1.8;
`;

const OrderInfo = styled.div`
  background: var(--linen);
  padding: 2rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const ContactMethod = styled.p`
  font-size: 1.1rem;
  margin: 0.5rem 0;
  
  a {
    color: var(--accent);
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SubscribeForm = styled.form`
  display: flex;
  max-width: 550px;
  margin: 2rem auto 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const EmailInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1.5px solid ${props => props.$error ? '#e76f51' : 'var(--text-light)'};
  border-right: none;
  border-radius: 0.5rem 0 0 0.5rem;
  font-size: 1rem;
  color: var(--text-dark);
  
  &:focus {
    outline: none;
    border-color: ${props => props.$error ? '#e76f51' : 'var(--accent)'};
    box-shadow: 0 0 0 2px ${props => props.$error ? 'rgba(231, 111, 81, 0.2)' : 'rgba(139, 69, 19, 0.2)'};
  }
  
  @media (max-width: 768px) {
    border-right: 1.5px solid ${props => props.$error ? '#e76f51' : 'var(--text-light)'};
    border-radius: 0.5rem;
    margin-bottom: 0.8rem;
  }
`;

const ValidationMessage = styled.span`
  position: absolute;
  bottom: -25px;
  left: 0;
  color: #e76f51;
  font-size: 0.875rem;
  opacity: ${props => props.$show ? 1 : 0};
  transition: opacity 0.3s;
`;

const SubmitButton = styled.button`
  background: var(--accent);
  color: var(--white);
  padding: 1rem 2rem;
  border: none;
  border-radius: 0 0.5rem 0.5rem 0;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    background: var(--accent-dark);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 69, 19, 0.3);
    
    &:before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    border-radius: 0.5rem;
    transform: none;
    
    &:hover {
      transform: none;
    }
  }
`;

const SuccessMessage = styled.p`
  color: #2a9d8f;
  margin-top: 1.5rem;
  display: ${props => props.$visible ? 'block' : 'none'};
  font-weight: 600;
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

const Toast = styled.div`
  background: ${props => props.$type === 'success' ? '#2a9d8f' : '#e76f51'};
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transform: translateX(${props => props.$show ? '0' : '100%'});
  transition: transform 0.3s ease;
  
  .toast-content {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

function Subscribe() {
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [toastId, setToastId] = useState(0);
  const [emailError, setEmailError] = useState('');

  const showToast = (message, type = 'success') => {
    const id = toastId + 1;
    setToastId(id);
    
    const newToast = { id, message, type, show: true };
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset error
    setEmailError('');
    
    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    // In a real app, you would send this to your backend
    
    setEmail('');
    setShowSuccess(true);
    setShowConfetti(true);
    showToast('Successfully subscribed! Check your email.', 'success');
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
    
    // Hide confetti after 2 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 2000);
  };

  return (
    <>
      <SubscribeSection id="subscribe" data-observe>
        <SubscribeTitle>Order Your Daily Bread</SubscribeTitle>
        <SubscribeParagraph>
          All focaccias are made to order with 48-hour advance notice. 
          Contact us to place your order or join our newsletter for seasonal specials.
        </SubscribeParagraph>
        
        <OrderInfo>
          <h3>How to Order</h3>
          <ContactMethod>
            📧 Email: <a href="mailto:hello@salartisan.com">hello@salartisan.com</a>
          </ContactMethod>
          <ContactMethod>
            📱 Text: <a href="sms:+13095551234">(309) 555-1234</a>
          </ContactMethod>
          <ContactMethod>
            📍 Find us at Metamora Farmers Market (Saturdays)
          </ContactMethod>
        </OrderInfo>
        
        <SubscribeForm id="subscribeForm" onSubmit={handleSubmit}>
          <InputWrapper>
            <EmailInput
              type="email"
              placeholder="Join our newsletter"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
              $error={!!emailError}
            />
            <ValidationMessage $show={!!emailError}>
              {emailError}
            </ValidationMessage>
          </InputWrapper>
          <SubmitButton type="submit">Subscribe</SubmitButton>
        </SubscribeForm>
        
        <SuccessMessage $visible={showSuccess}>
          Thank you for subscribing! We'll be in touch soon.
        </SuccessMessage>
        
        {showConfetti && <Confetti numberOfPieces={100} />}
      </SubscribeSection>
      
      <ToastContainer>
        {toasts.map(toast => (
          <Toast key={toast.id} $type={toast.type} $show={toast.show}>
            <div className="toast-content">
              <span>{toast.type === 'success' ? '✓' : '✕'}</span>
              <span>{toast.message}</span>
            </div>
          </Toast>
        ))}
      </ToastContainer>
    </>
  );
}

export default Subscribe;