import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { SnackBarProvider } from "@/contexts/SnackBarContext";
import { EfsrtProvider } from "@/contexts/efsrtContext";

export default function EfsrtLaoyout() {
  return (
    <EfsrtProvider>
      <SnackBarProvider>
        <StatusBar backgroundColor="#064E3B" barStyle="light-content" />
        <Stack
          screenOptions={{
            headerTitle: "Mis EFSRT",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "SenSemiBold",
              color: "#064E3B",
              fontSize: 20,
            },
            headerStyle: { backgroundColor: "#E6F2EC" },
            headerShadowVisible: false,
            animation: "fade",
          }}
        >
          <Stack.Screen name="module" />
          <Stack.Screen name="chats/index" />
          <Stack.Screen name="apuntes/index" />
        </Stack>
      </SnackBarProvider>
    </EfsrtProvider>
  );
}
