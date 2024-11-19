import { getJWT, saveJWT } from "@/utils/jwtStorage";
import { BASE_URL, IMGBB_API_URL } from "@/api/config";

export async function client(endpoint, { method = "GET", body } = {}) {
  const token = await getJWT();

  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
    console.log(endpoint, "BodyFound: ", config.body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  const newToken = response.headers.get("Authorization");
  if (newToken) {
    // Guarda el nuevo token en AsyncStorage
    await saveJWT(newToken.replace("Bearer ", ""));
    console.log("newToken received and saved");
  }

  console.log(`[${config.method}]`, endpoint, response.status);
  if (!response.ok) {
    // Opcional: manejar errores específicos
    console.log("response.ok", response.ok, await response.text());
    // const errorData = await response.json();
    throw new Error("Error en la solicitud");
  }
  const jsoResponse = await response.json();
  // console.log("JSON:", jsoResponse);
  return jsoResponse;
}

export async function uploadImage(imageBase64) {
  try {
    if (!imageBase64) {
      throw new Error("Error al obtener la imagen");
    }

    const formData = new FormData();
    formData.append("key", "944fb29e49007b2922df1e2667125f92");
    formData.append("image", imageBase64);

    const uploadResponse = await fetch(IMGBB_API_URL, {
      method: "POST",
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error("Error al subir la imagen");
    }

    const data = await uploadResponse.json();
    console.log(data);
    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.error?.message || "Error desconocido");
    }
  } catch (error) {
    console.error("Error en uploadImage:", error);
    throw error;
  }
}
