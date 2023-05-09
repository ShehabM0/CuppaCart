import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import Entypo from "react-native-vector-icons/Entypo";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProductByName,
  getProducts,
  subscribeProduct,
} from "../firebase/products";
import Button from "../Components/Button";
import Input from "../Components/Input";
const AddProductsScreen = ({ navigation }) => {
  const [productName, setProductName] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [details, setDetails] = useState("");
  const [quantity, setquantity] = useState();

  const handleAddProduct = () => {
    addProduct({
      productName,
      image,
      price,
      type,
      details,
      quantity,
    });
    alert("Product Added with Product Name : " + productName);
  };
  return (
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
            placeholder="price"
            value={price}
            onChangeText={(text) => setPrice(text)}
            iconName="bitcoin"
            label="price"
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
    marginTop: 40,
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