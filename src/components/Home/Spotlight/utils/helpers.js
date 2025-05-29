// src/components/Home/Spotlight/utils/helpers.js
import { PIN_COLORS, BOARD_DIMENSIONS, CARD_DIMENSIONS, FLIP_SOUND_DATA } from './constants';

export const getRandomRotation = () => {
  return (Math.random() * 10) - 5; // -5 to 5 degrees
};

export const getPinColor = () => {
  return PIN_COLORS[Math.floor(Math.random() * PIN_COLORS.length)];
};

export const getRotatedBoundingBox = (width, height, rotation) => {
  const rad = (rotation * Math.PI) / 180;
  const cos = Math.abs(Math.cos(rad));
  const sin = Math.abs(Math.sin(rad));
  
  const newWidth = width * cos + height * sin;
  const newHeight = width * sin + height * cos;
  
  return { width: newWidth, height: newHeight };
};

export const getRandomPosition = (boardWidth, boardHeight, cardWidth = CARD_DIMENSIONS.width, cardHeight = CARD_DIMENSIONS.height) => {
  // Board boundaries
  const frameWidth = 12; // Border frame width
  const boardPadding = 32; // 2rem = 32px padding from BulletinBoardContainer
  const buttonExtension = 13; // Buttons extend 13px to the left
  const minPosition = frameWidth + boardPadding;
  
  // Calculate safe area for card placement
  // Account for button extension on the left
  const minX = minPosition - buttonExtension;
  const maxX = boardWidth - minPosition - cardWidth + buttonExtension;
  const minY = minPosition;
  const maxY = boardHeight - minPosition - cardHeight;
  
  // Ensure we have positive ranges
  const safeMaxX = Math.max(minX + 10, maxX);
  const safeMaxY = Math.max(minY + 10, maxY);
  
  return {
    x: minX + Math.random() * (safeMaxX - minX),
    y: minY + Math.random() * (safeMaxY - minY)
  };
};

export const playFlipSound = () => {
  try {
    const flipSound = new Audio(FLIP_SOUND_DATA);
    flipSound.volume = 0.2;
    flipSound.play();
  } catch (e) {
    console.log("Audio not supported");
  }
};