import React from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";

export default function LoginModal() {
  // const [email, setEmail] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    router.push("/OTP");
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={() => {}}
    >
      <TouchableWithoutFeedback onPress={() => {}}>
        <View className="flex-1 justify-center items-center">
          <View className="bg-[#E6F2EC] p-4 rounded-lg w-4/5 max-w-lg">
            <View className="items-center mb-4 gap-3">
              <Image
                source={require("../../assets/Logo.png")}
                style={{ width: 127, height: 126 }}
              />
              <Text className="text-3xl font-SenSemiBold text-green-700">
                TecnoGO
              </Text>
            </View>
            <View>
              <Text className="text-sm  text-gray-600 mb-2">DNI / Correo</Text>
              <TextInput
                className="bg-white border border-gray-300 rounded-md p-2 mb-4"
                placeholder="ejemplo@email.com"
                keyboardType="email-address"
              />
              <Pressable
                className="bg-emerald-600 py-3 rounded-md items-center"
                onPress={handleLogin}
              >
                <Text className="text-white font-bold text-lg">Ingresar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
