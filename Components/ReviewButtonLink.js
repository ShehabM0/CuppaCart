import React from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../Conts/Color"


export default function ReviewButtonLink({ image, name, bgcolor, nav }) {

  const navigation = useNavigation();

  const images = {
    addImg: require("../assets/add_review_icon.png"),
    reviewsImg: require("../assets/review_icon_black.png"),
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate(nav)}>
      <View style={[styles.addReviewCont, {backgroundColor: bgcolor}]}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ paddingTop: 2, paddingLeft: 5 }}>
            <Image
              style={[styles.addReviewImg, {backgroundColor: bgcolor}]}
              source={images[image]}
            />
          </View>
          <Text style={styles.addReviewTxt}> {name} </Text>
        </View>
        <View>
          <View style={{ paddingTop: 5, marginRight: 10 }}>
            <Image
              style={styles.rightArrow}
              source={require("../assets/arrow_right_icon.png")}
            />
          </View>
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
    borderWidth: 1,
    padding: 5,
  },
  addReviewImg: {
    width: 30,
    height: 30,
  },
  addReviewTxt: {
    paddingLeft: 5,
    fontWeight: "bold",
    fontSize: 18,
    color: COLORS.black,
  },
  rightArrow: {
    width: 25,
    height: 25,
  },
});
