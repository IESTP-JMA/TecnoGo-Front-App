// app/(tabs)/_layout.jsx
import { Text, Image, StatusBar, Pressable } from "react-native";
import { Tabs, useRouter } from "expo-router";
import {
  PersonIcon,
  BellIcon,
  HomeIcon,
  HomeIconOutline,
} from "../../components/Icons";
import { useAuth } from "../contexts/AuthContext";

export default function TabsLayout() {
  const router = useRouter();
  const { userData } = useAuth();

  return (
    <>
      <StatusBar backgroundColor="#064E3B" barStyle="light-content" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#065F46",
          headerTintColor: "#065F46",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "SenBold",
            color: "#064E3B",
            fontSize: 23,
          },
          tabBarLabelStyle: {
            fontFamily: "SenMedium",
            fontSize: 13,
          },
        }}
      >
        <Tabs.Screen
          name="home/index"
          options={{
            headerStyle: {
              backgroundColor: "#064E3B",
              height: 95,
            },
            headerLeft: () => (
              <Pressable
                className="pl-2"
                onPress={() => router.push("profile")}
              >
                <Image
                  className="rounded-full w-14 h-14"
                  source={require("../../assets/avatar.png")}
                />
              </Pressable>
            ),
            headerTitleAlign: "left",
            headerTitle: () => (
              <>
                <Text className="text-white text-xl font-SenMedium -ml-1">
                  Hola, {userData.firstNames} 👋
                </Text>
                <Text className="text-zinc-200 font-SenRegular -ml-1">
                  Bienvenida
                </Text>
              </>
            ),

            headerRight: () => (
              <Pressable className="p-2.5  mr-1">
                <BellIcon />
              </Pressable>
            ),
            tabBarIcon: ({ size, color, focused }) => {
              if (focused) {
                return <HomeIcon size={size} color={color} />;
              } else {
                return <HomeIconOutline size={size} color={color} />;
              }
            },
            tabBarLabel: "Inicio",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Mi Perfil",
            headerTitle: "Mi Perfil",
            headerStyle: { backgroundColor: "#E6F2EC" },
            tabBarIcon: ({ color, focused, size }) => (
              <PersonIcon size={size} color={color} filled={focused} />
            ),
            tabBarLabel: "Mi Perfil",
          }}
          //   listeners={{
          //     tabPress: () => setIsEditing(false),
          //   }}
        />
      </Tabs>
    </>
  );
}
