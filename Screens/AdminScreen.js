import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import auth from "../firebase/config";
import { logout } from "../firebase/auth";
import {
  getUserUId,
  addUser,
  deleteUser,
  editUser,
  getUserById,
  getUserByName,
  getUsers,
  subscribeUser,
} from "../firebase/user";
export default function Admin({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setfullname] = useState("");
  const [image, setimage] = useState(null);
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");

  const ss = () => {
    logout(auth).then(() => {
      console.log("sign out done");
      navigation.navigate("SignIn");
    });
  };

  useEffect(() => {
    getUserUId().then((id) => {
      //console.log(id);
      getUserById(id).then((user) => {
        // console.log(user);
        setfullname(user[0].fullname);
        setimage(user[0].image);
        setRole(user[0].Role);
      });
    });
  }, []);
  return (
    <View>
      <View
        style={{ padding: 10, flexDirection: "column", alignItems: "center" }}
      >
        <TouchableOpacity
          onPress={() => {
            if (role === "Admin") {
              navigation.navigate("Admin");
            } else {
              navigation.navigate("Home");
            }
          }}
        >
          <Image
            style={{ height: 50, width: 50, borderRadius: 75 }}
            source={{ uri: image }}
          />
        </TouchableOpacity>
        <Text>{fullname}</Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "tomato",
          width: "90%",
          padding: 15,
          marginLeft: 24,
          marginTop: 20,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 5,
        }}
        onPress={() => {
          navigation.navigate("AddProduct");
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Add Product</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "tomato",
          width: "90%",
          padding: 15,
          marginLeft: 24,
          marginTop: 5,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 5,
        }}
        onPress={ss}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Delete Product</Text>
      </TouchableOpacity>
    </View>
  );
}
