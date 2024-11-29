import { createContext, useContext, useState } from "react";

const efsrtContext = createContext();

export function EfsrtProvider({ children }) {
  const [moduleNumber, setModuleNumber] = useState(null);
  const [moduleData, setModuleData] = useState();

  return (
    <efsrtContext.Provider
      value={{ moduleData, setModuleData, moduleNumber, setModuleNumber }}
    >
      {children}
    </efsrtContext.Provider>
  );
}

export function useEfsrtContext() {
  return useContext(efsrtContext);
}
