import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Cartcard from "../Components/cartcard";
import * as Haptics from "expo-haptics";
import * as Font from "expo-font";
import React, { useState, useEffect } from "react";
import Loader from "../Components/Loader";
import { getProductByID } from "../firebase/products";
import { getUserById, getCurrUserId } from "../firebase/user";

import ButtonLoader from "../Components/ButtonLoader";
import { Foundation } from '@expo/vector-icons';

const CartScreen = ({ navigation }) => {

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userCart, setUserCart] = useState([]);
  const [ProductInCart, setProductInCart] = useState([]);

  const [fontLoaded, setFontLoaded] = useState(false);

  const getProductHandle = async () => {
    let allProducts = [];
    // setRefreshing(true);
    setLoading(true)
    for (const product of userCart) {
      const getProdduct = await getProductByID(product.product_id);
      allProducts.push({...getProdduct, id: product.product_id, qnt: product.qnt, size: product.size});
    }
    setLoading(false)
    // setRefreshing(false);
    setProductInCart(allProducts);
  };

  useEffect(() => {
    getProductHandle();
  }, [userCart]);

  useEffect(() => {
    const user_id = getCurrUserId();
    getUserById(user_id).then((user) => setUserCart(user[0].cart));
  }, []);

  useEffect(() => {
    if (refreshing) {
      const user_id = getCurrUserId();
      getUserById(user_id).then((user) => setUserCart(user[0].cart));
      getProductHandle();
      setRefreshing(false);
    }
  }, [refreshing]);
  
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
    <>
    <ScrollView style={styles.container}>
      <View style={styles.topBarContainer}/>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>My Cart</Text>
            <View style={{position: 'absolute', right: '2%', top: '15%'}}>
              {
                refreshing ?
                (
                  <ButtonLoader show={refreshing} color={"black"}/>
                ) :
                (
                  <TouchableOpacity onPress={() => setRefreshing(true) }>
                    <Foundation name="refresh" size={24} color="black" />
                  </TouchableOpacity>
                )
              }
            </View>
        </View>
          <Text style={styles.screenNameParagraph}>
            View , add or remove products from cart for later purchase
          </Text>
      </View>
      <View>
        {
          ProductInCart.map((item, index) =>
            <Cartcard
              key={index}
              sentCart={userCart}
              productName={item.productName}
              price={item.price[item.size]}
              image={item.image}
              id={item.id}
              qnt={item.qnt}
              size={item.size}
            />
          )
        }
      </View>
    </ScrollView>
  
    <Loader visible={loading} />
    {
      ProductInCart.length ?
      (
        <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center'}}>
          <TouchableOpacity style={styles.button} onPress={() => checkoutnavigation()}>
            <Text style={styles.buttonText}>Proceed to checkout</Text>
          </TouchableOpacity>
        </View>
      ) :
      (
        <View style={{flex: 50, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Oops! looks like your cart is empty</Text>
        </View>
      )
    }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: "#F5F5F5",
    // alignItems: "center",
    // justifyContent: "flex-start",
    // flex: 1,
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
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
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
    marginVertical: 20,
    padding: 10,
    borderRadius: 10,
    // paddingVertical: 10,
    // alignItems: "center",
    // borderRadius: 10,
    // marginTop: 50,
    // width: "30%",
    // marginLeft: "25%",
    // position: "absolute",
    // bottom: 20,
    // zIndex: 2,
  },
  buttonText: {
    textAlign: 'center',
    color: "white",
    fontFamily: "sora-regular",
    fontSize: 15,
  },
  emptyContainer: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CartScreen;


/* <FlatList
data={ProductInCart}
keyExtractor={(item, index) => index.toString()}
renderItem={({ item }) => (
<Cartcard 
productName={item.productName}
price={item.price[item.size]}
image={item.image}
id={item.id}
qnt={item.qnt}
size={item.size}
/>
)}
refreshing={refreshing}
onRefresh={() => setRefreshing(true)}
/> */