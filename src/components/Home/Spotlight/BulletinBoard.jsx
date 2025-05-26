// src/components/Home/Spotlight/BulletinBoard.jsx
import React, { forwardRef } from 'react';
import { BulletinBoardContainer, BoardFrame } from './styles/BulletinBoard.styles';

const BulletinBoard = forwardRef(({ children }, ref) => {
  return (
    <BulletinBoardContainer ref={ref}>
      <BoardFrame />
      {children}
    </BulletinBoardContainer>
  );
});

BulletinBoard.displayName = 'BulletinBoard';

export default BulletinBoard;