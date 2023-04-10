import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions, Image, 
} from "react-native";
import React from "react";
const Home = ({ navigation }) => {
  return (
      
    <ImageBackground
      style={{flex: 1}}
      source={require("../assets/coffee.jpg")}
    >
       
      <View style={{ flex: 1, backgroundColor: "black", opacity: 0.2 }} />
      <View
        style={{
          position: "absolute",
          height: "100%",
          zIndex: 2,
          width: "100%",
          justifyContent: "flex-end",
          paddingHorizontal: 20,
          paddingBottom: 50,
        }}
      >
        <View>
          <Text
            style={{
              color: "white",
              fontWeight: "800",
              fontSize: 45,
              
            }}
          >
            Coffee so good, your taste buds will love it.
          </Text>
          <Text
            style={{
              color: "white",
              fontWeight: "300",
              fontSize: 17,
              
              
            }}
          >
           The best grain, the finest roast & the powerful flavor
          </Text>
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
      </View>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({});
