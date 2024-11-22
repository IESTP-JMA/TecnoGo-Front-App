import { createContext, useState, useContext } from "react";

const ProceduresContext = createContext();

export function ProceduresProvider({ children }) {
  const [proceduresInProgress, setProceduresInProgress] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ProceduresContext.Provider
      value={{
        proceduresInProgress,
        setProceduresInProgress,
        modalVisible,
        setModalVisible,
      }}
    >
      {children}
    </ProceduresContext.Provider>
  );
}

export function useProcedures() {
  return useContext(ProceduresContext);
}
