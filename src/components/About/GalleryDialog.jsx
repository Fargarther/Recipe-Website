// GalleryDialog.jsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Dialog = styled.dialog`
  max-width: 80vw;
  padding: 0;
  border-radius: var(--radius-standard);
  border: none;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  
  &::backdrop {
    background: rgba(0,0,0,0.7);
  }
`;

const GalleryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: var(--linen);
`;

const GalleryTitle = styled.h3`
  margin-bottom: 0;
`;

const CloseButton = styled.button`
  background: var(--accent);
  color: var(--white);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color var(--transition);
  
  &:hover {
    background: var(--accent-dark);
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.2rem;
  padding: 1.5rem;
  background: var(--white);
`;

const GalleryItem = styled.div`
  border-radius: 0.7rem;
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  transition: transform var(--transition);
  
  &:hover {
    transform: scale(1.03);
  }
`;

const GalleryImage = styled.img.attrs({ loading: 'lazy' })`
  width: 100%;
  height: auto;
  display: block;
`;

// Sample gallery images (in a real app, this would likely come from a CMS)
const galleryImages = [
  {
    id: 1,
    src: '/api/placeholder/300/300',
    alt: 'Kitchen'
  },
  {
    id: 2,
    src: '/api/placeholder/300/300',
    alt: 'Herb Garden'
  },
  {
    id: 3,
    src: '/api/placeholder/300/300',
    alt: 'Work Space'
  },
  {
    id: 4,
    src: '/api/placeholder/300/300',
    alt: 'Cooking'
  }
];

function GalleryDialog({ isOpen, onClose }) {
  const dialogRef = useRef(null);
  
  useEffect(() => {
    const dialog = dialogRef.current;
    
    if (isOpen && dialog) {
      dialog.showModal();
    } else if (dialog) {
      dialog.close();
    }
  }, [isOpen]);
  
  return (
    <Dialog ref={dialogRef} id="galleryDialog" onClose={onClose}>
      <GalleryHeader className="gallery-header">
        <GalleryTitle>My Kitchen & Garden</GalleryTitle>
        <CloseButton id="closeGallery" className="close-btn" onClick={onClose}>
          ×
        </CloseButton>
      </GalleryHeader>
      
      <GalleryGrid className="gallery-grid">
        {galleryImages.map(image => (
          <GalleryItem key={image.id} className="gallery-item">
            <GalleryImage src={image.src} alt={image.alt} />
          </GalleryItem>
        ))}
      </GalleryGrid>
    </Dialog>
  );
}

export default GalleryDialog;