import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import BasicProductList from "../Components/BasicProductList";
import SegmentedControlTab from 'react-native-segmented-control-tab'

import { getProducts } from "../firebase/products";
const CheckoutScreen = ({ navigation, route }) => {
  const [Products, setProducts] = useState([]);
  const [index, setIndex] = useState("Cash");


 

  const getProductsHandle = async () => {
    const arr = await getProducts();
    setProducts(arr);
  };
  useEffect(() => {
    getProductsHandle();
  }, []);
  
  
  return (
   

    <View style={styles.container}>
      <StatusBar></StatusBar>
      
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
        <View></View>
        <View></View>
      </View>
      <ScrollView style={styles.bodyContainer} nestedScrollEnabled={true}>
        <Text style={styles.primaryText}>Order Summary</Text>
        <ScrollView
          style={[styles.orderSummaryContainer,]}
          nestedScrollEnabled={true}
        >
         <FlatList
        showsVerticalScrollIndicator={false}
        data={Products}
       horizontal={false}
        renderItem={(itemData) => {
          return (
            <BasicProductList
              productName={itemData.item.productName}
              price={itemData.item.price}
              image={itemData.item.image}
              id={itemData.item.id}
            />
          );
        }}
      />
        </ScrollView>
        <View style={{marginTop:20, flexDirection: 'row'}}>
  <View
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 14,
      width: 153.5,
      height: 40,
      borderRadius: 10,
      gap: 10,
      flex: 0,
      flexGrow: 1,
      backgroundColor: index === "Cash" ? "#C67C4E" : "#F2F2F2",
    }}
  >
    <TouchableOpacity>
      <Text
        style={{
          width: 59,
          height: 20,
          fontFamily: "sora-regular",
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: 16,
          lineHeight: 20,
          color: index === "Cash" ? "white" : "black",
          flex: 0,
          flexGrow: 0,
        }}
        onPress={() => setIndex("Cash")}
      >
        Cash
      </Text>
    </TouchableOpacity>
  </View>
  <View
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 14,
      gap: 10,
      width: 153.5,
      height: 40,
      backgroundColor: index === "Coins" ? "#C67C4E" : "#F2F2F2",
      borderRadius: 10,
      flex: 0,
      flexGrow: 1,
    }}
  >
    <TouchableOpacity>
      <Text
        style={{
          width: 62,
          height: 20,
          fontFamily: "sora-regular",
          fontStyle: "normal",
          fontWeight: "400",
          fontSize: 16,
          lineHeight: 20,
          color: index === "Coins" ? "white" : "black",
          flex: 0,
          marginLeft: 25,
          flexGrow: 0,
        }}
        onPress={() => setIndex("Coins")}
      >
        Coins
      </Text>
    </TouchableOpacity>
  </View>
</View>

{index === "Cash" ? (
  <View>
    <Text style={styles.primaryText}>Total</Text>
    <View style={styles.totalOrderInfoContainer}>
      <View style={styles.list}>
        <Text>Order</Text>
        <Text>10000000000$</Text>
      </View>
      <View style={styles.list}>
        <Text>Delivery</Text>
        <Text>1000000000 $</Text>
      </View>
      <View style={styles.list}>
        <Text style={styles.primaryTextSm}>Total In Cash</Text>
        <Text style={styles.secondaryTextSm}>10000000000000 $</Text>
      </View>
    </View>
  </View>
)
:
( <View>
  <Text style={styles.primaryText}>Total</Text>
  <View style={styles.totalOrderInfoContainer}>
    <View style={styles.list}>
      <Text>Order</Text>
      <Text>10000000000$</Text>
    </View>
    <View style={styles.list}>
      <Text>Delivery</Text>
      <Text>1000000000 $</Text>
    </View>
    <View style={styles.list}>
      <Text style={styles.primaryTextSm}>Total In "Coins"</Text>
      <Text style={styles.secondaryTextSm}>10000000000000 $</Text>
    </View>
  </View>
</View>)
}


        
        <Text style={styles.primaryText}>Contact</Text>
        <View style={styles.listContainer}>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Email</Text>
            <Text style={styles.secondaryTextSm}>
             mohamed@gmail.com
            </Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Phone</Text>
            <Text style={styles.secondaryTextSm}>+2001011627954</Text>
          </View>
          <TouchableOpacity
          style={{
            backgroundColor: "#C67C4E",
            width: "80%",
            paddingVertical: 10,
            borderRadius: 10,
            alignItems: "center",
            marginTop: 50,
            marginLeft: "10%",
           
            
           
          }}

          onPress={{}}>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontFamily:"sora-regular"
            }}
          >
            Order
          </Text>
        </TouchableOpacity>
       
        </View>
        <View style={styles.emptyView}></View>
      </ScrollView>
     
    </View>
   
  );
};
export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor:  "#F5F5F5",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 0,
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
  bodyContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  orderSummaryContainer: {
    backgroundColor:  "white",
    borderRadius: 10,
    padding: 10,
    maxHeight: 220,
    
  },
  totalOrderInfoContainer: {
    borderRadius: 10,
    padding: 10,
    backgroundColor:  "white",
  },
  primaryText: {
    marginBottom: 5,
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor:  "white",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor:  "#F5F5F5",
    padding: 10,
  },
  primaryTextSm: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  secondaryTextSm: {
    fontSize: 15,
    fontWeight: "bold",
  },
  listContainer: {
    backgroundColor:  "white",
    borderRadius: 10,
    padding: 10,
  },
  buttomContainer: {
    width: "100%",
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  emptyView: {
    width: "100%",
    height: 20,
  },
  modelBody: {
    flex: 1,
    display: "flex",
    flexL: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modelAddressContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: 320,
    height: 400,
    backgroundColor:  "white",
    borderRadius: 20,
    elevation: 3,
  },
});
