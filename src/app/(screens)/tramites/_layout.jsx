import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SnackBarProvider } from "@/contexts/SnackBarContext";
import { memo } from "react";

const TramitesLayout = () => {
  return (
    <SnackBarProvider>
      <StatusBar backgroundColor="#064E3B" barStyle="light-content" />

      <Stack
        screenOptions={{
          headerTitle: "Tramites",
          headerStyle: {
            backgroundColor: "#E6F2EC",
          },
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "SenSemiBold",
            color: "#064E3B",
            fontSize: 20,
          },
        }}
      />
    </SnackBarProvider>
  );
};

export default memo(TramitesLayout);
