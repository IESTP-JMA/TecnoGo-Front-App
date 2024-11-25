import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { SnackBarProvider } from "@/contexts/SnackBarContext";

export default function EfsrtLaoyout() {
  return (
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
  );
}

// import {
//   Stack,
//   useGlobalSearchParams,
//   useRouter,
//   usePathname,
// } from "expo-router";
// import { Pressable, Text, View } from "react-native";
// import { ChevronBackIcon, ChatsIcon } from "../../components/Icons";

// export default function ScreensLayout() {
//   const router = useRouter();
//   const pathName = usePathname();

//   const { headerTitle } = useGlobalSearchParams();
//   function backToHome() {
//     return (
//       <Pressable
//         className="flex-row items-center -ml-3 py-3 pr-3"
//         onPress={() => router.replace("/(tabs)/home")}
//       >
//         <ChevronBackIcon strokeWidth={32} />
//         <Text className="font-SenMedium">Ir a Inicio</Text>
//       </Pressable>
//     );
//   }

//   return (
//     <>
//       <Stack
//         screenOptions={{
//           headerLeft: backToHome,
//           headerTitle,
//
//         }}
//       />

//     </>
//   );
// }
