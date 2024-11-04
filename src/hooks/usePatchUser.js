import { useMutation } from "@tanstack/react-query";
import { patchUser } from "@/api/api";

export async function usePatchUser() {
  return useMutation({
    mutationFn: patchUser,
    onError: (error) => {
      console.error("Error al subir la imagen:", error);
    },
  });
}
