import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const documentRequests = [
  {
    tramiteID: "1",
    title: "Solicitud de Constancia",
    date: "2024-10-18",
    status: "En progreso",
  },
  {
    tramiteID: "2",
    title: "Solicitud de Carta de Presentación",
    date: "2024-10-18",
    status: "Completado",
    hasDocument: true,
  },
];

export default function DocumentRequestsList() {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="flex-row bg-white rounded-lg p-4 mb-4 shadow-md"
      onPress={() => {
        router.push(`./${item.tramiteID}`);
      }}
    >
      <View className="mr-4">
        <Ionicons name="document-text-outline" size={24} color="#007AFF" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-bold mb-1">{item.title}</Text>
        <Text className="text-sm text-gray-600 mb-1">
          Fecha de envío: {item.date}
        </Text>
        <View className="flex-row justify-between items-center">
          <Text
            className={`text-sm font-medium ${
              item.status === "En progreso"
                ? "text-orange-500"
                : "text-green-500"
            }`}
          >
            Estado: {item.status}
          </Text>
          {item.hasDocument && (
            <TouchableOpacity>
              <Text className="text-sm text-blue-500">Ver documento</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      className="bg-[#e6f2ec]"
      data={documentRequests}
      renderItem={renderItem}
      keyExtractor={(item) => item.tramiteID}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}
