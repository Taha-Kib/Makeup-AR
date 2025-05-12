import { useSelections } from "../../SelectionContext";
import { useNavigate } from "react-router-dom";
import PonyMessyShort from "../../assets/pony-messy-short.png";
import PonyMessyMedium from "../../assets/pony-messy-medium.png";
import PonyMessyLong from "../../assets/pony-messy-long.png";
import PonySlickShort from "../../assets/pony-slick-short.png";
import PonySlickMedium from "../../assets/pony-slick-medium.png";
import PonySlickLong from "../../assets/pony-slick-long.png";
import PonyBangShort from "../../assets/pony-bangs-short.png";
import PonyBangMedium from "../../assets/pony-bangs-medium.png";
import PonyBangLong from "../../assets/pony-bangs-long.png";

import LooseCurlyShort from "../../assets/loose-curly-short.png";
import LooseCurlyMedium from "../../assets/loose-curly-medium.png";
import LooseCurlyLong from "../../assets/loose-curly-long.png";
import LooseWavyShort from "../../assets/loose-wavy-short.png";
import LooseWavyMedium from "../../assets/loose-wavy-medium.png";
import LooseWavyLong from "../../assets/loose-wavy-long.png";
import LooseStraightShort from "../../assets/loose-straight-short.png";
import LooseStraightMedium from "../../assets/loose-straight-medium.png";
import LooseStraightLong from "../../assets/loose-straight-long.png";

import ImageBundleSelector from "../ImageBundleSelector";

const lengthsByTypeAndStyle = {
  pony: {
    "pony-messy": [
      { id: "pony-messy-short", text: "Short", url: PonyMessyShort },
      { id: "pony-messy-medium", text: "Medium", url: PonyMessyMedium },
      { id: "pony-messy-long", text: "Long", url: PonyMessyLong },
    ],
    "pony-slick": [
      { id: "pony-slick-short", text: "Short", url: PonySlickShort },
      { id: "pony-slick-medium", text: "Medium", url: PonySlickMedium },
      { id: "pony-slick-long", text: "Long", url: PonySlickLong },
    ],
    "pony-bangs": [
      { id: "pony-bangs-short", text: "Short", url: PonyBangShort },
      { id: "pony-bangs-medium", text: "Medium", url: PonyBangMedium },
      { id: "pony-bangs-long", text: "Long", url: PonyBangLong },
    ],
  },
  loose: {
    "loose-curly": [
      { id: "loose-curly-short", text: "Short", url: LooseCurlyShort },
      { id: "loose-curly-medium", text: "Medium", url: LooseCurlyMedium },
      { id: "loose-curly-long", text: "Long", url: LooseCurlyLong },
    ],
    "loose-wavy": [
      { id: "loose-wavy-short", text: "Short", url: LooseWavyShort },
      { id: "loose-wavy-medium", text: "Medium", url: LooseWavyMedium },
      { id: "loose-wavy-long", text: "Long", url: LooseWavyLong },
    ],
    "loose-straight": [
      { id: "loose-straight-short", text: "Short", url: LooseStraightShort },
      { id: "loose-straight-medium", text: "Medium", url: LooseStraightMedium },
      { id: "loose-straight-long", text: "Long", url: LooseStraightLong },
    ],
  },
};

export default function HairLengthPage() {
  const { selections, updateSelection } = useSelections();
  const navigate = useNavigate();

  const currentType = selections.hairType;
  const currentStyle = selections.hairStyle;

  const handleSelect = (id) => {
    updateSelection("hairLength", id);
    if(selections?.eyelashFlow === true) {
      navigate("/lashes");
    } else if (selections?.browFlow === true) {
      navigate("/brows");
    } else {
      navigate("/tryon");
    }
  };

  const items = lengthsByTypeAndStyle[currentType]?.[currentStyle] || [];

  return (
    <ImageBundleSelector
      heading="Choose Hair Length"
      items={items}
      onSelect={handleSelect}
    />
  );
}
