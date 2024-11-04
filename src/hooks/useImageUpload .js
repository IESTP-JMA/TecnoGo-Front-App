import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "@/api/client";
import { useUser } from "@/contexts/UserContext";

export function useImageUpload() {
  const { setUser } = useUser();
  return useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      setUser((prevUser) => ({
        ...prevUser,
        urlImage: data.url,
      }));
    },
    onError: (error) => {
      console.error("Error al subir la imagen:", error);
    },
  });
}
