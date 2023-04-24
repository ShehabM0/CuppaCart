import React,{useEffect,useState} from "react";
import { SafeAreaView,ScrollView,View,Text,StyleSheet,currentUser,Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {auth} from "../firebase/config";
import { TouchableRipple} from "react-native-paper";
import {getUserById,deleteUser} from "../firebase/user";
import { getFormatedDate } from "react-native-modern-datepicker";
import * as ImagePicker from "expo-image-picker";

const SettingsScreen = ({navigation}) => {
  return(
    <SafeAreaView style={{flex:1,backgroundColor:'#f6f6f6'}}>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Update your preferences here</Text>
      </View>

      <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="account-edit" color='orange' size={25} />
              <Text style={styles.menuItemText}>Edit my profile</Text>
            </View>
          </TouchableRipple>

          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="key-change" color='blue' size={25} />
              <Text style={styles.menuItemText}>Change my password</Text>
            </View>
          </TouchableRipple>  

          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="account-remove" color='red' size={25} />
              <Text style={styles.menuItemText}>Delete my account</Text>
            </View>
          </TouchableRipple>    






    </ScrollView>
    </SafeAreaView>
);

}

export default SettingsScreen;

const styles=StyleSheet.create({
  container:{
    paddingVertical:24
  },
  header:{
    paddingHorizontal:24,
    marginBottom:12
  },
  title:{
    fontSize:32,
    fontWeight:'700',
    color:'#1d1d1d',
    marginBottom:6,
    marginTop:20
  },
  subtitle:{
    fontSize:15,
    fontWeight:'500',
    color:'#929292'
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
})
