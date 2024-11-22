import React, { useState } from "react";
import { View, Text, FlatList, TextInput, Pressable } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Cloud, Download, FileText, Forward } from "lucide-react-native";
import { formatDate } from "@/utils/utilsFunctions";

const documents = [
  {
    uuid: "1",
    title: "Ejemplo Documento",
    completedDate: 1732249207000,
    downloadUrl: "https://example.com/document1.pdf",
  },
  {
    uuid: "2",
    title: "Ejemplo Documento 2",
    completedDate: 1732249207000,
    downloadUrl: "https://example.com/document2.doc",
  },
  {
    uuid: "3",
    title: "Ejemplo Documento 3",
    completedDate: 1732249207000,
    downloadUrl: "https://example.com/document3.xls",
  },
  {
    uuid: "4",
    title: "Ejemplo Documento 4",
    completedDate: 1732249207000,
    downloadUrl: "https://example.com/document4.doc",
  },
];

export default function DocumentList() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const downloadFile = async (url, filename) => {
    const result = await FileSystem.downloadAsync(
      url,
      FileSystem.documentDirectory + filename
    );

    if (result.status === 200) {
      alert("File downloaded successfully!");
    } else {
      alert("Failed to download file.");
    }
  };

  const shareFile = async (url, title) => {
    try {
      // Descargar el archivo al directorio temporal del dispositivo
      const fileUri = FileSystem.cacheDirectory + title; // Nombre del archivo
      console.log(fileUri);
      console.log(FileSystem.documentDirectory);
      const downloadedFile = await FileSystem.downloadAsync(url, fileUri);

      if (await Sharing.isAvailableAsync()) {
        // Compartir el archivo descargado
        await Sharing.shareAsync(downloadedFile.uri, {
          mimeType: "application/pdf", // Cambia según el tipo de archivo
          dialogTitle: title,
        });
        console.log("Archivo compartido con éxito");
      } else {
        console.error(
          "El uso compartido no está disponible en este dispositivo"
        );
      }
    } catch (error) {
      console.error("Error al compartir el archivo:", error);
      alert("No se pudo compartir el archivo: " + error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View className="bg-white rounded-lg p-4 mb-4 shadow-md flex-row items-center">
      <View className="mr-4">
        <FileText color="#007AFF" size={54} strokeWidth={1} />
      </View>
      <View className="flex-1 gap-1.5">
        <Text className="text-lg font-semibold">{item.title}</Text>
        <View className="flex-row items-center gap-1">
          <Cloud size={18} color="#6b7280" />
          <Text className="text-sm text-gray-500">
            {formatDate(item.completedDate)}
          </Text>
        </View>
      </View>
      <Pressable
        onPress={() => shareFile(item.downloadUrl, item.title)}
        className="mr-4"
      >
        <Forward size={24} color="#6b7280" />
      </Pressable>
      <Pressable onPress={() => downloadFile(item.downloadUrl, item.title)}>
        <Download size={24} color="#6b7280" />
      </Pressable>
    </View>
  );

  return (
    <View className="flex-1 bg-[#e6f2ec] p-4">
      <View className="mb-4">
        <TextInput
          className="bg-white rounded-full px-4 py-2 shadow-sm"
          placeholder="Busca un documento"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredDocuments}
        renderItem={renderItem}
        keyExtractor={(item) => item.uuid}
      />
    </View>
  );
}
