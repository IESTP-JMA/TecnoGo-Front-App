import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Screen from "../../../components/Screen";
import StyledLabel from "../../../components/form/StyledLabel";
import StyledTextInput from "../../../components/form/StyledTextInput";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

export default function Start() {
  const [formData, setFromData] = useState({});
  const { userData } = useAuth();
  const [additionalDataHeight, setadditionalDataHeight] = useState(40); // Altura mínima inicial
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };
  const showDatepicker = () => {
    showMode("date");
  };
  return (
    <ScrollView>
      <Screen>
        <StyledLabel label={"Tipo de Trámite"} isRequired />
        <StyledLabel label={"Lugar de Ejecución"} isRequired />
        <StyledTextInput value={formData.PlaceOfExecution} />

        <StyledLabel label={"Fecha de Inicio"} isRequired />

        <StyledLabel label={"APELLIDOS Y NOMBRES"} />
        <StyledTextInput
          value={`${userData.lastNames} ${userData.firstNames}`}
          disabled
        />

        <StyledLabel label={"CORREO ELECTRONICO"} />
        <StyledTextInput value={userData.email} disabled />

        <View className="flex-row space-x-10">
          <View>
            <StyledLabel label={"DNI"} />
            <StyledTextInput value={userData.email} disabled />
          </View>
          <View>
            <StyledLabel label={"TELEFONO"} />
            <StyledTextInput value={userData.phoneNumber} disabled />
          </View>
        </View>

        <View className="flex-row space-x-1 items-baseline">
          <StyledLabel label={"Datos Adicionales"} />
          <Text className="text-xs">(opcional)</Text>
        </View>
        <TextInput
          style={[{ height: Math.max(90, additionalDataHeight) }]}
          className="border border-zinc-300  bg-white p-2 mb-3.5 rounded-lg "
          placeholder="Escribe aquí"
          multiline
          value={formData.detail}
          onContentSizeChange={(e) => {
            setadditionalDataHeight(e.nativeEvent.contentSize.height);
          }}
        />
        <Pressable onPress={showDatepicker}>
          <Text>selected: {date.toLocaleString()}</Text>
        </Pressable>
      </Screen>
    </ScrollView>
  );
}
