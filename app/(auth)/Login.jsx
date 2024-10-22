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
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

export default function LoginModal() {
  const { isLoginVisible, setLoginVisible } = useLoginContext();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [showError, setShowError] = useState(false);
  const router = useRouter();

  function handleLogin() {
    if (isValidEmail) {
      login(email);
      setLoginVisible(false);
      router.push({
        pathname: "/OTP",
        params: { email },
      });
    } else {
      setShowError(true);
    }
  }
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  }

  useEffect(() => {
    validateEmail(email);
  }, [email]);

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
                className={`bg-white border border-zinc-300 rounded-md p-2 font-SenRegular text-base ${!isValidEmail && email !== "" ? "border-red-500" : ""}`}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Ingresa tu email"
              />
              {showError && !isValidEmail && (
                <Text className="text-red-500 text-xs my-1">
                  Por favor, ingrese un correo electrónico válido.
                </Text>
              )}
              <Pressable
                className="bg-emerald-600 py-1 mt-3 rounded-md items-center "
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
