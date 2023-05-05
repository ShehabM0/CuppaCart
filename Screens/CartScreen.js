import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";

import { getProducts } from "../firebase/products";
import Cartcard from "../Components/cartcard";
import * as Haptics from "expo-haptics";

const CartScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  const getProductHandle = async () => {
    const arr = await getProducts();
    setProducts(arr);
  };

  useEffect(() => {
    getProductHandle();
  }, []);

  function checkoutnavigation() {
    navigation.navigate("Checkout");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={products}
          renderItem={(itemData) => {
            return (
              <Cartcard
                productName={itemData.item.productName}
                price={itemData.item.price}
                details={itemData.item.details}
                image={itemData.item.image}
                Rate={itemData.item.Rate}
                id={itemData.item.id}
              />
            );
          }}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={checkoutnavigation}>
        <Text style={styles.buttonText}>Proceed to checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: 350,
    backgroundColor: "#C67C4E",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 1,
    marginLeft: 20,
    top: -10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default CartScreen;
