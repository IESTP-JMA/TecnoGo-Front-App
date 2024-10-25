import { Pressable, Text } from "react-native";
import { CheckIcon, EditIcon } from "./Icons";

export default function EditButton({ isEditing, onPress, tintColor }) {
  return (
    <Pressable
      className="flex-row space-x-1 items-center px-2 py-1.5 mr-1 active:bg-emerald-200 rounded-xl"
      onPress={onPress}
    >
      {isEditing ? (
        <CheckIcon color={tintColor} />
      ) : (
        <EditIcon color={tintColor} />
      )}
      <Text className={`font-SenMedium text-emerald-800`}>
        {isEditing ? "Guardar" : "Editar"}
      </Text>
    </Pressable>
  );
}
