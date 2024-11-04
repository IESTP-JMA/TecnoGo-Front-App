import { saveJWT } from "@/utils/jwtStorage";
import { client } from "./client";

export async function sendOTP({ email }) {
  return client("/send-otp", {
    method: "POST",
    body: email,
  });
}

export const verifyOTP = async (verifyData) => {
  const response = await fetch(`/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(verifyData),
  });

  if (!response.ok) {
    throw new Error("Error verificando OTP");
  }

  const data = await response.json();
  const token = response.headers.get("authorization");

  if (token) {
    // Extraemos el token del header (asumiendo que viene como "Bearer token")
    const jwtToken = token.replace("Bearer ", "");
    await saveJWT(jwtToken);
  }

  return data;
};
