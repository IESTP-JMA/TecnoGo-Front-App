import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

const ProgramInfo = ({
  location,
  startDate,
  endDate,
  supervisor,
  progress,
}) => {
  const { module_ID } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-[#e6f7f1] p-4 items-center justify-center">
      <View className="bg-white rounded-lg p-6 w-full max-w-sm shadow-md">
        <View className="mb-4">
          <Text className="text-lg font-bold text-[#2c3e50] mb-2">
            Lugar de Ejecución
          </Text>
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={20} color="#34495e" />
            <Text className="ml-2 text-[#34495e]">{location}</Text>
          </View>
        </View>

        <View className="flex-row justify-between mb-4">
          <View>
            <Text className="text-sm font-semibold text-[#2c3e50] mb-1">
              Fecha de Inicio
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={16} color="#34495e" />
              <Text className="ml-1 text-[#34495e]">{startDate}</Text>
            </View>
          </View>
          <View>
            <Text className="text-sm font-semibold text-[#2c3e50] mb-1">
              Fecha de Finalización
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={16} color="#34495e" />
              <Text className="ml-1 text-[#34495e]">{endDate}</Text>
            </View>
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-sm font-semibold text-[#2c3e50] mb-1">
            Docente Supervisor
          </Text>
          <View className="flex-row items-center">
            <Ionicons name="person-outline" size={18} color="#34495e" />
            <Text className="ml-2 text-[#34495e]">{supervisor}</Text>
          </View>
        </View>

        <View>
          <Text className="text-sm font-semibold text-[#2c3e50] mb-2">
            Progreso
          </Text>
          <View className="bg-gray-200 h-2 rounded-full overflow-hidden">
            <View
              className="bg-[#ff6b6b] h-full rounded-full"
              style={{ width: `${progress}%` }}
            />
          </View>
          <Text className="text-right mt-1 text-[#34495e]">
            {progress}% Completado
          </Text>
        </View>
      </View>
    </View>
  );
};

export default function Component() {
  return (
    <ProgramInfo
      location="UGEL - Lucanas"
      startDate="25/08/24"
      endDate="25/09/24"
      supervisor="Jhoel Sunny"
      progress={80}
    />
  );
}
