import NavBar from "@components/NavBar";
import { Stack, useLocalSearchParams } from "expo-router";

export default function ModuleLaoyout() {
  const { headerTitle } = useLocalSearchParams();

  const tabs = [
    { id: "information", title: "Informacion" },
    { id: "itinerary", title: "Itinerario" },
  ];

  return (
    <>
      <Stack.Screen options={{ headerTitle: headerTitle }} />
      <NavBar tabs={tabs} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="information" />
        <Stack.Screen name="itinerary" />
      </Stack>
    </>
  );
}
