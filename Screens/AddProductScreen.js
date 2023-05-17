import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import SuccessMessage from "../Components/SuccessMessage";
import Entypo from "react-native-vector-icons/Entypo";
import { addProduct } from "../firebase/products";
import Button from "../Components/Button";
import Input from "../Components/Input";


const AddProductsScreen = ({ navigation }) => {
  const [productName, setProductName] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [coin, setCoin] = useState("");
  const [type, setType] = useState("");
  const [details, setDetails] = useState("");
  const [quantity, setquantity] = useState(0);
  const [success, setSuccess] = useState(false);

  function handleCoins() {
    let coins = coin.trim();
    coins = coins.split(" ");
    if(coins.length != 3) {
      alert("Coins must be three values one for Small, Medium and Large sizes");
      return false;
    }
    coins.forEach(coin => {
      if(isNaN(coin)) {
        alert("Coins must be three values one for Small, Medium and Large sizes");
        return false;
      }
    })
    coins = coins.map((str) => { return parseInt(str); });
    return coins;
  }

  function handlePrices() {
    let prices = price.trim();
    prices = prices.split(" ");
    if(prices.length != 3) {
      alert("Prices must be three values one for Small, Medium and Large sizes");
      return false;
    }
    prices.forEach(price => {
      if(isNaN(price)) {
        alert("Prices must be three values one for Small, Medium and Large sizes");
        return false;
      }
    })
    prices = prices.map((str) => { return parseInt(str); });
    return prices;
  }

  const handleAddProduct = () => {
    const price = handlePrices();
    const coin = handleCoins();
    if(price && coin) {
      addProduct({
        productName,
        image,
        price,
        coin,
        type,
        details,
        quantity,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }
  };
  return (
    <>
    {
      success &&
      <SuccessMessage message={`Product ${productName} Added`}/>
    }
    <ScrollView style={{ padding: 20 }}>
      <View style={styles.container} behavior={"padding"}>
        <View
          style={{
            width: "80%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 28,
              fontWeight: "500",
            }}
          >
            Add Product
          </Text>
        </View>

        <View
          style={{
            width: "10%",
            fontSize: 18,
            color: "#B9B9B9",
            borderRadius: 10,
          }}
        >
          <TouchableOpacity>
            <Entypo
              name="chevron-thin-left"
              style={{
                fontSize: 18,
                color: "black",
                padding: 12,
                borderRadius: 10,
                backgroundColor: "#F0F0F3",
              }}
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Input
            onChangeText={(text) => setProductName(text)}
            value={productName}
            iconName="rename-box"
            label="ProductName"
            placeholder="Enter Product Name"
            style={styles.input}
          />
          <Input
            placeholder="Image"
            value={image}
            onChangeText={setImage}
            iconName="image"
            label="Image"
            style={styles.input}
          />
          <Input
            placeholder="Small Medium Large"
            value={price}
            onChangeText={(text) => setPrice(text)}
            iconName="cash"
            label="Prices 'Enter 3 integer values seperated by space'"
            style={styles.input}
          />
          <Input
            placeholder="Small Medium Large"
            value={coin}
            onChangeText={(text) => setCoin(text)}
            iconName="bitcoin"
            label="Coins 'Enter 3 integer values seperated by space'"
            style={styles.input}
          />

          <Input
            placeholder="details"
            value={details}
            onChangeText={(text) => setDetails(text)}
            iconName="details"
            label="details"
            style={styles.input}
          />
          <Input
            placeholder="type"
            value={type}
            onChangeText={(text) => setType(text)}
            iconName="information"
            label="type"
            style={styles.input}
          />
          <Input
            placeholder="Quantity"
            value={quantity}
            onChangeText={(text) => setquantity(text)}
            iconName="account-star-outline"
            label="Quantity"
            style={styles.input}
          />
        </View>
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity
          onPress={() => {
            handleAddProduct();
          }}
          style={[styles.button, , styles.buttonOutline]}
        >
          <Text style={[styles.buttonOutlineText]}>Add Product</Text>
        </TouchableOpacity> */}
          <Button
            title="ADD Product"
            onPress={() => {
              handleAddProduct();
            }}
          />
        </View>
      </View>
    </ScrollView>
    </>
  );
};

export default AddProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "85%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    color: "black",
    fontSize: 18,
    width:"93%"

  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  image: {
    width: 250,
    height: 250,
  },
});