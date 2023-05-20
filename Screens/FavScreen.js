import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import FavCard from "../Components/FavCard";
import Loader from '../Components/Loader';
import { getProductByID } from "../firebase/products";
import { getUserById, getCurrUserId } from "../firebase/user";

const MyWishlistScreen = ({ navigation, route }) => {

  const [productsInFav, setProductsInFav] = useState([]);
  const [userFav, setUserFav] = useState([]);

  const getProductHandle = async () => {
    let allProducts = [];
    for (const product_id of userFav) {
      const getProdduct = await getProductByID(product_id);
      allProducts.push({...getProdduct, id: product_id});
    }
    setProductsInFav(allProducts)
  };

  useEffect(() => {
    getProductHandle();
  }, [userFav]);


  useEffect(() => {
      const user_id = getCurrUserId();
      getUserById(user_id).then((user) => setUserFav(user[0].favorite));
  }, [userFav]);

  return (userFav.length > 0) ?
  (
    <View style={styles.container}>
      <View style={styles.topBarContainer}></View>
      <View style={styles.screenNameContainer}>
        <Text
          style={{
            color: "#1C0A00",
            fontSize: 40,
            fontFamily: "Sora-SemiBold",
            marginBottom: 11,
            marginTop: -10,
          }}
        >
          Favourites
        </Text>
        <Text
          style={{
            fontFamily: "Sora-SemiBold",
            color: "#BABBC3",
            fontSize: 18,
            marginBottom: 11,
          }}
        >
          View, add or remove products from favourites for later purchase
        </Text>
      </View>

      <FlatList
        style={{ flex: 1, width: "105%", padding: 20 }}
        data={productsInFav}
        numColumns={1}
        showsHorizontalScrollIndicator={true}
        renderItem={(itemData) => {
          return (
            <FavCard
              productName={itemData.item.productName}
              price={itemData.item.price}
              image={itemData.item.image}
              id={itemData.item.id}
            />
          );
        }}
      />
      <View style={styles.emptyView}></View>
    </View>
  ) :
  (
    <>
      <View style={styles.topBarContainer}></View>
        <View style={styles.screenNameContainer}>
          <Text
            style={{
              color: "#1C0A00",
              fontSize: 40,
              fontFamily: "Sora-SemiBold",
              marginBottom: 11,
              marginTop: -10,
            }}
          >
            Favourites
          </Text>
          <Text
            style={{
              fontFamily: "Sora-SemiBold",
              color: "#BABBC3",
              fontSize: 18,
              marginBottom: 11,
            }}
          >
            View, add or remove products from favourites for later purchase
          </Text>
        </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
            Oops..your favourite list is empty.
          </Text>
        </View>
      </View>
    </>
  )
};

export default MyWishlistScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  topBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  toBarText: {
    fontSize: 15,
    fontWeight: "600",
  },
  screenNameContainer: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: "#707981",
  },
  screenNameParagraph: {
    marginTop: 5,
    fontSize: 15,
  },
  bodyContainer: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  emptyView: {
    height: 20,
  },
  ListContiainerEmpty: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  secondaryTextSmItalic: {
    fontStyle: "italic",
    fontSize: 15,
    color: "#707981",
  },
});
