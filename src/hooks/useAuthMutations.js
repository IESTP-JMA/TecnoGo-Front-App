import { BASE_URL } from "@/api/config";
import { saveJWT } from "@/utils/jwtStorage";
import { useMutation } from "@tanstack/react-query";

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
    console.log(
      `StatusCode -> ${response.status}: statusText-> ${response.statusText}`
    );
    return;
    // throw new Error(
    //   `Throw new Error -> ${response.status}` || "Error en la solicitud"
    // );
  }
  return response.json();
}

export function useSendOTP(email, { onSuccess } = {}) {
  return useMutation({
    mutationFn: () => {
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

export function useVerifyOTP({ otpId, otp }) {
  return useMutation({
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
