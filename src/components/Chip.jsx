import { Text, View } from 'react-native'

export default function Chip ({ label, bgColor, textColor }) {
  return (
    <View className={`rounded-full px-3 py-1.5 items-center ${bgColor}`}>
      <Text className={`font-SenMedium ${textColor}`}>{label}</Text>
    </View>
  )
}
