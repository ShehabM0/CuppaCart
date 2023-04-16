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
  import React, { useState, useEffect } from "react";
const UsersCard = ({
    fullname,
    email,
    phone,
    image,
    Role,
    balance
}) => {
  return (
    <View style={styles.box}>
            <Image style={styles.image} source={{ uri: image }} />
            <View style={styles.boxContent}>
              <Text style={styles.title}>{fullname}</Text>
              <Text style={styles.description}>{email}</Text>
              <Text style={styles.description}>{phone}</Text>
              <Text style={styles.description}>{balance}</Text>
              <Text style={styles.description}>{Role}</Text>
            </View>
          </View>
  )
}

export default UsersCard
const styles = StyleSheet.create({
    image: {
      width: 100,
      height: 100,
      borderRadius:10,
    },
    box: {
      padding: 20,
      marginTop: 5,
      marginBottom: 5,
      backgroundColor: 'white',
      flexDirection: 'row',
      borderColor:"balck",
      borderWidth: 0.5,
      borderRadius:15,
    },
    boxContent: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft: 10,
    },
    title: {
      fontSize: 18,
      color: '#151515',
    },
    description: {
      fontSize: 15,
      color: '#646464',
    },
  })