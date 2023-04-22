import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  FlatList,
  TextInput,
  StatusBar
} from "react-native";
import { auth } from "../firebase/config";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { getUserUId, getUserById } from "../firebase/user";
import { getProducts } from "../firebase/products";
import ProductCard from "../Components/productCard";
import { logout } from "../firebase/auth";

const { width } = Dimensions.get("window");
const d = Dimensions.get("window");
export default function ProfileScreen({ navigation }) {
  const [fullname, setfullname] = useState("");
  const [image, setimage] = useState(null);
  const [role, setRole] = useState("");
  const [products, setProducts] = useState([]);

  const getProductHandle = async () => {
    const arr = await getProducts();
    setProducts(arr);
  };

  useEffect(() => {
    getProductHandle();
  }, []);
  const ss = () => {
    logout(auth).then(() => {
      console.log("sign out done");
      navigation.navigate("SignIn");
    });
  };
  useEffect(() => {
    getUserUId().then((id) => {
      getUserById(id).then((user) => {
        setfullname(user[0].fullname);
        setimage(user[0].image);
        setRole(user[0].Role);
      });
    });
  }, []);
  return (
    <SafeAreaView style={{paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + -1 : 0,backgroundColor:"#865439"}}>
    <ScrollView
      style={{
        padding: 10,
        backgroundColor: "#2E333E",
      }}
      horizontal={false}
    >
      <ScrollView horizontal={true}>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 18

            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 25,
                overflow: "hidden",
                width: 50,
                height: 40,
              }}
              onPress={ss}
            >
              <SimpleLineIcons name="logout" size={35} color="tomato" />
            </TouchableOpacity>

            <View
              style={{
                width: 50,
                height: 50,
                overflow: "hidden",
                borderRadius: 15,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ProfileTab");
                }}
              >
                <Image
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: 15,
                  }}
                  source={{ uri: image }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: "100%", marginVertical: 15 }}>
            <Text
              style={{
                color: "white",
                fontSize: 28,
                fontWeight: "500",
                marginLeft:8
              }}
            >
              Find the best coffee for you
            </Text>
          </View>
          <View
            style={{
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                  fontWeight: "500",
                  letterSpacing: 1,
                }}
              >
                Products
              </Text>
            </View>
            <TouchableOpacity
              style={{
                fontSize: 14,
                color: "tomato",
                fontWeight: "400",
                marginRight: 5,
              }}
              // onPress={() => {
              //   navigation.navigate("Products");
              // }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "tomato",
                  fontWeight: "400",
                }}
              >
                SeeAll
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <FlatList
              data={products.slice(0, 8)}
              horizontal={false}
              numColumns={2}
              showsHorizontalScrollIndicator={true}
              renderItem={(itemData) => {
                return (
                  <ProductCard
                    productName={itemData.item.productName}
                    price={itemData.item.price}
                    details={itemData.item.details}
                    image={itemData.item.image}
                    Rate={itemData.item.Rate}
                    id={itemData.item.id}
                  />
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  bio: {
    marginVertical: 10,
    paddingHorizontal: 30,
    textAlign: "center",
  },
  logout: {
    fontSize: 18,
    color: "gray",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "white",
  },
  Cart: {
    fontSize: 18,
    color: "gray",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "white",
  },
});
