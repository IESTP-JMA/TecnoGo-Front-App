import { createContext, useState, useContext, useEffect } from "react";

const SnackBarContext = createContext();

export function SnackBarProvider({ children }) {
  const [isShowLoading, setIsShowLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("Info");

  function resetSnackBar() {
    setIsShowLoading(false);
    setMessage("");
    setType("Info");
  }

  function getVals() {
    return {
      message,
      type,
    };
  }

  return (
    <SnackBarContext.Provider
      value={{
        isShowLoading,
        setIsShowLoading,
        message,
        setMessage,
        type,
        setType,
        resetSnackBar,
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
