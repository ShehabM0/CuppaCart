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
  import { auth, db } from "../firebase/config";
  import {
    addProduct,
    deleteProduct,
    editProduct,
    getProductByName,
    getProducts,
    subscribeProduct,
  } from "../firebase/products";
  import { doc, setDoc } from "firebase/firestore";
import Button from "../Components/Button";
import Input from "../Components/Input";
const EditProductScreen = ({navigation}) => {
    const [oldProductName, setOldProductName] = useState("");
    const [productName, setProductName] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [details, setDetails] = useState("");
    const handleEditProduct = async () => {
        const object = await getProductByName(oldProductName);
        try {
          setDoc(doc(db, "products", object.id), {
            productName,
            imageURL,
            price,
            type,
            details,
          });
          alert("edit done on Product with old Product name : " + oldProductName);
        } catch (err) {
          alert(err.massage);
        }
      };
  return (
    <ScrollView>
    <View style={styles.container} behavior={"padding"}>
    <View
      style={{
        width: "15%",
        fontSize: 18,
        color:  "#B9B9B9",
        padding: 12,
        borderRadius: 10,
        marginRight:400
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
      <Text
        style={{
          fontSize: 26,
          color: "black",
          fontWeight: "500",
          letterSpacing: 1,
        }}
      >
        Product Name You Want To Edit
      </Text>
     
      <Input
            placeholder="Old ProductName"
            value={oldProductName}
            onChangeText={(text) => setOldProductName(text)}
            iconName="rename-box"
            label="Old ProductName"
            style={styles.input}
          />
      <Text
        style={{
          fontSize: 26,
          color: "black",
          fontWeight: "500",
          letterSpacing: 1,
          marginTop: 5,
        }}
      >
        New Data
      </Text>
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
            value={imageURL}
            onChangeText={setImageURL}
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
        </View>
    <View style={styles.buttonContainer}>
    <Button
          title="ADD Product"
          onPress={() => {
            handleEditProduct();
          }}
        />
      {/* <TouchableOpacity
        onPress={() => {
          handleEditProduct();
        }}
        style={[styles.button, , styles.buttonOutline]}
      >
        <Text style={[styles.buttonOutlineText]}>Edit Product</Text>
      </TouchableOpacity> */}
    </View>
  </View>
  </ScrollView>
  )
}

export default EditProductScreen
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

        paddingHorizontal:5,
        paddingVertical: 7,
        borderRadius: 10,
        width:"92%"
        ,color:"black"
      },
    buttonContainer: {
      width: "60%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
    button: {
      backgroundColor: "#0782F9",
      width: "100%",
      padding: 5,
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
  