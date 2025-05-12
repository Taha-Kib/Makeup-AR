import styled from "styled-components";
import landingImage from "../assets/landing-image.png";
import { Button } from "./CommonStyles";
import { useNavigate } from "react-router-dom";

const Heading1 = styled.div`
  font-family: "Great Vibes", cursive; /* Updated to Great Vibes */
  color: #000000;
  font-size: 40px;
`;

const Heading2 = styled.div`
  font-family: "Great Vibes", cursive; /* Updated to Great Vibes */
  color: #000000;
  font-size: 80px;
`;

const LandingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  padding-top: 40px;
  padding-bottom: 40px;
`;

function LandingPage() {
  const navigate = useNavigate();

  const handleTryNowClick = () => {
    navigate("/select-style");
  };
  return (
    <LandingContainer>
      <Heading1>Hair, Lashes and Eyebrows</Heading1>
      <Heading2>Virtual Glow Up!</Heading2>
      <img width="450px" height="650px" src={landingImage} alt="Landing" />
      <Button onClick={handleTryNowClick}>
        <span>Try now</span>
      </Button>
    </LandingContainer>
  );
}

export default LandingPage;
