import { ScrollView, View } from "react-native";

export function Screen({ children }) {
  return <View className="flex-1 bg-[#E6F2EC] p-4">{children}</View>;
}

export function ScrollScren({ children }) {
  return (
    <ScrollView className="flex-1 bg-[#E6F2EC] p-4">{children}</ScrollView>
  );
}
