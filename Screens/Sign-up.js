import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
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
} from "react-native";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../Conts/Color";
import Button from "../Components/Button";
import Input from "../Components/Input";
import Loader from "../Components/Loader";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/config";
import { sendEmailVerification } from "firebase/auth";
import { register, getUserUId } from "../firebase/auth";
import { addUser } from "../firebase/user";
const RegistrationScreen = ({ navigation }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() - 36500),
    "YYYY/MM/DD"
  );
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [startedDate, setStartedDate] = useState("12/12/2023");
  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    let user_id;

    if (!email) {
      handleError("Please enter email", "email");
      isValid = false;
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      handleError("Please enter a valid email", "email");
      isValid = false;
    }

    if (!firstname) {
      handleError("Please enter fullname", "fullname");
      isValid = false;
    }
    if (!lastname) {
      handleError("Please enter fullname", "fullname");
      isValid = false;
    }

    if (!phone) {
      handleError("Please enter phone number", "phone");
      isValid = false;
    }

    if (!password) {
      handleError("Please enter password", "password");
      isValid = false;
    } else if (password.length < 5) {
      handleError("Min password length of 5", "password");
      isValid = false;
    }

    if (isValid) {
      register(email, password)
        .then(() => {
          getUserUId().then((id) => {
            user_id = id;
            addUser({
              id: id,
              email,
              password,
              firstname,
              lastname,
              phone,
              Role: "User",
              image:
                "https://64.media.tumblr.com/d82d24956974272dff1f745a004a43bf/tumblr_o51oavbMDx1ugpbmuo3_540.png",
              cart: [],
              favorite: [],
              balance: 0,
              selectedStartDate,
              creditcard: "",
            });
          });
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            navigation.navigate("CreditCard", { user_id: user_id });
          }, 2000);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };
  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Register
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Register
        </Text>
        <View style={{ marginVertical: 20 }}>
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
            value={firstname}
            onChangeText={setFirstname}
            onFocus={() => handleError(null, firstname)}
            iconName="account-outline"
            label="First Name"
            placeholder="Enter your first name"
            error={errors.firstname}
          />
          <Input
            value={lastname}
            onChangeText={setLastname}
            onFocus={() => handleError(null, lastname)}
            iconName="account-outline"
            label="Last Name"
            placeholder="Enter your last name"
            error={errors.lastname}
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
          <SafeAreaView style={{ flex: 1, padding: -65 }}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : ""}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#fff",
              }}
            >
              <View>
                <View style={{ marginBottom: 5, width: "100%" }}>
                  <View>
                    <Text
                      style={{
                        marginVertical: 5,
                        fontSize: 14,
                        color: COLORS.grey,
                      }}
                    >
                      Select Date
                    </Text>
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

          <Button title="Register" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("SignIn")}
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Already have account ?Login
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegistrationScreen;
const styles = StyleSheet.create({
  textHeader: {
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
    marginTop: 14,
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
});
