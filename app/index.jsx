import { Redirect, useRouter, Slot } from "expo-router";
import { useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { userData, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (true) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)/Login");
      }
    }
  }, [userData, isLoading, router]);

  if (isLoading) {
    return (
      <View className=" flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return null; // O puedes devolver un componente alternativo
}
