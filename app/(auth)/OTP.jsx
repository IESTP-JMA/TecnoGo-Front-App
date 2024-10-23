import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Modal,
  Keyboard,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { ArrowLeftIcon } from "../../components/Icons";
import { useLoginContext } from "../contexts/LoginContext";
import { useAuth } from "../contexts/AuthContext";

/* global clearTimeout setTimeout*/
export default function OTP() {
  const { login } = useAuth();
  const { email } = useLocalSearchParams();
  const { setLoginVisible } = useLoginContext();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(150);
  const [isExpired, setIsExpired] = useState(false);
  const router = useRouter();
  const timerRef = useRef(null);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  });

  const startTimer = () => {
    if (timer > 0) {
      timerRef.current = setTimeout(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 1) {
            return prevTimer - 1;
          } else {
            clearTimeout(timerRef.current);
            setIsExpired(true);
            return 0;
          }
        });
        startTimer();
      }, 1000);
    }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "") {
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      } else {
        Keyboard.dismiss();
      }
    } else if (index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handleVerify = () => {
    login(email);
    router.replace("/(tabs)");
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleResend = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setTimer(5);
    setIsExpired(false);
    startTimer();
  };
  const isOtpComplete = otp.every((digit) => digit !== "");
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
              Ingrese el código de 6 dígitos enviado a{" "}
              <Text className="font-SenMedium  text-emerald-800">{email}</Text>
            </Text>
            <View className="flex-row justify-center gap-1.5">
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  className={`w-10 h-10 bg-white border border-gray-300 focus:border-green-500 rounded-md text-center text-lg font-SenSemiBold ${isExpired ? "opacity-50" : ""}`}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={digit}
                  editable={!isExpired}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              ))}
            </View>
            <Text
              className={`font-SenRegular text-center mb-4 mt-1 ${isExpired ? "text-red-600" : ""}`}
            >
              {isExpired
                ? "El código ha vencido. Por favor, solicita un nuevo código."
                : `Tiempo restante: ${formatTime(timer)}`}
            </Text>
            <Pressable
              className={`bg-emerald-600 py-1 rounded-md items-center ${isOtpComplete ? "" : "bg-emerald-800 opacity-60"}`}
              onPress={handleVerify}
              disabled={!isOtpComplete}
            >
              <Text className="text-white font-SenMedium text-lg">
                Verificar
              </Text>
            </Pressable>
            <Text className="text-center font-SenRegular text-sm mt-4">
              ¿No recibiste el código?
            </Text>
            <Pressable className="mt-2 items-center" onPress={handleResend}>
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
