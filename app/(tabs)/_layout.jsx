import { Text, Image, StatusBar, Pressable, View } from "react-native";
import { Stack, Tabs, useRouter } from "expo-router";
import { HomeIcon, HomeIconOutline } from "../../components/Icons";
import { useAuth } from "../contexts/AuthContext";
import { Bell, User } from "lucide-react-native";
import AvatarPlaceHolder from "../../components/AvatarPlaceHolder";

export default function TabsLayout() {
  const router = useRouter();
  const { userData, uriImage } = useAuth();

  return (
    <>
      <StatusBar backgroundColor="#064E3B" barStyle="light-content" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#881337",
          headerTintColor: "#065F46",
          headerTitleStyle: {
            fontFamily: "SenBold",
            color: "#064E3B",
            fontSize: 23,
          },
          tabBarLabelStyle: {
            fontFamily: "SenMedium",
            fontSize: 12,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerStyle: {
              backgroundColor: "#064E3B",
              height: 90,
            },
            headerLeft: () => (
              <Pressable
                className="pl-2"
                onPress={() => router.push("profile")}
              >
                {uriImage ? (
                  <Image
                    className="rounded-full w-14 h-14"
                    source={{ uri: uriImage }}
                  />
                ) : (
                  <AvatarPlaceHolder
                    customTextStyle={{ fontSize: 24 }}
                    customClass="h-14 w-14"
                    customTextClass="mt-0.5"
                  />
                )}
              </Pressable>
            ),
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
                <Bell color="white" />
              </Pressable>
            ),
            tabBarIcon: ({ color, focused }) => {
              if (focused) {
                return <HomeIcon size={28} color={color} />;
              } else {
                return <HomeIconOutline size={28} color={color} />;
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
            tabBarIcon: ({ color, focused }) => (
              <User size={28} color={color} fill={focused ? color : "none"} />
            ),
            tabBarLabel: "Mi Perfil",
            tabBarHideOnKeyboard: true,
            headerTitleAlign: "center",
          }}
        />
      </Tabs>
    </>
  );
}
