import { Redirect } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { hasJWT } from "@/utils/jwtStorage";

export default function IndexRoot() {
  const { isLoading } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, [isLoggedIn]);

  async function checkLoginStatus() {
    const userHasJWT = await hasJWT();
    setIsLoggedIn(userHasJWT);
  }

  if (!isLoading) {
    // if (false) {
    //   router.replace("(tabs)/home");
    // } else {
    //   router.replace("/login");
    // }
  }

  if (isLoggedIn) {
    console.log("isLoggedIn redirect /home");
    return <Redirect href="/home" />;
  } else if (isLoggedIn === null) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  return (
    <Redirect
      href={{
        pathname: "/otp",
        params: { email: "test@email.com", otpId: "test-from-index" },
      }}
    />
  );
  //  else return null; // O puedes devolver un componente alternativo
}
