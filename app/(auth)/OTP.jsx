import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function OTP() {
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
    router.replace("/(screens)/Home");
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View>
      <Text className="text-2xl font-bold text-green-700 mb-4">
        Verificación OTP
      </Text>
      <Text className="mb-4">
        Ingrese el código de 6 dígitos enviado a su correo electrónico
      </Text>
      <View className="flex-row justify-between mb-4">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            className="w-12 h-12 border border-gray-300 rounded-md text-center text-lg"
            maxLength={1}
            keyboardType="number-pad"
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
          />
        ))}
      </View>
      <Text className="text-center mb-4">
        Tiempo restante: {formatTime(timer)}
      </Text>
      <Pressable
        className="bg-green-700 py-3 rounded-md items-center"
        onPress={handleVerify}
      >
        <Text className="text-white font-bold text-lg">Verificar</Text>
      </Pressable>
      <Pressable className="mt-4 items-center" onPress={() => setTimer(150)}>
        <Text className="text-green-700">Reenviar</Text>
      </Pressable>
    </View>
  );
}
