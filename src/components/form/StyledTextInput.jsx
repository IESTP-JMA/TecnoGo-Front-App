import { TextInput } from 'react-native'

export default function StyledTextInput ({
  value,
  onChangeText,
  keyboardType = 'default',
  isInProfile,
  disabled,
  placeholder
}) {
  return (
    <TextInput
      style={{ opacity: disabled ? 0.5 : 1 }}
      className={`border-zinc-300 bg-white p-2 mb-3.5 rounded-lg h-10 ${isInProfile && 'ml-6'} ${!disabled && 'border'}`}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      editable={!disabled}
      placeholder={placeholder}
    />
  )
}
