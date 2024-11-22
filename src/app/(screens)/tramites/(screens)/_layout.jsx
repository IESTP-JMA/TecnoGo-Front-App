import { ProceduresProvider } from "@/contexts/ProceduresContext";
import { useSnackBar } from "@/contexts/SnackBarContext";
import { Stack, usePathname, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

const tabs = [
  { id: "initiate", title: "Iniciar" },
  { id: "progress", title: "Progreso" },
  { id: "response", title: "Respuesta" },
];

const Navbar = ({ tabs, pathname, onPress }) => (
  <View className="flex-row justify-evenly px-3 pb-2 bg-[#E6F2EC]">
    {tabs.map(({ id, title }) => {
      const isActive = pathname.includes(id);

      return (
        <Pressable
          key={id}
          className={`flex-1 ${isActive && "border-b border-emerald-800"}`}
          onPress={() => onPress(id)}
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

export default function LayoutProcedure() {
  const { isShowLoading, message, resetSnackBar } = useSnackBar();
  const pathname = usePathname();
  const router = useRouter();

  const onPress = (id) => {
    if ((isShowLoading && message) || pathname.includes(id)) return;

    resetSnackBar();
    router.navigate(`./${id}`);
  };

  return (
    <ProceduresProvider>
      <Navbar tabs={tabs} pathname={pathname} onPress={onPress} />

      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="initiate" />
        <Stack.Screen name="progress" />
        <Stack.Screen name="response" />
      </Stack>
    </ProceduresProvider>
  );
}
