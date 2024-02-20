import React ,{useEffect,useState} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import { getUserUId, getUserById, getCurrUserId, updateUser, } from "../firebase/user";

  const cartcard = ({ sentCart, productName, price, image, id, qnt, size }) => {
  const navigation = useNavigation();

  const [userCart, setUserCart] = useState([]);
  const sizes = ["S", "M", "L"];
 
  const user_id = getCurrUserId();

  const handleDelete = async () => {
    // const id_idx = userCart.indexOf(id);
    // userCart.splice(id_idx, 1);
    // console.log(id, qnt, size)
    let tempCart = [];
    for(product of sentCart) {
      if(product.product_id == id && product.qnt == qnt && product.size == size)
        continue;
      tempCart.push(product);
    }
    // console.log(userCart);
    // console.log("\n\n\n");
    // console.log(tempCart);
    // console.log("-------\n")
    await updateUser(user_id, { cart: [...tempCart] });
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
          <View style={styles.card}>
            <View style={{padding: 10}}>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
            <View style={styles.details}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{productName}</Text>
                <View style={{ padding: 3}}> 
                  <TouchableOpacity onPress={() => {handleDelete()}}>
                    <Ionicons name="bag-remove-outline" size={22} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Text style={styles.price}>${price}</Text>
                <Text style={{color: "#91939f"}}>Quantity:
                  <Text style={[styles.price, {paddingLeft: 10}]}> x{qnt}</Text>
                </Text>
                <Text style={{color: "#91939f"}}>Size: 
                  <Text style={[styles.price, {paddingLeft: 10}]}> {sizes[size]}</Text>
                </Text>
              </View>
            </View>
          </View>
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
      // justifyContent: "space-between",
      // height: 100,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'space-between'
    },
    title: {
      color: "black",
      fontSize: 18,
      fontWeight: "bold",
      marginRight: 5,
    },
    type: {
      color: "black",
      fontSize: 16,
    },
    price: {
      color: "black",
      fontSize: 16,
      fontWeight: "bold",
      marginRight: 5,
    },
    
  });