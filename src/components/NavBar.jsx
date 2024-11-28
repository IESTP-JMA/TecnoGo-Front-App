import { useSnackBar } from "@/contexts/SnackBarContext";
import { usePathname, useRouter } from "expo-router";
import { Text } from "react-native";
import { Pressable, View } from "react-native";

export default function NavBar({ tabs }) {
  const { isShowLoading, message, resetSnackBar } = useSnackBar();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View className="flex-row justify-evenly px-3 pb-2 bg-[#E6F2EC]">
      {tabs.map(({ id, title }) => {
        const isActive = pathname.includes(id);

        return (
          <Pressable
            key={id}
            className={`flex-1 ${isActive && "border-b border-emerald-800"}`}
            onPress={() => {
              if ((isShowLoading && message) || pathname.includes(id)) return;

              resetSnackBar();
              router.replace(`./${id}`);
            }}
          >
            <Text
              className={`font-SenRegular pb-2 text-base text-center ${
                isActive ? "text-emerald-800" : "text-neutral-500"
              }`}
            >
              {title}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
