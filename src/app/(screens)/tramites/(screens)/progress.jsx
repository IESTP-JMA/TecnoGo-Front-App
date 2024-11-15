import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useSnackBar } from "@/contexts/SnackBarContext";
import { useGetProceduresInProgress } from "@/hooks/useProceduresMutation";
import { useEffect } from "react";
import { FileText } from "lucide-react-native";
import { useProcedures } from "@/contexts/ProceduresContext";

export default function DocumentRequestsList() {
  const { proceduresInProgress } = useProcedures();

  const router = useRouter();
  const { setIsVisible, setIsMsgLoading } = useSnackBar();
  const { isPending } = useGetProceduresInProgress();

  useEffect(() => {
    setIsMsgLoading(isPending);
    setIsVisible(isPending);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    return date
      .toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(",", "");
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="flex-row bg-white rounded-lg p-4 mb-4 shadow-md"
      onPress={() => {
        router.push(`./${item.uuid}`);
      }}
    >
      <View className="mr-3 justify-center">
        <FileText size={52} color="#007AFF" strokeWidth={1.5} />
      </View>
      <View className="flex-1">
        <Text className="text-slate-600 text-right text-xs -mt-1">
          id: {item.uuid}
        </Text>

        <Text className="text-base font-SenSemiBold mb-1">
          Solicitud de {item.procedureName}
        </Text>
        <Text className="text-sm text-gray-600 mb-1">
          Fecha de envío: {formatDate(item.submissionDate)}
        </Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-sm font-medium text-green-600">
            Estado: {item.isCompleted === 0 && "En Proceso"}
          </Text>
          {false && (
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
      data={proceduresInProgress}
      renderItem={renderItem}
      keyExtractor={(item) => item.uuid}
      contentContainerStyle={{ padding: 16 }}
      ListEmptyComponent={() => (
        <Text className="font-SenRegular text-center text-slate-500 py-5">
          Aún no tienes Trámites en Progreso :(
        </Text>
      )}
    />
  );
}
