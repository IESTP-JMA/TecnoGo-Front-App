import { enableScreens } from "react-native-screens";
import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "../contexts/AuthContext";
import { UserProvider } from "@/contexts/UserContext";
import "./global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SQLiteProvider } from "expo-sqlite";

enableScreens();
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function RootLayout() {
  const [dbInitialized, setDbInitialized] = useState(false);
  const [loaded] = useFonts({
    SenRegular: require("../../assets/fonts/Sen-Regular.ttf"),
    SenMedium: require("../../assets/fonts/Sen-Medium.ttf"),
    SenSemiBold: require("../../assets/fonts/Sen-SemiBold.ttf"),
    SenBold: require("../../assets/fonts/Sen-Bold.ttf"),
    SenExtraBold: require("../../assets/fonts/Sen-ExtraBold.ttf"),
  });

  const handleDbInitialization = async (db) => {
    // await InitializeDatabaseTables(db);
    setDbInitialized(true);
  };

  useEffect(() => {
    if (loaded && dbInitialized) {
      console.log("[STATUS] -> ", loaded, dbInitialized);
      SplashScreen.hideAsync();
    }
  }, [loaded, dbInitialized]);

  if (!loaded) {
    return null;
  }

  return (
    <SQLiteProvider databaseName="app.db" onInit={handleDbInitialization}>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Slot />
          </AuthProvider>
        </QueryClientProvider>
      </UserProvider>
    </SQLiteProvider>
  );
}
