import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import * as Haptics from "expo-haptics";
import * as LocalAuthentication from "expo-local-authentication";

const CheckoutScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [index, setIndex] = useState("Deliver");
  async function handleAuthentication() {
    let hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (hasHardware) {
      let supportedTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      if (
        supportedTypes.includes(
          LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
        )
      ) {
        let result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Authenticate using Face ID",
          fallbackLabel: "Use passcode instead",
          disableDeviceFallback: false,
          cancelLabel: "Cancel",
        });
        if (result.success) {
          navigation.navigate("TabsNav");
          return;
        }
      }
      if (
        supportedTypes.includes(
          LocalAuthentication.AuthenticationType.FINGERPRINT
        )
      ) {
        let result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Authenticate using Fingerprint",
          fallbackLabel: "Use passcode instead",
          disableDeviceFallback: false,
          cancelLabel: "Cancel",
        });
        if (result.success) {
          navigation.navigate("Home");
          return;
        }
      }
    }
    navigation.navigate("Cart");
  }

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Sora-SemiBold": require("../assets/Fonts/static/Sora-SemiBold.ttf"),
        "sora-regular": require("../assets/Fonts/static/Sora-Regular.ttf"),
        "sora-light": require("../assets/Fonts/static/Sora-Light.ttf"),
      });
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null; // Render nothing until the font is loaded
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Order</Text>
        <View style={styles.mainContainer}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 10,
              paddingHorizontal: 14,
              width: 153.5,
              height: 40,
              borderRadius: 10,
              gap: 10,
              flex: 0,
              flexGrow: 1,
              backgroundColor: index === "Deliver" ? "#C67C4E" : "#F2F2F2",
            }}
          >
            <TouchableOpacity>
              <Text
                style={{
                  width: 59,
                  height: 20,
                  fontFamily: "sora-regular",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: 16,
                  lineHeight: 20,
                  color: index === "Deliver" ? "white" : "black",
                  flex: 0,

                  flexGrow: 0,
                }}
                onPress={() => setIndex("Deliver")}
              >
                Deliver
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 10,
              paddingHorizontal: 14,
              gap: 10,
              width: 153.5,
              height: 40,
              backgroundColor: index === "PickUp" ? "#C67C4E" : "#F2F2F2",
              borderRadius: 10,
              flex: 0,
              flexGrow: 1,
            }}
          >
            <TouchableOpacity>
              <Text
                style={{
                  width: 62,
                  height: 20,
                  fontFamily: "sora-regular",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: 16,
                  lineHeight: 20,
                  color: index === "PickUp" ? "white" : "black",
                  flex: 0,
                  marginLeft: 25,

                  flexGrow: 0,
                }}
                onPress={() => setIndex("PickUp")}
              >
                Pick Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {index === "Deliver" && (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: 0,
              gap: 16,
              position: "absolute",
              width: 315,
              height: 120,
              left: 30,
              top: 180,
            }}
          >
            <Text style={styles.addressTitle}>Delivery Address</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: 0,
                gap: 8,
                width: 315,
                height: 41,
                flex: 0,

                flexGrow: 0,
              }}
            >
              <Text style={styles.address}>Cairo University</Text>
              <Text style={styles.detailedAddress}>
                Faculty of Science, Math department
              </Text>
            </View>
          </View>
        )}
        {index === "PickUp" && (
          <TouchableOpacity
            style={{
              position: "absolute",
              width: "26%",
              height: "6%",
              backgroundColor: "#C67C4E",
              left: 140,
              top: 190,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "sora-regular",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: 20,
                width: 120,
                height: 90,
                top: 5,
                left: 2,
                color: "white",
              }}
            >
              Add Time
            </Text>
          </TouchableOpacity>
        )}
        <View
          style={{
            position: "absolute",
            width: 315,
            height: 0,
            left: 30,
            top: 270,
            borderWidth: 1,
            borderColor: "#EAEAEA",
          }}
        />

        {/* product card */}

        <View
          style={{
            dflexDirection: "row",
            justifyContent: "space-between",
            borderRadius: 10,
            padding: 0,
            gap: 66,
            position: "absolute",
            width: 315,
            height: 54,
            left: 30,
            top: 310,
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 0,
              gap: 10,
              width: 159,
              height: 54,
            }}
          >
            <Image
              style={{
                width: 54,
                height: 54,
                borderRadius: 12,
              }}
              source={require("../assets/coffee.jpg")}
            />
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                padding: 0,
                gap: 4,
                width: 93,
                height: 39,
              }}
            >
              <Text
                style={{
                  fontFamily: "Sora-SemiBold",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: 16,
                  lineHeight: 20,
                  color: "#2F2D2C",
                  marginTop: 0,
                  marginBottom: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  paddingHorizontal: 0,
                  paddingVertical: 0,
                  width: 100,
                  height: 20,
                }}
              >
                Cappucino
              </Text>

              <Text
                style={{
                  width: 93,
                  height: 15,
                  fontFamily: "sora-regular",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: 12,
                  lineHeight: 15,
                  color: "#9B9B9B",
                  flex: 0,
                  flexGrow: 0,
                }}
              >
                with Chocolate
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 0,
                width: 90,
                marginHorizontal: 55,

                height: 28,
              }}
            ></View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            padding: 4,
            position: "absolute",
            width: 315,
            top: 430,
            height: 48,
            left: 30,

            backgroundColor: "#F2F2F2",
            borderRadius: 14,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 10,
              paddingHorizontal: 14,
              gap: 10,
              width: 153.5,
              height: 40,
              backgroundColor: "#C67C4E",
              borderRadius: 10,
              flex: 0,

              flexGrow: 1,
            }}
          >
            <TouchableOpacity>
              <Text
                style={{
                  width: 59,
                  height: 20,
                  fontFamily: "sora-regular",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: 16,
                  lineHeight: 20,
                  color: "#FFFFFF",
                  flex: 0,

                  flexGrow: 0,
                }}
              >
                Credit
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 10,
              paddingHorizontal: 14,

              gap: 10,
              width: 153.5,
              height: 40,
              backgroundColor: "#F2F2F2",
              borderRadius: 20,
              flex: 0,

              flexGrow: 1,
            }}
          >
            <TouchableOpacity>
              <Text
                style={{
                  width: 62,
                  height: 20,
                  fontFamily: "sora-regular",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: 16,
                  lineHeight: 20,
                  color: "#2F2D2C",
                  flex: 0,

                  flexGrow: 0,
                }}
              >
                Cash
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text
          style={{
            position: "absolute",
            width: 250,
            height: 20,
            left: 30,
            top: 490,
            fontFamily: "Sora-SemiBold",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: 16,
            lineHeight: 20,
            color: "#2F2D2C",
          }}
        >
          Payment Summary
        </Text>

        <Text
          style={{
            position: "absolute",
            width: 38,
            height: 18,
            left: 30,
            top: 490 + 30,
            fontFamily: "sora-regular",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: 14,
            lineHeight: 18,
            color: "#2F2D2C",
          }}
        >
          Price
        </Text>
        <Text
          style={{
            position: "absolute",
            width: 43,
            height: 18,
            left: 302,
            top: 490 + 30,
            fontStyle: "normal",
            fontFamily: "sora-regular",
            fontWeight: "600",
            fontSize: 14,
            lineHeight: 18,
            textAlign: "right",
            color: "#2F2D2C",
          }}
        >
          $ 4.53
        </Text>

        <Text
          style={{
            position: "absolute",
            width: 88,
            height: 18,
            left: 30,
            top: 485 + 60,
            fontWeight: "400",
            fontFamily: "sora-regular",
            fontSize: 14,
            lineHeight: 18,
            color: "#2F2D2C",
          }}
        >
          Delivery Fee
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            padding: 0,
            paddingRight: 30,
            paddingLeft: 0,
            gap: 8,
            position: "absolute",
            width: 77,
            height: 18,
            right: 30,
            top: 485 + 60,
          }}
        >
          {/* Add your child elements here */}
          <Text
            style={{
              width: 55,
              height: 18,
              fontWeight: "600",
              fontFamily: "sora-regular",
              fontSize: 14,
              lineHeight: 18,
              textAlign: "right",
              color: "black",
              flex: 0,
              flexGrow: 0,
            }}
          >
            {" "}
            $ 1.0{" "}
          </Text>
        </View>
        <View
          style={{
            position: "absolute",
            width: 320,
            height: 2,
            left: 30,
            top: 510 + 63,
            borderBottomWidth: 1,
            borderBottomColor: "#EAEAEA",
            backgroundColor: "black",
          }}
        />

        <Text style={styles.totalPayment}>Total Payment</Text>
        <Text
          style={{
            position: "absolute",
            width: 43,
            height: 18,
            left: 302,
            top: 520 + 60,
            fontFamily: "sora-regular",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: 14,
            lineHeight: 18,
            textAlign: "right",
            color: "#2F2D2C",
          }}
        >
          $ 5.53
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#C67C4E",
            width: "30%",
            paddingVertical: 10,
            borderRadius: 10,
            alignItems: "center",
            marginTop: 50,
            marginLeft: "25%",
            position: 'absolute',
            bottom: 20,
            zIndex: 2,
          }}

          onPress={() => handleAuthentication()}>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontFamily:"sora-regular"
            }}
          >
            Order
          </Text>
        </TouchableOpacity>
        {/*  */}
        {/* <Text style={styles.price}>Price</Text>
        <Text style={styles.delivery}>Delivery Fee</Text>
        <View style={styles.line1} />
       
        <TouchableOpacity
          style={{
            padding: 20,
            backgroundColor: "#C67C4E",
            borderRadius: 20,
            alignItems: "center",
            marginTop: 30,
            top: 355,
          }}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "TabsNav" }],
            })
          }
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontFamily: "Sora-SemiBold",
            }}
          >
            Order
          </Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
  },

  mainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 4,
    position: "absolute",
    width: 315,
    top: 95,
    height: 48,
    left: 30,

    backgroundColor: "#F2F2F2",
    borderRadius: 14,
  },
  title: {
    color: "#2F2D2C",
    fontSize: 20,
    fontFamily: "Sora-SemiBold",
    position: "absolute",
    left: "45.67%",
    right: "42.67%",
    top: "7.0%",
    bottom: "89.78%",
    width: 100,
  },
  addressTitle: {
    width: 140,
    height: 20,
    fontFamily: "Sora-SemiBold",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 20,
    color: "#2F2D2C",
    flex: 0,
    flexGrow: 0,
  },
  address: {
    width: 120,
    height: 15,
    fontFamily: "sora-regular",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 18,
    color: "#303336",
    flex: 0,
    flexGrow: 0,
  },
  detailedAddress: {
    width: 315,
    height: 15,
    fontFamily: "sora-regular",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    color: "#808080",
    flex: 0,
    flexGrow: 0,
  },
  line: {
    position: "absolute",
    width: 315,
    height: 0,
    left: 30,
    top: 230,
    borderWidth: 0.7,
    borderColor: "#EAEAEA",
  },
  rectangle: {
    position: "absolute",
    width: "120%",
    height: 4,
    top: 400,
    borderWidth: 0,
    backgroundColor: "#F4F4F4",
  },

  payment: {
    marginBottom: 8,
    color: "#2F2D2C",
    fontSize: 16,
    height: 153,
    fontFamily: "Sora-SemiBold",
    top: "50%",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 0,
    gap: 16,
    left: "1.0%",
  },

  price: {
    position: "absolute",
    display: "flex",
    fontSize: 14,
    fontFamily: "sora-regular",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingBottom: 20,
    width: 320,
    height: 41,
    top: 530,
    left: 25,
  },
  delivery: {
    position: "absolute",
    display: "flex",
    fontSize: 14,
    fontFamily: "sora-regular",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingBottom: 20,
    width: 320,
    height: 41,
    top: 550,
    left: 25,
  },
  line1: {
    position: "absolute",
    width: 320,
    height: 1,
    left: 30,
    top: 590,
    borderWidth: 0.7,
    borderColor: "#EAEAEA",
  },
  totalPayment: {
    position: "absolute",
    display: "flex",
    fontSize: 14,
    fontFamily: "sora-regular",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingBottom: 20,
    width: 320,
    height: 41,
    top: 520 + 60,
    left: 30,
  },
});
export default CheckoutScreen;
