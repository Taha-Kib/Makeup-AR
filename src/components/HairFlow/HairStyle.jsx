// HairStylePage.jsx
import { useSelections } from "../../SelectionContext";
import { useNavigate } from "react-router-dom";
import BunMessy from "../../assets/bun-messy.png";
import BunSpace from "../../assets/bun-space.png";
import BunBraided from "../../assets/bun-braided.png";
import Messy from "../../assets/messy.png";
import Slick from "../../assets/slick-back.png";
import Bangs from "../../assets/bangs.png";
import LooseCurly from "../../assets/loose-curly.png";
import LooseWavy from "../../assets/loose-wavy.png";
import LooseStraight from "../../assets/loose-straight.png";

import ImageBundleSelector from "../ImageBundleSelector";

const stylesForType = {
  bun: [
    { id: "bun-messy", text: "Messy", url: BunMessy },
    { id: "bun-space", text: "Space buns", url: BunSpace },
    { id: "bun-braided", text: "Braided", url: BunBraided },
  ],
  pony: [
    { id: "pony-messy", text: "Messy", url: Messy },
    { id: "pony-slick", text: "Slick Back", url: Slick },
    { id: "pony-bangs", text: "Bangs", url: Bangs },
  ],
  loose: [
    { id: "loose-curly", text: "Curly", url: LooseCurly },
    { id: "loose-wavy", text: "Wavy", url: LooseWavy },
    { id: "loose-straight", text: "Straight", url: LooseStraight },
  ],
};

export default function HairStylePage() {
  const { selections, updateSelection } = useSelections();
  const navigate = useNavigate();
  const currentType = selections.hairType;

  const handleSelect = (id) => {
    updateSelection("hairStyle", id);
    if (currentType === "bun") {
      if (selections?.eyelashFlow === true) {
        navigate("/lashes");
      } else if (selections?.browFlow === true) {
        navigate("/brows");
      } else {
        navigate("/tryon");
      }
    } else {
      navigate("/hair-length");
    }
  };

  return (
    <ImageBundleSelector
      heading="Choose Hair Style"
      items={stylesForType[currentType] || []}
      onSelect={handleSelect}
      currentType={currentType}
    />
  );
}
