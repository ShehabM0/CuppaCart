import { View, Text,FlatList, SafeAreaView } from 'react-native'
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

const CheckoutScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  // const {id} = route.params;
  const [total, setTotal] = useState(0);
  //for user profile
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [userFav, setUserFav] = useState([]);
  const [user, setUser] = useState();
  const [ProductInFav, setProductInFav] = useState();
  const [loading, setLoading] = useState(false);
//--------------------------------------------------------------------------//
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
       <Loader visible={loading}
  />
       <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginTop: 15,
          }}
        >
      
          
          <FlatList
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
        </View>
        
    </SafeAreaView>
  );
};

export default CheckoutScreen;
