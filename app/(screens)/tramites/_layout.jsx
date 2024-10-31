import { Link, Stack, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function TramitesLayout() {
  const pathname = usePathname();

  const isActive = (route) => pathname.includes(route);

  const tabs = [
    { id: "start", title: "Iniciar", href: "tramites/start" },
    { id: "progress", title: "Progreso", href: "tramites/progress" },
    { id: "response", title: "Respuesta", href: "tramites/response" },
  ];
  return (
    <>
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
      <View className="flex-1">
        <Stack
          screenOptions={{
            animation: "slide_from_right",
          }}
        />
      </View>
    </>
  );
}
