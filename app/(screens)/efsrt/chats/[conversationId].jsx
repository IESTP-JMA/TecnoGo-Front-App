import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Send } from "lucide-react-native";
import { Stack, useLocalSearchParams } from "expo-router";

const MessageBubble = ({ message, isSent }) => (
  <View
    className={`max-w-[80%] rounded-2xl px-3 py-2 mb-2 ${isSent ? "bg-green-200 self-end" : "bg-white self-start"}`}
  >
    <Text className="text-green-800 font-SenRegular text-base">
      {message.text}
    </Text>
    <Text
      className={`text-xs font-SenRegular mt-1 ${isSent ? "text-right" : "text-left"} text-green-600`}
    >
      {message.time}
    </Text>
  </View>
);

export default function ConversationScreen() {
  const { conversationId } = useLocalSearchParams();
  const { conversationName } = useLocalSearchParams();
  const [inputMessage, setInputMessage] = useState("");

  const [messages, setMessages] = useState([
    { id: "1", text: "Buenos tardes", time: "10:30 AM", sent: false },
    { id: "2", text: "Si, Buenas tardes", time: "10:35 AM", sent: true },
    {
      id: "3",
      text: "Quería hablar sobre mis formaciones prácticas en situaciones reales de trabajo.",
      time: "10:35 AM",
      sent: false,
    },
    {
      id: "4",
      text: "Claro, ¿qué necesitas saber?",
      time: "10:37 AM",
      sent: true,
    },
  ]);

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputMessage.trim(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sent: true,
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <Stack.Screen options={{ headerTitle: conversationName }} />
      <FlatList
        className="p-4 bg-[#E6F2EC]"
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageBubble message={item} isSent={item.sent} />
        )}
      />

      <View className="border-t border-green-200 bg-white px-4 py-2">
        <View className="flex-row items-center">
          <TextInput
            className="flex-1 bg-green-100 rounded-full px-4 py-2 mr-2 text-green-800"
            placeholder="Escribe un mensaje"
            placeholderTextColor="#2F855A"
            value={inputMessage}
            onChangeText={setInputMessage}
          />
          <TouchableOpacity onPress={sendMessage}>
            <Send size={24} color="#2F855A" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
