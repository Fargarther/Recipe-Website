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
  const minPosition = BOARD_DIMENSIONS.minPosition;
  const maxX = boardWidth - minPosition - cardWidth;
  const maxY = boardHeight - minPosition - cardHeight;
  
  return {
    x: minPosition + Math.random() * (maxX - minPosition),
    y: minPosition + Math.random() * (maxY - minPosition)
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