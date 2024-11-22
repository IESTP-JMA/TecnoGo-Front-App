import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import { useGetProceduresInProgress } from "@/hooks/useProceduresMutation";
import { useEffect, useState } from "react";
import { Eye, FileText } from "lucide-react-native";
import { useProcedures } from "@/contexts/ProceduresContext";
import ProcedureModal from "@components/ProcedureModal";
import { formatDate } from "@/utils/utilsFunctions";
import LoadingSnackBar from "@components/LoadingSnackBar";
import SnackBar from "@components/SnackBar";
import { useLocalSearchParams } from "expo-router";
import { useSnackBar } from "@/contexts/SnackBarContext";

export default function DocumentRequestsList() {
  const { message, setMessage } = useSnackBar();
  const { messageSnackBar } = useLocalSearchParams();
  const { proceduresInProgress } = useProcedures();
  const { setModalVisible } = useProcedures();
  const [dataDisplay, setDataDisplay] = useState({});
  const { isFetching } = useGetProceduresInProgress();

  useEffect(() => {
    if (messageSnackBar) {
      setMessage(messageSnackBar);
    }
  }, []);

  const renderItem = ({ item }) => (
    <View className="flex-row bg-white rounded-lg p-4 mb-4 shadow-md">
      <View className="mr-2 justify-center">
        <FileText size={54} color="#007AFF" strokeWidth={1} />
      </View>
      <View className="flex-1 gap-1.5">
        <Text className="text-base font-SenSemiBold">
          Solicitud de {item.procedureName}
        </Text>
        <Text className="text-sm text-gray-600">
          Fecha de envío: {formatDate(item.submissionDate)}
        </Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-sm font-medium text-green-600">
            Estado: {item.isCompleted === 0 && "En Proceso"}
          </Text>
          {item.additionalData && (
            <Pressable
              className="flex-row items-center justify-center gap-0.5 active:opacity-60"
              onPress={() => {
                if (!item.additionalData) return;
                setDataDisplay(item);
                setModalVisible(true);
              }}
            >
              <Eye color="#3b82f6" size={18} />
              <Text className="text-sm text-blue-500">Ver tramite</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <>
      {isFetching && <LoadingSnackBar />}
      {message && !isFetching && <SnackBar />}
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
      {Object.keys(dataDisplay).length > 0 && (
        <ProcedureModal dataDisplay={dataDisplay} />
      )}
    </>
  );
}
