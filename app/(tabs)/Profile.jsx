import { Pressable, Text, TextInput, View } from "react-native";
import { useEditProfileContext } from "../context/EditProfileContext";
import { Image } from "expo-image";
import { CameraIcon, EmailIcon, PersonIcon } from "../../components/Icons";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { userData, setUserData} = useAuth();
  const { isEditing, profileData, setProfileData } = useEditProfileContext();
  
  const editData = {...userData};

  return (
    <>
      <View className="relative items-center mb-3">
        <Image
          className="rounded-full w-28 h-28 border border-rose-600"
          source={require("../../assets/avatar.png")}
        />
        <Pressable className="absolute right-[34%] -bottom-2 bg-rose-800 px-2.5 py-2 rounded-full">
          <CameraIcon color=" white" size={20} />
        </Pressable>
      </View>
      <View className="px-4 gap-y-1">
        <View className="flex-row">
          <PersonIcon size={22} strokeWidth={40} color="#064e3b" />
          <Text className="text-base font-SenBold mb-2 ml-1 text-emerald-900 ">
            Nombre Completo
          </Text>
        </View>
        {isEditing ? (
          <TextInput
            className="border border-zinc-300 bg-white ml-6 p-2 rounded-lg"
            value={editData.names.first + ' ' + editData.names.last}
            onChangeText={(text) =>
              setProfileData((prev) => ({ ...prev, email: text }))
            }
            keyboardType="email-address"
          />
        ) : (
          <Text className="self-start text-lg font-SenMedium ml-6 text-gray-700 border-b border-emerald-900">
            {userData.names.first + ' ' + editData.names.last}
          </Text>
        )}

        <View className="flex-row">
          <EmailIcon size={22} strokeWidth={40} color="#064e3b" />
          <Text className="text-base font-SenBold mb-2 ml-1 text-emerald-900 ">
            Correo Electronico
          </Text>
        </View>
        {isEditing ? (
          <TextInput
            className="border border-zinc-300 bg-white ml-6 p-2 rounded-lg"
            value={editData.email}
            // onChangeText={(text) =>
            //   setProfileData((prev) => ({ ...prev, email: text }))
            // }
            keyboardType="email-address"
          />
        ) : (
          <Text className="self-start text-lg font-SenMedium ml-6 text-gray-700 border-b border-emerald-900">
            {userData.email } {/* || "No establecido"  */}
          </Text>
        )}

        
      </View>
    </>
  );
}
