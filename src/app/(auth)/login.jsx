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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { isLoginVisible, setLoginVisible } = useLoginContext();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    // eslint-disable-next-line prettier/prettier
    "Por favor, ingrese un correo electrónico válido."
  );
  const router = useRouter();
  const { mutate, isPending } = useSendOTP({
    onSuccess: async (data) => {
      if (!data) {
        setErrorMessage("Internal Server Error");
        setShowError(true);
        return;
      }
      const dataJson = await data.json();
      console.log(dataJson);
      if (dataJson.success) {
        setLoginVisible(false);
        router.push({
          pathname: "/otp",
          params: { email, otpId: dataJson.otpId },
        });
      } else {
        setErrorMessage("Error al generar el OTP");
        setShowError(true);
      }
    },
  });
  useEffect(() => {
    setIsValidEmail(emailRegex.test(email));
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
              {showError && (
                <Text className="text-red-500 text-xs my-1">
                  {errorMessage}
                </Text>
              )}
              <Pressable
                className="relative flex-row bg-emerald-600 py-1 px-4 mt-3 gap-3 rounded-md items-center justify-center active:opacity-80"
                onPress={() => {
                  if (isPending) return;
                  if (isValidEmail) {
                    setShowError(false);
                    mutate(email);
                  } else {
                    setShowError(true);
                  }
                }}
              >
                <Text className="text-white text-center font-SenMedium text-lg">
                  {isPending ? <CircleLoader /> : "Ingresar"}
                </Text>

                {!isPending && (
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
