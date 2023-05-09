
import React, { useState,useEffect } from "react";
import { View, Text, SafeAreaView, Keyboard, Alert } from "react-native";
import {COLORS} from "../Conts/Color";
import Button from "../Components/Button";
import Input from "../Components/Input";
import * as Font from "expo-font";

import Loader from "../Components/Loader";
import { auth, db } from "../firebase/config";
import {
  sendPasswordResetEmail,
} from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  const validate = async () => {
    Keyboard.dismiss();
    setLoading(true);
    let isValid = true;
    if (!email) {
      setLoading(false);
      handleError('Please enter email', 'email');
      isValid = false;
      return;
    }
    if (isValid) {
          sendPasswordResetEmail(auth, email)
            .then(() => {
              setLoading(false);
              alert("password email sent");
           })
      .catch((error) => {
        setLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
      });
    }
  };
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Sora-SemiBold": require("../assets/Fonts/static/Sora-SemiBold.ttf"),
        "sora-regular": require("../assets/Fonts/static/Sora-Regular.ttf"),
        "sora-light": require("../assets/Fonts/static/Sora-Light.ttf"),
      });
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null; // Render nothing until the font is loaded
  }

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: COLORS.black, fontSize: 40, fontFamily:"Sora-SemiBold" }}>
          Forgot password
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 15, marginVertical: 8, fontFamily:"sora-light" }}>
          Enter Your Details to reset your password
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={setEmail}
            value={email}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />

          <Button title="Send E-mail" onPress={validate} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;