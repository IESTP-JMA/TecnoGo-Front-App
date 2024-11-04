import { client } from "@/api/client";
import { BASE_URL } from "@/api/config";
import { useAuth } from "@/contexts/AuthContext";
import { saveJWT } from "@/utils/jwtStorage";
import { Mutation } from "@tanstack/react-query";

export async function customClient(endpoint, { body } = {}) {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    // Opcional: manejar errores específicos
    throw new Error(
      // eslint-disable-next-line prettier/prettier
      `StatusCode: ${response.status}` || "Error en la solicitud"
    );
  }
  return response;
}

export function useSendOTP(email) {
  const { setOtpId } = useAuth();
  return Mutation({
    mutationFn: client("/send-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
    onSuccess: (data) => {
      if (data.success) {
        setOtpId(data.otpId);
      } else {
        console.error(`bad response: ${data.success}`);
      }
    },
    onError: (error) => {
      console.error("Error al subir la imagen:", error);
    },
  });
}

export function useVerifyOTP({ otpId, otp }) {
  return Mutation({
    mutationFn: customClient("/verify-otp", {
      method: "POST",
      body: JSON.stringify({ otpId, otp }),
    }),
    onSuccess: async (response) => {
      const dataJson = await response.json();
      if (dataJson.isValid) {
        const token = response.headers.get("authorization");
        if (token) {
          const jwtToken = token.replace("Bearer ", "");
          await saveJWT(jwtToken);
          console.log("JWT saved successfully");
        } else {
          console.log("isValid but Token not Found");
        }
      } else {
        console.log("OTP is no valid", dataJson.message);
      }
    },
    onError: (error) => {
      console.error("Error al subir la imagen:", error);
    },
  });
}
