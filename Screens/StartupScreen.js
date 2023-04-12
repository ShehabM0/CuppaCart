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
import React from "react";
import TextAnimator from "../Components/TextAnimator";


const Home = ({ navigation }) => {

 
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../assets/coffee.jpg")}
    >
      <View style={styles.container} />
      <View style={styles.textHead}>
        <TextAnimator
          content="️Coffee so good, your taste buds will love it."
          textStyle={styles.textHeadStyle}
          style={styles.textHeadStyle}
          duration={800}
         
          
        />

        <TextAnimator
          content="️The best grain, the finest roast & the powerful flavor"
          textStyle={styles.textFootStyle}
          style={styles.textFootStyle}
          duration={800}
         
        />

        <TouchableOpacity
          style={{
            padding: 20,
            backgroundColor: "white",
            borderRadius: 20,
            alignItems: "center",
            marginTop: 30,
          }}
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 20,
              fontWeight: "700",
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
    position: "absolute",
    height: "100%",
    zIndex: 2,
    width: "100%",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },

  textHeadStyle: { color: "white", fontWeight: "800", fontSize: 45,  },
  textFootStyle: { color: "white", fontWeight: "300", fontSize: 17 },
});
