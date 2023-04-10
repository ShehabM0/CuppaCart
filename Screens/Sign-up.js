import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet,
  } from "react-native";
  import { AntDesign } from '@expo/vector-icons';
  import React, { useState } from "react";
  import { Fumi,Kaede,Hideo } from 'react-native-textinput-effects';
  import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
  import CommonButton from "../Components/CommonButton";
  export default function SignUp({navigation}) {
    // const navigation = useNavigation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [confsecureTextEntry, setconfSecureTextEntry] = useState(true);
  
  
    
    return (
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                marginTop: 50,
                alignSelf: "center",
                fontSize: 24,
                fontWeight: "600",
                color: "#000",
              }}
            >
              Create New Account
            </Text>
            <Fumi
      label={'Name'}
      iconClass={FontAwesomeIcon}
      iconName={'user'}
      iconColor={'#000000'}
      iconSize={20}
      iconWidth={40}
      inputPadding={20}
      value={name}
      onChangeText={setName}
      style={{backgroundColor:"#D1D1D1" ,textColor:"#000000" , width:"98%",marginTop:15,marginLeft:5,borderRadius:10}}
    />
  
  <Fumi
      label={'Email'}
      iconClass={FontAwesomeIcon}
      iconName={'envelope-o'}
      iconColor={'#000000'}
      iconSize={20}
      iconWidth={40}
      inputPadding={20}
      value={email}
      keyboardType={"email-address"}
      onChangeText={setEmail}
      style={{backgroundColor:"#D1D1D1" ,textColor:"#000000" , width:"98%",marginTop:15,marginLeft:5,borderRadius:10}}
    />
   
           <Fumi
      label={'Phone Numer'}
      iconClass={FontAwesomeIcon}
      iconName={'mobile-phone'}
      iconColor={'#000000'}
      iconSize={20}
      iconWidth={40}
      inputPadding={20}
      keyboardType={"number-pad"}
      value={mobile}
      onChangeText={setMobile}
      style={{backgroundColor:"#D1D1D1" ,textColor:"#000000" , width:"98%",marginTop:15,marginLeft:5,borderRadius:10}}
    />
   <View>
   <Fumi
      label={'Password'}
      iconClass={FontAwesomeIcon}
      iconName={'eye'}
      iconColor={'#000000'}
      iconSize={20}
      iconWidth={40}
      inputPadding={20}
      value={password}
      onChangeText={
        setPassword
      }
      secureTextEntry={secureTextEntry}
      style={{backgroundColor:"#D1D1D1" ,color:"#000000" , width:"98%",marginTop:15,marginLeft:5  , borderRadius:10}}
    />
    <AntDesign name="eyeo" size={24} color="black"   onPress={() => {
              setSecureTextEntry(!secureTextEntry);
              return false;
            }} style={{marginLeft:"91%" ,marginTop:-45,paddingBottom:20}} />
   </View>
  
            <CommonButton
              title={"Sign Up"}
              textColor={"#fff"}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "800",
                alignSelf: "center",
                marginTop: 20,
                marginBottom: 50,
              }}
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              Already have account?
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
  
  // import { StatusBar } from "expo-status-bar";
  // import {
  //   StyleSheet,
  //   Text,
  //   View,
  //   Button,
  //   TextInput,
  //   TouchableWithoutFeedback,
  //   ImageBackground,
  //   Keyboard,
  //   KeyboardAvoidingView,
  //   TouchableOpacity,
  //   Icon,
  // } from "react-native";
  // import {createUserWithEmailAndPassword } from "firebase/auth";
  // import  auth  from "./firebase";
  // import { useState } from "react";
  // const Register = ({ navigation }) => {
  //   const [name, setName] = useState("");
  //   const [phone, setPhone] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [confirmPassword, setConfirmPassword] = useState("");
  //   const handleRegister = ()=>{
  //     createUserWithEmailAndPassword(auth,email,password)
  //     .then((userCredential) => {
  //       console.log("ok")
  //       const user = userCredential.user;
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorMessage);
  
  //     });
  
  //   };
  
  //   return (
  //     <TouchableWithoutFeedback
  //       onPress={() => {
  //         Keyboard.dismiss();
  //       }}
  //     >
  //       <View style={styles.container}>
  //         <ImageBackground
  //           //source={require("../img/peakpx.jpg")}
  //           resizeMode="cover"
  //           style={styles.image}
  //         >
  //           <Text style={styles.textedit}>Register</Text>
  // {/*
  //           <TextInput
  //             style={styles.textInput}
  //             placeholder="Name"
  //             value={name}
  //             onChangeText={(text) => setName(text)}
  //           />
  //           <TextInput
  //             style={styles.textInput}
  //             keyboardType="number-pad"
  //             placeholder="Phone"
  //             value={phone}
  //             onChangeText={(Number) => setPhone(Number)}
  //           /> */}
  //           <TextInput
  //             style={styles.textInput}
  //             placeholder="Email Address"
  //             value={email}
  //             onChangeText={setEmail}
  //           />
  //           <TextInput
  //             style={styles.textInput}
  //             placeholder="Enter Password"
  //             value={password}
  //             onChangeText={setPassword}
  //             secureTextEntry={true}
  //           />
  //           {/* <TextInput
  //             style={styles.textInput}
  //             placeholder="Confirm Password"
  //             value={confirmPassword}
  //             onChangeText={(text) => setConfirmPassword(text)}
  //             secureTextEntry={true}
  //           /> */}
  //           <TouchableOpacity activeOpacity={1} style={styles.buttonContainer}
  //           onPress={handleRegister}
  //           >
  //             <Text style={styles.txtP}>Register</Text>
  //           </TouchableOpacity>
  //           <TouchableOpacity>
  //             <Text
  //               style={styles.textedit2}
  //               onPress={() => navigation.navigate("Login")}
  //             >
  //               Already a member? SignIn
  //             </Text>
  //           </TouchableOpacity>
  //           <TouchableOpacity
  //             activeOpacity={1}
  //             style={styles.homebutton}
  //             onPress={() => navigation.navigate("Home")}
  //           >
  //             <Text style={styles.txtP}>Go to Home</Text>
  //           </TouchableOpacity>
  
  //           <StatusBar style="auto" />
  //         </ImageBackground>
  //       </View>
  //     </TouchableWithoutFeedback>
  //   );
  // };
  // export default Register;
  
  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: "#fff",
  //     alignItems: "center",
  //     justifyContent: "center",
  //   },
  //   container: {
  //     alignItems: "center",
  //     justifyContent: "center",
  //   },
  //   textedit: {
  //     color: "#ffff",
  //     fontSize: 30,
  //     padding: 8,
  //   },
  //   textedit2: {
  //     color: "#ffff",
  //     fontSize: 15,
  //     padding: 8,
  //   },
  
  //   buttonContainer: {
  //     alignItems: "center",
  //     backgroundColor: "#0047AB",
  //     width: "70%",
  //     padding: 10,
  //     marginTop: 10,
  //     borderRadius: 12,
  //   },
  
  //   homebutton: {
  //     alignItems: "center",
  //     backgroundColor: "#0047AB",
  //     width: "50%",
  //     padding: 10,
  //     marginTop: 90,
  //     borderRadius: 15,
  //     position: "absolute",
  //     bottom: 30,
  //   },
  
  //   txtP: {
  //     color: "#fff",
  //     fontSize: 15,
  //   },
  //   buttonContainer2: {
  //     marginLeft: 200,
  //     marginRight: 30,
  //     marginTop: -50,
  //     flexDirection: "row",
  //   },
  
  //   textInput: {
  //     marginTop: 15,
  //     borderWidth: 3,
  //     borderColor: "#0000",
  //     backgroundColor: "#ffff",
  //     color: "#120438",
  //     borderRadius: 15,
  //     width: "90%",
  //     padding: 13,
  //   },
  //   image: {
  //     width: "100%",
  //     height: "100%",
  //     margin: 20,
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },
  // });
  