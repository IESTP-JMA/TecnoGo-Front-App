import { Loader } from "lucide-react-native";
import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  useSharedValue,
} from "react-native-reanimated";

export function CircleLoader() {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1, // Infinito
      // eslint-disable-next-line prettier/prettier
      false // Sin reversión
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Solo ejecutar una vez al montar

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Loader color="black" />
    </Animated.View>
  );
}
