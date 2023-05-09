
import {
    Alert,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    StatusBar,
    ScrollView,
    FlatList,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import Entypo from "react-native-vector-icons/Entypo";
  import {
    getUserUId,
    addUser,
    deleteUser,
    editUser,
    getUserById,
    getUserByName,
    getUsers,
    subscribeUser,
    getUserByEmail,
} from "../firebase/user";
import { Ionicons } from "@expo/vector-icons";

import Button from "../Components/Button";
import Input from "../Components/Input";
const DeleteUserScreen = ({navigation}) => {
    const [email, setemail] = useState("");
   
    const handleDeleteUser = async () => {
      const object = await getUserByEmail(email);
      if (!object) {
        alert("User Does Not Exist");
      } else {
        deleteUser(object);
        alert("User Deleted With Email: " + email);
      }
    }
    
  return (
    <View style={styles.container} behavior={"padding"}>
     <View style={{width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,marginTop:30
    }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
         
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color={"#707981"}
          />
        </TouchableOpacity>
        <View style={{ flex: 2, alignItems: "center", right: 12 }}>
          <Text
            style={{
              color: "#1C0A00",
              fontSize: 22,
              fontFamily: "Sora-SemiBold",
              textAlign: "center",
            }}
          >
           Delete Product
          </Text>
        </View>
        <View></View>
      </View>
    <View style={styles.inputContainer}>
    <Input
           placeholder="User Name"
           value={email}
           onChangeText={(text) => setemail(text)}
            iconName="rename-box"
            label="UserName"
            style={styles.input}
          />
    </View>
    <View style={styles.buttonContainer}>
    <Button
          title="Delete User"
          onPress={() => {
            handleDeleteUser();
          }}
        />
    </View>
  </View>
  )
}
export default DeleteUserScreen
const styles = StyleSheet.create({
    container: {
      width: "100%",
      flexDirecion: "row",
      backgroundColor: "#F5F5F5",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingBottom: 0,
      flex: 1,
    },
    inputContainer: {
      width: "85%",
    },
    input: {

      paddingHorizontal:5,
      paddingVertical: 7,
      borderRadius: 10,
      width:"92%"
      ,color:"black"
    },
    buttonContainer: {
      width: "60%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
    },
    button: {
      backgroundColor: "#0782F9",
      width: "100%",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontWeight: "700",
      fontSize: 16,
    },
    buttonOutline: {
      backgroundColor: "white",
      marginTop: 5,
      borderColor: "#0782F9",
      borderWidth: 2,
    },
    buttonOutlineText: {
      color: "#0782F9",
      fontWeight: "700",
      fontSize: 16,
    },
    image: {
      width: 250,
      height: 250,
    },
  });
  