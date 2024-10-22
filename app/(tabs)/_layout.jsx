// app/(tabs)/_layout.jsx
import React, { useState } from "react";
import { View, Text, Image, StatusBar, Pressable } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import {
  UserIcon,
  BellIcon,
  CheckIcon,
  EditIcon,
  ChevronLeftIcon,
} from "../../components/Icons";
import { useAuth } from "../context/AuthContext";
import {
  EditProfileProvider,
  useEditProfileContext,
} from "../context/EditProfileContext";

function ProfileHeaderRight() {
  const { isEditing, setIsEditing, profileData } = useEditProfileContext();

  const handleSaveProfile = async () => {
    try {
      console.log(profileData);
      setIsEditing(false);

      //   const response = await fetch("TU_URL_API/profile", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(profileData),
      //   });
      //   if (response.ok) {
      //     setIsEditing(false);
      //     // Opcional: Mostrar mensaje de éxito
      //   } else {
      //     // Manejar error
      //     console.error("Error al guardar el perfil");
      //   }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Pressable
      className="mr-3"
      onPress={() => {
        if (isEditing) {
          handleSaveProfile();
        } else {
          setIsEditing(true);
        }
      }}
    >
      {isEditing ? (
        <View className="flex-row items-center gap-x-1">
          <CheckIcon />
          <Text className="text-emerald-800 font-SenMedium ">Guardar</Text>
        </View>
      ) : (
        <EditIcon />
      )}
    </Pressable>
  );
}

export default function TabsLayout() {
  const router = useRouter();
  const { userData } = useAuth();

  //   const handleSaveProfile = async () => {
  //     try {
  //       const response = await fetch("TU_URL_API/profile", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(profileData),
  //       });

  //       if (response.ok) {
  //         setIsEditing(false);
  //         // Opcional: Mostrar mensaje de éxito
  //       } else {
  //         // Manejar error
  //         console.error("Error al guardar el perfil");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  return (
    <EditProfileProvider>
      <StatusBar backgroundColor="#064E3B" barStyle="light-content" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#065F46",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Inicio",
            headerTitle: "",
            headerStyle: { backgroundColor: "#064E3B" },
            headerLeft: () => (
              <Pressable
                className="flex-row gap-x-2 pl-2"
                onPress={() => router.push("./Profile")}
              >
                <Image
                  className="rounded-full w-12 h-12"
                  source={require("../../assets/avatar.png")}
                />
                <View>
                  <Text className="text-white text-xl font-SenMedium">
                    Hola, {userData.names.first} 👋
                  </Text>
                  <Text className="text-zinc-200 font-SenRegular pl-1">
                    Bienvenida
                  </Text>
                </View>
              </Pressable>
            ),
            headerRight: () => (
              <View className="mr-2">
                <BellIcon />
              </View>
            ),
            tabBarIcon: ({ color }) => (
              <FontAwesome6 size={28} name="home" color={color} />
            ),
          }}
          //   listeners={{
          //     tabPress: () => setIsEditing(false),
          //   }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: "Mi Perfil",
            headerTitle: "Mi Perfil",
            headerTitleStyle: {
              fontFamily: "SenSemiBold",
              color: "#064E3B",
              fontSize: 22,
            },
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "transparent" },
            headerLeft: () => (
              <Pressable
                className="ml-3 flex-row items-center"
                onPress={() => router.back()}
              >
                <ChevronLeftIcon color="#064E3B" size={20} />
                <Text className="font-SenRegular text-base"> volver</Text>
              </Pressable>
            ),
            headerRight: () => <ProfileHeaderRight />,
            tabBarIcon: ({ color }) => <UserIcon color={color} />,
          }}
          //   listeners={{
          //     tabPress: () => setIsEditing(false),
          //   }}
        />
      </Tabs>
    </EditProfileProvider>
  );
}
