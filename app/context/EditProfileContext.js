// contexts/EditProfileContext.jsx
import React, { createContext, useContext, useState } from "react";

const EditProfileContext = createContext();

export function EditProfileProvider({ children }) {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState();

  return (
    <EditProfileContext.Provider
      value={{
        isEditing,
        setIsEditing,
        profileData: userData,
        setProfileData: setUserData,
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
