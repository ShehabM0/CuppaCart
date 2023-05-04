import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,
  Image,
} from "react-native";
import Constants from "expo-constants";
import React, { useState, useEffect } from "react";
import TextAnimator from "../Components/TextAnimator";
import * as Haptics from "expo-haptics";
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
const Home = ({ navigation }) => {
  function loginnavigation() {
    navigation.navigate("SignIn");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
  }

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
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../assets/coffee1.jpg")}
    >
      <View style={styles.container} />
      <View style={styles.textHead}>
      <TextAnimator
  content="️Coffee so good, your taste buds will love it."
  textStyle={[styles.textHeadStyle, { fontFamily: "Sora-SemiBold" }]}
  style={styles.textHeadStyle}
  duration={1000}
/>

        <TextAnimator
          content="The best grain, the finest roast & the powerful flavor"
          textStyle={styles.textFootStyle}
          style={styles.textFootStyle}
          duration={1000}
        />

        <TouchableOpacity
          style={{
            padding: 20,
            backgroundColor: "#C67C4E",
            borderRadius: 20,
            alignItems: "center",
            marginTop: 30,
          }}
          onPress={loginnavigation}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontFamily:"Sora-SemiBold"
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    opacity: 0.2,
  },

  containerStyle: {},
  textHead: {
    fontFamily:"Sora-SemiBold",
    position: "absolute",
    height: "100%",
    zIndex: 2,
    width: "100%",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },

  textHeadStyle: { fontFamily:"Sora-SemiBold", color: "white",  fontSize: 40 },
  textFootStyle: { fontFamily:"Sora-SemiBold",color: "#A9A9A9", fontWeight: "300", fontSize: 17 },
});
