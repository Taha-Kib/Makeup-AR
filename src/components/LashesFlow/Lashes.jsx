import { useSelections } from "../../SelectionContext";
import { useNavigate } from "react-router-dom";
import React from "react";
import FullGlam from "../../assets/lashes/lash-glam-left.png";
import Natural from "../../assets/lashes/lash-natural-left.png";
import Wispy from "../../assets/lashes/lash-wispy-left.png";
import ImageBundleSelector from "../ImageBundleSelector";

const Lashes = [
  { id: "lash-glam", text: "Full Glam", url: FullGlam },
  { id: "lash-natural", text: "Natural", url: Natural },
  { id: "lash-wispy", text: "Wispy", url: Wispy },
];

export default function LashesPage() {
  const { selections, updateSelection } = useSelections();
  const navigate = useNavigate();

  const handleSelect = (id) => {
    updateSelection("eyelashType", id);
    if (selections?.browFlow) {
      navigate("/brows");
    } else {
      navigate("/tryon");
    }
  };

  return (
    <ImageBundleSelector
      heading="Lash Styles"
      items={Lashes || []}
      onSelect={handleSelect}
      currentType={"lashes"}
    />
  );
}
