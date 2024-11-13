import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "@/api/client";

export function useImageUpload(onSuccess) {
  return useMutation({
    mutationFn: uploadImage,
    onSuccess,
    onError: (error) => {
      console.error("Error al subir la imagen:", error);
    },
  });
}
