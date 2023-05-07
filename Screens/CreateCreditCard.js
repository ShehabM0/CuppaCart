import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'; 
import SuccessMessage from '../Components/SuccessMessage';
import Loader from '../Components/Loader';
import Input from '../Components/Input';
import {COLORS} from "../Conts/Color";
import { getCreditCardByNumber, addCreditCard } from '../firebase/creditcard';

export default CreateCreditCardScreen = ({ navigation }) => {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [date, setDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [balance, setBalance] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
        if(validateName() && validateNumber() && validateDate() && validateCvv() && validateBalance()) {
            
            getCreditCardByNumber(number)
            .then(existCreditCard => {
                if(existCreditCard) {
                    alert("Credit Card Already Exists!");
                } else {
                    creditCardData = {
                        name: name.trim().toLowerCase(),
                        number: number,
                        expiry_date: date,
                        cvv: cvv,
                        balance: Number(balance)
                    }

                    addCreditCard(creditCardData)
                    .then(({ status, message }) => {
                        if(status) {
                            setLoading(true);
                            setTimeout(() => setLoading(false), 2000);
        
                            setTimeout(() => {
                                setSuccess(true);
                                setTimeout(() => setSuccess(false), 3500);
                            }, 2000);
        
                            setTimeout(() => {
                                navigation.navigate('TabsNav');
                            }, 5500);
                        } else {
                            alert(message);
                        }
                    })
                    .catch(error => alert(error.message));
                }
            })
            .catch(error => error.message)
        } else {
            alert("Invalid Credit Card data!");
        }
    }


    function validateName() {
        if(!name) {
            handleError('Please enter name', 'name');
            return false;
        }
        return true;
    }
    function validateNumber() {
        if(!number.match(/^\d+$/) || number.length != 16) {
            handleError('Credit Card number must be 16 digits', 'number');
            return false;
        }
        return true;
    }
    function validateDate() {
        if(!date.includes('/') || date.length != 5) {
            handleError('Credit Card expiration date must be in form MM/YY', 'date');
            return false;
        }
        return true;
    }
    function validateCvv() {
        if(!cvv.match(/^\d+$/) || cvv.length in [3, 4]) {
            handleError('Credit Card CVV must consist of only 3-4 digits', 'cvv');
            return false;
        }
        return true;
    }
    function validateBalance() { 
        if (balance && balance > -1 && !isNaN(balance))
            return true;
        handleError('Credit Card balance must be valid number', 'balance');
        return false;
    }

    const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    };

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
            <Loader visible={loading} />
            <ScrollView contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
                <Text style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold'}}>
                    Credit Card
                </Text>
                <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>
                    Enter CreditCard Details
                </Text>
                <View style={{marginVertical: 20}}>
                    <Input
                        iconName="credit-card-outline"
                        label="Name on Card"
                        placeholder="Name on the front of your card"
                        value={name}
                        onChangeText={setName}
                        onFocus={() => handleError(null, name)}
                        error={errors.name}
                    />

                    <Input
                        iconName="numeric"
                        label="Card Number"
                        placeholder="Digits on the front of your card"
                        value={number}
                        onChangeText={setNumber}
                        onFocus={() => handleError(null, number)}
                        error={errors.number}
                    />

                    <View style={styles.cont}>
                        <View style={{width: "40%"}}>
                            <Input
                                iconName="timetable"
                                label="Expiration Date"
                                placeholder="MM/YY"
                                value={date}
                                onChangeText={setDate}
                                onFocus={() => handleError(null, date)}
                                error={errors.date}
                            />
                        </View>
                        <View style={{width: "50%"}}>
                            <Input
                                keyboardType="numeric"
                                iconName="credit-card-lock"
                                label="CVV"
                                placeholder="3-4 digits"
                                value={cvv}
                                onChangeText={setCvv}
                                onFocus={() => handleError(null, cvv)}
                                error={errors.cvv}
                            />
                        </View>
                    </View>

                    <Input
                        keyboardType="numeric"
                        iconName="cash"
                        label="Balance"
                        placeholder="Credit Card Balance"
                        value={balance}
                        onChangeText={setBalance}
                        onFocus={() => handleError(null, balance)}
                        error={errors.balance}
                    />
                    
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity activeOpacity={0.7} style={styles.submitBtn} onPress={handleSubmit}>
                            <Text style={styles.btnTxt}> Create </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
            {
                success &&
                <SuccessMessage message={"Credit Card has been added to database"}/>
            }
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
    btnTxt: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 18,
    },
});

