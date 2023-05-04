import React, { useState, useEffect } from "react";
import {TouchableOpacity, Text} from 'react-native';
import {COLORS} from '../Conts/Color';
import * as Font from 'expo-font';
const Button = ({title, onPress = () => {}}) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Sora-SemiBold': require('../assets/Fonts/static/Sora-SemiBold.ttf'),
      });
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null; // Render nothing until the font is loaded
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 55,
        width: '100%',
        backgroundColor: COLORS.black,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:15,
        
      }}>
      <Text style={{color: COLORS.white,  fontSize: 18,fontFamily:"Sora-SemiBold"}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
