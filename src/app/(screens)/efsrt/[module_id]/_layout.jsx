import { Link, Stack, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function EfsrtLaoyout() {
  const pathname = usePathname();
  const tabs = [
    { id: "informacion", title: "Informacion", href: "./informacion" },
    { id: "itinerario", title: "Itinerario", href: "./itinerario" },
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
      <Stack.Screen options={{ headerTitle: "I Modulo" }} />
      <Navbar />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="informacion" />
        <Stack.Screen name="itinerario" />
      </Stack>
    </>
  );
}
