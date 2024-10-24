import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native";

const ChatItem = ({ name, module, message, time, image }) => (
  <Pressable className="flex-row items-center py-4 px-4 border-b border-green-100">
    <Image source={{ uri: image }} className="w-12 h-12 rounded-full mr-4" />
    <View className="flex-1">
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-lg font-semibold text-green-800">{name}</Text>
        <Text className="text-sm text-green-600">{time}</Text>
      </View>
      <View className="flex-row justify-between items-center">
        <Text className="text-sm text-green-700" numberOfLines={1}>
          {message}
        </Text>
        <View
          className={`px-2 py-1 rounded-full ${
            module === "I modulo"
              ? "bg-green-500"
              : module === "II modulo"
                ? "bg-blue-500"
                : "bg-yellow-500"
          }`}
        >
          <Text className="text-xs text-white font-medium">{module}</Text>
        </View>
      </View>
    </View>
  </Pressable>
);
export default function EnhancedChatList() {
  const chats = [
    {
      name: "Juan Perez",
      module: "III modulo",
      message: "Recibimos tu documento...",
      time: "10:30 AM",
      image: "https://i.pravatar.cc/150?img=11",
    },
    {
      name: "Maria Espinoza",
      module: "II modulo",
      message: "Documento aprobado.",
      time: "Ayer",
      image: "https://i.pravatar.cc/150?img=5",
    },
    {
      name: "Mateo Alvarado",
      module: "I modulo",
      message: "Finalizado. ¡Todo bien!",
      time: "10/05/24",
      image: "https://i.pravatar.cc/150?img=8",
    },
  ];
  const router = useRouter();

  useEffect(() => {
    router.setParams({ headerTitle: "Chats" });
  }, [router]);

  return (
    <ScrollView className="flex-1 bg-[#E6F2EC]">
      <Stack.Screen options={{ headerTitle: "asd" }} />
      {chats.map((chat) => (
        <ChatItem key={chat.module} {...chat} />
      ))}
    </ScrollView>
  );
}
