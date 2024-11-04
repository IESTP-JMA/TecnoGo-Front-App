import { Redirect, useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { getJWT, saveJWT, removeJWT } from "@/utils/jwtStorage";

export default function IndexRoot() {
  const userJWT = getJWT();
  const router = useRouter();
  const { userData, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (true) {
        router.replace("(tabs)/home");
      } else {
        router.replace("/login");
      }
    }
  }, [userData, isLoading, router]);

  if (!userJWT) {
    return <Redirect href="/login" />;
  }

  if (isLoading) {
    return (
      <View className=" flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  } else return null; // O puedes devolver un componente alternativo
}
