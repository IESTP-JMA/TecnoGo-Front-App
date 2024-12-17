import { useUser } from '@/contexts/UserContext'
import { Image } from 'expo-image'
import { Text, View } from 'react-native'

export default function Avatar ({ size = 56, textFontSize = 26 }) {
  const { user } = useUser()

  if (user.urlImage) {
    return (
      <Image
        source={user.urlImage}
        style={{ width: size, height: size, borderRadius: 100 }}
        placeholder={{ blurhash: user.blurhash }}
        contentFit='cover'
        transition={1000}
      />
    )
  }
  return (
    <View
      style={{ width: size, height: size }}
      className='bg-gray-300 rounded-full justify-center'
    >
      <Text
        style={{
          fontSize: textFontSize,
          fontFamily: 'OpenDyslexic-Bold',
          lineHeight: textFontSize === 26 ? 44 : 90
        }}
        className='text-gray-600 text-center'
      >
        {user.firstNames[0].toUpperCase() + user.lastNames[0].toUpperCase()}
      </Text>
    </View>
  )
}
