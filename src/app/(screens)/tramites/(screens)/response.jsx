import { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, Pressable } from "react-native";
import * as Sharing from "expo-sharing";
import {
  Cloud,
  Download,
  FileText,
  Forward,
  Search,
  Trash2,
} from "lucide-react-native";
import { formatDate } from "@/utils/utilsFunctions";
import { Directory, File, Paths } from "expo-file-system/next";
import { useGetProceduresResponse } from "@/hooks/useProceduresMutation";
import LoadingSnackBar from "@components/LoadingSnackBar";
import { useProcedures } from "@/contexts/ProceduresContext";
import { CircleLoaderAnimated } from "@components/IconsAnimated";

export default function Response() {
  const { isFetching } = useGetProceduresResponse();
  const { proceduresResponse } = useProcedures();
  const [searchQuery, setSearchQuery] = useState("");
  const [downloadedFiles, setDownloadedFiles] = useState({});
  const [downloadingFiles, setDownloadingFiles] = useState({});

  useEffect(() => {
    const checkExistingFiles = async () => {
      const downloadStatus = {};
      for (const doc of proceduresResponse) {
        if (doc.fileExtension) {
          const file = new File(
            Paths.document,
            `${doc.uuid}.${doc.fileExtension}`
          );
          downloadStatus[doc.uuid] = await file.exists;
        }
      }
      setDownloadedFiles(downloadStatus);
    };

    checkExistingFiles();
  }, [proceduresResponse]);

  const filteredDocuments = proceduresResponse.filter((doc) =>
    doc.procedureName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const downloadFile = async (downloadBaseUrl, uuid, fileExtension) => {
    if (!downloadBaseUrl) return;
    try {
      setDownloadingFiles((prev) => ({
        ...prev,
        [uuid]: true,
      }));

      const procedureFile = await File.downloadFileAsync(
        `${downloadBaseUrl}${uuid}.${fileExtension}`,
        new Directory(Paths.document)
      );
      if (procedureFile.exists) {
        console.log(`File Downloaded -> ${uuid}.${fileExtension}`);
        setDownloadedFiles((prev) => ({
          ...prev,
          [uuid]: true,
        }));
      } else {
        console.log("Failed to download file.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDownloadingFiles((prev) => ({
        ...prev,
        [uuid]: false,
      }));
    }
  };

  const shareFile = async (uuid, fileExtension, procedureName) => {
    try {
      const fileToShare = new File(Paths.document, `${uuid}.${fileExtension}`);
      console.log("fileToShare: ", fileToShare);
      if (await Sharing.isAvailableAsync()) {
        const tempFile = new File(
          Paths.cache,
          `${encodeURI(procedureName)}.${fileExtension}`
        );
        if (tempFile.exists) {
          tempFile.delete();
        }
        fileToShare.copy(tempFile);
        await Sharing.shareAsync(tempFile.uri, {
          mimeType: "application/pdf",
          dialogTitle: procedureName,
        });
      } else {
        console.error("The sharing API is not available");
      }
    } catch (error) {
      console.error("Error al compartir el archivo:", error);
    }
  };

  const deleteFile = async (uuid, fileExtension) => {
    try {
      const file = new File(Paths.document, `${uuid}.${fileExtension}`);
      file.delete();
      setDownloadedFiles((prev) => ({
        ...prev,
        [uuid]: false,
      }));
      console.log("deleted -> ", file);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => {
    const isProcedureDownloaded = downloadedFiles[item.uuid];
    const isDownloading = downloadingFiles[item.uuid];
    const canDownload = item.downloadBaseUrl && item.fileExtension;
    return (
      <View className="bg-white rounded-lg px-3 py-4 mb-4 shadow-md flex-row items-center">
        <View className="mr-4">
          <FileText color="#007AFF" size={54} strokeWidth={1} />
        </View>
        <View className="flex-1 gap-1.5">
          <Text className="text-lg font-semibold">{item.procedureName}</Text>
          <View className="flex-row items-center gap-1">
            <Cloud size={18} color="#6b7280" />
            <Text className="text-sm text-gray-500">
              {formatDate(item.completedDate)}
            </Text>
          </View>
        </View>
        <View className="flex-row gap-2">
          {isProcedureDownloaded && (
            <Pressable
              onPress={() => {
                shareFile(item.uuid, item.fileExtension, item.procedureName);
              }}
            >
              <Forward size={24} color="#6b7280" />
            </Pressable>
          )}
          {isProcedureDownloaded ? (
            <Pressable
              onPress={() => deleteFile(item.uuid, item.fileExtension)}
            >
              <Trash2 size={24} color="#ef4444" />
            </Pressable>
          ) : (
            canDownload && (
              <Pressable
                onPress={() =>
                  downloadFile(
                    item.downloadBaseUrl,
                    item.uuid,
                    item.fileExtension
                  )
                }
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <CircleLoaderAnimated />
                ) : (
                  <Download size={24} color="#6b7280" />
                )}
              </Pressable>
            )
          )}
        </View>
      </View>
    );
  };

  return (
    <>
      {isFetching && <LoadingSnackBar />}
      <View className="flex-1 bg-[#e6f2ec] p-4">
        <View className="flex-row gap-1.5 mb-4  bg-white rounded-full px-4 py-3 shadow-sm">
          <Search color="#d1d5db" />
          <TextInput
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
    </>
  );
}
