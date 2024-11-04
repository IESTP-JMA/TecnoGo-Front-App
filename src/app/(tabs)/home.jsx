import { View, Text, Pressable, ScrollView } from "react-native";
import { Link } from "expo-router";
import {
  CalendarIcon,
  DocumentCheckIcon,
  DocumentPlusIcon,
  UserFolderIcon,
} from "@components/Icons";

export default function IndexHome() {
  return (
    <ScrollView className="flex-1 bg-[#e5f5f3] px-4 py-6">
      <View className="flex-row flex-wrap justify-evenly">
        {[
          {
            isDisabled: false,
            icon: "document-text-outline",
            text: "Iniciar un nuevo tramite",
            path: "tramites/start",
            IconComponent: DocumentPlusIcon,
          },
          {
            isDisabled: false,
            icon: "folder-outline",
            text: "Mis EFSRT",
            path: "efsrt",
            IconComponent: UserFolderIcon,
          },
          {
            isDisabled: true,
            icon: "calendar-outline",
            text: "Mis Horarios",
            path: "tramites/start",

            IconComponent: CalendarIcon,
          },
          {
            isDisabled: true,
            icon: "folder-outline",
            text: "Mis calificaciones",
            path: "tramites/start",

            IconComponent: DocumentCheckIcon,
          },
        ].map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className="bg-white w-[40%]"
            asChild
          >
            <Pressable
              disabled={item.isDisabled}
              className={`${item.isDisabled ? "opacity-50" : "opacity-100 shadow"}  rounded-lg p-4 items-center justify-between mb-4   active:scale-110`}
            >
              <item.IconComponent size={72} accentColor="#9f1239" />

              <Text className="flex-1 text-md text-center text-[#005e54] justify-center">
                {item.text}
              </Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}
