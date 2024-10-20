import { Stack } from "expo-router";
import { ImageBackground, StatusBar } from "react-native";

const imamgeSplash = require("../../assets/splash.jpeg");

export default function AuthLayout() {
  return (
    <ImageBackground
      className="flex-1 justify-center items-center"
      source={imamgeSplash}
    >
      <StatusBar barStyle="light-content" backgroundColor="#064E3B" />
      <Stack>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false, presentation: "modal" }}
        />

        <Stack.Screen
          name="OTP"
          options={{ presentation: "modal", headerShown: false }}
        />
      </Stack>
    </ImageBackground>
  );
}
