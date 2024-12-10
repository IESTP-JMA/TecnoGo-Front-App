import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from '@/api/client'
import { useEffect } from 'react'
import { useProcedures } from '@/contexts/ProceduresContext'
import { useEfsrtContext } from '@/contexts/efsrtContext'

export function useGetEFSRT () {
  const query = useQuery({
    queryKey: ['efsrt'],
    queryFn: () => client('/user/efsrt')
  })

  return query
}

export function useGetModule (moduleNumber) {
  const { setModuleData } = useEfsrtContext()
  const query = useQuery({
    queryKey: ['module'],
    queryFn: () => client(`/user/efsrt/module?number=${moduleNumber}`)
  })
  useEffect(() => {
    if (query.data) {
      setModuleData(query.data)
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
