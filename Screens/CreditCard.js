import React,{useState} from 'react';
import { StyleSheet, View, Text, SafeAreaView, Keyboard, ScrollView, Alert, TouchableOpacity } from 'react-native'; 

import Input from '../Components/Input';

export default RegistrationScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <ScrollView contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold'}}>
          CreditCard
        </Text>
        <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>
          Enter Your CreditCard Details
        </Text>
        <View style={{marginVertical: 20}}>
            <Input
                iconName="credit-card-outline"
                label="Name on Card"
                placeholder="Name on the front of your card"
            />

            <Input
                iconName="numeric"
                label="Card Number"
                placeholder="Digits on the front of your card"
            />

            <View style={styles.cont}>
                <View style={{width: "40%"}}>
                    <Input
                        iconName="timetable"
                        label="Expiration Date"
                        placeholder="MM/YY"
                    />
                </View>
                <View style={{width: "50%"}}>
                    <Input
                        keyboardType="numeric"
                        iconName="credit-card-lock"
                        label="CVV"
                        placeholder="3-4 digit"
                    />
                </View>
            </View>
            <View style={styles.cont}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.skipBtn}
                >
                    <Text style={[styles.btnTxt, {color: COLORS.black}]}>
                        Skip
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.submitBtn}
                >
                    <Text style={styles.btnTxt}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    cont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    submitBtn: {
        height: 55,
        width: '60%',
        backgroundColor: COLORS.black,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:15,
    },
    skipBtn: {
        height: 55,
        width: '30%',
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:15,
        borderWidth: 1,
        borderColor: COLORS.black,
    },
    btnTxt: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 18,
    },
});

