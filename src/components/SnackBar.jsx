import { useSnackBar } from "@/contexts/SnackBarContext";
import { useEffect } from "react";

const { View, Text } = require("react-native");

const cssCustom = {
  Info: "bg-[#00695c]",
  Error: "bg-red-500",
};

export default function SnackBar() {
  const { isIsShowLoading, message, type } = useSnackBar();

  useEffect(() => {
    console.log("Mount -> ", {
      isIsShowLoading,
      message,
      type,
    });
  }, []);

  return (
    <View className={cssCustom[type]}>
      <Text className="text-sm py-0.5 text-center text-white">{message}</Text>
    </View>
  );
}
