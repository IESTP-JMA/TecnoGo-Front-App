import { ProceduresProvider } from "@/contexts/ProceduresContext";
import { useSnackBar } from "@/contexts/SnackBarContext";
import SnackBar from "@components/SnackBar";
import { Stack, usePathname, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function IndexTramites() {
  const pathname = usePathname();
  const { isVisible, setIsVisible, isMsgLoading, message, type } =
    useSnackBar();
  const router = useRouter();

  const tabs = [
    { id: "start", title: "Iniciar" },
    { id: "progress", title: "Progreso" },
    { id: "response", title: "Respuesta" },
  ];
  const isActive = (route) => pathname.includes(route);

  const Navbar = () => {
    return (
      <View className="flex-row justify-evenly  px-3 pb-2 bg-[#E6F2EC]">
        {tabs.map(({ id, title }) => (
          <Pressable
            key={id}
            className={`flex-1 ${isActive(id) && "border-b border-emerald-800"}`}
            onPress={() => {
              console.log("Click", id, isMsgLoading);
              if (isVisible && isMsgLoading) return;
              setIsVisible(false);
              router.navigate(`./${id}`);
            }}
          >
            <Text
              className={`font-SenRegular pb-2 text-base text-center ${
                isActive(id) ? "text-emerald-800" : "text-neutral-500"
              }`}
            >
              {title}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };
  return (
    <ProceduresProvider>
      <Navbar />
      {isVisible && (
        <SnackBar isMsgLoading={isMsgLoading} message={message} type={type} />
      )}

      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="start" />
        <Stack.Screen name="progress" />
        <Stack.Screen name="response" />
      </Stack>
    </ProceduresProvider>
  );
}
