import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "@/api/client";
import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";

export function useGetUser() {
  const { setUser } = useUser();
  const query = useQuery({
    queryKey: ["user"],
    queryFn: () => client("/user"),
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }
  }, [query.data, setUser]);
  return query;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData) =>
      client("/user", {
        method: "PATCH",
        body: userData,
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
    },
  });
}
