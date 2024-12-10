import { Pressable, Text } from 'react-native'
import { Check, UserRoundPen } from 'lucide-react-native'

export default function EditButton ({ isEditing, onPress }) {
  return (
    <Pressable
      className={`flex-row space-x-1 items-center py-1.5 mr-1 active:bg-emerald-200 rounded-xl ${isEditing ? 'pl-1.5 pr-2' : 'pl-2.5 pr-1'}`}
      onPress={onPress}
    >
      {isEditing
        ? (
          <Check color='#065f46' size={28} strokeWidth={2} />
          )
        : (
          <UserRoundPen color='#065f46' size={28} strokeWidth={1.75} />
          )}
      <Text className='font-SenMedium text-emerald-800'>
        {isEditing && 'Guardar'}
      </Text>
    </Pressable>
  )
}
