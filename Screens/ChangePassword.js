
import React, { useState } from "react";
import { View, Text, SafeAreaView, Keyboard, Alert } from "react-native";
import {COLORS} from "../Conts/Color";
import Button from "../Components/Button";
import Input from "../Components/Input";
import Loader from "../Components/Loader";
import { auth, db } from "../firebase/config";
import {
  reauthenticateWithCredential, updatePassword, EmailAuthProvider } from "firebase/auth";

const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const currentUser = auth.currentUser;

  const validate = async () => {
    Keyboard.dismiss();
    setLoading(true);
    let isValid = true;
    if (!oldPassword) {
      setLoading(false);
      handleError('Please enter your old password', 'oldPassword');
      isValid = false;
      
    }
    else if(!newPassword){
      setLoading(false);
      handleError('Please enter your new password', 'newPassword');
      isValid = false;
    }
    else if (!confirmPassword){
      setLoading(false);
      handleError('Please confirm your new password', 'confirmPassword');
      isValid = false;
      return
    }
    if (isValid) {
      const credential = EmailAuthProvider.credential(currentUser.email, oldPassword);
      try {
        await reauthenticateWithCredential(currentUser, credential);
      } catch (error) {
        setLoading(false);
        handleError('Invalid old password', 'oldPassword');
        return;
      }
  
      try {
        await updatePassword(currentUser, newPassword);
        setLoading(false);
       
        navigation.navigate("SignIn")
      } catch (error) {
        setLoading(false);
        handleError(error.message);
      }
    };
  };

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
        <Text style={{ color: COLORS.black, fontSize: 30, fontWeight: "bold" }}>
          Change your password
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Enter your details to change your password
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={setOldPassword}
            value={oldPassword}
            onFocus={() => handleError(null, "oldPassword")}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your old password"
            error={errors.oldPassword}
            password
          />
          <Input
            onChangeText={setNewPassword}
            value={newPassword}
            onFocus={() => handleError(null, "newPassword")}
            iconName="onepassword"
            label="Password"
            placeholder="Enter your new password"
            error={errors.newPassword}
            password
          />
          <Input
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            onFocus={() => handleError(null, "confirmPassword")}
            iconName="lock"
            label="Password"
            placeholder="Confirm your new passsword"
            error={errors.confirmPassword}
            password
          />

          <Button title="Change Password" onPress={validate} />
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

export default ChangePassword;