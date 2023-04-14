import React, { useState,useEffect   } from "react";
import { View, Text, SafeAreaView, Keyboard, Alert } from "react-native";
import COLORS from "../";
import Button from "../Components/Button";
import Input from "../Components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../Components/Loader";
import auth from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { addUser, getUserById, getUserUId } from "../firebase/user";
import { login, getUserToken, logout } from "../firebase/auth";
import { SocialIcon } from "react-native-elements";

import Ionicons from "react-native-vector-icons/Ionicons";

const loginwithgoogle = () => {
  
};
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

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
      })
      .catch((e) => {
        alert("invalid email or password");
        console.log(e.message);
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
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.black, flex: 1 }}>
      <Loader visible={loading} />
      <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Log In
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
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
            onPress={loginwithgoogle}
          
          />
          <Text
            onPress={() => navigation.navigate("SignUp")}
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
              padding:8
            }}
          >
            Don't have account? Register
          </Text>
          <Text
            onPress={() => navigation.navigate("ForgetPassword")}
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
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
