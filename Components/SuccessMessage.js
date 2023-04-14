import React, { useState } from "react";
import { Platform, StatusBar, ScrollView, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, SafeAreaView } from 'react-native';
import COLORS from '../Conts/Color'

export default function SuccessMessage({ message }) {
  return (
    <>
    <View style={styles.layout}/>
    <View style={styles.centered}>
      <View style={styles.messageCont}>
        <Image 
          style={styles.successImg}
          source={require('../assets/success.png')}
        />
        {
          message && 
          <Text style={styles.successMessage}>
            {message}
          </Text>
        }
        {
          !message &&
          <Text style={styles.successMessage}>
            Your request has been done
          </Text>
        }
        
        <Text style={{color: 'green', fontSize: 18,}}>Successfully</Text>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  layout: {
    position: 'absolute',
    zIndex: 1,
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  centered: {
    position: "absolute",
    zIndex: 2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  messageCont: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
  },
  successMessage: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  successImg: {
    width: 50,
    height: 50,
  },
});