import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Cartcard from "../Components/cartcard";
import * as Haptics from "expo-haptics";
import * as Font from "expo-font";
import React, { useState, useEffect } from "react";
import { getProductByID } from "../firebase/products";
import { getUserById, getCurrUserId } from "../firebase/user";

const CartScreen = ({ navigation }) => {
  const [userCart, setUserCart] = useState([]);
  const [ProductInCart, setProductInCart] = useState();
  const [fontLoaded, setFontLoaded] = useState(false);

  const getProductHandle = async () => {
    let allProducts = [];
    for (const product of userCart) {
      const getProdduct = await getProductByID(product.product_id);
      allProducts.push({...getProdduct, id: product.product_id, qnt: product.qnt, size: product.size});
    }
    setProductInCart(allProducts);
  };

  useEffect(() => {
    getProductHandle();
  }, [userCart]);

  useEffect(() => {
    const user_id = getCurrUserId();
    getUserById(user_id).then((user) => setUserCart(user[0].cart));
  }, [userCart, navigation]);

  function checkoutnavigation() {
    navigation.navigate("Checkout");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
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
    <View style={styles.container}>
      <View style={styles.topBarContainer}/>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>My Cart</Text>
        </View>
          <Text style={styles.screenNameParagraph}>
            View , add or remove products from cart for later purchase
          </Text>
      </View>
      <View style={{ flex: 1, width: "105%", padding: 20 }}>
        {
          ProductInCart.map((itemData, index) => {
            return (
              <Cartcard
                key={index}
                productName={itemData.productName}
                price={itemData.price[itemData.size]}
                image={itemData.image}
                id={itemData.id}
                qnt={itemData.qnt}
                size={itemData.size}
              />
            );
          })
        }
      </View>

      <View style={styles.emptyView}/>

      <TouchableOpacity style={styles.button} onPress={checkoutnavigation}>
        <Text style={styles.buttonText}>Proceed to checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "flex-start",
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
  screenNameContainer: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  screenNameText: {
    color: "#1C0A00",
            fontSize: 40,
            fontFamily: "Sora-SemiBold",
            marginBottom: 11,
            marginTop: -10,
  },
  screenNameParagraph: {
    fontFamily: "sora-regular",
    color: "#BABBC3",
    fontSize: 18,
    marginBottom: 10,
  },
  bodyContainer: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  emptyView: {
    height: 15,
  },
  ListContiainerEmpty: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  secondaryTextSmItalic: {
    fontStyle: "italic",
    fontSize: 15,
    color: "#707981",
  },
  button: {
    backgroundColor: "#C67C4E",
    width: "30%",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 50,
    marginLeft: "25%",
    position: "absolute",
    bottom: 20,
    zIndex: 2,
  },
  buttonText: {
    color: "white",
    fontFamily: "sora-regular",
        fontSize: 15,
  },
});

export default CartScreen;



{/* <FlatList
  style={{ flex: 1, width: "105%", padding: 20 }}
  data={ProductInCart}
  numColumns={1}
  showsHorizontalScrollIndicator={true}
  renderItem={(itemData, index) => (
      <View key={index}>
        <Cartcard
          productName={itemData.item.productName}
          price={itemData.item.price[itemData.item.size]}
          image={itemData.item.image}
          id={itemData.item.id}
          qnt={itemData.item.qnt}
          size={itemData.item.size}
        />
      </View>
  )}
/> */}