import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from '@/api/client'
import { useEffect } from 'react'
import { useProcedures } from '@/contexts/ProceduresContext'

export function useGetProcedureTypes () {
  const query = useQuery({
    queryKey: ['proceduresTypes'],
    queryFn: () => client('/user/procedure')
  })

  return query
}

export function useProceduresInitiate (onSuccess) {
  return useMutation({
    mutationFn: (body) =>
      client('/user/procedure/initiate', {
        method: 'POST',
        body
      }),
    onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })
}

export function useGetProceduresInProgress () {
  const { setProceduresInProgress } = useProcedures()
  const query = useQuery({
    queryKey: ['proceduresInProgress'],
    queryFn: () => client('/user/procedure/progress')
  })
  useEffect(() => {
    if (query.data) {
      setProceduresInProgress(query.data)
    }
  }, [query])

  return query
}

export function useGetProceduresResponse () {
  const { setProceduresResponse } = useProcedures()
  const query = useQuery({
    queryKey: ['ProceduresResponse'],
    queryFn: () => client('/user/procedure/response')
  })
  useEffect(() => {
    if (query.data) {
      setProceduresResponse(query.data)
    }
  }, [query])

  return query
}
