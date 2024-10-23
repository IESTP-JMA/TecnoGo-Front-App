import {
  Stack,
  useGlobalSearchParams,
  useSegments,
  useRouter,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";
import { ChevronBackIcon, ChatsIcon } from "../../components/Icons";

export default function ScreensLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { headerTitle } = useGlobalSearchParams();

  function backToHome() {
    return (
      <Pressable
        className="flex-row items-center -ml-3 py-3 pr-3"
        onPress={() => router.replace("/(tabs)/home")}
      >
        <ChevronBackIcon strokeWidth={32} />
        <Text className="font-SenMedium">Ir a Inicio</Text>
      </Pressable>
    );
  }

  function headerHandler() {
    if (segments.includes("efsrt")) {
      return (
        <Pressable
          className="-mr-3 py-1 pl-3 pr-2"
          onPress={() => router.push("/(screens)/efsrt/chats")}
        >
          <View className="flex-row items-center border border-rose-500 py-0.5 px-2.5 rounded-full gap-x-1.5">
            <ChatsIcon size={25} strokeWidth={1} color="#F43F5E" />
            <Text className="font-SenMedium text-rose-500">Chats</Text>
          </View>
        </Pressable>
      );
    }
  }

  return (
    <>
      <StatusBar backgroundColor="#064E3B" barStyle="light-content" />
      <Stack
        screenOptions={{
          headerLeft: backToHome,
          headerRight: headerHandler,
          headerTitle,
          headerStyle: { backgroundColor: "#E6F2EC" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "SenSemiBold",
            color: "#064E3B",
            fontSize: 20,
          },
        }}
      />
      <View>
        <Text>Loading....</Text>
      </View>
    </>
  );
}
