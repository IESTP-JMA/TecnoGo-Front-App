import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Share,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const documents = [
  {
    id: "1",
    title: "Ejemplo Documento",
    date: "05/12/2020",
    time: "20:18",
    type: "pdf",
    urlDownload: "https://example.com/document1.pdf",
  },
  {
    id: "2",
    title: "Ejemplo Documento 2",
    date: "01/03/2023",
    time: "05:00",
    type: "doc",
    urlDownload: "https://example.com/document2.doc",
  },
  {
    id: "3",
    title: "Ejemplo Documento 3",
    date: "05/12/2020",
    time: "08:05",
    type: "xls",
    urlDownload: "https://example.com/document3.xls",
  },
  {
    id: "4",
    title: "Ejemplo Documento 4",
    date: "08/10/2024",
    time: "21:00",
    type: "doc",
    urlDownload: "https://example.com/document4.doc",
  },
];

export default function DocumentList() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocuments = documents.filter((doc) =>
    // eslint-disable-next-line prettier/prettier
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return "document-text";
      case "doc":
        return "document-text-outline";
      case "xls":
        return "grid-outline";
      default:
        return "document-outline";
    }
  };

  const getFileColor = (type) => {
    switch (type) {
      case "pdf":
        return "text-red-500";
      case "doc":
        return "text-blue-500";
      case "xls":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const downloadFile = async (url, filename) => {
    const result = await FileSystem.downloadAsync(
      url,
      // eslint-disable-next-line prettier/prettier
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
      const result = await Share.share({
        title: title,
        message: url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("shared with activity type of", result.activityType);
        } else {
          console.log("shared");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("dismissed");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View className="bg-white rounded-lg p-4 mb-4 shadow-md flex-row items-center">
      <View className="mr-4">
        <Ionicons
          name={getFileIcon(item.type)}
          size={24}
          className={getFileColor(item.type)}
        />
      </View>
      <View className="flex-1">
        <Text className="text-lg font-semibold">{item.title}</Text>
        <View className="flex-row items-center mt-1">
          <Ionicons
            name="cloud-outline"
            size={16}
            className="text-gray-500 mr-1"
          />
          <Text className="text-sm text-gray-500">
            {item.date} {item.time}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => shareFile(item.urlDownload, item.title)}
        className="mr-4"
      >
        <Ionicons
          name="share-social-outline"
          size={24}
          className="text-gray-500"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => downloadFile(item.urlDownload, item.title)}
      >
        <Ionicons name="download-outline" size={24} className="text-gray-500" />
      </TouchableOpacity>
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
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
