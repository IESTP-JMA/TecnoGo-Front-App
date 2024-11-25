import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Button,
} from "react-native";
import { ScrollScren } from "../../../../components/Screens";
import StyledLabel from "@components/form/StyledLabel";
import StyledTextInput from "@components/form/StyledTextInput";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  useGetProcedureTypes,
  useProceduresInitiate,
} from "@/hooks/useProceduresMutation";
import { useProcedures } from "@/contexts/ProceduresContext";
import { LoaderAnimated } from "@components/IconsAnimated";
import { useSnackBar } from "@/contexts/SnackBarContext";
import { router } from "expo-router";
import { useUser } from "@/contexts/UserContext";
import TramiteForm from "@components/ProcedureForm";
import { ProcedureTypes } from "@/constants/ProcedureTypes";
import LoadingSnackBar from "@components/LoadingSnackBar";
import SnackBar from "@components/SnackBar";

const getFirstProcedureType = () => Object.keys(ProcedureTypes)[0];

export default function Initiate() {
  const { message, setMessage, setType } = useSnackBar();
  const { data, isFetching } = useGetProcedureTypes();
  const { user } = useUser();
  const [additionalDataHeight, setadditionalDataHeight] = useState(40); // Altura mínima inicial
  const [formData, setFormData] = useState({});
  const [procedureType, setProcedureType] = useState(getFirstProcedureType());
  const [inputs, setInputs] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [procedureTypes, setProcedureTypes] = useState([]);

  const { mutate, isPending: isPendingInitiate } = useProceduresInitiate(
    (data) => {
      if (data.success) {
        router.navigate({
          pathname: "./progress",
          params: { messageSnackBar: data.message },
        });
      } else {
        setType("Error");
        setMessage(data.message);
      }
    }
  );
  useEffect(() => {
    if (data) {
      console.log(data);
      setProcedureTypes(data);
    }
  }, [data]);

  useEffect(() => {
    setInputs(ProcedureTypes[procedureType].inputs);
  }, []);

  const handleProcedureChange = (newProcedureType) => {
    setProcedureType(newProcedureType);
    setFormData({});
    setInputs(ProcedureTypes[newProcedureType]?.inputs || []);
  };
  return (
    <>
      {isFetching && <LoadingSnackBar />}
      {message && !isFetching && <SnackBar />}

      <View className="flex-1 px-4 py-2 bg-[#E6F2EC]">
        <StyledLabel label={"Tipo de Trámite"} />
        <View
          className={`justify-center bg-white border border-zinc-300 p-1 mb-3.5 rounded-lg h-10 ${isFetching && "opacity-50 border"}`}
        >
          <Picker
            enabled={!isFetching}
            selectedValue={procedureType}
            onValueChange={(value) => handleProcedureChange(value)}
            mode="dropdown"
          >
            {procedureTypes.map((obj) => (
              <Picker.Item key={obj.id} label={obj.name} value={obj.id} />
            ))}
          </Picker>
        </View>
        {!isFetching && (
          <TramiteForm
            formData={formData}
            setFormData={setFormData}
            inputs={inputs}
            setIsFormValid={setIsFormValid}
          />
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
          onChangeText={(value) => {
            setFormData({
              ...formData,
              additionalInformation: value,
            });
          }}
          onContentSizeChange={(e) => {
            setadditionalDataHeight(e.nativeEvent.contentSize.height);
          }}
        />

        <View>
          <Pressable
            className={`bg-emerald-600 items-center justify-center h-10 rounded-lg ${!isFormValid && "opacity-50"}`}
            disabled={!isFormValid}
            onPress={() => mutate({ procedureType, additionalData: formData })}
          >
            {isPendingInitiate ? (
              <LoaderAnimated size={26} />
            ) : (
              <Text className="font-SenMedium text-center  text-white">
                Iniciar Tramite
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </>
  );
}
