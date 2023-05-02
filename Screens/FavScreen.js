import { View, Text,FlatList } from 'react-native'
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
  const getProductHandle = async () => {
    const arr = await getProducts();
    setProducts(arr);
  };

  useEffect(() => {
    getProductHandle();
  }, []);

//--------------------------------------------------------------------------//
useEffect(() => {
  (async () => {
    let ar = [];
    let prod;
    for (let i = 0; i < 2 && i < userFav.length; i++) {
      prod = await getProductByID(userFav[i]);
      ar.push(prod);
  }

    //console.log(prod);
    // console.log(ar);
    setProductInFav(ar);
  })();
}, [userFav]);
useEffect(() => {
  getUserUId().then((id) => {
    //console.log(id);
    getUserById(id).then((user) => {
      user.forEach((user) => {
      //  console.log("first elemet is ", user);
        console.log("fav is ", user.favorite);
       
        setUserFav(user.favorite);
        setUser(user);
      
        
      });
    });
  });
}, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
        
    </View>
  );
};

export default CheckoutScreen;
