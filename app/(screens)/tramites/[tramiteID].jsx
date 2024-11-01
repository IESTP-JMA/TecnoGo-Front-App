import { View, Text, Modal } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function TramiteModal() {
  const { tramiteID } = useLocalSearchParams();

  return (
    <Modal
      style={{ backgroundColor: "red" }}
      transparent
      onRequestClose={() => {
        router.back();
      }}
    >
      <View className="bg-blue-400 items-center justify-center">
        <View className="bg-red-400 p-4 ">
          <Text className="text-2xl font-bold mb-4">Detalles del Trámite</Text>
          <Text className="text-base">ID del trámite: {tramiteID}</Text>
          {/* Add more details and functionality here */}
        </View>
      </View>
    </Modal>
  );
}
