import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { ScrollScren } from "../../../components/Screens";
import StyledLabel from "../../../components/form/StyledLabel";
import StyledTextInput from "../../../components/form/StyledTextInput";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import StyledDatePicker from "../../../components/form/StyledDatePicker";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Start() {
  const [formData, setFormData] = useState({});
  const { userData } = useAuth();
  const [additionalDataHeight, setadditionalDataHeight] = useState(40); // Altura mínima inicial
  const [date, setDate] = useState(new Date());
  const [typeProcedure, settypeProcedure] = useState("1");
  const today = new Date();

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (e, selectedDate) => setDate(selectedDate),
      mode: "date",
      minimumDate: today,
      maximumDate: new Date(today.getFullYear(), 11, 31),
    });
  };

  const opciones = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const capitalizeFirstLetter = (texto) =>
    texto.replace(/^\w/, (c) => c.toUpperCase());

  return (
    <KeyboardAwareScrollView
      className="flex-1 p-4   bg-[#E6F2EC]"
      // extraHeight={Platform.OS === "android" ? 10 : 0}
      enableOnAndroid={true}
    >
      <StyledLabel label={"Tipo de Trámite"} />

      <View className="  flex-1 justify-center bg-white border  border-zinc-300 p-1 mb-3.5 rounded-lg h-10">
        <Picker
          selectedValue={typeProcedure}
          onValueChange={(itemValue, itemIndex) => settypeProcedure(itemValue)}
          mode="dropdown"
        >
          <Picker.Item label="Carta de Pressentacion" value="1" />
          <Picker.Item label="Certificado de Estudios" value="2" />
        </Picker>
      </View>
      {typeProcedure === "1" && (
        <>
          <StyledLabel label={"Lugar de Ejecución"} isRequired />
          <StyledTextInput value={formData.PlaceOfExecution} />
          <StyledLabel label={"Fecha de Inicio"} isRequired />
          <StyledDatePicker
            value={capitalizeFirstLetter(
              // eslint-disable-next-line prettier/prettier
              date.toLocaleString("es-PE", opciones)
            )}
            onPress={showDatepicker}
          />
        </>
      )}

      <StyledLabel label={"APELLIDOS Y NOMBRES"} />
      <StyledTextInput
        value={`${userData.lastNames} ${userData.firstNames}`}
        disabled
      />

      <StyledLabel label={"CORREO ELECTRONICO"} />
      <StyledTextInput value={userData.email} disabled />

      <View className="flex-row gap-16">
        <View>
          <StyledLabel label={"DNI"} />
          <StyledTextInput value={userData.dni} disabled />
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
      <View>
        <Pressable className="bg-emerald-600 items-center py-2 rounded-lg">
          <Text className="font-SenMedium text-white">Iniciar Tramite</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}
