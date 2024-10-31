import { Link, Stack, usePathname, useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import Apunte from "./apuntes/index";

export default function EfsrtLaoyout() {
  const pathname = usePathname();
  const tabs = [
    {
      id: "informacion",
      title: "Informacion",
      href: "./informacion",
    },
    {
      id: "itinerario",
      title: "Itinerario",
      href: "./itinerario",
    },
  ];

  const isActive = (route) => pathname.includes(route);

  const Navbar = () => {
    return (
      <View className="flex-row justify-evenly bg-[#e6f2ec] px-3">
        {tabs.map(({ id, title, href }) => (
          <Link key={id} href={href} className="py-2.5 flex-1" asChild>
            <Pressable
              className={isActive(id) ? "border-b border-emerald-800" : ""}
            >
              <Text
                className={`font-SenRegular text-base text-center ${
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
        {/* <Stack.Screen
          name="apuntes/index"
          options={{ presentation: "modal", animation: "fade" }}
        /> */}
      </Stack>
    </>
  );
}

// import { Link, Stack, usePathname, useRouter } from "expo-router";
// import { Pressable, Text, View } from "react-native";

// export default function EfsrtLaoyout() {
//   return (
//     <Stack
//       screenOptions={{
//         headerShown: true,
//         animation: "slide_from_right",
//       }}
//     />
//   );
// }
