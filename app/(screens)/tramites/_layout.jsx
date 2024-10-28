import { Link, Stack } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function TramitesLayout() {
  const [activeTab, setActiveTab] = useState("Iniciar");

  const tabs = [
    { title: "Iniciar", href: "/(screens)/tramites/start" },
    { title: "Progreso", href: "/(screens)/tramites/progress" },
    { title: "Respuesta", href: "/(screens)/tramites/response" },
  ];
  return (
    <>
      <View className="flex-row justify-evenly bg-[#e6f2ec] px-3">
        {tabs.map(({ title, href }) => (
          <Link key={title} href={href} className="py-2.5 flex-1" asChild>
            <Pressable
              onPress={() => setActiveTab(title)}
              className={
                activeTab === title ? "border-b border-emerald-800" : ""
              }
            >
              <Text
                className={`font-SenRegular text-base text-center ${
                  activeTab === title ? "text-emerald-800" : "text-neutral-500"
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
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
      </View>
    </>
  );
}
