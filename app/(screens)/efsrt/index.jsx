import { View, Text, Pressable } from "react-native";
import { BriefcaseIcon, ChevronRigthIcon } from "../../../components/Icons";
import { useRouter } from "expo-router";

export default function InicioEfsrt() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-[#E6F2EC] p-4 gap-5">
      {/* Module I */}
      <Pressable
        className="bg-white rounded-lg p-4"
        onPress={() => {
          router.push({
            pathname: "efsrt/module_id98/informacion",
            params: { headerTitle: "I Modulo" },
          });
        }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <BriefcaseIcon size={30} color="#4ade80" />
            <Text className="text-lg font-SenSemiBold">I Modulo</Text>
          </View>
          <View className="flex-row items-center ">
            <Text className="text-[#4ade80] mr-2 font-SenRegular">
              En desarrollo
            </Text>
            <ChevronRigthIcon size={32} color="#f87171" />
          </View>
        </View>
        <View className="h-2 bg-[#fee2e2] rounded-full mt-2">
          <View className="h-2 bg-[#f87171] rounded-full w-3/4" />
        </View>
      </Pressable>

      {/* Module II */}
      <Pressable className="bg-white rounded-lg p-4 opacity-60">
        <View className="flex-row items-center gap-3">
          <BriefcaseIcon size={32} color="#4ade80" />

          <Text className="text-lg font-SenSemiBold">II Modulo</Text>
        </View>
      </Pressable>

      {/* Module III */}
      <Pressable className="bg-white rounded-lg p-4 opacity-60">
        <View className="flex-row items-center gap-3">
          <BriefcaseIcon size={32} color="#4ade80" />
          <Text className="text-lg font-SenSemiBold">III Modulo</Text>
        </View>
      </Pressable>
    </View>
  );
}
