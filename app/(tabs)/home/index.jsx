import { View, Text, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function IndexHome() {
  const router = useRouter();
  return (
    <ScrollView className="flex-1 bg-[#e5f5f3] p-4">
      <View className="flex-row flex-wrap justify-evenly">
        {[
          {
            isDisabled: false,
            icon: "document-text-outline",
            text: "Iniciar un nuevo tramite",
            path: "../../(screens)/tramites",
            headerTitle: "Mis Tramites",
          },
          {
            isDisabled: false,
            icon: "folder-outline",
            text: "Mis EFSRT",
            path: "../../(screens)/efsrt",
            headerTitle: "Mis EFSRT",
          },
          {
            isDisabled: true,
            icon: "calendar-outline",
            text: "Mis Horarios",
          },
          {
            isDisabled: true,
            icon: "folder-outline",
            text: "Mis calificaciones",
          },
        ].map((item, index) => (
          <Pressable
            onPress={() => {
              router.push({
                pathname: item.path,
                params: { headerTitle: item.headerTitle },
              });
              console.log(item.path);
            }}
            key={index}
            disabled={item.isDisabled}
            className={`${item.isDisabled ? "opacity-50" : "opacity-100"} w-[45%] min-h-500 bg-white rounded-lg p-4 items-center justify-center mb-4 shadow active:opacity-50`}
          >
            <Ionicons name={item.icon} size={42} color="#005e54" />
            <Text className="mt-2 text-sm text-center text-[#005e54]">
              {item.text}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
