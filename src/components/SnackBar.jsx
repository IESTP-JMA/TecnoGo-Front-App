import { useSnackBar } from "@/contexts/SnackBarContext";
import { useEffect } from "react";

const { View, Text } = require("react-native");

const cssCustom = {
  Info: "bg-[#00695c]",
  Loading: "bg-rose-900",
  Error: "bg-red-500",
};

export default function SnackBar({ isMsgLoading, message, type }) {
  const { resetVals } = useSnackBar();
  useEffect(() => {
    return () => {
      resetVals();
    };
  });
  return (
    <View className={cssCustom[type]}>
      <Text
        className={`text-sm py-0.5 text-center text-white ${isMsgLoading && "animate-pulse"}`}
      >
        {isMsgLoading ? "Cargando . . ." : message}
      </Text>
    </View>
  );
}
