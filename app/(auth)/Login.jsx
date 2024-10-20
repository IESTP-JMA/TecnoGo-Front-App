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
import { useLoginContext } from "../../contexts/LoginContext";
import { useState } from "react";

export default function LoginModal() {
  const { isLoginVisible, setLoginVisible, setOTPVisible } = useLoginContext();
  const [email, setEmail] = useState("");
  const router = useRouter();

  function handleLogin() {
    setLoginVisible(false);
    router.push("/OTP");
  }

  // useEffect(() => {
  //   setLoginVisible (true);
  // });
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isLoginVisible}
      onRequestClose={() => {}}
    >
      <TouchableWithoutFeedback onPress={() => {}}>
        <View className="flex-1 justify-center items-center">
          <View className="bg-[#E6F2EC] p-4 rounded-lg w-80 max-w-lg ">
            <View className="items-center gap-3">
              <Image
                source={require("../../assets/Logo.png")}
                style={{ width: 127, height: 126 }}
              />
              <Text className="text-3xl font-SenSemiBold text-green-800">
                TecnoGO
              </Text>
            </View>
            <Text className="font-SenRegular text-gray-600 text-center my-2">
              Una app diseñada para facilitar todos tus procesos académicos
            </Text>
            <View>
              <Text className="text-sm font-SenRegular text-gray-500 mb-2">
                DNI / Correo
              </Text>
              <TextInput
                className="bg-white border border-zinc-300 rounded-md p-2 mb-4"
                value={email}
                onChangeText={setEmail}
                placeholder="ejemplo@email.com"
                keyboardType="email-address"
              />
              <Pressable
                className="bg-emerald-600 py-1 rounded-md items-center"
                onPress={handleLogin}
              >
                <Text className="text-white font-SenMedium text-lg">
                  Ingresar
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
