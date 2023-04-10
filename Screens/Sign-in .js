import {View, Text, Image, TextInput,
    TouchableWithoutFeedback,Keyboard,ImageBackground ,Dimensions,ScrollView} from 'react-native';
    import React, { useState, useEffect, useContext } from "react";
    import CommonButton from '../Components/CommonButton';
    import { Fumi} from 'react-native-textinput-effects';
    import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
    import { AntDesign } from '@expo/vector-icons';
    // import Loader from '../common/Loader';
    const d = Dimensions.get("window")
    export default function Login({navigation}) {
      return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <ImageBackground
            resizeMode="cover"
            style={{   position: 'relative',
            width: d.width,
            height:d.height+32}}
            source={require("../assets/coffee5.jpg")}
          >
    <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
        <View style={{flex: 1}}>
          
          <Text
            style={{
              marginTop: 50,
              alignSelf: 'center',
              fontSize: 24,
              fontWeight: '600',
              color: '#fff',
            }}>
            Login
          </Text>
        <Fumi
        label={'Email'}
        iconClass={FontAwesomeIcon}
        iconName={'envelope-o'}
        keyboardType={"email-address"}
        iconColor={'#000000'}
        iconSize={20}
        iconWidth={40}
        inputPadding={20}
        style={{backgroundColor:"#D1D1D1" ,textColor:"#000000" , width:"98%",marginTop:15,marginLeft:5,borderRadius:10}}
      />
     <View>
     <Fumi
        label={'Password'}
        iconClass={FontAwesomeIcon}
        iconName={'eye'}
        iconColor={'#000000'}
        iconSize={20}
        iconWidth={40}
        inputPadding={20}
        style={{backgroundColor:"#D1D1D1" ,color:"#000000" , width:"98%",marginTop:15,marginLeft:5  , borderRadius:10}}
      />
      <AntDesign name="eyeo" size={24} color="black"   onPress={() => {
              
             
              }} style={{marginLeft:"91%" ,marginTop:-45,paddingBottom:20}} />
     </View>
       
          {/* <CustomTextInput
            type={'passwpord'}
            placeholder={'Enter Password'}
            i icon={require('../assets/lock.png')}
            value={password}
            onChangeText={
              setPassword
            }
          />  */}
          <CommonButton
            title={'Login'}
            textColor={'#fff'}
            onPress={() => {
                navigation.navigate("TabsNav");
              }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: '800',
              alignSelf: 'center',
              marginTop: 20,
              color:"white"
            }}
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            Create New Account?
          </Text>
          
        </View>
        </TouchableWithoutFeedback>
        </ImageBackground>
        </ScrollView>
      );
    };
    
    