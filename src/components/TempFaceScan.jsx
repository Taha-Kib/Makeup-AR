// src/components/FaceMeshWig.jsx
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
import { useSelections } from "../SelectionContext";
import { ImageOffsets, BrowsOffsets, LashesOffsets } from "./CommonStyles";
import HairImg from "../assets/loose-straight-long.png";
import BrowRight from "../assets/brows/brow-medium-arch-right.png";
import styled from "styled-components";
import { Button } from "./CommonStyles";
import { useNavigate } from "react-router-dom";

import LashGlamLeft from "../assets/lashes/lash-wispy-left.png";
import LashGlamRight from "../assets/lashes/lash-wispy-right.png";

function FaceScanNEW() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [showWig, setShowWig] = useState(true);
  const showWigRef = useRef(showWig);
  const { selections, resetSelections } = useSelections();
  const navigate = useNavigate();

  console.log("selections", selections);

  const wigImages = import.meta.glob("../assets/*.png", { eager: true });
  const eyebrowImages = import.meta.glob("../assets/brows/*.png", {
    eager: true,
  });

  const lashImages = import.meta.glob("../assets/lashes/*.png", {
    eager: true,
  });

  const wigImgRef = useRef(null);

  // const wimg = new Image();
  // wimg.src = HairImg;
  // wigImgRef.current = wimg;

  const eyebrowLeftRef = useRef(null);
  const eyebrowRightRef = useRef(null);

  // const browLeft = new Image();
  // browLeft.src = BrowLeft;
  // eyebrowLeftRef.current = browLeft;

  // const browRight = new Image();
  // browRight.src = BrowRight;
  // eyebrowRightRef.current = browRight;

  const lashLeftImgRef = useRef(null);
  const lashRightImgRef = useRef(null);

  // const lashLeft = new Image();
  // lashLeft.src = LashGlamLeft;
  // lashLeftImgRef.current = lashLeft;

  // const lashRight = new Image();
  // lashRight.src = LashGlamRight;
  // lashRightImgRef.current = lashRight;

  // Load wig image based on hairLength or hairStyle
  useEffect(() => {
    const selectedKey = selections.hairLength || selections.hairStyle;
    if (!selectedKey) return;

    const path = `../assets/${selectedKey}.png`;
    const matchedImage = wigImages[path];
    if (matchedImage) {
      const img = new Image();
      img.src = matchedImage.default;
      wigImgRef.current = img;
    }
  }, [selections.hairLength, selections.hairStyle]);

  //For brows
  useEffect(() => {
    const selectedBrow = selections.browType;
    if (!selectedBrow) return;

    // Left and Right Brow paths
    const leftBrowPath = `../assets/brows/${selectedBrow}-left.png`;
    const rightBrowPath = `../assets/brows/${selectedBrow}-right.png`;

    const matchedLeftImage = eyebrowImages[leftBrowPath];
    const matchedRightImage = eyebrowImages[rightBrowPath];

    if (matchedLeftImage && matchedRightImage) {
      const leftImg = new Image();
      const rightImg = new Image();
      leftImg.src = matchedLeftImage.default;
      rightImg.src = matchedRightImage.default;

      eyebrowLeftRef.current = leftImg;
      eyebrowRightRef.current = rightImg;
    }
  }, [selections.browType]);

  //For lashes
  useEffect(() => {
    const selectedLash = selections.eyelashType;
    if (!selectedLash) return;

    // Left and Right Lash paths
    const leftLashPath = `../assets/lashes/${selectedLash}-left.png`;
    const rightLashPath = `../assets/lashes/${selectedLash}-right.png`;

    const matchedLeftImage = lashImages[leftLashPath];
    const matchedRightImage = lashImages[rightLashPath];

    if (matchedLeftImage && matchedRightImage) {
      const leftImg = new Image();
      const rightImg = new Image();
      leftImg.src = matchedLeftImage.default;
      rightImg.src = matchedRightImage.default;

      lashLeftImgRef.current = leftImg;
      lashRightImgRef.current = rightImg;
    }
  }, [selections.eyelashType]);

  useEffect(() => {
    showWigRef.current = showWig;
  }, [showWig]);

  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults(onResults);

    if (webcamRef.current && webcamRef.current.video) {
      const camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          await faceMesh.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }

    function onResults(results) {
      const wigImg = wigImgRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      if (results.multiFaceLandmarks?.length > 0 && showWigRef.current) {
        const landmarks = results.multiFaceLandmarks[0];

        // === Draw Brows First ===
        const eyebrowLeft = eyebrowLeftRef.current;
        const eyebrowRight = eyebrowRightRef.current;

        if (eyebrowLeft && eyebrowRight) {
          const drawEyebrow = (startIdx, endIdx, img, adjustX, adjustY) => {
            const start = landmarks[startIdx];
            const end = landmarks[endIdx];
            const x = start.x * canvas.width;
            const y = start.y * canvas.height;
            const width = Math.abs(end.x - start.x) * canvas.width * 10;
            const height = width * (img.height / img.width);

            ctx.drawImage(
              img,
              x - width / 2 + adjustX,
              y - height / 2 + adjustY,
              width,
              height
            );
          };

          const leftOffset = BrowsOffsets.find(
            (o) => o.key === `${selections.browType}-left`
          );
          const rightOffset = BrowsOffsets.find(
            (o) => o.key === `${selections.browType}-right`
          );

          drawEyebrow(
            70,
            63,
            eyebrowLeft,
            leftOffset?.offsetX ?? 0,
            leftOffset?.offsetY ?? 0
          );
          drawEyebrow(
            300,
            293,
            eyebrowRight,
            rightOffset?.offsetX ?? 0,
            rightOffset?.offsetY ?? 0
          );
        }

        // === Draw Lashes Next ===
        const lashLeftImg = lashLeftImgRef.current;
        const lashRightImg = lashRightImgRef.current;

        if (lashLeftImg && lashRightImg) {
          const drawLash = (
            startIdx,
            endIdx,
            img,
            adjustX = 0,
            adjustY = 0
          ) => {
            const start = landmarks[startIdx];
            const end = landmarks[endIdx];
            const x = start.x * canvas.width;
            const y = start.y * canvas.height;
            const width = Math.abs(end.x - start.x) * canvas.width * 1.3;
            const height = width * (img.height / img.width);

            ctx.drawImage(
              img,
              x - width / 2.5 + adjustX,
              y - height / 1.5 + adjustY,
              width,
              height
            );
          };

          const leftOffset = LashesOffsets.find(
            (o) => o.key === `${selections.eyelashType}-left`
          );
          const rightOffset = LashesOffsets.find(
            (o) => o.key === `${selections.eyelashType}-right`
          );

          drawLash(
            33,
            133,
            lashLeftImg,
            leftOffset?.offsetX ?? 0,
            leftOffset?.offsetY ?? 0
          );
          drawLash(
            362,
            263,
            lashRightImg,
            rightOffset?.offsetX ?? 0,
            rightOffset?.offsetY ?? 0
          );
        }

        // === Draw Wig LAST ===
        const topHead = landmarks[0];
        const leftTemple = landmarks[234];
        const rightTemple = landmarks[454];
        const centerX = topHead.x * canvas.width;
        const centerY = topHead.y * canvas.height;
        const templeWidth =
          Math.abs(leftTemple.x - rightTemple.x) * canvas.width;

        const selectedKey = selections.hairLength || selections.hairStyle;
        const matchedOffset = ImageOffsets.find(
          (offset) => offset.key === selectedKey
        );
        if (wigImg) {
          const { offsetWidth, offsetHeight, yPos, xPos } = matchedOffset;
          const wigWidth = templeWidth * offsetWidth;
          const wigHeight = offsetHeight
            ? wigWidth * offsetHeight
            : wigWidth * (wigImg.height / wigImg.width);
          const offsetY = wigHeight * yPos;

          ctx.drawImage(
            wigImg,
            centerX - wigWidth / xPos,
            centerY - offsetY,
            wigWidth,
            wigHeight
          );
        }
      }

      ctx.restore();
    }
  }, []);

  return (
    <div className="App">
      <HeadingText>Your Final Look</HeadingText>
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
          visibility: "hidden",
        }}
      />

      <CanvasContainer ref={canvasRef} />
      <ButtonWrapper>
        <StyledButton
          onClick={() => {
            resetSelections(); // Reset all selections
            navigate("/homepage"); // Redirect to homepage
          }}
        >
          Try again
        </StyledButton>
      </ButtonWrapper>
    </div>
  );
}

export default FaceScanNEW;

const CanvasContainer = styled.canvas`
  display: block;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1024px;
  height: 720px;
  border: 20px solid #000;
  border-radius: 10px;
`;

const HeadingText = styled.div`
  font-size: 80px;
  font-family: "Great Vibes", cursive; /* Updated to Great Vibes */
  color: #000;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: calc(50% + 420px);
  left: 50%;
  transform: translateX(-50%);
`;

const StyledButton = styled(Button)`
  box-shadow: 6px 6px 12px #cfcfcf, -6px -6px 12px #ffffff;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 8px 8px 16px #bcbcbc, -8px -8px 16px #ffffff;
  }
`;
