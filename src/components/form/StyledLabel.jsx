import { Asterisk } from "lucide-react-native";
import { Text, View } from "react-native";

export default function StyledLabel({ label, isRequired }) {
  return (
    <View className="flex-row mb-2 space-x-0.5">
      <Text className="font-SenMedium text-base">{label}</Text>
      {isRequired && <Asterisk size={16} strokeWidth={2.5} color="#ef4444" />}
    </View>
  );
}
