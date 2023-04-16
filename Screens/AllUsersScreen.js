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
import COLORS from "../Conts/Color";
import UsersCard from "../Components/UsersCard";

const AllUsersScreen = () => {
  const [Users, setUsers] = useState([]);
  const getUsersHandle = async () => {
    const arr = await getUsers();
    setUsers(arr);
  };
  useEffect(() => {
    getUsersHandle();
  }, []);





    
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ paddingTop: 50, paddingHorizontal: 20 ,width:"100%" }}>
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
         All Users
        </Text>
        <View style={{ marginVertical: 20 }}>
        <View >
          <FlatList
            data={Users}
           horizontal={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={(itemData) => {
              return (
                <UsersCard
                  fullname={itemData.item.fullname}
                  image={itemData.item.image}
                  email={itemData.item.email}
                  phone={itemData.item.phone}
                  balance={itemData.item.balance}
                  Role={itemData.item.Role}
                />
              );
            }}
          />
        </View>

      
          
        
           
          
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AllUsersScreen