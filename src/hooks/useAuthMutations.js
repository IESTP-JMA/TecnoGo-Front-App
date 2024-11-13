import { BASE_URL } from "@/api/config";
import { saveJWT } from "@/utils/jwtStorage";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

export async function customClient(endpoint, { body } = {}) {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log(endpoint, "HeadersFound: ", config.headers);
  if (body) {
    config.body = JSON.stringify(body);
    console.log(endpoint, "BodyFound: ", config.body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    // Opcional: manejar errores específicos
    console.log(`StatusCode -> ${response.status}`);
    return;
    // throw new Error(
    //   `Throw new Error -> ${response.status}` || "Error en la solicitud"
    // );
  }
  return response;
}

export function useSendOTP({ onSuccess } = {}) {
  return useMutation({
    mutationFn: (email) => {
      return customClient("/send-otp", {
        body: { email },
      });
    },
    onSuccess,
    onError: (error) => {
      console.error("Error in request OTP", error);
    },
  });
}

export function useVerifyOTP() {
  return useMutation({
    mutationFn: ({ email, otpId, otp }) => {
      return customClient("/verify-otp", {
        method: "POST",
        body: { email, otpId, otp },
      });
    },
    onSuccess: async (response) => {
      if (!response) return;
      const dataJson = await response.json();
      console.log("dataJson", dataJson);
      if (dataJson.isValid) {
        const token = response.headers.get("authorization");
        if (token) {
          const jwtToken = token.replace("Bearer ", "");
          await saveJWT(jwtToken);
          router.replace("/home");
        } else {
          console.log("isValid but Token not Found");
        }
      } else {
        console.log(dataJson.message);
      }
    },
    onError: (error) => {
      console.error("Error al verificar OTP:", error);
    },
  });
}
