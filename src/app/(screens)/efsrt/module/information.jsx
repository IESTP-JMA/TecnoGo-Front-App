import { View, Text } from "react-native";
import { CalendarRange, MapPin, User2 } from "lucide-react-native";
import { useGetModule } from "@/hooks/useEFSRTMutation";
import LoadingSnackBar from "@components/LoadingSnackBar";
import SnackBar from "@components/SnackBar";
import { useEffect } from "react";
import { useSnackBar } from "@/contexts/SnackBarContext";
import { formatDate } from "@/utils/utilsFunctions";
import { useEfsrtContext } from "@/contexts/efsrtContext";

const ProgramInfo = ({
  location,
  startDate,
  endDate,
  supervisor,
  progress,
  procedure_CDP_uuid,
}) => {
  return (
    <View className="bg-white rounded-lg p-6 w-full max-w-sm shadow-md">
      <Text className="text-base text-right text-[#2c3e50] -mt-3">
        Modulo N°: {procedure_CDP_uuid}
      </Text>
      <View className="mb-4">
        <Text className="text-sm font-semibold text-[#2c3e50] mb-2">
          Lugar de Ejecución
        </Text>
        <View className="flex-row items-center">
          <MapPin size={20} color="#34495e" />
          <Text className="ml-2 text-[#34495e]">{location}</Text>
        </View>
      </View>

      <View className="flex-row justify-between mb-4">
        <View>
          <Text className="text-sm font-semibold text-[#2c3e50] mb-1">
            Fecha de Inicio
          </Text>
          <View className="flex-row items-center">
            <CalendarRange size={16} color="#34495e" />
            <Text className="ml-1 text-[#34495e]">{startDate}</Text>
          </View>
        </View>
        <View>
          <Text className="text-sm font-semibold text-[#2c3e50] mb-1">
            Fecha de Finalización
          </Text>
          <View className="flex-row items-center">
            <CalendarRange size={16} color="#34495e" />
            <Text className="ml-1 text-[#34495e]">{endDate}</Text>
          </View>
        </View>
      </View>

      <View className="mb-4">
        <Text className="text-sm font-semibold text-[#2c3e50] mb-1">
          Docente Supervisor
        </Text>
        <View className="flex-row items-center">
          <User2 size={18} color="#34495e" />
          <Text className="ml-2 text-[#34495e]">
            {supervisor || "Aun no Asignado"}
          </Text>
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
  );
};

export default function Information() {
  const { moduleNumber, moduleData } = useEfsrtContext();
  const { message, setMessage, setType } = useSnackBar();

  const { isFetching } = useGetModule(moduleNumber);

  return (
    <View className="flex-1 bg-[#e6f7f1] p-4 items-center">
      {isFetching && <LoadingSnackBar />}
      {message && !isFetching && <SnackBar />}

      {moduleData && (
        <ProgramInfo
          location={moduleData.placeOfExecution}
          startDate={formatDate(moduleData.startDate)}
          endDate={formatDate(moduleData.endDate)}
          supervisor={moduleData.supervisor}
          progress={80}
          procedure_CDP_uuid={moduleNumber}
        />
      )}
    </View>
  );
}
