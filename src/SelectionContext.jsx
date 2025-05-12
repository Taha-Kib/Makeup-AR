// SelectionContext.jsx
import { createContext, useContext, useState } from "react";

const SelectionContext = createContext();

export const useSelections = () => useContext(SelectionContext);

const initialState = {
  hairFlow: false,
  hairType: null,
  hairStyle: null,
  hairLength: null,
  hairColor: null,
  eyelashFlow: false,
  eyelashType: null,
  browFlow: false,
  browType: null,
};

export const SelectionProvider = ({ children }) => {
  const [selections, setSelections] = useState(initialState);

  const updateSelection = (key, value) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
  };

  const resetSelections = () => {
    setSelections(initialState);
  };

  return (
    <SelectionContext.Provider
      value={{ selections, updateSelection, resetSelections }}
    >
      {children}
    </SelectionContext.Provider>
  );
};
