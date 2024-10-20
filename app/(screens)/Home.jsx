import React from "react";
import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  return (
    <View>
      <Text>Dentro de HOME</Text>
    </View>
    // <ScrollView className="flex-1 bg-[#e5f5f3] p-4">
    //   <View className="flex-row flex-wrap justify-evenly">
    //     {[
    //       {
    //         isDisabled: false,
    //         icon: "document-text-outline",
    //         text: "Iniciar un nuevo tramite",
    //       },
    //       { isDisabled: false, icon: "folder-outline", text: "Mis EFSRT" },
    //       { isDisabled: true, icon: "calendar-outline", text: "Mis Horarios" },
    //       {
    //         isDisabled: true,
    //         icon: "folder-outline",
    //         text: "Mis calificaciones",
    //       },
    //     ].map((item, index) => (
    //       <Pressable
    //         key={index}
    //         disabled={item.isDisabled}
    //         className={`${item.isDisabled ? "opacity-50" : "opacity-100"} w-[45%] min-h-500 bg-white rounded-lg p-4 items-center justify-center mb-4 shadow active:opacity-50`}
    //       >
    //         <Ionicons name={item.icon} size={42} color="#005e54" />
    //         <Text className="mt-2 text-sm text-center text-[#005e54]">
    //           {item.text}
    //         </Text>
    //       </Pressable>
    //     ))}
    //   </View>
    // </ScrollView>
  );
}
