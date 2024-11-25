import { Text, Modal, Pressable, View, FlatList } from "react-native";
import { useProcedures } from "@/contexts/ProceduresContext";
import { ProcedureTypes } from "@/constants/ProcedureTypes";
import { formatPrettyDate } from "@/utils/utilsFunctions";

export default function ProcedureModal({ dataDisplay }) {
  const { modalVisible, setModalVisible } = useProcedures();
  const procedureType = ProcedureTypes[dataDisplay.procedureType];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <Pressable
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        className="flex-1 justify-center items-center"
        onPress={() => setModalVisible(false)}
      >
        <View
          style={{
            width: "85%",
            maxHeight: "80%",
            backgroundColor: "#ecfdf5",
          }}
          className="rounded-md p-6 shadow-md"
        >
          <FlatList
            ListHeaderComponent={
              <>
                <Text className="text-slate-600 text-right text-xs mb-2">
                  ID: {dataDisplay.uuid}
                </Text>
                <Text className="text-lg font-bold text-center mb-4">
                  {dataDisplay.procedureName}
                </Text>
              </>
            }
            data={procedureType.inputs}
            keyExtractor={(item) => item.id}
            renderItem={({ item: input }) => (
              <View className="mb-4">
                <Text className="font-semibold mb-1">{input.label}</Text>
                <View className="flex-row items-center gap-2">
                  {input.icon && <input.icon size={20} color="black" />}
                  <Text>
                    {input.type === "date"
                      ? formatPrettyDate(dataDisplay.additionalData?.[input.id])
                      : dataDisplay.additionalData?.[input.id]}
                  </Text>
                </View>
              </View>
            )}
          />
          <Pressable
            className="bg-emerald-600 rounded-md px-4 py-2 mt-4"
            onPress={() => setModalVisible(false)}
          >
            <Text className="text-white text-center">Cerrar</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}
