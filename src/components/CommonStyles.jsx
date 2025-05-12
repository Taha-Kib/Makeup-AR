import styled from "styled-components";

export const Button = styled.button`
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  border: none;
  color: #333;
  border-radius: 30px;
  padding: 12px 48px;
  font-size: 28px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 6px 6px 12px #cfcfcf, -6px -6px 12px #ffffff;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  font-family: "Pierson", sans-serif;

  span {
    display: inline-block;
    transition: transform 0.3s ease;
  }

  &:hover {
    box-shadow: 8px 8px 16px #bcbcbc, -8px -8px 16px #ffffff;

    span {
      transform: scale(1.1);
    }
  }

  &:active {
    box-shadow: inset 2px 2px 5px #c1c1c1, inset -2px -2px 5px #ffffff;
  }

  &:focus {
    outline: none; /* Disable the focus outline */
    box-shadow: none; /* Prevent default focus box-shadow */
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    box-shadow: none;
    background: #f0f0f0;
    color: #999;
  }
`;

export const ImageOffsets = [
  { key: "bun-messy", offsetWidth: 1.8, yPos: 0.7, xPos: 2.2 },
  {
    key: "bun-space",
    offsetWidth: 1.9,
    yPos: 0.78,
    xPos: 2.1,
    offsetHeight: 0.8,
  },
  { key: "bun-braided", offsetWidth: 1.6, yPos: 0.78, xPos: 2.1 },

  { key: "pony-messy-short", offsetWidth: 3.8, yPos: 0.5, xPos: 2.3 },
  { key: "pony-messy-medium", offsetWidth: 3.8, yPos: 0.46, xPos: 2.3 },
  { key: "pony-messy-long", offsetWidth: 3.8, yPos: 0.32, xPos: 2.1 },

  { key: "pony-slick-short", offsetWidth: 2.3, yPos: 0.44, xPos: 1.6 },
  { key: "pony-slick-medium", offsetWidth: 2.4, yPos: 0.37, xPos: 1.8 },
  { key: "pony-slick-long", offsetWidth: 2.4, yPos: 0.3, xPos: 1.7 },

  { key: "pony-bangs-short", offsetWidth: 2.6, yPos: 0.5, xPos: 1.9 },
  { key: "pony-bangs-medium", offsetWidth: 2.4, yPos: 0.45, xPos: 1.95 },
  { key: "pony-bangs-long", offsetWidth: 2.45, yPos: 0.38, xPos: 1.76 },

  { key: "loose-curly-short", offsetWidth: 3.8, yPos: 0.45, xPos: 2.05 },
  { key: "loose-curly-medium", offsetWidth: 3.8, yPos: 0.46, xPos: 2.05 },
  { key: "loose-curly-long", offsetWidth: 3.9, yPos: 0.39, xPos: 2.18 },

  {
    key: "loose-wavy-short",
    offsetWidth: 3.5,
    yPos: 0.37,
    xPos: 2.1,
    offsetHeight: 1,
  },
  {
    key: "loose-wavy-medium",
    offsetWidth: 3.5,
    yPos: 0.4,
    xPos: 2.15,
    offsetHeight: 1,
  },
  {
    key: "loose-wavy-long",
    offsetWidth: 3.5,
    yPos: 0.33,
    xPos: 2,
    offsetHeight: 1,
  },

  {
    key: "loose-straight-short",
    offsetWidth: 5,
    yPos: 0.34,
    xPos: 2.23,
    offsetHeight: 1,
  },
  {
    key: "loose-straight-medium",
    offsetWidth: 5,
    yPos: 0.24,
    xPos: 2.15,
    offsetHeight: 1,
  },
  {
    key: "loose-straight-long",
    offsetWidth: 5,
    yPos: 0.26,
    xPos: 2.18,
    offsetHeight: 1,
  },
];

export const LashesOffsets = [
  {
    key: "lash-glam-left",
    offsetX: 3,
    offsetY: 0,
  },
  {
    key: "lash-glam-right",
    offsetX: 11,
    offsetY: -2,
  },
  {
    key: "lash-natural-left",
    offsetX: 3,
    offsetY: 0,
  },
  {
    key: "lash-natural-right",
    offsetX: 11,
    offsetY: -1,
  },
  {
    key: "lash-wispy-left",
    offsetX: 3,
    offsetY: 0,
  },
  {
    key: "lash-wispy-right",
    offsetX: 11,
    offsetY: -2,
  },
];

export const BrowsOffsets = [
  { key: "brow-straight-left", offsetX: 10, offsetY: 0 },
  { key: "brow-straight-right", offsetX: -11, offsetY: 0 },

  { key: "brow-soft-arch-left", offsetX: 10, offsetY: 0 },
  { key: "brow-soft-arch-right", offsetX: -11, offsetY: 0 },

  { key: "brow-medium-arch-left", offsetX: 10, offsetY: 0 },
  { key: "brow-medium-arch-right", offsetX: -12, offsetY: 0 },

  { key: "brow-high-arch-left", offsetX: 10, offsetY: 0 },
  { key: "brow-high-arch-right", offsetX: -11, offsetY: -1 },
];
