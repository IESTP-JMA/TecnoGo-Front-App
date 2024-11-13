import { Text, Image, StatusBar, Pressable } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { HomeIcon, HomeIconOutline } from "../../components/Icons";
import { Bell, User } from "lucide-react-native";
import AvatarPlaceHolder from "../../components/AvatarPlaceHolder";
import { useUser } from "@/contexts/UserContext";

export default function TabsLayout() {
  const router = useRouter();
  const { user } = useUser();

  return (
    <>
      <StatusBar backgroundColor="#064E3B" barStyle="light-content" />

      <Tabs
        screenOptions={{
          headerTintColor: "#065F46",
          headerTitleStyle: {
            fontFamily: "SenBold",
            color: "#064E3B",
            fontSize: 23,
          },
          tabBarActiveTintColor: "#881337",
          tabBarStyle: {
            position: "absolute",
            paddingBottom: 5,
            paddingTop: 5,
            height: 55,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            // marginHorizontal: 45,
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
              height: 90,
              backgroundColor: "#064E3B",
            },
            headerLeft: () => (
              <Pressable
                className="pl-2"
                onPress={() => router.push("profile")}
              >
                {user.urlImage ? (
                  <Image
                    className="rounded-full w-14 h-14"
                    source={{ uri: user.urlImage }}
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
                  Hola, {user.firstNames} 👋
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
