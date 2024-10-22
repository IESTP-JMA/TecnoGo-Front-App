// contexts/EditProfileContext.jsx
import React, { createContext, useContext, useState } from "react";

const EditProfileContext = createContext();

export function EditProfileProvider({ children }) {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    fullName: 'Ruth Marina Castillo Huamani',
    email: 'castillohuamaniruthm@gmail.com',
    phoneNumber: '940270449',
    education: {
      career: 'APSTI',
      semester: 'IV'
    },
    birthDate: '22/05/2006',
    dni: '60414454'
  });

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
