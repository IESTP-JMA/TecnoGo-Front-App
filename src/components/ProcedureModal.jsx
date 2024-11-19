import { Text, Modal, Pressable } from "react-native";
import { useProcedures } from "@/contexts/ProceduresContext";

export function ProcedureModal({ dataDisplay }) {
  const { modalVisible, setModalVisible } = useProcedures();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <Pressable
        className="flex-1 justify-center items-center p-2"
        onPress={() => setModalVisible(false)}
      >
        <Pressable
          className="bg-blue-500 rounded-md p-6 shadow-md"
          onPress={() => {}}
        >
          <Text className="text-white font-SenBo text-md mb-4">
            id: {dataDisplay.uuid}
          </Text>
          <Text className="text-white mb-4">
            This is an example of a transparent modal in React Native with
            NativeWind.
          </Text>
          <Pressable
            className="bg-blue-800 rounded-md px-4 py-2"
            onPress={() => setModalVisible(false)}
          >
            <Text className="text-white">Close</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
