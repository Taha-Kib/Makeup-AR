import { useSelections } from "../../SelectionContext";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import BrowStraight from "../../assets/brow-straight.png";
import BrowSoftArch from "../../assets/brow-softarch.png";
import BrowMediumArch from "../../assets/brow-medarch.png";
import BrowHighArch from "../../assets/brow-higharch.png";

import { Button } from "../CommonStyles";

const Eyebrows = [
  { id: "brow-straight", text: "Straight", url: BrowStraight },
  { id: "brow-soft-arch", text: "Soft Arch", url: BrowSoftArch },
  { id: "brow-medium-arch", text: "Medium Arch", url: BrowMediumArch },
  { id: "brow-high-arch", text: "High Arch", url: BrowHighArch },
];

const ImageItemButton = styled(Button)`
  font-size: 20px;
  background: ${(props) =>
    props.selected ? "#a3d9a5" : "linear-gradient(145deg, #ffffff, #e6e6e6)"};
  color: ${(props) => (props.selected ? "#fff" : "#333")};
  min-width: 200px;
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
  font-family: "Great Vibes", cursive;
  color: #000000;
  font-size: 80px;
`;

const ImageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: stretch;
  width: 100%;
  max-width: 500px;
`;

const ZigZagRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ImageCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const StyledImage = styled.img`
  width: 350px;
  height: 100px;
  border-radius: 10px;
  box-shadow: 4px 4px 10px #d1d1d1, -4px -4px 10px #ffffff;
  object-fit: contain;
`;

const EyebrowPage = () => {
  const { updateSelection } = useSelections();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (id) => {
    setSelectedItem(id);
    updateSelection("browType", id);
    navigate("/tryon");
  };

  return (
    <SelectorContainer>
      <Title>Brow Styles</Title>
      <ImageList>
        {Eyebrows.map(({ id, text, url }, index) => (
          <ZigZagRow
            key={id}
            style={{ flexDirection: index % 2 === 0 ? "row" : "row-reverse" }}
          >
            <ImageCard>
              <StyledImage src={url} alt={text} />
              <ImageItemButton
                selected={selectedItem === id}
                onClick={() => handleSelect(id)}
              >
                {text}
              </ImageItemButton>
            </ImageCard>
          </ZigZagRow>
        ))}
      </ImageList>
    </SelectorContainer>
  );
};

export default EyebrowPage;
