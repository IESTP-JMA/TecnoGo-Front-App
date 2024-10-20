import { Stack } from "expo-router";
import { View, Text, Image } from "react-native";
import { BellIcon } from "../../components/Icons";

const avatar = require("../../assets/avatar.png");

export default function RootLayout() {
  return <Stack />;

  return (
    <Stack>
      <Stack.Screen name="Home" />
      <Stack.Screen name="Login" options={{ presentation: "modal" }} />
      <Stack.Screen name="OTP" options={{ presentation: "modal" }} />
    </Stack>
  );
  //   return (
  //     <Stack
  //       screenOptions={{
  //         headerTitle: "",
  //         headerStyle: { backgroundColor: "#065F46" },
  //         headerTintColor: "#166534",
  //         headerLeft: () => (
  //           <View className="py-2 flex-row items-center gap-3">
  //             <Image className="rounded-full w-12 h-12" source={avatar} />
  //             <Text
  //               className="text-white text-xl"
  //               style={{ fontFamily: "Sen_700Bold" }}
  //             >
  //               Hola, Ruth CH 👋
  //             </Text>
  //           </View>
  //         ),
  //         headerRight: () => (
  //           <View>
  //             <BellIcon />
  //           </View>
  //         ),
  //       }}
  //     />
  //   );
}
