import { Text, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function AvatarPlaceHolder({
  customStyle,
  customClass,
  customTextStyle,
  customTextClass,
}) {
  const { userData } = useAuth();

  return (
    <View
      style={customStyle}
      className={`relative bg-gray-300 rounded-full items-center justify-center ${customClass}`}
    >
      <Text
        style={customTextStyle}
        className={`${customTextClass} font-SenBold text-gray-600`}
      >
        {userData.firstNames[0].toUpperCase() +
          userData.lastNames[0].toUpperCase()}
      </Text>
    </View>
  );
}
