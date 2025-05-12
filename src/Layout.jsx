// src/components/Layout.jsx
import React from "react";
import { motion } from "framer-motion";
import background from "./assets/background.png";
import SparkleOverlay from "./SparkleOverlay";

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const Layout = ({ children }) => {
  return (
    <motion.div
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{
        position: "relative",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Sparkles in the background */}
      <SparkleOverlay/>

      {/* Children content above sparkles */}
      <div style={{ zIndex: 2 }}>
        {children}
      </div>
    </motion.div>
  );
};

export default Layout;
