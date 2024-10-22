import { Slot } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "./context/AuthContext";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SenRegular: require("../assets/fonts/Sen-Regular.ttf"),
    SenMedium: require("../assets/fonts/Sen-Medium.ttf"),
    SenSemiBold: require("../assets/fonts/Sen-SemiBold.ttf"),
    SenBold: require("../assets/fonts/Sen-Bold.ttf"),
    SenExtraBold: require("../assets/fonts/Sen-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      // if (true) {
      //   router.replace("/(screens)/Home");
      // } else {
      //   router.replace("/(auth)/Login");
      // }
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
