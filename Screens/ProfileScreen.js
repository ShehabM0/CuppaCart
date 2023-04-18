import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
const backImage = require("../assets/adaptive-icon.png");
import { Ionicons } from "@expo/vector-icons";
import { logout } from "../firebase/auth";

import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import {
  StyleSheet,
  currentUser,
  SafeAreaView,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {auth} from "../firebase/config";
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
// import 'firebase/firestore';
// import {getUsers}from"../firebase/user";

const ProfileScreen = ({ navigation }) => {
  const ss = () => {
    logout(auth).then(() => {
      console.log("sign out done");
      navigation.navigate("SignIn");
    });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [image, setimage] = useState(null);
  const [proimage, setproimage] = useState(null);
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [balance, setBalance] = useState();

  useEffect(() => {
    getUserUId().then((id) => {
      //console.log(id);
      getUserById(id).then((user) => {
        // console.log(user);
        setEmail(user[0].email);
        setPassword(user[0].password);
        setFirstname(user[0].firstname);
        setLastname(user[0].lastname);
        setname(user[0].fullname);
        setPhone(user[0].phone);
        setimage(user[0].image);
        setRole(user[0].Role);
        setBalance(user[0].balance);
      });
    });
  }, []);

  return (
    <ScrollView
      style={{
        padding: 22,
        backgroundColor: "#2E333E",
      }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: "row", marginTop: 36 }}>
            <Avatar.Image source={{ uri: image }} size={60} />

            <View style={{ marginLeft: 5 }}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 20,
                    marginBottom: 5,
                    color: "white",
                    fontSize: 25,
                  },
                ]}
              >
                {firstname} {lastname}
              </Title>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#777777" size={20} />
            <Text style={{ color: "#fff", marginLeft: 20 }}>Cairo,Egypt</Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20} />
            <Text style={{ color: "#fff", marginLeft: 20 }}>{phone}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#777777" size={20} />
            <Text style={{ color: "#fff", marginLeft: 20 }}>{email}</Text>
          </View>
        </View>

        <View style={styles.infoBoxWrapper}>
          <View
            style={[
              styles.infoBox,
              {
                borderRightColor: "#dddddd",
                borderRightWidth: 1,
              },
            ]}
          >
            <Title style={{ color: "white" }}>-</Title>
            <Caption style={{ color: "white", fontSize: 15 }}>Bonus</Caption>
          </View>
          <View
            style={[
              styles.infoBox,
              {
                borderRightColor: "#dddddd",
                borderRightWidth: 1,
              },
            ]}
          >
            <Title style={{ color: "white" }}>-</Title>
            <Caption style={{ color: "white", fontSize: 15 }}>Orders</Caption>
          </View>

          <View style={styles.infoBox}>
            <Title style={{ color: "white" }}>{balance}</Title>
            <Caption style={{ color: "white", fontSize: 15 }}>Balance</Caption>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple
            onPress={() => {
              navigation.navigate("Fav");
            }}
          >
            <View style={styles.menuItem}>
              <Icon name="heart-outline" color="#964B00" size={25} />
              <Text style={styles.menuItemText}>Favourites</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="credit-card" color="#964B00" size={25} />
              <Text style={styles.menuItemText}>Payment</Text>
            </View>
          </TouchableRipple>

          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="account-check-outline" color="#964B00" size={25} />
              <Text style={styles.menuItemText}>Support</Text>
            </View>
          </TouchableRipple>

          <TouchableRipple
            onPress={() => {
              navigation.navigate("SettingsTab");
            }}
          >
            <View style={styles.menuItem}>
              <Ionicons name="settings-outline" size={25} color="#964B00" />
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
          </TouchableRipple>
        </View>

        <TouchableOpacity onPress={ss} style={styles.button}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 80,
  },
  infoBox: {
    width: "33%",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    padding: 10,
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  menuItemText: {
    color: "#fff",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  button: {
    backgroundColor: "#964B00",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
    marginLeft: "20%",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default ProfileScreen;
