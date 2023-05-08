import { View, Image, ScrollView, TouchableOpacity,StyleSheet } from 'react-native';
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
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import React, { useState, useEffect } from "react";
import { logout } from "../firebase/auth";
import { Settings } from 'react-native-feather';
import { Ionicons } from "@expo/vector-icons";


const ProfileView = ({navigation}) => {


    const handleEditPress = () => {

    }
  
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
            setPhone(user[0].phone);
            setimage(user[0].image);
            setRole(user[0].Role);
            setBalance(user[0].balance);
          });
        });
      }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.coverPhoto}
          source={{uri: 'https://images.unsplash.com/photo-1608447714925-599deeb5a682?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'}}
        />
        <View style={styles.profileContainer}>
          <Image
            style={styles.profilePhoto}
            source={{uri:image}}
          />
          <Text style={styles.nameText}>{firstname} {lastname}</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statContainer}>
          <Text style={styles.statCount}>{balance}</Text>
          <Text style={styles.statLabel}>Balance</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statCount}>-</Text>
          <Text style={styles.statLabel}>Order</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statCount}>-</Text>
          <Text style={styles.statLabel}>Bouns</Text>
        </View>
      </View>
      

    
  
      <View style={styles.menuWrapper}>
          <TouchableRipple
            onPress={() => {
              navigation.navigate("Fav");
            }}
          >
            <View style={styles.menuItem}>
              <Icon name="heart-outline" color="#C67C4E" size={25} />
              <Text style={styles.menuItemText}>Favourites</Text>
            </View>
          </TouchableRipple>

          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="account-check-outline" color="#C67C4E" size={25} />
              <Text style={styles.menuItemText}>Support</Text>
            </View>
          </TouchableRipple>

          <TouchableRipple
            onPress={() => {
              navigation.navigate("SettingsTab");
            }}
          >
            <View style={styles.menuItem}>
              <Ionicons name="settings-outline" size={25} color="#C67C4E"  />
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
          </TouchableRipple>
        </View>





      <TouchableOpacity style={styles.button} onPress={ss}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
  },
  coverPhoto: {
    width: '100%',
    height: 200,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -50,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 50,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  bioContainer: {
    padding: 15,
  },
  bioText: {
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,

  },
  statContainer: {
    alignItems: 'center',
    flex: 1,
  },
  statCount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
    color: '#999',
  },
  button: {
    backgroundColor: '#C67C4E',
    borderRadius: 5,
    marginHorizontal: 20,
    padding: 21,
    marginTop:50

    
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    color: 'black',
    marginLeft: 4,
  },
  btn: {
    marginLeft: 'auto',
    width: 40,
    height: 40,
  },
  box: {
    padding: 5,
    marginBottom: 2,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems:'center',
    borderColor:"black"
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: 'black',
  },
  infoContainer: {
    marginTop: 10,
    marginLeft:10,
  },
  infoLabel: {
    fontWeight: 'bold',
    
  },
  infoValue: {
    marginTop: 5,
  },
  menuItemTextt: {
    color: "#fff",
    marginLeft: 5,
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 26,
   
    
  },
  menuItemText: {
    color: "black",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
    
  },
  menuWrapper: {
    marginTop: 10,
    marginLeft:20
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },

});

export default ProfileView; 