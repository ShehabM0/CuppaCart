import { TouchableOpacity, StyleSheet, Text, View,Image } from "react-native";
import React, { useState, useEffect } from "react";
import { getProductByID } from "../firebase/products";
import { MaterialIcons } from '@expo/vector-icons';

const BasicProductList = ({ id, quantity, size, cash, coins, error, cb1, cb2 }) => {

  const sizes = ["Small", "Medium", "Large"]
  const [productName, setProductName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    getProductByID(id)
    .then(product => {
      setProductName(product.productName);
      setImage(product.image);
    });
  }, [])


  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.IconContainer}>
          {
            image && 
            <Image 
              style={styles.img}
              source={{uri: image}}>
            </Image>
          }
          {
            !image && 
            <Image 
              style={styles.img}
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}}>
            </Image>
          }
        </View>
        <View style={styles.productInfoContainer}>
          <Text style={styles.secondaryText}>{productName}</Text>
          <Text>x{quantity} {sizes[size]}</Text>
        </View>
      </View>
      
      <View style={{ display:"flex", flexDirection: 'row' }}>
        <Text>{cash}$/{coins}C</Text>
        {
          error &&
          <TouchableOpacity onPress={() => {
            cb1(error)
            cb2(true)
          }}>
            <View style={{paddingLeft: 5}}>
              <MaterialIcons name="error-outline" size={24} color="red" />
            </View>
          </TouchableOpacity>
        }
      </View>
    </View>
  );
};

export default BasicProductList;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
    padding: 5,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  productInfoContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 10,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  IconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    borderRadius: 5,
  },
  primaryText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FB6831",
    fontFamily: "sora-regular"
  },
  secondaryText: {
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "sora-regular"
  },
});

{/* <View>
  <Text style={styles.primaryText}>{price}$</Text>
</View> */}