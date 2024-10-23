// contexts/EditProfileContext.jsx
import React, { createContext, useContext, useState } from "react";

const EditProfileContext = createContext();

export function EditProfileProvider({ children }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <EditProfileContext.Provider
      value={{
        isEditing,
        setIsEditing,
      }}
    >
      {children}
    </EditProfileContext.Provider>
  );
}

export function useEditProfileContext() {
  const context = useContext(EditProfileContext);

  return context;
}
