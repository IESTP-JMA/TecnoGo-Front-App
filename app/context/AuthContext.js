import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userData, setUserData] = useState({
    names: {
      first: 'Ruth Marina',
      last: 'Castillo Huamani'
    },
    email: 'castillohuamaniruthm@gmail.com',
    phoneNumber: '940270449',
    education: {
      career: 'APSTI',
      semester: 'IV'
    },
    birthDate: '22/05/2006',
    dni: '60414454'
  });
  const [isLoading, setIsLoading] = useState(true);

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
      setUserData(email);
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
    <AuthContext.Provider value={{ userData: userData, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
