import { Text, View } from 'react-native'
import { useUser } from '@/contexts/UserContext'

export default function AvatarPlaceHolder ({
  customStyle,
  customClass,
  customTextStyle,
  customTextClass
}) {
  const { user } = useUser()

  return (
    <View
      style={customStyle}
      className={`relative bg-gray-300 rounded-full items-center justify-center ${customClass}`}
    >
      <Text
        style={customTextStyle}
        className={`${customTextClass} font-SenBold text-gray-600`}
      >
        {user.firstNames[0].toUpperCase() + user.lastNames[0].toUpperCase()}
      </Text>
    </View>
  )
}
