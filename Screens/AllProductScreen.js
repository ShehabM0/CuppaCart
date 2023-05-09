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
  ImageBackground,
  FlatList,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
import FavCard from "../Components/FavCard";

import { COLORS } from "../Conts/Color";
import UsersCard from "../Components/UsersCard";
import { getProducts } from "../firebase/products";

const AllUsersScreen = ({navigation}) => {
  const [Product, setProduct] = useState([]);
  const getUsersHandle = async () => {
    const arr = await getProducts();
    setProduct(arr);
  };
  useEffect(() => {
    getUsersHandle();
  }, []);

  return (
  
  <FlatList
  data={Product}
  ListHeaderComponent={() => (
    <View style={{width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,marginTop:20}}>
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
            All Products
          </Text>
        </View>
        <View></View>
      </View>
  )}
  renderItem={(itemData) => (
    <FavCard
      firstname={itemData.item.firstname}
      lastname={itemData.item.lastname}
      image={itemData.item.image}
      email={itemData.item.email}
      phone={itemData.item.phone}
      balance={itemData.item.balance}
      Role={itemData.item.Role}
    />
  )}
  ListFooterComponent={() => <View style={{ marginVertical: 20 }} />}
/>

  
  );
};

export default AllUsersScreen;
