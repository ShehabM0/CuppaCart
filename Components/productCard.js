import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";

const ProductCard = ({ productName, price, image, details, type, id }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
    onPress={() => {
      navigation.navigate("Productinfo", {
        productName,
        price,
        image,
        details,
        type,
        id,
      });
      {
        /**Login */
      }
    }}
    >
      <View
        style={{
          height: 170,
          width: 140,
        
          justifyContent: "center"
        }}
      >
        <Image
          style={{ width: 130, height: 100, alignContent: "center" ,
          borderRadius:20}}
          source={{uri:image}}
        />
        <Text style={{color:"white" , fontSize:16 ,fontWeight:200}}>
          {productName}
          {"\n"}price : {price} EGP
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
