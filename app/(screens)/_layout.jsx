import { Stack, Tabs } from "expo-router";
import { View, Text, Image } from "react-native";
import { BellIcon } from "../../components/Icons";
import { useAuth } from "../../contexts/AuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const avatar = require("../../assets/avatar.png");

export default function RootLayout() {
  const { user } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
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
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          unmountOnBlur: true,
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
