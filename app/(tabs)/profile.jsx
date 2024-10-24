import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useEditProfileContext } from "../contexts/EditProfileContext";
import { Image } from "expo-image";
import { CameraIcon, EmailIcon, PersonIcon } from "../../components/Icons";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { userData, setUserData } = useAuth();
  const { isEditing } = useEditProfileContext();

  function formatDate(date) {
    const [dia, mes, anio] = date.split("/");
    return new Date(anio, mes - 1, dia).toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  const handleChange = (key, value) =>
    setUserData((prev) => ({
      ...prev,
      [key]: value,
    }));

  const RenderField = ({
    label,
    icon: Icon,
    value,
    inputKey,
    keyboardType,
  }) => (
    <View className="mb-4">
      <View className="flex-row items-center mb-1">
        <Icon size={22} strokeWidth={40} color="#064e3b" />
        <Text className="text-base font-SenBold ml-1 text-emerald-900">
          {label}
        </Text>
      </View>
      {isEditing ? (
        <TextInput
          className="border border-zinc-300 bg-white ml-6 p-2 rounded-lg"
          value={value}
          // onChangeText={(text) => handleChange(inputKey, text)}
          keyboardType={keyboardType}
        />
      ) : (
        <Text className="self-start text-lg font-SenMedium ml-6 text-gray-700 border-b border-emerald-900">
          {value || "No establecido"}
        </Text>
      )}
    </View>
  );

  return (
    <ScrollView className="bg-[#E6F2EC]">
      <View className="relative items-center mb-6">
        <Image
          className="rounded-full w-28 h-28 border border-rose-600"
          source={require("../../assets/avatar.png")}
        />
        <Pressable className="absolute right-[34%] -bottom-2 bg-rose-800 px-3 py-2 rounded-full">
          <CameraIcon color="white" size={20} />
        </Pressable>
      </View>

      <View className="px-4">
        <View className="mb-4 flex-row">
          {isEditing ? (
            <View className="flex-1 flex-row justify-between">
              <View className="mb-1 w-[45%]">
                <View className="flex-row">
                  <PersonIcon size={22} strokeWidth={40} color="#064e3b" />
                  <Text className="text-base font-SenBold ml-1 text-emerald-900">
                    Nombres
                  </Text>
                </View>
                <TextInput
                  className="border border-zinc-300 bg-white ml-4 p-2 rounded-lg"
                  value={userData.firstNames}
                  onChangeText={(text) => handleChange("firstNames", text)}
                />
              </View>
              <View className="mb-1 w-1/2">
                <View className="flex-row">
                  <PersonIcon size={22} strokeWidth={40} color="#064e3b" />
                  <Text className="text-base font-SenBold ml-1.5 text-emerald-900">
                    Apellidos
                  </Text>
                </View>
                <TextInput
                  className="border border-zinc-300 bg-white ml-4 p-2 rounded-lg"
                  value={userData.lastNames}
                  onChangeText={(text) => handleChange("lastNames", text)}
                />
              </View>
            </View>
          ) : (
            <View className="flex-col">
              <View className="flex-row">
                <PersonIcon size={22} strokeWidth={40} color="#064e3b" />
                <Text className="text-base font-SenBold ml-1 text-emerald-900">
                  Nombres Completos
                </Text>
              </View>
              <Text className="self-start text-lg font-SenMedium ml-6 text-gray-700 border-b border-emerald-900">
                {`${userData.firstNames} ${userData.lastNames}`}
              </Text>
            </View>
          )}
        </View>
        <RenderField
          label="Correo Electrónico"
          icon={EmailIcon}
          value={userData.email}
          inputKey="email"
          keyboardType="email-address"
        />
        <RenderField
          label="Numero de Telefono"
          icon={EmailIcon}
          value={userData.phoneNumber.replace(/\B(?=(\d{3})+$)/g, " - ")}
          inputKey="email"
          keyboardType="email-address"
        />
        <View className="flex-row justify-between">
          <RenderField
            label="Carrera Profesional"
            icon={EmailIcon}
            value={userData.professionalCareer}
            inputKey="professionalCareer"
          />
          <RenderField
            label="Semestre"
            icon={EmailIcon}
            value={userData.semester}
            inputKey="semester"
          />
        </View>
        <RenderField
          label="Fecha de Nacimiento"
          icon={EmailIcon}
          value={formatDate(userData.birthDate)}
          inputKey="birthDate"
        />
        <RenderField
          label="Documento de Identidad (DNI)"
          icon={EmailIcon}
          value={userData.dni}
          inputKey="dni"
        />
      </View>
    </ScrollView>
  );
}
