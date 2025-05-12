// src/components/FaceMeshWig.jsx
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
import { useSelections } from "../SelectionContext";
import { ImageOffsets } from "./CommonStyles"; // adjust path if needed

// import LooseShort from "../assets/loose-wavy-short.png";
// import LooseMedium from "../assets/loose-wavy-medium.png";
// import LooseLong from "../assets/loose-wavy-long.png";

function FaceScan() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [showWig, setShowWig] = useState(false);
  const showWigRef = useRef(showWig);
  const { selections } = useSelections();

  const wigImages = import.meta.glob("../assets/*.png", { eager: true });
  const wigImgRef = useRef(null);

  //REMOVE THIS LATER
  // const img = new Image();
  // img.src = LooseLong;
  // wigImgRef.current = img;

  useEffect(() => {
    const selectedKey = selections.hairLength || selections.hairStyle;

    console.log("selectedKey", selectedKey)
    if (!selectedKey) return;

    const path = `../assets/${selectedKey}.png`;
    const matchedImage = wigImages[path];

    console.log("path", path)
    console.log("matchedImage", matchedImage)


    if (matchedImage) {
      const img = new Image();
      img.src = matchedImage.default;
      wigImgRef.current = img;
    }
  }, [selections.hairLength]);

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
      const canvasCtx = canvasRef.current.getContext("2d");
      canvasCtx.save();
      canvasCtx.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      if (results.multiFaceLandmarks?.length > 0 && showWigRef.current) {
        const landmarks = results.multiFaceLandmarks[0];
        const topHead = landmarks[0];
        const leftTemple = landmarks[234];
        const rightTemple = landmarks[454];

        const centerX = topHead.x * canvasRef.current.width;
        const centerY = topHead.y * canvasRef.current.height;
        const templeWidth =
          Math.abs(leftTemple.x - rightTemple.x) * canvasRef.current.width;

        const selectedKey = selections.hairLength || selections.hairStyle;

        // Find matching offset
        const matchedOffset = ImageOffsets.find(
          (offset) => offset.key === selectedKey
        );

        const { offsetWidth, offsetHeight, yPos, xPos } = matchedOffset;

        const wigWidth = templeWidth * offsetWidth;
        const wigHeight = offsetHeight
          ? wigWidth * offsetHeight
          : wigWidth * (wigImg.height / wigImg.width);
        const offsetY = wigHeight * yPos;

        // const wigWidth = templeWidth * 3.5;
        // const wigHeight = wigWidth * 1;
        // const offsetY = wigHeight * 0.33;


        canvasCtx.drawImage(
          wigImg,
          centerX - wigWidth / xPos,
          centerY - offsetY,
          wigWidth,
          wigHeight
        );
      }

      canvasCtx.restore();
    }
  }, []);

  return (
    <div className="App">
      <button
        onClick={() => setShowWig((prev) => !prev)}
        style={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: showWig ? "#ff5c5c" : "#5cff96",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {showWig ? "Remove Wig" : "Apply Wig"}
      </button>

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

      <canvas
        ref={canvasRef}
        style={{
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          width: 1024,
          height: 720,
        }}
      />
    </div>
  );
}

export default FaceScan;
