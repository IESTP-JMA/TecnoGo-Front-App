import { createContext, useState, useContext } from "react";

const ProceduresContext = createContext();

export function ProceduresProvider({ children }) {
  const [procedureTypes, setProcedureTypes] = useState([]);
  const [proceduresInProgress, setProceduresInProgress] = useState([]);

  return (
    <ProceduresContext.Provider
      value={{
        procedureTypes,
        setProcedureTypes,
        proceduresInProgress,
        setProceduresInProgress,
      }}
    >
      {children}
    </ProceduresContext.Provider>
  );
}

export function useProcedures() {
  return useContext(ProceduresContext);
}
