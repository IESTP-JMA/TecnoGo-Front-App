import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "@/api/client";
import { useEffect } from "react";
import { useProcedures } from "@/contexts/ProceduresContext";

export function useGetProceduresTypes() {
  const { setProcedureTypes } = useProcedures();
  const query = useQuery({
    queryKey: ["proceduresTypes"],
    queryFn: () => client("/user/procedures"),
  });
  useEffect(() => {
    if (query.data) {
      setProcedureTypes(query.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return query;
}

export function useProceduresInitiate(onSuccess) {
  return useMutation({
    mutationFn: (body) =>
      client("/user/procedures/initiate", {
        method: "POST",
        body: body,
      }),
    onSuccess,
    onError: (error) => {
      console.error(error);
    },
  });
}

export function useGetProceduresInProgress() {
  const { setProceduresInProgress } = useProcedures();
  const query = useQuery({
    queryKey: ["proceduresInProgress"],
    queryFn: () => client("/user/procedures/progress"),
  });
  useEffect(() => {
    if (query.data) {
      setProceduresInProgress(query.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return query;
}
