import { Calendar } from "lucide-react-native";
import { Pressable, Text } from "react-native";

export default function StyledDatePicker({ value, onPress }) {
  return (
    <Pressable
      className="flex-row justify-between items-center border border-zinc-300 bg-white p-2 mb-3.5 rounded-lg h-10"
      onPress={onPress}
    >
      <Text>{value}</Text>
      <Calendar color="#9ca3af" />
    </Pressable>
  );
}
