import { StyleSheet, Image, View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useState,useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  getUserUId,
  addUser,
  deleteUser,
  editUser,
  getUserById,
  getUserByName,
  getUsers,
  subscribeUser,
  getCurrUserId,
  updateUser,
  } from "../firebase/user";
import { auth } from "../firebase/config";
const WishList = ({
  productName,
  price,
  image,
  details,
  type,
  id,
  Rate,
}) => {
  const [userFav, setUserFav] = useState([]);
  const [user, setUser] = useState();
  const [ProductInFav, setProductInFav] = useState();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [userCart, setUserCart] = useState([]);
  const user_id = getCurrUserId();

  useEffect(() => {
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
  }, []);
  
  const handleDelete = async () => {
    // var userfavorite = user.favorite;
    // userfavorite = userfavorite.filter((e) => e !== id);
    // console.log("here",userfavorite);
    // editUser({
    //   ...user,
    //   favorite: userfavorite,
    // });
    // alert("Product Deleted From Cart");
    const id_idx = userFav.indexOf(id);
    userFav.splice(id_idx, 1);
    updateUser(user_id, { favorite: [...userFav] });
    alert("Product Deleted From Cart");
  };
  // const handleDelete = async () => {
  //   const arr = await getUsers();
  //   const currentUser = arr.find((e) => e.email === auth.currentUser.email);
  //   const userFav = currentUser.id;
  //   userFav = userFav.filter((e) => e !== id);
  //   editUser({
  //     ...currentUser,
  //     favorite: [...userFav],
  //   });
  // };
  return (
    <TouchableOpacity style={styles.container} >
      <View style={styles.detailContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri:image}}
            style={{ height: 70, width:70}}
          />
        </View>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryTitle}>{productName}</Text>
          <Text style={styles.categoryDescription}>detail</Text>
        </View>
      </View>
      <View style={styles.categoryActionContainer}>
        <View style={styles.infoButtonContainer}>
          <View style={{display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:  "#FB6831",
    borderRadius: 5,
    padding: 5,}}>
            <TouchableOpacity
              style={{ display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FB6831",
              borderRadius: 5,
              padding: 5,}}
              onPress={() =>handleDelete()}
            >
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WishList;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: "white",
    height: 80,
    borderRadius: 10,
    elevation: 5,
    margin: 5,
  },
  detailContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    height: 80,
    borderRadius: 10,
    margin: 5,
  },
  imageContainer: {
    width: 70,
    height: 70,
    elevation: 5,
    display: "flex",
    justifyContent: "center",

    backgroundColor: "#F5F5F5",
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  categoryDescription: {
    fontSize: 12,
    color:  "#707981",
  },
  categoryInfo: {
    marginLeft: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },

  actionButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    height: 30,
    width: 30,
    backgroundColor: "#FB6831",
    borderRadius: 5,
    elevation: 2,
  },
  infoButtonContainer: {
    padding: 5,
    paddingRight: 0,
    display: "flex",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  wishlistButtonContainer: {
    height: 50,
    width: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});