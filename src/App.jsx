// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion"; // Add motion here

import LandingPage from "./components/LandingPage";
import StyleSelectionPage from "./components/StyleSelectionPage";
import HairTypePage from "./components/HairFlow/HairType";
import HairStylePage from "./components/HairFlow/HairStyle";
import HairLengthPage from "./components/HairFlow/HairLength";
import EyebrowPage from "./components/EyebrowFlow/Eyebrow";
import LashesPage from "./components/LashesFlow/Lashes";
import FaceScan from "./components/FaceScan";
import FaceScanNEW from './components/TempFaceScan';
import Layout from "./Layout";
import { SelectionProvider } from "./SelectionContext";

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/homepage" />} />
        <Route
          path="/homepage"
          element={
            <motion.div
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <LandingPage />
            </motion.div>
          }
        />
        <Route
          path="/select-style"
          element={
            <motion.div
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <StyleSelectionPage />
            </motion.div>
          }
        />
        <Route
          path="/hair-type"
          element={
            <motion.div
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <HairTypePage />
            </motion.div>
          }
        />
        <Route
          path="/hair-style"
          element={
            <motion.div
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <HairStylePage />
            </motion.div>
          }
        />
        <Route
          path="/hair-length"
          element={
            <motion.div
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <HairLengthPage />
            </motion.div>
          }
        />
        <Route
          path="/brows"
          element={
            <motion.div
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <EyebrowPage />
            </motion.div>
          }
        />
        <Route
          path="/lashes"
          element={
            <motion.div
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <LashesPage />
            </motion.div>
          }
        />
        {/* <Route
          path="/tryon"
          element={
            <motion.div
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <FaceScan />
            </motion.div>
          }
        /> */}
        <Route
          path="/tryon"
          element={
            <motion.div
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <FaceScanNEW />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <SelectionProvider>
      <Router>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </SelectionProvider>
  );
}

export default App;
