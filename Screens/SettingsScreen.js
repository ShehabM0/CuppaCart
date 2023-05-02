import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  currentUser,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableRipple } from "react-native-paper";
import { auth, db } from "../firebase/config";
import { getUserById, deleteUser } from "../firebase/user";
import { doc, deleteDoc } from "firebase/firestore";
import { getUserUId } from "../firebase/auth";
import { getFormatedDate } from "react-native-modern-datepicker";

const SettingsScreen = ({ navigation }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [image, setimage] = useState();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() - 36500),
    "YYYY/MM/DD"
  );
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [startedDate, setStartedDate] = useState("12/12/2023");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserUId().then((id) => {
      //console.log(id);
      getUserById(id).then((user) => {
        setimage(user[0].image);
        setPhone(user[0].phone);
        setEmail(user[0].email);
        setFirstname(user[0].firstname);
        setLastname(user[0].lastname);
        setSelectedStartDate(user[0].selectedStartDate);
        setRole(user[0].Role);
      });
    });
  }, []);

  const handleDelete = () => {
    Alert.alert(
      "Delete Account?",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const user = auth.currentUser;
              getUserUId().then((id) => {
                const uid = id;
                const docRef = doc(db, "users", uid);
                deleteDoc(docRef);
                user.delete();
                navigation.navigate("SignIn");
              });
            } catch (error) {
              console.log(error);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Update your preferences here</Text>
        </View>

        <TouchableRipple
          onPress={() => {
            navigation.navigate("EditUserScreen");
          }}
        >
          <View style={styles.menuItem}>
            <Icon name="account-edit" color="orange" size={25} />
            <Text style={styles.menuItemText}>Edit my profile</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple
          onPress={() => {
            navigation.navigate("ChangePassword");
          }}
        >
          <View style={styles.menuItem}>
            <Icon name="key-change" color="blue" size={25} />
            <Text style={styles.menuItemText}>Change my password</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => {
            navigation.navigate("EditUserScreen");
          }}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#00ff00" size={25} />
            <Text style={styles.menuItemText}>Add credit card</Text>
          </View>
        </TouchableRipple>

          <TouchableRipple onPress={handleDelete}>
          <View style={styles.menuItem}>
            <Icon name="account-remove" color="red" size={25} />
            <Text style={styles.menuItemText}>Delete my account</Text>
          </View>
        </TouchableRipple>




      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 6,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginLeft: 20,
  },
  menuItemText: {
    color: "#000",
    marginLeft: 10,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
