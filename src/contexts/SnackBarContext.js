import { createContext, useState, useContext } from "react";

const SnackBarContext = createContext();

export function SnackBarProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMsgLoading, setIsMsgLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("Loading");

  function resetVals() {
    setIsVisible(false);
    setIsMsgLoading(false);
    setMessage("");
    setType("Loading");
  }
  function getVals() {
    return {
      isVisible,
      isMsgLoading,
      message,
      type,
    };
  }

  return (
    <SnackBarContext.Provider
      value={{
        isVisible,
        setIsVisible,
        isMsgLoading,
        setIsMsgLoading,
        message,
        setMessage,
        type,
        setType,
        resetVals,
        getVals,
      }}
    >
      {children}
    </SnackBarContext.Provider>
  );
}

export function useSnackBar() {
  return useContext(SnackBarContext);
}
