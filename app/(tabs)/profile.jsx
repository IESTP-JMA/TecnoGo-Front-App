import { Pressable, ScrollView, Text, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useState, useLayoutEffect, useCallback } from "react";
import { useNavigation } from "expo-router";
import EditButton from "../../components/EditButton";
import StyledTextInput from "../../components/form/StyledTextInput";
import {
  Camera,
  User,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  Cake,
  IdCard,
} from "lucide-react-native";
import { Image } from "expo-image";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";

const IconWithLabel = ({ icon: Icon, label }) => {
  return (
    <View className="flex-row items-center mb-1">
      <Icon color="#065F46" />
      <Text className="text-base font-SenBold ml-1 text-emerald-900">
        {label}
      </Text>
    </View>
  );
};

const ValueDisplay = ({ value }) => {
  return (
    <View className="h-12 mt-0.5 mb-1 ">
      <Text className="self-start text-lg font-SenMedium ml-6  text-gray-700 border-b border-emerald-900">
        {value || "No establecido"}
      </Text>
    </View>
  );
};

export default function Profile() {
  const { userData, setUserData, uriImage, setUriImage } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(userData);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <EditButton
          isEditing={isEditing}
          onPress={() => {
            if (isEditing) {
              setUserData(tempData);
              setIsEditing(false);
            } else {
              setIsEditing(true);
            }
          }}
        />
      ),
    });
  }, [navigation, isEditing, setUserData, tempData]);

  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      legacy: true,
    });

    if (!result.canceled) {
      setUriImage(result.assets[0].uri);
    }
  };
  const updateField = useCallback(
    (field) => (value) => {
      setTempData((prev) => ({ ...prev, [field]: value }));
    },
    // eslint-disable-next-line prettier/prettier
    []
  );

  return (
    <ScrollView className="bg-[#E6F2EC] px-4">
      <View className="relative items-center mb-6">
        <Image
          className="rounded-full w-32 h-32 border border-emerald-600"
          source={
            uriImage ? { uri: uriImage } : require("../../assets/avatar.png")
          }
        />
        <Pressable
          className="absolute right-[34%] -bottom-2 bg-emerald-800 px-2.5 py-2 rounded-full"
          onPress={pickImage}
        >
          <Camera color="white" size={20} />
        </Pressable>
      </View>

      {isEditing ? (
        <View className="flex-1 flex-row justify-between">
          <View className="w-[45%]">
            <IconWithLabel icon={User} label={"Nombres"} />
            <StyledTextInput
              value={isEditing ? tempData.firstNames : userData.firstNames}
              onChangeText={updateField("firstNames")}
            />
          </View>
          <View className="w-1/2">
            <IconWithLabel icon={User} label={"Apellidos"} />
            <StyledTextInput
              value={isEditing ? tempData.lastNames : userData.lastNames}
              onChangeText={updateField("lastNames")}
            />
          </View>
        </View>
      ) : (
        <View className="flex-col">
          <IconWithLabel icon={User} label={"Nombres Completos"} />
          <ValueDisplay
            value={`${userData.firstNames} ${userData.lastNames}`}
          />
        </View>
      )}

      <IconWithLabel icon={Mail} label={"Correo Electronico"} />
      {isEditing ? (
        <StyledTextInput
          value={isEditing ? tempData.email : userData.email}
          onChangeText={updateField("email")}
          keyboardType="email-address"
        />
      ) : (
        <ValueDisplay value={userData.email} />
      )}

      <IconWithLabel icon={Phone} label={"Numero de Telefono"} />
      {isEditing ? (
        <StyledTextInput
          value={isEditing ? tempData.phoneNumber : userData.phoneNumber}
          onChangeText={updateField("phoneNumber")}
          keyboardType="numeric"
        />
      ) : (
        <ValueDisplay value={userData.phoneNumber} />
      )}

      <View className="flex-row space-x-6">
        <View>
          <IconWithLabel icon={GraduationCap} label={"Carrera Profesional"} />
          {isEditing ? (
            <StyledTextInput
              value={
                isEditing
                  ? tempData.professionalCareer
                  : userData.professionalCareer
              }
              onChangeText={updateField("professionalCareer")}
            />
          ) : (
            <ValueDisplay value={userData.professionalCareer} />
          )}
        </View>

        <View>
          <IconWithLabel icon={Calendar} label={"Semestre"} />
          {isEditing ? (
            <StyledTextInput
              value={isEditing ? tempData.semester : userData.semester}
              onChangeText={updateField("semester")}
            />
          ) : (
            <ValueDisplay value={userData.semester} />
          )}
        </View>
      </View>

      <IconWithLabel icon={Cake} label={"Fecha de Nacimiento"} />
      {isEditing ? (
        <StyledTextInput
          value={isEditing ? tempData.birthDate : userData.birthDate}
          onChangeText={updateField("birthDate")}
        />
      ) : (
        <ValueDisplay value={userData.birthDate} />
      )}

      <IconWithLabel icon={IdCard} label={"DNI"} />
      {isEditing ? (
        <StyledTextInput
          value={isEditing ? tempData.dni : userData.dni}
          onChangeText={updateField("dni")}
          keyboardType="numeric"
        />
      ) : (
        <ValueDisplay value={userData.phoneNumber} />
      )}
    </ScrollView>
  );
}
