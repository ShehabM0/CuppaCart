import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { storage } from '../firebase/config';
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, setDoc } from "firebase/firestore";
import {
    View,
    Text,
    Keyboard,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Platform,
    ImageBackground
} from 'react-native';

import {
    getUserById
} from "../firebase/user";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import {COLORS} from '../Conts/Color';
import Button from '../Components/Button';
import Input from '../Components/Input';
import Loader from '../Components/Loader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createUserWithEmailAndPassword } from "firebase/auth";
//import auth from "../firebase/config";
import { sendEmailVerification } from "firebase/auth";
import {auth,db }from "../firebase/config";
import { register, getUserUId } from "../firebase/auth";
import { addUser } from "../firebase/user";
const EditUserScreen = ({ navigation }) => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [image, setimage] = useState();
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = React.useState({});

    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    const today = new Date();
    const startDate = getFormatedDate(
        today.setDate(today.getDate() - 36500),
        "YYYY/MM/DD"
    );
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [startedDate, setStartedDate] = useState("12/12/2023");
    const[isLoading,setIsLoading]=useState(false);


    useEffect(() => {
        getUserUId().then((id) => {
            //console.log(id);
            getUserById(id).then((user) => {
                setimage(user[0].image);
                setPhone(user[0].phone);
                setEmail(user[0].email);
                setFirstname(user[0].firstname);
                setLastname(user[0].lastname);
                setSelectedStartDate(user[0].selectedStartDate)
            });
        });
    }, []);

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };
    function handleChangeStartDate(propDate) {
        setStartedDate(propDate);
    }

    const handleOnPressStartDate = () => {
        setOpenStartDatePicker(!openStartDatePicker);
    };


    const pickImage=async()=>
    {
        setIsLoading(true);
        let result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality:1,
        });
        if(!result.canceled)
        {
            //setimage(result.assets[0].uri);
            const uploadURL=await uploadImageAsync(result.assets[0].uri);
            setimage(uploadURL);
            setInterval(() => {
                setIsLoading(false);
            }, 2000);
        }
        else
        {
            setimage(null);
            setInterval(() => {
                setIsLoading(false);
            }, 2000);
        }

    };
    const uploadImageAsync=async(uri)=>{
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
              resolve(xhr.response);
            };
            xhr.onerror = function (e) {
              console.log(e);
              reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
          });
          try{
            const storageRef=ref(storage,`Images/image-${Date.now()}`);
            const result=await uploadBytes(storageRef,blob);
            blob.close();
            return await getDownloadURL(storageRef);
          }
          catch(error){
            alert(`Error : ${error}`);
          }
    };


    const handleUpdate = () => {
        try {
          getUserUId().then((id) => {
            user_id = id;
            setDoc(doc(db, "users", user_id), {
              id: id,
              email,
              firstname,
              lastname,
              phone,
              Role: "User",
              image,
              cart: [],
              favorite:[],
              balance:0,
              selectedStartDate,
              creditcard: ""
            }).then(() => {
              Alert.alert(
                'Profile Updated!',
                'Your profile has been updated successfully.'
              );
              navigation.navigate('TabsNav'); // Navigate to TabsNav after updating user data
            });
          });
        } catch (err) {
          console(err.massage);
        }
      };
























    return (


        <View style={styles.container}>

            <View style={{ margin: 20 }}>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={pickImage}>
                        <View
                            style={{
                                height: 140,
                                width: 100,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <ImageBackground
                                source={{
                                    uri: image,
                                }}
                                style={{ height: 100, width: 100 }}
                                imageStyle={{ borderRadius: 15 }}>
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Icon
                                        name="camera"
                                        size={35}
                                        color="#fff"
                                        style={{
                                            opacity: 0.7,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            borderRadius: 10,
                                        }}
                                    />
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
                        {firstname} {lastname}
                    </Text>
                    <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
                        {email}
                    </Text>
                </View>





                <View style={{ marginVertical: 20 }}>

                    <Input
                        value={firstname}
                        onChangeText={setFirstname}
                        onFocus={() => handleError(null, firstname)}
                        iconName="account-outline"
                        label="First Name"
                        placeholder={firstname}
                        error={errors.firstname}
                    />
                    <Input
                        value={lastname}
                        onChangeText={setLastname}
                        onFocus={() => handleError(null, fullname)}
                        iconName="account-outline"
                        label="Last Name"
                        placeholder={lastname}
                        error={errors.lastname}
                    />

                    <Input
                        keyboardType="numeric"
                        value={phone}
                        onChangeText={setPhone}
                        onFocus={() => handleError(null, phone)}
                        iconName="phone-outline"
                        label="Phone Number"
                        placeholder={phone}
                        error={errors.phone}
                    />

                    <SafeAreaView style={{ flex: 1, padding: -65 }}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS == "ios" ? "padding" : ""}
                            style={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: "#fff",
                            }}
                        >
                            <View >
                                <View style={{ marginBottom: 5, width: "100%", }}>
                                    <View>
                                        <Ionicons
                                            name="calendar-outline"
                                            size={20}
                                            color="#666"
                                            style={{ marginRight: 100, marginBottom: -20 }}
                                        />
                                        <Text style={{
                                            marginVertical: 1,
                                            fontSize: 14,
                                            marginLeft: 29,
                                            color: COLORS.grey,
                                        }}>Select Date</Text>

                                        <TouchableOpacity
                                            value={selectedStartDate}
                                            onChangeText={setSelectedStartDate}
                                            style={styles.inputBtn}
                                            onPress={handleOnPressStartDate}
                                        >
                                            <Text>{selectedStartDate}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Create modal for date picker */}
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={openStartDatePicker}

                                >
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>

                                            <DatePicker

                                                mode="calendar"
                                                minimumDate={startDate}
                                                selected={startedDate}
                                                onDateChanged={handleChangeStartDate}
                                                onSelectedChange={(date) => setSelectedStartDate(date)}
                                                options={{
                                                    backgroundColor: "#080516",
                                                    textHeaderColor: "#469ab6",
                                                    textDefaultColor: "#FFFFFF",
                                                    selectedTextColor: "#FFF",
                                                    mainColor: "#469ab6",
                                                    textSecondaryColor: "#FFFFFF",
                                                    borderColor: "rgba(122, 146, 165, 0.1)",
                                                }}
                                            />
                                            <TouchableOpacity onPress={handleOnPressStartDate}>
                                                <Text style={{ color: "white" }}>Close</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                        </KeyboardAvoidingView>
                    </SafeAreaView>

                    <TouchableOpacity style={styles.commandButton} onPress={handleUpdate}>
                        <Text style={{ color: "white", fontSize: 16, }}>Submit</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
};

export default EditUserScreen;
const styles = StyleSheet.create({
    container: { flex: 1 }
    , textHeader: {
        fontSize: 36,
        marginVertical: 60,
        color: "#111",
    },
    textSubHeader: {
        fontSize: 25,
        color: "#111",
    },
    inputBtn: {
        borderWidth: 1,
        borderRadius: 12,
        borderColor: "#222",
        height: 50,
        paddingLeft: 8,
        fontSize: 18,
        justifyContent: "center",
        marginTop: 21,
    },
    submitBtn: {
        backgroundColor: "#342342",
        paddingVertical: 22,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        paddingVertical: 12,
        marginVertical: 16,
    },
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "#080516",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        padding: 35,
        width: "90%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#964B00',
        alignItems: 'center',
        marginTop: 100,

    },
});