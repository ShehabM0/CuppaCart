import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  FlatList
} from "react-native";
import Cartcard from "../Components/cartcard";
import * as Haptics from "expo-haptics";
import React, { useState, useEffect } from "react";
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
let ar = [];
let prod;
const CartScreen = ({ navigation}) => {


  const [userCart, setUserCart] = useState([]);
  const [user, setUser] = useState();
  const [ProductInCart, setProductInCart] = useState();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    (async () => {
      let ar = [];
      let prod;
      
        for (let i = 0; i < userCart.length; i++) {
          prod = await getProductByID(userCart[i].product_id);
          ar.push(prod);
        }
      
      setProductInCart(ar);
      // console.log("remfkmfkrm",userCart.length);
    })();
  }, [userCart]);
//console.log("remfkmfkrm",ProductInCart);




useEffect(() => {
  const a = navigation?.addListener("focus", () => {
    setLoading(true); // Show the loader when the event occurs

    getUserUId().then((id) => {
      getUserById(id).then((user) => {
        user.forEach((user) => {
          console.log("cart is ", user.cart);
          setUserCart(user.cart);
          setUser(user);
        });
        setLoading(false); // Hide the loader when the data fetching is complete
      });
    });
  });

  return () => {
    a?.remove(); // Clean up the listener when the component unmounts
  };
}, [navigation]);

  // const [products, setProducts] = useState([]);

  // const getProductHandle = async () => {
  //   const arr = await getProducts();
  //   setProducts(arr);
  // };

  // useEffect(() => {
  //   getProductHandle();
  // }, []);

  function checkoutnavigation() {
    navigation.navigate("Checkout");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }


















  return (
    <View style={styles.container}>
    
      <View style={styles.topBarContainer}>
      
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color={ "#707981"}
          />
        </TouchableOpacity>
        
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>My Cart</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>
            View , add or remove products from cart for later purchase
          </Text>
        </View>
      </View>
     
      <Loader visible={loading}/>
       
      {/* style={{flex: 1, width: "100%", padding: 20}} */}
      <FlatList
      style={{flex: 1, width: "105%", padding: 20}}
            data={ProductInCart}
            numColumns={1}
            showsHorizontalScrollIndicator={true}
            renderItem={(itemData) => {
              return (
                <Cartcard
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
        
          <TouchableOpacity style={styles.button} onPress={checkoutnavigation}>
        <Text style={styles.buttonText}>Proceed to checkout</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor:  "#F5F5F5",
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
    paddingBottom: -10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color:  "#707981",
  },
  screenNameParagraph: {
    marginTop: 5,
    fontSize: 15,
  },
  bodyContainer: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor:  "#F5F5F5",
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
    color:  "#707981",
  },
  button: {
    backgroundColor: "#C67C4E",
    width: "30%",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 50,
    marginLeft: "25%",
    position: 'absolute',
    bottom: 20,
    zIndex: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default CartScreen;
