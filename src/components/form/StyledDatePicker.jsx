import { Pressable, Text } from "react-native";

export default function StyledDatePicker({
  value,
  onPress,
  icon: Icon,
  isPlaceHolder,
}) {
  return (
    <Pressable
      className="flex-row justify-between items-center border border-zinc-300 bg-white p-2 mb-3.5 rounded-lg h-10"
      onPress={onPress}
    >
      <Text className={`${isPlaceHolder && "text-[#a9a9a9]"}`}>{value}</Text>
      <Icon color="#9ca3af" />
    </Pressable>
  );
}
