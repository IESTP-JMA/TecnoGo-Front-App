import { Pressable, ScrollView, Text, View, Image } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useLayoutEffect, useCallback } from "react";
import { useFocusEffect, useNavigation } from "expo-router";
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
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import AvatarPlaceHolder from "../../components/AvatarPlaceHolder";
import { useImageUpload } from "@/hooks/useImageUpload ";
import { useUser } from "@/contexts/UserContext";

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
  const { userData, setUserData } = useAuth();
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(userData);
  const navigation = useNavigation();
  // eslint-disable-next-line no-unused-vars
  const { mutate, isPending, error } = useImageUpload();
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  useFocusEffect(
    useCallback(() => {
      return () => setIsEditing(false);
      // eslint-disable-next-line prettier/prettier
    }, [])
  );

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

  const updateField = useCallback(
    (field) => (value) => {
      setTempData((prev) => ({ ...prev, [field]: value }));
    },
    // eslint-disable-next-line prettier/prettier
    []
  );

  const handleUpload = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
    });

    if (!result.didCancel) {
      mutate(result.assets[0].base64);
    }
  };

  return (
    <ScrollView className="bg-[#E6F2EC] p-4">
      <View className="relative items-center mb-6 h-40 ">
        {user.urlImage && (
          <Image
            source={{ uri: user.urlImage }}
            style={{ width: 142, height: 142 }}
            className={`${isLoadingImage ? "opacity-0" : "opacity-100"} absolute rounded-full border-2 border-slate-200`}
            onLoad={() => setIsLoadingImage(false)}
          />
        )}

        {(!user.urlImage || isLoadingImage) && (
          <AvatarPlaceHolder
            customStyle={{ width: 142, height: 142 }}
            customClass="border-4 border-slate-200"
            customTextClass="text-7xl -mb-3"
          />
        )}

        <Pressable
          className="absolute right-[29%] bottom-0 bg-slate-200 rounded-full px-2 py-2"
          onPress={handleUpload}
        >
          <Camera color="#4c0519" size={24} strokeWidth={2.5} />
        </Pressable>
      </View>

      {isEditing ? (
        <View className="flex-1 flex-row justify-between">
          <View className="w-[45%]">
            <IconWithLabel icon={User} label={"Nombres"} />
            <StyledTextInput
              value={isEditing ? tempData.firstNames : userData.firstNames}
              onChangeText={updateField("firstNames")}
              isInProfile
            />
          </View>
          <View className="w-1/2">
            <IconWithLabel icon={User} label={"Apellidos"} />
            <StyledTextInput
              value={isEditing ? tempData.lastNames : userData.lastNames}
              onChangeText={updateField("lastNames")}
              isInProfile
            />
          </View>
        </View>
      ) : (
        <View className="flex-col">
          <IconWithLabel icon={User} label={"Nombre Completo"} />
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
          isInProfile
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
          isInProfile
        />
      ) : (
        <ValueDisplay value={userData.phoneNumber} />
      )}

      <View className="flex-row gap-x-6">
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
              isInProfile
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
              isInProfile
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
          isInProfile
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
          isInProfile
        />
      ) : (
        <ValueDisplay value={userData.phoneNumber} />
      )}
    </ScrollView>
  );
}
