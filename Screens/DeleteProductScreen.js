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
const DeleteProductScreen = ({navigation}) => {
    const [productName, setProductName] = useState("");
    const handleDeleteProduct = async () => {
        const object = await getProductByName(productName);
        deleteProduct(object);
        alert("Product Deleted With Product Name : " + productName);
      };
  return (
    <View style={styles.container} behavior={"padding"}>
    <View
      style={{
        width: "15%",
        fontSize: 18,
        color: "#B9B9B9",
        padding: 0,
        borderRadius: 10,
        marginRight:400,
      
        
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
           placeholder="Product Name"
           value={productName}
           onChangeText={(text) => setProductName(text)}
            iconName="rename-box"
            label="productName"
            style={styles.input}
          />
    </View>
    <View style={styles.buttonContainer}>
    <Button
          title="Delete Product"
          onPress={() => {
            handleDeleteProduct();
          }}
        />
    </View>
  </View>
  )
}

export default DeleteProductScreen
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
      paddingHorizontal:5,
      paddingVertical: 7,
      borderRadius: 10,
      width:"95%"
      ,color:"black"
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
  