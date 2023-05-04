import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Keyboard, Alert } from "react-native";
import { COLORS } from "../Conts/Color";
import Button from "../Components/Button";
import Input from "../Components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../Components/Loader";
import { auth } from "../firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addUser, getUserById, getUserUId } from "../firebase/user";
import { login, getUserToken, logout } from "../firebase/auth";
import { SocialIcon } from "react-native-elements";
import * as Haptics from "expo-haptics";
import { StatusBar } from "react-native";
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';

const provider = new GoogleAuthProvider();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [givenName, setgivenName] = useState("");
  const [familyName, setfamilyName] = useState("");
  const [fontLoaded, setFontLoaded] = useState(false);
  const googleauth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const fname = result.user.displayName;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        navigation.navigate("TabsNav");
        console.log(
          "welcome",
          result.user.displayName,
          result.user.phoneNumber,
          result.user.email,
          result.user.photoUrl
        );
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(false);
    });

    return unsubscribe;
  }, [navigation]);

  const validate = async () => {
    Keyboard.dismiss();
    if (!email) {
      handleError("Please enter email", "email");
      return;
    }
    if (!password) {
      handleError("Please enter password", "password");
      return;
    }

    login(email, password)
      .then(() => {
        getUserUId().then((id) => {
          getUserById(id).then((user) => {
            if (user[0].Role === "Admin") {
              navigation.navigate("Admin");
            } else {
              navigation.navigate("TabsNav");
            }
          });
        });
        setLoading(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      })
      .catch((e) => {
        if(e.message=='Firebase: Error (auth/user-not-found).')
        {
          Alert.alert('User Not Found')
        }
        else
        {
          Alert.alert('Invalid Email or Password')
        }
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      });
  };

  const handleOnchange = (text, input) => {
    if (input === "email") {
      setEmail(text);
      handleError(null, input);
    } else if (input === "password") {
      setPassword(text);
      handleError(null, input);
    }
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Sora-SemiBold': require('../assets/Fonts/static/Sora-SemiBold.ttf'),
      });
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null; // Render nothing until the font is loaded
  }


  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: COLORS.black, fontSize: 40,fontFamily:"Sora-SemiBold" }}>
          Log In
        </Text>
        <Text style={{ fontFamily:"Sora-SemiBold", color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Login
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "email")}
            value={email}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            keyboardType={"email-address"}
            error={errors.email}
            autoCapitalize="none"
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "password")}
            value={password}
            onFocus={() => handleError(null, "password")}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />

          <Button title="Log In" onPress={validate} />
          <SocialIcon
            title="Sign In With Google"
            button
            type="google"
            onPress={() => googleauth()}
            
          />
          <Text
            onPress={() => navigation.navigate("SignUp")}
            style={{
              color: COLORS.black,
              
              textAlign: "center",
              fontSize: 14,
              padding: 8,
              fontFamily:"Sora-SemiBold"
            }}
            
          >
            Don't have account? Register
          </Text>
          <Text
            onPress={() => navigation.navigate("ForgetPassword")}
            style={{
              color: COLORS.black,
              fontFamily:"Sora-SemiBold",
              textAlign: "center",
              fontSize: 14,
              padding: 2,
            }}
          >
            Forgot password?
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
