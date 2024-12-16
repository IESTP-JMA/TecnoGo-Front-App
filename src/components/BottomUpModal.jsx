import { Pressable, Text, TextInput, View } from 'react-native'
import Modal from 'react-native-modal'

export default function BottomUpModal ({
  isVisible,
  onClose,
  label,
  value,
  originalValue,
  onChangeText,
  onSave
}) {
  const hasChanged = value !== originalValue
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      backdropOpacity={0.3}
      style={{ justifyContent: 'flex-end', margin: 0 }}
    >
      <View className='justify-center bg-[#E6F2EC] p-8'>
        <Text className='font-SenRegular text-base mb-5'>
          Escribe tu: {label}
        </Text>
        <TextInput
          className='text-base border-b border-emerald-700'
          value={value}
          onChangeText={onChangeText}
          autoCapitalize='none'
          style={{ fontFamily: 'SenRegular', fontSize: 16 }}
          autoFocus
        />
        <View className='flex-row justify-end gap-4 mt-4'>
          <Pressable onPress={onClose}>
            <Text className='font-SenRegular text-emerald-800 px-4 py-2'>
              Cancelar
            </Text>
          </Pressable>
          <Pressable disabled={!hasChanged} onPress={hasChanged ? onSave : null} className='disabled:opacity-50'>
            <Text className='font-SenRegular text-emerald-800 px-4 py-2'>
              Guardar
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}
