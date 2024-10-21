import { Stack } from "expo-router";
import { View, Text, Image } from "react-native";
import { BellIcon } from "../../components/Icons";
import { useAuth } from "../../contexts/AuthContext";

const avatar = require("../../assets/avatar.png");

export default function RootLayout() {
  const { user } = useAuth();
  return (
    <Stack
      screenOptions={{
        headerTitle: "",
        headerStyle: { backgroundColor: "#065F46" },
        headerTintColor: "#166534",
        headerLeft: () => (
          <View className="py-2 flex-row items-center gap-3">
            <Image className="rounded-full w-12 h-12" source={avatar} />
            <Text className="text-white text-xl font-SenMedium">
              Hola, {user} 👋
            </Text>
          </View>
        ),
        headerRight: () => (
          <View>
            <BellIcon />
          </View>
        ),
      }}
    />
  );
}
