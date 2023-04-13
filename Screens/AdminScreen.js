// import React, { useState, useEffect } from "react";
// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   Dimensions,
// } from "react-native";
// import auth from "../firebase/config";
// import { logout } from "../firebase/auth";
// import {
//   getUserUId,
//   addUser,
//   deleteUser,
//   editUser,
//   getUserById,
//   getUserByName,
//   getUsers,
//   subscribeUser,
// } from "../firebase/user";
// export default function Admin({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullname, setfullname] = useState("");
//   const [image, setimage] = useState(null);
//   const [mobile, setMobile] = useState("");
//   const [role, setRole] = useState("");

//   const ss = () => {
//     logout(auth).then(() => {
//       console.log("sign out done");
//       navigation.navigate("SignIn");
//     });
//   };

//   useEffect(() => {
//     getUserUId().then((id) => {
//       //console.log(id);
//       getUserById(id).then((user) => {
//         // console.log(user);
//         setfullname(user[0].fullname);
//         setimage(user[0].image);
//         setRole(user[0].Role);
//       });
//     });
//   }, []);
//   return (
//     <View>
//       <View
//         style={{ padding: 10, flexDirection: "column", alignItems: "center" }}
//       >
//         <TouchableOpacity
//           onPress={() => {
//             if (role === "Admin") {
//               navigation.navigate("Admin");
//             } else {
//               navigation.navigate("Home");
//             }
//           }}
//         >
//           <Image
//             style={{ height: 50, width: 50, borderRadius: 75 }}
//             source={{ uri: image }}
//           />
//         </TouchableOpacity>
//         <Text>{fullname}</Text>
//       </View>
//       <TouchableOpacity
//         style={{
//           backgroundColor: "tomato",
//           width: "90%",
//           padding: 15,
//           marginLeft: 24,
//           marginTop: 20,
//           borderRadius: 10,
//           alignItems: "center",
//           justifyContent: "center",
//           marginBottom: 5,
//         }}
//         onPress={() => {
//           navigation.navigate("AddProduct");
//         }}
//       >
//         <Text style={{ color: "white", fontSize: 20 }}>Add Product</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={{
//           backgroundColor: "tomato",
//           width: "90%",
//           padding: 15,
//           marginLeft: 24,
//           marginTop: 5,
//           borderRadius: 10,
//           alignItems: "center",
//           justifyContent: "center",
//           marginBottom: 5,
//         }}
//         onPress={() => {
//           navigation.navigate("AddProduct");
//         }}
//       >
//         <Text style={{ color: "white", fontSize: 20 }}>Edit Product</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={{
//           backgroundColor: "tomato",
//           width: "90%",
//           padding: 15,
//           marginLeft: 24,
//           marginTop: 5,
//           borderRadius: 10,
//           alignItems: "center",
//           justifyContent: "center",
//           marginBottom: 5,
//         }}
//         onPress={() => {
//           navigation.navigate("AddProduct");
//         }}
//       >
//         <Text style={{ color: "white", fontSize: 20 }}>Delete Product</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={{
//           backgroundColor: "tomato",
//           width: "90%",
//           padding: 15,
//           marginLeft: 24,
//           marginTop: 5,
//           borderRadius: 10,
//           alignItems: "center",
//           justifyContent: "center",
//           marginBottom: 5,
//         }}
//         onPress={ss}
//       >
//         <Text style={{ color: "white", fontSize: 20 }}>LogOut</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
const backImage = require("../assets/adaptive-icon.png");
import { Ionicons } from "@expo/vector-icons";
import { logout } from "../firebase/auth";
import { FontAwesome5 } from '@expo/vector-icons';
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
import { AntDesign } from '@expo/vector-icons';
import auth from "../firebase/config";
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
import { getProducts } from "../firebase/products";
// import 'firebase/firestore';
// import {getUsers}from"../firebase/user";

const ProfileScreen = ({ navigation }) => {
  const ss = () => {
    logout(auth).then(() => {
      console.log("sign out done");
      navigation.navigate("SignIn");
    });
  };
  const [Users, setUsers] = useState([]);
  const [Products, setProducts] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setname] = useState("");
  const [image, setimage] = useState(null);
  const [proimage, setproimage] = useState(null);
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [balance, setBalance] = useState();

  const getUsersHandle = async () => {
    const arr = await getUsers();
    setUsers(arr);
  };
  useEffect(() => {
    getUsersHandle();
  }, []);

  
  const getProductsHandle = async () => {
    const arr = await getProducts();
    setProducts(arr);
  };
  useEffect(() => {
    getProductsHandle();
  }, []);



  useEffect(() => {
    getUserUId().then((id) => {
      //console.log(id);
      getUserById(id).then((user) => {
        // console.log(user);
        setEmail(user[0].email);
        setPassword(user[0].password);
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
                    color: "white",
                    fontSize: 24,
                  },
                ]}
              >
                {fullname}
              </Title>
              <Title
                style={[
                  {
                    color: "white",
                    marginTop: -5,
                    fontSize: 14,
                    fontWeight:600
                  },
                ]}
              >
                Admin
              </Title>
            </View>
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
            <Title style={{ color: "white" }}>{Users.length}</Title>
            <Caption style={{ color: "white", fontSize: 15 }}>Users</Caption>
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
            <Title style={{ color: "white" }}>{Products.length}</Title>
            <Caption style={{ color: "white", fontSize: 15 }}>Products</Caption>
          </View>

          <View style={styles.infoBox}>
            <Title style={{ color: "white" }}>-</Title>
            <Caption style={{ color: "white", fontSize: 15 }}>Orders</Caption>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple
            onPress={() => {
              navigation.navigate("AddProduct");
            }}
          >
            <View style={styles.menuItem}>
            <Ionicons name="add-circle-outline" size={27} color="#964B00" />
              <Text style={styles.menuItemText}>Add Product</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple  onPress={() => {
              navigation.navigate("DeleteProduct");
            }}>
            <View style={styles.menuItem}>
            <AntDesign name="delete" size={26} color="#964B00" />
              <Text style={styles.menuItemText}>Delete Product</Text>
            </View>
          </TouchableRipple>

          <TouchableRipple onPress={() => {
              navigation.navigate("EditProduct");
            }}>
            <View style={styles.menuItem}>
            <FontAwesome5 name="edit" size={25} color="#964B00" />
              <Text style={styles.menuItemText}>Edit Product</Text>
            </View>
          </TouchableRipple>

          <TouchableRipple
          onPress={() => {
            navigation.navigate("AddAdmin");
          }}
            
          >
            <View style={styles.menuItem}>
            <AntDesign name="adduser" size={28} color="#964B00" />
              <Text style={styles.menuItemText}>Add Admin</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={() => {
              navigation.navigate("SettingsTab");
            }}
          >
            <View style={styles.menuItem}>
            <AntDesign name="deleteuser" size={28} color="#964B00" />
              <Text style={styles.menuItemText}>Delete User</Text>
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

