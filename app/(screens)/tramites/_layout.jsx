import { Stack, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function TramitesLayout() {
  const router = useRouter();

  return (
    <>
      <View className="flex-row justify-between bg-red-300">
        <Pressable onPress={() => router.push("/(screens)/tramites/start")}>
          <Text className="mt-2 text-sm text-center text-[#005e54]">
            Iniciar
          </Text>
        </Pressable>
        <Pressable onPress={() => router.push("/(screens)/tramites/progress")}>
          <Text className="mt-2 text-sm text-center text-[#005e54]">
            Progreso
          </Text>
        </Pressable>
        <Pressable onPress={() => router.push("/(screens)/tramites/response")}>
          <Text className="mt-2 text-sm text-center text-[rgb(0,94,84)]">
            Respuesta
          </Text>
        </Pressable>
      </View>
      <View className="flex-1">
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </>
  );
}
