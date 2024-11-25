import { Asterisk } from "lucide-react-native";
import { Text, View } from "react-native";

export default function StyledLabel({
  label,
  isRequired,
  icon: Icon,
  sizeIcon = 18,
}) {
  return (
    <View className="flex-row mb-2 gap-2 items-center">
      {Icon && <Icon color="black" size={sizeIcon} />}
      <Text className="font-SenMedium text-base">
        {label}
        {isRequired && <Asterisk size={14} strokeWidth={2} color="#ef4444" />}
      </Text>
    </View>
  );
}
