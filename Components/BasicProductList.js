import { StyleSheet, Text, View,Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const BasicProductList = ({ productName,
    price,
    quantity,image }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.IconContainer}>
          <Image source={{uri:image}} />
        </View>
        <View style={styles.productInfoContainer}>
          <Text style={styles.secondaryText}>{productName}</Text>
          <Text>x2</Text>
        </View>
      </View>
      <View>
        <Text style={styles.primaryText}>{price}$</Text>
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
  },
  secondaryText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
