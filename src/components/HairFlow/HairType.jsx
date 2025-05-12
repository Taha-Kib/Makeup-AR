// HairTypePage.jsx
import { useSelections } from "../../SelectionContext";
import { useNavigate } from "react-router-dom";
import Bun from "../../assets/bun.png";
import Loose from "../../assets/loose.png";
import Pony from "../../assets/pony.png";
import ImageBundleSelector from "../ImageBundleSelector";

const hairTypes = [
  { id: "bun", text: "Bun", url: Bun },
  { id: "loose", text: "Loose", url: Loose },
  { id: "pony", text: "Pony", url: Pony },
];

export default function HairTypePage() {
  const { updateSelection } = useSelections();
  const navigate = useNavigate();

  const handleSelect = (id) => {
    updateSelection("hairType", id);
    navigate("/hair-style");
  };

  return <ImageBundleSelector heading="Choose Hair Type" items={hairTypes} onSelect={handleSelect} />;
}
