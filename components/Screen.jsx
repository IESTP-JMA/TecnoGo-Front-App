import { View } from "react-native";

export default function Screen({ children }) {
  return <View className="flex-1 bg-[#E6F2EC] p-4">{children}</View>;
}
