import { Loader, LoaderCircle } from "lucide-react-native";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  useSharedValue,
} from "react-native-reanimated";

export function LoaderAnimated({ size = 24 }) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1, // Infinito
      false // Sin reversión
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Loader color="white" size={size} />
    </Animated.View>
  );
}

export function CircleLoaderAnimated({ size = 24 }) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1, // Infinito
      false // Sin reversión
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View
      style={{
        width: size,
        height: size,
      }}
    >
      <Animated.View style={animatedStyle}>
        <LoaderCircle color="black" size={size} />
      </Animated.View>
    </View>
  );
}
