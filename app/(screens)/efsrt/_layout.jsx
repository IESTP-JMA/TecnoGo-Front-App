import { StatusBar } from "expo-status-bar";
import { router, Stack } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { ChatsIcon } from "../../../components/Icons";

export default function EfsrtLaoyout() {
  function headerHandler() {
    return (
      <Pressable
        className="-mr-3 py-1 pl-3 pr-2"
        onPress={() => {
          router.push({
            pathname: "efsrt/chats",
            params: { headerTitle: "Chats" },
          });
        }}
      >
        <View className="flex-row items-center border border-rose-500 py-0.5 px-2.5 rounded-full gap-x-1.5">
          <ChatsIcon size={25} strokeWidth={1} color="#F43F5E" />
          <Text className="font-SenMedium text-rose-500">Chats</Text>
        </View>
      </Pressable>
    );
  }
  return (
    <>
      <StatusBar backgroundColor="#064E3B" barStyle="light-content" />
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: "#E6F2EC" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "SenSemiBold",
            color: "#064E3B",
            fontSize: 20,
          },
          animation: "slide_from_right",
          headerTitle: "Mis Efsrt",
          headerRight: headerHandler,
        }}
      >
        <Stack.Screen name="[module_id]" options={{ animation: "fade" }} />
        <Stack.Screen name="chats/index" options={{ animation: "fade" }} />
      </Stack>
    </>
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
//       {/* <View>
//         <Text className="text-center font-SenRegular">
//           Loading Indicator ....
//         </Text>
//       </View> */}
//     </>
//   );
// }
