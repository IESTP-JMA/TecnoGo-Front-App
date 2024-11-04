import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userData, setUserData] = useState({
    firstNames: "Ruth Marina",
    lastNames: "Castillo Huamani",
    email: "ejemplo@gmail.com",
    phoneNumber: "932002001",
    professionalCareer: "APSTI",
    semester: "IV",
    birthDate: "22/05/2006",
    dni: "00000001",
    uriImage: null,
  });
  const [uriImage, setUriImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [otpId, setOtpId] = useState();
  const [isLogued, setIsLogued] = useState();

  useEffect(() => {
    // Check for the user token when the app loads
    checkUserToken();
  }, []);

  async function checkUserToken() {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken) {
        // If a token is found, assume the user is logged in
        setUserData({ token: userToken });
      }
    } catch (error) {
      console.error("Failed to get user token", error);
    } finally {
      setIsLoading(false);
    }
  }

  const login = async (email) => {
    try {
      await AsyncStorage.setItem("email", email);
      setUserData({
        ...userData,
        email,
      });
    } catch (error) {
      console.error("Failed to save user token", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      setUserData(null);
    } catch (error) {
      console.error("Failed to remove user token", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        login,
        logout,
        isLoading,
        uriImage,
        setUriImage,
        otpId,
        setOtpId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
