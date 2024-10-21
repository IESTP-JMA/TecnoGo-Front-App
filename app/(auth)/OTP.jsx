import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { ArrowLeftIcon } from "../../components/Icons";
import { useLoginContext } from "../../contexts/LoginContext";
import { useAuth } from "../../contexts/AuthContext";

export default function OTP() {
  const { login } = useAuth();
  const { email } = useLocalSearchParams();
  const { setLoginVisible } = useLoginContext();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(150); // 2:30 in seconds
  const router = useRouter();

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerify = () => {
    login(email);
    router.replace("/(screens)/Home");
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Modal animationType="fade" transparent={true} onRequestClose={() => {}}>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View className="flex-1 justify-center items-center">
          <View className="bg-[#E6F2EC] p-4 rounded-lg w-80 ">
            <View className=" flex-row justify-between items-center">
              <Pressable
                className="rounded-full py-1 px-2 active:bg-green-300"
                onPress={() => {
                  setLoginVisible(true);
                  router.back();
                }}
              >
                <ArrowLeftIcon />
              </Pressable>
              <Image
                source={require("../../assets/Logo.png")}
                style={{ width: 52, height: 51.9 }}
              />
            </View>
            <Text className="text-center text-3xl font-SenSemiBold text-green-800 mt-4">
              Verificación OTP
            </Text>
            <Text className="font-SenRegular text-gray-600 text-center my-6">
              Ingrese el código de 6 dígitos enviado a su correo electrónico:{" "}
              <Text className="font-SenMedium text-emerald-800">{email}</Text>
            </Text>
            <View className="flex-row justify-between">
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  className="w-10 h-10 bg-white border border-gray-300 focus:border-green-500 rounded-md text-center text-lg font-SenSemiBold"
                  maxLength={1}
                  keyboardType="number-pad"
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                />
              ))}
            </View>
            <Text className="text-center font-SenRegular mb-4 mt-1">
              Tiempo restante: {formatTime(timer)}
            </Text>
            <Pressable
              className="bg-emerald-600 py-1 rounded-md items-center"
              onPress={handleVerify}
            >
              <Text className="text-white font-SenMedium text-lg">
                Verificar
              </Text>
            </Pressable>
            <Text className="text-center font-SenRegular text-sm mt-4">
              ¿No recibiste el código?
            </Text>
            <Pressable
              className="mt-2 items-center"
              onPress={() => setTimer(150)}
            >
              <Text className="text-green-700 font-SenMedium text-base">
                Reenviar
              </Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
