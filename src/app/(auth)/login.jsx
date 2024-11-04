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
import { useState, useEffect } from "react";
import { LogIn } from "lucide-react-native";
import { CircleLoader } from "../../components/IconsAnimated";
import { useSendOTP } from "@/hooks/useAuthMutations";

export default function LoginModal() {
  const { isLoginVisible, setLoginVisible } = useLoginContext();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { mutate, isLoading, error } = useSendOTP({
    onSuccess: (data) => {
      if (data.success) {
        setLoginVisible(false);
        router.push({
          pathname: "/otp",
          params: { email, otpId: data.otpId },
        });
      } else {
        setErrorMessage(data.message);
        throw new Error("Error en la solicitud");
      }
    },
  });
  useEffect(() => {
    validateEmail(email);
  }, [email]);

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsValidEmail(isValid);
    setShowError(!isValid);
    setErrorMessage(
      // eslint-disable-next-line prettier/prettier
      isValid ? "" : "Por favor, ingrese un correo electrónico válido."
    );
  }

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
                source={require("../../../assets/Logo.png")}
                style={{ width: 127, height: 126 }}
              />
              <Text className="text-3xl font-SenSemiBold text-green-800">
                TecnoGO
              </Text>
            </View>
            <Text className="font-SenRegular text-gray-600 text-center my-3">
              Una app diseñada para facilitar todos tus procesos académicos
            </Text>
            <View>
              <Text className="text-sm font-SenRegular text-gray-500 mb-1">
                Correo Electronico
              </Text>
              <TextInput
                className={`bg-white border border-zinc-300 rounded-md p-2 font-SenRegular text-base ${!isValidEmail && email !== "" ? "border-red-500" : ""}`}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Ingresa tu email"
              />
              {error ||
                showError ||
                (!isValidEmail && (
                  <Text className="text-red-500 text-xs my-1">
                    {errorMessage}
                  </Text>
                ))}
              <Pressable
                className="relative flex-row bg-emerald-600 py-1 px-4 mt-3 gap-3 rounded-md items-center justify-center active:opacity-80"
                onPress={() => {
                  if (isValidEmail) {
                    console.log("clicked Login");
                    // mutate(email);
                  } else {
                    setShowError(true);
                  }
                }}
              >
                <Text className="text-white text-center font-SenMedium text-lg">
                  {isLoading ? <CircleLoader /> : "Ingresar"}
                </Text>

                {!isLoading && (
                  <View className="absolute right-3">
                    <LogIn color="white" size={22} />
                  </View>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
