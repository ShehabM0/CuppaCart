import react, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
const ProductCard = ({
  productName,
  price,
  image,
  details,
  type,
  id,
  Rate,
}) => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Product", {
          productName,
          price,
          image,
          details,
          type,
          id,
          Rate,
        });
        {
          /**Login */
        }
      }}
    >
      <View
        style={{
          width: 180,
          marginBottom: 15,
          marginRight: 8,
          borderRadius: 10 * 2,
          overflow: "hidden",
        }}
      >
        <BlurView
          tint="dark"
          intensity={95}
          style={{
            padding: 10,
          }}
        >
          <TouchableOpacity
            style={{
              height: 150,
              width: "100%",
            }}
          >
            <Image
              source={{ uri: image }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 10 * 2,
              }}
            />
            <View
              style={{
                position: "absolute",
                right: 0,
                borderBottomStartRadius: 10 * 3,
                borderTopEndRadius: 10 * 2,
                overflow: "hidden",
              }}
            >
              <BlurView
                tint="dark"
                intensity={70}
                style={{
                  flexDirection: "row",
                  padding: 10 - 2,
                }}
              >
                <Ionicons
                  style={{
                    marginLeft: 10 / 2,
                  }}
                  name="star"
                  color={"#D17842"}
                  size={10 * 1.7}
                />
                <Text
                  style={{
                    color: "white",
                    marginLeft: 10 / 2,
                  }}
                >
                  {Rate}
                </Text>
              </BlurView>
            </View>
          </TouchableOpacity>
          <Text
            numberOfLines={2}
            style={{
              color: "white",
              fontWeight: "600",
              fontSize: 10 * 1.7,
              marginTop: 10,
              marginBottom: 10 / 2,
            }}
          >
            {productName}
          </Text>
          <Text
            numberOfLines={1}
            style={{ color: "#1C0A00", fontSize: 10 * 1.2 }}
          >
            With Oat milk
          </Text>
          <View
            style={{
              marginVertical: 10 / 2,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: "#D17842",
                  marginRight: 10 / 2,
                  fontSize: 10 * 1.6,
                }}
              >
                $
              </Text>
              <Text style={{ color: "white", fontSize: 10 * 1.6 }}>
                {price}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#D17842",
                padding: 10 / 2,
                borderRadius: 10,
              }}
            >
              <Ionicons name="add" size={10 * 2} color={"white"} />
            </TouchableOpacity>
          </View>
        </BlurView>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
