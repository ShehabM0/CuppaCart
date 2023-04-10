import React, { useState, useEffect }  from 'react';
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
  FlatList
} from "react-native";
import { Ionicons } from "@expo/vector-icons";



 const { width } = Dimensions.get("window");
const d = Dimensions.get("window");
export default function ProfileScreen({navigation}) {
//  const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setname] = useState("");
//   const [image, setimage] = useState(null);
//   const [proimage, setproimage] = useState(null);
//   const [mobile, setMobile] = useState("");
//   const [role, setRole] = useState("");
//   const [products, setProducts] = useState([]);

//   const getProductHandle = async () => {
//     const arr = await getProducts();
//   };

//   useEffect(() => {
//     getProductHandle();
//   }, []);
//   const ss=()=>{
  
//     logout(auth).then(()=>{
//       console.log("sign out done");
//         navigation.navigate('Sign In')
//     })
//   }
//   useEffect(() => {
//     getUserUId().then((id) => {
//        //console.log(id);
//       getUserById(id).then((user) => {
//        // console.log(user);
//         setEmail(user[0].email);
//         setPassword(user[0].password);
//         setname(user[0].name);
//         setMobile(user[0].mobile);
//         setimage(user[0].image);
//         setRole(user[0].Role);
//       });
//     });
//   }, []);
  return (
    <ScrollView
    style={{
      padding: 22,
      backgroundColor:"#2E333E"
    }}
  > 
  
    <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      

    }}
  >
    <TouchableOpacity
      style={{
        borderRadius: 25,
        overflow: "hidden",
        width: 40,
        height: 40,
      }}
    >
    
        <Ionicons
          name="ios-caret-back-circle-sharp"
          size={40}
          color={"white"}
        />
    
    </TouchableOpacity>
    <View>
    <Text style={{fontSize:18 , padding:8 ,  color:"white"}}> Welcome</Text>
    </View>
    <View
      style={{
        width: 50,
        height: 50,
        overflow: "hidden",
        borderRadius: 20,
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
            borderRadius: 20,
           
          }}
          source={require("../assets/coffee5.jpg")}
        />
        </TouchableOpacity>
      
    </View>
  </View>
  <View style={{ width: "80%", marginVertical: 30}}>
          <Text
            style={{
              color: "white",
              fontSize: 28,
              fontWeight: "500",
            }}
          >
            Find the best coffee for you
          </Text>
        </View>
         
     
           
         
       
  </ScrollView>




  //   <View style={{ flexDirection: "column", alignItems: "center" }}>
  //   <TouchableOpacity
  //     onPress={() => {
  //       if (role === "admin") {
  //         navigation.navigate("Admin");
  //       } else {
  //         navigation.navigate("Home");
  //       }
  //     }}
  //   >
  //     <Image
  //       style={{ height: 50, width: 50, borderRadius: 75 }}
  //       source={{uri: image}}
  //     />
  //   </TouchableOpacity>
  //   <Text>{name}</Text>
  // </View>
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
    fontWeight: 'bold',
    marginTop: 10,
  },
  bio: {
    marginVertical: 10,
    paddingHorizontal: 30,
    textAlign: 'center',
  },
  logout:{
    fontSize: 18,
    color:"gray",
    padding: 12,
    borderRadius: 10,
    backgroundColor:"white",
  },
  Cart:{
    fontSize: 18,
    color:"gray",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor:"white",
  }
});
