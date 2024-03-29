import React,{ useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'; 

import SuccessMessage from '../Components/SuccessMessage';
import Loader from '../Components/Loader';
import Input from '../Components/Input';
import {COLORS} from "../Conts/Color";
import { getCreditCard } from '../firebase/creditcard';
import { updateUser } from '../firebase/user';

export default CreditCardScreen = ({ route, navigation }) => {
    
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [date, setDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [skip, setSkip] = useState(false);

    const { user_id } = route.params;

    const handleSubmit = () => {
        if(validateName() && validateNumber() && validateDate() && validateCvv()) {
            creditCardData = {
                name: name,
                number: number,
                date: date,
                cvv: cvv,
            }
            getCreditCard(creditCardData)
            .then(existCreditCard => {
                if(existCreditCard) {
                    let creditcard_id = existCreditCard[0].number;
        
                    updateUser(user_id, { creditcard: creditcard_id })
                    .then(({ status, message }) => {
                        if(status) {
                            setLoading(true);
                            setTimeout(() => setLoading(false), 2000);
            
                            setTimeout(() => {
                                setSuccess(true);
                                setTimeout(() => setSuccess(false), 3500);
                            }, 2000);
            
                            setTimeout(() => {
                                navigation.navigate('SignIn');
                            }, 5500);
                        } else {
                            alert(message);
                        }
                    })
                    .catch(error => alert(error.message))
                } else {
                    alert("Invalid Credit Card Info!")
                }
            })
            .catch(error => alert(error.message));
        } else {
            alert("Invalid Credit Card data!");
        }
    }

    function handleSkip() {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);

        setTimeout(() => {
            setSkip(true);
            setTimeout(() => setSkip(false), 3500);
        }, 1000);
        setTimeout(() => {
            navigation.navigate('SignIn');
        }, 4500);
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

    const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    };

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
        <Loader visible={loading} />
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
                <View style={styles.cont}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.skipBtn} onPress={handleSkip}>
                        <Text style={[styles.btnTxt, {color: COLORS.black}]}> Skip </Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} style={styles.submitBtn} onPress={handleSubmit}>
                        <Text style={styles.btnTxt}> Submit </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        {
            success &&
            <SuccessMessage message={"Account has been created with Credit Card"}/>
        }
        {
            skip &&
            <SuccessMessage message={"Account has been created"}/>
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

