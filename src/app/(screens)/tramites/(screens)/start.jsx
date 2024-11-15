import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { ScrollScren } from "../../../../components/Screens";
import StyledLabel from "@components/form/StyledLabel";
import StyledTextInput from "@components/form/StyledTextInput";
import { useEffect, useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import StyledDatePicker from "@components/form/StyledDatePicker";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  useGetProceduresTypes,
  useProceduresInitiate,
} from "@/hooks/useProceduresMutation";
import { useProcedures } from "@/contexts/ProceduresContext";
import { CircleLoader } from "@components/IconsAnimated";
import { useSnackBar } from "@/contexts/SnackBarContext";
import { router } from "expo-router";
import { useUser } from "@/contexts/UserContext";

export default function Start() {
  const { setIsVisible, setIsMsgLoading, setMessage, setType } = useSnackBar();
  const { procedureTypes } = useProcedures();
  const { isPending } = useGetProceduresTypes();
  const { user } = useUser();
  const [additionalDataHeight, setadditionalDataHeight] = useState(40); // Altura mínima inicial
  const [date, setDate] = useState(new Date());
  const [procedureType, setProcedureType] = useState("PROCEDURE-CDP");
  const today = new Date();
  const [additionalData, setAdditionalData] = useState({
    startDate: today.getTime(),
  });
  const { mutate, isPending: isPendingInitiate } = useProceduresInitiate(
    (data) => {
      router.navigate("./progress");

      if (data.success) {
        setType("Info");
      } else {
        setType("Error");
      }
      setMessage(data.message);
      setIsVisible(true);
      // eslint-disable-next-line prettier/prettier
    }
  );
  const [isDisabledInitiate, setIsDisabledInitiate] = useState(true);
  useEffect(() => {
    switch (procedureType) {
      case "PROCEDURE-CDP":
        if (
          additionalData.placeOfExecution &&
          additionalData.placeOfExecution !== "" &&
          additionalData.startDate
        ) {
          setIsDisabledInitiate(false);
        } else {
          setIsDisabledInitiate(true);
        }
        break;
      case "PROCEDURE-CDE":
        setIsDisabledInitiate(false);
        break;
    }
  }, [additionalData, procedureType]);

  useEffect(() => {
    setIsMsgLoading(true);
    setIsVisible(isPending);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (e, selectedDate) => {
        if (selectedDate) {
          setAdditionalData({
            ...additionalData,
            startDate: selectedDate.getTime(),
          });
          setDate(selectedDate);
        }
      },
      mode: "date",
      minimumDate: today,
      maximumDate: new Date(
        today.getFullYear(),
        today.getMonth() + 6,
        // eslint-disable-next-line prettier/prettier
        today.getDate()
      ),
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
      className="flex-1 px-4 py-2  bg-[#E6F2EC]"
      // extraHeight={Platform.OS === "android" ? 10 : 0}
      enableOnAndroid={true}
    >
      <StyledLabel label={"Tipo de Trámite"} />
      <View className="flex-1 justify-center bg-white border  border-zinc-300 p-1 mb-3.5 rounded-lg h-10">
        <Picker
          selectedValue={procedureType}
          onValueChange={(itemValue, itemIndex) => {
            console.log("ProcedureType: ", itemValue);
            setProcedureType(itemValue);
          }}
          mode="dropdown"
        >
          {procedureTypes.map((obj) => (
            <Picker.Item key={obj.id} label={obj.name} value={obj.id} />
          ))}
        </Picker>
      </View>
      {procedureType === "PROCEDURE-CDP" && (
        <>
          <StyledLabel label={"Lugar de Ejecución"} isRequired />
          <StyledTextInput
            value={additionalData.placeOfExecution}
            onChangeText={(value) => {
              setAdditionalData({ ...additionalData, placeOfExecution: value });
            }}
          />
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
        value={`${user.lastNames} ${user.firstNames}`}
        disabled
      />

      <StyledLabel label={"CORREO ELECTRONICO"} />
      <StyledTextInput value={user.email} disabled />

      <View className="flex-row gap-16">
        <View>
          <StyledLabel label={"DNI"} />
          <StyledTextInput value={user.dni} disabled />
        </View>
        <View>
          <StyledLabel label={"TELEFONO"} />
          <StyledTextInput value={user.phoneNumber} disabled />
        </View>
      </View>

      <View className="flex-row space-x-1 items-baseline">
        <StyledLabel label="Informacion adicional" />
        <Text className="text-xs"> (opcional)</Text>
      </View>
      <TextInput
        style={[{ height: Math.max(90, additionalDataHeight) }]}
        className="border border-zinc-300  bg-white p-2 mb-3.5 rounded-lg text-start"
        placeholder="Escribe aquí"
        multiline
        value={additionalData.detail}
        onChangeText={(value) => {
          setAdditionalData({
            ...additionalData,
            additionalInformation: value,
          });
        }}
        onContentSizeChange={(e) => {
          setadditionalDataHeight(e.nativeEvent.contentSize.height);
        }}
      />
      <View>
        <Pressable
          className={`bg-emerald-600 items-center justify-center h-10 rounded-lg ${isDisabledInitiate && "opacity-50"}`}
          disabled={isDisabledInitiate}
          onPress={() => {
            switch (procedureType) {
              case "PROCEDURE-CDP":
                mutate({ procedureType, additionalData: additionalData });
                break;
              case "PROCEDURE-CDE":
                mutate({ procedureType });
                break;
            }
          }}
        >
          {isPendingInitiate ? (
            <CircleLoader size={26} />
          ) : (
            <Text className="font-SenMedium text-center  text-white">
              Iniciar Tramite
            </Text>
          )}
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}
