import React from "react";
import {  StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { MaterialIcons, Feather } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../Conts/Color"

export default function ReviewButtonLink({ image, name, nav, product_id }) {

  const navigation = useNavigation();
  const icons = [
    <MaterialIcons name="rate-review" size={24} color="white" />,
    <MaterialIcons name="add-comment" size={24} color="white" />
  ];

  return (
    <TouchableOpacity onPress={() => navigation.navigate(nav, { product_id })}>
      <View style={[styles.addReviewCont, {backgroundColor: "#C67C4E"}]}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ justifyContent: "center", marginHorizontal: 5 }}>
            {icons[image]}
          </View>
          <Text style={styles.addReviewTxt}> {name} </Text>
        </View>
        <View style={{ justifyContent: 'center', marginHorizontal: 10 }}>
          <Feather name="arrow-right-circle" size={24} color="white" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addReviewCont: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    padding: 8,
  },
  addReviewTxt: {
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: 18,
    color:"#ffffff",
  },
});
