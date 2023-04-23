import React, { useState, useEffect } from "react";
import {
  
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  FlatList,
  TextInput,
  
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';

import Carousel from 'react-native-snap-carousel';
import Card from '../Components/coffeeCard';
import { auth } from "../firebase/config";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { getUserUId, getUserById } from "../firebase/user";
import { getProducts } from "../firebase/products";
import ProductCard from "../Components/productCard";
import { logout } from "../firebase/auth";
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { MapPinIcon } from 'react-native-heroicons/solid'
const { width } = Dimensions.get("window");
const d = Dimensions.get("window");
export default function ProfileScreen({ navigation }) {
  const [fullname, setfullname] = useState("");
  const [image, setimage] = useState(null);
  const [role, setRole] = useState("");
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(1);
   const categories = [
    {
      id: 1,
      title: "Cappuccino",
    },
    {
      id: 2,
      title: "Latte",
    },
    {
      id: 3,
      title: "Espresso",
    },
    {
      id: 4,
      title: "Mocha",
    },
    {
      id: 5,
      title: "Americano",
    },
  ]
  
  const getProductHandle = async () => {
    const arr = await getProducts();
    setProducts(arr);
  };

  useEffect(() => {
    getProductHandle();
  }, []);
  const ss = () => {
    logout(auth).then(() => {
      console.log("sign out done");
      navigation.navigate("SignIn");
    });
  };
  useEffect(() => {
    getUserUId().then((id) => {
      getUserById(id).then((user) => {
        setfullname(user[0].fullname);
        setimage(user[0].image);
        setRole(user[0].Role);
      });
    });
  }, []);
  return (
    <View className="flex-1 relative bg-white">
  <StatusBar />

    <Image 
      source={require('../assets/beansBackground1.png')} 
      style={{height: 220}} 
      className="w-full absolute -top-5 opacity-10" />
    <SafeAreaView className="flex-1">
      {/* avatar and bell icon */}
      <View className="mx-4 flex-row justify-between items-center">
        <TouchableOpacity  onPress={() => {
              navigation.navigate("ProfileTab");
            }}>
        <Image source={require('../assets/avatar.png')} 
          className="h-9 w-9 rounded-full" />
        </TouchableOpacity>
        <View className="flex-row items-center space-x-2">
          <MapPinIcon size="25" color={ '#d4a574'} />
          <Text className="font-semibold text-base">
            New York, NYC
          </Text>
        </View>
        <BellIcon size="27" color="black" />
      </View>
      {/* search bar */}
      <View className="mx-5 mt-14 shadow">
        <View className="flex-row items-center rounded-full p-1 bg-[#e6e6e6]">
          <TextInput placeholder='Search' className="p-4 flex-1 font-semibold text-gray-700" />
          <TouchableOpacity 
            className="rounded-full p-2" 
            style={{backgroundColor:  '#d4a574'}}>
            <MagnifyingGlassIcon size="25" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {/* categories */}
      <View className="px-5 mt-6">

        <FlatList 
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={item=> item.id}
          className="overflow-visible"
          renderItem={({item})=>{
            isActive = item.id==activeCategory;
            let activeTextClass = isActive? 'text-white': 'text-gray-700';
            return (
              <TouchableOpacity 
              onPress={()=> setActiveCategory(item.id)}
              style={{backgroundColor: isActive?  '#d4a574': 'rgba(0,0,0,0.07)'}} 
              className="p-4 px-5 mr-2 rounded-full shadow">
                <Text className={"font-semibold " + activeTextClass}>{item.title}</Text>
              </TouchableOpacity>
            )
          }}
        />
      </View>
        
        {/* coffee cards */}
       <View className="mt-16 py-2">
    <Carousel
      data={products}
      firstItem={1}
      inactiveSlideScale={0.77}
      inactiveSlideOpacity={0.75}
      sliderWidth={400}
      itemWidth={260}
      slideStyle={{display: 'flex', alignItems: 'center'}}
      renderItem={(itemData) => {
        return (
          <Card
            productName={itemData.item.productName}
            price={itemData.item.price}
            details={itemData.item.details}
            image={itemData.item.image}
            Rate={itemData.item.Rate}
            id={itemData.item.id}
          />
        );
      }}
    />
     </View>
    </SafeAreaView>
    
    
  </View>
 
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
    fontWeight: "bold",
    marginTop: 10,
  },
  bio: {
    marginVertical: 10,
    paddingHorizontal: 30,
    textAlign: "center",
  },
  logout: {
    fontSize: 18,
    color: "gray",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "white",
  },
  Cart: {
    fontSize: 18,
    color: "gray",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "white",
  },
});
