import { Link, Stack, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function IndexTramites() {
  const pathname = usePathname();

  const tabs = [
    { id: "start", title: "Iniciar", href: "./start" },
    { id: "progress", title: "Progreso", href: "./progress" },
    { id: "response", title: "Respuesta", href: "./response" },
  ];
  const isActive = (route) => pathname.includes(route);

  const Navbar = () => {
    return (
      <View className="flex-row justify-evenly bg-[#E6F2EC] px-3">
        {tabs.map(({ id, title, href }) => (
          <Link key={id} href={href} className="flex-1" asChild>
            <Pressable
              className={isActive(id) ? "border-b border-emerald-800" : ""}
            >
              <Text
                className={`font-SenRegular pb-2 text-base text-center ${
                  isActive(id) ? "text-emerald-800" : "text-neutral-500"
                }`}
              >
                {title}
              </Text>
            </Pressable>
          </Link>
        ))}
      </View>
    );
  };
  return (
    <>
      <Navbar />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="start" />
        <Stack.Screen name="progress" />
        <Stack.Screen name="response" />
      </Stack>
    </>
  );
}