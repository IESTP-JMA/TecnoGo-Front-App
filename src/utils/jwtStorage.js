import * as SecureStore from 'expo-secure-store'

const JWT_KEY = 'userJWT'

// Guardar el JWT
export const saveJWT = async (token) => {
  try {
    await SecureStore.setItemAsync(JWT_KEY, token)
    console.log('JWT saved successfully', token)
    return true
  } catch (error) {
    console.error('Error saving JWT:', error)
    return false
  }
}

// Obtener el JWT
export const getJWT = async () => {
  try {
    const token = await SecureStore.getItemAsync(JWT_KEY)
    return token
  } catch (error) {
    console.error('Error getting JWT:', error)
    return null
  }
}

// Eliminar el JWT (útil para logout)
export const removeJWT = async () => {
  try {
    await SecureStore.deleteItemAsync(JWT_KEY)
    return true
  } catch (error) {
    console.error('Error removing JWT:', error)
    return false
  }
}

// Verificar si existe un JWT guardado
export const hasJWT = async () => {
  const token = await getJWT()
  return token !== null
}
