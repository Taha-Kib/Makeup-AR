import React, { useState } from "react";
import { motion } from "framer-motion";
import background from "./assets/background.png";
import SparkleOverlay from "./SparkleOverlay";

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const Layout = ({ children }) => {
  const [rotationState, setRotationState] = useState("none"); // "none" | "left" | "right"

  const cycleRotation = () => {
    setRotationState((prev) => {
      if (prev === "none") return "left";
      if (prev === "left") return "right";
      return "none";
    });
  };

  const baseStyles = {
    position: "relative",
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 1,
  };

  const rotatedStyles =
    rotationState === "left"
      ? {
          width: "100vh",
          height: "100vw",
          transform: "rotate(-90deg) translateX(-100%)",
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "hidden",
        }
      : rotationState === "right"
      ? {
          width: "100vh",
          height: "100vw",
          transform: "rotate(90deg) translateY(-100%)",
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "hidden",
        }
      : {
          width: "100vw",
          minHeight: "100vh",
          overflowY: "auto", // enables vertical scroll if needed
          overflowX: "hidden", // optional: prevent horizontal scroll
        };

  return (
    <>
      {/* Rotate Button */}
      <button
        onClick={cycleRotation}
        style={{
          position: "fixed",
          top: "10px",
          left: "10px",
          zIndex: 9999,
          padding: "10px 14px",
          fontSize: "14px",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Rotate
      </button>

      <motion.div
        variants={fadeVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ ...baseStyles, ...rotatedStyles }}
      >
        <SparkleOverlay />
        <div style={{ zIndex: 2 }}>{children}</div>
      </motion.div>
    </>
  );
};

export default Layout;
