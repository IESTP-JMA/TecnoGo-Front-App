import { useEffect } from 'react'

const { View, Text } = require('react-native')

export default function LoadingSnackBar () {
  useEffect(() => {
    console.log('Show Snack Loading ')
    return () => {
      console.log('Destroy Snack Loading ')
    }
  }, [])

  return (
    <View className='bg-rose-900'>
      <Text className='text-sm py-0.5 text-center text-white animate-pulse'>
        Cargando . . .
      </Text>
    </View>
  )
}
