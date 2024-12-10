import { useMutation } from '@tanstack/react-query'
import { patchUser } from '@/api/api'

export async function useUpdateUser () {
  return useMutation({
    mutationFn: patchUser,
    onError: (error) => {
      console.error('Error FUNC PATCH /user:', error)
    }
  })
}
