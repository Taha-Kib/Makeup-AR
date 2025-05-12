import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "./CommonStyles";

const ImageItemButton = styled(Button)`
  font-size: 20px;
  background: ${(props) =>
    props.selected ? "#a3d9a5" : "linear-gradient(145deg, #ffffff, #e6e6e6)"};
  color: ${(props) => (props.selected ? "#fff" : "#333")};
  width: 200px;
`;

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding-top: 40px;
  padding-bottom: 40px;
`;

const Title = styled.div`
  font-family: "Great Vibes", cursive; /* Updated to Great Vibes */
  color: #000000;
  font-size: 80px;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  justify-items: center;
  grid-template-rows: auto auto;
  grid-template-areas:
    "image1 image2"
    "image3 image3";
`;

const ImageCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const StyledImage = styled.img`
  width: 200px;
  height: ${({ currenttype }) =>
    currenttype === "lashes" ? "300px" : "350px"};
  border-radius: 10px;
  box-shadow: 4px 4px 10px #d1d1d1, -4px -4px 10px #ffffff;
  object-fit: ${({ currenttype }) =>
    currenttype === "bun" || currenttype === "lashes" ? "contain" : "cover"};
`;

const ImageBundleSelector = ({
  heading,
  items = [],
  onSelect,
  currentType,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleButtonClick = (index, id) => {
    setSelectedIndex(index);
    if (onSelect) {
      onSelect(id);
    }
  };

  return (
    <SelectorContainer className="fade-in">
      <Title>{heading}</Title>
      <ImageGrid>
        {items.map(({ id, text, url }, index) => (
          <ImageCard
            key={id}
            style={{
              gridArea:
                index === 0 ? "image1" : index === 1 ? "image2" : "image3",
            }}
          >
            <StyledImage src={url} alt={text} currenttype={currentType} />
            <ImageItemButton
              selected={selectedIndex === index}
              onClick={() => handleButtonClick(index, id)}
            >
              <span>{text}</span>
            </ImageItemButton>
          </ImageCard>
        ))}
      </ImageGrid>
    </SelectorContainer>
  );
};

export default ImageBundleSelector;
