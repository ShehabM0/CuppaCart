import React ,{useEffect,useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import {
  getUserUId,
  getUserById,
  getCurrUserId,
  updateUser,
  } from "../firebase/user";

  const cartcard = ({
    productName,
    price,
    image,
    id,
    qnt,
    size,
  }) => {
  const navigation = useNavigation();

  const [userCart, setUserCart] = useState([]);
  const sizes = ["S", "M", "L"];
 
  const user_id = getCurrUserId();
  const handleDelete = async () => {
    const id_idx = userCart.indexOf(id);
    userCart.splice(id_idx, 1);
    updateUser(user_id, { cart: [...userCart] });
    alert("Product Deleted From Cart");
  };  


  useEffect(() => {
    getUserUId().then((id) => {
      getUserById(id).then((user) => {
        user.forEach((user) => {
          setUserCart(user.cart);
        });
      });
    });
  }, []);




    return (
                
      <TouchableOpacity onPress={() => { navigation.navigate("Product", { id })}}>
        <View style={styles.container}>
          <LinearGradient
            colors={["#C67C4E", "black"]}
            style={styles.gradient}
          >
            <View style={styles.card}>
              <View style={{alignItems: 'center', justifyContent:'center'}}>
                <Image source={{ uri: image }} style={styles.image} />
              </View>
              <View style={styles.details}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{productName}</Text>
                  <TouchableOpacity onPress={() => {handleDelete()}}>
                    <View style={styles.menuItem}>
                      <Ionicons name="trash-outline" size={25} color="#fff" />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{price} $</Text>
                  <Text style={[styles.price, {paddingLeft: 10}]}>x{qnt}</Text>
                  <Text style={[styles.price, {paddingLeft: 10}]}>{sizes[size]}</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
     
  
    );
  };
  
  export default cartcard;
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      borderRadius: 15,
      margin: 10,
      overflow: "hidden",
    },
    gradient: {
      padding: 10,
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 10,
      marginRight: 10,
    },
    details: {
      flex: 1,
      justifyContent: "space-between",
      height: 80,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    title: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
      marginRight: 5,
    },
    type: {
      color: "#fff",
      fontSize: 16,
    },
    priceContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    price: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
      marginRight: 5,
    },
    menuItem: {
      flexDirection: "row",
      paddingVertical: 10,
      paddingHorizontal: 19,
      marginLeft: 130,
    },
    
  });