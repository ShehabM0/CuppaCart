import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as LocalAuthentication from "expo-local-authentication";
import * as Font from "expo-font";

import BasicProductList from "../Components/BasicProductList";
import WarningMessage from "../Components/WarningMessage";
import SuccessMessage from "../Components/SuccessMessage";
import Loader from "../Components/Loader";

import { getCurrUserId, getUserById } from "../firebase/user";
import { 
  getTotalSumInCoins,
  getTotalSumInCash,
  orderCartInCoins,
  orderCartInCash,
  getTotalCoins,
  getTotalCash,
  getTotalQnt
} from "../firebase/cart";

const CheckoutScreen = ({ navigation }) => {

  const user_id = getCurrUserId();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [warning, setWarning] = useState(false);
  const [Products, setProducts] = useState([]);
  const [index, setIndex] = useState("Cash");
  const [fontLoaded, setFontLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [totalInCash, setTotalInCash] = useState(0);
  const [totalInCoins, setTotalInCoins] = useState(0);


  useEffect(() => {
    let totalCoins = 0;
    const getTotal = async () => {
      await getTotalCoins().then((total) => totalCoins = total);
    };
    getTotal().then(() => setTotalInCoins(totalCoins));
  }, [totalInCoins]);

  useEffect(() => {
    let totalCash = 0;
    const getTotal = async () => {
      await getTotalCash().then((total) => totalCash = total);
    }
    getTotal().then(() => setTotalInCash(totalCash));
  }, [totalInCash]);

  useEffect(() => {
    getUserById(user_id).then((user) => {
      setEmail(user[0].email);
      setPhone(user[0].phone);
    });
  }, []);

  function CheckOutInCash() {
    // TODO
  }
  function CheckOutInCoins() {
    // TODO
  }

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
          promptMessage: "Authenticate Using Face ID",
          fallbackLabel: "Use passcode instead",
          disableDeviceFallback: false,
          cancelLabel: "Cancel",
        });
        if (result.success) {
          navigation.navigate("Home");
          return;
        }
      }
      if (
        supportedTypes.includes(
          LocalAuthentication.AuthenticationType.FINGERPRINT
        )
      ) {
        let result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Authenticate Using Fingerprint",
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

  const getProductsHandle = async () => {
    await getUserById(user_id)
    .then(async (user) => {
      const result = user[0].cart.reduce((acc, product) => {
      if (!acc[product.product_id])
        acc[product.product_id] = { product_id: product.product_id, qnt: 0 };
      acc[product.product_id].qnt += product.qnt;
      return acc;
      }, {});
      const cartProducts = Object.values(result);
      setProducts(cartProducts);
    })
  };
  useEffect(() => {
    getProductsHandle();
  }, []);

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
    <>
      <Loader visible={loading} />
      {success && <SuccessMessage message={"You payment has been done"} />}

      <View style={styles.container}>
        <View style={styles.topBarContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons
              name="arrow-back-circle-outline"
              size={30}
              color={"#707981"}
            />
          </TouchableOpacity>
          <View style={{ flex: 2, alignItems: "center", right: 23 }}>
            <Text
              style={{
                color: "#1C0A00",
                fontSize: 24,
                fontFamily: "Sora-SemiBold",
                textAlign: "center",
              }}
            >
              Order
            </Text>
          </View>
          <View></View>
        </View>
        <ScrollView style={styles.bodyContainer} nestedScrollEnabled={true}>
          <Text style={styles.primaryText}>Order Summary</Text>
          <ScrollView
            style={[styles.orderSummaryContainer]}
            nestedScrollEnabled={true}
          >
            <FlatList
              showsVerticalScrollIndicator={false}
              data={Products}
              horizontal={false}
              renderItem={(itemData) => {
                return (
                  <BasicProductList
                    quantity={itemData.item.qnt}
                    id={itemData.item.product_id}
                  />
                );
              }}
            />
          </ScrollView>
          <View style={{ marginTop: 20, flexDirection: "row" }}>
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
                backgroundColor: index === "Cash" ? "#C67C4E" : "#F2F2F2",
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
                    color: index === "Cash" ? "white" : "black",
                    flex: 0,
                    flexGrow: 0,
                  }}
                  onPress={() => setIndex("Cash")}
                >
                  Cash
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
                backgroundColor: index === "Coins" ? "#C67C4E" : "#F2F2F2",
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
                    color: index === "Coins" ? "white" : "black",
                    flex: 0,
                    marginLeft: 25,
                    flexGrow: 0,
                  }}
                  onPress={() => setIndex("Coins")}
                >
                  Coins
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {index === "Cash" ? (
            <View>
              <Text style={styles.primaryText}>Total</Text>
              <View style={styles.totalOrderInfoContainer}>
                <View style={styles.list}>
                  <Text style={styles.primaryTextSm}>Order</Text>
                  <Text style={styles.secondaryTextSm}>{totalInCash}$</Text>
                </View>
                <View style={styles.list}>
                  <Text style={styles.primaryTextSm}>Delivery</Text>
                  <Text style={styles.secondaryTextSm}>
                    {(totalInCash * 0.05).toFixed(2)} $
                  </Text>
                </View>
                <View style={styles.list}>
                  <Text style={styles.primaryTextSm}>Total In Cash</Text>
                  <Text style={styles.secondaryTextSm}>
                    {totalInCash + (totalInCash * 0.05)} $
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View>
              <Text style={styles.primaryText}>Total</Text>
              <View style={styles.totalOrderInfoContainer}>
                <View style={styles.list}>
                  <Text style={styles.primaryTextSm}>Order</Text>
                  <Text style={styles.secondaryTextSm}>{totalInCoins}$</Text>
                </View>
                <View style={styles.list}>
                  <Text style={styles.primaryTextSm}>Delivery</Text>
                  <Text style={styles.secondaryTextSm}>{(totalInCoins * 0.05).toFixed(2)} $</Text>
                </View>
                <View style={styles.list}>
                  <Text style={styles.primaryTextSm}>Total In Coins</Text>
                  <Text style={styles.secondaryTextSm}>{totalInCoins + (totalInCoins * 0.05)} $</Text>
                </View>
              </View>
            </View>
          )}

          <Text style={styles.primaryText}>Contact</Text>
          <View style={styles.listContainer}>
            <View style={styles.list}>
              <Text style={styles.secondaryTextSm}>Email</Text>
              <Text style={styles.secondaryTextSm}>{email}</Text>
            </View>
            <View style={styles.list}>
              <Text style={styles.secondaryTextSm}>Phone</Text>
              <Text style={styles.secondaryTextSm}>{phone}</Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#C67C4E",
                width: "80%",
                paddingVertical: 10,
                borderRadius: 10,
                alignItems: "center",
                marginTop: 50,
                marginLeft: "10%",
              }}
              onPress={handleAuthentication} // add handleAuthentication
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontFamily: "sora-regular",
                }}
              >
                Order
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.emptyView}></View>
        </ScrollView>
      </View>
    </>
  );
};
export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 0,
    flex: 1,
  },
  topBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  toBarText: {
    fontSize: 15,
    fontWeight: "600",
  },
  bodyContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  orderSummaryContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    maxHeight: 220,
    fontFamily: "sora-regular",
  },
  totalOrderInfoContainer: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
  },
  primaryText: {
    marginBottom: 5,
    marginTop: 5,
    fontSize: 20,
    fontFamily: "Sora-SemiBold",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "white",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
    padding: 10,
  },
  primaryTextSm: {
    fontSize: 15,
    fontFamily: "sora-regular",
    color: "black",
  },
  secondaryTextSm: {
    fontSize: 15,
    fontFamily: "sora-regular",
  },
  listContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  buttomContainer: {
    width: "100%",
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  emptyView: {
    width: "100%",
    height: 20,
  },
  modelBody: {
    flex: 1,
    display: "flex",
    flexL: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modelAddressContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: 320,
    height: 400,
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 3,
  },
});
