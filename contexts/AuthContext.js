import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
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
        setUser({ token: userToken });
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
      setUser(email);
    } catch (error) {
      console.error("Failed to save user token", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      setUser(null);
    } catch (error) {
      console.error("Failed to remove user token", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
