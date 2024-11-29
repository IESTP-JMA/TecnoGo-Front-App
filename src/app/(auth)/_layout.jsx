import { Stack } from "expo-router";
import { ImageBackground, StatusBar } from "react-native";
import { LoginProvider } from "../../contexts/LoginContext";

const imageSplash = require("../../../assets/splash.png");

export default function AuthLayout() {
  return (
    <LoginProvider>
      <ImageBackground
        className="flex-1 justify-center items-center"
        source={imageSplash}
      >
        <StatusBar barStyle="light-content" backgroundColor="#064E3B" />
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="otp" options={{ headerShown: false }} />
        </Stack>
      </ImageBackground>
    </LoginProvider>
  );
}
