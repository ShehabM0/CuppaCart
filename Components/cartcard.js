import React ,{useEffect,useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,SafeAreaView,ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
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

  const cartcard = ({
    productName,
    price,
    image,
    details,
    type,
    id,
    Rate,
    cart,
    setCart,
  }) => {
    const navigation = useNavigation();
    const { width } = Dimensions.get("window");

    const [userCart, setUserCart] = useState([]);
  const [user, setUser] = useState();
  const [ProductInCart, setProductInCart] = useState();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
 
  const user_id = getCurrUserId();

  const handleDelete = async () => {
    const id_idx = userCart.indexOf(id);
    console.log("wdcfs",userCart);
    userCart.splice(id_idx, 1);
    updateUser(user_id, { cart: [...userCart] });
    alert("Product Deleted From Cart");
  };  


  useEffect(() => {
    getUserUId().then((id) => {
      getUserById(id).then((user) => {
        user.forEach((user) => {
          // console.log("cartooo is ", user.cart);
          setUserCart(user.cart);
          setUser(user);
        });
        setLoading(false); // Hide the loader when the data fetching is complete
      });
    });
  }, []);




    return (
                
      // <TouchableOpacity
      //   onPress={() => {
      //     navigation.navigate("Product", {
      //       productName,
      //       price,
      //       image,
      //       details,
      //       type,
      //       id,
      //       Rate,
      //     });
      //   }}
      // >
  
          
  
        <View style={styles.container}>
          <LinearGradient
            colors={["#C67C4E", "black"]}
            style={styles.gradient}
          >
            <View style={styles.card}>
              <Image source={{ uri: image }} style={styles.image} />
              <View style={styles.details}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{productName}</Text>
                  <Text style={styles.type}>{type}</Text>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{price} $</Text>
  
                  <TouchableOpacity onPress={() => {handleDelete()}}>
                  <View style={styles.menuItem}>
                    <Ionicons name="trash-outline" size={25} color="#fff" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      // </TouchableOpacity>
     
  
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