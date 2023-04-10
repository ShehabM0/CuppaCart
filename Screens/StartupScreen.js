import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
  const WelcomeScreen = ({navigation}) => {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../assets/coffee5.jpg")}
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
                fontSize:45,
                textTransform: "capitalize",
              }}
            >
              Let your favorite Coffee find you
            </Text>
            <Text
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: 17,
              }}
            >
              Dolore reprehenderit id ea eu voluptate deserunt occaecat occaecat.
            </Text>
            <TouchableOpacity
              style={{
                padding: 20,
                backgroundColor:"white",
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
                Explorer Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  };
  
  export default WelcomeScreen;
  
  const styles = StyleSheet.create({});
  