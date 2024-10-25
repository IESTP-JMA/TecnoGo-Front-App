import { TextInput } from "react-native";

export default function StyledTextInput({
  value,
  onChangeText,
  keyboardType = "default",
}) {
  return (
    <TextInput
      className="border border-zinc-300 bg-white ml-6 p-2 mb-3.5 rounded-lg h-10"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  );
}
