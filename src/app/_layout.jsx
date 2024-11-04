import { enableScreens } from "react-native-screens";
import { Slot } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "../contexts/AuthContext";
import { UserProvider } from "@/contexts/UserContext";
import "./global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

enableScreens();
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded] = useFonts({
    SenRegular: require("../../assets/fonts/Sen-Regular.ttf"),
    SenMedium: require("../../assets/fonts/Sen-Medium.ttf"),
    SenSemiBold: require("../../assets/fonts/Sen-SemiBold.ttf"),
    SenBold: require("../../assets/fonts/Sen-Bold.ttf"),
    SenExtraBold: require("../../assets/fonts/Sen-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}
