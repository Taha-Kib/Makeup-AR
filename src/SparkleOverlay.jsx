// src/components/SparkleOverlay.jsx
import React from "react";
import styled, { keyframes } from "styled-components";

const sparkleAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
    filter: blur(1px);
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
    filter: blur(2px);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
    filter: blur(1px);
  }
`;

const SparkleOverlayWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
`;

const Sparkle = styled.div`
  position: absolute;
  width: 8px; /* Increased size */
  height: 8px;
  background: radial-gradient(circle, rgba(239, 108, 172, 0.8), transparent);
  opacity: 0.8;
  border-radius: 50%;
  animation: ${sparkleAnimation} 2.5s infinite ease-in-out;
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
  animation-delay: ${({ delay }) => delay}s;
`;

const SparkleOverlay = () => {
  const sparkleCount = 50;

  const sparkles = Array.from({ length: sparkleCount }).map((_, index) => ({
    id: index,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  return (
    <SparkleOverlayWrapper>
      {sparkles.map(({ id, top, left, delay }) => (
        <Sparkle key={id} top={top} left={left} delay={delay} />
      ))}
    </SparkleOverlayWrapper>
  );
};

export default SparkleOverlay;
