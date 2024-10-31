import { Link, Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";
export default function TramitesLayout() {
  return (
    <>
      <StatusBar backgroundColor="#064E3B" barStyle="light-content" />

      <Stack
        screenOptions={{
          headerTitle: "Tramites",
          headerStyle: { backgroundColor: "#E6F2EC" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "SenSemiBold",
            color: "#064E3B",
            fontSize: 20,
          },
        }}
      />
      {/* <View>
        <Text>HEADER PADRE</Text>
      </View> */}
    </>
  );
}
