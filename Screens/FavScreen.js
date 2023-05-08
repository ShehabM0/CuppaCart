import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import FavCard from "../Components/FavCard";
import { getProductByID, getProducts } from "../firebase/products";
import {
  getUserUId,
  addUser,
  deleteUser,
  editUser,
  getUserById,
  getUserByName,
  getUsers,
  subscribeUser,
} from "../firebase/user";
import Loader from "../Components/Loader";
import { Ionicons } from "@expo/vector-icons";
import WishList from "../Components/WishlistCard";
let ar = [];
let prod;
const MyWishlistScreen = ({ navigation, route }) => {
  const [userFav, setUserFav] = useState([]);
  const [user, setUser] = useState();
  const [ProductInFav, setProductInFav] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      let ar = [];
      let prod;
      for (let i = 0; i < userFav.length && i < userFav.length; i++) {
        prod = await getProductByID(userFav[i]);
        ar.push(prod);
      }
      //console.log(prod);
      // console.log(ar);
      setProductInFav(ar);
    })();
  }, [userFav]);

  useEffect(() => {
    const a = navigation.addListener("focus", () => {
      setLoading(true); // Show the loader when the event occurs

      getUserUId().then((id) => {
        getUserById(id).then((user) => {
          user.forEach((user) => {
            console.log("fav is ", user.favorite);
            setUserFav(user.favorite);
            setUser(user);
          });
          setLoading(false); // Hide the loader when the data fetching is complete
        });
      });
    });

    return () => {
      a.remove(); // Clean up the listener when the component unmounts
    };
  }, [navigation]);

  return (
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

     
      {/* style={{flex: 1, width: "100%", padding: 20}} */}
      <FlatList
        style={{ flex: 1, width: "105%", padding: 20 }}
        data={ProductInFav}
        numColumns={1}
        showsHorizontalScrollIndicator={true}
        renderItem={(itemData) => {
          return (
            <FavCard
              productName={itemData.item.productName}
              price={itemData.item.price}
              details={itemData.item.details}
              image={itemData.item.image}
              Rate={itemData.item.Rate}
              id={itemData.item.id}
              type={itemData.item.type}
            />
          );
        }}
      />
      <View style={styles.emptyView}></View>
    </View>
  );
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
