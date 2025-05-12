import { useSelections } from "../SelectionContext";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import StyleHair from "../assets/style-hair.png";
import StyleLashes from "../assets/style-lashes.png";
import StyleBrows from "../assets/style-brows.png";
import { Button } from "./CommonStyles";

const styleType = [
  { id: "hair", text: "Hair", url: StyleHair },
  { id: "eyelashes", text: "Eyelashes", url: StyleLashes },
  { id: "brows", text: "Brows", url: StyleBrows },
];

// Styled components (same as in ImageBundleSelector)
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
  height: 350px;
  border-radius: 10px;
  box-shadow: 4px 4px 10px #d1d1d1, -4px -4px 10px #ffffff;
  object-fit: cover;
`;

const StyleSelectionPage = () => {
  const { updateSelection } = useSelections();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelection = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleNext = () => {
    if (selectedItems.includes("hair")) {
      updateSelection("hairFlow", true);
    }
    if (selectedItems.includes("eyelashes")) {
      updateSelection("eyelashFlow", true);
    }
    if (selectedItems.includes("brows")) {
      updateSelection("browFlow", true);
    }

    // Navigate based on priority
    if (selectedItems.includes("hair")) {
      navigate("/hair-type");
    } else if (selectedItems.includes("eyelashes")) {
      navigate("/lashes");
    } else if (selectedItems.includes("brows")) {
      navigate("/brows");
    }
  };

  return (
    <SelectorContainer>
      <Title>Pick Your Styles</Title>
      <ImageGrid>
        {styleType.map(({ id, text, url }, index) => (
          <ImageCard
            key={id}
            style={{
              gridArea:
                index === 0 ? "image1" : index === 1 ? "image2" : "image3",
            }}
          >
            <StyledImage src={url} alt={text} />
            <ImageItemButton
              selected={selectedItems.includes(id)}
              onClick={() => toggleSelection(id)}
            >
              {text}
            </ImageItemButton>
          </ImageCard>
        ))}
      </ImageGrid>
      <Button disabled={selectedItems.length === 0} onClick={handleNext}>
        Next
      </Button>
    </SelectorContainer>
  );
};

export default StyleSelectionPage;
