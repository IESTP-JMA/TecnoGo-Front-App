import { Stack, useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
export default function Start() {
  const router = useRouter();

  return (
    <>
      <View className="flex-1 bg-blue-200">
        <Text>IN start.jsx</Text>
      </View>
    </>
  );
}
