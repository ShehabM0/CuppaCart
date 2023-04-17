import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native'; 

import {COLORS} from '../Conts/Color';
import Button from '../Components/Button';
import Input from '../Components/Input';
import Loader from '../Components/Loader';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase/config";
import { sendEmailVerification } from "firebase/auth";
import { register, getUserUId } from "../firebase/auth";
import { addUser } from "../firebase/user";

const RegistrationScreen = ({navigation}) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
  
    if (!email) {
      handleError('Please enter email', 'email');
      isValid = false;
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      handleError('Please enter a valid email', 'email');
      isValid = false;
    }
  
    if (!fullname) {
      handleError('Please enter fullname', 'fullname');
      isValid = false;
    }
  
    if (!phone) {
      handleError('Please enter phone number', 'phone');
      isValid = false;
    }
  
    if (!password) {
      handleError('Please enter password', 'password');
      isValid = false;
    } else if (password.length < 5) {
      handleError('Min password length of 5', 'password');
      isValid = false;
    }
  
    if (isValid) {
      register(email, password)
      .then(() => {
        getUserUId().then((id) => {
          // console.log(id);
          addUser({
            id: id,
            email,
            password,
            fullname,
            phone,
            Role: "Admin",
            image:
              "https://64.media.tumblr.com/d82d24956974272dff1f745a004a43bf/tumblr_o51oavbMDx1ugpbmuo3_540.png",
            cart: [],
            favorite:[],
            balance:0
          });
        });
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          navigation.goBack()
        }, 3000);
      })
      .catch((error)=>{
        alert(error.message);
      }) 
       
      }
  };
  

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold'}}>
          Add Admin
        </Text>
        <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>
          Enter Admin Details
        </Text>
        <View style={{marginVertical: 20}}>
          <Input
             value={email}
             onChangeText={setEmail}
            onFocus={() => handleError(null, email)}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />

          <Input
            value={fullname}
            onChangeText={setFullname}
            onFocus={() => handleError(null, fullname)}
            iconName="account-outline"
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.fullname}
          />

          <Input
            keyboardType="numeric"
            value={phone}
            onChangeText={setPhone}
            onFocus={() => handleError(null, phone)}
            iconName="phone-outline"
            label="Phone Number"
            placeholder="Enter your phone no"
            error={errors.phone}
          />
          <Input
            value={password}
            onChangeText={setPassword}
            onFocus={() => handleError(null, password)}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <Button title="Add Admin" onPress={validate} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
